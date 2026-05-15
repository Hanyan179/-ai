import React, { useState, useEffect } from 'react';
import { ESSENTIAL_STEPS, SCENARIOS, TERMS, CATEGORY_INFO, TRAE_TIPS } from './constants';
import { Scenario, Term, EssentialStep, TraeTip } from './types';
import SectionWrapper from './components/SectionWrapper';
import DemoReportPage from './pages/demo-report/DemoReportPage';
import EasyVibePage from './pages/easy-vibe/EasyVibePage';
import PortfolioPage from './pages/portfolio/PortfolioPage';
import { ArchitecturePage, ReportPage } from './pages';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Copy, Check, X,
  Lightbulb, BookOpen, Palette, Brain, Server, Cloud, Zap, FileText, Shield,
  ExternalLink, Sparkles,
} from 'lucide-react';

type SitePage = string;

type ReportEntry = {
  page: SitePage;
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  status: string;
  group: string;
  date: string;
  type: string;
  path?: string;
  content?: string;
  source: 'system' | 'component' | 'markdown';
};

const pagePath: Record<string, string> = {
  home: '/',
  reports: '/reports',
  'vibe-coding': '/vibe-coding',
  'demo-report': '/demo-report',
  'easy-vibe': '/easy-vibe',
  portfolio: '/portfolio',
  architecture: '/architecture',
  'ai-report': '/ai-report',
};

const componentReports: ReportEntry[] = [
  {
    page: 'home',
    label: '总站',
    title: 'hansen 静涵 含盐',
    eyebrow: 'Index',
    description: '个人报告总站，用来沉淀过往页面、项目材料和后续新增报告。',
    status: '入口',
    group: 'system',
    date: '2026-05-15',
    type: 'Home',
    source: 'system',
  },
  {
    page: 'reports',
    label: '报告库',
    title: '报告库',
    eyebrow: 'Library',
    description: '所有历史报告和后续新增页面的集中目录。',
    status: '目录',
    group: 'system',
    date: '2026-05-15',
    type: 'Index',
    source: 'system',
  },
  {
    page: 'vibe-coding',
    label: 'Vibe 指南',
    title: 'Vibe Coding 实战指南',
    eyebrow: 'Current Report',
    description: '当前首页内容，面向 AI 编程入门、Trae 使用流程和常见问题。',
    status: '当前',
    group: 'AI 编程',
    date: '2026-05-15',
    type: 'Guide',
    source: 'component',
  },
  {
    page: 'ai-report',
    label: 'AI 落地报告',
    title: 'AI Coding 从个人使用到公司级落地',
    eyebrow: 'Latest Report',
    description: '关于 AI Coding 在公司级落地的方法论，包括统一入口、资产沉淀、数据治理和团队协作。',
    status: '最新',
    group: 'AI 编程',
    date: '2026-05-15',
    type: 'Report',
    source: 'component',
  },
  {
    page: 'demo-report',
    label: 'AI 报告',
    title: 'AI Coding Demo 测试报告',
    eyebrow: 'Historical Report',
    description: '关于 AI 编程研究、Skills、DSFA/P2340 场景验证的旧版报告。',
    status: '历史',
    group: 'AI 编程',
    date: '2026-05-07',
    type: 'Report',
    source: 'component',
  },
  {
    page: 'easy-vibe',
    label: '演示场景',
    title: 'Easy Vibe 演示场景库',
    eyebrow: 'Demo Collection',
    description: '用于现场演示的一组 AI 生成应用场景和可复制提示词。',
    status: '可扩展',
    group: '演示资产',
    date: '2026-04-27',
    type: 'Demo',
    source: 'component',
  },
  {
    page: 'portfolio',
    label: '作品集',
    title: '过往作品与能力展示',
    eyebrow: 'Portfolio',
    description: '保留原来的作品展示页面，作为个人项目与执行证据沉淀。',
    status: '历史',
    group: '个人资产',
    date: '2026-03-09',
    type: 'Portfolio',
    source: 'component',
  },
  {
    page: 'architecture',
    label: '架构报告',
    title: '智能体架构与知识库设计',
    eyebrow: 'Architecture',
    description: '架构图、知识库系统、流程编排和能力分层相关内容。',
    status: '方案',
    group: '架构方案',
    date: '2026-01-16',
    type: 'Architecture',
    source: 'component',
  },
];

