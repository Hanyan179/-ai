import React from 'react';
import SectionWrapper from './SectionWrapper';
import { OPENAI_CASE_DATA } from '../constants';

const OpenAICase: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="mb-16">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Benchmark</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{OPENAI_CASE_DATA.title}</h2>
        <p className="text-xl text-secondary">{OPENAI_CASE_DATA.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {OPENAI_CASE_DATA.stats.map((stat, index) => (
          <div key={index} className="bento-card p-8 rounded-2xl flex flex-col justify-between h-40 group hover:bg-surfaceHighlight transition-colors duration-300">
            <div>
              <div className="text-sm text-secondary font-medium mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="text-xs text-secondary/60 font-medium uppercase tracking-wider">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OPENAI_CASE_DATA.insights.map((insight, index) => (
          <div key={index} className="bento-card p-8 rounded-2xl md:col-span-1">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm mb-6">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
            <p className="text-secondary leading-relaxed text-sm">
              {insight.desc}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default OpenAICase;
