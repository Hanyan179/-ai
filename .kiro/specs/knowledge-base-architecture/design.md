# Design Document: 公文知识库架构

## Overview

本设计文档定义公文写作 AI 系统的核心资产——知识库的完整架构。知识库是公司真正的黄金资产，其价值在于：

1. **不可替代性**：技术层可以外包，提示词可以迭代，但知识库的积累需要时间和专业沉淀
2. **复利效应**：知识越积累越有价值，形成竞争壁垒
3. **可复用性**：同一知识可服务于多个场景、多个产品

## Architecture

### 整体架构图

```
┌─────────────────────────────────────────────────────────────────────┐
│                        公文知识库 (Knowledge Base)                    │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  文种体系   │  │  模板库    │  │ 高频词句库  │  │   范文库    │ │
│  │ (15种法定)  │  │ (结构框架) │  │ (场景表达)  │  │ (优质样本) │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
│         │                │                │                │        │
│         └────────────────┴────────────────┴────────────────┘        │
│                                   │                                  │
│                          ┌───────┴───────┐                          │
│                          │  格式规范库   │                          │
│                          │ (GB/T 9704)   │                          │
│                          └───────────────┘                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 四级层级结构

```
Level 0: 知识库根节点
    │
Level 1: 类目 (Category)
    ├── 法定公文类型
    ├── 格式规范
    ├── 通用词句
    └── 范文资源
    │
Level 2: 文种/子类目 (Document Type)
    ├── 通知 (5个子类型)
    ├── 报告
    ├── 请示
    └── ...共15种
    │
Level 3: 场景 (Scene)
    ├── 会议类通知
    │   ├── 共性模板
    │   └── 常见套件及高频词句
    │
Level 4: 知识节点 (Knowledge Node)
    ├── 会议召开方式常用表达
    ├── 参会人员常用表达
    ├── 会议报名要求常用表达
    └── ...
```

## Components and Interfaces

### 1. 文种体系 (DocumentTypeSystem)

```typescript
interface DocumentType {
  id: string;                    // 唯一标识
  name: string;                  // 文种名称：通知、报告、请示...
  definition: string;            // 定义说明
  direction: 'up' | 'down' | 'parallel';  // 行文方向
  applicableScenes: string[];    // 适用场景
  usageGuide: string;            // 使用指南
  subTypes?: DocumentSubType[];  // 子类型
}

interface DocumentSubType {
  id: string;
  name: string;                  // 如：会议类通知、工作部署类通知
  parentTypeId: string;
  specificRules: string[];       // 特殊规则
}
```

**15种法定公文类型：**
1. 决议 - 经会议讨论通过的重要决策事项
2. 决定 - 对重要事项作出决策和部署
3. 命令（令）- 发布行政法规和规章
4. 公报 - 公布重要决定或重大事项
5. 公告 - 向国内外宣布重要事项
6. 通告 - 在一定范围内公布应当遵守的事项
7. 意见 - 对重要问题提出见解和处理办法
8. 通知 - 发布、传达、部署工作
9. 通报 - 表彰先进、批评错误、传达情况
10. 报告 - 向上级汇报工作、反映情况
11. 请示 - 向上级请求指示、批准
12. 批复 - 答复下级请示事项
13. 议案 - 提请审议事项
14. 函 - 不相隶属机关之间商洽工作
15. 纪要 - 记载会议主要情况和议定事项

### 2. 模板库 (TemplateLibrary)

```typescript
interface Template {
  id: string;
  documentTypeId: string;        // 关联文种
  subTypeId?: string;            // 关联子类型
  name: string;                  // 模板名称
  version: string;               // 版本号
  structure: TemplateSection[];  // 结构定义
  placeholders: Placeholder[];   // 占位符说明
  createdAt: Date;
  updatedAt: Date;
  history: TemplateVersion[];    // 版本历史
}

interface TemplateSection {
  id: string;
  name: string;                  // 如：标题、主送机关、正文、落款
  required: boolean;             // 是否必填
  order: number;                 // 顺序
  format: string;                // 格式说明
  example: string;               // 示例
}

interface Placeholder {
  symbol: string;                // 如：×××
  description: string;           // 说明
  type: 'text' | 'date' | 'org' | 'person';
}
```

### 3. 高频词句库 (PhraseLibrary)

```typescript
interface PhraseCategory {
  id: string;
  name: string;                  // 场景名称
  description: string;
  phrases: Phrase[];
}

