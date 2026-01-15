# Requirements Document

## Introduction

重构 Agent 工程化架构展示页面，将当前广告化的展示改为清晰的业务流程图 + 技术架构图双模式展示。基于行业最佳实践（OpenAI Agent Protocol、LangChain、Anthropic Claude 架构模式）设计。

## Glossary

- **Agent**: 能够自主执行任务的 AI 系统，包含感知、决策、执行能力
- **Context Engineering**: 上下文工程，系统化管理和编排 LLM 输入上下文的方法论
- **RAG**: Retrieval-Augmented Generation，检索增强生成
- **CoT**: Chain of Thought，思维链推理
- **Few-shot**: 少样本学习，通过示例引导模型行为
- **System Prompt**: 系统提示词，定义 Agent 角色和行为边界
- **Memory**: 记忆系统，包含短期（对话历史）和长期（用户偏好）记忆

## Requirements

### Requirement 1: 业务流程重构

**User Story:** 作为产品负责人，我需要向领导展示清晰的 Agent 业务流程，让非技术人员能快速理解系统如何工作。

#### Acceptance Criteria

1. THE Architecture_Page SHALL display a clear business flow with 5 main stages: 业务入口 → Agent输入 → 上下文编排 → 输出 → 反馈闭环
2. WHEN displaying business mode, THE System SHALL show simple node descriptions without technical jargon
3. THE System SHALL show data flow between stages with clear input/output labels
4. THE System SHALL display feedback loops: 输出→记忆系统、多轮对话回流、用户修改→风格学习

### Requirement 2: 上下文编排模块设计

**User Story:** 作为技术人员，我需要看到 Agent 核心的上下文编排是如何工作的，包括各业务组件的协作关系。

#### Acceptance Criteria

1. THE Context_Orchestration module SHALL contain multiple business components (示例：角色设定、代码逻辑、风格组件、记忆系统)
2. THE System SHALL emphasize that components are flexible - different business scenarios may have different component combinations
3. THE System SHALL show inter-component relationships (组件产出之间可能有互相关系):
   - 角色设定 ←→ 代码逻辑（角色决定逻辑规则）
   - 风格组件 ←→ 记忆系统（历史风格偏好）
   - 代码逻辑 → 风格组件（逻辑约束风格边界）
4. THE System SHALL show all component outputs merging into Context_Fusion node (编排融合)
5. WHEN in technical mode, THE System SHALL display each component's technology stack

### Requirement 3: 三模式切换

**User Story:** 作为展示者，我需要根据受众切换不同复杂度的视图，让不同背景的人都能理解。

#### Acceptance Criteria

1. THE System SHALL provide a toggle switch between three modes: "黑盒模式"、"白盒模式"、"技术模式"

2. WHEN in 黑盒模式 (Black Box), THE System SHALL show:
   - 最简化视图：用户输入 → AI处理 → 输出结果
   - 类似普通人理解的"提示词"工作方式
   - 隐藏所有内部实现细节
   - 适合完全不懂技术的受众

3. WHEN in 白盒模式 (White Box), THE System SHALL show:
   - 完整的 Agent 工程化业务流程
   - 5个阶段：业务入口 → Agent输入 → 上下文编排 → 输出 → 反馈闭环
   - 四大组件及其协作关系
   - 回流闭环连线
   - 简洁的节点描述，无技术术语
   - 适合想了解业务逻辑的受众

4. WHEN in 技术模式 (Technical), THE System SHALL show:
   - 白盒模式的所有内容
   - 额外显示：节点内部技术栈详情
   - 额外显示：隐藏的技术连线（向量库、LLM API、缓存等）
   - 额外显示：外部服务依赖层
   - 标注共通技术 vs 特定技术（用不同颜色/样式）
   - 适合技术人员

### Requirement 4: 白盒流程完整性分析

**User Story:** 作为架构师，我需要确保白盒模式的业务流程是完整的，没有遗漏关键环节。

#### Acceptance Criteria

1. THE Architecture SHALL include 审视/校验环节:
   - 当前缺失：从"上下文融合"直接到"输出"，没有自我审视
   - 业务意义：写完后像老秘书一样自我检查，发现逻辑漏洞和数据不一致
   - 位置：在"上下文融合"和"最终输出"之间
   - 白盒描述：系统自我审视文稿，检查逻辑和一致性

2. THE Architecture SHALL include 安全/合规环节:
   - 当前缺失：没有明确的安全过滤层
   - 业务意义：政务公文必须过安全红线，确保合规
   - 位置：在"输出"环节内部或之后
   - 白盒描述：敏感词检查、格式规范、政治合规

3. THE Architecture SHALL clarify 完整的白盒流程为:
   - Stage 1: 业务入口（场景识别 + 意图识别）
   - Stage 2: Agent 输入（用户指令 + 用户素材）
   - Stage 3: 上下文编排（多个业务组件并行 → 编排融合）
   - Stage 4: 审视校验（自我批判 + 一致性检查）
   - Stage 5: 安全合规（敏感词 + 格式 + 政治合规）
   - Stage 6: 输出（生成结果）
   - Stage 7: 反馈闭环（用户反馈 → 回流优化）

### Requirement 5: 技术模式详细设计

**User Story:** 作为技术人员，我需要在技术模式下看到每个环节的具体技术实现。

#### Acceptance Criteria

1. WHEN in technical mode, THE System SHALL display 外部服务层:
   - LLM API（大模型接口）
   - Vector Database（向量数据库）
   - Knowledge Base（知识库）
   - Rule Engine（规则引擎）
   - Cache Layer（缓存层）
   - MAP 中台（待对接）

