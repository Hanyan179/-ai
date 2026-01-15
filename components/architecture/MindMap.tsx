import React, { useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  NodeProps,
  ConnectionLineType,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * 企业级 AI Agent 能力架构图
 * 标准 8 层架构：感知 → 记忆 → 知识 → 规划 → 工具 → 执行 → 反思 → 输出
 */

type NodeStatus = 'ready' | 'building' | 'planned';

interface MindMapNodeData {
  label: string;
  sub?: string;
  status?: NodeStatus;
  tech?: string[];
  company?: string;
  level: number;
  category?: string;
}

// 8层架构颜色系统
const themes: Record<string, { border: string; text: string }> = {
  core: { border: '#3b82f6', text: '#60a5fa' },           // 中心
  perception: { border: '#22c55e', text: '#4ade80' },     // 感知层 - 绿色
  memory: { border: '#8b5cf6', text: '#a78bfa' },         // 记忆层 - 紫色
  knowledge: { border: '#f97316', text: '#fb923c' },      // 知识层 - 橙色
  planning: { border: '#ec4899', text: '#f472b6' },       // 规划层 - 粉色
  tool: { border: '#06b6d4', text: '#22d3ee' },           // 工具层 - 青色
  execution: { border: '#3b82f6', text: '#60a5fa' },      // 执行层 - 蓝色
  reflection: { border: '#ef4444', text: '#f87171' },     // 反思层 - 红色
  output: { border: '#eab308', text: '#facc15' },         // 输出层 - 黄色
  infra: { border: '#64748b', text: '#94a3b8' },          // 基础设施 - 灰色
};

// 能力价值分层标识 - 按8层架构重新定义
const valueTiers: Record<string, { tier: string; icon: string; color: string; desc: string }> = {
  perception: { tier: 'hardbone', icon: '🦴', color: '#FF4500', desc: '硬骨头 - 多模态理解是核心挑战' },
  memory: { tier: 'diamond', icon: '💎', color: '#00D4FF', desc: '钻石能力 - 记忆系统是差异化关键' },
  knowledge: { tier: 'gold', icon: '🥇', color: '#FFD700', desc: '黄金能力 - 技术难但易被复制' },
  planning: { tier: 'diamond', icon: '💎', color: '#00D4FF', desc: '钻石能力 - 规划能力决定Agent智能程度' },
  tool: { tier: 'consumable', icon: '🔋', color: '#FF6B6B', desc: '耗材能力 - 标准化接口' },
  execution: { tier: 'hardbone', icon: '🦴', color: '#FF4500', desc: '硬骨头 - RAG召回/幻觉是核心挑战' },
  reflection: { tier: 'diamond', icon: '💎', color: '#00D4FF', desc: '钻石能力 - 质量把控是护城河' },
  output: { tier: 'consumable', icon: '🔋', color: '#FF6B6B', desc: '耗材能力 - 格式化输出' },
};

const statusDot = { ready: '#22c55e', building: '#eab308', planned: '#64748b' };

// 节点组件
const MindMapNode: React.FC<NodeProps<MindMapNodeData>> = ({ data, selected }) => {
  const theme = themes[data.category || 'infra'];
  const isCenter = data.level === 0;
  const isMain = data.level === 1;
  const valueTier = data.level === 1 ? valueTiers[data.category || ''] : undefined;
  
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-105' : ''}`}
      style={{
        background: '#0f172a',
        border: `${isCenter ? 2 : 1.5}px solid ${selected ? '#fff' : theme.border}`,
        borderRadius: isCenter ? 14 : 8,
        padding: isCenter ? '16px 24px' : isMain ? '10px 16px' : '6px 10px',
        minWidth: isCenter ? 120 : isMain ? 80 : 60,
        boxShadow: selected ? `0 0 16px ${theme.border}44` : '0 2px 6px #00000022',
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-700 !w-1 !h-1 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-slate-700 !w-1 !h-1 !border-0" />
      <Handle type="target" position={Position.Top} className="!bg-slate-700 !w-1 !h-1 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-700 !w-1 !h-1 !border-0" />
      
      {data.status && (
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: statusDot[data.status] }} />
      )}
      
      {data.company && (
        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-emerald-500" />
      )}
      
      {valueTier && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] font-medium whitespace-nowrap"
          style={{ 
            backgroundColor: `${valueTier.color}22`,
            border: `1px solid ${valueTier.color}44`,
            color: valueTier.color,
          }}
          title={valueTier.desc}
        >
          {valueTier.icon} {valueTier.tier === 'diamond' ? '护城河' : valueTier.tier === 'gold' ? '易复制' : valueTier.tier === 'hardbone' ? '硬骨头' : '耗材'}
        </div>
      )}
      
      <div className="text-center">
        <div className={`font-medium ${isCenter ? 'text-sm' : isMain ? 'text-xs' : 'text-[10px]'}`} style={{ color: theme.text }}>
          {data.label}
        </div>
        {data.sub && <div className="text-slate-600 text-[9px] mt-0.5">{data.sub}</div>}
        {data.tech && data.level >= 2 && (
          <div className="text-slate-700 text-[8px] mt-0.5">{data.tech.slice(0, 2).join('·')}</div>
        )}
      </div>
    </div>
  );
};