const markdownModules = import.meta.glob('./reports/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const data: Record<string, string> = {};
  if (!match) return { data, body: raw.trim() };

  match[1].split(/\r?\n/).forEach(line => {
    const index = line.indexOf(':');
    if (index === -1) return;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
    data[key] = value;
  });

  return { data, body: raw.slice(match[0].length).trim() };
}

function slugFromFilePath(path: string) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path;
}

const markdownReports: ReportEntry[] = Object.entries(markdownModules).filter(([path]) => {
  return !slugFromFilePath(path).startsWith('_');
}).map(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw);
  const slug = data.slug || slugFromFilePath(path);
  const title = data.title || slug;

  return {
    page: `md:${slug}`,
    label: data.label || title,
    title,
    eyebrow: data.eyebrow || 'Markdown Report',
    description: data.description || data.summary || '',
    status: data.status || '新增',
    group: data.group || 'Markdown 报告',
    date: data.date || '2026-05-15',
    type: data.type || 'Report',
    path: `/reports/${slug}`,
    content: body,
    source: 'markdown',
  };
});

const siteReports: ReportEntry[] = [...componentReports, ...markdownReports];

function pageFromPath(pathname: string): SitePage {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/reports') return 'reports';
  const markdownReport = markdownReports.find(item => item.path === path);
  if (markdownReport) return markdownReport.page;
  if (path === '/vibe-coding') return 'vibe-coding';
  if (path === '/demo-report') return 'demo-report';
  if (path === '/easy-vibe') return 'easy-vibe';
  if (path === '/portfolio') return 'portfolio';
  if (path === '/architecture') return 'architecture';
  if (path === '/ai-report') return 'ai-report';
  return 'home';
}

function pathForPage(page: SitePage) {
  return siteReports.find(item => item.page === page)?.path || pagePath[page] || '/';
}

