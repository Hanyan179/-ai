# Design Document

## Overview

本设计文档描述 Agent 工程化架构展示页面的重构方案。核心目标是将当前广告化的展示改为清晰的三模式架构图：黑盒模式（最简）、白盒模式（业务流程）、技术模式（底层原理）。

基于行业最佳实践设计，对标 OpenAI Agent Protocol、LangChain Agent Executor、Anthropic Context Engineering。

## Architecture

### 整体架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Architecture Page                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Mode Toggle                                │   │
│  │    [黑盒模式]  [白盒模式]  [技术模式]                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Diagram Container                          │   │
│  │                                                               │   │
│  │    根据当前模式渲染不同复杂度的架构图                           │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 三种模式的视图层级

```
技术模式 (最复杂)
    │
    │ 隐藏外部服务层、技术连线、技术栈详情
    ↓
白盒模式 (业务流程)
    │
    │ 隐藏内部组件、回流连线
    ↓
黑盒模式 (最简单)
```

## Components and Interfaces

### 0. 统一画布系统（核心重构）

#### 设计原则

当前问题：三种模式（BlackBoxView、WhiteBoxView、TechnicalView）各自定义独立的布局，导致：
- 布局不一致
- 连线混乱交叉
- 代码重复

解决方案：统一画布系统

```
┌─────────────────────────────────────────────────────────────────────┐
│                        UnifiedCanvas                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  所有节点和连线都在同一个画布上                                │   │
│  │  根据 mode 和 node.visibleIn 决定显示/隐藏                    │   │
│  │  布局位置统一定义在 architectureConstants.ts                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

#### UnifiedCanvas 组件接口

```typescript
interface UnifiedCanvasProps {
  mode: ViewMode;                    // 当前模式
  onNodeDrag?: (id: string, pos: Position) => void;  // 拖拽回调
}

// 内部状态
interface CanvasState {
  nodePositions: Record<string, Position>;  // 节点位置（可拖拽修改）
  zoom: number;                              // 缩放级别
  pan: Position;                             // 平移偏移
}
```

#### 分层布局系统

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Canvas (1400 x 900)                             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Layer 1: 入口层 (y: 40-200)                                          │   │
│  │   ┌──────────┐                                                       │   │
│  │   │ 业务入口  │ ← 黑盒模式: 显示为"用户输入"                          │   │
│  │   └────┬─────┘                                                       │   │
│  │        ↓                                                              │   │
│  │   ┌──────────┐                                                       │   │
│  │   │Agent输入 │                                                       │   │
│  │   └────┬─────┘                                                       │   │
│  └────────┼─────────────────────────────────────────────────────────────┘   │
│           ↓                                                                  │
│  ┌────────┼─────────────────────────────────────────────────────────────┐   │
│  │ Layer 2: 编排层 (y: 220-450)                                          │   │
│  │   ┌──────────────┐                                                    │   │
│  │   │ 上下文编排    │ ← 黑盒模式: 显示为"AI处理"                         │   │
│  │   └──────┬───────┘                                                    │   │
│  │          ↓                                                             │   │
│  │   ┌──────────┬──────────┬──────────┬──────────┐                       │   │
│  │   │角色设定  │代码逻辑  │风格组件  │记忆系统  │  ← 业务组件横向排列    │   │
│  │   └────┬─────┴────┬─────┴────┬─────┴────┬─────┘                       │   │
│  │        └──────────┴──────────┴──────────┘                             │   │
│  │                       ↓                                                │   │
│  │              ┌──────────────┐                                          │   │
│  │              │  编排融合    │                                          │   │
│  │              └──────┬───────┘                                          │   │
│  └─────────────────────┼────────────────────────────────────────────────┘   │
│                        ↓                                                     │
│  ┌─────────────────────┼────────────────────────────────────────────────┐   │
│  │ Layer 3: 输出层 (y: 470-700)                                          │   │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│  │   │审视校验  │→│安全合规  │→│  输出    │→│反馈闭环  │              │   │
│  │   └──────────┘  └──────────┘  └──────────┘  └────┬─────┘             │   │
│  │                                                   │                   │   │
│  │   ← ← ← ← ← ← ← ← 回流连线 ← ← ← ← ← ← ← ← ← ← ←┘                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Layer 4: 外部服务层 (x: 1100-1350, 仅技术模式)                        │   │
│  │   ┌──────────┐                                                        │   │
│  │   │ LLM API  │                                                        │   │
│  │   ├──────────┤                                                        │   │
│  │   │向量数据库│                                                        │   │
│  │   ├──────────┤                                                        │   │
│  │   │ 知识库   │                                                        │   │
│  │   ├──────────┤                                                        │   │
│  │   │规则引擎  │                                                        │   │
│  │   ├──────────┤                                                        │   │
│  │   │ 缓存层   │                                                        │   │
│  │   ├──────────┤                                                        │   │
│  │   │MAP 中台  │                                                        │   │
│  │   └──────────┘                                                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 统一布局常量

```typescript
// 统一的布局配置 - 所有模式共用
export const UNIFIED_LAYOUT = {
  canvas: {
    width: 1400,
    height: 900,
    padding: 40,
  },
  
  // Layer 1: 入口层
  entryLayer: {
    y: 40,
    centerX: 500,  // 主流程居中
    spacing: 100,  // 节点间距
  },
  
  // Layer 2: 编排层
  orchestrationLayer: {
    y: 220,
    centerX: 500,
    componentsY: 320,      // 业务组件 Y 坐标
    componentsStartX: 150, // 业务组件起始 X
    componentsSpacing: 220, // 业务组件间距
    fusionY: 430,          // 融合节点 Y 坐标
  },
  
  // Layer 3: 输出层
  outputLayer: {
    y: 530,
    startX: 100,
    spacing: 280,  // 横向节点间距
  },
  
  // Layer 4: 外部服务层 (仅技术模式)
  servicesLayer: {
    x: 1150,
    startY: 80,
    spacing: 110,
  },
  
  // 节点尺寸
  nodeSize: {
    stage: { width: 200, height: 100 },
    component: { width: 180, height: 90 },
    fusion: { width: 200, height: 80 },
    service: { width: 160, height: 80 },
  },
};
```

#### 正交连线算法

```typescript
/**
 * 正交连线路由算法
 * 生成只有水平和垂直线段的路径，避免交叉
 */
