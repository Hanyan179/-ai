import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  FileSearch,
  GitBranch,
  Handshake,
  LineChart,
  Network,
  Puzzle,
  Radar,
  Route,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type React from 'react';

const marketSignals = [
  {
    label: 'OpenAI DeployCo',
    value: '2026',
    text: '把工程师嵌入客户组织，连接模型、数据、工具、控制与业务流程。',
    href: 'https://openai.com/index/openai-launches-the-deployment-company/',
  },
  {
    label: 'Anthropic Enterprise AI',
    value: 'Services',
    text: '围绕客户工作流构建方案，证明模型公司开始向落地服务延伸。',
    href: 'https://www.anthropic.com/news/enterprise-ai-services-company?pubDate=20260225',
  },
];

const funnelSteps = [
  { title: '模型能力', desc: '推理、多模态、工具调用', width: '100%' },
  { title: '客户数据', desc: '权限、质量、上下文、历史记录', width: '86%' },
  { title: '业务流程', desc: '审批、例外、责任边界', width: '72%' },
  { title: 'Eval 标准', desc: '真实数据上的通过率与失败样本', width: '58%' },
  { title: '生产落地', desc: '可监控、可迭代、可复用', width: '44%' },
];

const roleRows = [
  ['后端工程师', '把系统做稳、把数据接口打通', '如果不懂业务现场，容易只交付功能，不交付结果', '补客户现场和 Eval 闭环'],
  ['售前', '把方案讲清楚、推动客户决策', '如果不能跑真实数据，方案会停在演示层', '补 Agent 原型和真实验证'],
  ['产品经理', '把需求抽象成流程和优先级', '如果只写 PRD，不懂模型边界，需求无法变成稳定 AI 行为', '补 Prompt/RAG/Eval 判断'],
  ['咨询顾问', '把复杂问题框架化、组织化', '如果不能落成系统，洞察无法持续进入业务流程', '补工程化和 AI 实作'],
  ['AI FDE', '懂 AI 的边界，也懂业务的现场', '稀缺点是把两端结合起来，不是单独会写代码或会写 PRD', '以真实业务分数交付'],
];

const modelSkills = ['Prompt', 'Agent', 'RAG', 'Eval', '错误模式', '上下文工程'];
const businessSkills = ['现场访谈', '流程拆解', '隐性经验', 'ROI 判断', '权限边界', '组织协同'];
const bridgeSkills = ['指令化', '工具化', '评估集', '上线流程'];

const roleEvolution = [
  {
    role: '后端工程师',
    base: '系统稳定性 / 数据接口 / 权限边界',
    ai: 'AI 辅助开发、Eval 基建、数据治理',
    business: '从“功能交付”走向“业务结果可验证”',
  },
  {
    role: '售前',
    base: '客户沟通 / 方案表达 / 商机推进',
    ai: '快速原型、Agent Demo、真实数据试跑',
    business: '从“讲清方案”走向“现场跑通价值”',
  },
  {
    role: '产品经理',
    base: '需求抽象 / 流程梳理 / 优先级判断',
    ai: 'Prompt/RAG 边界、Agent 工作流、评估口径',
    business: '从“写 PRD”走向“定义可执行 AI 行为”',
  },
  {
    role: '咨询顾问',
    base: '问题框架 / 组织访谈 / 行业洞察',
    ai: '把方法论转成 Agent 流程和评估集',
    business: '从“输出洞察”走向“持续进入业务系统”',
  },
];

const roleBridgeSources = [
  {
    role: '后端工程师',
    core: '系统、数据、权限',
    gap: '从功能可用走向结果可验',
    icon: Code2,
  },
  {
    role: '售前',
    core: '客户、方案、推进',
    gap: '从讲清方案走向现场跑通',
    icon: Handshake,
  },
  {
    role: '产品经理',
    core: '需求、流程、优先级',
    gap: '从 PRD 走向 AI 行为定义',
    icon: FileSearch,
  },
  {
    role: '咨询顾问',
    core: '框架、访谈、行业洞察',
    gap: '从输出洞察走向系统沉淀',
    icon: BriefcaseBusiness,
  },
];

const fdeTranslationArtifacts = ['现场任务', 'Agent 指令', '工具权限', 'Eval 样本'];

