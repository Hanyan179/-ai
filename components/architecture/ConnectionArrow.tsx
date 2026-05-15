import React from 'react';
import { ArchConnection, ArchNode, ConnectionType } from '../../types';
import { LINE_STYLES } from '../../architectureConstants';

interface ConnectionArrowProps {
  connection: ArchConnection;
  fromNode: ArchNode | undefined;
  toNode: ArchNode | undefined;
}

/**
 * 获取节点中心点坐标
 */
const getNodeCenter = (node: ArchNode | undefined): { x: number; y: number } => {
  if (!node?.position) return { x: 0, y: 0 };
  
  // 根据节点类型估算尺寸（更新为新的更大尺寸）
  const width = node.type === 'component' ? 200 : node.type === 'fusion' ? 220 : 240;
  const height = node.type === 'component' ? 120 : node.type === 'fusion' ? 130 : 120;
  
  return {
    x: node.position.x + width / 2,
    y: node.position.y + height / 2,
  };
};

/**
 * 计算连线路径（支持曲线）
 */
const calculatePath = (
  from: { x: number; y: number },
  to: { x: number; y: number },
  type: ConnectionType
): string => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // 回流连线使用曲线
  if (type === 'feedback') {
    const midX = from.x + dx / 2;
    const controlOffset = Math.abs(dx) * 0.3;
    return `M ${from.x} ${from.y} Q ${midX - controlOffset} ${from.y + dy * 0.5} ${to.x} ${to.y}`;
  }
  
  // 技术连线使用贝塞尔曲线
  if (type === 'tech' || type === 'shared') {
    const controlX1 = from.x + dx * 0.3;
    const controlY1 = from.y;
    const controlX2 = to.x - dx * 0.3;
    const controlY2 = to.y;
    return `M ${from.x} ${from.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${to.x} ${to.y}`;
  }
  
  // 主数据流使用直线或简单曲线
  if (Math.abs(dx) < 50) {
    // 垂直方向，使用直线
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  
  // 有水平偏移，使用平滑曲线
  const midY = from.y + dy / 2;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
};

const ConnectionArrow: React.FC<ConnectionArrowProps> = ({
  connection,
  fromNode,
  toNode,
}) => {
  if (!fromNode || !toNode) return null;

  const style = LINE_STYLES[connection.type] || LINE_STYLES.main;
  const from = getNodeCenter(fromNode);
  const to = getNodeCenter(toNode);
  const path = calculatePath(from, to, connection.type);
  
  // 计算标签位置（连线中点）
  const labelX = (from.x + to.x) / 2;
  const labelY = (from.y + to.y) / 2;

  // 生成唯一的 marker ID
  const markerId = `arrow-${connection.id}`;

  return (
    <g className="connection-arrow">
      {/* 定义箭头标记 */}
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,8 L10,4 z"
            fill={style.stroke}
          />
        </marker>
      </defs>

      {/* 连线路径 */}
      <path
        d={path}
        fill="none"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.strokeDasharray === 'none' ? undefined : style.strokeDasharray}
        markerEnd={`url(#${markerId})`}
        className="transition-all duration-300"
      />

      {/* 数据标签 */}
      {connection.dataLabel && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          {/* 标签背景 */}
          <rect
            x={-connection.dataLabel.length * 5 - 8}
            y={-12}
            width={connection.dataLabel.length * 10 + 16}
            height={24}
            rx={4}
            fill="rgba(15, 23, 42, 0.95)"
            stroke={style.stroke}
            strokeWidth={1}
          />
          {/* 标签文字 */}
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={style.stroke}
            fontSize={12}
            fontWeight={500}
          >
            {connection.dataLabel}
          </text>
        </g>
      )}
    </g>
  );
};

export default ConnectionArrow;