function generateOrthogonalPath(
  from: Position,
  to: Position,
  fromSide: 'top' | 'bottom' | 'left' | 'right',
  toSide: 'top' | 'bottom' | 'left' | 'right',
  type: ConnectionType
): string {
  const points: Position[] = [from];
  
  // 根据连线类型选择路由策略
  if (type === 'feedback') {
    // 回流连线：走左侧
    const leftX = Math.min(from.x, to.x) - 60;
    points.push({ x: from.x, y: from.y });
    points.push({ x: leftX, y: from.y });
    points.push({ x: leftX, y: to.y });
    points.push({ x: to.x, y: to.y });
  } else if (type === 'tech' || type === 'shared') {
    // 技术连线：走右侧
    const rightX = Math.max(from.x, to.x) + 30;
    points.push({ x: from.x, y: from.y });
    points.push({ x: rightX, y: from.y });
    points.push({ x: rightX, y: to.y });
    points.push({ x: to.x, y: to.y });
  } else {
    // 主流程连线：最短路径
    if (Math.abs(from.y - to.y) < 20) {
      // 水平连线
      points.push(to);
    } else if (Math.abs(from.x - to.x) < 20) {
      // 垂直连线
      points.push(to);
    } else {
      // L 形或 Z 形连线
      const midY = (from.y + to.y) / 2;
      points.push({ x: from.x, y: midY });
      points.push({ x: to.x, y: midY });
      points.push(to);
    }
  }
  
  // 生成 SVG path
  return points.map((p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');
}
```

#### 模式切换逻辑

```typescript
// 节点可见性判断
function isNodeVisible(node: ArchNode, mode: ViewMode): boolean {
  return node.visibleIn.includes(mode);
}

// 连线可见性判断
function isConnectionVisible(conn: ArchConnection, mode: ViewMode): boolean {
  return conn.visibleIn.includes(mode);
}

// 渲染逻辑
function renderCanvas(mode: ViewMode) {
  const allNodes = [...BLACK_BOX_NODES, ...WHITE_BOX_NODES];
  const allConnections = [...CONNECTIONS, ...TECH_CONNECTIONS];
  
  // 过滤可见节点和连线
  const visibleNodes = allNodes.filter(n => isNodeVisible(n, mode));
  const visibleConnections = allConnections.filter(c => isConnectionVisible(c, mode));
  
  // 渲染
  return (
    <svg>
      {visibleConnections.map(conn => <ConnectionLine key={conn.id} {...conn} />)}
      {visibleNodes.map(node => <NodeCard key={node.id} {...node} mode={mode} />)}
    </svg>
  );
}
```

### 1. 数据层组件

#### ArchitectureNode (节点数据结构)
```typescript
interface ArchitectureNode {
  id: string;
  type: 'stage' | 'component' | 'service' | 'fusion';
  
  // 基础信息（所有模式显示）
  title: string;
  
  // 白盒模式显示
  businessDesc: string;        // 业务描述（一句话）
  inputLabel: string;          // 输入数据标签
  outputLabel: string;         // 输出数据标签
  
  // 技术模式显示
  techStack: string[];         // 技术栈列表
  techDesc: string;            // 技术描述
  isSharedTech?: boolean;      // 是否共通技术
  
  // 布局
  position: { x: number; y: number };
  size: { width: number; height: number };
}
```

#### ArchitectureConnection (连线数据结构)
```typescript
interface ArchitectureConnection {
  id: string;
  from: string;                // 起始节点ID
  to: string;                  // 目标节点ID
  
  // 连线类型
  type: 'main' | 'feedback' | 'tech' | 'shared';
  // main: 主数据流（实线）
  // feedback: 回流闭环（虚线+箭头）
  // tech: 技术连接（技术模式显示）
  // shared: 共通技术连接（特殊颜色）
  
  // 数据标签
  dataLabel?: string;          // 连线上的数据类型标签
  
  // 可见性
  visibleIn: ('blackbox' | 'whitebox' | 'technical')[];
}
```

#### ArchitectureData (完整数据结构)
```typescript
interface ArchitectureData {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  externalServices: ExternalService[];  // 技术模式显示
}

interface ExternalService {
  id: string;
  name: string;
  desc: string;
  connectedTo: string[];       // 连接的模块ID列表
}
```

### 2. 视图层组件

#### ModeToggle
- 三个按钮：黑盒模式、白盒模式、技术模式
- 当前选中状态高亮
- 切换时触发图表重新渲染

#### DiagramContainer
- 根据当前模式过滤显示的节点和连线
- 管理缩放和平移
- 响应式布局

#### NodeCard
- 根据模式显示不同内容
- 黑盒：只显示标题
- 白盒：标题 + 业务描述 + 输入输出
- 技术：白盒内容 + 技术栈徽章

#### ConnectionLine
- 根据类型渲染不同样式
- 支持数据标签显示
- 支持 hover 显示详情

#### ExternalServicesLayer
- 仅技术模式显示
- 显示外部服务节点
- 显示与模块的连接线

## Data Models

### 完整的白盒流程（7个阶段）

基于需求分析，完整的白盒业务流程包含 7 个阶段：

```
┌─────────────┐
│  业务入口    │  Stage 1: 场景识别 + 意图识别
└──────┬──────┘
       ↓
┌─────────────┐
│ Agent 输入  │  Stage 2: 用户指令 + 用户素材
└──────┬──────┘
       ↓
┌─────────────────────────────────────────┐
│           上下文编排                      │  Stage 3
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │角色设定│ │代码逻辑│ │风格组件│ ...    │  业务组件（灵活组合）
│  └───┬────┘ └───┬────┘ └───┬────┘       │
│      └──────────┼──────────┘            │
│                 ↓                        │
│         ┌─────────────┐                  │
│         │  编排融合    │                  │
│         └─────────────┘                  │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────┐
│  审视校验    │  Stage 4: 自我批判 + 一致性检查
└──────┬──────┘
       ↓
┌─────────────┐
│  安全合规    │  Stage 5: 敏感词 + 格式 + 政治合规
└──────┬──────┘
       ↓
┌─────────────┐
│    输出      │  Stage 6: 生成结果
└──────┬──────┘
       ↓
┌─────────────┐
│  反馈闭环    │  Stage 7: 用户反馈 → 回流优化
└──────┬──────┘
       │
       └──────────────────────────────────→ 回流到记忆系统/风格组件/业务入口
```

### 黑盒模式数据

最简单的视图，普通用户理解的"提示词"工作方式：

```typescript
const BLACK_BOX_NODES = [
  {
    id: 'user-input',
    type: 'stage',
    title: '用户输入',
    businessDesc: '用户的指令和素材'
  },
  {
    id: 'ai-process',
    type: 'stage',
    title: 'AI 处理',
    businessDesc: '（内部过程不可见）'
  },
  {
    id: 'result-output',
    type: 'stage',
    title: '输出结果',
    businessDesc: '生成的内容'
  }
];
```

### 白盒模式数据（完整业务流程 - 7个阶段）

```typescript
const WHITE_BOX_NODES = [
  // Stage 1: 业务入口
  {
    id: 'entry',
    type: 'stage',
    title: '业务入口',
    businessDesc: '用户选择业务场景，系统识别意图',
    inputLabel: '用户选择 / 自然语言',
    outputLabel: '场景ID + 意图'
  },
  
  // Stage 2: Agent 输入
  {
    id: 'agent-input',
    type: 'stage',
    title: 'Agent 输入',
    businessDesc: '接收用户指令和素材文件',
    inputLabel: '指令文本 + 文件',
    outputLabel: '结构化输入'
  },
  
  // Stage 3: 上下文编排
  {
    id: 'context-orchestration',
    type: 'stage',
    title: '上下文编排',
    businessDesc: '组装 AI 需要的所有上下文信息',
    inputLabel: '结构化输入',
    outputLabel: '完整上下文'
  },
  
  // 业务组件（灵活组合，不同场景可能不同）
  {
    id: 'role-setting',
    type: 'component',
    title: '角色设定',
    businessDesc: '定义 AI 的身份和行为边界'
  },
  {
    id: 'code-logic',
    type: 'component',
    title: '代码逻辑',
    businessDesc: '确定性的业务规则和处理流程'
  },
  {
    id: 'style-component',
    type: 'component',
    title: '风格组件',
    businessDesc: '检索匹配的风格示例和规范'
  },
  {
    id: 'memory-system',
    type: 'component',
    title: '记忆系统',
    businessDesc: '历史对话和用户偏好'
  },
  
  // 编排融合
  {
    id: 'context-fusion',
    type: 'fusion',
    title: '编排融合',
    businessDesc: '将所有组件产出组装成最终 Prompt'
  },
  
  // Stage 4: 审视校验
  {
    id: 'review',
    type: 'stage',
    title: '审视校验',
    businessDesc: '像老秘书一样自我检查，发现逻辑漏洞和数据不一致',
    inputLabel: '初稿',
    outputLabel: '修正后的稿件'
  },
  
  // Stage 5: 安全合规
  {
    id: 'safety',
    type: 'stage',
    title: '安全合规',
    businessDesc: '敏感词检查、格式规范、政治合规',
    inputLabel: '修正稿',
    outputLabel: '合规内容'
  },
  
  // Stage 6: 输出
  {
    id: 'output',
    type: 'stage',
    title: '输出',
    businessDesc: '生成最终结果',
    inputLabel: '合规内容',
    outputLabel: '最终文档'
  },
  
  // Stage 7: 反馈闭环
  {
    id: 'feedback',
    type: 'stage',
    title: '反馈闭环',
    businessDesc: '收集用户反馈，优化系统',
    inputLabel: '用户反馈 / 修改',
    outputLabel: '学习信号'
  }
];
```



### 真实业务场景示例：《工作计划》生成

以下展示真实的 Prompt 模板如何映射到架构的各个组件，以《工作计划》文种为例：

#### 场景说明
用户请求：「给我按照这些数据做一个工作计划」

#### 组件与 Prompt 映射

```typescript
const WORK_PLAN_EXAMPLE = {
  // 文种类型
  documentType: '工作计划',
  
  // ========== 角色设定组件 ==========
  roleComponent: {
    promptSection: '### 角色定位 + ### 核心任务',
    content: `你是一名资深政务文书撰写专家，站位高、视野宽、把关严、笔力深。
    
作为精通政府工作规划与部署的专家，你的核心任务是：严格遵循以下指令，
基于用户提供的素材和输入要求，起草一份目标明确、任务具体、措施可行、
语言凝练的《工作计划》。`,
    output: '角色上下文块（专家身份 + 行为边界）'
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
    output: '逻辑约束规则（处理优先级 + 决策树）'
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
    output: '风格上下文块（公文规范词汇 + 句式模板）'
  },
  
  // ========== 记忆系统 ==========
  memorySystem: {
    content: `- 用户历史偏好：之前生成的文档风格、常用表述
- 修改记录：用户对之前输出的修改反馈
- 对话历史：当前会话的上下文`,
    output: '记忆上下文块（个性化信息）'
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
    output: '最终 Prompt（发送给 LLM）'
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

××××年××月××日`
  }
};
```

#### 不同文种的组件差异

| 文种 | 角色设定差异 | 代码逻辑差异 | 风格组件差异 |
|------|-------------|-------------|-------------|
| 工作计划 | 强调"前瞻性、指导性" | 处理流程：背景→目标→任务→措施→保障 | 部署性词汇：力争、确保、扎实推进 |
| 工作总结 | 强调"客观性、概括性" | 处理流程：概述→工作→问题→经验→计划 | 汇报性词汇：取得成效、存在不足、深刻认识 |
| 通知 | 强调"权威性、时效性" | 处理流程：缘由→事项→要求→落款 | 指令性词汇：务必、严格、按时、特此通知 |
| 意见 | 强调"指导性、可操作性" | 处理流程：总体要求→任务→保障→实施 | 政策性词汇：坚持、统筹、健全、确保落实 |
| 纪要 | 强调"纪实性、提要性" | 处理流程：概况→共识→决议→部署 | 会议性词汇：会议认为、会议决定、会议要求 |

### 技术模式数据

技术模式 = 白盒模式 + 技术栈详情 + 外部服务连线

```typescript
// 每个节点的技术详情
const TECH_DETAILS: Record<string, TechDetail> = {
  'entry': {
    techStack: ['Intent Classification', 'Router Pattern', 'NLU'],
    techDesc: '基于意图分类模型识别用户场景，路由到对应处理流程',
    implementation: 'FastAPI + 意图分类模型 + 场景路由表'
  },
  
  'agent-input': {
    techStack: ['Document Parsing', 'OCR', 'Chunking', 'Embedding'],
    techDesc: '解析 PDF/Word 文档，OCR 识别图片文字，切分文本块',
    implementation: 'PyMuPDF + Tesseract OCR + LangChain TextSplitter'
  },
  
  'role-setting': {
    techStack: ['System Prompt Template', 'Constitutional AI', 'Role Boundary'],
    techDesc: '基于 Anthropic Constitutional AI 模式定义角色约束',
    implementation: 'Jinja2 模板 + 角色配置 YAML',
    promptMapping: {
      section: '### 角色定位 + ### 核心任务',
      example: '你是一名资深政务文书撰写专家，站位高、视野宽、把关严、笔力深...'
    }
  },
  
  'code-logic': {
    techStack: ['Rule Engine', 'Decision Tree', 'Workflow DSL'],
    techDesc: '确定性逻辑优先于概率生成，代码定义业务规则',
    implementation: 'Python Rule Engine + JSON Schema 校验',
    promptMapping: {
      section: '### 输入信息处理流程',
      example: '1、首要信息来源：综合用户指令与素材...\n2、补充与校准依据...\n3、处理原则：指令优先、信息整合...'
    }
  },
  
  'style-component': {
    techStack: ['RAG', 'Few-shot Examples', 'Vector Search', 'Style Transfer'],
    techDesc: '检索增强生成，从向量库检索风格示例',
    implementation: 'LangChain RAG + Milvus 向量检索',
    isSharedTech: true,
    promptMapping: {
      section: '### 公文常用词汇与风格（<style>标签包裹）',
      example: '一、核心词汇集（按功能场景分类）\n1、关于指导思想与原则：以……为指导...'
    }
  },
  
  'memory-system': {
    techStack: ['Short-term Memory', 'Long-term Memory', 'Vector Store', 'Session Cache'],
    techDesc: '对话历史 + 用户偏好向量存储，参考 MemGPT 模式',
    implementation: 'Redis (短期) + Milvus (长期) + MemGPT 架构',
    isSharedTech: true
  },
  
  'context-fusion': {
    techStack: ['Context Window Management', 'Priority Ranking', 'Token Optimization'],
    techDesc: '上下文窗口管理，优先级排序，Token 优化',
    implementation: 'tiktoken 计数 + 优先级队列 + 动态裁剪',
    isSharedTech: true
  },
  
  'review': {
    techStack: ['Chain of Thought', 'Self-Critique', 'Fact Check'],
    techDesc: '思维链校验、自我批判，检查逻辑漏洞和数据一致性',
    implementation: 'CoT Prompting + Critic Model'
  },
  
  'safety': {
    techStack: ['DFA Filter', 'Regex Validation', 'Content Safety'],
    techDesc: '敏感词过滤、格式校验、政治合规检查',
    implementation: 'DFA 敏感词库 + 正则校验器 + 内容安全 API'
  },
  
  'output': {
    techStack: ['Streaming Output', 'Format Validation', 'Markdown Render'],
    techDesc: '流式输出，格式校验，Markdown 渲染',
    implementation: 'SSE 流式传输 + 格式校验器',
    isSharedTech: true
  },
  
  'feedback': {
    techStack: ['RLHF Signal', 'Preference Learning', 'A/B Testing'],
    techDesc: '收集用户反馈信号，更新记忆系统和风格组件',
    implementation: '反馈收集 API + 偏好学习模型'
  }
};

// 外部服务层（仅技术模式显示）
const EXTERNAL_SERVICES: ExternalService[] = [
  {
    id: 'llm-api',
    name: 'LLM API',
    desc: '大模型接口（GPT-4/Claude/DeepSeek）',
    connectedTo: ['context-fusion', 'output', 'review'],
    techDetail: 'OpenAI API / Anthropic API / 私有化部署'
  },
  {
    id: 'vector-db',
    name: '向量数据库',
    desc: '存储 Embedding 向量',
    connectedTo: ['style-component', 'memory-system'],
    techDetail: 'Milvus / Pinecone / Weaviate'
  },
  {
    id: 'knowledge-base',
    name: '知识库',
    desc: '结构化知识存储（公文模板、规范文档）',
    connectedTo: ['style-component', 'code-logic'],
    techDetail: 'Elasticsearch + 文档管理系统'
  },
  {
    id: 'rule-engine',
    name: '规则引擎',
    desc: '业务规则配置（公文格式规范）',
    connectedTo: ['code-logic', 'safety'],
    techDetail: 'Drools / 自研规则引擎'
  },
  {
    id: 'cache',
    name: '缓存层',
    desc: '会话缓存、热点数据',
    connectedTo: ['memory-system', 'context-fusion'],
    techDetail: 'Redis Cluster'
  },
  {
    id: 'map-platform',
    name: 'MAP 中台',
    desc: '智能体编排 Workflow（待对接）',
    connectedTo: ['entry', 'context-orchestration'],
    techDetail: '公司 MAP 平台 API'
  }
];
```



### 连线数据

```typescript
const CONNECTIONS: ArchitectureConnection[] = [
  // ========== 黑盒模式连线 ==========
  { id: 'b1', from: 'user-input', to: 'ai-process', type: 'main', dataLabel: '用户请求', visibleIn: ['blackbox'] },
  { id: 'b2', from: 'ai-process', to: 'result-output', type: 'main', dataLabel: '处理结果', visibleIn: ['blackbox'] },
  
  // ========== 白盒模式主流程连线（7阶段） ==========
  { id: 'w1', from: 'entry', to: 'agent-input', type: 'main', dataLabel: '场景+意图', visibleIn: ['whitebox', 'technical'] },
  { id: 'w2', from: 'agent-input', to: 'context-orchestration', type: 'main', dataLabel: '结构化输入', visibleIn: ['whitebox', 'technical'] },
  
  // 上下文编排 → 业务组件（灵活组合）
  { id: 'w3', from: 'context-orchestration', to: 'role-setting', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w4', from: 'context-orchestration', to: 'code-logic', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w5', from: 'context-orchestration', to: 'style-component', type: 'main', visibleIn: ['whitebox', 'technical'] },
  { id: 'w6', from: 'context-orchestration', to: 'memory-system', type: 'main', visibleIn: ['whitebox', 'technical'] },
  
  // 组件间协作关系（组件产出之间可能有互相关系）
  { id: 'w7', from: 'role-setting', to: 'code-logic', type: 'main', dataLabel: '角色约束', visibleIn: ['whitebox', 'technical'] },
  { id: 'w8', from: 'code-logic', to: 'style-component', type: 'main', dataLabel: '逻辑边界', visibleIn: ['whitebox', 'technical'] },
  { id: 'w9', from: 'style-component', to: 'memory-system', type: 'main', dataLabel: '风格偏好查询', visibleIn: ['whitebox', 'technical'] },
  
  // 业务组件 → 上下文融合
  { id: 'w10', from: 'role-setting', to: 'context-fusion', type: 'main', dataLabel: '角色上下文', visibleIn: ['whitebox', 'technical'] },
  { id: 'w11', from: 'code-logic', to: 'context-fusion', type: 'main', dataLabel: '逻辑约束', visibleIn: ['whitebox', 'technical'] },
  { id: 'w12', from: 'style-component', to: 'context-fusion', type: 'main', dataLabel: '风格示例', visibleIn: ['whitebox', 'technical'] },
  { id: 'w13', from: 'memory-system', to: 'context-fusion', type: 'main', dataLabel: '记忆上下文', visibleIn: ['whitebox', 'technical'] },
  
  // 新增阶段：审视校验 + 安全合规
  { id: 'w14', from: 'context-fusion', to: 'review', type: 'main', dataLabel: '初稿', visibleIn: ['whitebox', 'technical'] },
  { id: 'w15', from: 'review', to: 'safety', type: 'main', dataLabel: '修正稿', visibleIn: ['whitebox', 'technical'] },
  { id: 'w16', from: 'safety', to: 'output', type: 'main', dataLabel: '合规内容', visibleIn: ['whitebox', 'technical'] },
  { id: 'w17', from: 'output', to: 'feedback', type: 'main', dataLabel: '最终结果', visibleIn: ['whitebox', 'technical'] },
  
  // ========== 回流闭环连线（虚线） ==========
  { id: 'f1', from: 'feedback', to: 'memory-system', type: 'feedback', dataLabel: '学习信号', visibleIn: ['whitebox', 'technical'] },
  { id: 'f2', from: 'feedback', to: 'style-component', type: 'feedback', dataLabel: '风格偏好更新', visibleIn: ['whitebox', 'technical'] },
  { id: 'f3', from: 'feedback', to: 'entry', type: 'feedback', dataLabel: '继续对话', visibleIn: ['whitebox', 'technical'] },
  
  // ========== 技术模式额外连线 ==========
  { id: 't1', from: 'llm-api', to: 'context-fusion', type: 'tech', dataLabel: 'API 调用', visibleIn: ['technical'] },
  { id: 't2', from: 'llm-api', to: 'output', type: 'tech', dataLabel: '流式响应', visibleIn: ['technical'] },
  { id: 't3', from: 'llm-api', to: 'review', type: 'tech', dataLabel: 'CoT 校验', visibleIn: ['technical'] },
  { id: 't4', from: 'vector-db', to: 'style-component', type: 'shared', dataLabel: '向量检索', visibleIn: ['technical'] },
  { id: 't5', from: 'vector-db', to: 'memory-system', type: 'shared', dataLabel: '向量存储', visibleIn: ['technical'] },
  { id: 't6', from: 'knowledge-base', to: 'style-component', type: 'tech', dataLabel: '知识检索', visibleIn: ['technical'] },
  { id: 't7', from: 'knowledge-base', to: 'code-logic', type: 'tech', dataLabel: '规则查询', visibleIn: ['technical'] },
  { id: 't8', from: 'rule-engine', to: 'code-logic', type: 'tech', dataLabel: '规则执行', visibleIn: ['technical'] },
  { id: 't9', from: 'rule-engine', to: 'safety', type: 'tech', dataLabel: '合规规则', visibleIn: ['technical'] },
  { id: 't10', from: 'cache', to: 'memory-system', type: 'tech', dataLabel: '会话缓存', visibleIn: ['technical'] },
  { id: 't11', from: 'cache', to: 'context-fusion', type: 'tech', dataLabel: '热点缓存', visibleIn: ['technical'] },
  { id: 't12', from: 'map-platform', to: 'entry', type: 'tech', dataLabel: 'Workflow 触发', visibleIn: ['technical'] },
  { id: 't13', from: 'map-platform', to: 'context-orchestration', type: 'tech', dataLabel: '编排配置', visibleIn: ['technical'] }
];
```

### 视觉设计规范

```typescript
// 连线样式
const LINE_STYLES = {
  main: {
    stroke: '#60A5FA',      // 蓝色 - 主数据流
    strokeWidth: 2,
    strokeDasharray: 'none',
    markerEnd: 'arrow'
  },
  feedback: {
    stroke: '#34D399',      // 绿色 - 回流闭环
    strokeWidth: 1.5,
    strokeDasharray: '5,5', // 虚线
    markerEnd: 'arrow'
  },
  tech: {
    stroke: '#A78BFA',      // 紫色 - 技术连接
    strokeWidth: 1,
    strokeDasharray: 'none',
    markerEnd: 'arrow'
  },
  shared: {
    stroke: '#F59E0B',      // 橙色 - 共通技术
    strokeWidth: 1.5,
    strokeDasharray: 'none',
    markerEnd: 'arrow'
  }
};

// 节点样式
const NODE_STYLES = {
  stage: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)',
    border: '1px solid #3B82F6',
    borderRadius: '12px'
  },
  component: {
    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    border: '1px solid #6366F1',
    borderRadius: '8px'
  },
  fusion: {
    background: 'linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)',
    border: '2px solid #8B5CF6',
    borderRadius: '16px'
  },
  service: {
    background: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)',
    border: '1px solid #10B981',
    borderRadius: '8px'
  }
};
```

### 布局规范

```typescript
// 白盒模式布局（垂直流程 + 组件区域 + 新增阶段）
const WHITE_BOX_LAYOUT = {
  direction: 'vertical',
  stages: {
    'entry': { x: 400, y: 50 },
    'agent-input': { x: 400, y: 130 },
    'context-orchestration': { x: 400, y: 210 }
  },
  components: {
    // 业务组件横向排列
    'role-setting': { x: 100, y: 300 },
    'code-logic': { x: 280, y: 300 },
    'style-component': { x: 460, y: 300 },
    'memory-system': { x: 640, y: 300 }
  },
  fusion: {
    'context-fusion': { x: 400, y: 400 }
  },
  // 新增阶段
  review: {
    'review': { x: 400, y: 480 }
  },
  safety: {
    'safety': { x: 400, y: 560 }
  },
  output: {
    'output': { x: 400, y: 640 },
    'feedback': { x: 400, y: 720 }
  }
};

// 技术模式布局（白盒 + 外部服务层）
const TECHNICAL_LAYOUT = {
  ...WHITE_BOX_LAYOUT,
  externalServices: {
    // 外部服务在右侧垂直排列
    'llm-api': { x: 850, y: 440 },
    'vector-db': { x: 850, y: 300 },
    'knowledge-base': { x: 850, y: 210 },
    'rule-engine': { x: 850, y: 520 },
    'cache': { x: 850, y: 360 },
    'map-platform': { x: 850, y: 130 }
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: 文案无营销术语

*For any* text content displayed in the architecture diagram, the text SHALL NOT contain any marketing phrases from the blocklist (e.g., "越用越懂", "人力倍增器", "语义化学反应", "深度解耦").

**Validates: Requirements 7.1**

### Property 2: 数据结构完整性

*For any* node in the architecture data, the node SHALL contain all required fields: id, type, title, businessDesc, inputLabel, outputLabel. For technical mode, nodes SHALL additionally contain techStack and techDesc.

**Validates: Requirements 6.1-6.9**

### Property 3: 模式可见性一致性

*For any* connection in the architecture data, if the connection's visibleIn array contains the current mode, the connection SHALL be rendered; otherwise it SHALL be hidden.

**Validates: Requirements 3.2, 3.3, 3.4**

### Property 4: 连线类型样式映射

*For any* rendered connection, the visual style (solid/dashed/color) SHALL match its type: main→实线蓝色, feedback→虚线绿色, tech→细实线紫色, shared→实线橙色.

**Validates: Requirements 5.3**

### Property 5: 7阶段流程完整性

*For any* white-box mode rendering, the diagram SHALL display all 7 stages in correct order: 业务入口 → Agent输入 → 上下文编排 → 审视校验 → 安全合规 → 输出 → 反馈闭环.

**Validates: Requirements 4.3**

## Error Handling

### 数据加载错误
- 如果架构数据加载失败，显示友好的错误提示
- 提供重试按钮

### 模式切换错误
- 如果切换模式时渲染失败，保持当前模式不变
- 在控制台记录错误信息

### 布局计算错误
- 如果节点位置计算失败，使用默认布局
- 确保图表始终可见

## Testing Strategy

### 单元测试
- 测试数据结构验证函数
- 测试模式切换逻辑
- 测试连线过滤逻辑

### 属性测试
- Property 1: 遍历所有文案，验证无营销术语
- Property 2: 验证所有节点数据结构完整
- Property 3: 验证模式切换时连线可见性正确
- Property 4: 验证连线样式与类型匹配
- Property 5: 验证白盒模式包含完整7阶段

### 集成测试
- 测试三种模式切换的完整流程
- 测试 hover 交互显示详情
- 测试响应式布局

### 视觉测试
- 截图对比三种模式的渲染结果
- 验证连线样式正确
