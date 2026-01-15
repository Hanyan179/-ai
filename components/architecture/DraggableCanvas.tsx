import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArchNode, ArchConnection, ExternalService, ViewMode } from '../../types';
import NodeCard from './NodeCard';

interface Position {
  x: number;
  y: number;
}

interface DraggableCanvasProps {
  nodes: ArchNode[];
  connections: ArchConnection[];
  externalServices?: ExternalService[];
  mode: ViewMode;
  defaultLayout: Record<string, Position>;
  serviceLayout?: Record<string, Position>;
}

// 节点尺寸常量
const NODE_WIDTH = 240;
const NODE_HEIGHT = 140;
const SERVICE_WIDTH = 180;
const SERVICE_HEIGHT = 90;

/**
 * 统一的可拖拽画布组件
 * - 支持节点实时拖拽
 * - 连线平滑跟随
 * - 智能连接点计算
 */
const DraggableCanvas: React.FC<DraggableCanvasProps> = ({
  nodes,
  connections,
  externalServices = [],
  mode,
  defaultLayout,
  serviceLayout = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, Position>>(defaultLayout);
  const [servicePositions, setServicePositions] = useState<Record<string, Position>>(serviceLayout);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 重置布局当模式改变
  useEffect(() => {
    setNodePositions(defaultLayout);
    setServicePositions(serviceLayout);
  }, [mode]);

  const getNodePos = useCallback((id: string): Position => {
    return nodePositions[id] || defaultLayout[id] || { x: 0, y: 0 };
  }, [nodePositions, defaultLayout]);

  const getServicePos = useCallback((id: string): Position => {
    return servicePositions[id] || serviceLayout[id] || { x: 0, y: 0 };
  }, [servicePositions, serviceLayout]);

  // 鼠标按下开始拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent, id: string, isService: boolean) => {
    e.preventDefault();
    const pos = isService ? getServicePos(id) : getNodePos(id);
    setDraggingId(id);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  }, [getNodePos, getServicePos]);

  // 鼠标移动
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingId) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // 判断是节点还是服务
    if (servicePositions[draggingId] !== undefined || serviceLayout[draggingId]) {
      setServicePositions(prev => ({ ...prev, [draggingId]: { x: newX, y: newY } }));
    } else {
      setNodePositions(prev => ({ ...prev, [draggingId]: { x: newX, y: newY } }));
    }
  }, [draggingId, dragOffset, servicePositions, serviceLayout]);

  // 鼠标释放
  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  // 计算连接点（智能选择最近的边）
  const getConnectionPoints = useCallback((
    fromId: string, 
    toId: string, 
    fromIsService: boolean = false,
    toIsService: boolean = false
  ) => {
    const fromPos = fromIsService ? getServicePos(fromId) : getNodePos(fromId);
    const toPos = toIsService ? getServicePos(toId) : getNodePos(toId);
    
    const fromW = fromIsService ? SERVICE_WIDTH : NODE_WIDTH;
    const fromH = fromIsService ? SERVICE_HEIGHT : NODE_HEIGHT;
    const toW = toIsService ? SERVICE_WIDTH : NODE_WIDTH;
    const toH = toIsService ? SERVICE_HEIGHT : NODE_HEIGHT;

    // 计算中心点
    const fromCenter = { x: fromPos.x + fromW / 2, y: fromPos.y + fromH / 2 };
    const toCenter = { x: toPos.x + toW / 2, y: toPos.y + toH / 2 };

    // 计算方向
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;

    let fromPoint: Position;
    let toPoint: Position;

    // 根据相对位置选择连接点
    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平方向为主
      if (dx > 0) {
        fromPoint = { x: fromPos.x + fromW, y: fromCenter.y };
        toPoint = { x: toPos.x, y: toCenter.y };
      } else {
        fromPoint = { x: fromPos.x, y: fromCenter.y };
        toPoint = { x: toPos.x + toW, y: toCenter.y };
      }
    } else {
      // 垂直方向为主
      if (dy > 0) {
        fromPoint = { x: fromCenter.x, y: fromPos.y + fromH };
        toPoint = { x: toCenter.x, y: toPos.y };
      } else {
        fromPoint = { x: fromCenter.x, y: fromPos.y };
        toPoint = { x: toCenter.x, y: toPos.y + toH };
      }
    }

    return { from: fromPoint, to: toPoint };
  }, [getNodePos, getServicePos]);

  // 生成平滑曲线路径
  const generatePath = useCallback((from: Position, to: Position, type: string) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    
    // 根据连线类型调整曲线
    if (type === 'feedback') {
      // 反馈线：大弧度曲线
      const midX = from.x - 60;
      const midY = (from.y + to.y) / 2;
      return `M ${from.x} ${from.y} Q ${midX} ${from.y}, ${midX} ${midY} Q ${midX} ${to.y}, ${to.x} ${to.y}`;
    }
    
    // 普通连线：贝塞尔曲线
    const controlOffset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.5 + 30;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平为主
      const cx = from.x + dx / 2;
      return `M ${from.x} ${from.y} C ${cx} ${from.y}, ${cx} ${to.y}, ${to.x} ${to.y}`;
    } else {
      // 垂直为主
      const cy = from.y + dy / 2;
      return `M ${from.x} ${from.y} C ${from.x} ${cy}, ${to.x} ${cy}, ${to.x} ${to.y}`;
    }
  }, []);

  // 获取连线样式
  const getLineStyle = (type: string) => {
    switch (type) {
      case 'main':
        return { stroke: '#60A5FA', strokeWidth: 2, dash: '' };
      case 'feedback':
        return { stroke: '#34D399', strokeWidth: 2, dash: '6,4' };
      case 'tech':
        return { stroke: '#A78BFA', strokeWidth: 1.5, dash: '' };
      case 'shared':
        return { stroke: '#F59E0B', strokeWidth: 1.5, dash: '' };
      default:
        return { stroke: '#64748B', strokeWidth: 1, dash: '' };
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative" style={{ minWidth: 1600, minHeight: 950 }}>
        
        {/* SVG 连线层 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrow-main" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#60A5FA" />
            </marker>
            <marker id="arrow-feedback" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#34D399" />
            </marker>
            <marker id="arrow-tech" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0,0 L0,4 L5,2 z" fill="#A78BFA" />
            </marker>
            <marker id="arrow-shared" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0,0 L0,4 L5,2 z" fill="#F59E0B" />
            </marker>
          </defs>

          {/* 渲染所有连线 */}
          {connections.map(conn => {
            const { from, to } = getConnectionPoints(conn.from, conn.to);
            const style = getLineStyle(conn.type);
            const path = generatePath(from, to, conn.type);
            
            return (
              <g key={conn.id}>
                <path
                  d={path}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dash}
                  markerEnd={`url(#arrow-${conn.type})`}
                  opacity={0.6}
                  className="transition-opacity duration-150"
                />
              </g>
            );
          })}

          {/* 外部服务连线 */}
          {mode === 'technical' && externalServices.map(service => 
            service.connectedTo.map(targetId => {
              const { from, to } = getConnectionPoints(service.id, targetId, true, false);
              const path = generatePath(from, to, 'tech');
              
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
                />
              );
            })
          )}
        </svg>

        {/* 节点层 */}
        {nodes.map(node => {
          const pos = getNodePos(node.id);
          const isDragging = draggingId === node.id;
          
          return (
            <div
              key={node.id}
              className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}`}
              style={{
                left: pos.x,
                top: pos.y,
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
        {mode === 'technical' && (
          <>
            {/* 外部服务区域背景 */}
            <div
              className="absolute rounded-xl border border-emerald-700/30 bg-emerald-900/10"
              style={{ left: 1300, top: 30, width: 240, height: 880, zIndex: 0 }}
            />
            <div 
              className="absolute text-emerald-400 text-sm font-medium"
              style={{ left: 1380, top: 45 }}
            >
              外部服务
            </div>

            {externalServices.map(service => {
              const pos = getServicePos(service.id);
              const isDragging = draggingId === service.id;
              
              return (
                <div
                  key={service.id}
                  className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    width: SERVICE_WIDTH,
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.15s ease',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, service.id, true)}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-900/50 to-slate-900/80 border border-emerald-500/40 hover:border-emerald-400/60 transition-colors">
                    <h5 className="text-white text-sm font-semibold">{service.name}</h5>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">{service.desc}</p>
                    {service.techDetail && (
                      <p className="text-emerald-400/60 text-[10px] mt-1 truncate">{service.techDetail}</p>
                    )}
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

export default DraggableCanvas;
