// Content source: Individual Application for AI Core Talent Program
import { StrategyData, ProfileData, ProjectItem, ProductDefData, EngineerDefnData, MVPAnalysisData } from './types';

export const HERO_DATA = {
  label: "核心骨干人才遴选申报 | 2024",
  title: "AI 时代特种兵竞聘报告",
  subtitle: "以“数据资产化”思维，重构政府公文业务的工程壁垒",
  metaphor: "Core Talent Application"
};

export const PROFILE_DATA: ProfileData = {
  name: "申请人", // You can replace this
  role: "AI 研发工程师",
  slogan: "以确定性的工程逻辑，驾驭不确定的 AI 概率",
  standards: [
    {
      key: "能动 · Motivated",
      title: "结果导向 / 自我驱动",
      desc: "不满足于“接收需求”，而是主动识别开发痛点。在实战中，主动复盘“Prompt工程”的低效陷阱，提出架构转型方案。"
    },
    {
      key: "善思 · Thinking",
      title: "系统思考 / 洞察根源",
      desc: "透过现象看本质。从 OpenAI 复盘中洞察到“代码生成”背后的“架构先行”逻辑，提出“资产 vs 耗材”的战略判断。"
    },
    {
      key: "好学 · Learning",
      title: "技术前瞻 / 边界突破",
      desc: "利用 AI 突破技术栈边界。从 2023 年的 Prompt 尝试，到 2025 年独立完成 Web 全栈、iOS 开发及自动化运维，实现个人能力的全面重构。"
    },
    {
      key: "肯做 · Doing",
      title: "极致执行 / 核心担当",
      desc: "拒绝空谈。针对公司痛点，快速构建了“公文智能辅助”验证 Demo，并准备好承担核心攻坚任务。"
    }
  ]
};

// 1. MVP Project (To be shown at the end)
export const MVP_PROJECT: ProjectItem = {
  id: "p1",
  category: "【落地答卷】最终实战验证",
  title: "梦创AI中台使用期间痛点解决MVP",
  description: "这是前面所有战略思考的**实物佐证**。不满足于 PPT 画饼，我针对现有的“格式调整繁琐、内容溯源难”痛点，利用业余时间开发了这个 MVP。它验证了“左侧文档编写、右侧 AI 实时合规纠错”的可行性。\n\n> **⚠️ 特别说明 (Draft Phase)：**\n> 本项目处于 **MVP 草稿阶段**，核心旨在验证“文档即软件”的**工程逻辑闭环**，而非追求 UI/UX 的最终交付态。证明了：**我不仅能提出战略，更能亲手把战略逻辑跑通。**",
  techStack: ["React/Next.js", "AI Agent Workflow", "RAG / Vector DB"],
  metrics: [
    { label: "交付性质", value: "Logic Verification" },
    { label: "完成度", value: "MVP Draft" }
  ],
  images: ["/projects/mvp/01.jpg", "/projects/mvp/02.jpg"] 
};

// MVP Analysis Data (The "Why" and "Future")
export const MVP_ANALYSIS_DATA: MVPAnalysisData = {
  comparison: {
    current: {
      title: "平台现状 (The Reality)",
      points: [
        "已有提示词工程功能，但**利用率低**，更像是工具箱而非解决方案。",
        "缺乏最佳实践指引，用户不知道如何写好 Prompt。",
        "功能点分散，未能形成“公文写作”的闭环场景。"
      ]
    },
    mvp: {
      title: "MVP 实践 (The Practice)",
      points: [
        "不依赖用户写 Prompt，而是将**最佳实践固化为代码** (Workflow)。",
        "验证了“文档即软件”理念，让 AI 隐形于业务流程之后。",
        "证明了在垂直场景下，确定性逻辑优于发散性对话。"
      ]
    }
  },
  future: {
    title: "从 Demo 到 Production 的距离",
    items: [
      {
        label: "黄金数据管理 (Golden Dataset)",
        status: "MVP 缺失",
        desc: "现状：MVP 使用公文网公开数据生成的临时“伪黄金数据”。\n未来：需构建专业的管理系统，支持专家人工修正、版本管理，作为评测基准。"
      },
      {
        label: "裁判 AI (Judge AI)",
        status: "MVP 缺失",
        desc: "现状：依靠人工肉眼判断生成结果好坏。\n未来：引入自动化评估模型（Judge），通过与黄金数据比对，实现 24/7 的自动化回归测试与评分。"
      },
      {
        label: "数据加工流水线 (ETL)",
        status: "MVP 弱化",
        desc: "现状：手动上传处理。\n未来：对接公司现有的数据中台能力，实现从原始文档到向量切片的自动化清洗与入库。"
      }
    ]
  }
};

