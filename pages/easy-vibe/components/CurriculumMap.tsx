import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { CURRICULUM } from '../constants';
import { DetailModalData } from './DetailModal';

const stageColorMap: Record<string, { text: string; bg: string; border: string }> = {
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/5', border: 'border-yellow-400/20' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/20' },
  green: { text: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-400/20' },
};

interface CurriculumMapProps {
  onOpenDetail: (data: DetailModalData) => void;
}

const CurriculumMap: React.FC<CurriculumMapProps> = ({ onOpenDetail }) => {
  const [expandedStage, setExpandedStage] = useState<number>(0);

  return (
    <SectionWrapper id="curriculum">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">📖 内容导航</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">课程体系</h2>
        <p className="text-secondary text-xl max-w-3xl">
          从零基础到高级开发，<span className="text-white font-semibold">三个阶段</span>循序渐进。
        </p>
      </div>

      {/* Stage Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {CURRICULUM.map((section, i) => {
          const c = stageColorMap[section.color] || stageColorMap.blue;
          const isActive = expandedStage === i;
          return (
            <button
              key={i}
              onClick={() => setExpandedStage(i)}
              className={`px-5 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                isActive
                  ? `${c.border} ${c.bg} ${c.text} font-semibold`
                  : 'border-white/10 bg-white/5 text-secondary hover:text-white hover:border-white/20'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <div className="text-left">
                <div className="text-sm font-medium">阶段{section.stage}</div>
                <div className="text-xs opacity-70">{section.stageLabel}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Content */}
      {CURRICULUM.map((section, si) => {
        if (si !== expandedStage) return null;
        const c = stageColorMap[section.color] || stageColorMap.blue;
        return (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {section.chapters.map((ch, ci) => (
              <button
                key={ci}
                onClick={() => onOpenDetail({
                  title: ch.title,
                  description: ch.description,
                  detail: ch.detail,
                  keyPoints: ch.keyPoints,
                  color: section.color,
                  stage: section.stage,
                  stageLabel: section.stageLabel,
                  index: ci,
                })}
                className={`bento-card rounded-xl p-5 border ${c.border} hover:bg-white/[0.03] transition-all duration-200 group flex items-start gap-4 text-left cursor-pointer`}
              >
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <span className={`${c.text} text-sm font-bold`}>{String(ci + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm mb-1 group-hover:text-accent transition-colors">
                    {ch.title}
                  </div>
                  <p className="text-secondary text-xs leading-relaxed">{ch.description}</p>
                </div>
                <ChevronRight size={14} className="text-secondary/20 group-hover:text-secondary/60 transition-colors shrink-0 mt-1" />
              </button>
            ))}
          </motion.div>
        );
      })}
    </SectionWrapper>
  );
};

export default CurriculumMap;
