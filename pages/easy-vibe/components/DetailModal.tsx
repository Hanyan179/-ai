import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';

export interface DetailModalData {
  title: string;
  description: string;
  detail: string;
  keyPoints: string[];
  color?: string;
  /** Breadcrumb context */
  stage?: string;
  stageLabel?: string;
  areaTitle?: string;
  index?: number;
  icon?: string;
  /** Learning path extras */
  audience?: string;
  learn?: string;
  outcome?: string;
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

const colorTextMap: Record<string, string> = {
  yellow: 'text-yellow-400', blue: 'text-blue-400', green: 'text-green-400',
  purple: 'text-purple-400', accent: 'text-accent', red: 'text-red-400',
  cyan: 'text-cyan-400', pink: 'text-pink-400', orange: 'text-orange-400',
};
const colorBgMap: Record<string, string> = {
  yellow: 'bg-yellow-400/10 border-yellow-400/20', blue: 'bg-blue-400/10 border-blue-400/20',
  green: 'bg-green-400/10 border-green-400/20', purple: 'bg-purple-400/10 border-purple-400/20',
  accent: 'bg-accent/10 border-accent/20', red: 'bg-red-400/10 border-red-400/20',
  cyan: 'bg-cyan-400/10 border-cyan-400/20', pink: 'bg-pink-400/10 border-pink-400/20',
  orange: 'bg-orange-400/10 border-orange-400/20',
};
const colorDotMap: Record<string, string> = {
  yellow: 'bg-yellow-400', blue: 'bg-blue-400', green: 'bg-green-400',
  purple: 'bg-purple-400', accent: 'bg-accent', red: 'bg-red-400',
  cyan: 'bg-cyan-400', pink: 'bg-pink-400', orange: 'bg-orange-400',
};

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const tc = colorTextMap[data.color || 'accent'] || 'text-accent';
  const bc = colorBgMap[data.color || 'accent'] || 'bg-accent/10 border-accent/20';
  const dc = colorDotMap[data.color || 'accent'] || 'bg-accent';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#1a1a2e] border border-primary/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-primary/5 px-8 py-5 flex items-start justify-between gap-4 z-10">
          <div className="flex-1 min-w-0">
            {(data.stageLabel || data.areaTitle) && (
              <div className="flex items-center gap-2 mb-2 text-xs flex-wrap">
                {data.stageLabel && (
                  <span className={`px-2 py-0.5 rounded border ${bc} ${tc} font-medium`}>
                    阶段{data.stage} · {data.stageLabel}
                  </span>
                )}
                {data.areaTitle && (
                  <span className={`px-2 py-0.5 rounded border ${bc} ${tc} font-medium`}>
                    {data.areaTitle}
                  </span>
                )}
                {data.index !== undefined && (
                  <span className="text-secondary/40">#{String(data.index + 1).padStart(2, '0')}</span>
                )}
              </div>
            )}
            <h2 className="text-primary font-bold text-xl leading-tight">
              {data.icon && <span className="mr-2">{data.icon}</span>}
              {data.title}
            </h2>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors p-1 shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          {/* Learning path extras */}
          {(data.audience || data.learn || data.outcome) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.audience && (
                <div className={`rounded-xl p-4 border ${bc}`}>
                  <div className="text-secondary/60 text-xs mb-1.5 uppercase tracking-wider">适合人群</div>
                  <div className="text-primary text-sm font-medium">{data.audience}</div>
                </div>
              )}
              {data.learn && (
                <div className={`rounded-xl p-4 border ${bc}`}>
                  <div className="text-secondary/60 text-xs mb-1.5 uppercase tracking-wider">学习内容</div>
                  <div className="text-primary text-sm font-medium">{data.learn}</div>
                </div>
              )}
              {data.outcome && (
                <div className={`rounded-xl p-4 border ${bc}`}>
                  <div className="text-secondary/60 text-xs mb-1.5 uppercase tracking-wider">你会得到</div>
                  <div className={`${tc} text-sm font-semibold`}>{data.outcome}</div>
                </div>
              )}
            </div>
          )}

          {/* Detail */}
          <div className="rounded-xl border border-primary/5 bg-primary/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className={tc} />
              <span className="text-primary font-semibold text-sm">详细介绍</span>
            </div>
            <p className="text-secondary text-sm leading-relaxed">{data.detail}</p>
          </div>

          {/* Key Points */}
          {data.keyPoints.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} className={tc} />
                <span className="text-primary font-semibold text-sm">核心要点</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {data.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/[0.03] border border-primary/5">
                    <div className={`w-2 h-2 rounded-full ${dc} mt-1.5 shrink-0`} />
                    <span className="text-secondary text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#1a1a2e]/95 backdrop-blur-md border-t border-primary/5 px-8 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-primary/5 border border-primary/10 text-secondary hover:text-primary hover:bg-primary/10 transition-all text-sm"
          >
            关闭
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailModal;
