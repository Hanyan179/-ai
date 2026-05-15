import React from 'react';
import SectionWrapper from './SectionWrapper';
import { ROADMAP_DATA } from '../constants';

const Roadmap: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">{ROADMAP_DATA.title}</h2>
      </div>

      <div className="space-y-4">
        {ROADMAP_DATA.steps.map((step, index) => (
          <div key={index} className="bento-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center group hover:bg-surfaceHighlight transition-colors duration-300">
            
            <div className="flex-shrink-0 w-24">
                <span className="text-xs font-bold tracking-wider text-accent uppercase bg-accent/10 px-2 py-1 rounded">
                    {step.phase}
                </span>
            </div>

            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{step.name}</h3>
                <p className="text-secondary text-sm leading-relaxed max-w-2xl">
                    {step.desc}
                </p>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/10 mx-4"></div>

            <div className="flex-shrink-0 w-48">
                <div className="text-xs text-secondary mb-1">Key Action</div>
                <div className="text-sm font-medium text-white">{step.action}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Roadmap;
