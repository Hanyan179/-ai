import React, { useMemo, useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  ConnectionLineType,
  Panel,
  EdgeChange,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ViewMode } from '../../types';
import FlowNode from './FlowNode';

interface FlowCanvasProps {
  mode: ViewMode;
}

// 自定义节点类型
const nodeTypes = {
  custom: FlowNode,
};

// 连线样式预设
const edgeStyles = {
  main: { stroke: '#60A5FA', strokeWidth: 2 },
  feedback: { stroke: '#34D399', strokeWidth: 2, strokeDasharray: '5,5' },
  tech: { stroke: '#A78BFA', strokeWidth: 1.5, strokeDasharray: '3,3' },
  shared: { stroke: '#F59E0B', strokeWidth: 2 },
};

// 黑盒模式节点
const blackboxNodes: Node[] = [
  { id: 'user-input', type: 'custom', position: { x: 100, y: 300 }, data: { label: '用户输入', desc: '用户的指令和素材', nodeType: 'stage' } },
  { id: 'ai-process', type: 'custom', position: { x: 450, y: 300 }, data: { label: 'AI 处理', desc: '（内部过程不可见）', nodeType: 'stage' } },
  { id: 'result-output', type: 'custom', position: { x: 800, y: 300 }, data: { label: '输出结果', desc: '生成的内容', nodeType: 'stage' } },
];

