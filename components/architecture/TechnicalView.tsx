/**
 * @deprecated 此组件已废弃，请使用 UnifiedCanvas 组件
 * 保留此文件仅供参考，新代码应使用 UnifiedCanvas
 */
import React from 'react';
import { ArchNode, ArchConnection, ExternalService } from '../../types';
import DraggableCanvas from './DraggableCanvas';

interface TechnicalViewProps {
  nodes: ArchNode[];
  connections: ArchConnection[];
  externalServices: ExternalService[];
}

const DEFAULT_LAYOUT: Record<string, { x: number; y: number }> = {
  // 主流程 - 左侧
  'entry': { x: 60, y: 40 },
  'agent-input': { x: 60, y: 220 },
  'context-orchestration': { x: 60, y: 400 },
  
  // 业务组件 - 中间区域
  'role-setting': { x: 360, y: 80 },
  'code-logic': { x: 640, y: 80 },
  'style-component': { x: 360, y: 280 },
  'memory-system': { x: 640, y: 280 },
  
  // 融合
  'context-fusion': { x: 920, y: 180 },
  
  // 后续流程 - 底部
  'review': { x: 60, y: 620 },
  'safety': { x: 340, y: 620 },
  'output': { x: 620, y: 620 },
  'feedback': { x: 900, y: 620 },
};

const SERVICE_LAYOUT: Record<string, { x: number; y: number }> = {
  'map-platform': { x: 1320, y: 80 },
  'knowledge-base': { x: 1320, y: 200 },
  'vector-db': { x: 1320, y: 320 },
  'cache': { x: 1320, y: 440 },
  'llm-api': { x: 1320, y: 560 },
  'rule-engine': { x: 1320, y: 680 },
};

const TechnicalView: React.FC<TechnicalViewProps> = ({
  nodes,
  connections,
  externalServices,
}) => {
  return (
    <DraggableCanvas
      nodes={nodes}
      connections={connections}
      externalServices={externalServices}
      mode="technical"
      defaultLayout={DEFAULT_LAYOUT}
      serviceLayout={SERVICE_LAYOUT}
    />
  );
};

export default TechnicalView;
