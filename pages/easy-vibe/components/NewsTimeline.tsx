import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { NEWS_ITEMS } from '../constants';

const NewsTimeline: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 5);

  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">🔥 News</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">最新动态</h2>
        <p className="text-secondary text-xl max-w-3xl">持续更新中，跟踪 Easy-Vibe 的最新进展。</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

        <div className="flex flex-col gap-1">
          {visibleItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative pl-16 py-4 group"
            >
              <div className="absolute left-[18px] top-6 w-3 h-3 rounded-full bg-accent/60 border-2 border-background group-hover:bg-accent transition-colors" />
              <div className="text-secondary/50 text-xs mb-1 font-mono">{item.date}</div>
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">{item.emoji}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-secondary text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && NEWS_ITEMS.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 mx-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-secondary hover:text-white hover:bg-white/10 transition-all text-sm"
          >
            查看更多
            <ChevronDown size={14} />
          </button>
        )}
      </div>
    </SectionWrapper>
  );
};

export default NewsTimeline;
