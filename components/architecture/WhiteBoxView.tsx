/**
 * @deprecated 此组件已废弃，请使用 UnifiedCanvas 组件
 * 保留此文件仅供参考，新代码应使用 UnifiedCanvas
 */
import React from 'react';
import { ArchNode, ArchConnection, ViewMode } from '../../types';
import DraggableCanvas from './DraggableCanvas';

interface WhiteBoxViewProps {
  nodes: ArchNode[];
  connections: ArchConnection[];
  mode?: ViewMode;
}

const DEFAULT_LAYOUT: Record<string, { x: number; y: number }> = {
  // 主流程 - 左侧
  'entry': { x: 80, y: 40 },
  'agent-input': { x: 80, y: 220 },
  'context-orchestration': { x: 80, y: 400 },
  
  // 业务组件 - 中间区域
  'role-setting': { x: 400, y: 80 },
  'code-logic': { x: 700, y: 80 },
  'style-component': { x: 400, y: 280 },
  'memory-system': { x: 700, y: 280 },
  
  // 融合
  'context-fusion': { x: 1000, y: 180 },
  
  // 后续流程 - 底部
  'review': { x: 80, y: 620 },
  'safety': { x: 380, y: 620 },
  'output': { x: 680, y: 620 },
  'feedback': { x: 980, y: 620 },
};

const WhiteBoxView: React.FC<WhiteBoxViewProps> = ({ 
  nodes, 
  connections,
  mode = 'whitebox' 
}) => {
  return (
    <DraggableCanvas
      nodes={nodes}
      connections={connections}
      mode={mode}
      defaultLayout={DEFAULT_LAYOUT}
    />
  );
};

export default WhiteBoxView;
