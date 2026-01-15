import React from 'react';
import { motion } from 'framer-motion';
import { ViewMode, ArchNode, NodeType } from '../../types';
import { NODE_STYLES, getTechDetail } from '../../architectureConstants';

interface NodeCardProps {
  node: ArchNode;
  mode: ViewMode;
  onClick?: () => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, mode, onClick }) => {
  const style = NODE_STYLES[node.type] || NODE_STYLES.stage;
  const techDetail = mode === 'technical' ? getTechDetail(node.id) : undefined;
  
  // 根据节点类型确定尺寸 - 大幅增加尺寸
  const getNodeSize = (type: NodeType): { width: string; minHeight: string } => {
    switch (type) {
      case 'component':
        return { width: '200px', minHeight: '120px' };
      case 'fusion':
        return { width: '220px', minHeight: '130px' };
      case 'service':
        return { width: '180px', minHeight: '100px' };
      default:
        return { width: '240px', minHeight: '120px' };
    }
  };

  const size = getNodeSize(node.type);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer group"
      style={{
        position: 'absolute',
        left: node.position?.x ?? 0,
        top: node.position?.y ?? 0,
        width: size.width,
        minHeight: size.minHeight,
      }}
    >
      <div
        className="p-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20"
        style={{
          background: style.background,
          border: style.border,
          borderRadius: style.borderRadius,
        }}
      >
        {/* 标题 - 所有模式显示 */}
        <h4 className="text-white font-semibold text-base text-center mb-2">
          {node.title}
        </h4>

        {/* 白盒模式和技术模式：显示业务描述 */}
        {mode !== 'blackbox' && node.businessDesc && (
          <p className="text-slate-400 text-sm text-center leading-relaxed mb-2">
            {node.businessDesc}
          </p>
        )}

        {/* 白盒模式和技术模式：显示输入输出标签 */}
        {mode !== 'blackbox' && (node.inputLabel || node.outputLabel) && (
          <div className="mt-3 flex flex-col gap-2">
            {node.inputLabel && (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-medium">
                  入
                </span>
                <span className="text-xs text-slate-400">
                  {node.inputLabel}
                </span>
              </div>
            )}
            {node.outputLabel && (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded font-medium">
                  出
                </span>
                <span className="text-xs text-slate-400">
                  {node.outputLabel}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 技术模式：显示技术栈徽章 */}
        {mode === 'technical' && techDetail && (
          <div className="mt-3 pt-3 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-1.5 justify-center">
              {techDetail.techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className={`
                    text-xs px-2 py-1 rounded
                    ${techDetail.isSharedTech
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }
                  `}
                >
                  {tech}
                </span>
              ))}
              {techDetail.techStack.length > 3 && (
                <span className="text-xs text-slate-500">
                  +{techDetail.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 共通技术标识 */}
        {mode === 'technical' && techDetail?.isSharedTech && (
          <div className="absolute -top-2 -right-2">
            <span className="text-xs px-2 py-1 bg-orange-500 text-white rounded-full font-medium">
              共通
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NodeCard;
