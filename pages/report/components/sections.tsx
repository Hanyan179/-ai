/**
 * AI Coding 从个人使用到公司级落地 - 报告页面
 * 包含 12 个 Section 组件
 */

import { motion } from 'framer-motion';
import { 
  Layers, ArrowRight, Activity, Cpu, Server, Map, Layout, Zap, GitCommit, 
  Database, Code, ShieldAlert, BarChart, Users, User, Building2, AlertTriangle, 
  Blocks, Coins, Settings, Workflow, Network, Fingerprint, Bot, Braces, 
  Minimize2, Flag, Route, Crown, BookOpen, DatabaseZap, CheckCircle2, 
  GitCommitHorizontal, FileCode2, RefreshCw, CheckSquare, FileText, Target, 
  SplitSquareHorizontal, Search, Users2, ShieldCheck, Box
} from 'lucide-react';
import { Card, SectionHeading, FadeIn, FlowArrow } from './primitives';

// ========== Section 0: Hero ==========
export function Section0() {
  return (
    <section id="part-0" className="min-h-[80vh] flex flex-col justify-center pt-12 pb-24">
      <FadeIn>
        <div className="inline-flex items-center space-x-2 bg-zinc-100 px-3 py-1 rounded-full text-xs font-medium text-zinc-600 mb-6">
          <Activity className="w-4 h-4" />
          <span>AI 分享会展示汇报</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.15] mb-6">
          AI Coding 从个人使用
          <br className="hidden md:block" />
          <span className="text-zinc-400">到公司级落地</span>
        </h1>
        <p className="text-xl text-zinc-500 mb-12 max-w-2xl leading-relaxed">
          统一入口、快速实践与数据资产沉淀。从个人工具经验出发，切换到公司视角，形成统一治理和资产复用闭环。
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="p-8 md:p-10 bg-white">
          <h3 className="text-lg font-semibold mb-8 text-zinc-900 border-b border-zinc-100 pb-4">0. 总体结论</h3>
          <p className="text-zinc-600 mb-8 max-w-3xl leading-relaxed">
            AI Coding 在个人层面可以按偏好选择工具，但在公司层面不能只比较"哪个工具好用"。
            <br/><br/>
            <span className="font-medium text-zinc-900">公司真正需要建设的是一套可持续演进的 AI Coding 能力体系：</span>
          </p>

          <div className="flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-sm font-medium">
            <FlowItem text="统一入口" />
            <FlowArrow direction="right" className="hidden md:flex" /><FlowArrow direction="down" className="md:hidden" />
            <FlowItem text="快速实践" />
            <FlowArrow direction="right" className="hidden md:flex" /><FlowArrow direction="down" className="md:hidden" />
            <FlowItem text="资产沉淀" highlight />
            <FlowArrow direction="right" className="hidden md:flex" /><FlowArrow direction="down" className="md:hidden" />
            <FlowItem text="数据闭环" />
            <FlowArrow direction="right" className="hidden md:flex" /><FlowArrow direction="down" className="md:hidden" />
            <FlowItem text="持续复用" />
          </div>
          
          <div className="mt-10 p-4 bg-zinc-50 rounded-xl text-zinc-600 text-sm border border-zinc-100">
            <strong className="text-zinc-900">最终目标：</strong> 不是押注某一个工具，而是让公司拥有自己的上下文、流程、经验和可复用资产。
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}

function FlowItem({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <div className={`px-5 py-3 rounded-full border shrink-0 ${highlight ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-700'} shadow-sm text-center whitespace-nowrap`}>
      {text}
    </div>
  );
}

