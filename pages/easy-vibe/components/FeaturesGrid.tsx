import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { FEATURES } from '../constants';

const featureIcons = ['🗺️', '📖', '🖥️', '🧠', '🎮', '⌨️'];
const featureColors = [
  'from-yellow-500/20 to-orange-500/20 border-yellow-500/20',
  'from-blue-500/20 to-cyan-500/20 border-blue-500/20',
  'from-green-500/20 to-emerald-500/20 border-green-500/20',
  'from-purple-500/20 to-pink-500/20 border-purple-500/20',
  'from-red-500/20 to-orange-500/20 border-red-500/20',
  'from-cyan-500/20 to-blue-500/20 border-cyan-500/20',
];

const FeaturesGrid: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles size={12} className="inline mr-1" />
          核心亮点
        </span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          六大特色体验
        </h2>
        <p className="text-secondary text-xl max-w-3xl">
          从学习地图到交互式教程，Easy-Vibe 让学习编程变得
          <span className="text-white font-semibold">直观、有趣、高效</span>。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`rounded-2xl p-8 bg-gradient-to-br ${featureColors[i]} border transition-all duration-300 hover:scale-[1.02] group`}
          >
            <div className="text-4xl mb-4">{featureIcons[i]}</div>
            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{feature.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesGrid;
