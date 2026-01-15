import React, { useState } from 'react';
import MindMap from './MindMap';
import WorkflowMap from './WorkflowMap';
import CapabilityValueView from './CapabilityValueView';
import DemoFlowView from './DemoFlowView';

type ViewType = 'capability' | 'workflow' | 'value-analysis' | 'demo-flow';

const VIEW_CONFIG = {
  capability: {
    title: 'Agent 能力架构',
    desc: '标准8层架构：感知 → 记忆 → 知识 → 规划 → 工具 → 执行 → 反思 → 输出',
    label: '能力架构',
  },
  workflow: {
    title: '业务工作流',
    desc: '一个具体公文从用户输入到最终输出的完整流程',
    label: '业务工作流',
  },
  'value-analysis': {
    title: '能力价值分析',
    desc: '基于行业洞察的能力分层：区分护城河与耗材',
    label: '💎 价值分析',
  },
  'demo-flow': {
    title: 'Demo 演示流转',
    desc: '用户与 AI 智能助手交互的完整流程：导航、查询、填表、跨页面任务',
    label: '🎬 Demo演示',
  },
};

/**
 * ArchitectureDiagram 主组件
 * 三种视图：
 * 1. 能力架构图 - Agent 具备什么能力
 * 2. 业务工作流 - 用户输入到输出的完整流程
 * 3. 能力价值分析 - 行业洞察：哪些能力真正值钱
 */
const ArchitectureDiagram: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('capability');
  
  const currentView = VIEW_CONFIG[viewType];
  
  return (
    <div className="w-full">
      {/* 标题和切换 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">
            {currentView.title}
          </h2>
          <p className="text-slate-500 text-xs">
            {currentView.desc}
          </p>
        </div>
        
        {/* 视图切换 */}
        <div className="flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          {(Object.keys(VIEW_CONFIG) as ViewType[]).map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                viewType === type 
                  ? type === 'value-analysis' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                    : 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {VIEW_CONFIG[type].label}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      {viewType === 'capability' && <MindMap />}
      {viewType === 'workflow' && <WorkflowMap />}
      {viewType === 'value-analysis' && <CapabilityValueView />}
      {viewType === 'demo-flow' && <DemoFlowView />}
    </div>
  );
};

export default ArchitectureDiagram;
