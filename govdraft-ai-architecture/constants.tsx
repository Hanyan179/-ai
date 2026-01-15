import { 
  Server,
  Network,
  Cpu, 
  Database, 
  Container, 
  Code2, 
  ShieldCheck,
  Landmark,
  BrainCircuit,
  Gavel,
  MousePointerClick,
  UserCog,
  ScanEye,
  GraduationCap
} from "lucide-react";
import { SystemModule, ComparisonPoint } from "./types";

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: "layer-entry",
    title: "固定业务入口",
    technicalLabel: "Context Gateway",
    type: 'input',
    icon: MousePointerClick,
    userSummary: "用户无需纠结业务逻辑，只需发起“写文”或“改文”动作。系统作为固定入口，自动响应行为并唤醒政务工作流。",
    ioShape: { input: "用户动作", output: "Context ID" },
    latency: "< 15ms",
    techStack: ["Event Driven", "FSM"],
    techNote: "基础技术：Event Driven 架构与 Finite State Machine。通过 Context Engineering 技术，在会话初始化阶段自动注入鉴权信息，实现无状态的 Cold Start。",
    pipeline: [
      { id: "p1", name: "动作捕获", tech: "Trigger", desc: "捕获用户上传或输入行为，无需手动选单" },
      { id: "p2", name: "场景唤醒", tech: "Init", desc: "自动挂载政务业务配置，屏蔽通用闲聊干扰" },
      { id: "p3", name: "资源就绪", tech: "Loader", desc: "预加载该用户权限下的知识库连接" }
    ]
  },
  {
    id: "layer-fusion",
    title: "指令与素材融合",
    technicalLabel: "Fusion Engine",
    type: 'router',
    icon: BrainCircuit,
    userSummary: "输入不仅是分类。系统将用户的“显性指令”与上传文档的“全量内容”深度融合，解析出“基于什么材料做什么事”。",
    ioShape: { input: "Text & File Stream", output: "Intent Vector" },
    latency: "~ 180ms",
    techStack: ["Cross Attention", "Multimodal"],
    techNote: "基础技术：Multimodal Encoder 与 Cross Attention 机制。通过语义对齐算法计算关联权重，解决多源异构数据的意图消歧。",
    pipeline: [
      { id: "r1", name: "双流摄入", tech: "Ingestion", desc: "平行接收用户口语指令与参考文档流" },
      { id: "r2", name: "语义化学反应", tech: "Inference", desc: "分析指令如何作用于文档，建立操作映射" },
      { id: "r3", name: "任务提取", tech: "Intent", desc: "提取出具体且完整的写作任务定义" }
    ]
  },
  {
    id: "engine-role",
    title: "基础角色设定",
    technicalLabel: "Role Agent",
    type: 'processor',
    icon: UserCog,
    userSummary: "确立“资深政务文书专家”基准身份。在此环节预设输入处理优先级，并锁死版式规范及缺项处理原则。",
    ioShape: { input: "Intent", output: "Role Context" },
    latency: "< 10ms",
    techStack: ["System Prompt", "Decision Tree"],
    techNote: "基础技术：Meta Prompt Engineering 与 CSP 算法。通过系统级指令注入确立 Role Boundary，将 SOP (标准作业程序) 固化为模型约束。",
    pipeline: [
      { id: "e1-1", name: "角色实例化", tech: "Anchor", desc: "设定资深政务文书撰写专家身份，确保高站位与宽视野" },
      { id: "e1-2", name: "文种定义", tech: "Definition", desc: "明确文种核心任务，区分文种本质差异" },
      { id: "e1-3", name: "输入逻辑", tech: "Priority", desc: "执行决策树：用户指令 > 用户素材 > 参考政策" },
      { id: "e1-4", name: "处理原则", tech: "Principle", desc: "坚持忠实原则与指令优先，缺项强制使用占位符" },
      { id: "e1-5", name: "输出规制", tech: "Format", desc: "强制纯净 Markdown，禁用富文本与其他干扰格式" }
    ]
  },
  {
    id: "engine-logic-style",
    title: "行文逻辑与风格组件",
    technicalLabel: "Style Agent",
    type: 'processor',
    icon: Network,
    userSummary: "程序化思维与智能生成的结合。利用代码决策树锁死行文骨架，利用“风格组件”注入专属核心词汇。",
    ioShape: { input: "Role Context", output: "Style Block" },
    latency: "~ 150ms",
    techStack: ["Rule Engine", "Vector DB", "ETL"],
    techNote: "基础技术：RAG (Retrieval-Augmented Generation) 与 ETL Pipeline。依托自动化 Data Cleaning 流水线，剔除噪声，提炼 Keywords，构建高质量 Vector Index。",
    pipeline: [
      { id: "e2-1", name: "行文逻辑决策", tech: "CoT", desc: "代码定义骨架，严格判定上行文或下行文方向" },
      { id: "e2-2", name: "风格组件装配", tech: "RAG", desc: "基于清洗后的语料库，检索该文种专属的核心词汇集" },
      { id: "e2-3", name: "垃圾数据提炼", tech: "Cleaning", desc: "自动识别并剥离低质量文本，保留高价值政策术语" }
    ]
  },
  {
    id: "engine-profile",
    title: "智能记忆与画像系统",
    technicalLabel: "Profile & Memory",
    type: 'processor',
    icon: Cpu,
    userSummary: "不仅写得对，还写得像你。系统自动记忆并应用您的单位习惯与个人用词偏好。",
    ioShape: { input: "User Context", output: "Preference Weight" },
    latency: "~ 40ms",
    techStack: ["Knowledge Graph", "Vector Memory", "Collaborative Filtering"],
    techNote: "基础技术：Long-term Memory 网络与 Vector Search。利用向量库存储偏好，结合 Knowledge Graph 构建实体关系。通过 Contrastive Learning 动态调整权重。",
    authorNote: "Product Insight: 人类认知具有 'Familiarity Bias' (熟悉度偏好)。用户常将“习惯用法”等同于“规范”。通过 Memory System 顺应这种惯性，不仅提高 Adoption Rate，更能建立深层 Trust——这是超越单纯准确性的情感纽带。",
    pipeline: [
      { id: "e3-1", name: "画像读取", tech: "Graph Query", desc: "加载职级、单位性质及历史修改记录" },
      { id: "e3-2", name: "隐性思维注入", tech: "Injection", desc: "将用户的潜台词与惯用语转化为生成约束" },
      { id: "e3-3", name: "记忆强化", tech: "Feedback", desc: "基于用户采纳行为更新向量库，越用越懂" }
    ]
  },
  {
    id: "layer-assembler",
    title: "动态指令编译",
    technicalLabel: "Context Factory",
    type: 'assembler',
    icon: Code2,
    userSummary: "将业务规则、风格素材、用户画像编译为机器可执行的精准指令。",
    ioShape: { input: "Modules Data", output: "Final Prompt" },
    latency: "< 30ms",
    techStack: ["Template Engine", "Prompt Opt."],
    techNote: "基础技术：Deterministic Template Engine。使用预编译代码组装动态 Context，确保 Prompt 结构的绝对稳定性，杜绝 Hallucination (幻觉) 导致的结构坍塌。",
    pipeline: [
      { id: "a1", name: "槽位填充", tech: "Filling", desc: "将各要素填入预设的指令模板" },
      { id: "a2", name: "缺项自检", tech: "Validation", desc: "发现核心素材缺失时，自动标记占位符" }
    ]
  },
  {
    id: "layer-reflection",
    title: "智能审视与推演",
    technicalLabel: "Reflection Agent",
    type: 'review',
    icon: ScanEye,
    userSummary: "写完不是结束。系统会像老秘书一样，自我审视文稿的逻辑漏洞与数据一致性，在呈送前完成自我修正。",
    ioShape: { input: "Draft", output: "Refined Draft" },
    latency: "~ 800ms",
    techStack: ["Auto-Critique", "Logical Inference"],
    techNote: "基础技术：Chain of Thought Verification (思维链校验)。引入 Critic Model 对生成内容进行多维度批判，自动识别幻觉与逻辑断层并触发 Self-Correction 循环。",
    pipeline: [
      { id: "c1", name: "自我批判", tech: "Audit", desc: "模拟审批者视角，检查逻辑漏洞与行文硬伤" },
      { id: "c2", name: "事实核查", tech: "Fact Check", desc: "回溯上下文，确保数据与引用的一致性" },
      { id: "c3", name: "润色修正", tech: "Refine", desc: "针对生硬表达进行平滑处理" }
    ]
  },
  {
    id: "layer-output",
    title: "合规生成与脱敏",
    technicalLabel: "Safety Guardrail",
    type: 'output',
    icon: ShieldCheck,
    userSummary: "输出纯净标准文档，内置敏感词阻断与格式清洗机制。",
    ioShape: { input: "Final Prompt", output: "Secure Stream" },
    latency: "Stream",
    techStack: ["LLM API", "Security Gateway"],
    techNote: "基础技术：基于 DFA 的敏感词过滤与 Regex 校验。在 Output Stream 过程中实时监控，确保 Compliance，并强制统一 Markdown 格式。",
    pipeline: [
      { id: "o1", name: "可控推理", tech: "Generation", desc: "低温度系数生成，确保内容严谨不发散" },
      { id: "o2", name: "格式清洗", tech: "Formatting", desc: "强制修正为标准的公文层级结构" },
      { id: "o3", name: "安全红线", tech: "Audit", desc: "敏感词、涉密信息实时阻断" }
    ]
  },
  {
    id: "layer-learning",
    title: "增量教学与进化",
    technicalLabel: "Active Learning Loop",
    type: 'learning',
    icon: GraduationCap,
    userSummary: "您的每一次修改都是对系统的教学。系统自动提炼修改日志，不断校准对您意图的理解，实现越用越顺手。",
    ioShape: { input: "User Edits", output: "Updated Weights" },
    latency: "Async",
    techStack: ["RLHF", "Online Learning"],
    techNote: "基础技术：Reinforcement Learning from Human Feedback (RLHF)。构建异步反馈闭环，将用户的“修改行为”转化为 Reward Signal，动态微调 Profile 层的向量权重。",
    authorNote: "Product Insight: 最好的系统不是出厂即巅峰，而是具备“成长性”。通过捕捉用户在实际工作中的微小修正（Teaching），系统逐渐从“通用工具”进化为“专属秘书”。",
    pipeline: [
      { id: "l1", name: "差异捕获", tech: "Diff", desc: "自动比对生成稿与用户定稿的差异" },
      { id: "l2", name: "模式提炼", tech: "Mining", desc: "从差异中挖掘用户的隐性偏好模式" },
      { id: "l3", name: "权重更新", tech: "Evolution", desc: "实时更新记忆库权重，优化下次生成" }
    ]
  }
];

