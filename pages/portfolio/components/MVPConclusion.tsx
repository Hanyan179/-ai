import React from 'react';
import SectionWrapper from './SectionWrapper';
import { MVP_PROJECT, MVP_ANALYSIS_DATA } from '../constants';
import { ProjectCard } from './ProjectShowcase'; // Reuse the card visual
import { ArrowRight, AlertTriangle, CheckCircle, Database, Gavel, Cog, Star } from 'lucide-react';

const MVPConclusion: React.FC = () => {
  return (
    <SectionWrapper className="bg-surfaceHighlight/5">
      
      {/* 1. Header & MVP Showcase */}
      <div className="mb-16">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">
            Final Answer
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            最终答卷：落地验证
        </h2>

        {/* Labels/Badges */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center space-x-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-wider">
                <Star size={14} className="fill-accent" />
                <span>Critical Evidence / 核心实证</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-1.5 bg-warning/10 border border-warning/20 rounded-full text-warning text-xs font-bold uppercase tracking-wider">
                <AlertTriangle size={14} />
                <span>MVP Draft: Logic Verification / 仅验证逻辑闭环</span>
            </div>
        </div>

        <div className="mb-16">
            <ProjectCard project={MVP_PROJECT} index={0} />
        </div>
      </div>

      {/* 2. Comparison: Why this MVP matters despite the platform having similar features */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-background rounded-full border border-white/10">
             <ArrowRight className="text-white/50" />
          </div>

          {/* Left: Reality */}
          <div className="p-8 rounded-2xl bg-surfaceHighlight/20 border border-white/5 border-l-4 border-l-secondary/50">
             <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-secondary" />
                <h3 className="text-xl font-bold text-white">{MVP_ANALYSIS_DATA.comparison.current.title}</h3>
             </div>
             <ul className="space-y-4">
                {MVP_ANALYSIS_DATA.comparison.current.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
                        <span className="block w-1.5 h-1.5 rounded-full bg-secondary/50 mt-1.5 flex-shrink-0" />
                        {p}
                    </li>
                ))}
             </ul>
          </div>

          {/* Right: MVP */}
          <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20 border-l-4 border-l-accent relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 bg-accent/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="text-accent" />
                    <h3 className="text-xl font-bold text-white">{MVP_ANALYSIS_DATA.comparison.mvp.title}</h3>
                </div>
                <ul className="space-y-4">
                    {MVP_ANALYSIS_DATA.comparison.mvp.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/90 text-sm leading-relaxed">
                            <span className="block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <strong className="text-white" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') }}></strong>
                        </li>
                    ))}
                </ul>
             </div>
          </div>
      </div>

      {/* 3. The Gap & Future: Honesty about what's missing (Judge AI, Golden Data) */}
      <div>
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">{MVP_ANALYSIS_DATA.future.title}</h3>
            <span className="text-xs font-mono text-secondary px-3 py-1 bg-white/5 rounded border border-white/10">Road to Production</span>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {MVP_ANALYSIS_DATA.future.items.map((item, index) => {
                const Icon = index === 0 ? Database : index === 1 ? Gavel : Cog;
                return (
                    <div key={index} className="bento-card p-6 rounded-xl flex flex-col group hover:bg-surfaceHighlight transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-white group-hover:bg-white/10">
                                <Icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-warning px-2 py-1 bg-warning/10 rounded border border-warning/20">
                                {item.status}
                            </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{item.label}</h4>
                        <div className="text-sm leading-relaxed whitespace-pre-line text-secondary">
                             {item.desc.split('\n').map((line, i) => (
                                 <div key={i} className={i === 0 ? "mb-2 opacity-60" : "text-white/80"}>
                                     {line}
                                 </div>
                             ))}
                        </div>
                    </div>
                )
            })}
         </div>

         <p className="text-center text-secondary text-sm mt-12 max-w-2xl mx-auto italic">
            “MVP 验证了核心逻辑的可行性。既然工程逻辑已经跑通，补全数据流水线与裁判 AI，就只是时间与执行的问题。”
         </p>
      </div>

    </SectionWrapper>
  );
};

export default MVPConclusion;