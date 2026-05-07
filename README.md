# 政务办公辅助推荐智能体文档总入口

## 0. 执行前必读

本文档真实路径：

```text
D:/dify/docs/政企推荐/government-recommend-agent/README.md
```

在 Windows PowerShell 中读取中文文档时，优先显式指定 UTF-8：

```powershell
Get-Content -LiteralPath 'D:\dify\docs\政企推荐\government-recommend-agent\README.md' -Encoding UTF8
```

如果 `rg` 被系统策略或安全软件拒绝执行，使用 PowerShell 原生命令替代：

```powershell
Get-ChildItem -LiteralPath 'D:\dify\docs\政企推荐\government-recommend-agent' -Recurse -File
Get-ChildItem -LiteralPath 'D:\dify\docs\政企推荐\government-recommend-agent' -Recurse -Filter '*.md' |
  Select-String -Pattern '关键词' -Encoding UTF8
```

新对话或新执行环境中，不要使用旧路径 `D:/dify/docs/government-recommend-agent/`。

## 1. 当前最新口径

项目目标：

```text
基于 Dify / 当前智能体平台，设计“政务办公辅助推荐智能体”。
```

原始完整需求是“1.1.2.1.5 辅助推荐”，要求综合：

```text
用户身份
用户行为数据
上下文场景数据
知识图谱数据
长短期记忆
权限与合规
推荐意图识别
推荐场景模板
RAG / 知识库
Tools 工具体系
反馈优化
流程编排
```

当前实施原则：

```text
原始需求不丢
MVP 先跑通
节点职责清楚
后续逐项增强
```

当前 MVP 实际落地场景已调整为：

```text
司法局案例推荐
```

目标是在司法局工作人员办理、审核、研判或检索事项时，根据：

```text
用户输入
案件 / 事项上下文
用户身份和权限
可访问知识库
相关案例 / 法规 / 指引 / 模板
```

推荐：

```text
相似案例
相关法规
办理指引
文书模板
```

## 2. 新对话必读顺序

新开对话时，优先阅读：

```text
15-current-progress-handoff.md
16-judicial-case-recommendation-mvp.md
14-variable-contract-and-context-schema.md
13-dify-mvp-build-guide.md
17-mvp-five-card-design.md
```

阅读用途：

| 顺序 | 文件 | 用途 |
|---|---|---|
| 1 | `15-current-progress-handoff.md` | 当前进度、已验证结论、新对话开场 |
| 2 | `16-judicial-case-recommendation-mvp.md` | 最新 MVP 场景：司法局案例推荐 |
| 3 | `14-variable-contract-and-context-schema.md` | 变量契约、自定义变量、上下文 Schema |
| 4 | `13-dify-mvp-build-guide.md` | 平台搭建细节、Code 节点规则、已验证代码 |
| 5 | `17-mvp-five-card-design.md` | 五卡片具体配置、Code 代码、Chat 提示词、测试值 |

## 3. 当前主线文档

### 3.1 当前交接

```text
15-current-progress-handoff.md
```

记录：

```text
当前最新结论
已验证平台规则
五卡片 MVP 方向
新对话建议开场
```

### 3.2 当前 MVP 场景

```text
16-judicial-case-recommendation-mvp.md
```

记录：

```text
司法局案例推荐场景
开始节点测试值
五卡片职责
后续知识库和接口接入方向
```

### 3.3 变量契约

```text
14-variable-contract-and-context-schema.md
```

记录：

```text
Chat 可获取变量
Code 需要显式映射变量
推荐自定义变量
agent_context Schema
LLM 安全上下文原则
```

### 3.4 平台搭建操作

```text
13-dify-mvp-build-guide.md
```

记录：

```text
开始节点配置
Code 节点配置
当前平台 block 模式 result 输出规则
变量探测代码
可行性研究数据盘点原则
```

### 3.5 五卡片具体设计

