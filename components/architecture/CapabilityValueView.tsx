import React from 'react';
import { motion } from 'framer-motion';

/**
 * 能力价值分析视图 - 简洁专业版
 * 四象限矩阵 + 核心洞察
 */
const CapabilityValueView: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
      {/* 顶部核心洞察 */}
      <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="flex items-start gap-8">
          {/* 硬骨头 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦴</span>
              <span className="text-orange-400 font-semibold">真正的硬骨头</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>RAG 召回问题 - 检索质量决定生成质量</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>幻觉风控 - LLM 不确定性是核心挑战</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>数据清洗 - 脏数据进脏数据出</span>
              </div>
            </div>
          </motion.div>

          {/* 分隔线 */}
          <div className="w-px h-24 bg-slate-700" />

          {/* 被高估 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <span className="text-amber-400 font-semibold">最被高估的部分</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Prompt 工程 - 易耗品，随模型迭代调整</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Agent 编排 - 可逆向，价值随 LLM 提升下降</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 四象限矩阵 */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Y轴标签 */}
          <div className="col-span-2 flex justify-center mb-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>商业价值</span>
              <span className="text-slate-700">→</span>
              <span className="text-emerald-500">高</span>
            </div>
          </div>

          {/* 左上：高难度 + 高价值 = 钻石 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-br from-cyan-950/50 to-slate-900 border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 font-semibold text-sm">💎 钻石能力</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">护城河</span>
            </div>
            <div className="space-y-2">
              <CapabilityItem name="质量把控" difficulty={5} value={5} defense={5} />
              <CapabilityItem name="审视校验" difficulty={5} value={5} defense={5} />
              <CapabilityItem name="安全合规" difficulty={4} value={5} defense={4} />
            </div>
            <p className="text-[10px] text-slate-500 mt-3">业界公认最值钱，难以复制</p>
          </motion.div>

          {/* 右上：低难度 + 高价值 = 不存在（空） */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-lg bg-gradient-to-br from-orange-950/50 to-slate-900 border border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-400 font-semibold text-sm">🦴 硬骨头</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">核心挑战</span>
            </div>
            <div className="space-y-2">
              <CapabilityItem name="RAG 召回" difficulty={5} value={4} defense={3} highlight />
              <CapabilityItem name="幻觉风控" difficulty={5} value={4} defense={4} highlight />
              <CapabilityItem name="数据清洗" difficulty={5} value={4} defense={4} highlight />
            </div>
            <p className="text-[10px] text-slate-500 mt-3">决定产品成败的技术难点</p>
          </motion.div>

          {/* 左下：高难度 + 低价值 = 黄金（反直觉） */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-lg bg-gradient-to-br from-yellow-950/50 to-slate-900 border border-yellow-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-yellow-400 font-semibold text-sm">🥇 黄金能力</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">反直觉</span>
            </div>
            <div className="space-y-2">
              <CapabilityItem name="知识体系" difficulty={5} value={2} defense={1} warning />
              <CapabilityItem name="向量数据库" difficulty={4} value={2} defense={2} warning />
            </div>
            <p className="text-[10px] text-slate-500 mt-3">技术难但商业价值低，对手可偷走</p>
          </motion.div>

          {/* 右下：低难度 + 低价值 = 耗材 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-lg bg-gradient-to-br from-red-950/50 to-slate-900 border border-red-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-red-400 font-semibold text-sm">🔋 耗材能力</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300">被高估</span>
            </div>
            <div className="space-y-2">
              <CapabilityItem name="Prompt 工程" difficulty={2} value={2} defense={1} />
              <CapabilityItem name="Agent 编排" difficulty={3} value={2} defense={1} />
              <CapabilityItem name="上下文融合" difficulty={3} value={2} defense={1} />
            </div>
            <p className="text-[10px] text-slate-500 mt-3">易耗品，随模型迭代需调整</p>
          </motion.div>

          {/* X轴标签 */}
          <div className="col-span-2 flex justify-between px-4 mt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="text-red-400">高</span>
              <span className="text-slate-700">←</span>
              <span>技术难度</span>
              <span className="text-slate-700">→</span>
              <span className="text-emerald-400">低</span>
            </div>
          </div>
        </div>

        {/* 底部战略建议 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-lg bg-slate-900/50 border border-slate-800"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-400">💡</span>
            <span className="text-sm font-medium text-white">战略建议</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-cyan-400">投资重点：</span>
              <span className="text-slate-400">质量把控 + 硬骨头攻关</span>
            </div>
            <div>
              <span className="text-yellow-400">警惕陷阱：</span>
              <span className="text-slate-400">知识库建设投入产出比低</span>
            </div>
            <div>
              <span className="text-red-400">控制成本：</span>
              <span className="text-slate-400">Prompt/编排按需迭代即可</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 能力项组件
 */
interface CapabilityItemProps {
  name: string;
  difficulty: number;
  value: number;
  defense: number;
  highlight?: boolean;
  warning?: boolean;
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ 
  name, difficulty, value, defense, highlight, warning 
}) => {
  return (
    <div className={`
      flex items-center justify-between py-1.5 px-2 rounded
      ${highlight ? 'bg-orange-500/10' : warning ? 'bg-yellow-500/10' : 'bg-slate-800/30'}
    `}>
      <span className={`text-xs ${highlight ? 'text-orange-300' : warning ? 'text-yellow-300' : 'text-slate-300'}`}>
        {name}
      </span>
      <div className="flex items-center gap-3">
        <ScoreBar label="难" score={difficulty} color={difficulty >= 4 ? '#EF4444' : '#64748B'} />
        <ScoreBar label="值" score={value} color={value >= 4 ? '#22C55E' : '#64748B'} />
        <ScoreBar label="守" score={defense} color={defense >= 4 ? '#3B82F6' : '#64748B'} />
      </div>
    </div>
  );
};

/**
 * 评分条
 */
const ScoreBar: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => (
  <div className="flex items-center gap-1">
    <span className="text-[9px] text-slate-600 w-3">{label}</span>
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-sm"
          style={{ backgroundColor: i <= score ? color : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
  </div>
);

export default CapabilityValueView;
