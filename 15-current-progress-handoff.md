# 当前进度交接

## 1. 当前项目目标

我们正在设计一个基于 Dify / 当前智能体平台的“政务办公辅助推荐智能体”。

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

为用户提供个性化辅助推荐。

推荐内容包括：

```text
政策文件
通知公告
业务指南
数据报告
服务事项
待办任务
协同事项
工具入口
模板资料
```

当前共识：

```text
原始需求不丢
MVP 先跑通
节点职责清楚
后续逐项增强
```

## 2. 当前 MVP 范围

MVP 固定业务场景：

```text
政务工作台首页
```

MVP 推荐范围：

```text
个人待办
重要通知
相关政策
常用服务事项
```

开始节点只额外配置 3 个参数：

```text
business_scene
recommendation_context
custom_context
```

Dify / 平台默认用户输入通过 `text` 或用户问题变量获取，不建议重复在开始节点创建 `user_input`。

## 3. 当前已验证结论

### 3.1 开始节点

开始节点已经能接收参数。

注意事项：

```text
第三个变量必须命名为 custom_context
recommendation_context 建议传对象，不建议长期只传数组
business_scene 可以先传字符串，后续建议传结构化 JSON
```

推荐测试值：

```json
{
  "business_scene": {
    "scene_name": "政务工作台首页",
    "module_name": "政务办公门户",
    "business_scene": "普通办公人员日常办公"
  },
  "recommendation_context": {
    "recommendation_business": "日常办公辅助推荐",
    "recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
    "max_items": 5
  },
  "custom_context": {
    "caller_id": "government_office_portal",
    "tenant_id": "default",
    "extra_requirement": "优先推荐今日需要处理、需要阅读或需要确认的内容"
  }
}
```

### 3.2 Code 节点平台规则

当前平台的 `代码块` 节点已经验证：

```text
语言：Python
表达式模式：关
是否自动解析：开
```

该平台的 Code 节点不是标准 Dify `def main(...) -> dict` 自动调用模式。

在 block 模式下：