2. WHEN in technical mode, THE System SHALL display 每个环节的技术栈:
   - 各环节使用的具体技术（如 RAG、CoT、RLHF 等）
   - 技术连线（哪些模块共用哪些服务）
   - 共通技术标注（用不同颜色区分）

3. THE System SHALL use different line styles:
   - 实线：主要数据流
   - 虚线：回流闭环
   - 特殊颜色：共通技术连接

### Requirement 6: 行业最佳技术栈实践

**User Story:** 作为技术人员，我需要看到每个模块采用的具体技术方案，对标行业最佳实践。

#### Acceptance Criteria

1. THE 业务入口 module SHALL include:
   - 技术：Intent Classification、Router Pattern
   - 输入：用户选择/自然语言
   - 输出：场景ID + 意图向量

2. THE Agent输入 module SHALL include:
   - 技术：Document Parsing（PDF/Word）、OCR、Chunking
   - 输入：用户指令 + 文件
   - 输出：结构化输入对象

3. THE 角色设定 component SHALL include:
   - 技术：System Prompt Template、Role Boundary Definition
   - 最佳实践：Anthropic Constitutional AI 模式
   - 输出：角色上下文块

4. THE 代码逻辑 component SHALL include:
   - 技术：Rule Engine、Decision Tree、Workflow DSL
   - 最佳实践：确定性逻辑优先于概率生成
   - 输出：逻辑约束规则

5. THE 风格组件 component SHALL include:
   - 技术：RAG、Few-shot Examples、Style Transfer
   - 最佳实践：检索增强 + 示例引导
   - 输出：风格上下文块

6. THE 记忆系统 component SHALL include:
   - 技术：Short-term Memory（对话历史）、Long-term Memory（向量存储）
   - 最佳实践：MemGPT / LangChain Memory 模式
   - 输出：记忆上下文块

7. THE 上下文融合 module SHALL include:
   - 技术：Context Window Management、Priority Ranking、Token Optimization
   - 最佳实践：Anthropic Context Engineering
   - 输出：最终 Prompt

8. THE 输出 module SHALL include:
   - 技术：Streaming Output、Format Validation、Safety Filter
   - 输出：生成结果

9. THE 反馈闭环 module SHALL include:
   - 技术：RLHF Signal Collection、Preference Learning、A/B Testing
   - 回流目标：记忆系统、风格组件

### Requirement 7: 文案去广告化

**User Story:** 作为展示者，我需要所有文案都是清晰的业务/技术描述，不要营销话术。

#### Acceptance Criteria

1. THE System SHALL NOT use marketing phrases like "越用越懂"、"人力倍增器"、"语义化学反应"
2. THE System SHALL use direct descriptions: "这一步做什么" + "输入是什么" + "输出是什么"
3. THE System SHALL use industry-standard terminology instead of invented terms
4. WHEN describing technical details, THE System SHALL reference specific technologies/frameworks

### Requirement 8: 共通技术标注

**User Story:** 作为技术人员，我需要知道哪些技术是多个模块共用的，便于理解系统架构。

#### Acceptance Criteria

1. WHEN in technical mode, THE System SHALL identify and highlight shared technologies:
   - LLM API：被上下文融合、输出模块共用
   - Vector Database：被风格组件、记忆系统共用
   - Embedding Model：被多个检索模块共用
2. THE System SHALL use visual indicators (color/badge) to mark shared vs module-specific technologies
3. THE System SHALL show shared technology connections with a distinct line style

### Requirement 9: 数据流可视化

**User Story:** 作为领导，我需要看到数据在系统中如何流动，每一步的输入输出是什么。

#### Acceptance Criteria

1. THE System SHALL label each connection line with data type/format
2. THE System SHALL show data transformation at each stage
3. WHEN hovering on a connection (business mode), THE System SHALL show a tooltip with:
   - 数据类型
   - 示例数据格式
4. THE System SHALL clearly show branching and merging points in the data flow

### Requirement 10: 统一画布系统

**User Story:** 作为开发者，我需要三种模式共用一个统一的画布系统，避免布局混乱和代码重复。

#### Acceptance Criteria

1. THE System SHALL use a single UnifiedCanvas component for all three modes (blackbox, whitebox, technical)
2. WHEN switching modes, THE System SHALL show/hide nodes and connections based on their visibleIn property, NOT switch entire view components
3. THE System SHALL maintain consistent node positions across mode switches
4. THE System SHALL use a single source of truth for layout positions defined in architectureConstants.ts

### Requirement 11: 规范化布局系统

**User Story:** 作为用户，我需要看到清晰、不混乱的架构图布局。

#### Acceptance Criteria

1. THE System SHALL use a layer-based layout with clear separation:
   - Layer 1 (Top): 业务入口、Agent输入 - 垂直排列
   - Layer 2 (Middle): 上下文编排 + 业务组件区域 - 组件横向排列
   - Layer 3 (Bottom): 审视校验 → 安全合规 → 输出 → 反馈 - 横向排列
   - Layer 4 (Right): 外部服务层 - 仅技术模式显示
2. THE System SHALL ensure minimum spacing between nodes to prevent overlap
3. THE System SHALL center the main flow vertically in the canvas

### Requirement 12: 智能连线系统

**User Story:** 作为用户，我需要看到清晰的连线，不会交叉混乱。

#### Acceptance Criteria

1. THE System SHALL use orthogonal (right-angle) routing for connections instead of curved bezier lines
2. THE System SHALL avoid line crossings where possible using smart routing
3. THE System SHALL use different line styles for different connection types:
   - main: 蓝色实线 (#60A5FA)
   - feedback: 绿色虚线 (#34D399)
   - tech: 紫色细线 (#A78BFA)
   - shared: 橙色线 (#F59E0B)
4. THE System SHALL route feedback loops on the left side of the diagram to avoid crossing main flow lines
