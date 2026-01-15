import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 状态类型
type NodeStatus = 'ready' | 'building' | 'planned';

// 节点展示类型 - 支持不同 UI
type DisplayType = 'default' | 'card' | 'list' | 'grid';

// 树节点
interface TreeNode {
  id: string;
  title: string;
  desc?: string;
  status?: NodeStatus;
  tech?: string;
  company?: string;
  displayType?: DisplayType;  // 子节点展示方式
  icon?: string;              // 自定义图标
  children?: TreeNode[];
}

// 完整知识树数据
const agentFlow: TreeNode[] = [
  {
    id: 's1',
    title: '1. 业务入口',
    desc: '用户选择场景，系统识别意图',
    status: 'building',
    icon: '🚪',
    children: [
      { id: 's1-intent', title: '意图识别', desc: 'NLU + 分类模型', status: 'planned', tech: 'FastText / BERT' },
      { id: 's1-router', title: '场景路由', desc: '路由到对应流程', status: 'ready', tech: '路由表', company: 'MAP 中台可对接' },
    ],
  },
  {
    id: 's2',
    title: '2. Agent 输入',
    desc: '接收用户指令和素材',
    status: 'ready',
    icon: '📥',
    children: [
      { id: 's2-parse', title: '文档解析', desc: 'PDF/Word', status: 'ready', tech: 'PyMuPDF', company: '文档服务已有' },
      { id: 's2-ocr', title: 'OCR 识别', desc: '图片文字', status: 'ready', tech: 'PaddleOCR', company: 'OCR 服务已有' },
      { id: 's2-chunk', title: '文本切分', desc: 'Chunking', status: 'building', tech: 'LangChain' },
    ],
  },
  {
    id: 's3',
    title: '3. 上下文编排',
    desc: '组装 Prompt 上下文',
    status: 'building',
    icon: '🎯',
    displayType: 'card',
    children: [
      {
        id: 's3-role',
        title: '角色设定',
        desc: 'AI 身份边界',
        status: 'ready',
        icon: '👤',
        children: [
          { id: 's3-role-tpl', title: 'System Prompt 模板', status: 'ready', tech: 'Jinja2' },
          { id: 's3-role-const', title: 'Constitutional AI', status: 'building', tech: 'Anthropic 模式' },
        ],
      },
      {
        id: 's3-logic',
        title: '代码逻辑',
        desc: '确定性规则',
        status: 'building',
        icon: '⚙️',
        children: [
          { id: 's3-logic-rule', title: '规则引擎', status: 'planned', tech: 'Drools', company: '规则引擎可复用' },
          { id: 's3-logic-tree', title: '决策树', status: 'building', tech: 'Python' },
          { id: 's3-logic-schema', title: 'Schema 校验', status: 'ready', tech: 'jsonschema' },
        ],
      },
      {
        id: 's3-style',
        title: '风格组件',
        desc: '风格示例规范',
        status: 'building',
        icon: '🎨',
        children: [
          { id: 's3-style-rag', title: 'RAG 检索', status: 'building', tech: 'LangChain RAG' },
          {
            id: 's3-style-kb',
            title: '知识库',
            desc: '公文结构化知识',
            status: 'building',
            icon: '📚',
            displayType: 'list',
            children: [
              {
                id: 'kb-doc',
                title: '一、法定公文类型',
                status: 'building',
                children: [
                  {
                    id: 'kb-doc-meeting',
                    title: '(一) 会议类通知',
                    status: 'ready',
                    children: [
                      { id: 'kb-m-tpl', title: '1. 共性模板', status: 'ready' },
                      {
                        id: 'kb-m-phrases',
                        title: '2. 常见套件及高频词句',
                        status: 'ready',
                        displayType: 'grid',
                        children: [
                          { id: 'p1', title: '会议召开方式', status: 'ready' },
                          { id: 'p2', title: '参会人员', status: 'ready' },
                          { id: 'p3', title: '报名要求', status: 'ready' },
                          { id: 'p4', title: '材料要求', status: 'ready' },
                          { id: 'p5', title: '报到要求', status: 'ready' },
                          { id: 'p6', title: '着装要求', status: 'ready' },
                          { id: 'p7', title: '请假要求', status: 'ready' },
                          { id: 'p8', title: '视频联调', status: 'ready' },
                          { id: 'p9', title: '会议纪律', status: 'ready' },
                          { id: 'p10', title: '食宿说明', status: 'ready' },
                          { id: 'p11', title: '报道要求', status: 'ready' },
                        ],
                      },
                    ],
                  },
                  { id: 'kb-doc-work', title: '(二) 工作类通知', status: 'building' },
                  { id: 'kb-doc-report', title: '(三) 报告', status: 'planned' },
                  { id: 'kb-doc-request', title: '(四) 请示', status: 'planned' },
                  { id: 'kb-doc-reply', title: '(五) 批复', status: 'planned' },
                  { id: 'kb-doc-opinion', title: '(六) 意见', status: 'planned' },
                  { id: 'kb-doc-letter', title: '(七) 函', status: 'planned' },
                  { id: 'kb-doc-minutes', title: '(八) 纪要', status: 'planned' },
                ],
              },
              { id: 'kb-plan', title: '二、工作计划类', status: 'ready' },
              { id: 'kb-summary', title: '三、工作总结类', status: 'planned' },
              { id: 'kb-speech', title: '四、讲话稿类', status: 'planned' },
              { id: 'kb-common', title: '五、通用知识', status: 'building' },
            ],
          },
          { id: 's3-style-vec', title: '向量数据库', status: 'ready', tech: 'Milvus', company: '已部署' },
        ],
      },
      {
        id: 's3-memory',
        title: '记忆系统',
        desc: '历史和偏好',
        status: 'planned',
        icon: '🧠',
        children: [
          { id: 's3-mem-short', title: '短期记忆', status: 'ready', tech: 'Redis', company: 'Redis 已有' },
          { id: 's3-mem-long', title: '长期记忆', status: 'planned', tech: 'MemGPT' },
        ],
      },
      {
        id: 's3-fusion',
        title: '编排融合',
        desc: '组装 Prompt',
        status: 'building',
        icon: '🔗',
        children: [
          { id: 's3-fusion-token', title: 'Token 管理', status: 'building', tech: 'tiktoken' },
          { id: 's3-fusion-priority', title: '优先级排序', status: 'planned' },
        ],
      },
    ],
  },
  {
    id: 's4',
    title: '4. 审视校验',
    desc: '自我检查逻辑漏洞',
    status: 'planned',
    icon: '🔍',
    children: [
      { id: 's4-cot', title: 'Chain of Thought', status: 'planned', tech: 'CoT Prompting' },
      { id: 's4-critic', title: 'Self-Critique', status: 'planned', tech: 'Critic Model' },
    ],
  },
  {
    id: 's5',
    title: '5. 安全合规',
    desc: '敏感词过滤格式校验',
    status: 'ready',
    icon: '🛡️',
    children: [
      { id: 's5-filter', title: '敏感词过滤', status: 'ready', tech: 'DFA', company: '敏感词库已有' },
      { id: 's5-format', title: '格式校验', status: 'ready', tech: '正则' },
      { id: 's5-political', title: '政治合规', status: 'ready', tech: '内容安全 API', company: 'API 可调用' },
    ],
  },
  {
    id: 's6',
    title: '6. 输出',
    desc: '流式输出结果',
    status: 'ready',
    icon: '📤',
    children: [
      { id: 's6-stream', title: '流式传输', status: 'ready', tech: 'SSE' },
      { id: 's6-render', title: 'Markdown 渲染', status: 'ready', tech: 'react-markdown' },
    ],
  },
  {
    id: 's7',
    title: '7. 反馈闭环',
    desc: '收集反馈持续优化',
    status: 'planned',
    icon: '🔄',
    children: [
      { id: 's7-collect', title: '反馈收集', status: 'planned' },
      { id: 's7-learn', title: '偏好学习', status: 'planned', tech: 'RLHF' },
    ],
  },
];

