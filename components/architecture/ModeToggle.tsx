import React from 'react';
import { motion } from 'framer-motion';
import { ViewMode, ModeConfig } from '../../types';
import { MODE_CONFIGS } from '../../architectureConstants';

interface ModeToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {/* 模式切换按钮组 */}
      <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50">
        {MODE_CONFIGS.map((config: ModeConfig) => (
          <button
            key={config.id}
            onClick={() => onModeChange(config.id)}
            className={`
              relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300
              ${currentMode === config.id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {/* 高亮背景 */}
            {currentMode === config.id && (
              <motion.div
                layoutId="activeMode"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{config.label}</span>
          </button>
        ))}
      </div>

      {/* 当前模式说明文字 */}
      <motion.p
        key={currentMode}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-slate-400 text-sm text-center"
      >
        {MODE_CONFIGS.find(c => c.id === currentMode)?.desc}
      </motion.p>
    </div>
  );
};

export default ModeToggle;
