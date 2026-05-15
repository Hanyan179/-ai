import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const adviceItems = [
  { audience: '零基础、产品经理、创业者', suggestion: '从第一阶段开始', scrollTo: 'curriculum', color: 'yellow' },
  { audience: '有开发经验', suggestion: '从第二阶段开始', scrollTo: 'curriculum', color: 'blue' },
  { audience: '想直接做复杂项目', suggestion: '进入第三阶段', scrollTo: 'curriculum', color: 'green' },
  { audience: '想查资料', suggestion: '查看知识库', scrollTo: 'knowledge', color: 'purple' },
];

const colorMap: Record<string, string> = {
  yellow: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
  blue: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  green: 'text-green-400 border-green-400/20 bg-green-400/5',
  purple: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
};

interface LearningAdviceProps {
  onScrollTo: (id: string) => void;
}

const LearningAdvice: React.FC<LearningAdviceProps> = ({ onScrollTo }) => {
  return (
    <SectionWrapper compact>
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">💡 学习建议</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">快速定位你的起点</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {adviceItems.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => onScrollTo(item.scrollTo)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={`rounded-xl p-5 border ${colorMap[item.color]} flex items-center gap-4 hover:scale-[1.02] transition-all duration-200 group text-left cursor-pointer`}
          >
            <div className="flex-1">
              <div className="text-white text-sm font-medium mb-1">{item.audience}</div>
              <div className="text-secondary text-xs flex items-center gap-1">
                <ArrowRight size={10} />
                {item.suggestion}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default LearningAdvice;
