import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { LEARNING_PATHS } from '../constants';
import { DetailModalData } from './DetailModal';

const colorMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  yellow: { border: 'border-yellow-400/20', bg: 'bg-yellow-400/5', text: 'text-yellow-400', hover: 'hover:border-yellow-400/40' },
  green: { border: 'border-green-400/20', bg: 'bg-green-400/5', text: 'text-green-400', hover: 'hover:border-green-400/40' },
  blue: { border: 'border-blue-400/20', bg: 'bg-blue-400/5', text: 'text-blue-400', hover: 'hover:border-blue-400/40' },
  purple: { border: 'border-purple-400/20', bg: 'bg-purple-400/5', text: 'text-purple-400', hover: 'hover:border-purple-400/40' },
  accent: { border: 'border-accent/20', bg: 'bg-accent/5', text: 'text-accent', hover: 'hover:border-accent/40' },
};

interface LearningPathsProps {
  onOpenDetail: (data: DetailModalData) => void;
}

const LearningPaths: React.FC<LearningPathsProps> = ({ onOpenDetail }) => {
  return (
    <SectionWrapper id="learning-paths">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">你的学习路径</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">选择你的起点</h2>
        <p className="text-secondary text-xl max-w-3xl">
          无论你是完全零基础还是资深开发者，<br className="hidden md:block" />都能找到适合自己的学习路径。
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {LEARNING_PATHS.map((path, i) => {
          const c = colorMap[path.color] || colorMap.accent;
          return (
            <motion.button
              key={i}
              onClick={() => onOpenDetail({
                title: path.title,
                description: path.learn,
                detail: path.detail,
                keyPoints: path.keyPoints,
                color: path.color,
                icon: path.icon,
                audience: path.audience,
                learn: path.learn,
                outcome: path.outcome,
              })}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bento-card rounded-2xl p-6 md:p-8 border ${c.border} ${c.bg} ${c.hover} transition-all duration-200 group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-left cursor-pointer`}
            >
              <div className="flex items-center gap-4 md:w-72 shrink-0">
                <span className="text-4xl">{path.icon}</span>
                <div>
                  <div className="font-bold text-lg text-white">{path.title}</div>
                  <div className="text-secondary text-xs mt-1">适合：{path.audience}</div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-secondary/60 text-xs mb-1">学什么</div>
                  <div className="text-secondary text-sm">{path.learn}</div>
                </div>
                <div>
                  <div className="text-secondary/60 text-xs mb-1">你会得到</div>
                  <div className={`${c.text} text-sm font-medium`}>{path.outcome}</div>
                </div>
              </div>
              <div className="shrink-0">
                <ChevronRight size={18} className="text-secondary/30 group-hover:text-white transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default LearningPaths;
