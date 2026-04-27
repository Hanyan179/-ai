import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { KNOWLEDGE_AREAS } from '../constants';
import { DetailModalData } from './DetailModal';

const areaColorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  green: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  accent: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
  red: { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
};

interface KnowledgeBaseProps {
  onOpenDetail: (data: DetailModalData) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onOpenDetail }) => {
  const [expandedArea, setExpandedArea] = useState<number | null>(null);

  return (
    <SectionWrapper id="knowledge">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">📚 附录知识库</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">9 大知识领域</h2>
        <p className="text-secondary text-xl max-w-3xl">
          涵盖 <span className="text-white font-semibold">80+ 交互式专题</span>，
          以动画和可视化组件帮助你直观理解核心概念。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {KNOWLEDGE_AREAS.map((area, i) => {
          const c = areaColorMap[area.color] || areaColorMap.blue;
          const isExpanded = expandedArea === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`bento-card rounded-xl overflow-hidden border ${c.border} transition-all duration-200 ${isExpanded ? c.bg : ''}`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedArea(isExpanded ? null : i)}
                className="w-full p-5 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-2xl">{area.icon}</span>
                <div className="flex-1">
                  <div className={`font-semibold text-sm ${c.text}`}>{area.title}</div>
                  <div className="text-secondary/50 text-xs mt-0.5">{area.topics.length} 个专题</div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <BookOpen size={14} className="text-secondary/40" />
                </motion.div>
              </button>

              {/* Topics */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-5"
                >
                  <div className="flex flex-col gap-1">
                    {area.topics.map((topic, ti) => (
                      <button
                        key={ti}
                        onClick={() => onOpenDetail({
                          title: topic.name,
                          description: `${area.title} 领域下的交互式专题`,
                          detail: topic.detail,
                          keyPoints: topic.keyPoints,
                          color: area.color,
                          areaTitle: area.title,
                          index: ti,
                        })}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group text-sm text-left w-full"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${c.text} shrink-0`} style={{ opacity: 0.5 }} />
                        <span className="text-secondary group-hover:text-white transition-colors flex-1">{topic.name}</span>
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default KnowledgeBase;
