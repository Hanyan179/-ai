import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PROFILE_DATA } from '../constants';
import { Lightbulb, Zap, BookOpen, Hammer } from 'lucide-react';

const icons = {
  "能动 · Motivated": Zap,
  "善思 · Thinking": Lightbulb,
  "好学 · Learning": BookOpen,
  "肯做 · Doing": Hammer,
};

const SelfAnalysis: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="mb-12">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Candidate Profile</span>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">自我画像：对照选拔标准</h2>
        <p className="text-xl text-secondary">{PROFILE_DATA.slogan}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {PROFILE_DATA.standards.map((item, index) => {
          // @ts-ignore
          const Icon = icons[item.key] || Lightbulb;
          
          return (
            <div key={index} className="bento-card p-8 rounded-2xl group hover:bg-surfaceHighlight transition-colors duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">{item.key}</h3>
              </div>
              
              <div className="mb-3">
                <span className="text-sm font-semibold text-white/90 border-b border-accent/30 pb-1">
                  {item.title}
                </span>
              </div>
              
              <p className="text-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <div className="text-xs text-secondary uppercase tracking-wider mb-1">Recent Achievement / 近期成果</div>
            <div className="text-white font-medium">个人知识库构建 & 公司知识图谱AI开发实战</div>
         </div>
         <div className="text-xs text-secondary max-w-md">
            通过实战发现痛点，并总结出本报告中的“数据资产化”战略方向。
         </div>
      </div>
    </SectionWrapper>
  );
};

export default SelfAnalysis;
