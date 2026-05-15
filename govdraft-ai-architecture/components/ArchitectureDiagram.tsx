import React, { useState } from 'react';
import { SYSTEM_MODULES } from '../constants';
import { SystemModule } from '../types';
import { 
  ArrowDown, 
  Clock, 
  ArrowRightLeft,
  Terminal,
  Database,
  Layers,
  Sparkles,
  ArrowUp,
  GitCommit,
  RefreshCw,
  Zap,
  BrainCircuit
} from 'lucide-react';

// --- Utility Components ---

const TechBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-1.5 py-0.5 rounded-[4px] bg-white border border-slate-200 text-slate-600 text-[10px] font-medium shadow-sm">
    {label}
  </span>
);

const PipelineStep: React.FC<{ step: { name: string; tech: string; desc: string }; isLast: boolean }> = ({ step, isLast }) => (
  <div className="flex gap-3 relative">
    {!isLast && (
      <div className="absolute left-[5.5px] top-3 bottom-[-12px] w-[1px] bg-slate-200"></div>
    )}
    <div className="w-3 h-3 rounded-full bg-white border-2 border-ios-blue shrink-0 mt-1.5 z-10 shadow-sm"></div>
    <div className="pb-3 w-full">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-[12px] font-bold text-slate-700">{step.name}</span>
        <span className="text-[10px] font-medium text-ios-blue bg-ios-blue/5 px-1.5 rounded border border-ios-blue/10">{step.tech}</span>
      </div>
      <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
    </div>
  </div>
);

const StageLabel: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="absolute -left-4 md:-left-24 top-0 flex flex-col md:items-end md:text-right w-20 md:w-auto">
    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Stage {number}</span>
    <h3 className="text-[14px] font-bold text-slate-700 leading-none mb-1">{title}</h3>
    <p className="text-[10px] text-slate-400 hidden md:block max-w-[120px]">{desc}</p>
  </div>
);

const DataConnector: React.FC<{ label: string; subLabel?: string }> = ({ label, subLabel }) => (
  <div className="h-14 flex flex-col items-center justify-center relative z-0 group">
    <div className="absolute w-[1px] h-full bg-slate-200 group-hover:bg-ios-blue/30 transition-colors"></div>
    <div className="z-10 bg-white px-3 py-1 rounded-full border border-slate-200 text-[10px] font-mono text-slate-500 font-medium shadow-sm flex flex-col items-center group-hover:border-ios-blue/50 group-hover:text-ios-blue transition-all">
      <span>{label}</span>
      {subLabel && <span className="text-[8px] text-slate-300 mt-0.5">{subLabel}</span>}
    </div>
  </div>
);

// --- Main Card Component ---

