import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, User, FileText } from 'lucide-react';
import { HERO_DATA, PROFILE_DATA } from '../constants';
import SectionWrapper from './SectionWrapper';

const Hero: React.FC = () => {
  return (
    <SectionWrapper className="bg-background relative">
      <div className="flex flex-col items-start justify-center h-full max-w-5xl">
        
        {/* Label - Application Context */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center space-x-3"
        >
          <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wide uppercase">
            {HERO_DATA.label}
          </span>
          <span className="text-secondary text-xs tracking-wide uppercase border-l border-white/10 pl-3">
            Internal Confidential
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans font-bold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
        >
          {HERO_DATA.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-xl md:text-2xl text-secondary font-medium tracking-tight max-w-3xl leading-relaxed mb-10"
        >
          {HERO_DATA.subtitle}
        </motion.p>

        {/* Applicant Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="flex items-center space-x-6 p-6 rounded-2xl bg-surfaceHighlight/30 border border-white/5 backdrop-blur-md max-w-lg"
        >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
               <User size={24} />
            </div>
            <div>
               <div className="text-xs text-secondary uppercase tracking-widest mb-1">Applicant</div>
               <div className="text-white font-bold text-lg">{PROFILE_DATA.role}</div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
               <div className="text-xs text-secondary uppercase tracking-widest mb-1">Focus</div>
               <div className="text-accent font-medium">AI Engineering</div>
            </div>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-secondary/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to View Application</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </SectionWrapper>
  );
};

export default Hero;
