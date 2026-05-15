import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FolderOpen, ExternalLink, Loader2 } from 'lucide-react';
import { SkillInfo } from '../types';
import ReactMarkdown from 'react-markdown';

interface SkillModalProps {
  skill: SkillInfo | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  dsfa: 'DSFA 框架',
  p2340: 'P2340 测试',
  general: '通用',
};

const categoryColors: Record<string, string> = {
  dsfa: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  p2340: 'text-green-400 bg-green-400/10 border-green-400/20',
  general: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

// Map skill id to the public path where the full SKILL.md lives
function getSkillMdUrl(skill: SkillInfo): string {
  return `/skills/${skill.id}/SKILL.md`;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeRef, setActiveRef] = useState<{ name: string; content: string } | null>(null);
  const [refLoading, setRefLoading] = useState(false);

  // Fetch full SKILL.md when skill changes
  useEffect(() => {
    if (!skill) { setFullContent(null); setActiveRef(null); return; }
    setLoading(true);
    setActiveRef(null);
    fetch(getSkillMdUrl(skill))
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (text) {
          // Strip YAML front matter
          const stripped = text.replace(/^---[\s\S]*?---\n*/, '');
          setFullContent(stripped);
        } else {
          setFullContent(null);
        }
      })
      .catch(() => setFullContent(null))
      .finally(() => setLoading(false));
  }, [skill]);

  const handleRefClick = (ref: string) => {
    if (!skill) return;
    setRefLoading(true);
    // Reference files are in the same public/skills/{id}/ folder
    const refFileName = ref.split('/').pop() || ref;
    fetch(`/skills/${skill.id}/${refFileName}`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (text) {
          setActiveRef({ name: refFileName, content: text });
        }
      })
      .catch(() => {})
      .finally(() => setRefLoading(false));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeRef) { setActiveRef(null); }
        else { onClose(); }
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, activeRef]);

  useEffect(() => {
    if (skill) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [skill]);

  // The markdown content to display
  const displayContent = activeRef ? activeRef.content : (fullContent || (skill?.content ?? ''));

  return (
    <AnimatePresence>
      {skill && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-x-[8%] md:inset-y-[4%] z-50 flex flex-col rounded-2xl bg-[#12121a] border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-white font-semibold text-lg truncate">
                    {activeRef ? activeRef.name : skill.displayName}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[skill.category]}`}>
                      {categoryLabels[skill.category]}
                    </span>
                    {activeRef ? (
                      <button onClick={() => setActiveRef(null)} className="text-accent text-xs hover:text-white transition-colors">
                        ← 返回 {skill.displayName}
                      </button>
                    ) : skill.sourcePath ? (
                      <span className="text-secondary/40 text-[10px] font-mono truncate">{skill.sourcePath}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-secondary hover:text-white transition-colors shrink-0"
                aria-label="关闭">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={24} className="text-accent animate-spin" />
                  <span className="text-secondary text-sm ml-3">加载中...</span>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-semibold
                  prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:pb-3 prose-h1:border-b prose-h1:border-white/10
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-secondary prose-p:leading-relaxed prose-p:text-[15px]
                  prose-li:text-secondary prose-li:text-[15px] prose-li:leading-relaxed
                  prose-strong:text-white prose-strong:font-semibold
                  prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#0d0d14] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-5 prose-pre:text-sm
                  prose-table:text-[15px]
                  prose-thead:border-white/10
                  prose-th:text-white/70 prose-th:font-medium prose-th:text-left prose-th:px-4 prose-th:py-3
                  prose-td:text-secondary prose-td:px-4 prose-td:py-3 prose-td:border-white/5
                  prose-tr:border-white/5
                  prose-a:text-accent prose-a:no-underline hover:prose-a:text-white hover:prose-a:underline
                  prose-hr:border-white/10
                  prose-blockquote:border-accent/30 prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
                  [&_ul_ul]:mt-1 [&_ol_ol]:mt-1
                  [&_input[type=checkbox]]:mr-2 [&_input[type=checkbox]]:accent-accent
                ">
                  <ReactMarkdown>{displayContent}</ReactMarkdown>
                </div>
              )}

              {/* References — clickable to load */}
              {!activeRef && skill.references && skill.references.length > 0 && (
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <FolderOpen size={16} className="text-accent" />
                    <span className="text-white text-sm font-semibold">参考文档</span>
                    <span className="text-secondary text-xs">（点击查看内容）</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skill.references.map((ref) => (
                      <button key={ref} onClick={() => handleRefClick(ref)}
                        className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-white/5 text-secondary border border-white/5 hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all font-mono">
                        <FileText size={14} />
                        {ref.split('/').pop()}
                        {refLoading && <Loader2 size={12} className="animate-spin" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SkillModal;