const Card: React.FC<{
  module: SystemModule;
  onHover: (id: string | null) => void;
  isHovered: boolean;
  anyHovered: boolean;
  compact?: boolean;
}> = ({ module, onHover, isHovered, anyHovered, compact }) => {
  
  const baseClasses = "relative w-full transition-all duration-300 ease-out cursor-default border group";
  
  const activeClasses = "bg-white border-ios-blue/50 shadow-ios-active scale-[1.02] z-20";
  const normalClasses = "bg-white border-slate-200 shadow-sm hover:border-ios-blue/30 hover:bg-white";
  const dimmedClasses = "opacity-60 grayscale-[0.5] blur-[0.5px] border-slate-100";
  
  const isLearning = module.type === 'learning';
  const learningClasses = isLearning ? "border-indigo-200 bg-indigo-50/10" : "";
  const learningActive = isLearning ? "border-indigo-400 bg-white shadow-lg shadow-indigo-100" : "";

  let currentClass = normalClasses;
  if (isHovered) currentClass = isLearning ? learningActive : activeClasses;
  else if (anyHovered) currentClass = `${normalClasses} ${dimmedClasses}`;
  
  if (!isHovered && !anyHovered && isLearning) {
      currentClass = `${normalClasses} ${learningClasses}`;
  }

  return (
    <div 
      className={`${baseClasses} ${currentClass} rounded-lg overflow-hidden`}
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`${compact ? 'p-3' : 'p-4'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className={`
               ${compact ? 'p-1.5' : 'p-2'} rounded-md transition-colors duration-300 
               ${isHovered ? (isLearning ? 'bg-indigo-500 text-white' : 'bg-ios-blue text-white') : (isLearning ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600')}
             `}>
                <module.icon size={compact ? 16 : 18} />
             </div>
             <div>
                <h3 className={`${compact ? 'text-[13px]' : 'text-[14px]'} font-bold ${isLearning ? 'text-indigo-900' : 'text-slate-800'}`}>{module.title}</h3>
                {!compact && <p className={`text-[10px] font-medium tracking-wide ${isLearning ? 'text-indigo-500' : 'text-slate-400'}`}>{module.technicalLabel}</p>}
             </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Clock size={12} className="text-slate-400"/>
            <span className="text-[10px] font-mono text-slate-500">{module.latency}</span>
          </div>
        </div>

        {/* User Summary */}
        {!isHovered && !compact && (
          <div className="mt-2 text-[12px] text-slate-500 leading-relaxed line-clamp-2">
            {module.userSummary}
          </div>
        )}

        {/* Engineering Details (Expanded) */}
        {isHovered && (
          <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2 mb-3 bg-slate-50 p-2 rounded border border-slate-100">
               <ArrowRightLeft size={12} className="text-slate-400" />
               <code className="text-[10px] font-medium text-slate-700">
                 {module.ioShape.input} <span className={isLearning ? 'text-indigo-500 px-1' : 'text-ios-blue px-1'}>→</span> {module.ioShape.output}
               </code>
            </div>
            
            <div className="mb-3">
              <div className="pl-1">
                {module.pipeline.map((step, idx) => (
                  <PipelineStep key={step.id} step={step} isLast={idx === module.pipeline.length - 1} />
                ))}
              </div>
            </div>

            <div className={`mt-2 pt-3 border-t border-slate-100 -mx-4 -mb-4 px-4 py-3 ${isLearning ? 'bg-indigo-50/50' : 'bg-slate-50/50'}`}>
              <div className="flex flex-wrap gap-2 mb-2">
                {module.techStack.map(t => <TechBadge key={t} label={t} />)}
              </div>
              {module.techNote && (
                 <div className="flex gap-2 items-start mt-2 text-[11px] text-slate-700 leading-relaxed bg-white p-2 rounded border border-slate-200/50 shadow-sm">
                    <Database size={12} className={isLearning ? 'text-indigo-500 mt-0.5 shrink-0' : 'text-ios-blue mt-0.5 shrink-0'} />
                    <span>{module.techNote}</span>
                 </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- Main Architecture Diagram ---

export const ArchitectureDiagram: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const input = SYSTEM_MODULES.find(m => m.type === 'input')!;
  const router = SYSTEM_MODULES.find(m => m.type === 'router')!;
  const processors = SYSTEM_MODULES.filter(m => m.type === 'processor');
  const assembler = SYSTEM_MODULES.find(m => m.type === 'assembler')!;
  const review = SYSTEM_MODULES.find(m => m.type === 'review')!;
  const output = SYSTEM_MODULES.find(m => m.type === 'output')!;
  const learning = SYSTEM_MODULES.find(m => m.type === 'learning')!;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pl-4 md:pl-20 pr-4">
      
      {/* --- STAGE 1: SIGNAL INGESTION --- */}
      <div className="relative mb-0">
        <StageLabel number="01" title="信号摄入层" desc="Context Gateway" />
        <div className="relative p-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
           <Card module={input} onHover={setHoveredId} isHovered={hoveredId === input.id} anyHovered={!!hoveredId} />
        </div>
      </div>

      <DataConnector label="Raw User Signal" subLabel="Action / File / Voice" />

      {/* --- STAGE 2: COGNITIVE ORCHESTRATION --- */}
      <div className="relative">
        <StageLabel number="02" title="认知编排层" desc="Cognitive & Logic" />
        
        <div className="p-4 rounded-xl border border-slate-200 bg-white/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BrainCircuit size={100} />
          </div>

          {/* Router */}
          <Card module={router} onHover={setHoveredId} isHovered={hoveredId === router.id} anyHovered={!!hoveredId} />
          
          <DataConnector label="Intent Vector" subLabel="Task + Context + Constraints" />

          {/* Parallel Processors */}
          <div className="relative">
             <div className="absolute -left-2 top-0 bottom-0 w-1 bg-slate-200 rounded-l"></div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {processors.map((p) => (
                  <div key={p.id} className="relative">
                    <Card module={p} onHover={setHoveredId} isHovered={hoveredId === p.id} anyHovered={!!hoveredId} compact />
                  </div>
                ))}
             </div>
             <div className="absolute -right-2 top-0 bottom-0 w-1 bg-slate-200 rounded-r"></div>
          </div>

          <DataConnector label="Structured Modules" subLabel="Style + Logic + Memory" />

          {/* Assembler */}
          <Card module={assembler} onHover={setHoveredId} isHovered={hoveredId === assembler.id} anyHovered={!!hoveredId} />
        </div>
      </div>

      <DataConnector label="Draft v0.9" subLabel="Pre-validation Content" />

      {/* --- STAGE 3: EVOLUTION & QA LOOP --- */}
      <div className="relative">
        <StageLabel number="03" title="进化闭环层" desc="QA & Active Learning" />
        
        <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20 relative">
          
          {/* Review & Refinement */}
          <div className="relative z-10">
             <Card module={review} onHover={setHoveredId} isHovered={hoveredId === review.id} anyHovered={!!hoveredId} />
          </div>

          <DataConnector label="Refined Draft v1.0" />

          {/* Output & Learning Loop Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
             
             {/* Left: Output */}
             <div>
                <Card module={output} onHover={setHoveredId} isHovered={hoveredId === output.id} anyHovered={!!hoveredId} />
                <div className="mt-2 flex justify-center">
                   <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <Zap size={10} fill="currentColor" />
                      USER DELIVERY
                   </div>
                </div>
             </div>

             {/* Right: Learning (The Loop) */}
             <div className="relative flex flex-col justify-center">
                {/* Visual Connector Arrow */}
                <div className="hidden md:block absolute top-1/2 -left-6 w-6 border-t border-dashed border-indigo-300"></div>
                
                <Card module={learning} onHover={setHoveredId} isHovered={hoveredId === learning.id} anyHovered={!!hoveredId} />
                
                {/* Visual Loop Back */}
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-indigo-400 font-medium">
                   <RefreshCw size={12} className="animate-spin-slow" />
                   <span>Feedback Loop Active</span>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};