```text
17-mvp-five-card-design.md
```

记录：

```text
开始_1 变量和测试值
代码块_1 完整 Python 代码
Chat_1 场景理解与推荐规划提示词
Chat_2 推荐排序与结果生成提示词
结束_1 返回字段
推荐结果卡片 JSON 结构
预览运行验收标准
```

## 4. 原始需求与完整框架参考

这些文件不能删，后续验收和扩展需要对照。

| 文件 | 用途 |
|---|---|
| `11-original-requirement-checklist.md` | 原始需求总账 |
| `09-requirement-alignment-and-framework-upgrade.md` | 原始需求对齐与框架升级说明 |
| `10-dify-node-list-for-full-framework.md` | 完整形态 Dify 节点清单 |

## 5. 历史设计稿 / 旧 MVP 参考

以下文件保留作为历史参考，但不是当前最新执行口径。

| 文件 | 当前状态 |
|---|---|
| `00-overall-workflow.md` | 通用辅助推荐整体流程，已被司法局案例推荐 MVP 收敛 |
| `01-start-node-contract.md` | 开始节点旧说明，3 参数原则仍有效 |
| `02-context-enrichment-code-node.md` | 上下文汇总旧代码，已被当前平台 `result` 规则覆盖 |
| `03-scene-understanding-node.md` | 完整链路参考 |
| `04-recommendation-planning-node.md` | 完整链路参考 |
| `05-data-retrieval-node.md` | 完整链路参考 |
| `06-candidate-normalization-node.md` | 完整链路参考 |
| `07-ranking-and-reason-node.md` | 完整链路参考 |
| `08-final-response-and-feedback-node.md` | 完整链路参考 |
| `12-mvp-node-task-matrix.md` | 旧 MVP 矩阵，已被五卡片司法局案例推荐 MVP 更新 |

## 6. 当前已验证平台规则

### 6.1 Code 节点规则

当前平台的 `代码块` 节点应使用：

```text
语言：Python
表达式模式：关
是否自动解析：开
```

block 模式下：

```text
不会自动调用 main 函数
必须在最后提供 result 变量
```

正确输出方式：

```python
result = {
    "agent_context": agent_context,
    "agent_context_text": agent_context_text,
    "data": agent_context_text,
    "message": "agent_context 汇总完成"
}
```

### 6.2 Chat 节点变量

Chat 节点已验证可获取：

```text
now
model_name
text
application_id
conversation_id
request_vars
user_id / userId
user_name / userName
user_info / userInfo
access_token / accessToken
kms_base_url
business_scene
recommendation_context
data
```

### 6.3 Code 节点变量

Code 节点未显式映射时可获取：

```text
request_vars
global_vars
session_vars
kms_base_url
```

Code 节点建议显式映射：

```text
text
now
model_name
application_id
conversation_id
user_id
user_name
user_info
access_token
business_scene
recommendation_context
custom_context
knowledge_text
reference_data
file_contents
files
tool_calls
```

## 7. 当前 MVP 五卡片

当前五卡片的可配置级设计已补充到：

```text
17-mvp-five-card-design.md
```

五卡片链路为：

```text
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与案例推荐规划
→ Chat_2：案例推荐排序与结果生成
→ 结束_1
```

### 7.1 开始_1

变量：

```text
business_scene
recommendation_context
custom_context
```

职责：

```text
接收司法局案例推荐场景、推荐范围、案件 / 事项自定义上下文。
```

### 7.2 代码块_1：上下文汇总与可行性盘点

职责：

```text
汇总用户输入、用户身份、组织权限、司法局案例推荐场景、推荐范围、案件上下文、知识库范围、运行环境。
输出统一 agent_context。
输出 LLM 安全上下文。
输出可行性研究报告。
```

### 7.3 Chat_1：场景理解与案例推荐规划

职责：

```text
判断是否为案例推荐请求。
理解司法行政业务场景。
提取案情要素、案件类型、争议焦点和关键词。
生成案例推荐规划。
```