const nodeTypes = { mindmap: MindMapNode };

// 生成标准8层Agent架构
const generateArchitecture = () => {
  const nodes: Node<MindMapNodeData>[] = [];
  const edges: Edge[] = [];
  const cx = 800, cy = 500;
  
  const addNode = (id: string, x: number, y: number, data: MindMapNodeData) => {
    nodes.push({ id, type: 'mindmap', position: { x, y }, data });
  };
  const addEdge = (source: string, target: string, color: string, animated = false) => {
    edges.push({ id: `${source}-${target}`, source, target, type: 'smoothstep', style: { stroke: color, strokeWidth: 1 }, animated });
  };

  // ========== 中心节点 ==========
  addNode('agent', cx - 60, cy - 25, { label: '公文 Agent', level: 0, status: 'building', category: 'core' });

  // ========== 1. 感知层 Perception (左上) ==========
  const p1x = cx - 450, p1y = cy - 280;
  addNode('perception', p1x, p1y, { label: '感知层', sub: 'Perception', level: 1, status: 'building', category: 'perception' });
  addEdge('agent', 'perception', '#22c55e', true);
  
  const perceptionItems = [
    { id: 'p-intent', label: '意图识别', tech: ['BERT', 'GPT'], status: 'building' as NodeStatus, y: -70 },
    { id: 'p-classify', label: '公文分类', tech: ['FastText'], status: 'ready' as NodeStatus, company: '分类模型', y: -30 },
    { id: 'p-entity', label: '实体提取', tech: ['NER'], status: 'planned' as NodeStatus, y: 10 },
    { id: 'p-multimodal', label: '多模态输入', tech: ['OCR', 'ASR'], status: 'building' as NodeStatus, y: 50 },
    { id: 'p-clarify', label: '澄清追问', tech: ['对话管理'], status: 'planned' as NodeStatus, y: 90 },
  ];
  perceptionItems.forEach(c => {
    addNode(c.id, p1x - 140, p1y + c.y, { label: c.label, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'perception' });
    addEdge('perception', c.id, '#22c55e66');
  });

  // ========== 2. 记忆层 Memory (左) - 独立核心模块 ==========
  const p2x = cx - 450, p2y = cy + 80;
  addNode('memory', p2x, p2y, { label: '记忆层', sub: 'Memory', level: 1, status: 'building', category: 'memory' });
  addEdge('agent', 'memory', '#8b5cf6', true);
  
  const memoryItems = [
    { id: 'm-working', label: '工作记忆', sub: '当前任务上下文', tech: ['Context Window'], status: 'ready' as NodeStatus, y: -60 },
    { id: 'm-short', label: '短期记忆', sub: '会话历史', tech: ['Redis'], status: 'ready' as NodeStatus, company: 'Redis', y: -20 },
    { id: 'm-long', label: '长期记忆', sub: '用户偏好/历史', tech: ['Vector DB'], status: 'building' as NodeStatus, y: 20 },
    { id: 'm-episodic', label: '情景记忆', sub: '成功案例', tech: ['RAG'], status: 'planned' as NodeStatus, y: 60 },
    { id: 'm-semantic', label: '语义记忆', sub: '领域知识', tech: ['KG'], status: 'planned' as NodeStatus, y: 100 },
  ];
  memoryItems.forEach(c => {
    addNode(c.id, p2x - 140, p2y + c.y, { label: c.label, sub: c.sub, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'memory' });
    addEdge('memory', c.id, '#8b5cf666');
  });

  // ========== 3. 知识层 Knowledge (上) ==========
  const p3x = cx - 80, p3y = cy - 350;
  addNode('knowledge', p3x, p3y, { label: '知识层', sub: 'Knowledge', level: 1, status: 'building', category: 'knowledge' });
  addEdge('agent', 'knowledge', '#f97316', true);
  
  const knowledgeBranches = [
    { id: 'k-format', label: '格式规范', x: -180, status: 'ready' as NodeStatus, company: '格式库', children: [
      { id: 'kf-title', label: '标题层级', status: 'ready' as NodeStatus },
      { id: 'kf-font', label: '字体字号', status: 'ready' as NodeStatus },
      { id: 'kf-number', label: '文号规范', status: 'building' as NodeStatus },
    ]},
    { id: 'k-template', label: '模板库', x: -60, status: 'ready' as NodeStatus, company: '模板服务', children: [
      { id: 'kt-notice', label: '通知', status: 'ready' as NodeStatus },
      { id: 'kt-report', label: '报告', status: 'building' as NodeStatus },
      { id: 'kt-request', label: '请示', status: 'planned' as NodeStatus },
      { id: 'kt-plan', label: '计划', status: 'ready' as NodeStatus },
    ]},
    { id: 'k-phrase', label: '高频词句', x: 60, status: 'building' as NodeStatus, children: [
      { id: 'kp-open', label: '开头套话', status: 'ready' as NodeStatus },
      { id: 'kp-trans', label: '过渡句', status: 'building' as NodeStatus },
      { id: 'kp-close', label: '结尾语', status: 'ready' as NodeStatus },
    ]},
    { id: 'k-example', label: '范文库', x: 180, status: 'building' as NodeStatus, children: [
      { id: 'ke-gov', label: '政府公文', status: 'building' as NodeStatus },
      { id: 'ke-corp', label: '企业公文', status: 'planned' as NodeStatus },
    ]},
  ];
  
  knowledgeBranches.forEach(branch => {
    addNode(branch.id, p3x + branch.x, p3y - 80, { label: branch.label, level: 2, status: branch.status, company: branch.company, category: 'knowledge' });
    addEdge('knowledge', branch.id, '#f9731666');
    branch.children.forEach((c, i) => {
      addNode(c.id, p3x + branch.x + (i - (branch.children.length - 1) / 2) * 55, p3y - 150, { label: c.label, level: 3, status: c.status, category: 'knowledge' });
      addEdge(branch.id, c.id, '#f9731633');
    });
  });

  // ========== 4. 规划层 Planning (右上) - 新增核心模块 ==========
  const p4x = cx + 350, p4y = cy - 320;
  addNode('planning', p4x, p4y, { label: '规划层', sub: 'Planning', level: 1, status: 'building', category: 'planning' });
  addEdge('agent', 'planning', '#ec4899', true);
  
  const planningItems = [
    { id: 'pl-decompose', label: '任务分解', sub: '拆解复杂任务', tech: ['CoT'], status: 'building' as NodeStatus, y: -80 },
    { id: 'pl-react', label: 'ReAct 推理', sub: '思考-行动循环', tech: ['ReAct'], status: 'planned' as NodeStatus, y: -40 },
    { id: 'pl-route', label: '路由决策', sub: '选择执行路径', tech: ['Router'], status: 'building' as NodeStatus, y: 0 },
    { id: 'pl-schedule', label: '调度编排', sub: 'Multi-Agent协作', tech: ['Workflow'], status: 'planned' as NodeStatus, y: 40 },
    { id: 'pl-fallback', label: '降级策略', sub: '异常处理', status: 'planned' as NodeStatus, y: 80 },
  ];
  planningItems.forEach(c => {
    addNode(c.id, p4x + 140, p4y + c.y, { label: c.label, sub: c.sub, tech: c.tech, level: 2, status: c.status, category: 'planning' });
    addEdge('planning', c.id, '#ec489966');
  });

  // ========== 5. 工具层 Tool (右) ==========
  const p5x = cx + 350, p5y = cy - 80;
  addNode('tool', p5x, p5y, { label: '工具层', sub: 'Tool Use', level: 1, status: 'building', category: 'tool' });
  addEdge('agent', 'tool', '#06b6d4', true);
  
  const toolItems = [
    { id: 't-mcp', label: 'MCP 协议', sub: '标准工具接口', tech: ['MCP'], status: 'planned' as NodeStatus, y: -70 },
    { id: 't-function', label: 'Function Call', sub: 'LLM原生调用', tech: ['OpenAI FC'], status: 'ready' as NodeStatus, y: -30 },
    { id: 't-search', label: '信息检索', sub: '搜索引擎', tech: ['Bing API'], status: 'planned' as NodeStatus, y: 10 },
    { id: 't-code', label: '代码执行', sub: '沙箱运行', tech: ['Sandbox'], status: 'planned' as NodeStatus, y: 50 },
    { id: 't-api', label: '外部 API', sub: '第三方服务', tech: ['REST'], status: 'building' as NodeStatus, y: 90 },
  ];
  toolItems.forEach(c => {
    addNode(c.id, p5x + 140, p5y + c.y, { label: c.label, sub: c.sub, tech: c.tech, level: 2, status: c.status, category: 'tool' });
    addEdge('tool', c.id, '#06b6d466');
  });

  // ========== 6. 执行层 Execution (下中) ==========
  const p6x = cx - 80, p6y = cy + 300;
  addNode('execution', p6x, p6y, { label: '执行层', sub: 'Execution', level: 1, status: 'building', category: 'execution' });
  addEdge('agent', 'execution', '#3b82f6', true);
  
  const executionItems = [
    { id: 'e-rag', label: 'RAG 检索', tech: ['Milvus'], status: 'building' as NodeStatus, company: '向量库', x: -180 },
    { id: 'e-prompt', label: 'Prompt 组装', tech: ['Jinja2'], status: 'ready' as NodeStatus, x: -60 },
    { id: 'e-llm', label: 'LLM 调用', tech: ['GPT-4', 'Claude', 'DeepSeek'], status: 'ready' as NodeStatus, company: 'API', x: 60 },
    { id: 'e-stream', label: '流式生成', tech: ['SSE'], status: 'ready' as NodeStatus, x: 180 },
  ];
  executionItems.forEach(c => {
    addNode(c.id, p6x + c.x, p6y + 70, { label: c.label, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'execution' });
    addEdge('execution', c.id, '#3b82f666');
  });

  // ========== 7. 反思层 Reflection (右下) ==========
  const p7x = cx + 350, p7y = cy + 150;
  addNode('reflection', p7x, p7y, { label: '反思层', sub: 'Reflection', level: 1, status: 'building', category: 'reflection' });
  addEdge('agent', 'reflection', '#ef4444', true);
  
  const reflectionItems = [
    { id: 'r-self', label: '自我校验', sub: 'Self-Critique', tech: ['CoT'], status: 'building' as NodeStatus, y: -70 },
    { id: 'r-fact', label: '事实核查', sub: 'Fact Check', tech: ['KG'], status: 'planned' as NodeStatus, y: -30 },
    { id: 'r-hallucination', label: '幻觉检测', sub: 'Hallucination', status: 'planned' as NodeStatus, y: 10 },
    { id: 'r-sensitive', label: '敏感词过滤', tech: ['DFA'], status: 'ready' as NodeStatus, company: '词库', y: 50 },
    { id: 'r-compliance', label: '政治合规', tech: ['安全API'], status: 'ready' as NodeStatus, company: 'API', y: 90 },
  ];
  reflectionItems.forEach(c => {
    addNode(c.id, p7x + 140, p7y + c.y, { label: c.label, sub: c.sub, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'reflection' });
    addEdge('reflection', c.id, '#ef444466');
  });

  // ========== 8. 输出层 Output (下左) ==========
  const p8x = cx - 300, p8y = cy + 300;
  addNode('output', p8x, p8y, { label: '输出层', sub: 'Output', level: 1, status: 'ready', category: 'output' });
  addEdge('agent', 'output', '#eab308', true);
  
  const outputItems = [
    { id: 'o-render', label: '内容渲染', tech: ['Markdown'], status: 'ready' as NodeStatus, x: -100 },
    { id: 'o-edit', label: '在线编辑', tech: ['富文本'], status: 'building' as NodeStatus, x: 0 },
    { id: 'o-export', label: '格式导出', tech: ['Word/PDF'], status: 'ready' as NodeStatus, company: '导出服务', x: 100 },
  ];
  outputItems.forEach(c => {
    addNode(c.id, p8x + c.x, p8y + 70, { label: c.label, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'output' });
    addEdge('output', c.id, '#eab30866');
  });

  // ========== 9. 基础设施 Infra (最下方) ==========
  const p9x = cx + 100, p9y = cy + 420;
  addNode('infra', p9x, p9y, { label: '基础设施', sub: 'Infrastructure', level: 1, status: 'building', category: 'infra' });
  addEdge('agent', 'infra', '#64748b');
  
  const infraItems = [
    { id: 'inf-log', label: '日志追踪', tech: ['ELK'], status: 'ready' as NodeStatus, company: 'ELK', x: -150 },
    { id: 'inf-monitor', label: '监控告警', tech: ['Prometheus'], status: 'building' as NodeStatus, x: -50 },
    { id: 'inf-cost', label: '成本统计', tech: ['Token计费'], status: 'planned' as NodeStatus, x: 50 },
    { id: 'inf-ab', label: 'A/B测试', tech: ['灰度发布'], status: 'planned' as NodeStatus, x: 150 },
  ];
  infraItems.forEach(c => {
    addNode(c.id, p9x + c.x, p9y + 60, { label: c.label, tech: c.tech, level: 2, status: c.status, company: c.company, category: 'infra' });
    addEdge('infra', c.id, '#64748b66');
  });

  // ========== 反馈闭环连线 ==========
  // 输出 → 记忆（学习用户反馈）
  addEdge('output', 'memory', '#8b5cf633');
  // 反思 → 规划（调整策略）
  addEdge('reflection', 'planning', '#ec489933');

  return { nodes, edges };
};

