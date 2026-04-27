import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { TARGET_AUDIENCES } from '../constants';

const WhySection: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
          为什么需要 Easy-Vibe
        </span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          说出来，就能做出来
        </h2>
        <p className="text-secondary text-xl max-w-3xl leading-relaxed">
          想做个记账小程序？说出来。想要一个支持微信登录的预约系统？说出来。
          <br className="hidden md:block" />
          在 AI 时代，编程先从<span className="text-white font-semibold">描述你想要什么</span>开始。
        </p>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 mb-14"
      >
        <div className="bento-card rounded-2xl p-8 max-w-2xl mx-auto">
          <MessageSquare size={20} className="text-accent mx-auto mb-4" />
          <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Easy-Vibe 教你的，就是怎样把它
            <span className="text-accent">一步步做成真正的产品</span>。
          </p>
        </div>
      </motion.div>

      {/* Target Audiences */}
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-6 text-center">适合谁？</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {TARGET_AUDIENCES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bento-card rounded-xl p-5 text-center hover:border-accent/20 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-white font-semibold text-sm mb-2">{item.label}</div>
              <p className="text-secondary text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WhySection;
