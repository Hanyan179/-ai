import {
  NewsItem,
  LearningPath,
  CurriculumSection,
  KnowledgeArea,
  Contributor,
  FeatureHighlight,
} from './types';

export const FEATURES: FeatureHighlight[] = [
  { title: '新手专属学习地图', subtitle: '零基础专属指引，清晰规划路径' },
  { title: '手把手图文教程', subtitle: '保姆级图文详解，跟着做就能学会' },
  { title: '沉浸式模拟编程', subtitle: '虚拟鼠标自动导览，快速上手 IDE' },
  { title: '看得见的 AI 原理', subtitle: '算法原理动画化，一眼看懂' },
  { title: '像玩游戏一样学 RAG', subtitle: '独家交互组件，点击即可看清数据流向' },
  { title: '可视化终端原理', subtitle: '命令行操作可视化，直观展示后台逻辑' },
];

export const NEWS_ITEMS: NewsItem[] = [
  { date: '2026-03-29', emoji: '✨', title: '「用户故事」专区上线', description: '首页新增交互式故事轮播组件和独立故事页面，涵盖乡村小学老师、大学生、高中信息技术老师和货车司机的真实案例。' },
  { date: '2026-03-26', emoji: '🚀', title: '阶段二实战内容集中更新', description: '补充完整 SaaS 全栈大作业《第一个 SaaS 全栈应用——文案生成网站》，同时大幅补全 Stripe 收费系统集成。' },
  { date: '2026-03-25', emoji: '📚', title: '新增附录「用户研究与需求验证」', description: '包含 4 篇文章——从哪里找点子、双钻模型、Jobs to Be Done、The Mom Test 用户访谈法。' },
  { date: '2026-03-25', emoji: '📚', title: '英文文档全面更新', description: '第二阶段（全栈开发）和第三阶段（高级开发）现已提供完整英文翻译。' },
  { date: '2026-03-02', emoji: '🦞', title: 'OpenClaw & AI Agent 友好支持', description: '新增 llms.txt AI 导航文件，让 AI Agent 能够快速理解仓库结构。' },
  { date: '2026-03-01', emoji: '🔥', title: '高级开发部分全面升级', description: '新增 Claude Code 七大深度指南及八大跨平台开发实战。' },
  { date: '2026-02-25', emoji: '📖', title: '附录知识库更新', description: '涵盖 9 大知识领域、80+ 交互式专题。' },
  { date: '2026-01-27', emoji: '📱', title: 'Android 和 iOS 教程', description: '新增 Android 和 iOS 平台应用开发教程。' },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    icon: '🎮', title: '我想先试试（5分钟体验）', audience: '所有人', color: 'yellow',
    learn: 'AI 编程初体验、贪吃蛇小游戏',
    outcome: '5 分钟做出第一个 AI 应用',
    detail: '这是最轻量的入门路径。你不需要任何编程基础，只需要打开浏览器，跟着教程用自然语言描述你想要的功能，AI 就会帮你生成一个贪吃蛇小游戏。整个过程只需要 5 分钟，让你直观感受"会说话就会编程"的魅力。',
    keyPoints: ['零基础即可开始', '5 分钟完成第一个 AI 应用', '通过贪吃蛇游戏感受 AI 编程', '无需安装任何软件'],
  },
  {
    icon: '💡', title: '我有个想法要实现', audience: '零基础 / 产品经理 / 创业者', color: 'green',
    learn: 'AI IDE 工具、需求拆解、页面设计、提示词写法',
    outcome: '一个可演示的产品原型',
    detail: '如果你有一个产品想法但不会编程，这条路径教你如何用 AI 工具把想法变成可演示的原型。你将学会使用 AI IDE、拆解需求、设计页面、编写有效的提示词，最终产出一个可以展示给投资人或用户的产品原型。',
    keyPoints: ['学会使用 Cursor / Trae 等 AI IDE', '掌握需求拆解和页面设计方法', '学会编写高效的提示词', '产出可演示的产品原型'],
  },
  {
    icon: '🚀', title: '我想系统学习', audience: '开发者 / 进阶学习者', color: 'blue',
    learn: '前端、后端、数据库、AI 集成、部署运维',
    outcome: '独立完成一个可上线的全栈 AI 应用',
    detail: '这是最完整的学习路径，覆盖从前端 UI 设计到后端数据库、从 AI 能力集成到部署运维的全栈开发流程。你将使用 React/Next.js、Supabase、Stripe 等现代技术栈，在 AI 辅助下独立完成一个可上线的全栈应用。',
    keyPoints: ['前端：React、组件库、设计系统', '后端：Supabase、API 设计、Git 工作流', 'AI 集成：Dify、RAG、知识库', '部署：Vercel / Zeabur 一键上线', '支付：Stripe 收费系统集成'],
  },
  {
    icon: '🦞', title: '我想构建 AI Agent', audience: '对 AI Agent 感兴趣的开发者', color: 'purple',
    learn: 'OpenClaw AI 助理、Skills 系统、自动化工作流',
    outcome: '一个属于你的命令行 AI 助理',
    detail: '这条路径聚焦 AI Agent 开发。你将学习 OpenClaw 框架，理解 Skills 系统的设计理念，掌握如何构建自动化工作流。最终你会拥有一个属于自己的命令行 AI 助理，能够理解你的指令并自动执行复杂任务。',
    keyPoints: ['理解 AI Agent 的核心概念', '学习 OpenClaw 框架', '掌握 Skills 系统设计', '构建自动化工作流', '打造个人命令行 AI 助理'],
  },
  {
    icon: '📚', title: '我想查资料', audience: '所有人', color: 'accent',
    learn: '计算机基础、AI 原理、9 大知识领域',
    outcome: '80+ 交互式专题资料',
    detail: '这是一个庞大的交互式知识库，涵盖计算机基础、开发工具、前端后端、数据库、架构设计、基础设施、人工智能、工程素养等 9 大领域。每个专题都配有动画和可视化组件，帮助你直观理解从底层原理到前沿技术的核心概念。',
    keyPoints: ['9 大知识领域全覆盖', '80+ 交互式专题', '动画和可视化组件辅助理解', '从计算机底层到 AI 前沿'],
  },
];