interface Phrase {
  id: string;
  categoryId: string;
  content: string;               // 词句内容
  applicableTypes: string[];     // 适用文种
  toneLevel: 'strong' | 'normal' | 'mild';  // 语气强度
  restrictions?: string[];       // 使用限制
  examples: string[];            // 使用示例
  usageCount: number;            // 使用次数统计
  tags: string[];                // 标签
}
```

**词句场景分类（以通知为例）：**
- 开头套话：为...、根据...、经...研究
- 过渡句：现就有关事项通知如下
- 结尾语：特此通知、请遵照执行
- 时间表达：自即日起、截至...
- 程度副词：务必、切实、认真
- 会议专用：会议召开方式、参会人员、报名要求、材料要求、报到要求、着装要求、请假要求、视频联调、会议纪律、食宿说明、报道要求

### 4. 范文库 (ExampleLibrary)

```typescript
interface Example {
  id: string;
  title: string;                 // 范文标题
  content: string;               // 范文内容
  documentTypeId: string;        // 文种
  industry: string;              // 行业：政府/企业/党务
  scene: string;                 // 场景
  source: string;                // 来源
  publishDate: Date;             // 发布日期
  structureAnnotation: StructureAnnotation[];  // 结构标注
  qualityScore: number;          // 质量评分
  isDesensitized: boolean;       // 是否已脱敏
  embedding?: number[];          // 向量表示（用于相似度检索）
}

interface StructureAnnotation {
  sectionName: string;           // 段落名称
  startIndex: number;            // 起始位置
  endIndex: number;              // 结束位置
  function: string;              // 功能说明
}
```

### 5. 格式规范库 (FormatSpecLibrary)

```typescript
interface FormatSpec {
  id: string;
  name: string;
  standard: string;              // 依据标准：GB/T 9704-2012
  sections: FormatSection[];
  validationRules: ValidationRule[];
}

interface FormatSection {
  name: string;                  // 版头/主体/版记
  elements: FormatElement[];
}

interface FormatElement {
  name: string;                  // 如：发文机关标志、标题、正文
  fontFamily: string;            // 字体
  fontSize: string;              // 字号
  lineHeight: string;            // 行距
  alignment: string;             // 对齐方式
  margin?: string;               // 边距
  specialRules?: string[];       // 特殊规则
}

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  validator: string;             // 校验逻辑
  errorMessage: string;
}
```

### 6. 知识节点 (KnowledgeNode)

```typescript
interface KnowledgeNode {
  id: string;
  path: string[];                // 完整路径：['法定公文类型', '通知', '会议类通知', '常见套件']
  name: string;
  content: RichText;             // 富文本内容
  tags: string[];
  source: string;                // 来源
  relatedNodes: string[];        // 关联节点ID
  references: Reference[];       // 被引用记录
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
}

interface Reference {
  nodeId: string;
  scene: string;
  timestamp: Date;
}

