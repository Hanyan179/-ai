import React, { useState, useMemo } from 'react';
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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * Demo 演示流转视图
 * 
 * 展示用户与 AI 智能助手交互的完整流程
 * 四个典型场景：导航、查询、填表、跨页面任务
 */

type StepType = 'user' | 'system' | 'agent' | 'tool' | 'result';

interface DemoNodeData {
  label: string;
  sub?: string;
  type: StepType;
  icon?: string;
  details?: string[];
  highlight?: boolean;
}

// 步骤类型样式
const stepStyles: Record<StepType, { border: string; bg: string; text: string; glow: string }> = {
  user: { border: '#22c55e', bg: '#22c55e10', text: '#4ade80', glow: '0 0 20px #22c55e33' },
  system: { border: '#6366f1', bg: '#6366f110', text: '#818cf8', glow: '0 0 20px #6366f133' },
  agent: { border: '#f97316', bg: '#f9731610', text: '#fb923c', glow: '0 0 25px #f9731633' },
  tool: { border: '#3b82f6', bg: '#3b82f610', text: '#60a5fa', glow: '0 0 20px #3b82f633' },
  result: { border: '#10b981', bg: '#10b98110', text: '#34d399', glow: '0 0 20px #10b98133' },
};

// 基础节点组件
const DemoNode: React.FC<NodeProps<DemoNodeData>> = ({ data, selected }) => {
  const style = stepStyles[data.type];
  const isHighlight = data.highlight || data.type === 'agent';
  
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-105' : ''}`}
      style={{
        background: style.bg,
        border: `${isHighlight ? 2 : 1.5}px solid ${selected ? '#fff' : style.border}`,
        borderRadius: isHighlight ? 12 : 8,
        padding: isHighlight ? '14px 18px' : '10px 14px',
        minWidth: isHighlight ? 160 : 100,
        boxShadow: selected ? `0 0 20px ${style.border}66` : style.glow,
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="target" position={Position.Top} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      
      <div className="text-center">
        {data.icon && <div className="text-lg mb-1">{data.icon}</div>}
        <div className={`font-medium ${isHighlight ? 'text-sm' : 'text-xs'}`} style={{ color: style.text }}>
          {data.label}
        </div>
        {data.sub && <div className="text-slate-500 text-[10px] mt-1">{data.sub}</div>}
      </div>
    </div>
  );
};

// Agent 详情节点
const AgentDetailNode: React.FC<NodeProps<DemoNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-[1.02]' : ''}`}
      style={{
        background: '#f9731608',
        border: `2px solid ${selected ? '#fff' : '#f97316'}`,
        borderRadius: 14,
        padding: '16px 20px',
        minWidth: 200,
        boxShadow: selected ? '0 0 30px #f9731666' : '0 0 25px #f9731622',
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      <Handle type="target" position={Position.Top} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-orange-500 rounded text-[10px] text-white font-semibold whitespace-nowrap">
        {data.icon} {data.label}
      </div>
      
      <div className="text-center mb-2 mt-1">
        {data.sub && <div className="text-orange-300/70 text-[11px]">{data.sub}</div>}
      </div>
      
      {data.details && (
        <div className="space-y-1.5 text-left">
          {data.details.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px]">
              <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              <span className="text-orange-200/80">{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 场景卡片节点
const ScenarioNode: React.FC<NodeProps<DemoNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-[1.02]' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: `2px solid ${selected ? '#fff' : '#334155'}`,
        borderRadius: 16,
        padding: '18px 22px',
        minWidth: 240,
        boxShadow: selected ? '0 0 30px #33415566' : '0 4px 20px #00000033',
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-slate-500 !w-2 !h-2 !border-0" />
      
      <div className="text-center mb-3">
        <div className="text-2xl mb-2">{data.icon}</div>
        <div className="text-white font-semibold text-sm">{data.label}</div>
        {data.sub && <div className="text-slate-400 text-[11px] mt-1">{data.sub}</div>}
      </div>
      
      {data.details && (
        <div className="space-y-1.5 text-left border-t border-slate-700 pt-3">
          {data.details.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px]">
              <span className="text-emerald-400">{i + 1}.</span>
              <span className="text-slate-300">{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  demo: DemoNode,
  agentDetail: AgentDetailNode,
  scenario: ScenarioNode,
};

// 场景数据
const SCENARIOS = [
  {
    id: 'nav',
    title: '场景1：导航跳转',
    icon: '🧭',
    userInput: '"帮我打开会议申请"',
    steps: [
      { label: 'Portal Agent', sub: '门户导航专家' },
      { label: 'navigate_to_module', sub: '跳转工具' },
      { label: '页面跳转', sub: '会议申请列表' },
    ],
  },
  {
    id: 'search',
    title: '场景2：列表查询',
    icon: '🔍',
    userInput: '"查一下张三的记录"',
    steps: [
      { label: 'List Agent', sub: '列表查询助手' },
      { label: 'search_list', sub: '搜索工具' },
      { label: '结果展示', sub: '找到 5 条记录' },
    ],
  },
  {
    id: 'form',
    title: '场景3：表单填写',
    icon: '📝',
    userInput: '"帮我填写测试数据"',
    steps: [
      { label: 'Form Agent', sub: '表单填写助手' },
      { label: 'get_form_structure', sub: '获取结构' },
      { label: 'fill_form', sub: '填充字段' },
    ],
  },
  {
    id: 'cross',
    title: '场景4：跨页面任务',
    icon: '🔄',
    userInput: '"帮我新建一个会议申请"',
    steps: [
      { label: 'Portal → List', sub: '导航+上下文' },
      { label: 'List → Form', sub: '新建+继续' },
      { label: '任务完成', sub: '全程自动' },
    ],
  },
];

// 生成完整流程图
const generateDemoFlow = () => {
  const nodes: Node<DemoNodeData>[] = [];
  const edges: Edge[] = [];
  
  const addNode = (id: string, x: number, y: number, data: DemoNodeData, type = 'demo') => {
    nodes.push({ id, type, position: { x, y }, data });
  };
  
  const addEdge = (source: string, target: string, animated = false, color = '#475569', label?: string) => {
    edges.push({
      id: `${source}-${target}`,
      source,
      target,
      type: 'smoothstep',
      style: { stroke: color, strokeWidth: animated ? 2 : 1.5 },
      animated,
      label,
      labelStyle: { fill: '#94a3b8', fontSize: 10 },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color, width: 14, height: 14 },
    });
  };

  // ========== 顶部：核心流程概览 ==========
  
  // 用户输入
  addNode('user-input', 50, 100, {
    label: '用户输入',
    sub: '自然语言指令',
    type: 'user',
    icon: '👤',
  });

  // 框架准备
  addNode('framework', 220, 100, {
    label: '框架准备',
    sub: '检测页面 + 加载 Agent',
    type: 'system',
    icon: '⚙️',
  });

  // AI 决策
  addNode('ai-decision', 420, 50, {
    label: 'AI 自主决策',
    sub: '分析意图，选择策略',
    type: 'agent',
    icon: '🧠',
    highlight: true,
    details: [
      'A. 直接回答 → 返回文本',
      'B. 需要信息 → 获取知识',
      'C. 需要操作 → 调用工具',
    ],
  }, 'agentDetail');

  // 工具执行
  addNode('tool-exec', 650, 100, {
    label: '工具执行',
    sub: '执行具体操作',
    type: 'tool',
    icon: '🔧',
  });

  // 结果输出
  addNode('output', 820, 100, {
    label: '结果展示',
    sub: '文本/跳转/数据',
    type: 'result',
    icon: '✅',
  });

  // 连接主流程
  addEdge('user-input', 'framework', true, '#22c55e');
  addEdge('framework', 'ai-decision', true, '#6366f1');
  addEdge('ai-decision', 'tool-exec', true, '#f97316');
  addEdge('tool-exec', 'output', true, '#3b82f6');

  // ========== 中部：Agent 切换机制 ==========
  
  addNode('agent-switch', 220, 250, {
    label: 'Agent 自动切换',
    sub: '根据页面类型激活对应专家',
    type: 'system',
    icon: '🔄',
  });

  // 三个 Agent
  addNode('portal-agent', 80, 350, {
    label: 'Portal Agent',
    sub: '门户导航专家',
    type: 'agent',
    icon: '🧭',
  });

  addNode('list-agent', 220, 350, {
    label: 'List Agent',
    sub: '列表查询助手',
    type: 'agent',
    icon: '📋',
  });

  addNode('form-agent', 360, 350, {
    label: 'Form Agent',
    sub: '表单填写助手',
    type: 'agent',
    icon: '📝',
  });

  addEdge('framework', 'agent-switch', false, '#6366f166');
  addEdge('agent-switch', 'portal-agent', false, '#f9731666');
  addEdge('agent-switch', 'list-agent', false, '#f9731666');
  addEdge('agent-switch', 'form-agent', false, '#f9731666');

  // ========== 右侧：跨页面上下文 ==========
  
  addNode('context-flow', 650, 250, {
    label: '跨页面上下文',
    sub: 'localStorage 流转',
    type: 'system',
    icon: '💾',
    details: [
      '保存对话历史',
      '标记 autoContinue',
      '新页面自动恢复',
    ],
  }, 'agentDetail');

  addEdge('tool-exec', 'context-flow', false, '#3b82f666', '页面跳转时');
  addEdge('context-flow', 'framework', false, '#6366f144', '新页面加载');

  // ========== 底部：四个典型场景 ==========
  
  const scenarioY = 500;
  const scenarioGap = 230;
  
  SCENARIOS.forEach((s, i) => {
    addNode(`scenario-${s.id}`, 50 + i * scenarioGap, scenarioY, {
      label: s.title,
      sub: s.userInput,
      type: 'user',
      icon: s.icon,
      details: s.steps.map(step => `${step.label}: ${step.sub}`),
    }, 'scenario');
  });

  // 场景之间的连接（表示流程递进）
  addEdge('scenario-nav', 'scenario-search', false, '#33415544');
  addEdge('scenario-search', 'scenario-form', false, '#33415544');
  addEdge('scenario-form', 'scenario-cross', false, '#33415544');

  return { nodes, edges };
};

// 详情面板
const DetailPanel: React.FC<{ node: Node<DemoNodeData> | null; onClose: () => void }> = ({ node, onClose }) => {
  if (!node) return null;
  const d = node.data;
  const style = stepStyles[d.type];
  
  const typeLabels: Record<StepType, string> = {
    user: '用户操作',
    system: '系统处理',
    agent: 'AI 智能体',
    tool: '工具执行',
    result: '结果输出',
  };
  
  return (
    <div className="absolute right-3 top-16 w-64 bg-slate-950/95 backdrop-blur border border-slate-800 rounded-lg p-4 z-50 text-xs">
      <button onClick={onClose} className="absolute top-2 right-2 text-slate-600 hover:text-white text-lg">×</button>
      
      <div className="flex items-center gap-2 mb-2">
        {d.icon && <span className="text-lg">{d.icon}</span>}
        <span className="font-medium text-sm" style={{ color: style.text }}>{d.label}</span>
      </div>
      
      {d.sub && <div className="text-slate-500 text-[11px] mb-3">{d.sub}</div>}
      
      <div 
        className="inline-block px-2 py-0.5 rounded text-[10px] mb-3"
        style={{ background: `${style.border}20`, color: style.text }}
      >
        {typeLabels[d.type]}
      </div>
      
      {d.details && (
        <div className="border-t border-slate-800 pt-3 mt-2 space-y-1.5">
          {d.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px]">
              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: style.border }} />
              <span className="text-slate-400">{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 主组件
const DemoFlowView: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateDemoFlow(), []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<DemoNodeData> | null>(null);

  return (
    <div className="w-full h-[750px] bg-slate-950 rounded-xl overflow-hidden border border-slate-900 relative">
      {/* 图例 */}
      <div className="absolute top-3 left-3 z-10 flex gap-4 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-emerald-500 bg-emerald-500/10" />
          <span className="text-emerald-400">用户输入</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-indigo-500 bg-indigo-500/10" />
          <span className="text-indigo-400">系统处理</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-orange-500 bg-orange-500/10" />
          <span className="text-orange-400">AI 决策</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-500/10" />
          <span className="text-blue-400">工具执行</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-teal-500 bg-teal-500/10" />
          <span className="text-teal-400">结果输出</span>
        </div>
      </div>
      
      {/* 流程说明 */}
      <div className="absolute top-3 right-3 z-10 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-slate-500 max-w-xs">
        <span className="text-slate-400 font-medium">Demo 演示：</span>
        用户输入 → 框架准备 → <span className="text-orange-400">AI 自主决策</span> → 工具执行 → 结果展示
        <br />
        <span className="text-slate-600 mt-1 block">点击节点查看详情</span>
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
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={25} size={1} color="#1e293b" />
        <Controls className="!bg-slate-900 !border-slate-800 !rounded [&>button]:!bg-slate-900 [&>button]:!border-slate-800 [&>button]:!text-slate-500 [&>button]:!w-6 [&>button]:!h-6" />
        <MiniMap 
          className="!bg-slate-900 !border-slate-800 !rounded !h-20" 
          nodeColor={n => {
            const type = n.data?.type as StepType;
            return stepStyles[type]?.border || '#475569';
          }} 
          maskColor="#0f172acc" 
        />
      </ReactFlow>
      
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};

export default DemoFlowView;