export const CURRICULUM: CurriculumSection[] = [
  {
    stage: '一', stageLabel: '零基础入门', color: 'yellow', icon: '🌱',
    chapters: [
      { title: '学习地图', description: '整体学习路径导览',
        detail: '这是整个 Easy-Vibe 课程的起点。学习地图为你梳理了从零基础到高级开发的完整路径，帮助你根据自身情况选择最合适的学习起点和节奏。',
        keyPoints: ['了解三个阶段的学习目标', '根据自身水平选择起点', '明确每个阶段的产出物'] },
      { title: 'AI 时代，会说话就会编程', description: '通过贪吃蛇等案例初步感受 AI 编程的能力',
        detail: '通过制作贪吃蛇等经典小游戏，让你亲身体验 AI 编程的能力。你只需要用自然语言描述你想要的功能，AI 就能帮你生成代码。这一章的目标是打破"编程很难"的心理障碍。',
        keyPoints: ['用自然语言描述需求', 'AI 自动生成贪吃蛇游戏代码', '体验"说出来就能做出来"', '零代码基础即可完成'] },
      { title: '寻找好想法', description: '学会寻找和验证产品想法',
        detail: '好的产品始于好的想法。这一章教你如何从日常生活中发现痛点、如何验证想法是否值得做、如何避免"自嗨式创业"。涵盖双钻模型、Jobs to Be Done、The Mom Test 等方法论。',
        keyPoints: ['从日常痛点中发现产品机会', '双钻模型：发散与收敛', 'Jobs to Be Done 需求分析框架', 'The Mom Test 用户访谈法', '低成本验证想法可行性'] },
      { title: '认识 AI IDE 工具', description: '学会使用 IDE，在本地制作小游戏',
        detail: '介绍 Cursor、Trae、Windsurf 等主流 AI IDE 工具的安装和使用方法。你将在本地环境中搭建开发环境，并用 AI IDE 制作一个小游戏，掌握 AI 辅助编程的基本工作流。',
        keyPoints: ['Cursor / Trae / Windsurf 等工具对比', '本地开发环境搭建', 'AI IDE 的核心功能：代码补全、对话、重构', '在本地制作第一个小游戏'] },
      { title: '动手做出原型', description: '从需求分析到生成多页面产品原型',
        detail: '从一个真实的产品需求出发，教你如何进行需求分析、信息架构设计、页面布局规划，然后用 AI 生成从单页面到多页面的完整产品原型。',
        keyPoints: ['需求分析与功能拆解', '信息架构设计', 'AI 生成单页面原型', '迭代扩展为多页面产品', '原型评审与优化'] },
      { title: '给原型加上 AI 能力', description: '接入文本、图片、视频等 AI 能力',
        detail: '学会在产品原型中集成各种 AI 能力，包括文本生成（GPT）、图片生成（DALL-E / Stable Diffusion）、视频生成等。让你的产品从静态原型变成具有 AI 智能的应用。',
        keyPoints: ['接入文本生成 API（GPT 等）', '接入图片生成能力', '接入视频生成能力', 'API Key 管理与安全', '前端调用 AI 接口的最佳实践'] },
      { title: '完整项目实战', description: '模拟真实场景、接受用户反馈迭代',
        detail: '模拟真实的产品开发场景，从需求确认到功能开发、从用户测试到反馈迭代，完整走一遍产品开发的全流程。学会如何根据用户反馈持续优化产品。',
        keyPoints: ['模拟真实产品开发流程', '用户测试与反馈收集', '基于反馈的迭代优化', '项目复盘与总结'] },
    ],
  },
  {
    stage: '二', stageLabel: '初中级开发', color: 'blue', icon: '⚡',
    chapters: [
      { title: 'Lovart 素材生产 Agent', description: '利用 AI 批量生成高质量设计素材',
        detail: '从零开始，利用 Nanobanana 和 Lovart 批量生成高质量的设计素材，并动手构建一个能意图识别的绘图 Agent。学会用 AI 解决设计资源不足的问题。',
        keyPoints: ['Nanobanana 和 Lovart 工具使用', '批量生成设计素材', '构建意图识别绘图 Agent', '设计素材的质量控制'] },
      { title: 'Figma 与 MasterGo 入门', description: '用设计工具梳理信息架构和页面结构',
        detail: '学习使用 Figma 和 MasterGo 等设计工具，掌握信息架构梳理、页面结构设计、组件化设计等核心技能，为前端实现打下坚实基础。',
        keyPoints: ['Figma / MasterGo 基础操作', '信息架构梳理方法', '页面结构与布局设计', '组件化设计思维'] },
      { title: 'UI 设计', description: '基于设计稿完成组件化界面',
        detail: '基于设计稿完成组件化界面开发，实现从设计到代码的第一条链路。学会使用现代前端框架将设计稿转化为可交互的界面。',
        keyPoints: ['设计稿到代码的转化流程', '组件化界面开发', '响应式布局实现', '设计系统与样式规范'] },
      { title: '从数据库到 Supabase', description: '打通数据模型与前端页面',
        detail: '在 Supabase 上落地数据库和 API，打通数据模型与前端页面。学会数据库设计、表关系建模、API 自动生成等后端核心技能。',
        keyPoints: ['Supabase 平台入门', '数据库表设计与关系建模', 'API 自动生成与调用', '前后端数据联通', '行级安全策略（RLS）'] },
      { title: 'Git 和 GitHub 工作流', description: '版本控制和协作',
        detail: '掌握 Git 版本控制的核心概念和 GitHub 协作工作流。学会分支管理、代码提交、Pull Request、代码审查等团队协作必备技能。',
        keyPoints: ['Git 核心概念：commit、branch、merge', 'GitHub 工作流', 'Pull Request 与代码审查', '冲突解决', '团队协作最佳实践'] },
      { title: '部署 Web 应用', description: '使用 Vercel、Zeabur 等平台部署上线',
        detail: '学会使用 CloudBase、Vercel、Zeabur 等现代部署平台，将你的应用一键部署上线。涵盖域名配置、环境变量管理、CI/CD 自动部署等。',
        keyPoints: ['Vercel / Zeabur / CloudBase 平台对比', '一键部署流程', '自定义域名配置', '环境变量管理', 'CI/CD 自动部署'] },
      { title: 'Stripe 收费系统集成', description: '接入支付系统，完成收费链路',
        detail: '接入 Stripe 支付系统，完成从产品展示到用户付款的完整收费链路。涵盖多产品 UI 设计、支付流程实现、微信小程序后端等关键内容。',
        keyPoints: ['Stripe 支付系统接入', '多产品定价页面设计', '支付流程与回调处理', 'Webhook 事件处理', '订阅与一次性付款'] },
      { title: '全栈大作业', description: '综合前后端与支付，完成可上线应用',
        detail: '综合前端、后端与支付模块，完成一个可上线的全栈 Web 应用——文案生成网站。这是第二阶段的毕业项目，检验你的全栈开发能力。',
        keyPoints: ['文案生成网站全栈开发', '前端界面 + 后端 API + 数据库', 'AI 文案生成能力集成', 'Stripe 支付集成', '完整部署上线'] },
    ],
  },
  {
    stage: '三', stageLabel: '高级开发', color: 'green', icon: '🔥',
    chapters: [
      { title: 'Claude Code 快速上手', description: '安装配置、基础操作、实用技巧',
        detail: 'Claude Code 是 Anthropic 推出的命令行 AI 编程工具。这一章教你安装配置、基础操作、实用技巧和常用指令，快速上手这个强大的 AI 开发助手。',
        keyPoints: ['Claude Code 安装与配置', '基础操作与常用指令', '项目初始化与代码生成', '调试与错误修复技巧'] },
      { title: 'Claude Code MCP 完全指南', description: '连接 GitHub、数据库、API 等外部服务',
        detail: '通过 MCP（Model Context Protocol）让 Claude Code 连接 GitHub、数据库、API 等外部服务，大幅扩展 AI 的能力边界。',
        keyPoints: ['MCP 协议原理', '连接 GitHub 仓库', '连接数据库', '自定义 MCP 服务器', '多服务协同工作'] },
      { title: 'Claude Code Skills 完全指南', description: '将专业知识打包成可复用技能包',
        detail: '将专业知识打包成可复用的技能包（Skills），一次配置反复使用。这是企业级 AI 开发的核心概念，让 AI 在特定领域表现更专业。',
        keyPoints: ['Skills 概念与设计理念', '编写高质量 Skill 文档', 'Skill 的组织与管理', '团队共享 Skills', '最佳实践与常见模式'] },
      { title: 'Agent Teams 完全指南', description: '多 AI 实例协同工作',
        detail: '让多个 AI 实例像真正的开发团队一样并行协作。学会任务分解、角色分配、结果汇总等多 Agent 协同开发的核心技能。',
        keyPoints: ['多 Agent 协同架构', '任务分解与角色分配', '并行开发与结果汇总', '冲突解决与代码合并', '团队效率最大化'] },
      { title: '微信小程序开发', description: '从官方模板到上线完成前端小程序',
        detail: '了解微信小程序生态，从官方模板出发，在 AI 辅助下完成一个前端小程序的开发和上线。涵盖小程序框架、组件、API 调用等核心内容。',
        keyPoints: ['微信小程序框架与生态', '从模板创建项目', '页面与组件开发', '微信 API 调用', '审核与上线流程'] },
      { title: 'PWA 本地应用', description: '让网页变成"真正的 App"',
        detail: '将网页应用转化为 PWA（Progressive Web App），支持离线访问、推送通知、桌面安装等原生应用特性，一套代码多端运行。',
        keyPoints: ['PWA 核心概念', 'Service Worker 与离线缓存', '推送通知实现', '桌面安装体验', '性能优化策略'] },
      { title: 'Electron 桌面程序', description: '构建语音转文字桌面应用',
        detail: '用 Electron 构建一个语音转文字的桌面应用，支持 Windows、macOS、Linux 三平台安装运行。学会桌面应用开发的完整流程。',
        keyPoints: ['Electron 框架入门', '主进程与渲染进程', '语音识别 API 集成', '跨平台打包与分发', '桌面应用 UI 设计'] },
      { title: 'VS Code 插件开发', description: '开发 AI 项目助手插件',
        detail: '开发一个 VS Code AI 项目助手插件，支持模板生成、代码对话、多文件问答等功能。深入理解 VS Code 扩展 API 和插件生态。',
        keyPoints: ['VS Code 扩展 API', '插件项目结构', 'AI 对话功能实现', '模板生成与代码片段', '插件发布与分发'] },
    ],
  },
];


