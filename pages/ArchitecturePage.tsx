import React from 'react';
import { motion } from 'framer-motion';
import { ArchitectureDiagram } from '../components/architecture';

/**
 * ArchitecturePage 页面组件
 * 全屏展示 Agent 架构
 */
const ArchitecturePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* 架构图主体 - 全屏宽度 */}
      <main className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArchitectureDiagram />
        </motion.div>
      </main>
    </div>
  );
};

export default ArchitecturePage;