// 详情面板
const DetailPanel: React.FC<{ node: Node<MindMapNodeData> | null; onClose: () => void }> = ({ node, onClose }) => {
  if (!node) return null;
  const d = node.data;
  const theme = themes[d.category || 'infra'];
  
  // 8层架构说明
  const layerDesc: Record<string, string> = {
    perception: '负责理解用户输入，包括意图识别、实体提取、多模态处理',
    memory: '管理Agent的记忆系统，包括工作记忆、短期记忆、长期记忆',
    knowledge: '存储和管理领域知识，包括模板、规范、范文等',
    planning: '负责任务规划和决策，包括任务分解、路由、Multi-Agent调度',
    tool: '管理外部工具调用，包括MCP、Function Call、API等',
    execution: '执行具体任务，包括RAG检索、Prompt组装、LLM调用',
    reflection: '质量把控和自我反思，包括校验、事实核查、合规检查',
    output: '结果输出和交付，包括渲染、编辑、导出',
    infra: '基础设施支撑，包括日志、监控、成本统计',
  };
  
  return (
    <div className="absolute right-3 top-16 w-60 bg-slate-950/95 backdrop-blur border border-slate-800 rounded-lg p-3 z-50 text-xs">
      <button onClick={onClose} className="absolute top-2 right-2 text-slate-600 hover:text-white">×</button>
      <div className="font-medium mb-1" style={{ color: theme.text }}>{d.label}</div>
      {d.sub && <div className="text-slate-600 text-[10px] mb-2">{d.sub}</div>}
      
      {d.level === 1 && d.category && layerDesc[d.category] && (
        <div className="text-slate-500 text-[10px] mb-2 p-2 bg-slate-900 rounded">
          {layerDesc[d.category]}
        </div>
      )}
      
      <div className="flex items-center gap-1.5 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'ready' ? 'bg-emerald-500' : d.status === 'building' ? 'bg-amber-500' : 'bg-slate-500'}`} />
        <span className="text-slate-500 text-[10px]">{d.status === 'ready' ? '已就绪' : d.status === 'building' ? '建设中' : '待建设'}</span>
      </div>
      {d.tech && (
        <div className="flex flex-wrap gap-1 mb-2">
          {d.tech.map((t, i) => <span key={i} className="px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded text-[9px]">{t}</span>)}
        </div>
      )}
      {d.company && (
        <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-500 text-[10px]">
          公司资源: {d.company}
        </div>
      )}
    </div>
  );
};

