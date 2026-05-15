import {
  ViewMode,
  ModeConfig,
  ArchNode,
  ArchConnection,
  ExternalService,
  LineStyle,
  NodeStyle,
} from './types';

// ========== 统一布局配置 ==========

export const UNIFIED_LAYOUT = {
  canvas: {
    width: 1800,
    height: 1000,
    padding: 40,
  },
  
  // Layer 1: 入口层 (左侧垂直排列)
  entryLayer: {
    centerX: 80,
    startY: 80,
    spacing: 180,
  },
  
  // Layer 2: 编排层
  orchestrationLayer: {
    centerX: 80,
    startY: 440,
    componentsY: 80,       // 业务组件 Y 坐标
    componentsStartX: 420, // 业务组件起始 X
    componentsSpacingX: 320, // 业务组件横向间距
    componentsSpacingY: 240, // 业务组件纵向间距
    fusionX: 1080,          // 融合节点 X 坐标
    fusionY: 200,          // 融合节点 Y 坐标
  },
  
  // Layer 3: 输出层 (底部横向排列)
  outputLayer: {
    startY: 680,
    startX: 80,
    spacing: 300,
  },
  
  // Layer 4: 外部服务层 (右侧垂直排列)
  servicesLayer: {
    x: 1480,
    startY: 60,
    spacing: 140,
  },
  
  // 节点尺寸
  nodeSize: {
    stage: { width: 240, height: 140 },
    component: { width: 220, height: 130 },
    fusion: { width: 220, height: 100 },
    service: { width: 180, height: 90 },
  },
};

// ========== 模式配置 ==========

export const MODE_CONFIGS: ModeConfig[] = [
  {
    id: 'blackbox',
    label: '黑盒模式',
    desc: '最简化视图，展示用户视角的输入输出',
  },
  {
    id: 'whitebox',
    label: '白盒模式',
    desc: '完整业务流程，展示7阶段处理过程',
  },
  {
    id: 'technical',
    label: '技术模式',
    desc: '底层技术细节，展示技术栈和外部服务',
  },
];

// ========== 连线样式 ==========

export const LINE_STYLES: Record<string, LineStyle> = {
  main: {
    stroke: '#60A5FA',      // 蓝色 - 主数据流
    strokeWidth: 3,
    strokeDasharray: 'none',
    markerEnd: 'arrow',
  },
  feedback: {
    stroke: '#34D399',      // 绿色 - 回流闭环
    strokeWidth: 2.5,
    strokeDasharray: '8,6', // 虚线
    markerEnd: 'arrow',
  },
  tech: {
    stroke: '#A78BFA',      // 紫色 - 技术连接
    strokeWidth: 2,
    strokeDasharray: 'none',
    markerEnd: 'arrow',
  },
  shared: {
    stroke: '#F59E0B',      // 橙色 - 共通技术
    strokeWidth: 2.5,
    strokeDasharray: 'none',
    markerEnd: 'arrow',
  },
};

// ========== 节点样式 ==========

export const NODE_STYLES: Record<string, NodeStyle> = {
  stage: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)',
    border: '1px solid #3B82F6',
    borderRadius: '12px',
  },
  component: {
    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    border: '1px solid #6366F1',
    borderRadius: '8px',
  },
  fusion: {
    background: 'linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)',
    border: '2px solid #8B5CF6',
    borderRadius: '16px',
  },
  service: {
    background: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)',
    border: '1px solid #10B981',
    borderRadius: '8px',
  },
};


// ========== 黑盒模式节点 ==========
// 黑盒模式：简化视图，水平排列

export const BLACK_BOX_NODES: ArchNode[] = [
  {
    id: 'user-input',
    type: 'stage',
    title: '用户输入',
    businessDesc: '用户的指令和素材',
    position: { x: 200, y: 350 },  // 居中水平排列
    visibleIn: ['blackbox'],
  },
  {
    id: 'ai-process',
    type: 'stage',
    title: 'AI 处理',
    businessDesc: '（内部过程不可见）',
    position: { x: 550, y: 350 },
    visibleIn: ['blackbox'],
  },
  {
    id: 'result-output',
    type: 'stage',
    title: '输出结果',
    businessDesc: '生成的内容',
    position: { x: 900, y: 350 },
    visibleIn: ['blackbox'],
  },
];

