import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PRODUCT_DATA } from '../constants';
import { FileText, Cpu, ShieldCheck } from 'lucide-react';

const ProductDef: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      
      {/* SECTION: The Product Philosophy (The Output) */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Product Philosophy</span>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">{PRODUCT_DATA.title}</h2>
        <div className="inline-block px-4 py-2 bg-surfaceHighlight rounded-full border border-white/5">
             <p className="text-base text-white font-medium">{PRODUCT_DATA.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {PRODUCT_DATA.philosophy.map((item, index) => (
          <div key={index} className="bento-card p-8 flex flex-col items-center text-center hover:bg-surfaceHighlight transition-colors duration-300 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-secondary mb-4 opacity-50" />
            <h4 className="text-lg font-bold text-white mb-2">{item.label}</h4>
            <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: Skill */}
        <div className="bento-card p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-500"></div>
            <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-surfaceHighlight flex items-center justify-center text-white">
                        <FileText size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{PRODUCT_DATA.techStack.skill}</h3>
                </div>
                
                <p className="text-secondary text-sm mb-6 leading-relaxed border-l-2 border-white/10 pl-4">
                    {PRODUCT_DATA.techStack.skillDesc}
                </p>
                <div className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-3 py-2 w-fit">
                    DOCS = LOGIC (Natural Language)
                </div>
            </div>
        </div>

        {/* Card 2: Agent */}
        <div className="bento-card p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-all duration-500"></div>
            <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-surfaceHighlight flex items-center justify-center text-white">
                        <Cpu size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{PRODUCT_DATA.techStack.agent}</h3>
                </div>
                
                <p className="text-secondary text-sm mb-6 leading-relaxed border-l-2 border-white/10 pl-4">
                    {PRODUCT_DATA.techStack.agentDesc}
                </p>
                <div className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded px-3 py-2 w-fit">
                    INTENT -{'>'} FUNCTION CALLING
                </div>
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProductDef;
