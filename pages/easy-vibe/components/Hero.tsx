import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, GitFork } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <SectionWrapper className="bg-background relative">
      <div className="flex flex-col items-center justify-center h-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 via-accent/20 to-green-500/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎵</span>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 flex-wrap justify-center"
        >
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wide">
            Datawhale 开源项目
          </span>
          <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wide">
            CC BY-NC-SA 4.0
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans font-bold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
        >
          Easy-Vibe
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-xl md:text-2xl text-secondary font-medium tracking-tight max-w-3xl leading-relaxed mb-4"
        >
          直接上手，一起 vibe！<span className="text-white">会说话就会做应用。</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-secondary/60 text-base mb-10 max-w-2xl"
        >
          Jump right in and vibe together — if you can talk, you can build apps.
        </motion.p>

        {/* CTA — 站内锚点跳转 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => onScrollTo('learning-paths')}
            className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center gap-2"
          >
            🚀 开始探索
          </button>
          <button
            onClick={() => onScrollTo('curriculum')}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
          >
            📖 课程体系
          </button>
          <button
            onClick={() => onScrollTo('knowledge')}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
          >
            ✨ 知识库
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-8 text-secondary text-sm flex-wrap justify-center"
        >
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            <span>GitHub Trending</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <GitFork size={14} className="text-green-400" />
            <span>开源社区驱动</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div><span>10+ 语言支持</span></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-secondary/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </SectionWrapper>
  );
};

export default Hero;
