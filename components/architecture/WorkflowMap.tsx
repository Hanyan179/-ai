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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * 公文写作业务工作流
 * 
 * 核心洞察：员工真正需要掌握的是两个核心能力
 * 1. 知识库设计 - 怎么组织公文知识（模板、词句、范文、格式规范）
 * 2. Prompt 编排 - 怎么让 AI 理解并执行（角色、任务、流程、格式）
 * 
 * 其他都是技术自动化，不需要操心
 */

type OwnerType = 'tech' | 'asset' | 'skill' | 'user';

interface WorkflowNodeData {
  label: string;
  sub?: string;
  owner: OwnerType;
  tips?: string[];
  details?: string[];
}

// 公司资产用蓝色，员工能力用橙色，技术层用灰色，用户输入用绿色
const ownerStyles = {
  tech: { border: '#475569', bg: '#0f172a', text: '#64748b', glow: 'none' },
  asset: { border: '#3b82f6', bg: '#3b82f610', text: '#60a5fa', glow: '0 0 25px #3b82f633' },  // 公司核心资产
  skill: { border: '#f97316', bg: '#f9731610', text: '#fb923c', glow: '0 0 25px #f9731633' },  // 员工核心能力
  user: { border: '#22c55e', bg: '#22c55e10', text: '#4ade80', glow: 'none' },
};

// 节点组件
const WorkflowNode: React.FC<NodeProps<WorkflowNodeData>> = ({ data, selected }) => {
  const style = ownerStyles[data.owner];
  const isHighlight = data.owner === 'asset' || data.owner === 'skill';
  
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-105' : ''}`}
      style={{
        background: style.bg,
        border: `${isHighlight ? 2.5 : 1.5}px solid ${selected ? '#fff' : style.border}`,
        borderRadius: isHighlight ? 12 : 8,
        padding: isHighlight ? '16px 20px' : '10px 14px',
        minWidth: isHighlight ? 180 : 100,
        boxShadow: selected ? `0 0 20px ${style.border}66` : style.glow,
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="target" position={Position.Top} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !w-1.5 !h-1.5 !border-0" />
      
      {data.owner === 'asset' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-blue-500 rounded text-[10px] text-white font-semibold whitespace-nowrap tracking-wide">
          公司核心资产
        </div>
      )}
      
      {data.owner === 'skill' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-orange-500 rounded text-[10px] text-white font-semibold whitespace-nowrap tracking-wide">
          员工核心能力
        </div>
      )}
      
      <div className="text-center">
        <div className={`font-medium ${isHighlight ? 'text-sm' : 'text-xs'}`} style={{ color: style.text }}>
          {data.label}
        </div>
        {data.sub && <div className="text-slate-500 text-[10px] mt-1">{data.sub}</div>}
      </div>
    </div>
  );
};