```text
代码会执行
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

如果没有 `result`，会报：

```text
NameError: name 'result' is not defined
```

### 3.3 Code 节点已跑通

当前 Code 节点已经成功输出：

```text
agent_context
agent_context_text
data
message
```

其中：

```text
后续 LLM 优先引用 代码块_1.agent_context_text
如果变量选择器没有该字段，则引用 代码块_1.data
```

### 3.4 变量可见性结论

Chat 节点中已验证可获取：

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

Code 节点未显式映射时可获取：

```text
request_vars
global_vars
session_vars
kms_base_url
```

Code 节点中需要显式映射：

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

## 4. 当前最重要变量

`user_info / userInfo` 是当前最重要的用户身份、组织、权限和知识库范围来源。

它已验证可支撑：

```text
用户身份识别
组织部门识别
安全等级识别
角色数量识别
权限数量识别
可访问知识库范围识别
```

后续 Code 节点应显式映射：

```text
user_info_input ← user_info
```

并从中整理：

```text
user_id
user_name
dept_id
dept_name
unit_id
unit_name
security_level
security_level_name
role_ids
permission_codes
visible_knowledge_bases
```

## 5. 安全与脱敏原则

不要把以下内容原样送给 LLM：

```text
access_token
accessToken
内部 IP
完整接口 URL
完整 permission codes
完整 roleId
完整 user_id
request_vars 全量内容
```

可以给 LLM 的安全摘要：

```text
用户名
部门名称
单位名称
安全等级名称
角色数量
权限数量
可访问知识库数量
知识库名称和类型摘要
当前业务场景
推荐范围
当前时间
```

## 6. 当前仍需补齐的数据源

以下内容不是长期依赖自定义变量，而应逐步通过 HTTP / 知识库 / 工具 / 记忆节点获取：

```text
用户行为数据
长短期记忆
个人待办接口
重要通知接口
协同事项接口
政策检索结果
服务事项检索结果
知识图谱关系
反馈记录和效果分析
```

阶段性策略：

```text
MVP 阶段：可用 custom_context 或 mock 数据模拟
正式阶段：通过自定义接口、知识库检索、工具节点和反馈接口补齐
```

## 7. 最新 MVP 场景调整

最新口径：

```text
MVP 不再优先使用通用“政务工作台首页”作为实际验证场景。
MVP 优先使用“司法局案例推荐”作为具体落地场景。
```

该场景用于验证：

```text
用户身份与权限
司法行政业务场景
案件 / 事项上下文理解
案例知识库推荐
相关法规依据推荐
办理指引或文书模板推荐
推荐理由生成
```

开始节点仍然只配置：

```text
business_scene
recommendation_context
custom_context
```

推荐测试值：

```json
{
  "business_scene": {
    "scene_name": "司法局案例推荐",
    "module_name": "司法行政业务辅助",
    "business_scene": "案件办理或业务研判中的案例辅助推荐",
    "page_name": "案例推荐入口",
    "page_object": "当前案件或咨询事项"
  },
  "recommendation_context": {
    "recommendation_business": "司法局案例辅助推荐",
    "recommendation_scope": ["相似案例", "相关法规", "办理指引", "文书模板"],
    "max_items": 5,
    "priority_requirement": "优先推荐与当前案情、争议焦点、适用依据相近的案例"
  },
  "custom_context": {
    "tenant_id": "default",
    "caller_id": "judicial_case_assistant",
    "case_id": "",
    "case_title": "",
    "case_type": "",
    "case_summary": "",
    "dispute_focus": [],
    "keywords": [],
    "extra_requirement": "推荐结果需要说明相似点、适用依据和参考价值"
  }
}
```

详见：

```text
16-judicial-case-recommendation-mvp.md
```

## 8. 建议的最小 MVP 五卡片

下一步具体设计以下 5 张卡片：

```text
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与推荐规划
→ Chat_2：推荐排序与结果生成
→ 结束_1
```

### 8.1 开始_1

职责：

```text
接收司法局案例推荐场景、推荐范围、案件 / 事项自定义上下文。
```

变量：

```text
business_scene
recommendation_context
custom_context
```

### 8.2 代码块_1：上下文汇总与可行性盘点

职责：

```text
汇总用户输入、用户信息、组织权限、司法局案例推荐场景、推荐范围、案件上下文、知识库范围、运行环境。
输出统一 agent_context。
输出 LLM 安全上下文。
输出可行性研究报告。
```

建议输出：

```text
agent_context
agent_context_text
llm_safe_context
llm_context_text
feasibility_report
data
message
```

### 8.3 Chat_1：场景理解与案例推荐规划

职责：

```text
判断是否为案例推荐请求。
理解当前司法行政业务场景。
提取案情要素、案件类型、争议焦点和关键词。
基于现有数据和缺失数据生成案例推荐规划。
```

建议输出：

```json
{
  "is_recommendation_request": true,
  "scene": "司法局案例推荐",
  "case_understanding": {},
  "user_profile_summary": {},
  "available_data_summary": {},
  "missing_data_summary": [],
  "recommendation_plan": {
    "recommendation_types": [],
    "retrieval_targets": [],
    "ranking_strategy": [],
    "max_items": 5
  }
}
```

### 8.4 Chat_2：案例推荐排序与结果生成

职责：

```text
根据上下文、知识库结果和案例推荐规划生成用户可见推荐结果。
MVP 阶段如果没有真实案例知识库结果，可输出基于当前可用信息的推荐框架和待接入数据源说明。
如果 custom_context 中有 mock 数据，则基于 mock 数据生成真实推荐列表。
```

### 8.5 结束_1

职责：

```text
返回 Chat_2 的用户可见输出。
```

## 9. 后续扩展卡片

MVP 跑通后按需添加：

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

## 10. 新对话建议开场

新对话可以从这里开始：

```text
我们继续设计“政务办公辅助推荐智能体”的最小 MVP 五卡片。

最新 MVP 场景已调整为：司法局案例推荐。

目标是在司法局工作人员办理、审核、研判或检索事项时，根据用户输入、案件/事项上下文、用户身份权限和知识库内容，推荐相似案例、相关法规、办理指引和文书模板。

当前已完成：
1. 开始节点最终只配置 business_scene、recommendation_context、custom_context。
2. 当前平台 Code 节点已验证：Python、表达式模式关、自动解析开，block 模式最后必须提供 result。
3. Chat 节点可获取 user_info、user_id、user_name、now、text、business_scene、recommendation_context 等变量。
4. user_info 是用户身份、组织、权限、安全等级、可访问知识库的核心来源。
5. Code 节点需要显式映射 text、now、user_info、business_scene、recommendation_context、custom_context 等变量。
6. 后续不要把 access_token、内部 URL、完整权限码、完整 request_vars 原样送给 LLM。

现在请从五张卡片开始具体设计：
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与案例推荐规划
→ Chat_2：案例推荐排序与结果生成
→ 结束_1

请先设计每张卡片的职责、输入变量、输出变量、提示词或代码。
```
