import React from 'react';
import SectionWrapper from './SectionWrapper';
import { ENGINEER_DEFN_DATA } from '../constants';
import { Code2, Lightbulb, Rocket } from 'lucide-react';

const icons = {
  Code2,
  Lightbulb,
  Rocket
};

const EngineerRedefinition: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="mb-24">
        <div className="text-center mb-12">
            <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Mindset Shift</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">{ENGINEER_DEFN_DATA.title}</h2>
            <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
                {ENGINEER_DEFN_DATA.desc}
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {ENGINEER_DEFN_DATA.triad.map((item, index) => {
                // @ts-ignore
                const Icon = icons[item.icon] || Code2;
                return (
                    <div key={index} className="bento-card p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
                        <div className={`absolute top-0 right-0 p-20 opacity-5 rounded-full blur-2xl -mr-10 -mt-10 bg-white group-hover:bg-accent transition-colors`}></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-3 rounded-xl bg-surfaceHighlight border border-white/5 ${item.color}`}>
                                    <Icon size={28} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-white/20">0{index + 1}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-secondary text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default EngineerRedefinition;