const businessLoopOutputs = [
  { label: '真实数据试跑', icon: Database },
  { label: '业务流程嵌入', icon: Workflow },
  { label: 'Eval 分数提升', icon: LineChart },
  { label: '生产系统复用', icon: Target },
];

const aiBusinessMatrix = [
  {
    title: '低 AI / 低业务',
    tag: '被替代区',
    desc: '只能执行标准任务，既不能判断模型，也不能理解真实场景。',
    tone: 'bg-zinc-100 border-zinc-200',
  },
  {
    title: '高 AI / 低业务',
    tag: 'Demo 区',
    desc: '能做炫目的原型，但容易脱离客户流程、权限和真实数据。',
    tone: 'bg-blue-50 border-blue-200',
  },
  {
    title: '低 AI / 高业务',
    tag: '经验孤岛',
    desc: '懂现场，但经验停在人脑和工位上，无法被 Agent 规模化复用。',
    tone: 'bg-amber-50 border-amber-200',
  },
  {
    title: '高 AI / 高业务',
    tag: 'FDE 方向',
    desc: '把模型能力和业务现场结合，形成可执行、可评估、可迭代的闭环。',
    tone: 'bg-emerald-50 border-emerald-200',
  },
];

const fdeCompare = [
  ['交付对象', '一套业务应用或数据系统', '一个可评估、可迭代的 AI 工作流'],
  ['核心技术', 'SQL、Python、数据管道、业务建模', 'Prompt、Agent、RAG、Eval、上下文工程'],
  ['典型周期', '3 至 12 个月完成业务应用交付', '2 至 6 周完成 POC 或关键闭环验证'],
  ['代码占比', '工程实现占比高', '大量时间花在业务抽取、评估与迭代'],
  ['验收标准', '系统上线、流程可用、指标稳定', '客户真实数据上的 Eval 分数持续提升'],
];

const loopSteps = [
  ['01', '进入客户现场', '靠近真实用户、数据、流程和例外情况。'],
  ['02', '抽取隐性经验', '把专家判断、操作习惯和失败案例显性化。'],
  ['03', '转成 Agent 指令', '沉淀 Prompt、Workflow、工具调用和权限边界。'],
  ['04', '建立 Golden Dataset', '用真实样本定义什么叫做“做对了”。'],
  ['05', 'Eval 驱动迭代', '用分数、失败样本和回归测试推动改进。'],
  ['06', '交付生产系统', '形成可监控、可复用、可升级的业务能力。'],
];

const impactCards = [
  {
    role: '后端工程师',
    shock: '只会把功能做出来，可能无法解释它对业务效率有没有提升。',
    upgrade: '向复杂系统边界、数据治理、Eval 基建和客户现场升级。',
    icon: Code2,
  },
  {
    role: '售前',
    shock: '只讲方案不够，客户要求现场跑出真实结果。',
    upgrade: '掌握快速原型、Agent 演示和真实数据验证。',
    icon: Handshake,
  },
  {
    role: '产品经理',
    shock: 'PRD 不再是终点，需求必须转成 Agent 能稳定执行的工作流。',
    upgrade: '补 Prompt/RAG/Eval 能力，直接定义 AI 行为边界。',
    icon: FileSearch,
  },
  {
    role: '咨询顾问',
    shock: '框架和 PPT 价值下降，客户更看重可运行闭环。',
    upgrade: '把诊断方法变成 Agent 流程和可复用评估集。',
    icon: BriefcaseBusiness,
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-8 border-b border-[#111111]/12 pb-6">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">{kicker}</div>
      <h2 className="text-3xl font-semibold tracking-normal text-[#111111] md:text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[#555555]">{desc}</p>
    </div>
  );
}

function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`border border-[#111111]/12 bg-white/55 p-5 md:p-6 ${className}`}>{children}</div>;
}

function SignalCard({ signal }: { signal: (typeof marketSignals)[number] }) {
  const content = (
    <Panel className="h-full transition-colors hover:bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#777777]">{signal.label}</div>
        {signal.href && <ArrowRight className="mt-0.5 h-4 w-4 text-[#777777]" />}
      </div>
      <div className="mt-6 text-4xl font-semibold tracking-normal text-[#111111]">{signal.value}</div>
      <p className="mt-4 text-sm leading-6 text-[#555555]">{signal.text}</p>
    </Panel>
  );

  if (!signal.href) return content;
  return (
    <a href={signal.href} target="_blank" rel="noreferrer" className="block h-full">
      {content}
    </a>
  );
}