export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  {
    icon: '💻', title: '计算机基础', color: 'blue',
    topics: [
      { name: '从晶体管到 CPU', detail: '从最基础的晶体管开始，逐步构建逻辑门、加法器、ALU，最终理解 CPU 的工作原理。通过动画展示电信号如何在芯片中流动。', keyPoints: ['晶体管与逻辑门', '组合逻辑与时序逻辑', 'ALU 算术逻辑单元', 'CPU 指令执行周期'] },
      { name: '操作系统', detail: '理解操作系统如何管理硬件资源、调度进程、管理内存。通过可视化展示进程调度算法和内存分配策略。', keyPoints: ['进程与线程管理', '内存管理与虚拟内存', '文件系统', '进程调度算法'] },
      { name: '数据编码与存储', detail: '从二进制到 Unicode，理解数据在计算机中的编码、存储与传输方式。', keyPoints: ['二进制与进制转换', '字符编码：ASCII / UTF-8 / Unicode', '数据压缩原理', '存储介质与层次结构'] },
      { name: '计算机网络', detail: '两台电脑如何对话？从物理层到应用层，逐层理解网络通信的原理。', keyPoints: ['OSI 七层模型', 'TCP/IP 协议栈', 'DNS 域名解析', 'HTTP 请求响应流程'] },
      { name: '数据结构', detail: '数组、链表、栈、队列、树、图等核心数据结构的原理与应用场景，配合动画演示。', keyPoints: ['线性结构：数组、链表、栈、队列', '树结构：二叉树、BST、堆', '图结构与遍历', '哈希表原理'] },
      { name: '算法思维入门', detail: '培养算法思维，理解排序、搜索、递归、动态规划等基础算法的核心思想。', keyPoints: ['排序算法可视化', '搜索算法：BFS / DFS', '递归与分治', '动态规划入门'] },
    ],
  },
  {
    icon: '🔧', title: '开发工具', color: 'yellow',
    topics: [
      { name: 'Git 版本控制', detail: 'Git 是代码的时光机。通过可视化展示 commit、branch、merge 的工作原理，理解版本控制的核心概念。', keyPoints: ['Git 工作区、暂存区、仓库', '分支与合并策略', '冲突解决', 'Git 工作流模型'] },
      { name: '命令行与 Shell', detail: '掌握命令行操作和 Shell 脚本编写，提升开发效率。可视化展示命令执行过程。', keyPoints: ['常用命令行操作', 'Shell 脚本基础', '管道与重定向', '环境配置与别名'] },
      { name: '包管理器', detail: '理解 npm、pip、cargo 等包管理器的工作原理，学会依赖管理和版本控制。', keyPoints: ['包管理器的作用', 'npm / yarn / pnpm 对比', '语义化版本控制', '依赖冲突解决'] },
      { name: '调试的艺术', detail: '系统化的调试方法论，从 console.log 到断点调试、从错误追踪到性能分析。', keyPoints: ['调试思维与方法论', '浏览器开发者工具', '断点调试技巧', '性能分析工具'] },
      { name: '正则表达式', detail: '正则表达式是文本处理的瑞士军刀。通过交互式组件学习正则语法和常见模式。', keyPoints: ['基础语法：字符类、量词、分组', '常见匹配模式', '正则在编程中的应用', '性能优化与陷阱'] },
      { name: '环境变量与 PATH', detail: '理解环境变量和 PATH 的工作原理，解决"命令找不到"等常见问题。', keyPoints: ['环境变量的概念', 'PATH 变量的作用', '不同系统的配置方式', '常见问题排查'] },
    ],
  },
  {
    icon: '🌐', title: '浏览器与前端', color: 'green',
    topics: [
      { name: 'JavaScript 深入', detail: '深入理解 JavaScript 的核心机制：事件循环、闭包、原型链、异步编程等。', keyPoints: ['事件循环与任务队列', '闭包与作用域链', '原型与继承', 'Promise 与 async/await'] },
      { name: '浏览器渲染管道', detail: '从 HTML 解析到像素绘制，完整展示浏览器渲染页面的每一个步骤。', keyPoints: ['DOM 树构建', 'CSSOM 与样式计算', '布局与绘制', '合成与 GPU 加速'] },
      { name: '前端框架对比', detail: 'React、Vue、Angular、Svelte 等主流前端框架的设计理念、优劣势和适用场景对比。', keyPoints: ['React：组件化与虚拟 DOM', 'Vue：渐进式与响应式', 'Angular：全功能框架', 'Svelte：编译时框架'] },
      { name: '图形与动画', detail: 'Canvas、SVG、WebGL 等图形技术和 CSS 动画、Web Animations API 等动画方案。', keyPoints: ['Canvas 2D 绑制', 'SVG 矢量图形', 'CSS 动画与过渡', 'Web Animations API'] },
      { name: '网页性能优化', detail: '网页性能的度量指标和优化策略，从加载速度到运行时性能的全面优化。', keyPoints: ['Core Web Vitals 指标', '资源加载优化', '运行时性能优化', '性能监控与分析'] },
      { name: '前端工程化', detail: '从模块化到构建工具、从代码规范到自动化测试，前端工程化的全貌。', keyPoints: ['模块化：ESM / CommonJS', '构建工具：Vite / Webpack', '代码规范：ESLint / Prettier', '自动化测试策略'] },
    ],
  },
  {
    icon: '🖥️', title: '服务器与后端', color: 'purple',
    topics: [
      { name: 'HTTP 协议', detail: '深入理解 HTTP 协议的请求响应模型、状态码、头部字段、缓存机制等核心概念。', keyPoints: ['请求方法与状态码', 'HTTP 头部字段', '缓存机制', 'HTTP/2 与 HTTP/3'] },
      { name: 'API 设计哲学', detail: 'RESTful API、GraphQL、gRPC 等 API 设计范式的对比与最佳实践。', keyPoints: ['RESTful API 设计原则', 'GraphQL 查询语言', 'gRPC 与 Protocol Buffers', 'API 版本管理'] },
      { name: '认证与授权', detail: '从 Cookie/Session 到 JWT、OAuth2.0，理解现代 Web 应用的认证与授权体系。', keyPoints: ['Cookie 与 Session', 'JWT Token 机制', 'OAuth 2.0 授权流程', 'RBAC 权限模型'] },
      { name: '并发与异步', detail: '理解并发、并行、异步的区别，掌握多线程、事件驱动、协程等并发模型。', keyPoints: ['并发 vs 并行 vs 异步', '多线程与锁机制', '事件驱动模型', '协程与 async/await'] },
      { name: '消息队列', detail: '理解消息队列在分布式系统中的作用，学习 Kafka、RabbitMQ 等消息中间件。', keyPoints: ['消息队列的作用', '发布/订阅模式', 'Kafka 与 RabbitMQ', '消息可靠性保证'] },
      { name: '后端分层架构', detail: '从 MVC 到 DDD，理解后端应用的分层架构设计和各层的职责划分。', keyPoints: ['MVC 架构模式', '三层架构：表现层/业务层/数据层', '领域驱动设计（DDD）', '微服务架构'] },
    ],
  },
  {
    icon: '📊', title: '数据', color: 'accent',
    topics: [
      { name: '数据库原理与 SQL', detail: '关系型数据库的核心原理、SQL 语法、索引优化、事务机制等。', keyPoints: ['关系模型与范式', 'SQL 增删改查', '索引原理与优化', '事务与 ACID'] },
      { name: '数据埋点', detail: '数据埋点与用户行为采集的方法论和技术实现，为产品决策提供数据支撑。', keyPoints: ['埋点方案设计', '前端埋点 SDK', '数据采集与上报', '数据质量保证'] },
      { name: '数据分析基础', detail: '数据分析的基本方法和工具，从数据清洗到可视化呈现。', keyPoints: ['数据清洗与预处理', '描述性统计分析', '数据可视化方法', '分析报告撰写'] },
      { name: 'A/B 测试', detail: '实验驱动的产品决策方法，学会设计、执行和分析 A/B 测试。', keyPoints: ['A/B 测试原理', '实验设计方法', '统计显著性判断', '常见陷阱与最佳实践'] },
      { name: '数据可视化', detail: '数据可视化与仪表盘设计，让数据"说话"。', keyPoints: ['可视化图表类型选择', 'D3.js / ECharts 等工具', '仪表盘设计原则', '交互式数据探索'] },
    ],
  },
  {
    icon: '🏗️', title: '架构与系统设计', color: 'red',
    topics: [
      { name: '从单体到微服务', detail: '理解软件架构从单体应用到微服务的演进过程、动机和挑战。', keyPoints: ['单体架构的优劣', '微服务拆分策略', '服务间通信', '数据一致性挑战'] },
      { name: '分布式系统', detail: '分布式系统面临的核心挑战：一致性、可用性、分区容错性（CAP 定理）。', keyPoints: ['CAP 定理', '分布式一致性协议', '分布式事务', '数据分片与复制'] },
      { name: '高可用与容灾', detail: '构建高可用系统的策略：冗余、故障转移、限流熔断、灾备恢复。', keyPoints: ['高可用架构设计', '故障转移机制', '限流与熔断', '灾备与恢复策略'] },
      { name: '系统设计方法论', detail: '系统设计面试和实际项目中的方法论：需求分析、容量估算、架构设计、权衡取舍。', keyPoints: ['需求分析与约束确认', '容量估算方法', '架构设计步骤', '常见系统设计案例'] },
    ],
  },
  {
    icon: '☁️', title: '基础设施与运维', color: 'cyan',
    topics: [
      { name: 'Docker 容器化', detail: '理解容器化技术的原理，学会使用 Docker 构建、运行和管理容器。', keyPoints: ['容器 vs 虚拟机', 'Dockerfile 编写', '镜像构建与管理', 'Docker Compose 编排'] },
      { name: 'Kubernetes', detail: 'Kubernetes 容器编排平台的核心概念：Pod、Service、Deployment、Ingress 等。', keyPoints: ['K8s 核心概念', 'Pod 与 Deployment', 'Service 与 Ingress', '自动扩缩容'] },
      { name: 'CI / CD', detail: '持续集成与持续部署的流程设计和工具选型，实现代码到生产的自动化。', keyPoints: ['CI/CD 流程设计', 'GitHub Actions / GitLab CI', '自动化测试集成', '蓝绿部署与金丝雀发布'] },
      { name: 'DNS 与 HTTPS', detail: '域名系统的工作原理和 HTTPS 加密通信的完整流程。', keyPoints: ['DNS 解析流程', '域名注册与配置', 'TLS/SSL 握手过程', '证书管理'] },
      { name: '监控与告警', detail: '系统监控、日志收集和告警机制的设计与实现。', keyPoints: ['监控指标设计', '日志收集与分析', '告警规则配置', 'Prometheus / Grafana'] },
    ],
  },
  {
    icon: '🤖', title: '人工智能', color: 'pink',
    topics: [
      { name: '大语言模型原理', detail: '理解 GPT 等大语言模型的工作原理：预训练、微调、推理过程。', keyPoints: ['语言模型基础', '预训练与微调', 'Token 化与嵌入', '生成策略：温度、Top-K、Top-P'] },
      { name: 'Transformer 与注意力', detail: '深入理解 Transformer 架构和自注意力机制，这是现代 AI 的基石。', keyPoints: ['自注意力机制原理', '多头注意力', '位置编码', 'Encoder-Decoder 架构'] },
      { name: 'RAG 架构', detail: '检索增强生成（RAG）的原理与架构，让 AI 能够基于外部知识回答问题。', keyPoints: ['RAG 核心流程', '文档切分与向量化', '向量数据库', '检索与生成的结合'] },
      { name: 'AI Agent 与工具调用', detail: '理解 AI Agent 的概念，学会让 AI 调用外部工具完成复杂任务。', keyPoints: ['Agent 架构设计', '工具调用机制', 'ReAct 推理框架', '多步骤任务规划'] },
      { name: '提示词工程', detail: '编写高效提示词的方法论和技巧，让 AI 输出更准确、更有用的结果。', keyPoints: ['提示词设计原则', '少样本学习（Few-shot）', '思维链（Chain of Thought）', '提示词模板与最佳实践'] },
      { name: '图像生成原理', detail: '理解 Stable Diffusion 等图像生成模型的工作原理，看懂 AI 如何"画"出图片。', keyPoints: ['扩散模型原理', '去噪过程可视化', 'ControlNet 条件控制', '图像生成的应用场景'] },
    ],
  },
  {
    icon: '🎯', title: '工程素养', color: 'orange',
    topics: [
      { name: '代码质量与重构', detail: '编写高质量代码的原则和重构技巧，让代码更易读、易维护、易扩展。', keyPoints: ['代码坏味道识别', '重构手法与模式', '代码审查最佳实践', 'SOLID 原则'] },
      { name: '测试策略', detail: '从单元测试到集成测试、从 E2E 测试到性能测试，构建完整的测试策略。', keyPoints: ['测试金字塔', '单元测试编写', '集成测试与 E2E 测试', 'TDD 测试驱动开发'] },
      { name: '设计模式', detail: '常用设计模式的原理、适用场景和代码实现，提升代码的可复用性和可维护性。', keyPoints: ['创建型模式：工厂、单例、建造者', '结构型模式：适配器、装饰器、代理', '行为型模式：观察者、策略、命令', '模式的选择与组合'] },
      { name: '安全思维', detail: '安全思维与攻防基础，理解常见的安全威胁和防御策略。', keyPoints: ['OWASP Top 10', 'XSS 与 CSRF 防御', 'SQL 注入防护', '安全编码实践'] },
      { name: '技术文档写作', detail: '技术文档的写作方法和最佳实践，让你的文档清晰、准确、易于理解。', keyPoints: ['文档类型与结构', 'API 文档编写', 'README 最佳实践', '技术博客写作'] },
      { name: '开源协作', detail: '参与开源项目的方法和礼仪，从提 Issue 到贡献代码的完整流程。', keyPoints: ['开源社区文化', '提 Issue 与 PR 的规范', '开源许可证选择', '维护开源项目'] },
    ],
  },
];

export const CONTRIBUTORS: Contributor[] = [
  { name: '散步', role: '项目负责人 (Datawhale成员)' },
  { name: '方可', role: '指导老师 (Datawhale成员, 清华大学)' },
  { name: 'Yerim Kang', role: '实践项目部分 (清华大学)' },
  { name: '赵芷霖', role: '实践项目部分 (清华大学)' },
  { name: '李亦萱', role: '页面美术设计 (清华大学)' },
  { name: '刘思怡', role: '实践项目部分 (清华大学)' },
  { name: '刘丽欣', role: '实践项目部分 (清华大学)' },
];

export const TARGET_AUDIENCES = [
  { label: '零基础爱好者', desc: '先做出第一个作品，再理解怎么做', icon: '🌟' },
  { label: '产品经理 / 创业者', desc: '快速验证想法，低成本做 MVP', icon: '💼' },
  { label: '学生', desc: '建立 AI 时代的实战技能', icon: '🎓' },
  { label: '初级开发者', desc: '补齐从想法到上线的完整开发链路', icon: '🔰' },
  { label: '中高级开发者', desc: '掌握 AI 协作开发与效率升级', icon: '🚀' },
];