// 2. Personal Projects (To be shown in the middle)
export const PERSONAL_PROJECTS: ProjectItem[] = [
  {
    id: "p2",
    category: "【技术底座】全栈能力储备",
    title: "垂直领域内容生态平台",
    description: "2025年的第一个里程碑。打破前后端分离依赖，独立完成包含“明星粉丝前台”与“资源管理后台”的完整生态。证明我具备**独立负责复杂业务系统**的全栈闭环能力。\n\n> **⚠️ 注意：** 这是一个测试环境，未开启CDN加速，因此部分资源可能加载较慢或未加载。",
    techStack: ["Java / SpringBoot", "React / Ant Design", "MySQL / Redis"],
    metrics: [
      { label: "系统规模", value: "Full Stack" },
      { label: "能力", value: "System Design" }
    ],
    images: ["/projects/content-platform/01.jpg", "/projects/content-platform/02.jpg"],
    link: "http://layzhang.cn"
  },
  {
    id: "p3",
    category: "【技术底座】跨端能力储备",
    title: "Native iOS 移动应用",
    description: "为了验证 AI 时代的“语言无感化”，我在零 Swift 基础的情况下，独立构建原生 iOS App。证明在 AI 加持下，我具备**快速切入任何新平台**并交付产品的学习与执行能力。",
    techStack: ["Swift 5", "SwiftUI", "Clean Architecture"],
    metrics: [
      { label: "起步基础", value: "Zero Swift" },
      { label: "能力", value: "Cross-Platform" }
    ],
    images: ["/projects/ios-app/01.jpg", "/projects/ios-app/02.jpg", "/projects/ios-app/03.jpg", "/projects/ios-app/04.jpg", "/projects/ios-app/05.jpg"]
  },
  {
    id: "p4",
    category: "【技术底座】资源获取与交付能力",
    title: "3小时极速全栈交付",
    description: "“天下武功，唯快不破”。不仅是运维部署，而是涵盖了**从0代码开发到上线**的全过程。利用 AI 辅助编码完成前端页面与逻辑，配合 Docker/Nginx 完成域名解析与 SSL 配置。\n\n**特别标注：**该项目并非为承接外包，而是为了快速构建合规的企业级官网，以通过 **Google/AWS 初创公司审核**，成功申请到了**数千美金的 AI 算力补贴（Credits）**用于个人研发。证明我不仅具备闭环交付能力，更具备**利用规则获取关键资源**的破局思维。",
    techStack: ["AI Coding", "Docker / Nginx", "Startup Credits App"],
    metrics: [
      { label: "交付耗时", value: "3 Hours" },
      { label: "获取资源", value: "$5000+ Credits" }
    ],
    images: ["/projects/fullstack-delivery/01.png"],
    link: "http://xinan-tech.store"
  }
];

export const OPENAI_CASE_DATA = {
  title: "深度思考：行业对标", 
  subtitle: "我对 OpenAI 极致人效比的底层逻辑拆解",
  stats: [
    { label: "Sora项目配置", value: "4人", sub: "Core Team" },
    { label: "研发周期", value: "28天", sub: "Time-to-Market" },
    { label: "AI代码占比", value: "85%", sub: "Automated" },
    { label: "思考结论", value: "Amplified", sub: "被放大的工程师" }
  ],
  insights: [
    {
      title: "Agent.md 架构范式",
      desc: "启示：AI缺乏审美。我们必须先写 Agent.md（员工手册）定义架构。只要约束清晰，AI就是最强执行者。"
    },
    {
      title: "逻辑定义前置",
      desc: "启示：拒绝模糊需求。Coding前强制完成逻辑闭环。产品经理/架构师的逻辑严密性是最高壁垒。"
    },
    {
      title: "语言的“巴别塔”已倒", // Highlighted Linguistic Trend
      desc: "启示：从 English 到 Universal Logic。编程语言趋于同质化。我能从 Java 跳到 iOS，因为底层数据结构与逻辑是通用的。未来只有一种语言：逻辑。"
    }
  ]
};