// ========== Section 1: Shift ==========
export function Section1() {
  return (
    <section id="part-1" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="从个人喜好到企业治理的核心跨越">第一部分：视角切换</SectionHeading>
      </FadeIn>

      <div className="space-y-16">
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-zinc-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-zinc-200">
                  <User className="w-5 h-5 text-zinc-600" />
                </div>
                <h3 className="text-lg font-semibold">个人使用视角</h3>
              </div>
              <ul className="space-y-4 text-zinc-600">
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 text-zinc-400 shrink-0"/><span>哪个工具顺手，就用哪个</span></li>
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 text-zinc-400 shrink-0"/><span>哪个模型效果好，就用哪个</span></li>
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 text-zinc-400 shrink-0"/><span>哪个套餐够用，就买哪个</span></li>
              </ul>
              <div className="mt-8 p-3 bg-white rounded-lg border border-zinc-200 text-sm text-center font-medium">
                个人使用没有问题 ✅
              </div>
            </Card>

            <Card className="p-8 bg-zinc-900 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <Building2 className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold">公司级视角</h3>
              </div>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 shrink-0"/><span>团队如何统一使用？</span></li>
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 shrink-0"/><span>数据与经验如何统一治理？</span></li>
                <li className="flex items-start space-x-3"><ArrowRight className="w-4 h-4 mt-1 shrink-0"/><span>资产如何持续沉淀与复用？</span></li>
              </ul>
              <div className="mt-8 p-3 bg-zinc-800 rounded-lg border border-zinc-700 text-sm text-center font-medium">
                需要统一治理与长期复用 🏗️
              </div>
            </Card>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              公司级 AI Coding 面临的 5 个主要痛点
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PainPointCard num="1" title="工具分散" icon={<Blocks/>} desc="成员使用 Cursor、Trae、Claude 等不同工具" impact="经验难复用，治理难统一" />
              <PainPointCard num="2" title="模型与套餐复杂" icon={<Coins/>} desc="不同工具绑定不同模型、套餐和额度" impact="成本、额度、效果难统一评估" />
              <PainPointCard num="3" title="能力与政策不稳定" icon={<Activity/>} desc="模型受地区限制或效果起伏" impact="公司不能押注单一模型" />
              <PainPointCard num="4" title="绑定过深" icon={<Settings/>} desc="工具只能用固定模型，易被生态锁定" impact="迁移成本极高" />
              <PainPointCard num="5" title="缺少沉淀机制" icon={<Database/>} desc="Prompt、历史任务没统一沉淀" impact="无法形成公司自身资产" className="md:col-span-2 lg:col-span-1 bg-zinc-50 border-zinc-200" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PainPointCard({ num, title, desc, impact, icon, className }: any) {
  return (
    <Card className={`p-6 hover:shadow-md transition-shadow ${className || ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
          {icon}
        </div>
        <h4 className="font-medium text-zinc-900">{num}. {title}</h4>
      </div>
      <p className="text-sm text-zinc-500 mb-4">{desc}</p>
      <div className="bg-red-50 text-red-700 text-xs py-2 px-3 rounded-md font-medium">
        影响：{impact}
      </div>
    </Card>
  )
}

// ========== Section 2: Unified ==========
export function Section2() {
  return (
    <section id="part-2" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="不要押注单一工具，建设开放的协作底座">第二部分：搭建统一入口</SectionHeading>
      </FadeIn>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <FadeIn delay={0.1}>
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Network className="w-6 h-6 text-zinc-900" />
              <h3 className="text-xl font-semibold">从分散工具到开放底座</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
                <Badge label="Cursor" />
                <Badge label="Trae" />
                <Badge label="CLI Code" />
                <Badge label="Claude Code" />
                <Badge label="不同模型/套餐" color="amber" />
              </div>

              <div className="flex justify-center w-full mb-8">
                <div className="w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
              </div>

              <div className="relative w-full max-w-md mx-auto aspect-video rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center shadow-inner overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                <div className="z-10 bg-white px-8 py-5 rounded-xl border border-zinc-200 shadow-md flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">公司统一入口</h4>
                    <p className="text-xs text-zinc-500">LobeChat 等开放底座</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                <AbilityCard icon={<Cpu/>} title="接入多模型" />
                <AbilityCard icon={<BuildingIcon/>} title="接入多厂商" />
                <AbilityCard icon={<Bot/>} title="接入多 Agent" />
                <AbilityCard icon={<DatabaseIcon/>} title="内部数据源" />
                <AbilityCard icon={<Fingerprint/>} title="权限配置" />
                <AbilityCard icon={<Braces/>} title="二次开发" />
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <Card className="p-6 bg-zinc-900 text-white">
              <h4 className="font-medium mb-2 text-zinc-100 flex items-center gap-2">
                <Minimize2 className="w-4 h-4" /> 核心结论
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                模型负责"智力"，工具负责"工程化"，平台负责"统一接入与治理"。降低切换成本，形成公司级底座。
              </p>
            </Card>

            <Card className="p-6 border-amber-200 bg-amber-50">
              <h4 className="font-medium mb-3 text-amber-900 border-b border-amber-200/50 pb-2">解决的问题</h4>
              <ul className="text-xs text-amber-800 space-y-2">
                <li>• 应对模型可用性骤变</li>
                <li>• 解除厂商生态锁定</li>
                <li>• 支持后续 Agent 平滑接入</li>
                <li>• 满足公司数据资产定制需求</li>
              </ul>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Badge({ label, color = 'zinc' }: { label: string, color?: 'zinc' | 'amber' }) {
  const colors = {
    zinc: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200'
  };
  return <div className={`px-3 py-1.5 rounded-md border text-sm font-medium ${colors[color]}`}>{label}</div>
}

function AbilityCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 bg-white shadow-sm gap-2 text-center hover:bg-zinc-50 transition-colors">
      <div className="text-zinc-600 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className="text-xs font-medium text-zinc-800">{title}</span>
    </div>
  )
}

function BuildingIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg> }
function DatabaseIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> }

// ========== Section 3: Roadmap ==========
export function Section3() {
  return (
    <section id="part-3" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="先做能见效的，再做长期治理">第三部分：AI Coding 行动路线</SectionHeading>
      </FadeIn>

      <div className="mb-12">
        <Card className="p-6 bg-zinc-50 border-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Route className="w-32 h-32" />
          </div>
          <p className="text-zinc-600 leading-relaxed relative z-10 max-w-4xl font-medium text-lg">
            "如何让 AI 理解公司的历史项目、历史代码、历史需求、复杂业务逻辑，并稳定完成二次开发。"
            <br />
            <span className="text-zinc-400 font-normal text-base mt-2 block">这并非单一工具能解决，整个行业都在探索。因此，推进必须分阶段。</span>
          </p>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FadeIn delay={0.1}>
          <PhaseCard step="01" title="第一阶段：统一入口" icon={<Flag className="w-6 h-6 text-zinc-900" />} items={["基于开源工具搭建统一入口", "接入多模型框架", "接入多厂商与内部数据"]} />
        </FadeIn>
        <FadeIn delay={0.2}>
          <PhaseCard step="02" title="第二阶段：快速见效" icon={<Zap className="w-6 h-6 text-zinc-900" />} items={["历史代码 Wiki 化与上下文图谱", "选择真实前台/小组件场景试用", "单测生成与个人 Skills 提取"]} highlight />
        </FadeIn>
        <FadeIn delay={0.3}>
          <PhaseCard step="03" title="第三阶段：长期治理" icon={<Crown className="w-6 h-6 text-zinc-900" />} items={["规范日志与代码提交结构", "沉淀全量 Git Raw 过程数据", "建立任务级知识流水线", "形成可持续复用研发资产"]} />
        </FadeIn>
      </div>
    </section>
  );
}

function PhaseCard({ step, title, items, icon, highlight }: any) {
  return (
    <Card className={`p-8 h-full flex flex-col ${highlight ? 'ring-2 ring-zinc-900 shadow-lg' : ''}`}>
      <div className="text-zinc-300 font-bold text-4xl mb-4 font-mono">{step}</div>
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
      </div>
      <ul className="space-y-4 mt-auto">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

// ========== Section 4: Actions ==========
export function Section4() {
  return (
    <section id="part-4" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="三个易落地、好验收的起步方向">第四部分：短期快速见效的操作</SectionHeading>
      </FadeIn>

      <div className="space-y-12">
        <FadeIn delay={0.1}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex justify-center items-center font-bold">1</div>
                <h3 className="text-xl font-semibold">历史代码 Wiki 化</h3>
              </div>
              <p className="text-zinc-600 mb-4 text-sm leading-relaxed">对于老平台或历史项目，短期先做代码文档化和索引化，建立<strong className="text-zinc-900">项目地图</strong>。</p>
              <div className="bg-zinc-50 p-4 rounded-xl text-sm border border-zinc-200">
                <p className="text-zinc-500 italic">"Wiki 化是建立索引，不是最终答案，但能立竿见影提升 AI 准确率。"</p>
              </div>
            </div>
            <Card className="p-6 bg-zinc-50 flex items-center justify-center overflow-x-auto">
               <div className="flex flex-col md:flex-row items-center gap-3 min-w-max text-sm">
                 <LogicBlock>Raw Code</LogicBlock>
                 <ArrowR />
                 <LogicBlock fill>第一层：文档化</LogicBlock>
                 <ArrowR />
                 <LogicBlock fill>第二层：聚合提炼</LogicBlock>
                 <ArrowR />
                 <LogicBlock fill className="border-indigo-200 bg-indigo-50 text-indigo-900">第三层：向量索引</LogicBlock>
                 <ArrowR />
                 <LogicBlock>AI 执行 (问答/修改)</LogicBlock>
               </div>
            </Card>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <Card className="p-8">
              <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 text-sm text-center">
                 <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 font-medium">真实任务 / 历史数据<br/>(Issue / Code / PR)</div>
                 <ArrowR className="hidden md:flex"/><ArrowD className="md:hidden"/>
                 <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900 text-white font-medium shadow-md">结构化沉淀<br/>+ 提炼共性</div>
                 <ArrowR className="hidden md:flex"/><ArrowD className="md:hidden"/>
                 <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 font-medium">Wiki / Skill / Agent<br/>(回到生产验证)</div>
              </div>
            </Card>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex justify-center items-center font-bold">2</div>
                <h3 className="text-xl font-semibold">先做数据规范化与资产沉淀</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">在提炼 Skills 之前，先把公司已有和正在产生的数据进行规范。Skills 不应只是个人的灵光一闪，而应来自真实的生产数据结构化。</p>
              <ul className="text-sm space-y-2 text-zinc-500 font-mono">
                <li>• 原始数据 → 可追溯</li>
                <li>• 历史记录 → 可检索</li>
                <li>• 过程沉淀 → 可复用</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex justify-center items-center font-bold">3</div>
                <h3 className="text-xl font-semibold">从轻量场景试手</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                并非所有任务直接写代码。选择边界清晰、风险可控、易验收的小任务。
              </p>
            </div>

            <Card className="p-0 overflow-hidden text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-6 py-4 font-semibold text-zinc-900">适合 AI (可以做)</th>
                    <th className="px-6 py-4 font-semibold text-zinc-900">不适合直接做</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 divide-y divide-zinc-100">
                  <tr>
                    <td className="px-6 py-4"><CheckCircle2 className="w-4 h-4 text-green-500 inline mr-2 -mt-0.5"/>输入输出清晰的组件</td>
                    <td className="px-6 py-4 text-zinc-400">需求频繁变化的任务</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4"><CheckCircle2 className="w-4 h-4 text-green-500 inline mr-2 -mt-0.5"/>不涉权限安全的边缘模块</td>
                    <td className="px-6 py-4 text-zinc-400">核心资金、安全逻辑</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4"><CheckCircle2 className="w-4 h-4 text-green-500 inline mr-2 -mt-0.5"/>容易写单测、好验收的功能</td>
                    <td className="px-6 py-4 text-zinc-400">肉眼难以验收的深层逻辑</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LogicBlock({ children, fill, className }: any) {
  return (
    <div className={`px-4 py-3 rounded-xl border font-medium ${fill ? 'bg-white shadow-sm border-zinc-200 text-zinc-900' : 'bg-transparent border-dashed border-zinc-300 text-zinc-500'} ${className || ''}`}>
      {children}
    </div>
  )
}

const ArrowR = ({className}: any) => <div className={`text-zinc-300 ${className || ''}`}>→</div>
const ArrowD = ({className}: any) => <div className={`text-zinc-300 ${className || ''}`}>↓</div>

// ========== Section 5: Data ==========
export function Section5() {
  return (
    <section id="part-5" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="长期建设——Raw 数据治理与任务资产沉淀">第五部分：数据与资产沉淀</SectionHeading>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <FadeIn delay={0.1}>
          <Card className="p-8 h-full bg-zinc-900 text-white border-zinc-800">
             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
               <FileCode2 className="w-5 h-5 text-zinc-400" />
               为何要做 Raw 数据治理？
             </h3>
             <p className="text-zinc-300 leading-relaxed max-w-sm mb-6 font-medium">
               AI 真正理解开发任务，不能只看最后的源码。它需要全生命周期的上下文。
             </p>
             <ul className="space-y-3 text-sm text-zinc-400 font-mono">
               <li>{">"} 需求产生背景是什么？</li>
               <li>{">"} 任务关联的 PR 是哪个？</li>
               <li>{">"} 开发过程踩过哪些坑？</li>
               <li>{">"} 验收是否有遗留风险？</li>
             </ul>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="p-8 h-full">
             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-zinc-900">
               <GitCommitHorizontal className="w-5 h-5 text-zinc-400" />
               Git 作为数据沉淀中枢
             </h3>
             <p className="text-zinc-600 leading-relaxed mb-6">
               文档、讨论和工具会变迁，但最终代码变更绝对落在 Git 上。强制 Git 数据结构化是核心。
             </p>
             <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                <div className="grid grid-cols-2 gap-4 text-sm font-mono text-zinc-600">
                  <div><span className="text-zinc-400">task_id</span>: PR关联</div>
                  <div><span className="text-zinc-400">domain</span>: 所属范畴</div>
                  <div><span className="text-zinc-400">type</span>: 新增/修复</div>
                  <div><span className="text-zinc-400">reason</span>: 变更依据</div>
                  <div><span className="text-zinc-400">risk</span>: 风险备注</div>
                </div>
             </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <div className="mx-auto max-w-4xl relative">
          <div className="bg-white p-8 rounded-[24px] border border-zinc-200 shadow-sm text-center">
            <h3 className="text-2xl font-semibold mb-8">任务级研发数据资产闭环</h3>
            <div className="flex flex-col items-center gap-4">
              <Step title="01. 工单/任务建档 (全局唯一 Task ID)"/>
              <ArrowD2 />
              <Step title="02. 开发与提交 (强制绑定 Task ID)"/>
              <ArrowD2 />
              <Step title="03. PR 评审 / 测试 / 上线拦截"/>
              <ArrowD2 />
              <div className="bg-zinc-900 text-white font-semibold px-8 py-4 rounded-xl shadow-md border border-zinc-800">04. 任务收尾与数据封存</div>
              <div className="flex gap-4 mt-8">
                <Tag text="Wiki 化" />
                <Tag text="向量化检索" />
                <Tag text="生成 Skill" />
                <Tag text="Agent 背景包" />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Step({title}: {title:string}) {
  return <div className="px-6 py-3 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 font-medium">{title}</div>
}

const ArrowD2 = () => <div className="h-6 w-[2px] bg-zinc-200"></div>;

function Tag({text}: {text:string}) {
  return <div className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 bg-white shadow-sm">{text}</div>
}

// ========== Section 6: Maintenance ==========
export function Section6() {
  return (
    <section id="part-6" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="代码变了，文档不更新，AI 就会出错">第六部分：代码更新后的持续维护</SectionHeading>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-8">
           <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
             <RefreshCw className="w-5 h-5 text-indigo-500" />
             代码更新不是结束，而是下一轮上下文的开始
           </h3>
           <p className="text-zinc-600 mb-8 max-w-3xl leading-relaxed">
             如果代码变了，但文档、Skill 和索引没有更新，AI 就会引用旧知识。因此，AI 知识库不能一次性建设，而要进入开发流程。
           </p>
           
           <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <div className="font-semibold text-zinc-900 border-b border-zinc-100 pb-2">持续维护对象</div>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                     <FileText className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                     <div>
                       <strong className="block text-zinc-900 text-sm">Markdown / Wiki</strong>
                       <span className="text-zinc-500 text-sm">模块职责、接口、流程、表结构</span>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <CheckSquare className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                     <div>
                       <strong className="block text-zinc-900 text-sm">业务 Skill</strong>
                       <span className="text-zinc-500 text-sm">业务流程、输入输出、风险点、验收标准</span>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <Database className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                     <div>
                       <strong className="block text-zinc-900 text-sm">索引库</strong>
                       <span className="text-zinc-500 text-sm">向量库、代码图谱、关键词索引</span>
                     </div>
                  </li>
                </ul>
             </div>
             
             <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
               <div className="font-semibold text-zinc-900 mb-4">自动化流水线设想</div>
               <div className="flex flex-col gap-2 text-sm text-zinc-600 font-mono">
                 <div>代码提交 / PR Merged</div>
                 <div className="text-zinc-300 pl-4">↓</div>
                 <div>识别影响模块与文档</div>
                 <div className="text-zinc-300 pl-4">↓</div>
                 <div>触发 AI 变更摘要生成</div>
                 <div className="text-zinc-300 pl-4">↓</div>
                 <div className="bg-white px-3 py-2 border border-zinc-300 rounded shadow-sm text-zinc-900 font-sans font-medium">人工抽样验证并更新索引</div>
               </div>
             </div>
           </div>
        </Card>
      </FadeIn>
    </section>
  );
}

// ========== Section 7: Metrics ==========
export function Section7() {
  return (
    <section id="part-7" className="py-24 border-t border-zinc-100">
      <FadeIn>
{}
        <SectionHeading subtitle="不被量化的资产，就无法被优化">第七部分：量化评估与真实使用</SectionHeading>
      </FadeIn>

      <div className="space-y-8">
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-8">
             <Card className="p-8 border-t-4 border-t-emerald-500">
               <h3 className="text-xl font-semibold mb-4 text-zinc-900">1. Skills 必须被量化</h3>
               <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                 Skill / Wiki 不是"写几篇文档"这么简单。真正有价值的 Skill，应该能被 AI 正确召回，并帮助完成真实任务。
               </p>
               <div className="grid grid-cols-2 gap-4">
                 <MetricCard title="命中率" desc="能否召回正确的 Skill" />
                 <MetricCard title="通过率" desc="AI 建议人工验证通过比" />
                 <MetricCard title="使用率" desc="每周被真实调用的次数" />
                 <MetricCard title="缺口数" desc="AI 反馈缺少哪些信息" />
               </div>
             </Card>

             <Card className="p-8 bg-zinc-900 text-white">
               <h3 className="text-xl font-semibold mb-4">2. Raw 数据 vs. Skill 量化</h3>
               <p className="text-zinc-300 text-sm leading-relaxed mb-8">
                 两者结合，才能形成可持续迭代的 AI Coding 体系。
               </p>
               <div className="flex flex-col gap-4 text-sm">
                 <div className="flex flex-col">
                   <span className="text-zinc-400 font-mono mb-1">Raw 数据治理</span>
                   <span className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">解决 <strong className="text-emerald-400">"源头是否干净"</strong></span>
                 </div>
                 <div className="flex justify-center"><Activity className="w-4 h-4 text-zinc-600"/></div>
                 <div className="flex flex-col">
                   <span className="text-zinc-400 font-mono mb-1">Skill 量化</span>
                   <span className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">解决 <strong className="text-blue-400">"结果是否有效"</strong></span>
                 </div>
               </div>
             </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MetricCard({title, desc}: {title:string, desc:string}) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-lg">
      <div className="font-semibold text-zinc-900 text-sm">{title}</div>
      <div className="text-xs text-zinc-500 mt-1">{desc}</div>
    </div>
  )
}

// ========== Section 8: Router ==========
export function Section8() {
  return (
    <section id="part-8" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="资产变多后的解惑：我该找谁？用什么工具？">第八部分：索引层 Agent (资产路由)</SectionHeading>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <Card className="p-8 bg-indigo-50 border-indigo-100 max-w-3xl">
          <h3 className="text-xl font-semibold mb-6 text-indigo-900 flex items-center gap-2">
            <Search className="w-5 h-5" />
            资产路由发现
          </h3>
          <p className="text-indigo-800 leading-relaxed mb-6 font-medium text-sm">
            当沉淀了大量 Wiki 和 Skill，需要避免"找不到"。索引层专门用于根据意图精准召回可用资源。
          </p>
          <ul className="space-y-3 text-indigo-700 text-sm mb-6">
             <li className="flex gap-2"><span>•</span> 检索 Wiki 与文档</li>
             <li className="flex gap-2"><span>•</span> 检索适用 Skill</li>
             <li className="flex gap-2"><span>•</span> 检索历史案例与代码片段</li>
             <li className="flex gap-2"><span>•</span> 检索 MCP 工具与模块负责人</li>
          </ul>
          <div className="bg-white/60 p-4 rounded-xl border border-indigo-200/50 text-xs font-semibold text-indigo-900">
            目标与输出：这不是普通的知识库问答，这叫资产路由（找到最合适的执行路径和关联上下文）。
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}

// ========== Section 9: Tech ==========
export function Section9() {
  return (
    <section id="part-9" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="建设持久化的项目知识路由层">第九部分：数据规范化的技术实现方向</SectionHeading>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <Card className="p-8 max-w-3xl">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-zinc-500" />
            本地开发记忆的数据链路 (Agentic Orchestrator)
          </h3>
          <p className="text-zinc-600 leading-relaxed mb-6 text-sm">
            当前大模型拿到的上下文往往是临时拼凑的。为了真正实现公司的技术资产沉淀，需要将 Git、过程日志等留存至个人或团队数据库。
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm font-medium">
            <AgentBlock name="Repo Agent" desc="读取文件树、Git状态与代码图谱" />
            <AgentBlock name="Task Agent" desc="管理需求与过程日志，强绑定任务ID" />
            <AgentBlock name="Skill Agent" desc="从完成任务中提炼代码与经验共性" />
            <AgentBlock name="Routing Agent" desc="根据当前情形组装最小可用上下文" />
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
             <span className="text-sm font-semibold text-zinc-800">目标：向 IDE / Agent 提供准确上下文补丁，而非无边界的全部源码。</span>
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}

function AgentBlock({name, desc}: {name: string, desc: string}) {
  return (
    <div className="border border-zinc-200 bg-zinc-50 rounded-lg p-4">
      <div className="font-semibold text-zinc-900 mb-2">{name}</div>
      <div className="text-zinc-600 text-xs leading-relaxed">{desc}</div>
    </div>
  )
}

// ========== Section 10: Team ==========
export function Section10() {
  return (
    <section id="part-10" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="AI 时代的小团队：专业角色清晰，人人皆可是全能兵">第十部分：数据资产沉淀后的团队协作</SectionHeading>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
               <Users2 className="w-5 h-5 text-zinc-900" />
               协作模式的改变
             </h3>
             <ul className="space-y-4 text-zinc-600 mb-8">
               <li className="flex gap-3">
                 <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                 <span><strong className="text-zinc-900">人少而精：</strong> 一个更适合 AI 时代的小团队，不一定是大而全。</span>
               </li>
               <li className="flex gap-3">
                 <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                 <span><strong className="text-zinc-900">全员 AI 化：</strong> 每个人都掌握基础 AI 使用能力，围绕具体问题快速驻场解决。</span>
               </li>
               <li className="flex gap-3">
                 <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                 <span><strong className="text-zinc-900">资产责任制：</strong> 每个人负责自己的专业资产（产品需求库、UI 组件库、API 接口等）。</span>
               </li>
             </ul>
             
             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm font-medium">
                当每个能力点都资产化后（含输入、输出、限制、示例），任何人都可以通过 AI 调用该能力。
             </div>
          </div>
          
          <Card className="p-6 bg-zinc-50 flex items-center justify-center">
            <div className="space-y-6 w-full max-w-sm">
               <div className="bg-zinc-900 text-white rounded-lg p-3 text-center font-medium shadow-md">
                 项目需求起点
               </div>
               <div className="flex justify-between px-8 text-zinc-300">
                 <span>↓</span><span>↓</span><span>↓</span>
               </div>
               <div className="grid grid-cols-3 gap-3">
                 <ServiceBlock text="大前端 / UI" />
                 <ServiceBlock text="后端设施" />
                 <ServiceBlock text="专项 OCR" />
               </div>
               <div className="flex justify-between px-8 text-zinc-300">
                 <span>↓</span><span>↓</span><span>↓</span>
               </div>
               <div className="bg-white border-2 border-zinc-200 text-zinc-900 rounded-lg p-3 text-center font-bold shadow-md">
                 项目产出
               </div>
            </div>
          </Card>
        </div>
      </FadeIn>
    </section>
  );
}

function ServiceBlock({text}: {text:string}) {
  return (
    <div className="bg-white border border-zinc-200 p-2 text-center rounded-lg shadow-sm">
      <Box className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
      <span className="text-xs font-semibold text-zinc-700">{text}</span>
    </div>
  )
}

// ========== Section 11: Final ==========
export function Section11() {
  return (
    <section id="part-11" className="py-24 border-t border-zinc-100">
      <FadeIn>
        <SectionHeading subtitle="六步实现路径，构建可持续增强体系">总结：公司级 AI Coding 闭环总图</SectionHeading>
      </FadeIn>

      <FadeIn delay={0.1}>
         <Card className="p-0 overflow-hidden bg-zinc-900 text-white border-zinc-800 shadow-xl">
           <div className="p-8 md:p-12">
             <h3 className="text-2xl font-bold mb-10 text-center tracking-tight">AI Coding 落地核心六步</h3>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
               <FinalStep num="1" title="统一入口" desc="解决工具/模型分散与平台绑定" />
               <FinalStep num="2" title="快速实践" desc="前台小任务、单测与PR总结验证" />
               <FinalStep num="3" title="资产沉淀" desc="代码Wiki化，个人经验组织化" />
               <FinalStep num="4" title="数据治理" desc="从源头规范流水与Git联动关联" />
               <FinalStep num="5" title="量化与抽样" desc="验证Skill命中率、通过率、人工修正比" />
               <FinalStep num="6" title="路由聚合" desc="让下一环节快速找对资产" />
             </div>
             
             <div className="mt-16 text-center border-t border-zinc-800 pt-8">
               <p className="text-xl md:text-2xl font-medium text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                 "AI Coding 的落地，不是比拼选择某一个工具，而是建设一套 <span className="text-white font-bold border-b-2 border-white">统一入口 + 快速实践 + 数据治理 + 资产复用</span> 的持续增强体系。"
               </p>
             </div>
           </div>
         </Card>
      </FadeIn>
    </section>
  );
}

function FinalStep({num, title, desc}: {num: string, title: string, desc: string}) {
  return (
    <div className="p-6 rounded-[16px] bg-zinc-800/50 border border-zinc-700/50">
      <div className="text-zinc-500 font-mono text-sm mb-3">STEP {num}</div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
