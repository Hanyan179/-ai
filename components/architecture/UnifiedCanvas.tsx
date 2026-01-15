import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ArchNode, ArchConnection, ExternalService, ViewMode } from '../../types';
import { UNIFIED_LAYOUT } from '../../architectureConstants';
import NodeCard from './NodeCard';

interface Position {
  x: number;
  y: number;
}

interface UnifiedCanvasProps {
  nodes: ArchNode[];
  connections: ArchConnection[];
  externalServices?: ExternalService[];
  mode: ViewMode;
}

const L = UNIFIED_LAYOUT;

/**
 * 统一画布组件 - 正交路由版
 * 使用直角转弯的正交线条，更整洁
 */
const UnifiedCanvas: React.FC<UnifiedCanvasProps> = ({
  nodes,
  connections,
  externalServices = [],
  mode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, Position>>({});
  const [servicePositions, setServicePositions] = useState<Record<string, Position>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 初始化节点位置
  useEffect(() => {
    const positions: Record<string, Position> = {};
    nodes.forEach(node => {
      if (node.position) {
        positions[node.id] = { ...node.position };
      }
    });
    setNodePositions(positions);

    const svcPositions: Record<string, Position> = {};
    externalServices.forEach(svc => {
      if (svc.position) {
        svcPositions[svc.id] = { ...svc.position };
      }
    });
    setServicePositions(svcPositions);
  }, [nodes, externalServices]);

  const getNodePos = useCallback((id: string): Position => {
    const node = nodes.find(n => n.id === id);
    return nodePositions[id] || node?.position || { x: 0, y: 0 };
  }, [nodePositions, nodes]);

  const getServicePos = useCallback((id: string): Position => {
    const svc = externalServices.find(s => s.id === id);
    return servicePositions[id] || svc?.position || { x: 0, y: 0 };
  }, [servicePositions, externalServices]);

  const getNodeSize = useCallback((nodeId: string, isService: boolean = false) => {
    if (isService) return L.nodeSize.service;
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return L.nodeSize.stage;
    return L.nodeSize[node.type] || L.nodeSize.stage;
  }, [nodes]);

  // 鼠标事件
  const handleMouseDown = useCallback((e: React.MouseEvent, id: string, isService: boolean) => {
    e.preventDefault();
    const pos = isService ? getServicePos(id) : getNodePos(id);
    setDraggingId(id);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }, [getNodePos, getServicePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingId) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    if (externalServices.some(s => s.id === draggingId)) {
      setServicePositions(prev => ({ ...prev, [draggingId]: { x: newX, y: newY } }));
    } else {
      setNodePositions(prev => ({ ...prev, [draggingId]: { x: newX, y: newY } }));
    }
  }, [draggingId, dragOffset, externalServices]);

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  // 获取节点的四个边中心点
  const getNodeEdges = useCallback((id: string, isService: boolean = false) => {
    const pos = isService ? getServicePos(id) : getNodePos(id);
    const size = getNodeSize(id, isService);
    return {
      top: { x: pos.x + size.width / 2, y: pos.y },
      bottom: { x: pos.x + size.width / 2, y: pos.y + size.height },
      left: { x: pos.x, y: pos.y + size.height / 2 },
      right: { x: pos.x + size.width, y: pos.y + size.height / 2 },
    };
  }, [getNodePos, getServicePos, getNodeSize]);

  // 智能选择连接边 - 基于相对位置
  const getSmartEdgePoints = useCallback((
    fromId: string, 
    toId: string, 
    fromIsService: boolean = false, 
    toIsService: boolean = false
  ): { from: Position; to: Position; direction: 'horizontal' | 'vertical' } => {
    const fromEdges = getNodeEdges(fromId, fromIsService);
    const toEdges = getNodeEdges(toId, toIsService);
    
    const fromCenter = {
      x: (fromEdges.left.x + fromEdges.right.x) / 2,
      y: (fromEdges.top.y + fromEdges.bottom.y) / 2,
    };
    const toCenter = {
      x: (toEdges.left.x + toEdges.right.x) / 2,
      y: (toEdges.top.y + toEdges.bottom.y) / 2,
    };
    
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    
    // 根据主要方向选择边
    if (Math.abs(dx) > Math.abs(dy) * 1.5) {
      // 水平为主
      return dx > 0
        ? { from: fromEdges.right, to: toEdges.left, direction: 'horizontal' }
        : { from: fromEdges.left, to: toEdges.right, direction: 'horizontal' };
    } else if (Math.abs(dy) > Math.abs(dx) * 1.5) {
      // 垂直为主
      return dy > 0
        ? { from: fromEdges.bottom, to: toEdges.top, direction: 'vertical' }
        : { from: fromEdges.top, to: toEdges.bottom, direction: 'vertical' };
    } else {
      // 对角线 - 优先水平出，垂直入
      if (dx > 0) {
        return dy > 0
          ? { from: fromEdges.right, to: toEdges.top, direction: 'horizontal' }
          : { from: fromEdges.right, to: toEdges.bottom, direction: 'horizontal' };
      } else {
        return dy > 0
          ? { from: fromEdges.left, to: toEdges.top, direction: 'horizontal' }
          : { from: fromEdges.left, to: toEdges.bottom, direction: 'horizontal' };
      }
    }
  }, [getNodeEdges]);

  // 生成正交路径（直角转弯）
  const generateOrthogonalPath = useCallback((
    from: Position, 
    to: Position, 
    direction: 'horizontal' | 'vertical',
    type: string,
    index: number = 0
  ): string => {
    // 回流线特殊处理 - 走底部大弧
    if (type === 'feedback') {
      const bottomY = Math.max(from.y, to.y) + 60;
      return `M ${from.x} ${from.y} L ${from.x} ${bottomY} L ${to.x} ${bottomY} L ${to.x} ${to.y}`;
    }
    
    // 正交路由：一次转弯
    const offset = index * 8; // 多条线时错开
    
    if (direction === 'horizontal') {
      // 水平出发 → 垂直到达
      const midX = from.x + (to.x - from.x) / 2 + offset;
      return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
    } else {
      // 垂直出发 → 水平到达
      const midY = from.y + (to.y - from.y) / 2 + offset;
      return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
    }
  }, []);

  const getLineStyle = (type: string) => {
    switch (type) {
      case 'main':
        return { stroke: '#60A5FA', strokeWidth: 2.5, dash: '' };
      case 'feedback':
        return { stroke: '#34D399', strokeWidth: 2, dash: '8,4' };
      case 'tech':
        return { stroke: '#A78BFA', strokeWidth: 1.5, dash: '4,3' };
      case 'shared':
        return { stroke: '#F59E0B', strokeWidth: 2, dash: '' };
      default:
        return { stroke: '#64748B', strokeWidth: 1.5, dash: '' };
    }
  };

  const visibleNodes = useMemo(() => nodes.filter(n => n.visibleIn?.includes(mode)), [nodes, mode]);
  const visibleConnections = useMemo(() => connections.filter(c => c.visibleIn.includes(mode)), [connections, mode]);
  const visibleServices = useMemo(() => mode === 'technical' ? externalServices : [], [mode, externalServices]);

  // 为连线分配索引，用于错开重叠线
  const connectionIndices = useMemo(() => {
    const indices: Record<string, number> = {};
    const pairCounts: Record<string, number> = {};
    
    visibleConnections.forEach(conn => {
      const pairKey = [conn.from, conn.to].sort().join('-');
      pairCounts[pairKey] = (pairCounts[pairKey] || 0) + 1;
      indices[conn.id] = pairCounts[pairKey] - 1;
    });
    
    return indices;
  }, [visibleConnections]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto bg-slate-950/50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 画布内容区 */}
      <div className="relative" style={{ minWidth: 1800, minHeight: 1000 }}>
        
        {/* SVG 连线层 */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: 1800, height: 1000, zIndex: 1 }}>
          <defs>
            <marker id="arrow-main" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA" />
            </marker>
            <marker id="arrow-feedback" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#34D399" />
            </marker>
            <marker id="arrow-tech" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L7,2.5 z" fill="#A78BFA" />
            </marker>
            <marker id="arrow-shared" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L7,2.5 z" fill="#F59E0B" />
            </marker>
          </defs>

          {/* 渲染连线 - 正交路由 */}
          {visibleConnections.map(conn => {
            const fromNode = visibleNodes.find(n => n.id === conn.from);
            const toNode = visibleNodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const { from: fromPoint, to: toPoint, direction } = getSmartEdgePoints(conn.from, conn.to);
            const style = getLineStyle(conn.type);
            const path = generateOrthogonalPath(fromPoint, toPoint, direction, conn.type, connectionIndices[conn.id] || 0);
            
            return (
              <g key={conn.id}>
                <path
                  d={path}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dash}
                  markerEnd={`url(#arrow-${conn.type})`}
                  opacity={0.7}
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* 外部服务连线 - 正交路由 */}
          {visibleServices.map((service, svcIdx) => 
            service.connectedTo.map((targetId, targetIdx) => {
              const targetNode = visibleNodes.find(n => n.id === targetId);
              if (!targetNode) return null;

              const { from: fromPoint, to: toPoint, direction } = getSmartEdgePoints(service.id, targetId, true, false);
              const path = generateOrthogonalPath(fromPoint, toPoint, direction, 'tech', svcIdx * 3 + targetIdx);
              
              return (
                <path
                  key={`${service.id}-${targetId}`}
                  d={path}
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth={1.5}
                  strokeDasharray="4,3"
                  markerEnd="url(#arrow-tech)"
                  opacity={0.4}
                  strokeLinejoin="round"
                />
              );
            })
          )}
        </svg>

        {/* 节点层 */}
        {visibleNodes.map(node => {
          const pos = getNodePos(node.id);
          const isDragging = draggingId === node.id;
          const size = getNodeSize(node.id);
          
          return (
            <div
              key={node.id}
              className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}`}
              style={{
                left: pos.x,
                top: pos.y,
                width: size.width,
                transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                transition: isDragging ? 'none' : 'transform 0.15s ease',
              }}
              onMouseDown={(e) => handleMouseDown(e, node.id, false)}
            >
              <NodeCard node={node} mode={mode} />
            </div>
          );
        })}

        {/* 外部服务层 */}
        {mode === 'technical' && visibleServices.length > 0 && (
          <>
            <div
              className="absolute rounded-xl border border-emerald-700/30 bg-emerald-900/10"
              style={{ 
                left: L.servicesLayer.x - 20, 
                top: L.servicesLayer.startY - 40, 
                width: L.nodeSize.service.width + 40, 
                height: L.servicesLayer.spacing * 6 + 80,
                zIndex: 0 
              }}
            />
            <div 
              className="absolute text-emerald-400 text-sm font-medium"
              style={{ left: L.servicesLayer.x + 40, top: L.servicesLayer.startY - 25 }}
            >
              外部服务
            </div>

            {visibleServices.map(service => {
              const pos = getServicePos(service.id);
              const isDragging = draggingId === service.id;
              
              return (
                <div
                  key={service.id}
                  className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    width: L.nodeSize.service.width,
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.15s ease',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, service.id, true)}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-900/50 to-slate-900/80 border border-emerald-500/40 hover:border-emerald-400/60 transition-colors h-full">
                    <h5 className="text-white text-sm font-semibold">{service.name}</h5>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default UnifiedCanvas;
