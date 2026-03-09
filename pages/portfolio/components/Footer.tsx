import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-8 bg-background border-t border-white/5">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          重塑研发分工
        </h2>
        
        <p className="text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
          人类负责<span className="text-white font-medium">顶层设计</span>，AI负责<span className="text-white font-medium">工程落地</span>。
        </p>
        
        <div className="text-secondary/40 text-xs tracking-wide">
          © {new Date().getFullYear()} Engineering Strategy Dept. Internal Use Only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