interface RichText {
  text: string;
  examples?: string[];
  notes?: string[];
  warnings?: string[];
}
```

## Data Models

### 知识库完整层级结构

```
公文知识库
│
├── 一、法定公文类型（15种）
│   │
│   ├── (一) 通知
│   │   ├── 1. 会议类通知
│   │   │   ├── 共性模板
│   │   │   │   └── [模板内容]
│   │   │   ├── 常见套件及高频词句
│   │   │   │   ├── (1) 会议召开方式常用表达
│   │   │   │   ├── (2) 参会人员常用表达
│   │   │   │   ├── (3) 会议报名要求常用表达
│   │   │   │   ├── (4) 会议材料要求常用表达
│   │   │   │   ├── (5) 会议报到要求常用表达
│   │   │   │   ├── (6) 会议着装要求常用表达
│   │   │   │   ├── (7) 会议请假要求常用表达
│   │   │   │   ├── (8) 视频会议联调要求常用表达
│   │   │   │   ├── (9) 会议纪律要求常用表达
│   │   │   │   ├── (10) 会议食宿说明常用表达
│   │   │   │   └── (11) 会议报道要求常用表达
│   │   │   └── 范文库
│   │   │       └── [范文列表]
│   │   │
│   │   ├── 2. 工作部署类通知
│   │   │   ├── 共性模板
│   │   │   ├── 常见套件及高频词句
│   │   │   └── 范文库
│   │   │
│   │   ├── 3. 任免类通知
│   │   ├── 4. 印发类通知
│   │   └── 5. 转发类通知
│   │
│   ├── (二) 报告
│   │   ├── 1. 工作报告
│   │   ├── 2. 情况报告
│   │   └── 3. 答复报告
│   │
│   ├── (三) 请示
│   ├── (四) 批复
│   ├── (五) 函
│   ├── (六) 决定
│   ├── (七) 命令
│   ├── (八) 公告
│   ├── (九) 通告
│   ├── (十) 意见
│   ├── (十一) 议案
│   ├── (十二) 纪要
│   ├── (十三) 公报
│   ├── (十四) 决议
│   └── (十五) 通报
│
├── 二、格式规范库
│   ├── (一) 版头规范
│   │   ├── 份号
│   │   ├── 密级和保密期限
│   │   ├── 紧急程度
│   │   ├── 发文机关标志
│   │   ├── 发文字号
│   │   └── 签发人
│   │
│   ├── (二) 主体规范
│   │   ├── 标题
│   │   ├── 主送机关
│   │   ├── 正文
│   │   ├── 附件说明
│   │   ├── 发文机关署名
│   │   ├── 成文日期
│   │   └── 印章
│   │
│   ├── (三) 版记规范
│   │   ├── 抄送机关
│   │   ├── 印发机关和印发日期
│   │   └── 页码
│   │
│   └── (四) 排版规范
│       ├── 字体字号
│       ├── 行距
│       ├── 页边距
│       └── 版心尺寸
│
├── 三、通用词句库
│   ├── (一) 开头套话
│   │   ├── 目的式：为...
│   │   ├── 依据式：根据...
│   │   ├── 原因式：由于...
│   │   └── 决定式：经...研究决定
│   │
│   ├── (二) 过渡句
│   │   ├── 现就有关事项通知如下
│   │   ├── 特通知如下
│   │   └── 现将有关事项函告如下
│   │
│   ├── (三) 结尾语
│   │   ├── 特此通知
│   │   ├── 请遵照执行
│   │   ├── 请认真贯彻执行
│   │   └── 妥否，请批示
│   │
│   ├── (四) 时间表达
│   │   ├── 自即日起
│   │   ├── 自...起
│   │   ├── 截至...
│   │   └── 于...前
│   │
│   └── (五) 程度副词
│       ├── 强：务必、必须、严禁、一律
│       ├── 中：应当、需要、要求
│       └── 弱：可以、建议、参照
│
└── 四、范文库
    ├── (一) 按文种分类
    │   └── [与法定公文类型对应]
    │
    ├── (二) 按行业分类
    │   ├── 政府公文
    │   ├── 企业公文
    │   └── 党务公文
    │
    └── (三) 按场景分类
        ├── 日常办公
        ├── 会议活动
        ├── 人事管理
        └── 专项工作
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: 知识节点路径完整性
*For any* knowledge node in the system, it must have a complete four-level path (Category → DocumentType → Scene → Node)
**Validates: Requirements 1.1, 1.2, 7.1**

### Property 2: 文种覆盖完整性
*For any* query for document types, the system must return exactly 15 legal document types as defined by regulations
**Validates: Requirements 2.1**

### Property 3: 模板结构完整性
*For any* template in the system, it must contain all required sections (title, recipient, body, signature) with proper required/optional markers
**Validates: Requirements 3.1, 3.2, 3.3**

### Property 4: 词句元数据完整性
*For any* phrase in the phrase library, it must have scene classification, applicable document types, and tone level
**Validates: Requirements 4.1, 4.3, 4.4**

### Property 5: 范文元数据完整性
*For any* example document, it must have classification by document type, industry, and scene, plus source and date metadata
**Validates: Requirements 5.1, 5.2, 5.3**

### Property 6: 多场景引用一致性
*For any* knowledge node referenced by multiple scenes, the node content must remain consistent across all references
**Validates: Requirements 1.3**

### Property 7: 层级过滤正确性
*For any* filter query at any level, the returned results must be a subset of the parent level's results
**Validates: Requirements 1.4**

### Property 8: 引用计数准确性
*For any* knowledge node, its reference count must equal the actual number of times it has been referenced
**Validates: Requirements 7.4**

### Property 9: 搜索结果相关性
*For any* keyword search in the phrase library, all returned phrases must contain the search keyword or its synonyms
**Validates: Requirements 4.5**

### Property 10: 统计数字准确性
*For any* node in the visualization, its displayed count must equal the actual number of child nodes
**Validates: Requirements 8.3**

## Error Handling

1. **路径不完整**：拒绝创建，返回缺失层级提示
2. **重复节点**：检测并提示合并或重命名
3. **引用失效**：定期检查，标记失效引用
4. **格式不符**：校验失败时返回具体违规项

## Testing Strategy

### Unit Tests
- 测试每种数据模型的 CRUD 操作
- 测试路径验证逻辑
- 测试搜索和过滤功能

### Property-Based Tests
- 使用 fast-check 生成随机知识节点，验证路径完整性
- 生成随机查询，验证过滤结果的正确性
- 生成随机引用操作，验证计数准确性

### Integration Tests
- 测试知识库与 RAG 检索的集成
- 测试知识库与 Prompt 组装的集成
