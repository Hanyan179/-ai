/**
 * @deprecated 此组件已废弃，请使用 UnifiedCanvas 组件
 * 保留此文件仅供参考，新代码应使用 UnifiedCanvas
 */
import React from 'react';
import { ArchNode, ArchConnection } from '../../types';
import DraggableCanvas from './DraggableCanvas';

interface BlackBoxViewProps {
  nodes: ArchNode[];
  connections: ArchConnection[];
}

const DEFAULT_LAYOUT: Record<string, { x: number; y: number }> = {
  'user-input': { x: 200, y: 350 },
  'ai-process': { x: 600, y: 350 },
  'result-output': { x: 1000, y: 350 },
};

const BlackBoxView: React.FC<BlackBoxViewProps> = ({ nodes, connections }) => {
  return (
    <DraggableCanvas
      nodes={nodes}
      connections={connections}
      mode="blackbox"
      defaultLayout={DEFAULT_LAYOUT}
    />
  );
};

export default BlackBoxView;
