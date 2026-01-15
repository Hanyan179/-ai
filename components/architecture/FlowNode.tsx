import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface FlowNodeData {
  label: string;
  desc: string;
  nodeType: 'stage' | 'component' | 'fusion' | 'service';
  techStack?: string[];
}

const FlowNode: React.FC<NodeProps<FlowNodeData>> = ({ data }) => {
  const { label, desc, nodeType, techStack } = data;

  const getNodeStyle = () => {
    switch (nodeType) {
      case 'stage':
        return 'bg-gradient-to-br from-blue-900/80 to-slate-900 border-blue-500/60 hover:border-blue-400';
      case 'component':
        return 'bg-gradient-to-br from-indigo-900/80 to-slate-900 border-indigo-500/60 hover:border-indigo-400';
      case 'fusion':
        return 'bg-gradient-to-br from-purple-900/80 to-slate-900 border-purple-500/80 hover:border-purple-400';
      case 'service':
        return 'bg-gradient-to-br from-emerald-900/80 to-slate-900 border-emerald-500/60 hover:border-emerald-400';
      default:
        return 'bg-slate-800 border-slate-600';
    }
  };

  const getWidth = () => {
    switch (nodeType) {
      case 'service': return 'w-44';
      case 'fusion': return 'w-48';
      default: return 'w-52';
    }
  };

  return (
    <div className={`${getNodeStyle()} ${getWidth()} rounded-xl border-2 p-4 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-400 border-2 border-slate-900"
      />
      
      <div className="text-white font-semibold text-sm mb-1">{label}</div>
      <div className="text-slate-400 text-xs leading-relaxed">{desc}</div>
      
      {techStack && techStack.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {techStack.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded">
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-400 border-2 border-slate-900"
      />
    </div>
  );
};

export default memo(FlowNode);