// 状态图标组件
const StatusIcon: React.FC<{ status?: NodeStatus }> = ({ status }) => {
  switch (status) {
    case 'ready':
      return <span className="text-emerald-400 text-sm font-bold">✓</span>;
    case 'building':
      return <span className="text-amber-400 text-sm">⚡</span>;
    case 'planned':
      return <span className="text-slate-500 text-sm">○</span>;
    default:
      return null;
  }
};

// 状态背景色
const getStatusBg = (status?: NodeStatus) => {
  switch (status) {
    case 'ready': return 'bg-emerald-500/10 border-emerald-500/30';
    case 'building': return 'bg-amber-500/10 border-amber-500/30';
    case 'planned': return 'bg-slate-500/10 border-slate-500/30';
    default: return 'bg-slate-800/50 border-slate-700/50';
  }
};

// 树节点组件
interface TreeItemProps {
  node: TreeNode;
  depth: number;
  onSelect: (node: TreeNode) => void;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  searchTerm: string;
}

const TreeItem: React.FC<TreeItemProps> = ({ 
  node, depth, onSelect, expandedIds, toggleExpand, searchTerm 
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isMatch = searchTerm && node.title.toLowerCase().includes(searchTerm.toLowerCase());
  
  // 根据 displayType 渲染子节点
  const renderChildren = () => {
    if (!hasChildren || !isExpanded) return null;
    
    const displayType = node.displayType || 'default';
    
    if (displayType === 'grid') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="ml-6 mt-2 grid grid-cols-3 gap-2"
        >
          {node.children!.map(child => (
            <div
              key={child.id}
              onClick={() => onSelect(child)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all text-sm
                ${getStatusBg(child.status)} border hover:scale-105`}
            >
              <div className="flex items-center gap-2">
                <StatusIcon status={child.status} />
                <span className="text-slate-200 truncate">{child.title}</span>
              </div>
            </div>
          ))}
        </motion.div>
      );
    }
    
    if (displayType === 'card') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="ml-6 mt-3 grid grid-cols-2 gap-3"
        >
          {node.children!.map(child => (
            <div
              key={child.id}
              className={`p-4 rounded-xl cursor-pointer transition-all
                ${getStatusBg(child.status)} border hover:border-blue-500/50`}
            >
              <div className="flex items-center gap-2 mb-2">
                {child.icon && <span className="text-xl">{child.icon}</span>}
                <StatusIcon status={child.status} />
                <span className="text-white font-medium">{child.title}</span>
              </div>
              {child.desc && <p className="text-slate-400 text-sm mb-2">{child.desc}</p>}
              {child.children && (
                <div className="text-xs text-slate-500">
                  {child.children.length} 个子项
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleExpand(child.id); }}
                    className="ml-2 text-blue-400 hover:text-blue-300"
                  >
                    {expandedIds.has(child.id) ? '收起' : '展开'}
                  </button>
                </div>
              )}
              <AnimatePresence>
                {expandedIds.has(child.id) && child.children && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-slate-700/50"
                  >
                    {child.children.map(subChild => (
                      <TreeItem
                        key={subChild.id}
                        node={subChild}
                        depth={0}
                        onSelect={onSelect}
                        expandedIds={expandedIds}
                        toggleExpand={toggleExpand}
                        searchTerm={searchTerm}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      );
    }
    
    // default 和 list 模式
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className={displayType === 'list' ? 'ml-4 mt-2 space-y-1' : 'mt-1'}
      >
        {node.children!.map(child => (
          <TreeItem
            key={child.id}
            node={child}
            depth={depth + 1}
            onSelect={onSelect}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            searchTerm={searchTerm}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className={depth === 0 ? 'mb-2' : ''}>
      <div
        className={`group flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all
          ${isMatch ? 'bg-blue-500/20 ring-1 ring-blue-500/50' : 'hover:bg-slate-800/70'}
          ${depth === 0 ? 'bg-gradient-to-r from-slate-800/80 to-slate-800/40 border border-slate-700/50' : ''}
        `}
        style={{ marginLeft: depth > 0 ? `${depth * 16}px` : 0 }}
        onClick={() => hasChildren ? toggleExpand(node.id) : onSelect(node)}
      >
        {/* 展开/收起图标 */}
        {hasChildren ? (
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="text-slate-400 text-xs w-4"
          >
            ▶
          </motion.span>
        ) : (
          <span className="w-4 text-center text-slate-600">•</span>
        )}
        
        {/* 节点图标 */}
        {node.icon && <span className="text-lg">{node.icon}</span>}
        
        {/* 状态图标 */}
        <StatusIcon status={node.status} />
        
        {/* 标题 */}
        <span className={`${depth === 0 ? 'text-white font-semibold' : 'text-slate-300'}`}>
          {node.title}
        </span>
        
        {/* 描述 */}
        {node.desc && depth === 0 && (
          <span className="text-slate-500 text-sm ml-2">— {node.desc}</span>
        )}
        
        {/* 技术标签 */}
        {node.tech && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
            {node.tech}
          </span>
        )}
        
        {/* 公司资源标记 */}
        {node.company && (
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            公司已有
          </span>
        )}
        
        {/* 查看详情按钮 */}
        {!hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(node); }}
            className="ml-2 text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            详情
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {renderChildren()}
      </AnimatePresence>
    </div>
  );
};

// 详情面板
interface DetailPanelProps {
  node: TreeNode | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ node, onClose }) => {
  if (!node) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 top-1/4 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-6 z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-white"
      >
        ✕
      </button>
      
      <div className="flex items-center gap-3 mb-4">
        {node.icon && <span className="text-3xl">{node.icon}</span>}
        <div>
          <h3 className="text-white font-bold text-lg">{node.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusIcon status={node.status} />
            <span className="text-sm text-slate-400">
              {node.status === 'ready' ? '已就绪' : node.status === 'building' ? '建设中' : '待建设'}
            </span>
          </div>
        </div>
      </div>
      
      {node.desc && (
        <p className="text-slate-300 mb-4">{node.desc}</p>
      )}
      
      {node.tech && (
        <div className="mb-4">
          <span className="text-slate-500 text-sm">技术方案</span>
          <div className="mt-1 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300">
            {node.tech}
          </div>
        </div>
      )}
      
      {node.company && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <span className="text-emerald-400 font-medium">🏢 公司资源</span>
          <p className="text-emerald-300 text-sm mt-1">{node.company}</p>
        </div>
      )}
    </motion.div>
  );
};

// 统计状态
const countStatus = (nodes: TreeNode[]): { ready: number; building: number; planned: number } => {
  let ready = 0, building = 0, planned = 0;
  
  const count = (items: TreeNode[]) => {
    items.forEach(item => {
      if (item.status === 'ready') ready++;
      else if (item.status === 'building') building++;
      else if (item.status === 'planned') planned++;
      if (item.children) count(item.children);
    });
  };
  
  count(nodes);
  return { ready, building, planned };
};

// 主组件
const KnowledgeTree: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['s3', 's3-style']));
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<NodeStatus | 'all'>('all');
  
  const stats = useMemo(() => countStatus(agentFlow), []);
  
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  
  const expandAll = () => {
    const allIds = new Set<string>();
    const collect = (nodes: TreeNode[]) => {
      nodes.forEach(n => {
        if (n.children) {
          allIds.add(n.id);
          collect(n.children);
        }
      });
    };
    collect(agentFlow);
    setExpandedIds(allIds);
  };
  
  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div className="relative">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        {/* 状态统计 */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-slate-300">{stats.ready} 已就绪</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">⚡</span>
            <span className="text-slate-300">{stats.building} 建设中</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">○</span>
            <span className="text-slate-300">{stats.planned} 待建设</span>
          </div>
        </div>
        
        {/* 搜索和操作 */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as NodeStatus | 'all')}
            className="px-3 py-1.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">全部状态</option>
            <option value="ready">已就绪</option>
            <option value="building">建设中</option>
            <option value="planned">待建设</option>
          </select>
          <button onClick={expandAll} className="px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300">
            全部展开
          </button>
          <button onClick={collapseAll} className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-300">
            全部收起
          </button>
        </div>
      </div>
      
      {/* 知识树 */}
      <div className="space-y-2">
        {agentFlow.map(node => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            onSelect={setSelectedNode}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            searchTerm={searchTerm}
          />
        ))}
      </div>
      
      {/* 详情面板 */}
      <AnimatePresence>
        {selectedNode && (
          <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KnowledgeTree;
