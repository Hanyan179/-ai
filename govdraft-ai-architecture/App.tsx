import React, { useState } from 'react';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ComparisonTable } from './components/ComparisonTable';
import { Component, ArrowRightLeft } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'blueprint' | 'comparison'>('blueprint');

  return (
    <div className="min-h-screen pb-20 pt-10 px-4 md:px-8 max-w-[1200px] mx-auto selection:bg-slate-200">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-widest text-slate-500 bg-slate-100 uppercase border border-slate-200">系统版本 V3.0 正式版</span>
             <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-emerald-600 uppercase">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
               系统运行中
             </span>
          </div>
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-slate-800 leading-tight font-sans">
            政务智绘 <span className="text-slate-400 font-light">智能公文生成引擎</span>
          </h1>
          <p className="text-[13px] text-slate-500 mt-2 max-w-xl leading-relaxed">
            高精度政务公文生成流水线。将“确定性”的代码逻辑与“概率性”的大模型能力深度解耦，实现工程级的稳定交付。
          </p>
        </div>

        {/* View Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg flex items-center font-medium text-[12px] self-start md:self-auto border border-slate-200">
          <button 
            onClick={() => setViewMode('blueprint')}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-[6px] transition-all duration-200
              ${viewMode === 'blueprint' ? 'bg-white shadow-sm text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}
            `}
          >
            <Component size={14} />
            架构蓝图
          </button>
          <button 
            onClick={() => setViewMode('comparison')}
            className={`
               flex items-center gap-2 px-4 py-1.5 rounded-[6px] transition-all duration-200
              ${viewMode === 'comparison' ? 'bg-white shadow-sm text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}
            `}
          >
            <ArrowRightLeft size={14} />
            方案对比
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="animate-ios-slide min-h-[600px]">
        {viewMode === 'blueprint' ? (
           <ArchitectureDiagram />
        ) : (
          <div className="max-w-5xl mx-auto">
             <ComparisonTable />
          </div>
        )}
      </main>

    </div>
  );
};

export default App;
