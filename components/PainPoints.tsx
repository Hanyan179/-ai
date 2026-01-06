import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PAIN_POINTS_DATA } from '../constants';
import { BrainCircuit, XCircle, TrendingDown } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div>
          <span className="text-danger font-semibold tracking-wide text-sm uppercase mb-2 block">Internal Review / 内部复盘</span>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-8">{PAIN_POINTS_DATA.title}</h2>
          <div className="space-y-10">
            {PAIN_POINTS_DATA.points.map((point, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-surfaceHighlight hover:border-danger/50 transition-colors duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-secondary leading-relaxed text-sm md:text-base">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visualization (Skill Loss) */}
        <div className="lg:sticky lg:top-32">
            <div className="bento-card p-8 rounded-3xl border-t-4 border-t-danger/50">
                <div className="flex items-center space-x-3 mb-8 border-b border-white/5 pb-6">
                    <BrainCircuit className="text-danger w-6 h-6" />
                    <h3 className="text-lg font-bold text-white">工程能力退化风险</h3>
                </div>

                <div className="space-y-6">
                    <div className="bg-surfaceHighlight/30 p-4 rounded-xl">
                        <div className="text-xs text-secondary uppercase tracking-widest mb-2">Past (Ideal) / 过去 (理想)</div>
                        <div className="text-white font-medium">程序化逻辑 & 架构设计</div>
                        <div className="text-xs text-secondary mt-1">系统性工程思维 (Systematic)</div>
                    </div>

                    <div className="flex justify-center">
                        <TrendingDown className="text-danger w-6 h-6 animate-pulse" />
                    </div>

                    <div className="bg-danger/10 p-4 rounded-xl border border-danger/20">
                        <div className="text-xs text-danger uppercase tracking-widest mb-2">Current (Trap) / 现状 (陷阱)</div>
                        <div className="text-white font-medium">“保姆式” Prompt 定制</div>
                        <div className="text-xs text-red-200/60 mt-1">人工反复修补 • 缺乏自适应能力</div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-secondary font-medium">
                        “我们正用昂贵的架构师，去干手写脚本的体力活。”
                    </p>
                </div>
            </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default PainPoints;