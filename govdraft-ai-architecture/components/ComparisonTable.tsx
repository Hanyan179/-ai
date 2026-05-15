import React from 'react';
import { COMPARISON_DATA } from '../constants';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        
        {/* Table Header */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2">
          <div className="w-1/6 text-[12px] font-bold text-slate-400 uppercase tracking-wider">核心差异</div>
          <div className="flex-1 text-[12px] font-bold text-slate-700 uppercase tracking-wider">提示词工程工作流 (高效落地)</div>
          <div className="flex-1 text-[12px] font-bold text-emerald-600 uppercase tracking-wider">协作式系统架构 (人力倍增)</div>
        </div>

        {COMPARISON_DATA.map((item, idx) => (
          <div key={idx} className="group relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Dimension Title */}
              <div className="md:w-1/6 flex md:block items-center justify-between">
                <h4 className="text-[15px] font-bold text-slate-800">{item.feature}</h4>
                <div className="md:hidden text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">对比维度</div>
              </div>
              
              {/* Rapid Approach */}
              <div className="flex-1 relative">
                <div className="md:hidden text-[11px] font-bold text-slate-700 mb-2 uppercase">提示词工程工作流</div>
                <div className="flex gap-3">
                   <div className="mt-1 shrink-0"><AlertTriangle size={16} className="text-amber-500" /></div>
                   <p className="text-[13px] text-slate-600 leading-relaxed text-justify opacity-80">
                     {item.rapid}
                   </p>
                </div>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden md:block w-[1px] bg-slate-100 self-stretch"></div>

              {/* Engineering Approach */}
              <div className="flex-1 relative">
                 <div className="md:hidden text-[11px] font-bold text-emerald-600 mb-2 uppercase">协作式系统架构</div>
                 <div className="flex gap-3">
                   <div className="mt-1 shrink-0"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                   <p className="text-[13px] text-slate-800 font-medium leading-relaxed text-justify">
                     {item.engineering}
                   </p>
                 </div>
              </div>

            </div>

            {/* Verdict Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 bg-slate-50/50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl">
              <span className="text-[10px] font-bold text-ios-blue uppercase shrink-0 mt-0.5 border border-ios-blue/20 bg-ios-blue/5 px-1.5 py-0.5 rounded">价值洞察</span>
              <p className="text-[12px] text-slate-600 italic">
                {item.verdict}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
