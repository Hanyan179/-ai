import React, { useState, useEffect } from 'react';
import { SkillInfo, DemoOutput } from './types';
import { SKILLS_DATA, SCENARIOS, TOOLS, DEMO_OUTPUTS, DEMO_DSFA, SKILLS_MARKETPLACES } from './constants';
import SkillModal from './components/SkillModal';
import SectionWrapper from './components/SectionWrapper';
import PortfolioPage from './pages/portfolio/PortfolioPage';
import { motion } from 'framer-motion';
import {
  ChevronDown, BookOpen, Database, Code2, FileText,
  Layers, GitBranch, Search, Shield, PenTool,
  Zap, ArrowRight, MessageSquare, ExternalLink,
  Route, Cpu, Monitor, Terminal, X, Sparkles, User
} from 'lucide-react';

type PageType = 'demo' | 'portfolio';

const ProgressBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollTop; const m = document.documentElement.scrollHeight - document.documentElement.clientHeight; setP(m > 0 ? t / m : 0); };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (<div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-40"><div className="h-full bg-accent/80 transition-all duration-100" style={{ width: `${p * 100}%` }} /></div>);
};

const skillIcons: Record<string, React.ReactNode> = {
  'dsfa-framework-rules': <Layers size={18} />, 'creating-entity': <Database size={18} />,
  'project-overview': <BookOpen size={18} />, 'project-startup': <Zap size={18} />,
  'requirement-analysis': <Search size={18} />, 'feature-workflow': <GitBranch size={18} />,
  'code-review': <Shield size={18} />, 'writing-skills': <PenTool size={18} />,
  'p2340-database-query': <Database size={18} />, 'p2340-form-dev': <Code2 size={18} />,
};
const cStyles: Record<string, { hover: string; icon: string; arrow: string }> = {
  blue: { hover: 'hover:border-blue-400/30 hover:bg-blue-400/5', icon: 'bg-blue-400/10 text-blue-400', arrow: 'group-hover:text-blue-400' },
  green: { hover: 'hover:border-green-400/30 hover:bg-green-400/5', icon: 'bg-green-400/10 text-green-400', arrow: 'group-hover:text-green-400' },
  yellow: { hover: 'hover:border-yellow-400/30 hover:bg-yellow-400/5', icon: 'bg-yellow-400/10 text-yellow-400', arrow: 'group-hover:text-yellow-400' },
};
const SkillCard: React.FC<{ skill: SkillInfo; color: string; onClick: () => void }> = ({ skill, color, onClick }) => {
  const cs = cStyles[color] || cStyles.blue;
  return (
    <button onClick={onClick} className={`bento-card rounded-xl p-5 text-left ${cs.hover} transition-all duration-200 group cursor-pointer`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg ${cs.icon} flex items-center justify-center`}>{skillIcons[skill.id] || <FileText size={18} />}</div>
        <div className="flex-1 min-w-0"><div className="text-white font-medium text-sm truncate">{skill.displayName}</div></div>
        <ArrowRight size={14} className={`text-secondary/30 ${cs.arrow} transition-colors`} />
      </div>
      <p className="text-secondary text-xs leading-relaxed line-clamp-2">{skill.description}</p>
      {skill.references && skill.references.length > 0 && (<div className="mt-3 flex items-center gap-1 text-[10px] text-secondary/50"><FileText size={10} /><span>{skill.references.length} 个参考文档</span></div>)}
    </button>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('demo');
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo | null>(null);
  const dsfaSkills = SKILLS_DATA.filter(s => s.category === 'dsfa');
  const p2340Skills = SKILLS_DATA.filter(s => s.category === 'p2340');
  const generalSkills = SKILLS_DATA.filter(s => s.category === 'general');

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (currentPage === 'portfolio') {
    return (
      <div className="bg-background min-h-screen text-primary selection:bg-white/20 selection:text-white">
        <ProgressBar />
        <button
          onClick={() => navigateTo('demo')}
          className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
        >
          <ArrowRight size={16} className="rotate-180" />
          返回 Demo 报告
        </button>
        <PortfolioPage />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-white/20 selection:text-white">
      <ProgressBar />
      {/* 右上角跳转按钮 */}
      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      <main className="flex flex-col">
        <S1_Hero />
        <S2_Evolution />
        <S3_DocAsset />
        <S4_Portfolio onNavigate={() => navigateTo('portfolio')} />
        <S5_TwoPaths />
        <S6_SceneDef />
        <S7_SkillsGallery dsfaSkills={dsfaSkills} p2340Skills={p2340Skills} generalSkills={generalSkills} onSelect={setSelectedSkill} />
        <S8_DemoOutput />
        <S9_ToolCompare />
        <S10_ToolRecommend />
        <S11_Conclusion />
      </main>
      <footer className="py-8 px-8 text-center text-secondary/40 text-xs border-t border-white/5">DreamWeb AI Coding Demo · 2025</footer>
    </div>
  );
}

/* ===== 一、背景与核心诉求 ===== */
function S1_Hero() {
  return (
    <SectionWrapper className="bg-background relative">
      <div className="flex flex-col items-start justify-center h-full max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8 flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wide uppercase">2026.03.04 · 回答与验证</span>
          <span className="text-secondary text-xs tracking-wide uppercase border-l border-white/10 pl-3">DreamWeb</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-sans font-bold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]">
          针对叶哥 AI 编程研究<br/>相关问题的回答与初步验证
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-sans text-xl md:text-2xl text-secondary font-medium tracking-tight max-w-3xl leading-relaxed mb-8">
          初步结论：不需要重构框架，也不必局限于公开框架。问题的解法不在于框架本身的轻重，而在于开发模式的工程化演进和场景定义。
        </motion.p>
        {/* 叶哥原话引用 */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="bento-card rounded-2xl p-6 max-w-3xl">
          <div className="flex items-center gap-2 mb-3"><MessageSquare size={14} className="text-accent" /><span className="text-accent text-xs font-semibold">叶哥问题摘要</span></div>
          <p className="text-secondary text-sm leading-relaxed italic">"前端的应该是比较容易实现的，基于公开框架和已有的 skill 做静态示例...把 DSFA 框架拆解形成多个 skill...但是后台部分相对就要麻烦很多，我们的框架引擎都很重，也都是自己研发的。可能要完全重构框架或者就是只基于公开框架来做开发。"</p>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-secondary/40 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </SectionWrapper>
  );
}

/* ===== 二、AI 辅助编程的三个演进阶段 ===== */
function S2_Evolution() {
  const stages = [
    {
      icon: <Zap size={32} />, color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5', num: '01',
      title: 'Vibe Coding', sub: '情绪化 / 直觉编程',
      desc: '临时性、探索性和即兴交互，充分发挥 AI 发散能力，用于项目从 0 到 1 简单、迅速的功能实现。',
      detail: '这就类似于叶哥提到的前端部分。前端很多时候偏向单文件、无复杂的底层联动，AI 凭借庞大的训练数据可以迅速生成界面。',
      limit: '局限：随着业务深入，数据"熵增"，边界变广，AI 会开始抓瞎。'
    },
    {
      icon: <Cpu size={32} />, color: 'text-blue-400', border: 'border-blue-400/20', bg: 'bg-blue-400/5', num: '02',
      title: 'Agent Coding', sub: '确定性 / 工程化编程',
      desc: '工程性、严谨性开发。针对企业级业务，强调测试、边界和文档性编程。',
      detail: '不是让 AI 自由发挥，而是"按照我需要你帮我的步骤来严格执行"。',
      limit: ''
    },
    {
      icon: <BookOpen size={32} />, color: 'text-green-400', border: 'border-green-400/20', bg: 'bg-green-400/5', num: '03',
      title: 'Skills', sub: '技能化 / 企业级约束',
      desc: '针对企业级开发不断深入、代码不断变多变乱，AI 无法一次性吃下庞大业务上下文而演进出的概念。',
      detail: '本质上没有任何技术黑科技，纯粹是一个工程性的管理方法。它是对 AI 的一种"编辑约束和演示示例"，告诉 AI 在特定场景下该查什么数据、用什么规范。',
      limit: ''
    },
  ];
  return (
    <>
      <SectionWrapper>
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">二、相关概念解释</span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">AI 辅助编程的演进</h2>
          <p className="text-secondary text-2xl max-w-3xl">要解决我们复杂业务线和重型框架的 AI 辅助开发问题，<br className="hidden md:block" />首先需要理清企业工程化落地 AI 的<span className="text-white font-semibold">三个必然演进阶段</span>。</p>
        </div>
        <div className="flex flex-col gap-10">
          {stages.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bento-card rounded-2xl p-8 md:p-10 border ${item.border} ${item.bg} flex flex-col md:flex-row md:items-start gap-6`}>
              <div className="flex items-center gap-5 md:w-72 shrink-0">
                <span className={`text-5xl font-black opacity-20 ${item.color}`}>{item.num}</span>
                <div className={`${item.color}`}>{item.icon}</div>
                <div>
                  <div className="text-white font-bold text-2xl">{item.title}</div>
                  <div className="text-secondary text-sm mt-1">{item.sub}</div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-secondary text-base leading-relaxed mb-3">{item.desc}</p>
                <p className="text-primary/60 text-sm leading-relaxed">{item.detail}</p>
                {item.limit && <p className="text-warning text-sm mt-4 font-medium">{item.limit}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
      {/* 参考链接单独一小段 */}
      <div className="px-8 md:px-20 pb-16 -mt-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="bento-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <BookOpen size={16} className="text-accent" />
              <span className="text-white font-semibold text-sm">参考资料</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              {[
                { label: 'Claude 官方 Skills 最佳实践规范', url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices' },
                { label: 'Claude 官方 Skills 介绍', url: 'https://www.anthropic.com/news/skills' },
                { label: 'Claude 工程博客深入解析', url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills' },
                { label: 'Trae 官方 Skill 最佳实践', url: 'https://docs.trae.cn/ide/best-practice-for-how-to-write-a-good-skill' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-accent hover:text-white text-sm transition-colors group">
                  <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== 三、核心基建：文档即资产 ===== */
function S3_DocAsset() {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">三、个人认知与核心基建</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">文档即资产</h2>
        <p className="text-secondary text-2xl max-w-3xl mb-12">AI 时代最好的语言是 Markdown，是文档规范。<br className="hidden md:block" />这也是目前我们公司内部亟待解决的痛点。</p>
      </div>
      {/* 金句 */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}
        className="text-center py-12 mb-16">
        <p className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          代码本身已经<span className="text-accent">不值钱</span>了，<br/>值钱的是<span className="text-accent">文档</span>。
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bento-card rounded-2xl p-8">
          <div className="text-danger text-sm font-semibold mb-4">⚠ 当前痛点</div>
          <p className="text-secondary text-base leading-relaxed">我们现在往往只追求功能产出，但缺乏文档结构的规范，导致代码难以复用，也没有完善的开发文档沉淀。</p>
        </div>
        <div className="bento-card rounded-2xl p-8">
          <div className="text-success text-sm font-semibold mb-4">✦ 正确路径</div>
          <p className="text-secondary text-base leading-relaxed">文档给企业沉淀业务逻辑，给 AI 提供上下文。AI 根据文档生成代码，人来验证、测试和迭代。</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===== 四、业余时间成果展示 ===== */
function S4_Portfolio({ onNavigate }: { onNavigate: () => void }) {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">四、业余时间成果展示</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">个人技术实践</h2>
        <p className="text-secondary text-2xl max-w-3xl mb-10">业余时间利用 AI 辅助完成的全栈项目，<br className="hidden md:block" />从 Java 后端到 Web 全栈、iOS 原生开发。</p>
        <button
          onClick={onNavigate}
          className="px-8 py-4 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all duration-200 flex items-center gap-3 text-lg font-semibold"
        >
          <User size={20} />
          查看项目详情
          <ArrowRight size={20} />
        </button>
      </div>
    </SectionWrapper>
  );
}

/* ===== 五、两条路径 ===== */
function S5_TwoPaths() {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">五、针对叶哥问题的研究</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">两条路径见解</h2>
        <p className="text-secondary text-2xl max-w-3xl">框架重与否、选择什么框架其实都不重要，<br className="hidden md:block" /><span className="text-white font-semibold">确定性编程（Agent 开发）才是核心。</span></p>
      </div>

      {/* 主流轻量化框架介绍 */}
      <div className="bento-card rounded-2xl p-8 mb-12">
        <h3 className="text-white font-semibold text-base mb-6 flex items-center gap-2">
          <Layers size={18} className="text-accent" />
          目前主流的公开轻量化框架一览
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { name: 'Vue / Nuxt', tag: '前端', desc: '渐进式框架，上手快，AI 语料丰富，适合中后台管理系统快速搭建。' },
            { name: 'React / Next.js', tag: '前端', desc: '组件化生态最成熟，Server Components + 混合渲染，AI 代码生成支持度最高。' },
            { name: 'Python / FastAPI', tag: '后端', desc: '异步高性能 API 框架，类型提示友好，AI 生成准确率高，适合快速构建服务端。' },
            { name: 'Node / Express', tag: '后端', desc: '最轻量的 Node.js 后端方案，社区庞大，AI 训练数据覆盖最广。' },
          ].map((fw, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-base font-semibold">{fw.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent">{fw.tag}</span>
              </div>
              <p className="text-secondary text-sm leading-relaxed">{fw.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-secondary/60 text-sm mt-5">这些框架的共同特点：AI 训练语料覆盖广、社区活跃、上手门槛低。在 Vibe Coding 阶段非常好用。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 路径1 */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bento-card rounded-2xl p-10 border-l-4 border-l-yellow-400/50">
          <div className="flex items-center gap-3 mb-6"><Route size={22} className="text-yellow-400" /><span className="text-yellow-400 font-bold text-lg">路径 1：基于公开轻量化框架</span></div>
          <p className="text-secondary text-sm mb-3">如 Vue / React / Python / FastAPI</p>
          <p className="text-secondary text-base leading-relaxed mb-6">选用目前 AI 训练语料最丰富、最简单化的通用框架。</p>
          <div className="bg-danger/10 rounded-xl p-5 mb-4">
            <p className="text-danger text-sm font-semibold mb-2">致命伤</p>
            <p className="text-secondary text-sm leading-relaxed">除了丢弃了现有的安全管控和底层积累外，最大的致命伤在于——随着后续工程化的演进和数据的"熵增"，复杂的业务逻辑依然会涌现，这条路最终还是会撞上南墙，不可避免地跑回到路径 2 要解决的问题上。</p>
          </div>
          <div className="bg-yellow-400/10 rounded-xl p-5">
            <p className="text-yellow-400 text-sm font-semibold mb-2">⚠️ 实际踩坑经验</p>
            <p className="text-secondary text-sm leading-relaxed">半年前我在实际项目中就遇到了这个问题：初期用轻量框架 + AI 确实很快，但随着功能不断增多，代码量膨胀，模块间耦合加深，AI 生成的代码开始出现混乱——重复逻辑、命名冲突、上下文丢失。最终项目依然走向了"熵增失控"，不得不回头补文档、加约束，本质上就是在走路径 2 的路。</p>
          </div>
        </motion.div>
        {/* 路径2 */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bento-card rounded-2xl p-10 border-l-4 border-l-green-400/50">
          <div className="flex items-center gap-3 mb-6"><Route size={22} className="text-green-400" /><span className="text-green-400 font-bold text-lg">路径 2：基于现有重型框架</span></div>
          <p className="text-secondary text-sm mb-3">如 DSFA / DreamWeb</p>
          <p className="text-secondary text-base leading-relaxed mb-6">引入 Skills 概念，主要是给 AI 划定边界。AI 不需要懂整个框架的底层原理，它只需要具体的例子和约束。有了实际的例子场景，AI 就能根据约束去模仿。</p>
          <div className="bg-green-400/10 rounded-xl p-5 mb-4">
            <p className="text-green-400 text-sm font-semibold mb-2">破局点</p>
            <p className="text-secondary text-sm leading-relaxed">一旦专家把这些场景沉淀为 Skill 文档，普通的业务需求就可以直接交给 AI 来编程。</p>
          </div>
          <div className="bg-yellow-400/10 rounded-xl p-5">
            <p className="text-yellow-400 text-sm font-semibold mb-2">困难点</p>
            <p className="text-secondary text-sm leading-relaxed">我们要如何选择哪些场景作为 AI 需要的内容？这就需要对框架理解极深的人来做梳理。因为思考的情况够多，才知道"什么场景用得多"、"哪些东西是重复性劳动"。</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ===== 六、场景定义 ===== */
function S6_SceneDef() {
  const [showCrossModule, setShowCrossModule] = useState(false);
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">六、场景定义</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">明确低代码与 AI 的业务边界</h2>
        <p className="text-secondary text-2xl max-w-3xl">针对 DreamWeb 等平台的实际情况，<br className="hidden md:block" />我们需要明确什么需要 AI 做，什么不需要。</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-14">
        {[
          { label: '简单业务', desc: 'DreamWeb 本身的低代码能力已经能覆盖的（如表单配置），不需要 AI 做。', color: 'text-secondary', bg: 'bg-white/5', border: 'border-white/5', clickable: false },
          { label: '黄金区间 ✦', desc: '高频、重复、有固定模式的代码编写，交由 AI 来做。需要开发介入的场景化组件。', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20', clickable: false },
          { label: '复杂跨模块流转', desc: '不一定做不了，但需要甄别判断，重要的是测试验证。点击查看详细补充说明与实际案例。', color: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/20', clickable: true },
        ].map((item, i) => (
          <div key={i}
            onClick={item.clickable ? () => setShowCrossModule(true) : undefined}
            className={`rounded-2xl p-8 border ${item.border} ${item.bg} transition-all duration-200 ${item.clickable ? 'cursor-pointer hover:border-blue-400/40 hover:bg-blue-400/10 group' : ''}`}>
            <div className={`font-bold text-lg mb-3 ${item.color}`}>
              {item.label}
              {item.clickable && <span className="text-xs ml-2 opacity-60 group-hover:opacity-100">→ 点击查看</span>}
            </div>
            <p className="text-secondary text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bento-card rounded-2xl overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-secondary text-sm font-medium">场景</th>
              <th className="text-center px-4 py-4 text-secondary text-sm font-medium">频率</th>
              <th className="text-center px-4 py-4 text-secondary text-sm font-medium">模式固定</th>
              <th className="text-center px-4 py-4 text-secondary text-sm font-medium">AI 能做</th>
              <th className="text-left px-6 py-4 text-secondary text-sm font-medium">状态</th>
            </tr></thead>
            <tbody>{SCENARIOS.map((s, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="px-6 py-4 text-white">{s.name}</td>
                <td className="text-center px-4 py-4"><span className={`text-sm font-medium ${s.frequency === '高' ? 'text-green-400' : s.frequency === '中' ? 'text-yellow-400' : 'text-secondary'}`}>{s.frequency}</span></td>
                <td className="text-center px-4 py-4 text-sm">{s.patternFixed ? '✓' : '✗'}</td>
                <td className="text-center px-4 py-4 text-sm">{s.aiCapable ? '✓' : '✗'}</td>
                <td className="px-6 py-4 text-sm">{s.statusLabel}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <p className="text-secondary text-base leading-relaxed">上面的其实都是简单的操作，更复杂的操作在于多表、多关联关系相关，写 SQL、关联查询、复杂查询 AI 都能做。部分东西其实我们低代码平台就可以做了，只是简单测试一下。</p>

      {/* 复杂跨模块弹窗 */}
      {showCrossModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCrossModule(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-10 z-10"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCrossModule(false)} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-6">
              <GitBranch size={22} className="text-blue-400" />
              <h3 className="text-white font-bold text-xl">关于"复杂跨模块流转"的补充</h3>
            </div>
            <p className="text-secondary text-base leading-relaxed mb-8">
              复杂跨模块流转并不意味着 AI 完全做不了。核心在于<span className="text-white font-semibold">甄别判断</span>——哪些跨模块逻辑是可以拆解为多个有固定模式的子任务的，哪些是真正无规律的非标定制。对于可拆解的部分，AI 配合 Skills 约束依然能胜任，<span className="text-white font-semibold">重要的是测试验证</span>。
            </p>
            <div className="bg-blue-400/10 rounded-xl p-6 mb-6">
              <p className="text-blue-400 text-sm font-semibold mb-3">💡 实际案例：党建模块开发</p>
              <p className="text-secondary text-sm leading-relaxed">
                在党建相关业务开发中，涉及党员管理、组织关系、活动记录等多个模块的联动。这类场景看似复杂，但实际上每个子模块的 CRUD 和关联查询都有固定模式。通过将每个子场景定义为独立的 Skill，AI 可以逐个击破，最终串联起完整的业务流程。这个例子说明：跨模块 ≠ 做不了，关键是拆解粒度和测试覆盖。
              </p>
            </div>
            <div className="bg-yellow-400/10 rounded-xl p-6">
              <p className="text-yellow-400 text-sm font-semibold mb-3">⚠️ 踩坑经验：大需求的"熵增"现实</p>
              <p className="text-secondary text-sm leading-relaxed mb-4">
                一个大需求交给 AI 去做，后续实际上说能用吧，能用。但是全是报错，后续还是需要手工检查然后一个个修改。这就是为什么我们强调"测试验证"——AI 能产出 80% 的代码，但剩下 20% 的边界情况和错误处理，仍然需要人来把关。
              </p>
              {/* 预留微信截图位置 */}
              <img src="/微信图片_20260305200306_3398_52.png" alt="踩坑经验截图" className="rounded-lg border border-yellow-400/20 mt-4 w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden'); }} />
              <div className="hidden rounded-lg border border-dashed border-yellow-400/30 p-4 text-center text-yellow-400/50 text-sm mt-4">
                📷 请将截图放到 ai/public/ 目录下
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  );
}

/* ===== Skills 一览（可点击） ===== */
function S7_SkillsGallery({ dsfaSkills, p2340Skills, generalSkills, onSelect }: {
  dsfaSkills: SkillInfo[]; p2340Skills: SkillInfo[]; generalSkills: SkillInfo[]; onSelect: (s: SkillInfo) => void;
}) {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Skills 详情</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">本次编写的 Skills</h2>
        <p className="text-secondary text-2xl max-w-3xl">点击任意 Skill 卡片查看详细内容。<br className="hidden md:block" />昨天时间不够用，随便写了几个 Skills，可以作为相关的尝试。</p>
      </div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-blue-400 text-sm font-semibold">DSFA 框架 Skills</span><span className="text-secondary text-xs">— 中小企业项目启动 & 框架规范</span></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{dsfaSkills.map(s => <SkillCard key={s.id} skill={s} color="blue" onClick={() => onSelect(s)} />)}</div>
      </div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-green-400 text-sm font-semibold">P2340 测试 Skills</span><span className="text-secondary text-xs">— 数据库探查 & 高频表单开发</span></div>
        <div className="grid md:grid-cols-2 gap-4">{p2340Skills.map(s => <SkillCard key={s.id} skill={s} color="green" onClick={() => onSelect(s)} />)}</div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-yellow-400" /><span className="text-yellow-400 text-sm font-semibold">通用 Skills</span></div>
        <div className="grid md:grid-cols-3 gap-4">{generalSkills.map(s => <SkillCard key={s.id} skill={s} color="yellow" onClick={() => onSelect(s)} />)}</div>
      </div>

      {/* 公开 Skills 市场 */}
      <div className="mt-14 bento-card rounded-2xl p-8">
        <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
          <ExternalLink size={18} className="text-accent" />
          公开 Skills 市场（社区资源）
        </h3>
        <p className="text-secondary text-sm mb-6">虽然通用 Skills 对我们企业级框架帮助有限，但可以作为编写参考和灵感来源。</p>
        <div className="flex flex-col gap-3">
        {SKILLS_MARKETPLACES.map((m, i) => (
          <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all group">
            <ExternalLink size={16} className="text-accent shrink-0 opacity-60 group-hover:opacity-100" />
            <div>
              <div className="text-white text-sm font-medium group-hover:text-accent transition-colors">{m.name}</div>
              <div className="text-secondary text-xs mt-1">{m.desc}</div>
            </div>
          </a>
        ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===== 七、Demo 测试情况 ===== */
function S8_DemoOutput() {
  const [selectedDemo, setSelectedDemo] = useState<DemoOutput | null>(null);
  const totalLines = DEMO_OUTPUTS.reduce((sum, d) => sum + d.lines, 0);
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">七、Demo 测试情况汇报</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">初步 Demo 跑通测试</h2>
        <p className="text-secondary text-2xl max-w-3xl">基于路径 2 和场景定义，做了两组 Demo 跑通测试。<br className="hidden md:block" />如有需要，随时可以进行现场演示。</p>
      </div>

      {/* Demo 1: DSFA 项目启动 */}
      <div className="bento-card rounded-2xl p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400 text-lg font-bold">A</div>
          <div>
            <div className="text-white text-lg font-semibold">{DEMO_DSFA.name}</div>
            <div className="text-secondary text-sm mt-1">{DEMO_DSFA.desc}</div>
          </div>
        </div>
        <p className="text-secondary text-base leading-relaxed mb-4">{DEMO_DSFA.result}</p>
        <div className="flex flex-wrap gap-2">
          {DEMO_DSFA.skillsUsed.map(s => (
            <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-blue-400/10 text-blue-400 border border-blue-400/20 font-mono">{s}</span>
          ))}
        </div>
      </div>

      {/* Demo 2: DreamWeb DJ */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 text-lg font-bold">B</div>
          <div>
            <div className="text-white text-lg font-semibold">DreamWeb 党建模块 · 4 个场景</div>
            <div className="text-secondary text-sm mt-1">基于党员花名册模块，点击查看每个场景的详细交互过程</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mb-14">
        {[
          { num: '4', label: '完成场景' },
          { num: '7', label: '涉及文件' },
          { num: String(totalLines), label: '代码行数' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.15 }}
            className="bento-card rounded-2xl p-10 text-center">
            <div className="text-6xl md:text-7xl font-black text-accent mb-3">{item.num}</div>
            <div className="text-secondary text-lg">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-5 mb-12">
        {DEMO_OUTPUTS.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setSelectedDemo(d)}
            className="bento-card rounded-xl p-6 flex items-center justify-between cursor-pointer hover:border-accent/30 hover:bg-accent/5 transition-all group">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-bold">{i + 1}</div>
              <div>
                <div className="text-white text-base font-medium group-hover:text-accent transition-colors">{d.name}</div>
                <div className="text-secondary text-sm mt-1">{d.desc}{d.rounds ? ` · ${d.rounds} 轮交互` : ''}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-accent text-lg font-mono font-bold">{d.lines} 行</div>
              <ArrowRight size={16} className="text-secondary/30 group-hover:text-accent transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bento-card rounded-2xl p-8 text-center">
        <p className="text-white text-xl font-semibold">核心验证：只要基于写好的 Skill 文档，即使是相对较重的业务流转，AI 也能稳定产出符合规范的代码。</p>
      </div>

      {/* Demo 详情弹窗 */}
      {selectedDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDemo(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-10 z-10"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedDemo(null)} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors"><X size={20} /></button>

            <h3 className="text-white font-bold text-xl mb-2">{selectedDemo.name}</h3>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-accent font-mono font-bold">{selectedDemo.lines} 行代码</span>
              <span className="text-secondary text-sm">{selectedDemo.desc}</span>
            </div>

            {/* 交互轮次 */}
            {selectedDemo.rounds && (
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20">共 {selectedDemo.rounds} 轮交互</span>
              </div>
            )}

            {/* 我的原话 */}
            {selectedDemo.myWords && selectedDemo.myWords.length > 0 && (
              <div className="mb-8">
                <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">💬 我对 AI 说的话</div>
                <div className="space-y-3">
                  {selectedDemo.myWords.map((w, i) => (
                    <div key={i} className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
                      <span className="text-accent text-xs font-bold shrink-0 mt-1">第{w.round}轮</span>
                      <p className="text-white text-sm italic leading-relaxed">"{w.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 使用的 Skills */}
            {selectedDemo.skillsUsed && selectedDemo.skillsUsed.length > 0 && (
              <div className="mb-8">
                <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">📄 使用的 Skills</div>
                <div className="flex flex-wrap gap-2">
                  {selectedDemo.skillsUsed.map(s => (
                    <span key={s} className="text-sm px-3 py-2 rounded-lg bg-blue-400/10 text-blue-400 border border-blue-400/20 font-mono">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* AI 操作步骤 */}
            {selectedDemo.aiSteps && selectedDemo.aiSteps.length > 0 && (
              <div className="mb-8">
                <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">🤖 AI 的操作步骤</div>
                <div className="space-y-3">
                  {selectedDemo.aiSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-secondary text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 涉及文件 */}
            {selectedDemo.files && selectedDemo.files.length > 0 && (
              <div className="mb-8">
                <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">📁 涉及文件</div>
                <div className="flex flex-col gap-2">
                  {selectedDemo.files.map((f, i) => (
                    <span key={i} className="text-sm px-3 py-2 rounded-lg bg-white/5 text-secondary border border-white/5 font-mono">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* 补充说明 */}
            {selectedDemo.note && (
              <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
                <p className="text-yellow-400/80 text-sm leading-relaxed">💡 {selectedDemo.note}</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  );
}

/* ===== 八、工具形态对比 ===== */
function S9_ToolCompare() {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">八、工具形态与使用方案</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">AI IDE vs AI CLI</h2>
        <p className="text-secondary text-2xl max-w-3xl">目前 AI 辅助编程工具主要分为两类，<br className="hidden md:block" />我们需要认清它们的优缺点。</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bento-card rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6"><Monitor size={28} className="text-blue-400" /><span className="text-white font-bold text-xl">AI IDE</span><span className="text-secondary text-sm">如 Trae 等可视化工具</span></div>
          <div className="mb-5"><span className="text-success text-sm font-semibold">优点：</span><p className="text-secondary text-base mt-2 leading-relaxed">可视化、对新手友好，内置了很好的 Skills 机制交互方便，对于初测和简单场景非常直观。</p></div>
          <div><span className="text-danger text-sm font-semibold">缺点：</span><p className="text-secondary text-base mt-2 leading-relaxed">单线程操作带来的极大浪费。它本质上是线性的，如果什么都让 AI 做了，人就只能在旁边等窗口逐行生成代码。开发人员不能一直等待，这个时间成本是极大的浪费。</p></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bento-card rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6"><Terminal size={28} className="text-green-400" /><span className="text-white font-bold text-xl">AI CLI</span><span className="text-secondary text-sm">命令行终端多线程流派</span></div>
          <div className="mb-5"><span className="text-success text-sm font-semibold">优点：</span><p className="text-secondary text-base mt-2 leading-relaxed">多线程并发解决问题。通过终端操作和分配机制，可以多窗口同时运行。比如：交代完问题 A，它在后台跑着；马上切到窗口 2 去处理问题 B。这种并发效率是 IDE 无法比拟的。</p></div>
          <div><span className="text-danger text-sm font-semibold">缺点：</span><p className="text-secondary text-base mt-2 leading-relaxed">门槛高，需要开发者具备极强的任务拆解能力和系统大局观，并且需要时刻保持"心流状态"和"跳跃状态"，身累心累，打字累，思考累。</p></div>
        </motion.div>
      </div>
      {/* AI IDE 使用方案 */}
      <div className="bento-card rounded-2xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-white text-base font-semibold">AI Coding IDE 三级使用方案</span>
          <span className="text-secondary text-xs">从国内免费到世界顶级，按层级递进</span>
        </div>
        <div className="grid md:grid-cols-3 gap-0 divide-x divide-white/5">
          {TOOLS.map((t, i) => {
            const tierColors = ['border-slate-400/30', 'border-blue-400/50', 'border-accent/50'];
            const tierLabels = ['Tier 1 · 国内免费', 'Tier 2 · 谷歌方案', 'Tier 3 · 亚马逊方案'];
            const tierBadgeColors = ['bg-slate-400/10 text-slate-400', 'bg-blue-400/10 text-blue-400', 'bg-accent/10 text-accent'];
            return (
              <div key={i} className={`p-6 border-t-4 ${tierColors[i]} ${i === 2 ? 'bg-accent/[0.03]' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${tierBadgeColors[i]}`}>{tierLabels[i]}</span>
                  <span className="text-secondary text-xs">Tier {t.tier}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{t.name}</h3>
                <p className="text-secondary text-sm mb-4">{t.vendor}</p>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm"><span className="text-secondary">费用</span><span className="text-green-400 font-semibold">{t.free}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-secondary">AI 模型</span><span className="text-white">{t.aiModel}</span></div>
                  <div className="text-sm"><span className="text-secondary">前提条件：</span><span className="text-white">{t.requirement}</span></div>
                </div>
                <p className="text-secondary text-xs leading-relaxed border-t border-white/5 pt-3">{t.note}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* 国内编程模型推荐 */}
      <div className="bento-card rounded-2xl p-6 flex items-center gap-4">
        <Sparkles size={20} className="text-yellow-400 shrink-0" />
        <div>
          <span className="text-white text-sm font-semibold">国内编程模型推荐：</span>
          <span className="text-secondary text-sm ml-2">目前国内较好的编程大模型是 <span className="text-white font-medium">GLM（智谱）</span>，在 Trae 中可直接使用。</span>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===== 九、目前的工具使用推荐介绍 ===== */
function S10_ToolRecommend() {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">九、AI IDE 使用方案</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">三级方案详细说明</h2>
        <p className="text-secondary text-2xl max-w-3xl">从国内免费到世界顶级模型，<br className="hidden md:block" />三个层级按需选择。</p>
      </div>
      <div className="space-y-10">
        {/* Tier 1: Trae */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bento-card rounded-2xl p-8 border-l-4 border-l-slate-400/50">
          <div className="flex items-center gap-3 mb-6">
            <Monitor size={24} className="text-slate-400" />
            <span className="text-white font-bold text-xl">Tier 1 · Trae</span>
            <span className="bg-slate-400/10 text-slate-400 text-xs px-2 py-0.5 rounded-full">基础方案 · 零门槛</span>
          </div>
          <p className="text-secondary text-base leading-relaxed mb-6">字节跳动出品的 AI IDE，国内直接使用，目前完全免费。适合大家自己下载实验，熟悉 AI 辅助编程的工作方式。</p>
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-white text-sm font-semibold mb-3">使用方式</p>
            <div className="space-y-2 text-secondary text-sm">
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">1.</span><span>直接下载 Trae IDE 安装使用</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">2.</span><span>内置国内模型（GLM / 豆包），无需科学上网</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">3.</span><span>目前完全免费，适合日常实验和简单场景</span></div>
            </div>
          </div>
          <div className="bg-green-400/10 rounded-xl p-4 mt-4 flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold">💰 费用</span>
            <span className="text-white text-lg font-bold">¥0 / 免费</span>
          </div>
        </motion.div>

        {/* Tier 2: Antigravity */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bento-card rounded-2xl p-8 border-l-4 border-l-blue-400/50">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} className="text-blue-400" />
            <span className="text-white font-bold text-xl">Tier 2 · Antigravity</span>
            <span className="bg-blue-400/10 text-blue-400 text-xs px-2 py-0.5 rounded-full">进阶方案 · 推荐</span>
          </div>
          <p className="text-secondary text-base leading-relaxed mb-6">Google 出品的 AI IDE，可以使用国外顶级 AI 模型。免费用户有 $300 算力额度，足够长期使用。</p>
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-white text-sm font-semibold mb-3">获取方式</p>
            <div className="space-y-2 text-secondary text-sm">
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">1.</span><span>准备科学上网工具</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">2.</span><span>注册 Google 账号</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">3.</span><span>下载 Antigravity IDE，用 Google 账号登录</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">4.</span><span>自动获得 $300 免费算力额度</span></div>
            </div>
          </div>
          <div className="bg-green-400/10 rounded-xl p-4 mt-4 flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold">💰 费用</span>
            <span className="text-white text-lg font-bold">$300 免费额度（约 ¥2,100）</span>
          </div>
        </motion.div>

        {/* Tier 3: Kiro */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bento-card rounded-2xl p-8 border-l-4 border-l-accent/50 bg-accent/[0.02]">
          <div className="flex items-center gap-3 mb-6">
            <Monitor size={24} className="text-accent" />
            <span className="text-white font-bold text-xl">Tier 3 · Kiro</span>
            <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">最优方案 · 本次使用</span>
          </div>
          <p className="text-secondary text-base leading-relaxed mb-6">亚马逊（AWS）出品的 AI IDE，可以使用世界上最好的 AI 模型（Claude 系列）。需要 AWS 账号，且账号需在一年以内注册。</p>
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-white text-sm font-semibold mb-3">获取方式</p>
            <div className="space-y-2 text-secondary text-sm">
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">1.</span><span>需要一个一年以内注册的 AWS 账号</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">2.</span><span>如果有需要，由我这边统一办理，其他人不用自己弄</span></div>
              <div className="flex items-start gap-2"><span className="text-accent font-bold shrink-0">3.</span><span>使用 AWS 账号登录 Kiro IDE 即可</span></div>
            </div>
          </div>
          <div className="bg-yellow-400/10 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold mb-2">💡 说明</p>
            <p className="text-secondary text-xs leading-relaxed">Kiro 有免费额度可以先体验。AWS 账号注册需要一年以内的新账号才能享受相关权益，所以这个由我来统一处理，大家不需要自己操心。</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ===== 十、总结与认知升级 ===== */
function S11_Conclusion() {
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">十、总结与认知升级</span>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">核心认知升级</h2>
      </div>
      {/* 金句 */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}
        className="text-center py-12 mb-16">
        <p className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
          未来，不是不需要人进行开发，<br/>而是需要人去<span className="text-accent">"驱动"</span>和<span className="text-accent">"管理"</span>开发。
        </p>
        <p className="text-secondary text-2xl max-w-3xl mx-auto">单纯的手写代码能力会被无限贬值，未来的核心竞争力在于人人都是产品经理，都要具备极强的结构性思维。</p>
      </motion.div>

      {/* 这个网站本身就是例子 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="bento-card rounded-2xl p-8 md:p-10 mb-14 border border-accent/20 bg-accent/5">
        <div className="flex items-center gap-3 mb-6">
          <Monitor size={22} className="text-accent" />
          <h3 className="text-white font-bold text-xl">其实，这个网站本身就是一个完整的例子</h3>
        </div>
        <div className="space-y-8">
          {/* 类比1: 可视化 = Vibe Coding */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 text-sm font-bold shrink-0">壳</div>
            <div>
              <div className="text-white font-semibold text-base mb-2">网站的可视化界面 → Vibe Coding</div>
              <p className="text-secondary text-sm leading-relaxed">你现在看到的这个页面，UI、动画、布局，全部是 AI 直接生成的。这就是前端简单场景的体现——不需要 Skills，AI 凭训练数据就能搞定。对应之前说的"前端部分比较容易实现"。</p>
            </div>
          </div>
          {/* 类比2: 内容 = Skills 沉淀 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 text-sm font-bold shrink-0">魂</div>
            <div>
              <div className="text-white font-semibold text-base mb-2">网站的内容 → Skills 知识沉淀</div>
              <p className="text-secondary text-sm leading-relaxed">但网站里的内容——上午做的 DSFA 环境搭建启动，下午做的 DreamWeb 党建 Skills 和 Demo 测试——这些才是核心。晚上写这个网站的时候，内容虽然经过了改造和重新组织，但灵魂还是白天已经沉淀好的东西。</p>
            </div>
          </div>
          {/* 类比3: 这就是 AI 开发的模式 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">≈</div>
            <div>
              <div className="text-white font-semibold text-base mb-2">这就是 AI 开发的完整模式</div>
              <p className="text-secondary text-sm leading-relaxed">先有知识沉淀（白天写 Skills），再基于知识产出（晚上 AI 生成网站）。到时候让 AI 帮我们开发业务，也是一样的——AI 利用我们写好的 Skills，再进行开发。有了沉淀，才有产出。</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="bento-card rounded-2xl p-8 mb-12">
        <h3 className="text-white font-bold text-xl mb-8 text-center">工作重心将彻底转向</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {[
            { step: '1', label: '定义业务边界', desc: '明确什么需要 AI 做，什么不需要' },
            { step: '2', label: '制定标准规范', desc: '将开发规范文档化、结构化' },
            { step: '3', label: '梳理高频场景', desc: '固化为企业的数据资产（Skills 文档）' },
            { step: '4', label: '指引 AI 产出', desc: '最终指引 AI 为我们高效产出' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex-1 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-lg font-bold shrink-0">{item.step}</div>
                <div><div className="text-white text-base font-semibold">{item.label}</div><div className="text-secondary text-sm mt-1">{item.desc}</div></div>
              </motion.div>
              {i < 3 && <ArrowRight size={20} className="text-secondary/30 hidden md:block shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {[
          { title: '不需要重构框架', desc: 'AI 不需要懂整个框架的底层原理，它只需要具体的例子和约束。通过 Skill 体系就能让 AI 辅助开发。' },
          { title: '确定性编程是核心', desc: '框架重与否、选择什么框架其实都不重要，确定性编程（Agent 开发）才是核心。' },
          { title: '文档才是资产', desc: '代码本身已经不值钱了，值钱的是文档。文档给企业沉淀业务逻辑，给 AI 提供上下文。' },
          { title: '需要框架专家', desc: '需要对框架理解极深的人来梳理场景。一旦专家把场景沉淀为 Skill 文档，普通业务需求就可以交给 AI。' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bento-card rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-bold">{i + 1}</div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
            </div>
            <p className="text-secondary text-base leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
