import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { CONTRIBUTORS } from '../constants';

const Contributors: React.FC = () => {
  return (
    <SectionWrapper compact>
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">🙏 贡献�?/span>
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">感谢每位贡献�?/h2>
        <p className="text-secondary text-lg max-w-2xl">Easy-Vibe �?Datawhale 社区驱动，感谢所有贡献者的付出�?/p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-10">
        {CONTRIBUTORS.map((person, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/10"
          >
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
              {person.name[0]}
            </div>
            <div>
              <div className="text-primary text-sm font-medium">{person.name}</div>
              <div className="text-secondary/50 text-[10px]">{person.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bento-card rounded-2xl p-6 max-w-xl mx-auto text-center">
        <Heart size={16} className="text-red-400 mx-auto mb-3" />
        <p className="text-secondary text-sm leading-relaxed">
          特别感谢 @Sm1les 对本项目的帮助与支持，以及所有为本项目做出贡献的开发者们和支持点赞的朋友�?❤️
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Contributors;
