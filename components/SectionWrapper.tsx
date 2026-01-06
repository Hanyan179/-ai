import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`min-h-screen flex flex-col justify-center py-24 px-8 md:px-20 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring easing
        className="max-w-[1200px] mx-auto w-full z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
