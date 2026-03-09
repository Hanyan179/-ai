import React from 'react';
import SectionWrapper from './SectionWrapper';
import { STRATEGY_DATA } from '../constants';
import { ArrowRight, Database, TrendingDown, TrendingUp, Flame, Cpu } from 'lucide-react';

const Strategy: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      <div className="max-w-3xl mb-12">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Strategic Pivot</span>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">{STRATEGY_DATA.title}</h2>
        <p className="text-xl text-secondary">{STRATEGY_DATA.subtitle}</p>
      </div>

      <div className="space-y-6">
        
        {/* Top: The Macro Analogy (Engine vs Fuel) */}
        <div className="bento-card p-8 rounded-3xl relative overflow-hidden">
             <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-4">{STRATEGY_DATA.analogy.title}</h3>
                    <p className="text-secondary leading-relaxed">
                        {STRATEGY_DATA.analogy.desc}
                    </p>
                </div>
                
                <div className="bg-surfaceHighlight/30 rounded-2xl p-6 border border-white/5">
                    {/* Item 1: Engine */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Engine (Models)</div>
                                <div className="text-xs text-secondary">Llama 3 / DeepSeek</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-red-400 font-bold">
                                <TrendingDown size={16} className="mr-1" /> Price
                            </div>
                            <div className="text-xs text-secondary/60">Commoditized</div>
                        </div>
                    </div>

                    {/* Item 2: Fuel */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
                                <Flame size={24} />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Fuel (Data Assets)</div>
                                <div className="text-xs text-secondary">Private & Structured</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-green-400 font-bold">
                                <TrendingUp size={16} className="mr-1" /> Value
                            </div>
                            <div className="text-xs text-secondary/60">Infinite Moat</div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
            {/* Databricks Case */}
            <div className="bento-card p-8 rounded-3xl flex flex-col justify-between">
                <div>
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Database className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{STRATEGY_DATA.databricks.title}</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                            <span className="text-danger text-xs font-bold uppercase w-16 mt-1">Problem</span>
                            <span className="text-secondary text-sm flex-1">{STRATEGY_DATA.databricks.problem}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-accent text-xs font-bold uppercase w-16 mt-1">Solution</span>
                            <span className="text-white text-sm flex-1">{STRATEGY_DATA.databricks.solution}</span>
                        </div>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                    <p className="text-xs text-secondary">
                        <span className="text-white font-semibold">Result: </span>
                        {STRATEGY_DATA.databricks.result}
                    </p>
                </div>
            </div>

            {/* Moat */}
            <div className="bento-card p-8 rounded-3xl bg-gradient-to-br from-surface to-surfaceHighlight border-white/5 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-4">{STRATEGY_DATA.moat.title}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                    {STRATEGY_DATA.moat.content}
                </p>
                <div className="flex gap-2">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-secondary">
                        Private Knowledge Base
                    </span>
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-secondary">
                        Data Cleaning
                    </span>
                </div>
            </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Strategy;
