// AI Coding Demo Types

export interface SkillInfo {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'dsfa' | 'p2340' | 'general';
  content: string; // markdown content
  references?: string[];
  sourcePath?: string; // path to the actual SKILL.md file
}

export interface ScenarioItem {
  name: string;
  frequency: '高' | '中' | '低';
  patternFixed: boolean;
  aiCapable: boolean;
  status: 'done' | 'next' | 'no';
  statusLabel: string;
}

export interface ToolInfo {
  name: string;
  vendor: string;
  free: string;
  paid: string;
  note: string;
  tier: number;        // 推荐层级：1=基础, 2=进阶, 3=最优
  requirement: string; // 使用前提条件
  aiModel?: string;    // 可用的 AI 模型
}

export interface DemoOutput {
  name: string;
  desc: string;
  lines: number;
  rounds?: number;                    // 交互轮次
  myWords?: { round: number; text: string }[];  // 每轮我对 AI 说的原话
  skillsUsed?: string[];              // 用到的 skills 文件
  aiSteps?: string[];                 // AI 的操作步骤
  files?: string[];                   // 涉及的文件
  note?: string;                      // 补充说明
}