const blackboxEdges: Edge[] = [
  { id: 'b1', source: 'user-input', target: 'ai-process', type: 'smoothstep', animated: true, style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'b2', source: 'ai-process', target: 'result-output', type: 'smoothstep', animated: true, style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
];

// 白盒模式节点
const whiteboxNodes: Node[] = [
  { id: 'entry', type: 'custom', position: { x: 50, y: 50 }, data: { label: '业务入口', desc: '用户选择业务场景', nodeType: 'stage' } },
  { id: 'agent-input', type: 'custom', position: { x: 50, y: 220 }, data: { label: 'Agent 输入', desc: '接收指令和素材', nodeType: 'stage' } },
  { id: 'context-orchestration', type: 'custom', position: { x: 50, y: 390 }, data: { label: '上下文编排', desc: '组装上下文信息', nodeType: 'stage' } },
  { id: 'role-setting', type: 'custom', position: { x: 350, y: 50 }, data: { label: '角色设定', desc: 'AI身份和行为边界', nodeType: 'component' } },
  { id: 'code-logic', type: 'custom', position: { x: 620, y: 50 }, data: { label: '代码逻辑', desc: '确定性业务规则', nodeType: 'component' } },
  { id: 'style-component', type: 'custom', position: { x: 350, y: 220 }, data: { label: '风格组件', desc: '风格示例和规范', nodeType: 'component' } },
  { id: 'memory-system', type: 'custom', position: { x: 620, y: 220 }, data: { label: '记忆系统', desc: '历史对话和偏好', nodeType: 'component' } },
  { id: 'context-fusion', type: 'custom', position: { x: 890, y: 135 }, data: { label: '编排融合', desc: '组装最终 Prompt', nodeType: 'fusion' } },
  { id: 'review', type: 'custom', position: { x: 50, y: 560 }, data: { label: '审视校验', desc: '自我检查逻辑漏洞', nodeType: 'stage' } },
  { id: 'safety', type: 'custom', position: { x: 320, y: 560 }, data: { label: '安全合规', desc: '敏感词和格式检查', nodeType: 'stage' } },
  { id: 'output', type: 'custom', position: { x: 590, y: 560 }, data: { label: '输出', desc: '生成最终结果', nodeType: 'stage' } },
  { id: 'feedback', type: 'custom', position: { x: 860, y: 560 }, data: { label: '反馈闭环', desc: '收集反馈优化系统', nodeType: 'stage' } },
];

const whiteboxEdges: Edge[] = [
  { id: 'w1', source: 'entry', target: 'agent-input', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w2', source: 'agent-input', target: 'context-orchestration', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w3', source: 'context-orchestration', target: 'role-setting', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w4', source: 'context-orchestration', target: 'style-component', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w5', source: 'role-setting', target: 'context-fusion', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w6', source: 'code-logic', target: 'context-fusion', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w7', source: 'style-component', target: 'context-fusion', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w8', source: 'memory-system', target: 'context-fusion', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w9', source: 'context-fusion', target: 'review', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w10', source: 'review', target: 'safety', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w11', source: 'safety', target: 'output', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'w12', source: 'output', target: 'feedback', type: 'smoothstep', style: edgeStyles.main, markerEnd: { type: MarkerType.ArrowClosed, color: '#60A5FA' } },
  { id: 'f1', source: 'feedback', target: 'memory-system', type: 'smoothstep', animated: true, style: edgeStyles.feedback, markerEnd: { type: MarkerType.ArrowClosed, color: '#34D399' } },
];

const technicalNodes: Node[] = [
  ...whiteboxNodes,
  { id: 'llm-api', type: 'custom', position: { x: 1150, y: 50 }, data: { label: 'LLM API', desc: 'GPT-4/Claude/DeepSeek', nodeType: 'service' } },
  { id: 'vector-db', type: 'custom', position: { x: 1150, y: 180 }, data: { label: '向量数据库', desc: 'Milvus/Pinecone', nodeType: 'service' } },
  { id: 'knowledge-base', type: 'custom', position: { x: 1150, y: 310 }, data: { label: '知识库', desc: 'ES + 文档管理', nodeType: 'service' } },
  { id: 'cache', type: 'custom', position: { x: 1150, y: 440 }, data: { label: '缓存层', desc: 'Redis Cluster', nodeType: 'service' } },
  { id: 'rule-engine', type: 'custom', position: { x: 1150, y: 570 }, data: { label: '规则引擎', desc: 'Drools/自研', nodeType: 'service' } },
];

const technicalEdges: Edge[] = [
  ...whiteboxEdges,
  { id: 't1', source: 'context-fusion', target: 'llm-api', type: 'smoothstep', style: edgeStyles.tech, markerEnd: { type: MarkerType.ArrowClosed, color: '#A78BFA' } },
  { id: 't2', source: 'style-component', target: 'vector-db', type: 'smoothstep', style: edgeStyles.shared, markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' } },
  { id: 't3', source: 'code-logic', target: 'knowledge-base', type: 'smoothstep', style: edgeStyles.tech, markerEnd: { type: MarkerType.ArrowClosed, color: '#A78BFA' } },
  { id: 't4', source: 'memory-system', target: 'cache', type: 'smoothstep', style: edgeStyles.tech, markerEnd: { type: MarkerType.ArrowClosed, color: '#A78BFA' } },
  { id: 't5', source: 'safety', target: 'rule-engine', type: 'smoothstep', style: edgeStyles.tech, markerEnd: { type: MarkerType.ArrowClosed, color: '#A78BFA' } },
];

type EdgeStyleType = 'main' | 'feedback' | 'tech' | 'shared';

const FlowCanvas: React.FC<FlowCanvasProps> = ({ mode }) => {
  const [currentEdgeStyle, setCurrentEdgeStyle] = useState<EdgeStyleType>('main');
  
  const initialNodes = useMemo(() => {
    switch (mode) {
      case 'blackbox': return blackboxNodes;
      case 'whitebox': return whiteboxNodes;
      case 'technical': return technicalNodes;
      default: return whiteboxNodes;
    }
  }, [mode]);

  const initialEdges = useMemo(() => {
    switch (mode) {
      case 'blackbox': return blackboxEdges;
      case 'whitebox': return whiteboxEdges;
      case 'technical': return technicalEdges;
      default: return whiteboxEdges;
    }
  }, [mode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [mode, initialNodes, initialEdges, setNodes, setEdges]);

  // 创建新连线
  const onConnect = useCallback((params: Connection) => {
    const colors: Record<EdgeStyleType, string> = {
      main: '#60A5FA',
      feedback: '#34D399', 
      tech: '#A78BFA',
      shared: '#F59E0B',
    };
    
    const newEdge: Edge = {
      ...params,
      id: `e-${Date.now()}`,
      type: 'smoothstep',
      style: edgeStyles[currentEdgeStyle],
      animated: currentEdgeStyle === 'feedback',
      markerEnd: { type: MarkerType.ArrowClosed, color: colors[currentEdgeStyle] },
    } as Edge;
    
    setEdges((eds) => addEdge(newEdge, eds));
  }, [currentEdgeStyle, setEdges]);

  // 删除连线（选中后按 Delete 或 Backspace）
  const onEdgesChangeHandler = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const styleButtons: { type: EdgeStyleType; label: string; color: string }[] = [
    { type: 'main', label: '主流程', color: '#60A5FA' },
    { type: 'feedback', label: '反馈', color: '#34D399' },
    { type: 'tech', label: '技术', color: '#A78BFA' },
    { type: 'shared', label: '共享', color: '#F59E0B' },
  ];

  return (
    <div className="w-full h-full" style={{ height: '800px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: edgeStyles[currentEdgeStyle].stroke, strokeWidth: 2 }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        deleteKeyCode={['Backspace', 'Delete']}
        selectionKeyCode={['Shift']}
      >
        <Background color="#334155" gap={20} />
        <Controls className="bg-slate-800 border-slate-600" />
        <MiniMap 
          nodeColor={(node) => {
            const type = node.data?.nodeType;
            if (type === 'stage') return '#3B82F6';
            if (type === 'component') return '#6366F1';
            if (type === 'fusion') return '#8B5CF6';
            if (type === 'service') return '#10B981';
            return '#64748B';
          }}
          className="bg-slate-900 border-slate-700"
        />
        
        {/* 连线样式选择面板 */}
        <Panel position="top-left" className="bg-slate-800/90 p-3 rounded-lg border border-slate-600">
          <div className="text-slate-300 text-xs mb-2">连线样式（拖拽节点连接点创建）</div>
          <div className="flex gap-2">
            {styleButtons.map(({ type, label, color }) => (
              <button
                key={type}
                onClick={() => setCurrentEdgeStyle(type)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  currentEdgeStyle === type 
                    ? 'ring-2 ring-offset-1 ring-offset-slate-800' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: color + '30',
                  color: color,
                  borderColor: color,
                  border: '1px solid',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="text-slate-500 text-[10px] mt-2">
            选中连线后按 Delete 删除
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