### 7.4 Chat_2：案例推荐排序与结果生成

职责：

```text
根据上下文、知识库结果和推荐规划生成用户可见推荐结果。
MVP 阶段如果没有真实案例知识库结果，可输出推荐框架和待接入数据源说明。
```

### 7.5 结束_1

职责：

```text
返回 Chat_2 的用户可见输出。
```

## 8. 后续按需添加卡片

MVP 跑通后逐步添加：

```text
知识库_1：检索相似案例
知识库_2：检索相关法规 / 政策依据
知识库_3：检索办理指引
知识库_4：检索文书模板
HTTP_1：获取当前案件 / 事项详情
HTTP_2：查询用户可访问案例库范围
HTTP_3：查询知识图谱关系
代码块_2：候选内容标准化
代码块_3：合规过滤与排序
HTTP_4：反馈记录
```

## 9. 进度规划

### 阶段一：五卡片 MVP

目标：

```text
跑通司法局案例推荐的最小链路。
```

任务：

```text
设计开始_1 的变量和测试值
设计代码块_1 的输入、输出和完整代码
设计 Chat_1 的提示词和 JSON 输出
设计 Chat_2 的提示词和用户可见输出格式
设计结束_1 的返回字段
```

当前具体设计稿：

```text
17-mvp-five-card-design.md
```

### 阶段二：接入知识库

目标：

```text
让案例推荐从“规划输出”变成“基于真实知识库结果推荐”。
```

任务：

```text
接入案例知识库
接入法规 / 政策知识库
接入办理指引库
接入文书模板库
补充知识库结果标准化
```

### 阶段三：接入业务接口

目标：

```text
获取真实案件 / 事项上下文和用户可访问范围。
```

任务：

```text
当前案件 / 事项详情接口
用户行为数据接口
权限范围接口
协同事项或办理记录接口
```

### 阶段四：增强推荐质量

目标：

```text
提升推荐准确性、合规性和可解释性。
```

任务：

```text
候选内容标准化
合规过滤
相似度排序
推荐理由增强
知识图谱关系接入
长短期记忆接入
```

### 阶段五：反馈闭环

目标：

```text
形成推荐效果优化闭环。
```

任务：

```text
推荐日志
点击 / 采纳 / 忽略反馈
满意度记录
效果分析
偏好更新
```

## 10. 新对话开场模板

新对话可直接发送：

```text
我们继续设计“政务办公辅助推荐智能体”。

请先阅读：
1. D:/dify/docs/政企推荐/government-recommend-agent/README.md
2. D:/dify/docs/政企推荐/government-recommend-agent/15-current-progress-handoff.md
3. D:/dify/docs/政企推荐/government-recommend-agent/16-judicial-case-recommendation-mvp.md
4. D:/dify/docs/政企推荐/government-recommend-agent/14-variable-contract-and-context-schema.md
5. D:/dify/docs/政企推荐/government-recommend-agent/13-dify-mvp-build-guide.md
6. D:/dify/docs/政企推荐/government-recommend-agent/17-mvp-five-card-design.md

当前最新 MVP 场景是：司法局案例推荐。

我们已经验证：
- 开始节点只配置 business_scene、recommendation_context、custom_context。
- 当前平台 Code 节点使用 Python，表达式模式关，自动解析开，最后必须提供 result。
- Chat 节点可获取 user_info、user_id、user_name、now、text、business_scene、recommendation_context 等变量。
- user_info 是用户身份、组织、权限、安全等级、可访问知识库的核心来源。
- 不要把 access_token、内部 URL、完整权限码、完整 request_vars 原样送给 LLM。

现在请开始具体设计五张卡片：
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与案例推荐规划
→ Chat_2：案例推荐排序与结果生成
→ 结束_1

请输出每张卡片的职责、输入变量、输出变量、提示词或代码。
```