// ========== 白盒模式节点（7阶段流程） ==========
// 使用统一分层布局：
// - Layer 1 (左上): 业务入口、Agent输入 - 垂直排列
// - Layer 2 (中): 上下文编排 + 业务组件区域 - 组件2x2网格
// - Layer 3 (底部): 审视校验 → 安全合规 → 输出 → 反馈 - 横向排列

const L = UNIFIED_LAYOUT;

export const WHITE_BOX_NODES: ArchNode[] = [
  // ========== Layer 1: 入口层 (左上角垂直排列) ==========
  {
    id: 'entry',
    type: 'stage',
    title: '业务入口',
    businessDesc: '用户选择业务场景，系统识别意图',
    inputLabel: '用户选择 / 自然语言',
    outputLabel: '场景ID + 意图',
    position: { x: L.entryLayer.centerX, y: L.entryLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'agent-input',
    type: 'stage',
    title: 'Agent 输入',
    businessDesc: '接收用户指令和素材文件',
    inputLabel: '指令文本 + 文件',
    outputLabel: '结构化输入',
    position: { x: L.entryLayer.centerX, y: L.entryLayer.startY + L.entryLayer.spacing },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'context-orchestration',
    type: 'stage',
    title: '上下文编排',
    businessDesc: '组装 AI 需要的所有上下文信息',
    inputLabel: '结构化输入',
    outputLabel: '完整上下文',
    position: { x: L.entryLayer.centerX, y: L.orchestrationLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
  
  // ========== Layer 2: 业务组件 (2x2 网格布局) ==========
  {
    id: 'role-setting',
    type: 'component',
    title: '角色设定',
    businessDesc: '定义 AI 的身份和行为边界',
    outputLabel: '角色上下文块',
    position: { 
      x: L.orchestrationLayer.componentsStartX, 
      y: L.orchestrationLayer.componentsY 
    },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'code-logic',
    type: 'component',
    title: '代码逻辑',
    businessDesc: '确定性的业务规则和处理流程',
    outputLabel: '逻辑约束规则',
    position: { 
      x: L.orchestrationLayer.componentsStartX + L.orchestrationLayer.componentsSpacingX, 
      y: L.orchestrationLayer.componentsY 
    },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'style-component',
    type: 'component',
    title: '风格组件',
    businessDesc: '检索匹配的风格示例和规范',
    outputLabel: '风格上下文块',
    position: { 
      x: L.orchestrationLayer.componentsStartX, 
      y: L.orchestrationLayer.componentsY + L.orchestrationLayer.componentsSpacingY 
    },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'memory-system',
    type: 'component',
    title: '记忆系统',
    businessDesc: '历史对话和用户偏好',
    outputLabel: '记忆上下文块',
    position: { 
      x: L.orchestrationLayer.componentsStartX + L.orchestrationLayer.componentsSpacingX, 
      y: L.orchestrationLayer.componentsY + L.orchestrationLayer.componentsSpacingY 
    },
    visibleIn: ['whitebox', 'technical'],
  },
  
  // ========== 编排融合 (组件区域右侧) ==========
  {
    id: 'context-fusion',
    type: 'fusion',
    title: '编排融合',
    businessDesc: '将所有组件产出组装成最终 Prompt',
    inputLabel: '各组件上下文',
    outputLabel: '最终 Prompt',
    position: { 
      x: L.orchestrationLayer.fusionX, 
      y: L.orchestrationLayer.fusionY 
    },
    visibleIn: ['whitebox', 'technical'],
  },
  
  // ========== Layer 3: 输出层 (底部横向排列) ==========
  {
    id: 'review',
    type: 'stage',
    title: '审视校验',
    businessDesc: '像老秘书一样自我检查，发现逻辑漏洞和数据不一致',
    inputLabel: '初稿',
    outputLabel: '修正后的稿件',
    position: { x: L.outputLayer.startX, y: L.outputLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'safety',
    type: 'stage',
    title: '安全合规',
    businessDesc: '敏感词检查、格式规范、政治合规',
    inputLabel: '修正稿',
    outputLabel: '合规内容',
    position: { x: L.outputLayer.startX + L.outputLayer.spacing, y: L.outputLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'output',
    type: 'stage',
    title: '输出',
    businessDesc: '生成最终结果',
    inputLabel: '合规内容',
    outputLabel: '最终文档',
    position: { x: L.outputLayer.startX + L.outputLayer.spacing * 2, y: L.outputLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
  {
    id: 'feedback',
    type: 'stage',
    title: '反馈闭环',
    businessDesc: '收集用户反馈，优化系统',
    inputLabel: '用户反馈 / 修改',
    outputLabel: '学习信号',
    position: { x: L.outputLayer.startX + L.outputLayer.spacing * 3, y: L.outputLayer.startY },
    visibleIn: ['whitebox', 'technical'],
  },
];


// ========== 连线数据 ==========
// 极简版：只保留核心主流程，清晰展示数据流向

export const CONNECTIONS: ArchConnection[] = [
  // ========== 黑盒模式连线 ==========
  { id: 'b1', from: 'user-input', to: 'ai-process', type: 'main', dataLabel: '用户请求', visibleIn: ['blackbox'] },
  { id: 'b2', from: 'ai-process', to: 'result-output', type: 'main', dataLabel: '处理结果', visibleIn: ['blackbox'] },
  
  // ========== 白盒模式：清晰的主流程 ==========
  // 入口流程（垂直向下）
  { id: 'w1', from: 'entry', to: 'agent-input', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w2', from: 'agent-input', to: 'context-orchestration', type: 'main', visibleIn: ['whitebox', 'technical'] },
  
  // 编排 → 组件区域（只画一条到组件区域的代表线）
  { id: 'w3', from: 'context-orchestration', to: 'role-setting', type: 'main', visibleIn: ['whitebox', 'technical'] },
  
  // 组件 → 融合（只从右侧两个组件连到融合，减少交叉）
  { id: 'w10', from: 'code-logic', to: 'context-fusion', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w11', from: 'memory-system', to: 'context-fusion', type: 'main', visibleIn: ['whitebox', 'technical'] },
  
  // 后续流程：横向
  { id: 'w14', from: 'context-fusion', to: 'review', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w15', from: 'review', to: 'safety', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w16', from: 'safety', to: 'output', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w17', from: 'output', to: 'feedback', type: 'main', visibleIn: ['whitebox', 'technical'] },
  
  // ========== 回流 ==========
  { id: 'f1', from: 'feedback', to: 'memory-system', type: 'feedback', dataLabel: '学习反馈', visibleIn: ['whitebox', 'technical'] },
];

// ========== 外部服务（技术模式显示） ==========
// Layer 4: 外部服务层 (右侧垂直排列) - 简化连接

export const EXTERNAL_SERVICES: ExternalService[] = [
  {
    id: 'map-platform',
    name: 'MAP 中台',
    desc: '智能体编排 Workflow（待对接）',
    connectedTo: ['entry'],  // 简化：只连一个
    techDetail: '公司 MAP 平台 API',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY },
  },
  {
    id: 'knowledge-base',
    name: '知识库',
    desc: '结构化知识存储（公文模板、规范文档）',
    connectedTo: ['code-logic'],  // 简化：只连一个
    techDetail: 'Elasticsearch + 文档管理系统',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY + L.servicesLayer.spacing },
  },
  {
    id: 'vector-db',
    name: '向量数据库',
    desc: '存储 Embedding 向量',
    connectedTo: ['style-component'],  // 简化：只连一个
    techDetail: 'Milvus / Pinecone / Weaviate',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY + L.servicesLayer.spacing * 2 },
  },
  {
    id: 'cache',
    name: '缓存层',
    desc: '会话缓存、热点数据',
    connectedTo: ['memory-system'],  // 简化：只连一个
    techDetail: 'Redis Cluster',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY + L.servicesLayer.spacing * 3 },
  },
  {
    id: 'llm-api',
    name: 'LLM API',
    desc: '大模型接口（GPT-4/Claude/DeepSeek）',
    connectedTo: ['context-fusion'],  // 简化：只连融合节点
    techDetail: 'OpenAI API / Anthropic API / 私有化部署',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY + L.servicesLayer.spacing * 4 },
  },
  {
    id: 'rule-engine',
    name: '规则引擎',
    desc: '业务规则配置（公文格式规范）',
    connectedTo: ['safety'],  // 简化：只连安全合规
    techDetail: 'Drools / 自研规则引擎',
    position: { x: L.servicesLayer.x, y: L.servicesLayer.startY + L.servicesLayer.spacing * 5 },
  },
];

// ========== 技术模式额外连线 ==========
// 简化版：减少交叉，只保留关键技术连接

export const TECH_CONNECTIONS: ArchConnection[] = [
  // LLM 核心连接
  { id: 't1', from: 'llm-api', to: 'context-fusion', type: 'tech', dataLabel: 'API 调用', visibleIn: ['technical'] },
  
  // 向量检索
  { id: 't4', from: 'vector-db', to: 'style-component', type: 'shared', dataLabel: '向量检索', visibleIn: ['technical'] },
  
  // 知识库
  { id: 't6', from: 'knowledge-base', to: 'code-logic', type: 'tech', dataLabel: '知识检索', visibleIn: ['technical'] },
  
  // 规则引擎
  { id: 't9', from: 'rule-engine', to: 'safety', type: 'tech', dataLabel: '合规规则', visibleIn: ['technical'] },
  
  // 缓存
  { id: 't10', from: 'cache', to: 'memory-system', type: 'tech', dataLabel: '会话缓存', visibleIn: ['technical'] },
  
  // MAP 平台
  { id: 't12', from: 'map-platform', to: 'entry', type: 'tech', dataLabel: 'Workflow 触发', visibleIn: ['technical'] },
];

// ========== 技术详情（技术模式显示） ==========

export interface TechDetail {
  techStack: string[];
  techDesc: string;
  implementation: string;
  isSharedTech?: boolean;
  promptMapping?: {
    section: string;
    example: string;
  };
}

export const TECH_DETAILS: Record<string, TechDetail> = {
  'entry': {
    techStack: ['Intent Classification', 'Router Pattern', 'NLU'],
    techDesc: '基于意图分类模型识别用户场景，路由到对应处理流程',
    implementation: 'FastAPI + 意图分类模型 + 场景路由表',
  },
  
  'agent-input': {
    techStack: ['Document Parsing', 'OCR', 'Chunking', 'Embedding'],
    techDesc: '解析 PDF/Word 文档，OCR 识别图片文字，切分文本块',
    implementation: 'PyMuPDF + Tesseract OCR + LangChain TextSplitter',
  },
  
  'role-setting': {
    techStack: ['System Prompt Template', 'Constitutional AI', 'Role Boundary'],
    techDesc: '基于 Anthropic Constitutional AI 模式定义角色约束',
    implementation: 'Jinja2 模板 + 角色配置 YAML',
    promptMapping: {
      section: '### 角色定位 + ### 核心任务',
      example: '你是一名资深政务文书撰写专家，站位高、视野宽、把关严、笔力深...',
    },
  },
  
  'code-logic': {
    techStack: ['Rule Engine', 'Decision Tree', 'Workflow DSL'],
    techDesc: '确定性逻辑优先于概率生成，代码定义业务规则',
    implementation: 'Python Rule Engine + JSON Schema 校验',
    promptMapping: {
      section: '### 输入信息处理流程',
      example: '1、首要信息来源：综合用户指令与素材...\n2、补充与校准依据...\n3、处理原则：指令优先、信息整合...',
    },
  },
  
  'style-component': {
    techStack: ['RAG', 'Few-shot Examples', 'Vector Search', 'Style Transfer'],
    techDesc: '检索增强生成，从向量库检索风格示例',
    implementation: 'LangChain RAG + Milvus 向量检索',
    isSharedTech: true,
    promptMapping: {
      section: '### 公文常用词汇与风格（<style>标签包裹）',
      example: '一、核心词汇集（按功能场景分类）\n1、关于指导思想与原则：以……为指导...',
    },
  },
  
  'memory-system': {
    techStack: ['Short-term Memory', 'Long-term Memory', 'Vector Store', 'Session Cache'],
    techDesc: '对话历史 + 用户偏好向量存储，参考 MemGPT 模式',
    implementation: 'Redis (短期) + Milvus (长期) + MemGPT 架构',
    isSharedTech: true,
  },
  
  'context-fusion': {
    techStack: ['Context Window Management', 'Priority Ranking', 'Token Optimization'],
    techDesc: '上下文窗口管理，优先级排序，Token 优化',
    implementation: 'tiktoken 计数 + 优先级队列 + 动态裁剪',
    isSharedTech: true,
  },
  
  'review': {
    techStack: ['Chain of Thought', 'Self-Critique', 'Fact Check'],
    techDesc: '思维链校验、自我批判，检查逻辑漏洞和数据一致性',
    implementation: 'CoT Prompting + Critic Model',
  },
  
  'safety': {
    techStack: ['DFA Filter', 'Regex Validation', 'Content Safety'],
    techDesc: '敏感词过滤、格式校验、政治合规检查',
    implementation: 'DFA 敏感词库 + 正则校验器 + 内容安全 API',
  },
  
  'output': {
    techStack: ['Streaming Output', 'Format Validation', 'Markdown Render'],
    techDesc: '流式输出，格式校验，Markdown 渲染',
    implementation: 'SSE 流式传输 + 格式校验器',
    isSharedTech: true,
  },
  
  'feedback': {
    techStack: ['RLHF Signal', 'Preference Learning', 'A/B Testing'],
    techDesc: '收集用户反馈信号，更新记忆系统和风格组件',
    implementation: '反馈收集 API + 偏好学习模型',
  },
};

/**
 * 获取节点的技术详情
 */
export function getTechDetail(nodeId: string): TechDetail | undefined {
  return TECH_DETAILS[nodeId];
}

// ========== 业务场景示例数据 ==========

/**
 * 组件映射示例
 */
export interface ComponentMapping {
  promptSection: string;
  content: string;
  output: string;
}

/**
 * 业务场景示例
 */
export interface BusinessScenarioExample {
  documentType: string;
  roleComponent: ComponentMapping;
  codeLogicComponent: ComponentMapping;
  styleComponent: ComponentMapping;
  memorySystem: {
    content: string;
    output: string;
  };
  contextFusion: {
    fusionLogic: string;
    output: string;
  };
  outputExample: {
    content: string;
  };
}

/**
 * 《工作计划》Prompt 与组件映射示例
 */
export const WORK_PLAN_EXAMPLE: BusinessScenarioExample = {
  documentType: '工作计划',
  
  // ========== 角色设定组件 ==========
  roleComponent: {
    promptSection: '### 角色定位 + ### 核心任务',
    content: `你是一名资深政务文书撰写专家，站位高、视野宽、把关严、笔力深。

作为精通政府工作规划与部署的专家，你的核心任务是：严格遵循以下指令，
基于用户提供的素材和输入要求，起草一份目标明确、任务具体、措施可行、
语言凝练的《工作计划》。`,
    output: '角色上下文块（专家身份 + 行为边界）',
  },
  
  // ========== 代码逻辑组件 ==========
  codeLogicComponent: {
    promptSection: '### 输入信息处理流程',
    content: `1、首要信息来源：综合用户指令与素材
   - 用户指令（<user_input>标签包裹）：核心撰写要求、特定内容指向、格式风格要求
   - 用户上传素材（<user_material>标签包裹）：计划背景、指导思想、目标指标、任务措施
   
2、补充与校准依据：参考素材（<material>标签包裹）
   - 校准框架：参考标准工作计划的必备要素和逻辑结构
   - 规范表述：参考政府公文中关于目标设定、任务部署的规范用语
   
3、处理原则：
   - 指令优先：用户明确的指令性要求必须优先满足
   - 信息整合：将用户指令与素材有机结合
   - 忠实转化：未明确但必需的关键项用"×××"占位`,
    output: '逻辑约束规则（处理优先级 + 决策树）',
  },
  
  // ========== 风格组件 ==========
  styleComponent: {
    promptSection: '### 公文常用词汇与风格（<style>标签包裹）',
    content: `一、核心词汇集（按功能场景分类）
1、关于指导思想与原则：
   - 根本遵循：以……为指导，全面贯彻……精神，坚持……原则
   - 工作思路：围绕中心、服务大局、聚焦主业、统筹推进
   
2、关于目标设定：
   - 总体目标：力争实现、确保完成、达到……水平、取得……成效
   - 具体指标：实现……增长……%、完成……项目、提升……满意度
   
3、关于任务部署：
   - 任务引领：重点抓好、扎实推进、深入开展、全力做好
   - 措施方法：通过……方式、采取……措施、完善……机制

二、核心句式与结构风格
   - "为……（目的），根据……（依据），结合……（实际），制定本计划。"
   - "本计划期内的主要目标是：一是……；二是……；三是……。"

三、风格精髓：前瞻性、指导性、可操作性、约束性`,
    output: '风格上下文块（公文规范词汇 + 句式模板）',
  },
  
  // ========== 记忆系统 ==========
  memorySystem: {
    content: `- 用户历史偏好：之前生成的文档风格、常用表述
- 修改记录：用户对之前输出的修改反馈
- 对话历史：当前会话的上下文`,
    output: '记忆上下文块（个性化信息）',
  },
  
  // ========== 上下文融合 ==========
  contextFusion: {
    fusionLogic: `final_prompt = [
  system_prompt,           // 角色设定
  processing_rules,        // 代码逻辑（处理流程）
  style_examples,          // 风格组件（<style>标签内容）
  memory_context,          // 记忆系统
  reference_material,      // <material> 参考素材
  user_material,           // <user_material> 用户素材
  user_input               // <user_input> 用户指令
].join('\\n\\n')`,
    output: '最终 Prompt（发送给 LLM）',
  },
  
  // ========== 输出示例 ==========
  outputExample: {
    content: `# ××局2024年度工作计划

## 一、指导思想
以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神...

## 二、主要目标
力争实现以下目标：一是...；二是...；三是...

## 三、重点任务与具体措施
### （一）任务一：×××
1. 具体措施：...
2. 责任分工：...

## 四、实施步骤与时间安排
...

## 五、保障措施
...

××××年××月××日`,
  },
};

/**
 * 不同文种的组件差异说明
 */
export interface DocumentTypeDifference {
  documentType: string;
  roleSettingDiff: string;
  codeLogicDiff: string;
  styleComponentDiff: string;
}

export const DOCUMENT_TYPE_DIFFERENCES: DocumentTypeDifference[] = [
  {
    documentType: '工作计划',
    roleSettingDiff: '强调"前瞻性、指导性"',
    codeLogicDiff: '处理流程：背景→目标→任务→措施→保障',
    styleComponentDiff: '部署性词汇：力争、确保、扎实推进',
  },
  {
    documentType: '工作总结',
    roleSettingDiff: '强调"客观性、概括性"',
    codeLogicDiff: '处理流程：概述→工作→问题→经验→计划',
    styleComponentDiff: '汇报性词汇：取得成效、存在不足、深刻认识',
  },
  {
    documentType: '通知',
    roleSettingDiff: '强调"权威性、时效性"',
    codeLogicDiff: '处理流程：缘由→事项→要求→落款',
    styleComponentDiff: '指令性词汇：务必、严格、按时、特此通知',
  },
  {
    documentType: '意见',
    roleSettingDiff: '强调"指导性、可操作性"',
    codeLogicDiff: '处理流程：总体要求→任务→保障→实施',
    styleComponentDiff: '政策性词汇：坚持、统筹、健全、确保落实',
  },
  {
    documentType: '纪要',
    roleSettingDiff: '强调"纪实性、提要性"',
    codeLogicDiff: '处理流程：概况→共识→决议→部署',
    styleComponentDiff: '会议性词汇：会议认为、会议决定、会议要求',
  },
];

// ========== 能力价值分析（行业洞察） ==========

/**
 * 能力价值等级
 * - 'gold': 黄金能力 - 技术难度最高，但商业价值反直觉地较低（易被复制）
 * - 'diamond': 钻石能力 - 业界公认最值钱，真正的护城河
 * - 'consumable': 耗材能力 - 被高估的部分，属于易耗品
 * - 'hardbone': 硬骨头 - 真正的技术难点，决定产品成败
 */
export type CapabilityValueTier = 'gold' | 'diamond' | 'consumable' | 'hardbone';

export interface CapabilityValueAnalysis {
  tier: CapabilityValueTier;
  tierLabel: string;
  tierColor: string;
  industryDifficulty: number;  // 1-5 行业公认难度
  businessValue: number;       // 1-5 商业价值
  defensibility: number;       // 1-5 可防御性（护城河）
  insight: string;             // 行业洞察
  risks: string[];             // 风险点
}

/**
 * 能力价值分析数据
 * 基于行业深度洞察的能力分层
 */
export const CAPABILITY_VALUE_ANALYSIS: Record<string, CapabilityValueAnalysis> = {
  // ========== 数据采集 + 知识体系（黄金但反直觉） ==========
  'knowledge-base': {
    tier: 'gold',
    tierLabel: '黄金能力',
    tierColor: '#FFD700',
    industryDifficulty: 5,  // 业界公认最难
    businessValue: 2,       // 反直觉：商业价值最低
    defensibility: 1,       // 对手可以偷走
    insight: '数据采集+知识体系是业界公认最难的，但商业价值反直觉地最低。因为知识库一旦建成，竞争对手可以通过各种方式获取或复制。',
    risks: [
      '知识库可被竞争对手复制',
      '数据采集成本高但护城河低',
      '公开知识难以形成差异化',
    ],
  },
  
  'vector-db': {
    tier: 'gold',
    tierLabel: '黄金能力',
    tierColor: '#FFD700',
    industryDifficulty: 4,
    businessValue: 2,
    defensibility: 2,
    insight: '向量化存储是知识体系的技术实现，同样面临"技术难但价值低"的困境。Embedding 模型和向量库都是标准化组件。',
    risks: [
      '向量库技术已标准化',
      'Embedding 模型可替换',
      '检索质量依赖上游数据质量',
    ],
  },
  
  // ========== 质量把控（钻石能力） ==========
  'review': {
    tier: 'diamond',
    tierLabel: '钻石能力',
    tierColor: '#00D4FF',
    industryDifficulty: 5,
    businessValue: 5,       // 业界公认最值钱
    defensibility: 5,       // 难以复制
    insight: '质量把控是业界公认最值钱的能力。审视校验能力需要深度领域知识和长期积累，是真正的护城河。',
    risks: [
      '需要持续投入领域专家',
      '规则体系需要不断迭代',
    ],
  },
  
  'safety': {
    tier: 'diamond',
    tierLabel: '钻石能力',
    tierColor: '#00D4FF',
    industryDifficulty: 4,
    businessValue: 5,
    defensibility: 4,
    insight: '安全合规是质量把控的重要组成部分，尤其在政务场景下，合规能力直接决定产品能否落地。',
    risks: [
      '政策变化需要快速响应',
      '敏感词库需要持续更新',
    ],
  },
  
  // ========== Prompt 工程与 Agent 编排（耗材） ==========
  'role-setting': {
    tier: 'consumable',
    tierLabel: '耗材能力',
    tierColor: '#FF6B6B',
    industryDifficulty: 2,
    businessValue: 2,
    defensibility: 1,
    insight: 'Prompt 工程是最被高估的部分。角色设定属于易耗品，随着模型迭代需要不断调整，且容易被复制。',
    risks: [
      'Prompt 是易耗品，需要持续维护',
      '模型升级可能导致 Prompt 失效',
      '竞争对手可以快速复制',
    ],
  },
  
  'context-orchestration': {
    tier: 'consumable',
    tierLabel: '耗材能力',
    tierColor: '#FF6B6B',
    industryDifficulty: 3,
    businessValue: 2,
    defensibility: 1,
    insight: 'Agent 流程编排同样被高估。编排逻辑可以被逆向工程，且随着 LLM 能力提升，复杂编排的价值在下降。',
    risks: [
      '编排逻辑可被逆向',
      'LLM 能力提升会降低编排价值',
      '框架和工具快速迭代',
    ],
  },
  
  'context-fusion': {
    tier: 'consumable',
    tierLabel: '耗材能力',
    tierColor: '#FF6B6B',
    industryDifficulty: 3,
    businessValue: 2,
    defensibility: 1,
    insight: '上下文融合是 Prompt 工程的一部分，Token 优化和优先级排序都是标准化技术。',
    risks: [
      '技术方案已标准化',
      '随着上下文窗口扩大，价值降低',
    ],
  },
  
  // ========== 真正的硬骨头 ==========
  'style-component': {
    tier: 'hardbone',
    tierLabel: '硬骨头',
    tierColor: '#FF4500',
    industryDifficulty: 5,
    businessValue: 4,
    defensibility: 3,
    insight: 'RAG 召回问题是真正的硬骨头。风格组件依赖 RAG 检索，而召回质量直接决定生成质量。这是当前 AI 应用的核心瓶颈。',
    risks: [
      'RAG 召回准确率难以保证',
      '长尾 query 召回效果差',
      '语义理解存在天花板',
    ],
  },
  
  'code-logic': {
    tier: 'hardbone',
    tierLabel: '硬骨头',
    tierColor: '#FF4500',
    industryDifficulty: 5,
    businessValue: 4,
    defensibility: 4,
    insight: '幻觉风控是另一个硬骨头。代码逻辑组件需要处理 LLM 的不确定性，确保输出的事实准确性。',
    risks: [
      'LLM 幻觉难以完全消除',
      '事实核查成本高',
      '领域知识边界模糊',
    ],
  },
  
  'data-cleaning': {
    tier: 'hardbone',
    tierLabel: '硬骨头',
    tierColor: '#FF4500',
    industryDifficulty: 5,
    businessValue: 4,
    defensibility: 4,
    insight: '数据清洗是被低估的硬骨头。脏数据进脏数据出，清洗质量直接决定下游所有环节的效果。这是真正的脏活累活。',
    risks: [
      '数据质量问题难以自动化解决',
      '领域特定的清洗规则需要专家知识',
      '数据异常检测需要持续迭代',
    ],
  },
};

/**
 * 能力价值分层说明
 */
export const CAPABILITY_TIER_DESCRIPTIONS = {
  gold: {
    label: '黄金能力',
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
    description: '技术难度最高，但商业价值反直觉地较低。知识体系虽然是黄金，但对手可以偷走。',
    icon: '🥇',
  },
  diamond: {
    label: '钻石能力',
    color: '#00D4FF',
    bgColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    description: '业界公认最值钱的能力，真正的护城河。质量把控能力难以复制，是核心竞争力。',
    icon: '💎',
  },
  consumable: {
    label: '耗材能力',
    color: '#FF6B6B',
    bgColor: 'rgba(255, 107, 107, 0.1)',
    borderColor: 'rgba(255, 107, 107, 0.3)',
    description: '最被高估的部分。Prompt 工程和 Agent 编排属于易耗品，随模型迭代需要不断调整。',
    icon: '🔋',
  },
  hardbone: {
    label: '硬骨头',
    color: '#FF4500',
    bgColor: 'rgba(255, 69, 0, 0.1)',
    borderColor: 'rgba(255, 69, 0, 0.3)',
    description: '真正的技术难点。RAG 召回问题和幻觉风控是决定产品成败的关键挑战。',
    icon: '🦴',
  },
};

/**
 * 获取节点的能力价值分析
 */
export function getCapabilityValueAnalysis(nodeId: string): CapabilityValueAnalysis | undefined {
  // 映射节点 ID 到能力分析
  const mapping: Record<string, string> = {
    'knowledge-base': 'knowledge-base',
    'vector-db': 'vector-db',
    'review': 'review',
    'safety': 'safety',
    'role-setting': 'role-setting',
    'context-orchestration': 'context-orchestration',
    'context-fusion': 'context-fusion',
    'style-component': 'style-component',
    'code-logic': 'code-logic',
  };
  
  const key = mapping[nodeId];
  return key ? CAPABILITY_VALUE_ANALYSIS[key] : undefined;
}

// ========== 辅助函数 ==========

/**
 * 根据模式获取所有节点
 */
export function getNodesByMode(mode: ViewMode): ArchNode[] {
  const allNodes = [...BLACK_BOX_NODES, ...WHITE_BOX_NODES];
  return allNodes.filter(node => node.visibleIn?.includes(mode));
}

/**
 * 根据模式获取所有连线
 */
export function getConnectionsByMode(mode: ViewMode): ArchConnection[] {
  const allConnections = [...CONNECTIONS, ...TECH_CONNECTIONS];
  return allConnections.filter(conn => conn.visibleIn.includes(mode));
}

/**
 * 获取外部服务（仅技术模式）
 */
export function getExternalServices(mode: ViewMode): ExternalService[] {
  return mode === 'technical' ? EXTERNAL_SERVICES : [];
}