// 主组件
const MindMap: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateArchitecture(), []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<MindMapNodeData> | null>(null);

  const stats = useMemo(() => {
    let ready = 0, building = 0, planned = 0, company = 0;
    nodes.forEach(n => {
      if (n.data.status === 'ready') ready++;
      else if (n.data.status === 'building') building++;
      else planned++;
      if (n.data.company) company++;
    });
    return { ready, building, planned, company };
  }, [nodes]);

  return (
    <div className="w-full h-[950px] bg-slate-950 rounded-xl overflow-hidden border border-slate-900 relative">
      {/* 状态栏 */}
      <div className="absolute top-2 left-2 z-10 flex gap-3 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded text-[10px]">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />就绪 {stats.ready}</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />建设中 {stats.building}</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-500" />待建 {stats.planned}</span>
        <span className="flex items-center gap-1 pl-2 border-l border-slate-800"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />公司资源 {stats.company}</span>
      </div>
      
      {/* 8层架构图例 */}
      <div className="absolute top-10 left-2 z-10 bg-slate-900/90 backdrop-blur px-2.5 py-1.5 rounded text-[9px]">
        <div className="text-slate-500 mb-1">标准 Agent 8层架构</div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {[
            { k: 'perception', l: '感知' }, { k: 'memory', l: '记忆' }, { k: 'knowledge', l: '知识' },
            { k: 'planning', l: '规划' }, { k: 'tool', l: '工具' }, { k: 'execution', l: '执行' },
            { k: 'reflection', l: '反思' }, { k: 'output', l: '输出' },
          ].map(c => (
            <span key={c.k} className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-sm" style={{ background: themes[c.k].border }} />
              <span className="text-slate-600">{c.l}</span>
            </span>
          ))}
        </div>
      </div>
      
      {/* 价值分层图例 */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded text-[9px]">
        <span className="text-slate-500 mr-1">价值分层:</span>
        <span className="flex items-center gap-0.5" title="业界公认最值钱，真正的护城河">
          <span>💎</span><span style={{ color: '#00D4FF' }}>护城河</span>
        </span>
        <span className="flex items-center gap-0.5" title="决定产品成败的技术难点">
          <span>🦴</span><span style={{ color: '#FF4500' }}>硬骨头</span>
        </span>
        <span className="flex items-center gap-0.5" title="技术难度高但商业价值低，易被复制">
          <span>🥇</span><span style={{ color: '#FFD700' }}>易复制</span>
        </span>
        <span className="flex items-center gap-0.5" title="标准化能力，属于耗材">
          <span>🔋</span><span style={{ color: '#FF6B6B' }}>耗材</span>
        </span>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => setSelectedNode(node)}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        minZoom={0.25}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={30} size={1} color="#1e293b" />
        <Controls className="!bg-slate-900 !border-slate-800 !rounded [&>button]:!bg-slate-900 [&>button]:!border-slate-800 [&>button]:!text-slate-500 [&>button]:!w-6 [&>button]:!h-6" />
        <MiniMap className="!bg-slate-900 !border-slate-800 !rounded !h-24" nodeColor={n => themes[n.data?.category || 'infra'].border} maskColor="#0f172acc" />
      </ReactFlow>
      
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};

export default MindMap;
