import React, { useState } from 'react';
import { 
  MODE_CONFIGS,
  BLACK_BOX_NODES, 
  WHITE_BOX_NODES, 
  EXTERNAL_SERVICES,
  CONNECTIONS 
} from '../architectureConstants';
import { ViewMode } from '../types';
import { Box, Layers, Code2 } from 'lucide-react';

// ========== 3.1 模式切换组件 ModeToggle ==========
const ModeToggle: React.FC<{
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}> = ({ mode, onChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
      <div className="bg-surface p-1 rounded-xl flex items-center font-medium text-[12px] border border-white/10">
        {MODE_CONFIGS.map((config) => (
          <button
            key={config.id}
            onClick={() => onChange(config.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
              ${mode === config.id 
                ? 'bg-accent text-white font-semibold shadow-lg shadow-accent/20' 
                : 'text-secondary hover:text-primary hover:bg-white/5'}
            `}
          >
            {config.id === 'blackbox' && <Box size={14} />}
            {config.id === 'whitebox' && <Layers size={14} />}
            {config.id === 'technical' && <Code2 size={14} />}
            <span>{config.label}</span>
          </button>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-surface/50 rounded-lg border border-white/5">
        <span className="text-[11px] text-secondary">
          {MODE_CONFIGS.find(c => c.id === mode)?.desc}
        </span>
      </div>
    </div>
  );
};

// ========== 3.2 节点卡片组件 NodeCard ==========
const NodeCard: React.FC<{
  node: {
    id: string;
    type: string;
    title: string;
    businessDesc: string;
    inputLabel: string;
    outputLabel: string;
    techStack?: string[];
    techDesc?: string;
    isSharedTech?: boolean;
  };
  mode: ViewMode;
}> = ({ node, mode }) => {
  const getNodeStyle = () => {
    switch (node.type) {
      case 'stage':
        return 'bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] border-blue-500/50';
      case 'component':
        return 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-indigo-500/50';
      case 'fusion':
        return 'bg-gradient-to-br from-[#312E81] to-[#1E1B4B] border-purple-500/50';
      default:
        return 'bg-surface border-white/10';
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getNodeStyle()}`}>
      <h3 className="text-sm font-semibold text-primary mb-1">{node.title}</h3>
      
      {mode !== 'blackbox' && (
        <>
          <p className="text-xs text-secondary mb-2">{node.businessDesc}</p>
          <div className="flex gap-2 text-[10px]">
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">入: {node.inputLabel}</span>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded">出: {node.outputLabel}</span>
          </div>
        </>
      )}
      
      {mode === 'technical' && node.techStack && (
        <div className="mt-2 flex flex-wrap gap-1">
          {node.techStack.map((tech, i) => (
            <span 
              key={i} 
              className={`px-1.5 py-0.5 text-[9px] rounded ${
                node.isSharedTech 
                  ? 'bg-amber-500/20 text-amber-300' 
                  : 'bg-purple-500/20 text-purple-300'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== 3.7 主组件 ArchitectureDiagram ==========
const ArchitectureDiagram: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('whitebox');

  const nodes = mode === 'blackbox' ? BLACK_BOX_NODES : WHITE_BOX_NODES;

  // 黑盒模式：水平三节点布局
  if (mode === 'blackbox') {
    return (
      <div>
        <ModeToggle mode={mode} onChange={setMode} />
        <div className="flex items-center justify-center gap-8 py-12">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <NodeCard node={node} mode={mode} />
              {index < nodes.length - 1 && (
                <div className="flex items-center text-blue-400">
                  <div className="w-16 h-0.5 bg-blue-400"></div>
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-blue-400"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center text-secondary text-sm mt-4">
          这是普通用户理解的"提示词"工作方式 - 输入指令，AI 处理，输出结果
        </div>
      </div>
    );
  }

  // 白盒/技术模式：完整流程布局
  const stages = nodes.filter(n => n.type === 'stage' && !['feedback'].includes(n.id));
  const components = nodes.filter(n => n.type === 'component');
  const fusion = nodes.find(n => n.type === 'fusion');
  const feedback = nodes.find(n => n.id === 'feedback');

  return (
    <div>
      <ModeToggle mode={mode} onChange={setMode} />
      
      <div className="space-y-6">
        {/* 主流程阶段 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.slice(0, 3).map(node => (
            <NodeCard key={node.id} node={node} mode={mode} />
          ))}
        </div>

        {/* 四大组件 */}
        <div className="border border-white/10 rounded-xl p-4 bg-surface/30">
          <h4 className="text-xs text-secondary mb-3 uppercase tracking-wider">上下文编排 - 四大组件</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {components.map(node => (
              <NodeCard key={node.id} node={node} mode={mode} />
            ))}
          </div>
        </div>

        {/* 上下文融合 */}
        {fusion && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <NodeCard node={fusion} mode={mode} />
            </div>
          </div>
        )}

        {/* 输出和反馈 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stages.slice(3).map(node => (
            <NodeCard key={node.id} node={node} mode={mode} />
          ))}
          {feedback && <NodeCard node={feedback} mode={mode} />}
        </div>

        {/* 技术模式：外部服务 */}
        {mode === 'technical' && (
          <div className="border border-emerald-500/30 rounded-xl p-4 bg-emerald-900/10">
            <h4 className="text-xs text-emerald-400 mb-3 uppercase tracking-wider">外部服务依赖</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EXTERNAL_SERVICES.map(service => (
                <div key={service.id} className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-emerald-300">{service.name}</h5>
                  <p className="text-xs text-secondary">{service.desc}</p>
                  {service.techDetail && (
                    <span className="text-[9px] text-emerald-400/70 mt-1 block">{service.techDetail}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 连线说明 */}
        <div className="flex flex-wrap gap-4 text-xs text-secondary justify-center pt-4 border-t border-white/5">
          <span className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-blue-400"></span> 主数据流
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-green-400 border-dashed border-t-2 border-green-400 bg-transparent"></span> 回流闭环
          </span>
          {mode === 'technical' && (
            <>
              <span className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-purple-400"></span> 技术连接
              </span>
              <span className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-amber-400"></span> 共通技术
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