export const PAIN_POINTS_DATA = {
  title: "痛点识别：研发效能瓶颈",
  subtitle: "我在实战中发现的“资源错配”问题",
  points: [
    {
      title: "需求模糊引发的低效",
      desc: "实战痛点：在知识图谱开发中，因需求未定义，被迫基于Prompt猜测性重构。核心精力浪费在“猜”而非“做”。"
    },
    {
      title: "Prompt工程的陷阱",
      desc: "工程洞察：单纯修补 Prompt 如同“用创可贴补大坝”。概率模型的不稳定性，无法满足政府业务的严肃性。"
    },
    {
      title: "人才能力的错位",
      desc: "自我反思：让架构师去写业务Prompt，是“高薪低配”。我们正在丧失工程化能力，陷入“保姆式定制”的怪圈。"
    }
  ]
};

export const STRATEGY_DATA: StrategyData = {
  title: "破局思路：资产 vs 耗材",
  subtitle: "我的战略判断：构建以私有数据为核心的护城河",
  analogy: {
    title: "终极红利分析",
    engine: "Models (Llama 3/DeepSeek)",
    fuel: "Data (Private Assets)",
    desc: "随着开源爆发，模型（引擎）将趋近免费；而高质量、结构化的政府私有数据（燃料）将是唯一的不可替代资产。"
  },
  databricks: {
    title: "他山之石：Databricks",
    problem: "手写Prompt导致格式错误频发，维护高。",
    solution: "引入DSPy。不写Prompt，只定义Schema。后台自动进行数千次“自我对弈”搜索最佳Prompt。",
    result: "对我司的启示：面对政府公文的严格格式，自动化编译是唯一低成本路径。"
  },
  moat: {
    title: "ToG 业务理解",
    content: "政府客户缺的不是通用AI，而是合规、私有的支持。我主张研发重心从“功能开发”转向“私有知识库构建”，让客户深度依赖我们的数据结构。"
  }
};

export const ENGINEER_DEFN_DATA: EngineerDefnData = {
  title: "AI 工程师的重新定义",
  desc: "AI 抹平了语言差异。未来的核心竞争力不再是掌握多少种语法，而是“技术规划 + 产品思考 + 工程交付”的三角闭环。",
  triad: [
    {
      title: "架构规划 (Technical)",
      icon: "Code2",
      color: "text-blue-400",
      desc: "我的立身之本。Java 带来的系统性思维。保证系统的健壮性、可扩展性与安全性。决定了产品“能不能做”。"
    },
    {
      title: "产品思考 (Product)",
      icon: "Lightbulb",
      color: "text-yellow-400",
      desc: "我的价值增量。不只是接收需求，而是定义需求。理解业务痛点，自主设计逻辑。决定了产品“该不该做”。"
    },
    {
      title: "全栈交付 (Delivery)",
      icon: "Rocket",
      color: "text-green-400",
      desc: "我的执行底气。3小时极速上线的 DevOps 能力。把想法变成现实，不依赖他人，一人成军。决定了产品“何时上线”。"
    }
  ]
};

export const PRODUCT_DATA: ProductDefData = {
  title: "未来规划：确定性交付",
  subtitle: "解决领导“怕担责”的心理，重塑产品逻辑",
  philosophy: [
    { label: "格式绝对标准", desc: "严格遵循公文排版规范" },
    { label: "内容强溯源", desc: "每句话均链接原始文件" },
    { label: "风格绝对严肃", desc: "杜绝幻觉，确保政治合规" }
  ],
  techStack: {
    skill: "Skill (操作手册)",
    skillDesc: "自然语言编程。建立 SKILL.md，写清楚“这件事怎么做”。文档即逻辑，将业务 Know-how 资产化。",
    agent: "Agent (自主执行)",
    agentDesc: "从工具到代理。AI读取手册，在“消除歧义”的标准下自主调用工具，实现无人值守的公文处理。"
  }
};

export const ROADMAP_DATA = {
  title: "行动计划：三步走",
  steps: [
    {
      phase: "Phase 1",
      name: "增强辅助 (Auxiliary)",
      desc: "利用廉价Token换取人力。增加后台“Prompt训练”模块，基于“60分基准”自我迭代至“满分”，停止人工修补。",
      action: "建立自动化评分集"
    },
    {
      phase: "Phase 2",
      name: "资产沉淀 (Asset)",
      desc: "建立数据飞轮。将验证成熟的逻辑封装为 Skill.md。收集边缘案例（Corner Cases），构建黄金数据集。",
      action: "Skill 封装与回流"
    },
    {
      phase: "Phase 3",
      name: "自主智能 (Native)",
      desc: "实现“文档即软件”。AI根据手册自主编排任务。人类负责定标准（画蓝图），AI负责跑流程（搬砖）。",
      action: "全自主智能体"
    }
  ]
};