function PageSwitcher({
  currentPage,
  onNavigate,
}: {
  currentPage: SitePage;
  onNavigate: (page: SitePage) => void;
}) {
  const navItems = siteReports.filter(item => item.page === 'home' || item.page === 'reports');
  const currentReport = siteReports.find(item => item.page === currentPage);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#111111]/10 bg-[#f7f7f4]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-left text-sm font-semibold tracking-tight text-[#111111]"
        >
          hansen / 静涵 / 含盐
        </button>
        <div className="flex items-center gap-1">
          {currentReport && currentReport.page !== 'home' && currentReport.page !== 'reports' && (
            <span className="hidden px-3 py-1.5 text-xs text-[#666666] md:inline-flex">
              {currentReport.title}
            </span>
          )}
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-[#111111] text-white'
                  : 'text-[#555555] hover:bg-[#111111]/5 hover:text-[#111111]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ReportPortal({ onNavigate }: { onNavigate: (page: SitePage) => void }) {
  const reports = siteReports
    .filter(item => item.group !== 'system')
    .sort((a, b) => b.date.localeCompare(a.date));
  const featuredReports = reports.slice(0, 5);
  const groups = Array.from(new Set(reports.map(item => item.group)));

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-5 py-20 text-[#111111] md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="border-b border-[#111111]/15 pb-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#666666]">
              <span>Report Index</span>
              <span>Updated 2026.05</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[#111111] md:text-7xl">
              AI 工作报告与项目沉淀
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
              一个面向汇报、复盘和作品沉淀的个人总站。当前内容覆盖 AI 编程实践、演示资产、架构方案与历史作品，后续页面会按同一套报告结构持续归档。
            </p>
          </motion.div>

          <div className="grid border-b border-[#111111]/15 md:grid-cols-3">
            {[
              [String(reports.length).padStart(2, '0'), '已收录报告'],
              [String(groups.length).padStart(2, '0'), '主题分组'],
              [featuredReports[0]?.date ?? '2026-05-15', '最近更新'],
            ].map(([value, label]) => (
              <div key={label} className="border-[#111111]/15 py-6 md:border-r md:px-6 last:md:border-r-0">
                <div className="text-4xl font-semibold text-[#111111]">{value}</div>
                <div className="mt-2 text-sm text-[#666666]">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid border-b border-[#111111]/15 py-10 md:grid-cols-[180px_1fr] md:gap-10">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#777777] md:mb-0">
              Executive View
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">总站定位</h2>
                <p className="mt-4 text-sm leading-7 text-[#4a4a4a]">
                  首页承载整体叙事、近期重点和主题覆盖情况，适合作为对外查看和内部复盘的第一入口。
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">内容边界</h2>
                <p className="mt-4 text-sm leading-7 text-[#4a4a4a]">
                  每个页面都按报告材料处理：有日期、类型、主题、状态和摘要，适合后续对外汇报、内部复盘或个人作品归档。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">Recent Reports</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">近期报告</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('reports')}
                className="inline-flex items-center gap-2 border border-[#111111] px-4 py-2 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
              >
                查看全部
                <ExternalLink size={14} />
              </button>
            </div>

            <div className="divide-y divide-[#111111]/10 border-y border-[#111111]/10">
              {featuredReports.map(item => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className="grid w-full gap-3 py-5 text-left transition-colors hover:bg-[#111111]/[0.03] md:grid-cols-[96px_120px_1fr_88px]"
                >
                  <span className="text-sm text-[#666666]">{item.date}</span>
                  <span className="text-sm text-[#666666]">{item.type}</span>
                  <span>
                    <span className="block text-lg font-semibold text-[#111111]">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#555555]">{item.description}</span>
                  </span>
                  <span className="text-sm text-[#777777] md:text-right">{item.status}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#111111]/15 pt-10 md:grid-cols-[180px_1fr]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">
              Coverage
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {groups.map(group => {
                const count = reports.filter(item => item.group === group).length;
                return (
                  <div key={group} className="border border-[#111111]/12 bg-white/35 p-5">
                    <div className="text-sm text-[#777777]">{String(count).padStart(2, '0')} reports</div>
                    <div className="mt-3 text-xl font-semibold text-[#111111]">{group}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-[#111111]/15 bg-[#f2f2ee] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">Personal Hub</div>
            <div className="mt-8 space-y-2">
              <div className="text-5xl font-semibold tracking-tight text-[#111111]">hansen</div>
              <div className="text-3xl font-semibold tracking-tight text-[#111111]">静涵</div>
              <div className="text-3xl font-semibold tracking-tight text-[#111111]">含盐</div>
            </div>
            <p className="mt-8 text-sm leading-7 text-[#4a4a4a]">
              用正式汇报的形式保存研究、演示、架构和项目材料，形成稳定的个人工作资料入口。
            </p>
            <div className="mt-8 border-t border-[#111111]/15 pt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">Current Focus</div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#777777]">Research</dt>
                  <dd className="text-right text-[#111111]">AI 编程</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#777777]">Assets</dt>
                  <dd className="text-right text-[#111111]">演示材料</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#777777]">System</dt>
                  <dd className="text-right text-[#111111]">架构方案</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ReportsLibrary({ onNavigate }: { onNavigate: (page: SitePage) => void }) {
  const pages = siteReports.filter(item => item.group !== 'system');
  const groups = Array.from(new Set(pages.map(item => item.group)));

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-6 py-20 text-[#111111] md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b border-[#111111]/15 pb-8">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#777777]">Library</div>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#111111] md:text-6xl">报告库</h1>
          <p className="max-w-2xl text-base leading-8 text-[#4a4a4a]">
            这里保留所有历史页面与后续报告入口，按主题分组，便于快速定位、复盘和展示。
          </p>
        </div>

        <div className="space-y-10">
          {groups.map(group => (
            <section key={group}>
              <h2 className="mb-4 border-b border-[#111111]/15 pb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#666666]">{group}</h2>
              <div className="divide-y divide-[#111111]/10 border-y border-[#111111]/10">
                {pages.filter(item => item.group === group).map(item => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="group grid w-full gap-4 py-5 text-left transition-colors hover:bg-[#111111]/[0.03] md:grid-cols-[100px_120px_1fr_100px]"
                  >
                    <div className="text-sm text-[#777777]">{item.date}</div>
                    <div className="text-sm text-[#777777]">{item.type}</div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-[#111111] group-hover:underline">{item.title}</h3>
                      <p className="text-sm leading-7 text-[#555555]">{item.description}</p>
                    </div>
                    <div className="text-sm text-[#777777] md:text-right">{item.status}</div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function MarkdownReportPage({ report }: { report: ReportEntry }) {
  return (
    <main className="min-h-screen bg-[#f7f7f4] px-5 py-20 text-[#111111] md:px-10 md:py-24">
      <article className="mx-auto max-w-4xl">
        <header className="border-b border-[#111111]/15 pb-8">
          <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#777777]">
            <span>{report.date}</span>
            <span>{report.type}</span>
            <span>{report.status}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#111111] md:text-6xl">{report.title}</h1>
          {report.description && (
            <p className="mt-6 text-lg leading-8 text-[#4a4a4a]">{report.description}</p>
          )}
        </header>

        <div className="markdown-report mt-10 text-[#222222]">
          <ReactMarkdown>{report.content || ''}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

function PageShell({
  currentPage,
  onNavigate,
  children,
}: {
  currentPage: SitePage;
  onNavigate: (page: SitePage) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#111111] selection:bg-[#111111] selection:text-white">
      <ProgressBar />
      <PageSwitcher currentPage={currentPage} onNavigate={onNavigate} />
      <div className="pt-16">{children}</div>
    </div>
  );
}

/* ===== ProgressBar ===== */
const ProgressBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const t = document.documentElement.scrollTop;
      const m = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setP(m > 0 ? t / m : 0);
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-40">
      <div className="h-full bg-[#111111] transition-all duration-100" style={{ width: `${p * 100}%` }} />
    </div>
  );
};

/* ===== CopyButton ===== */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        copied
          ? 'bg-success/20 text-success border border-success/30'
          : 'bg-white/5 text-secondary hover:text-white hover:bg-white/10 border border-white/10'
      }`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? '已复制' : '复制'}
    </button>
  );
};

/* ===== 术语小标签（可点击） ===== */
const TermTag: React.FC<{ termId: string; onClick: (t: Term) => void }> = ({ termId, onClick }) => {
  const term = TERMS.find(t => t.id === termId);
  if (!term) return null;
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(term); }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[11px] font-medium border border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer"
    >
      <BookOpen size={10} />
      {term.word}
    </button>
  );
};

/* ===== 术语弹窗 ===== */
const TermModal: React.FC<{ term: Term | null; onClose: () => void }> = ({ term, onClose }) => {
  if (!term) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl max-w-md w-full p-6 z-10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-secondary hover:text-white transition-colors">
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={14} className="text-accent" />
          <span className="text-accent text-xs font-semibold">术语解释</span>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">{term.word}</h3>
        <p className="text-accent/80 text-sm font-medium mb-4">{term.oneLiner}</p>
        <p className="text-secondary text-sm leading-relaxed">{term.detail}</p>
      </motion.div>
    </div>
  );
};

/* ===== Category color maps ===== */
const categoryColors: Record<string, { text: string; bg: string; border: string; headerBg: string }> = {
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-400/10',   border: 'border-pink-400/20',   headerBg: 'bg-pink-400/5' },
  blue:   { text: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20',   headerBg: 'bg-blue-400/5' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', headerBg: 'bg-purple-400/5' },
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/20',   headerBg: 'bg-cyan-400/5' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', headerBg: 'bg-yellow-400/5' },
};

/* ===== Category icon map ===== */
const categoryIconMap: Record<string, React.ReactNode> = {
  palette: <Palette size={16} />,
  server:  <Server size={16} />,
  brain:   <Brain size={16} />,
  cloud:   <Cloud size={16} />,
  zap:     <Zap size={16} />,
};

/* ===== App ===== */
export default function App() {
  const [activeTerm, setActiveTerm] = useState<Term | null>(null);
  const [currentPage, setCurrentPage] = useState<SitePage>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: SitePage) => {
    setCurrentPage(page);
    window.history.pushState(null, '', pathForPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markdownReport = siteReports.find(item => item.page === currentPage && item.source === 'markdown');
  if (markdownReport) {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <MarkdownReportPage report={markdownReport} />
      </PageShell>
    );
  }

  if (currentPage === 'demo-report') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <DemoReportPage />
      </PageShell>
    );
  }

  if (currentPage === 'easy-vibe') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <EasyVibePage />
      </PageShell>
    );
  }

  if (currentPage === 'portfolio') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <PortfolioPage />
      </PageShell>
    );
  }

  if (currentPage === 'architecture') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <ArchitecturePage />
      </PageShell>
    );
  }

  if (currentPage === 'ai-report') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <ReportPage />
      </PageShell>
    );
  }

  if (currentPage === 'reports') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <ReportsLibrary onNavigate={navigateTo} />
      </PageShell>
    );
  }

  if (currentPage === 'home') {
    return (
      <PageShell currentPage={currentPage} onNavigate={navigateTo}>
        <ReportPortal onNavigate={navigateTo} />
      </PageShell>
    );
  }

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-white/20 selection:text-white">
      <ProgressBar />
      <PageSwitcher currentPage={currentPage} onNavigate={navigateTo} />
      <AnimatePresence>
        {activeTerm && <TermModal term={activeTerm} onClose={() => setActiveTerm(null)} />}
      </AnimatePresence>
      <main className="flex flex-col">
        <S_Hero />
        <S_Essentials onTermClick={setActiveTerm} />
        <S_Problems onTermClick={setActiveTerm} />
        <S_OfficialCourse />
        <S_TraeTips />
      </main>
      <S_Footer />
    </div>
  );
}

/* ================================================================
   S_Hero
   ================================================================ */
function S_Hero() {
  return (
    <SectionWrapper className="bg-background relative">
      <div className="flex flex-col items-start justify-center h-full">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
            Vibe Coding · 实战指南
          </span>
        </motion.div>

        {/* Title — full width */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans font-bold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
        >
          用 AI 把想法<span className="text-accent">变成产品</span>
        </motion.h1>

        {/* Subtitle + Image — side by side on md+ */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-10 mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xl md:text-2xl text-secondary font-medium max-w-xl leading-relaxed md:pt-2"
          >
            前端页面已经做好了，AI 对话也能用了。
            <br />
            接下来每一步，都是跟 AI 对话完成的。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <img
              src="/product-screenshot.png"
              alt="产品界面"
              className="rounded-2xl border border-white/10 shadow-2xl w-full md:w-[480px]"
            />
          </motion.div>
        </div>

        {/* Quote bento card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bento-card rounded-2xl p-6 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold">核心理念</span>
          </div>
          <p className="text-white text-lg font-medium leading-relaxed">
            代码让 AI 写。你要做的是：<span className="text-accent">想清楚要什么</span>，然后<span className="text-accent">说清楚</span>。
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-secondary/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </SectionWrapper>
  );
}

/* ================================================================
   S_Essentials — "AI Coding 必要操作"
   ================================================================ */
function S_Essentials({ onTermClick }: { onTermClick: (t: Term) => void }) {
  return (
    <SectionWrapper>
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">必要操作</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">每次都要做的事</h2>
      </div>

      {/* Essential step cards */}
      <div className="space-y-5">
        {ESSENTIAL_STEPS.map((step, i) => (
          <EssentialCard key={step.id} step={step} index={i} onTermClick={onTermClick} />
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ===== Essential Step Card ===== */
function EssentialCard({
  step,
  index,
  onTermClick,
}: {
  step: EssentialStep;
  index: number;
  onTermClick: (t: Term) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bento-card rounded-xl overflow-hidden"
    >
      <div className="px-5 py-5 space-y-4">
        {/* Title + description */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
              {index + 1}
            </div>
            <h3 className="text-white font-semibold text-base">{step.title}</h3>
          </div>
          <p className="text-secondary text-sm leading-relaxed ml-[38px]">{step.description}</p>
        </div>

        {/* Prompt with copy */}
        <div className="ml-[38px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-secondary/60 text-[11px] font-bold uppercase tracking-wider">💬 提示词</span>
            <CopyButton text={step.prompt} />
          </div>
          <div className="bg-black/40 rounded-lg p-3.5 border border-white/5">
            <pre className="text-green-400/80 text-[13px] leading-relaxed whitespace-pre-wrap font-sans">
              {step.prompt}
            </pre>
          </div>
        </div>

        {/* Why — yellow box */}
        <div className="ml-[38px] bg-yellow-400/5 border border-yellow-400/10 rounded-lg p-3.5">
          <div className="flex items-start gap-2">
            <Lightbulb size={13} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-yellow-400 text-[11px] font-bold">为什么这样做</span>
              <p className="text-yellow-400/60 text-sm leading-relaxed mt-1">{step.why}</p>
            </div>
          </div>
        </div>

        {/* Term tags */}
        {step.termIds && step.termIds.length > 0 && (
          <div className="ml-[38px] flex flex-wrap gap-2 pt-1">
            {step.termIds.map(id => (
              <TermTag key={id} termId={id} onClick={onTermClick} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================================================================
   S_Problems — "可能遇到的问题"
   ================================================================ */
function S_Problems({ onTermClick }: { onTermClick: (t: Term) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Group scenarios by category
  const categoryKeys = Object.keys(CATEGORY_INFO);
  const grouped = categoryKeys
    .map(key => ({
      key,
      info: CATEGORY_INFO[key],
      scenarios: SCENARIOS.filter(s => s.category === key),
    }))
    .filter(g => g.scenarios.length > 0);

  return (
    <SectionWrapper>
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">常见问题</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">可能会遇到这些情况</h2>
        <p className="text-secondary text-base max-w-2xl">
          按分类整理，点开看：遇到了什么 → 怎么跟 AI 说 → 为什么这样做
          <br />
          <span className="text-accent text-xs">蓝色标签</span>
          <span className="text-secondary text-xs"> 是专业名词，点击可以看解释</span>
        </p>
      </div>

      {/* Category groups */}
      <div className="space-y-10">
        {grouped.map(group => {
          const c = categoryColors[group.info.color] || categoryColors.blue;
          const icon = categoryIconMap[group.info.icon];

          return (
            <div key={group.key}>
              {/* Category header */}
              <div className={`flex items-center gap-3 mb-4 px-4 py-3 rounded-xl ${c.headerBg} border ${c.border}`}>
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center ${c.text}`}>
                  {icon}
                </div>
                <div>
                  <span className={`${c.text} text-sm font-semibold`}>{group.info.label}</span>
                  <span className="text-secondary/60 text-xs ml-2">— {group.info.description}</span>
                </div>
              </div>

              {/* Scenario cards */}
              <div className="space-y-2.5">
                {group.scenarios.map(s => (
                  <ScenarioCard
                    key={s.id}
                    scenario={s}
                    isOpen={openId === s.id}
                    onToggle={() => setOpenId(openId === s.id ? null : s.id)}
                    onTermClick={onTermClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ===== 场景卡片（可折叠） ===== */
function ScenarioCard({
  scenario: s,
  isOpen,
  onToggle,
  onTermClick,
}: {
  scenario: Scenario;
  isOpen: boolean;
  onToggle: () => void;
  onTermClick: (t: Term) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.2 }}
      className="bento-card rounded-xl overflow-hidden"
    >
      {/* Collapsed header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3.5 md:px-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
      >
        <span className="text-white text-sm font-medium group-hover:text-accent transition-colors">
          {s.title}
        </span>
        <ChevronDown
          size={15}
          className={`text-secondary/30 shrink-0 ml-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-4 py-5 md:px-5 space-y-5">
              {/* 遇到了什么 */}
              <div>
                <span className="text-secondary/60 text-[11px] font-bold uppercase tracking-wider">
                  😐 遇到了什么
                </span>
                <p className="text-secondary text-sm leading-relaxed mt-1.5">{s.situation}</p>
              </div>

              {/* 怎么跟 AI 说 */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-secondary/60 text-[11px] font-bold uppercase tracking-wider">
                    💬 怎么跟 AI 说
                  </span>
                  <CopyButton text={s.prompt} />
                </div>
                <div className="bg-black/40 rounded-lg p-3.5 border border-white/5">
                  <pre className="text-green-400/80 text-[13px] leading-relaxed whitespace-pre-wrap font-sans">
                    {s.prompt}
                  </pre>
                </div>
              </div>

              {/* 为什么这样做 — yellow box */}
              <div className="bg-yellow-400/5 border border-yellow-400/10 rounded-lg p-3.5">
                <div className="flex items-start gap-2">
                  <Lightbulb size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-yellow-400 text-[11px] font-bold">为什么这样做</span>
                    <p className="text-yellow-400/60 text-sm leading-relaxed mt-1">{s.why}</p>
                  </div>
                </div>
              </div>

              {/* Term tags */}
              {s.termIds && s.termIds.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {s.termIds.map(id => (
                    <TermTag key={id} termId={id} onClick={onTermClick} />
                  ))}
                </div>
              )}

              {/* Image note */}
              {s.imageNote && (
                <div className="rounded-lg border border-dashed border-white/15 p-3 text-center">
                  <p className="text-secondary/40 text-[11px]">💡 {s.imageNote}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================================================================
   S_OfficialCourse — "官方视频课程"
   ================================================================ */
function S_OfficialCourse() {
  return (
    <SectionWrapper>
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">官方课程</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Trae 官方入门视频</h2>
        <p className="text-secondary text-base max-w-2xl">
          官方出品的 IDE 基础课和核心功能课，有空的时候可以看看
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bento-card rounded-2xl p-8 max-w-2xl mx-auto"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-5">
            <FileText size={26} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">📺 TRAE 入门课程包</h3>
          <p className="text-secondary text-sm leading-relaxed mb-2">
            IDE 基础课、核心功能课
          </p>
          <p className="text-secondary/60 text-sm leading-relaxed mb-6 max-w-md">
            从零开始讲解 Trae 的界面操作、AI 对话、Solo 模式、Skills、Rules 等核心能力。适合刚接触 Trae 的同学系统学习。
          </p>
          <a
            href="https://lcnziv86vkx6.feishu.cn/wiki/FHb5wQR5qiwcv4k1MS1cGbrPnXd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/20 transition-colors"
          >
            前往观看官方课程
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

/* ================================================================
   S_TraeTips — "Trae 小技巧"（论坛网友分享）
   ================================================================ */
function S_TraeTips() {
  return (
    <SectionWrapper>
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">工具技巧</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Trae 使用小技巧</h2>
        <p className="text-secondary text-base max-w-2xl">
          来自官方论坛网友分享的实用能力，每条都附原帖链接
        </p>
      </div>

      {/* Tips grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRAE_TIPS.map((tip, i) => (
          <TipCard key={tip.id} tip={tip} index={i} />
        ))}
      </div>

      {/* Forum link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <a
          href="https://forum.trae.cn/c/9-category/9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
        >
          <Sparkles size={14} />
          查看 Trae 官方社区更多技巧
          <ExternalLink size={12} />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}

/* ===== Tip Card ===== */
function TipCard({ tip, index }: { tip: TraeTip; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="bento-card rounded-xl p-5 flex flex-col justify-between"
    >
      <div>
        {/* Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-7 h-7 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400 text-xs font-bold shrink-0 mt-0.5">
            {index + 1}
          </div>
          <h3 className="text-white font-semibold text-[15px] leading-snug">{tip.title}</h3>
        </div>

        {/* One-liner */}
        <p className="text-accent/70 text-sm font-medium ml-10 mb-2">{tip.oneLiner}</p>

        {/* Detail */}
        <p className="text-secondary text-sm leading-relaxed ml-10">{tip.detail}</p>
      </div>

      {/* Link */}
      <div className="ml-10 mt-4">
        <a
          href={tip.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-purple-400/80 text-xs font-medium hover:text-purple-300 transition-colors"
        >
          {tip.linkLabel || '查看详情'}
          <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  );
}

/* ================================================================
   S_Footer
   ================================================================ */
function S_Footer() {
  return (
    <footer className="py-8 px-8 text-center text-secondary/40 text-xs border-t border-white/5">
      AI 内容生成平台 · Vibe Coding 实战指南 · 2025
    </footer>
  );
}