export const COMPARISON_DATA: ComparisonPoint[] = [
  {
    feature: "效能定义",
    rapid: "工作流编排：通过精心设计的 Prompt 链将离散任务串联。这是目前成本最低、速度最快验证业务闭环的高效路径，让个人具备团队级的执行力。",
    engineering: "人力倍增器：不仅仅是工具，而是相当于投入了 10 倍人力的数字化编制。通过系统架构固化复杂 SOP，实现组织级的规模化稳定产出。",
    verdict: "前者追求“个体效率极致”，后者追求“组织产出稳定”。"
  },
  {
    feature: "决策逻辑",
    rapid: "线性执行：高度依赖人的显性指令。优势在于灵活性极高，用户通过 Workflow 定义每一步操作，系统忠实执行，适合“人主导、AI辅助”的敏捷场景。",
    engineering: "全局治理：引入 Context Factory 进行预判。系统具备“审视”能力，从全局视角辅助判断任务的“必要性”与“合规性”，减少无效的行政空转。",
    verdict: "前者是“手脚麻利的干事”，后者是“懂规矩的老秘书”。"
  },
  {
    feature: "交付形态",
    rapid: "流程模版 (SOP)：交付的是一套经过验证的交互流程。它将专家经验转化为可复用的 Prompt 资产，解决了特定场景下的“规范化”难题。",
    engineering: "数字编制：交付的是一种虚拟化的“秘书处”。将整个部门的职能（审校、纠错、学习）代码化，解决的是战略层面的“行政效能”问题。",
    verdict: "交付流程是战术胜利，交付编制是战略升级。"
  },
  {
    feature: "数据依赖",
    rapid: "敏捷语境：依赖用户实时输入与轻量级上下文。优势在于无需清洗数据的冷启动，通过 Prompt Engineering 实时矫正模型行为，即插即用。",
    engineering: "深度清洗 (ETL)：建立专业的数据流水线。确保喂给 Agent 的每一条 Context 都是经过清洗的高纯度决策依据，用数据质量换取模型上限。",
    verdict: "敏捷流适配快速迭代，工程流适配长效积淀。"
  }
];
