export interface SectionProps {
  id: string;
}

export interface StatItem {
  label: string;
  value: string;
  sub: string;
}

export interface InsightItem {
  title: string;
  desc: string;
}

export interface RoadmapStep {
  phase: string;
  name: string;
  desc: string;
  action: string;
}

export interface StrategyData {
  title: string;
  subtitle: string;
  analogy: {
    title: string;
    engine: string;
    fuel: string;
    desc: string;
  };
  databricks: {
    title: string;
    problem: string;
    solution: string;
    result: string;
  };
  moat: {
    title: string;
    content: string;
  };
}

export interface ProfileData {
  name: string;
  role: string;
  slogan: string;
  standards: {
    key: string; // e.g., "善思"
    title: string; // e.g., "Thinking"
    desc: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  images: string[];
  video?: string; // Optional URL for video demo (mp4/webm)
  link?: string; // Optional link property
}

export interface CapabilityItem {
  title: string;
  icon: string; // lucide icon name
  desc: string;
  color: string;
}

export interface EngineerDefnData {
  title: string;
  desc: string;
  triad: CapabilityItem[];
}

export interface ProductDefData {
  title: string;
  subtitle: string;
  philosophy: { label: string; desc: string }[];
  techStack: {
    skill: string;
    skillDesc: string;
    agent: string;
    agentDesc: string;
  };
}

// New Interface for MVP Deep Dive
export interface MVPAnalysisData {
  comparison: {
    current: {
      title: string;
      points: string[];
    };
    mvp: {
      title: string;
      points: string[];
    };
  };
  future: {
    title: string;
    items: {
      label: string;
      status: string; // e.g., "MVP Missing"
      desc: string;
    }[];
  };
}


// ========== Architecture Diagram Types ==========

/**
 * 视图模式类型
 * - blackbox: 黑盒模式 - 最简化视图
 * - whitebox: 白盒模式 - 完整业务流程
 * - technical: 技术模式 - 底层技术细节
 */
export type ViewMode = 'blackbox' | 'whitebox' | 'technical';

/**
 * 节点类型
 * - stage: 流程阶段节点
 * - component: 业务组件节点
 * - service: 外部服务节点
 * - fusion: 融合节点
 */
export type NodeType = 'stage' | 'component' | 'service' | 'fusion';

/**
 * 连线类型
 * - main: 主数据流（蓝色实线）
 * - feedback: 回流闭环（绿色虚线）
 * - tech: 技术连接（紫色细线）
 * - shared: 共通技术连接（橙色）
 */
export type ConnectionType = 'main' | 'feedback' | 'tech' | 'shared';

/**
 * 节点位置
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * 节点尺寸
 */
export interface NodeSize {
  width: number;
  height: number;
}

/**
 * Prompt 映射信息（技术模式显示）
 */
export interface PromptMapping {
  section: string;    // Prompt 中的章节名
  example: string;    // 示例内容
}

/**
 * 架构节点数据结构
 */
export interface ArchNode {
  id: string;
  type: NodeType;
  
  // 基础信息（所有模式显示）
  title: string;
  
  // 白盒模式显示
  businessDesc: string;        // 业务描述（一句话）
  inputLabel?: string;         // 输入数据标签
  outputLabel?: string;        // 输出数据标签
  
  // 技术模式显示
  techStack?: string[];        // 技术栈列表
  techDesc?: string;           // 技术描述
  implementation?: string;     // 具体实现方案
  isSharedTech?: boolean;      // 是否共通技术
  promptMapping?: PromptMapping; // Prompt 映射（角色设定、代码逻辑、风格组件）
  
  // 布局
  position?: NodePosition;
  size?: NodeSize;
  
  // 可见性控制
  visibleIn?: ViewMode[];      // 在哪些模式下可见
}

/**
 * 架构连线数据结构
 */
export interface ArchConnection {
  id: string;
  from: string;                // 起始节点ID
  to: string;                  // 目标节点ID
  
  // 连线类型
  type: ConnectionType;
  
  // 数据标签
  dataLabel?: string;          // 连线上的数据类型标签
  
  // 可见性
  visibleIn: ViewMode[];       // 在哪些模式下可见
}

/**
 * 外部服务数据结构
 */
export interface ExternalService {
  id: string;
  name: string;
  desc: string;
  connectedTo: string[];       // 连接的模块ID列表
  techDetail?: string;         // 技术细节
  position?: NodePosition;     // 布局位置
}

/**
 * 完整架构数据结构
 */
export interface ArchitectureData {
  nodes: ArchNode[];
  connections: ArchConnection[];
  externalServices: ExternalService[];
}

/**
 * 模式配置
 */
export interface ModeConfig {
  id: ViewMode;
  label: string;
  desc: string;
}

/**
 * 连线样式配置
 */
export interface LineStyle {
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  markerEnd: string;
}

/**
 * 节点样式配置
 */
export interface NodeStyle {
  background: string;
  border: string;
  borderRadius: string;
}