// 核心资产详情节点 - 公司知识库（蓝色）
const AssetDetailNode: React.FC<NodeProps<WorkflowNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-[1.02]' : ''}`}
      style={{
        background: '#3b82f608',
        border: `2px solid ${selected ? '#fff' : '#3b82f6'}`,
        borderRadius: 14,
        padding: '18px 22px',
        minWidth: 220,
        boxShadow: selected ? '0 0 30px #3b82f666' : '0 0 25px #3b82f622',
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-blue-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-blue-500 !w-2 !h-2 !border-0" />
      
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 rounded text-[10px] text-white font-semibold whitespace-nowrap">
        公司核心资产
      </div>
      
      <div className="text-center mb-3">
        <div className="text-blue-400 font-semibold text-base">{data.label}</div>
        {data.sub && <div className="text-blue-300/60 text-[11px] mt-1">{data.sub}</div>}
      </div>
      
      {data.details && (
        <div className="space-y-1.5 text-left">
          {data.details.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <span className="text-blue-200/80">{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 员工能力详情节点 - Prompt编排（橙色）
const SkillDetailNode: React.FC<NodeProps<WorkflowNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`relative transition-all duration-150 ${selected ? 'scale-[1.02]' : ''}`}
      style={{
        background: '#f9731608',
        border: `2px solid ${selected ? '#fff' : '#f97316'}`,
        borderRadius: 14,
        padding: '18px 22px',
        minWidth: 220,
        boxShadow: selected ? '0 0 30px #f9731666' : '0 0 25px #f9731622',
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-orange-500 !w-2 !h-2 !border-0" />
      
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 rounded text-[10px] text-white font-semibold whitespace-nowrap">
        员工核心能力
      </div>
      
      <div className="text-center mb-3">
        <div className="text-orange-400 font-semibold text-base">{data.label}</div>
        {data.sub && <div className="text-orange-300/60 text-[11px] mt-1">{data.sub}</div>}
      </div>
      
      {data.details && (
        <div className="space-y-1.5 text-left">
          {data.details.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              <span className="text-orange-200/80">{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const nodeTypes = { 
  workflow: WorkflowNode,
  assetDetail: AssetDetailNode,
  skillDetail: SkillDetailNode,
};

// 生成工作流
const generateWorkflow = () => {
  const nodes: Node<WorkflowNodeData>[] = [];
  const edges: Edge[] = [];
  
  const addNode = (id: string, x: number, y: number, data: WorkflowNodeData, type = 'workflow') => {
    nodes.push({ id, type, position: { x, y }, data });
  };
  
  const addEdge = (source: string, target: string, animated = false, color = '#475569', dashed = false) => {
    edges.push({
      id: `${source}-${target}`,
      source,
      target,
      type: 'smoothstep',
      style: { stroke: color, strokeWidth: animated ? 1.5 : 1, strokeDasharray: dashed ? '4 2' : undefined },
      animated,
      markerEnd: { type: MarkerType.ArrowClosed, color, width: 12, height: 12 },
    });
  };

  // ========== 第一列：用户输入 (x=50) ==========
  addNode('user-input', 50, 340, { 
    label: '用户输入', 
    sub: '"写个会议通知"', 
    owner: 'user' 
  });
  addNode('user-material', 50, 430, { 
    label: '用户素材', 
    sub: '上传参考文件', 
    owner: 'user' 
  });
  addNode('user-preference', 50, 520, { 
    label: '用户偏好', 
    sub: '历史记录自动应用', 
    owner: 'tech',
    details: [
      '常用发文机关',
      '偏好语言风格',
      '历史公文参考',
      '常用主送单位',
    ],
  });

  // ========== 第二列：技术层 - 意图理解 (x=220) ==========
  addNode('intent', 220, 385, { 
    label: '意图理解', 
    sub: '自动识别文种', 
    owner: 'tech' 
  });
  
  // 用户输入 -> 意图理解
  addEdge('user-input', 'intent', true, '#22c55e');
  addEdge('user-material', 'intent', false, '#22c55e66');
  addEdge('user-preference', 'intent', false, '#47556966');

  // ========== 第三列：公司核心资产 - 知识库 (x=420) ==========
  addNode('knowledge-zone', 420, 180, {
    label: '知识库设计',
    sub: '公司积累的公文知识体系',
    owner: 'asset',
    details: [
      '模板库：通知/报告/请示/批复',
      '高频词句：开头/过渡/结尾套话',
      '范文库：政府/企业/党务公文',
      '格式规范：标题/字号/页边距',
    ],
  }, 'assetDetail');

  // ========== 第三列：员工核心能力 - Prompt (x=420) ==========
  addNode('prompt-zone', 420, 460, {
    label: 'Prompt 编排',
    sub: '让 AI 理解并执行',
    owner: 'skill',
    details: [
      '角色定位：政务文书撰写专家',
      '核心任务：起草高标准公文',
      '处理流程：信息提取→校准→生成',
      '动态变量：<policy> <style> <user_material>',
      '输出格式：Markdown层级规范',
    ],
  }, 'skillDetail');

  // 意图理解 -> 知识库 & Prompt
  addEdge('intent', 'knowledge-zone', true, '#f97316');
  addEdge('intent', 'prompt-zone', true, '#f97316');

  // ========== 第四列：技术层 - RAG检索 (x=700) ==========
  addNode('rag', 700, 280, { 
    label: 'RAG 检索', 
    sub: '向量匹配知识', 
    owner: 'tech' 
  });
  
  // 知识库 -> RAG
  addEdge('knowledge-zone', 'rag', true, '#3b82f666');

  // ========== 第四列：技术层 - 上下文组装 (x=700) ==========
  addNode('assemble', 700, 385, { 
    label: '上下文组装', 
    sub: '拼接完整 Prompt', 
    owner: 'tech' 
  });
  
  // RAG -> 组装, Prompt -> 组装, 用户偏好 -> 组装
  addEdge('rag', 'assemble', false, '#47556966');
  addEdge('prompt-zone', 'assemble', true, '#f9731666');
  addEdge('user-preference', 'assemble', false, '#47556944', true); // 虚线表示可选

  // ========== 第五列：技术层 - LLM调用 (x=880) ==========
  addNode('llm', 880, 385, { 
    label: 'LLM 调用', 
    sub: 'GPT-4 / Claude', 
    owner: 'tech' 
  });
  
  addEdge('assemble', 'llm', true, '#475569');

  // ========== 第六列：技术层 - 质量过滤 (x=1050) ==========
  addNode('filter', 1050, 335, { 
    label: '敏感词过滤', 
    sub: '政治合规检查', 
    owner: 'tech' 
  });
  addNode('format-check', 1050, 435, { 
    label: '格式校验', 
    sub: '结构完整性', 
    owner: 'tech' 
  });
  
  addEdge('llm', 'filter', false, '#475569');
  addEdge('llm', 'format-check', false, '#475569');

  // ========== 第七列：输出 (x=1220) ==========
  addNode('output', 1220, 385, { 
    label: '公文输出', 
    sub: '渲染 & 导出', 
    owner: 'tech' 
  });
  
  addEdge('filter', 'output', false, '#475569');
  addEdge('format-check', 'output', false, '#475569');
  
  // 输出反馈到用户偏好（学习用户习惯）
  addEdge('output', 'user-preference', false, '#47556944', true);

  // ========== 底部：技术自动化标注 ==========
  // 用虚线框标注技术自动化区域（通过节点模拟）
  
  return { nodes, edges };
};

// 详情面板
const DetailPanel: React.FC<{ node: Node<WorkflowNodeData> | null; onClose: () => void }> = ({ node, onClose }) => {
  if (!node) return null;
  const d = node.data;
  const isAsset = d.owner === 'asset';
  const isSkill = d.owner === 'skill';
  
  const tips: Record<string, string[]> = {
    'knowledge-zone': [
      '模板库要覆盖常见文种',
      '高频词句按场景分类',
      '范文要标注来源和适用场景',
      '格式规范参考《党政机关公文格式》',
      '持续积累，形成公司独有资产',
    ],
    'prompt-zone': [
      '角色定位要专业、具体',
      '处理流程要清晰、可执行',
      '动态变量用 <tag> 标记',
      '输出格式要与前端渲染匹配',
      '需要员工理解并能编写调优',
    ],
  };
  
  return (
    <div className="absolute right-3 top-16 w-64 bg-slate-950/95 backdrop-blur border border-slate-800 rounded-lg p-4 z-50 text-xs">
      <button onClick={onClose} className="absolute top-2 right-2 text-slate-600 hover:text-white text-lg">×</button>
      
      <div className={`font-medium text-sm mb-2 ${
        isAsset ? 'text-blue-400' : 
        isSkill ? 'text-orange-400' : 
        d.owner === 'user' ? 'text-emerald-400' : 'text-slate-400'
      }`}>
        {d.label}
      </div>
      
      {d.sub && <div className="text-slate-500 text-[11px] mb-3">{d.sub}</div>}
      
      <div className={`inline-block px-2 py-0.5 rounded text-[10px] mb-3 ${
        isAsset ? 'bg-blue-500/20 text-blue-400' : 
        isSkill ? 'bg-orange-500/20 text-orange-400' : 
        d.owner === 'user' ? 'bg-emerald-500/20 text-emerald-400' : 
        'bg-slate-700 text-slate-500'
      }`}>
        {isAsset ? '公司核心资产' : isSkill ? '员工核心能力' : d.owner === 'user' ? '用户提供' : '技术自动化'}
      </div>
      
      {(isAsset || isSkill) && tips[node.id] && (
        <div className="border-t border-slate-800 pt-3 mt-2">
          <div className={`text-[10px] font-medium mb-2 ${isAsset ? 'text-blue-400/80' : 'text-orange-400/80'}`}>
            {isAsset ? '资产维护要点：' : '能力培养要点：'}
          </div>
          <div className="space-y-1.5">
            {tips[node.id].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]">
                <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${isAsset ? 'bg-blue-500' : 'bg-orange-500'}`} />
                <span className="text-slate-400">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {d.details && !isAsset && !isSkill && (
        <div className="space-y-1">
          {d.details.map((detail, i) => (
            <div key={i} className="text-slate-500 text-[10px]">• {detail}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// 主组件
const WorkflowMap: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateWorkflow(), []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(null);

  return (
    <div className="w-full h-[750px] bg-slate-950 rounded-xl overflow-hidden border border-slate-900 relative">
      {/* 图例 */}
      <div className="absolute top-3 left-3 z-10 flex gap-4 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-500/10" />
          <span className="text-blue-400 font-medium">公司核心资产</span>
          <span className="text-slate-600 text-[10px]">需积累</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border-2 border-orange-500 bg-orange-500/10" />
          <span className="text-orange-400 font-medium">员工核心能力</span>
          <span className="text-slate-600 text-[10px]">需掌握</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border border-slate-600 bg-slate-900" />
          <span className="text-slate-500">技术自动化</span>
          <span className="text-slate-600 text-[10px]">无需操心</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded border border-emerald-500 bg-emerald-500/10" />
          <span className="text-emerald-400">用户输入</span>
        </div>
      </div>
      
      {/* 流程说明 */}
      <div className="absolute top-3 right-3 z-10 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-slate-500 max-w-xs">
        <span className="text-slate-400 font-medium">核心洞察：</span>
        <span className="text-blue-400">知识库</span>是公司积累的核心资产，
        <span className="text-orange-400">Prompt编排</span>是员工需要掌握的核心能力，
        其他环节都是技术自动化
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
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={25} size={1} color="#1e293b" />
        <Controls className="!bg-slate-900 !border-slate-800 !rounded [&>button]:!bg-slate-900 [&>button]:!border-slate-800 [&>button]:!text-slate-500 [&>button]:!w-6 [&>button]:!h-6" />
        <MiniMap 
          className="!bg-slate-900 !border-slate-800 !rounded !h-20" 
          nodeColor={n => n.data?.owner === 'asset' ? '#3b82f6' : n.data?.owner === 'skill' ? '#f97316' : n.data?.owner === 'user' ? '#22c55e' : '#475569'} 
          maskColor="#0f172acc" 
        />
      </ReactFlow>
      
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};

export default WorkflowMap;