function LastMileFunnel() {
  return (
    <Panel className="bg-[#f4f1e8]">
      <div className="mb-6 flex items-center gap-3">
        <Route className="h-5 w-5 text-[#111111]" />
        <h3 className="text-xl font-semibold text-[#111111]">AI 最后一公里漏斗</h3>
      </div>
      <div className="space-y-3">
        {funnelSteps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <div
              className="border border-[#111111]/12 bg-white px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              style={{ width: step.width }}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-base font-semibold text-[#111111]">{step.title}</div>
                <div className="text-sm text-[#666666]">{step.desc}</div>
              </div>
            </div>
            {index < funnelSteps.length - 1 && <div className="h-4 w-px bg-[#111111]/20" />}
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-[#111111]/12 pt-4 text-sm leading-6 text-[#555555]">
        FDE 的价值不在漏斗顶部“模型更聪明”，而在漏斗底部把客户数据、流程、权限和评估串成可运行系统。
      </p>
    </Panel>
  );
}

function RealPainBlock() {
  return (
    <Panel className="bg-white">
      <div className="mb-6 flex items-center gap-3">
        <Database className="h-5 w-5 text-[#111111]" />
        <h3 className="text-xl font-semibold text-[#111111]">真实痛点：脑子、数据和人没有连起来</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['人在工位上干活', '经验藏在操作习惯、判断口径、临时沟通和例外处理里。'],
          ['数据在系统中吃灰', '业务系统记录了大量事实，但没有变成实时决策和执行能力。'],
          ['大模型只是个脑子', '模型能推理，但如果没有业务上下文和执行闭环，效率不会自然提高。'],
        ].map(([title, desc]) => (
          <div key={title} className="border border-[#111111]/10 bg-[#f7f7f4] p-4">
            <div className="font-semibold text-[#111111]">{title}</div>
            <p className="mt-3 text-sm leading-6 text-[#555555]">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border-l-2 border-[#111111] pl-4 text-sm leading-7 text-[#333333]">
        所以问题不是“懂 AI 的人重要，还是懂业务的人重要”，而是组织需要一种新角色，把 AI 的能力边界和业务的真实现场完全结合到一起。
      </div>
    </Panel>
  );
}

function DisconnectMap() {
  return (
    <Panel className="bg-[#f8f8f5]">
      <div className="mb-6 flex items-center gap-3">
        <Network className="h-5 w-5 text-[#111111]" />
        <h3 className="text-xl font-semibold text-[#111111]">断裂在哪里：人、数据、大模型没有形成闭环</h3>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_120px_1fr_120px_1fr] lg:items-center">
        {[
          ['人', '现场经验', '判断口径、例外处理、临时沟通都在工位上发生。'],
          ['数据', '系统沉睡', '数据被记录下来，但没有持续进入决策和执行。'],
          ['模型', '外置大脑', '模型有推理能力，但缺上下文、工具和评估标准。'],
        ].map(([node, title, desc], index) => (
          <div key={node} className="border border-[#111111]/12 bg-white p-5 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#111111] text-xl font-semibold">
              {node}
            </div>
            <div className="text-lg font-semibold text-[#111111]">{title}</div>
            <p className="mt-3 text-sm leading-6 text-[#555555]">{desc}</p>
            {index < 2 && <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-red-700 lg:hidden">断开</div>}
          </div>
        )).flatMap((item, index) => {
          if (index === 2) return [item];
          return [
            item,
            <div key={`gap-${index}`} className="hidden items-center justify-center lg:flex">
              <div className="border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800">断开</div>
            </div>,
          ];
        })}
      </div>
      <div className="mt-5 border border-[#111111] bg-[#111111] p-4 text-sm leading-7 text-white">
        FDE/AI 落地小队的作用，是把这三件事接起来：把人的经验结构化，把系统数据激活，把模型变成可执行业务流程。
      </div>
    </Panel>
  );
}

function AiBusinessMatrix() {
  return (
    <Panel>
      <div className="mb-6 flex items-center gap-3">
        <Bot className="h-5 w-5 text-[#111111]" />
        <h3 className="text-xl font-semibold text-[#111111]">懂 AI 重要，还是懂业务重要？</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {aiBusinessMatrix.map(item => (
          <div key={item.title} className={`border p-5 ${item.tone}`}>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#777777]">{item.tag}</div>
            <div className="text-lg font-semibold text-[#111111]">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-[#555555]">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border-l-2 border-[#111111] pl-4 text-sm leading-7 text-[#333333]">
        结论不是二选一。AI FDE 代表的是“懂 AI 的人向业务现场下沉，懂业务的人向 AI 执行系统升级”。
      </div>
    </Panel>
  );
}

function RoleEvolutionMap() {
  return (
    <Panel>
      <div className="mb-6 flex items-center gap-3">
        <Puzzle className="h-5 w-5 text-[#111111]" />
        <h3 className="text-xl font-semibold text-[#111111]">从岗位拼盘到业务闭环：AI FDE 是转译层</h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_90px_1.05fr_90px_1fr] lg:items-stretch">
        <div className="border border-[#111111]/12 bg-[#fbfbf7] p-4">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#777777]">传统岗位资产</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {roleBridgeSources.map(({ role, core, gap, icon: Icon }) => (
              <div key={role} className="border border-[#111111]/10 bg-white p-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#111111]" />
                  <div className="font-semibold text-[#111111]">{role}</div>
                </div>
                <div className="mt-3 text-sm text-[#555555]">{core}</div>
                <div className="mt-2 text-xs leading-5 text-[#777777]">{gap}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="hidden h-7 w-7 text-[#999999] lg:block" />
          <div className="h-8 w-px bg-[#111111]/20 lg:hidden" />
        </div>

        <div className="border border-[#111111] bg-[#111111] p-5 text-white lg:self-center">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52">AI FDE</div>
              <div className="mt-2 text-2xl font-semibold">转译层</div>
            </div>
            <Bot className="h-7 w-7 text-white/80" />
          </div>
          <p className="text-sm leading-7 text-white/74">
            不是把四个岗位揉成一个全能人，而是把现场语言、系统语言和模型语言互相翻译，沉淀成可执行、可评估、可上线的交付物。
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {fdeTranslationArtifacts.map(item => (
              <div key={item} className="border border-white/16 bg-white/8 px-3 py-2 text-center text-sm font-medium text-white/88">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="hidden h-7 w-7 text-[#999999] lg:block" />
          <div className="h-8 w-px bg-[#111111]/20 lg:hidden" />
        </div>

        <div className="border border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">业务闭环结果</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {businessLoopOutputs.map(({ label, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-3 border border-emerald-200 bg-white px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-900">
                  {index + 1}
                </div>
                <Icon className="h-5 w-5 text-emerald-800" />
                <div className="font-semibold text-[#111111]">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-l-2 border-emerald-700 pl-3 text-sm leading-6 text-emerald-950">
            能讲通的关键不是“谁最像 FDE”，而是“谁能把真实业务跑成分数持续变好的系统”。
          </div>
        </div>
      </div>
    </Panel>
  );
}

function DumbbellModel() {
  return (
    <Panel className="bg-[#f8f8f5]">
      <div className="grid gap-6 lg:grid-cols-[1fr_180px_1fr] lg:items-center">
        <div className="border border-[#111111]/12 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#111111]">
            <Bot className="h-5 w-5" />
            模型直觉
          </div>
          <div className="flex flex-wrap gap-2">
            {modelSkills.map(skill => (
              <span key={skill} className="border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-900">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="h-px w-full bg-[#111111]/20 lg:h-20 lg:w-px" />
          <div className="border border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white">
            系统化表达
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {bridgeSkills.map(skill => (
              <span key={skill} className="text-xs text-[#555555]">{skill}</span>
            ))}
          </div>
          <div className="h-px w-full bg-[#111111]/20 lg:h-20 lg:w-px" />
        </div>
        <div className="border border-[#111111]/12 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#111111]">
            <Building2 className="h-5 w-5" />
            业务理解
          </div>
          <div className="flex flex-wrap gap-2">
            {businessSkills.map(skill => (
              <span key={skill} className="border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-900">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function EvalLoop() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loopSteps.map(([num, title, desc], index) => (
        <Panel key={num} className="relative min-h-[180px] bg-white">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-4xl font-semibold text-[#111111]">{num}</div>
            {index < loopSteps.length - 1 ? (
              <ArrowRight className="h-5 w-5 text-[#999999]" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-[#111111]">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#555555]">{desc}</p>
        </Panel>
      ))}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto border border-[#111111]/12 bg-white/60">
      <table className="min-w-[760px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#111111]/12 bg-[#f2f2ee] text-[#111111]">
            <th className="px-4 py-4 font-semibold">维度</th>
            <th className="px-4 py-4 font-semibold">传统 FDE</th>
            <th className="px-4 py-4 font-semibold">AI FDE</th>
          </tr>
        </thead>
        <tbody>
          {fdeCompare.map(([dim, oldValue, newValue]) => (
            <tr key={dim} className="border-b border-[#111111]/8 last:border-b-0">
              <td className="px-4 py-4 font-semibold text-[#111111]">{dim}</td>
              <td className="px-4 py-4 leading-6 text-[#555555]">{oldValue}</td>
              <td className="px-4 py-4 leading-6 text-[#111111]">{newValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleTable() {
  return (
    <div className="overflow-x-auto border border-[#111111]/12 bg-white/60">
      <table className="min-w-[900px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#111111]/12 bg-[#f2f2ee] text-[#111111]">
            <th className="px-4 py-4 font-semibold">岗位</th>
            <th className="px-4 py-4 font-semibold">原有强项</th>
            <th className="px-4 py-4 font-semibold">AI 时代缺口</th>
            <th className="px-4 py-4 font-semibold">升级方向</th>
          </tr>
        </thead>
        <tbody>
          {roleRows.map(([role, strength, gap, upgrade]) => (
            <tr key={role} className="border-b border-[#111111]/8 last:border-b-0">
              <td className="px-4 py-4 font-semibold text-[#111111]">{role}</td>
              <td className="px-4 py-4 leading-6 text-[#555555]">{strength}</td>
              <td className="px-4 py-4 leading-6 text-[#555555]">{gap}</td>
              <td className="px-4 py-4 leading-6 text-[#111111]">{upgrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FdeReportPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#111111]">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <FadeIn>
          <div className="border-b border-[#111111]/15 pb-10">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">
              <span>AI Career Shift</span>
              <span className="h-px w-8 bg-[#111111]/20" />
              <span>2026.05.17</span>
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.08] tracking-normal text-[#111111] md:text-6xl">
              AI 最后一公里：
              <span className="block text-[#5f5f5f]">未来世界需要 Forward Deployed Engineer</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
              不是多一个售前，也不是多一个工程师，而是把客户现场的隐性经验转成 Agent 可执行系统的人。AI FDE 的价值在于让真实业务跑通，而不是让 Demo 看起来聪明。
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {marketSignals.map((signal, index) => (
            <FadeIn key={signal.label} delay={index * 0.06}>
              <SignalCard signal={signal} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="01 / Why Now"
            title="从卖模型到跑业务，瓶颈正在后移"
            desc="现实里常见的问题是：人在工位上干活，数据在系统中吃灰，大模型像一个外置大脑，但组织效率没有自动提高。"
          />
        </FadeIn>
        <FadeIn>
          <RealPainBlock />
        </FadeIn>
        <div className="mt-6">
          <FadeIn>
            <DisconnectMap />
          </FadeIn>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <FadeIn>
            <LastMileFunnel />
          </FadeIn>
          <FadeIn delay={0.08}>
            <Panel className="h-full bg-white text-[#111111]">
              <Sparkles className="mb-8 h-6 w-6 text-[#111111]" />
              <div className="text-2xl font-semibold leading-snug">FDE 是模型公司进入客户真实业务的接口。</div>
              <p className="mt-6 text-sm leading-7 text-[#555555]">
                企业购买模型只是开始。真正困难的是把专家经验、历史数据、审批规则、异常处理和评估标准放进一个可运行系统里，并在真实业务中持续变好。
              </p>
              <div className="mt-8 border-t border-[#111111]/12 pt-5 text-sm font-medium text-[#111111]">
                结论：AI 落地的最后一公里不是 API 调通，而是业务闭环跑通。
              </div>
            </Panel>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="02 / Definition"
            title="AI FDE 是深入客户现场的系统化工程师"
            desc="它不是传统售前、产品经理或后端工程师的简单改名，而是把现场问题变成可执行、可评估、可部署 AI 系统的复合岗位。"
          />
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Users, title: '进入现场', desc: '理解客户真实工作流、责任边界、异常情况和组织阻力。' },
            { icon: Workflow, title: '系统化问题', desc: '把隐性经验拆成任务、工具、数据、权限和判断标准。' },
            { icon: BarChart3, title: '用 Eval 交付', desc: '不以演示通过为准，而以客户真实数据上的效果分数为准。' },
          ].map(({ icon: Icon, title, desc }) => (
            <FadeIn key={title}>
              <Panel className="h-full">
                <Icon className="mb-8 h-6 w-6 text-[#111111]" />
                <h3 className="text-xl font-semibold text-[#111111]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#555555]">{desc}</p>
              </Panel>
            </FadeIn>
          ))}
        </div>
        <div className="mt-6">
          <ComparisonTable />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="03 / Role Intersection"
            title="不是让 FDE 一个人全能，而是让传统岗位都向业务闭环靠拢"
            desc="后端、售前、产品、咨询都有自己的原始能力。AI 时代的变化是：每个岗位都要在原始能力上叠加 AI，并理解其他环节如何共同跑通业务。"
          />
        </FadeIn>
        <FadeIn>
          <RoleEvolutionMap />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="04 / Capability Model"
            title="AI FDE 的哑铃能力：模型直觉 + 业务理解"
            desc="真正稀缺的是两端都能拉起来的人：既知道模型为什么会错，也知道客户为什么不能改流程。"
          />
        </FadeIn>
        <FadeIn>
          <DumbbellModel />
        </FadeIn>
        <div className="mt-6">
          <FadeIn>
            <AiBusinessMatrix />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="05 / Eval Driven Delivery"
            title="工作模式变化：把经验转成 Agent 可执行闭环"
            desc="AI FDE 的核心工作不是多写代码或多写 PRD，而是把人类专家的判断过程沉淀为 Prompt、工具、数据集、评估标准和上线机制。"
          />
        </FadeIn>
        <FadeIn>
          <EvalLoop />
        </FadeIn>
        <FadeIn delay={0.08}>
          <Panel className="mt-6 bg-[#111111] text-white">
            <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                Eval 分数
              </div>
              <p className="text-sm leading-7 text-white/74">
                交付不是“客户看了觉得像那么回事”，而是在客户真实数据、真实流程、真实边界条件下，持续提高通过率并降低失败成本。
              </p>
            </div>
          </Panel>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <FadeIn>
          <SectionTitle
            kicker="06 / Organization Response"
            title="组织不应只买模型，而要建设 AI 落地小队"
            desc="管理者需要识别岗位边界被重塑后的新能力组合：谁能进入现场，谁能系统化问题，谁能用 Eval 证明业务闭环。"
          />
        </FadeIn>
        <div className="grid gap-4 md:grid-cols-2">
          {impactCards.map(({ role, shock, upgrade, icon: Icon }) => (
            <FadeIn key={role}>
              <Panel className="h-full">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#111111]/12 bg-[#f2f2ee]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111111]">{role}</h3>
                </div>
                <div className="space-y-4 text-sm leading-7">
                  <p className="text-[#555555]"><span className="font-semibold text-[#111111]">冲击：</span>{shock}</p>
                  <p className="text-[#555555]"><span className="font-semibold text-[#111111]">提升：</span>{upgrade}</p>
                </div>
              </Panel>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.08}>
          <div className="mt-6 grid gap-5 border-y border-[#111111]/15 py-8 md:grid-cols-3">
            {[
              { icon: Database, title: '拆公开 Prompt', desc: '理解模型输入、边界条件和失败模式。' },
              { icon: Radar, title: '搭 Eval 闭环', desc: '用样本、指标和回归测试建立模型直觉。' },
              { icon: Network, title: '做 3 单真实业务', desc: '接触陌生行业客户，补齐业务理解。' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#111111]" />
                <div>
                  <div className="font-semibold text-[#111111]">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-[#555555]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8 md:pb-32">
        <FadeIn>
          <div className="border border-[#111111] bg-[#111111] p-7 text-white md:p-10">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              <GitBranch className="h-5 w-5" />
              Final View
            </div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal md:text-5xl">
              FDE 不是岗位包装，而是 AI 时代企业落地能力的最早显形。
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/74">
              未来组织需要的人，不只是会调用模型的人，而是能进入现场、抽象真实问题、建立 Eval、持续把业务跑通的人。
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {['深入客户现场', '真实问题系统化', 'Agent 可执行', 'Eval 驱动交付'].map(item => (
                <span key={item} className="border border-white/20 px-3 py-2 text-white/82">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
