# 辅助推荐智能体 MVP 节点清单与任务矩阵

## 1. 文档目的

本文档用于指导 Dify 工作流搭建，避免后续人员忘记每个节点的职责、输入输出和对应原始需求。

原则：

```text
原始需求不丢
MVP 先跑通
节点职责清楚
后续逐项增强
```

## 2. 开始节点参数约定

按照原始需求，MVP 开始节点按“用户输入 + 3 个业务上下文参数”设计。

如果 Dify 已经有默认用户输入，则开始节点只需要额外配置 3 个参数。

```text
business_scene
recommendation_context
custom_context
```

如果当前 Dify 应用没有默认用户输入变量，则配置 4 个变量。

```text
user_input
business_scene
recommendation_context
custom_context
```

变量名必须保持一致，后续节点统一引用。

### 2.1 user_input

用户当前输入。

示例：

```text
今天有什么需要我优先处理？
```

### 2.2 business_scene

当前业务场景。说明用户现在处于什么页面、模块、业务位置或办公环境。

MVP 固定业务场景：

```text
政务工作台首页 - 普通办公人员日常办公辅助推荐
```

示例：

```json
{
  "scene_name": "政务工作台首页",
  "module_name": "政务办公门户",
  "business_scene": "普通办公人员日常办公",
  "time": "2026-05-07 09:00:00",
  "location": "单位办公室"
}
```

### 2.3 recommendation_context

本次推荐业务和推荐目标。说明这次希望智能体推荐什么、推荐哪几类、最多推荐多少条。

MVP 示例：

```json
{
  "recommendation_goal": "生成今日办公辅助推荐",
  "recommendation_business": "日常办公辅助推荐",
  "recommend_types": ["information", "service", "task"],
  "focus": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
  "max_items": 5
}
```

### 2.4 custom_context

调用方自定义上下文。这里是调用方想要存放或放置的额外内容，不做固定字段限制。

可放内容：

- `user_id`
- `tenant_id`
- `caller_id`
- `current_object_id`
- `current_object_name`
- `mock_data`
- `deadline_scope`
- `extra_filters`
- `debug_flags`

MVP 示例：

```json
{
  "user_id": "u001",
  "tenant_id": "default",
  "caller_id": "government_office_portal",
  "deadline_scope": "today",
  "prefer_recent_behavior": true
}
```

## 3. MVP 固定业务场景

第一版 MVP 固定为：

```text
政务工作台首页 - 普通办公人员日常办公辅助推荐
```

选择这个场景的原因：

- 能覆盖信息推荐、服务推荐、任务推荐三类核心输出。
- 能验证用户身份、行为数据、上下文场景、记忆和推荐排序。
- 不依赖某一个具体业务系统页面，适合先跑通完整链路。

默认推荐范围：

```text
个人待办
重要通知
相关政策
常用服务事项
协同事项
```

## 4. MVP 工作流节点总览

```text
开始节点
→ 角色与权限配置加载
→ 固定数据获取
→ 上下文汇总
→ 数据预处理
→ 推荐需求判定
→ 用户画像与记忆整理
→ 场景模板匹配
→ 知识图谱关联与潜在需求挖掘
→ 推荐任务规划
→ 多源检索
→ 候选内容标准化
→ 内容适配补全
→ 合规性前置校验
→ 推荐排序
→ 个性化推荐生成
→ 推荐结果优化
→ 最终回复生成
→ 反馈记录与记忆更新
→ 推荐效果分析
→ 结束节点
```

## 5. Dify 节点实施清单

| 序号 | 节点名称 | Dify 卡片 | MVP 实现 | 输入 | 输出 | 对应原始需求 | 状态 |
|---|---|---|---|---|---|---|---|
| 1 | 开始节点 | 开始 | 接收用户输入 + 3 个业务上下文参数 | 用户输入、业务上下文参数 | `user_input`、`business_scene`、`recommendation_context`、`custom_context` | 输入数据、上下文场景数据 | 待搭建 |
| 2 | 角色与权限配置加载 | Code / HTTP | 固定角色为政务办公辅助推荐专员，权限先由接口侧保证 | `business_scene`、`custom_context` | `role_config`、`permission_config` | 角色管理、人格设定、权限配置 | 待搭建 |
| 3 | 固定数据获取 | HTTP Request | 获取用户画像、行为数据、待办、通知、记忆；接口未接时允许为空 | `custom_context` | `system_data` | 数据收集与整合、用户行为数据、长短期记忆 | 待搭建 |
| 4 | 上下文汇总 | Code | 合并业务上下文、角色配置、系统数据 | 开始节点变量、`role_config`、`system_data` | `agent_context`、`agent_context_text` | 数据收集与整合 | 待搭建 |
| 5 | 数据预处理 | Code | 清洗空值、统一 JSON、统一列表结构 | `agent_context` | `clean_context` | 数据预处理、多源融合适配 | 待搭建 |
| 6 | 推荐需求判定 | LLM | 判断是否属于辅助推荐服务范畴 | `clean_context` | `recommend_need_judgement` | 推荐意图识别、排除非推荐需求 | 待搭建 |
| 7 | 用户画像与记忆整理 | LLM / Code | 汇总身份、行为、短期记忆、长期偏好 | `clean_context` | `user_profile_summary` | 用户画像构建、个性化记忆 | 待搭建 |
| 8 | 场景模板匹配 | LLM / Code | 根据页面场景和推荐提示匹配模板 | `clean_context`、`user_profile_summary` | `scene_template` | 推荐场景模板库、特定场景指令 | 待搭建 |
| 9 | 知识图谱关联与潜在需求挖掘 | HTTP / LLM | MVP 用规则或知识库关联替代真实图谱 | `clean_context`、`scene_template` | `potential_needs`、`graph_relations` | 知识图谱数据、潜在需求挖掘 | 待搭建 |
| 10 | 推荐任务规划 | LLM | 生成推荐目标、推荐类型、召回范围、排序策略 | `clean_context`、`potential_needs` | `recommendation_plan` | 个性化推荐生成、推荐需求解析 | 待搭建 |
| 11 | 多源检索 | 知识库 / HTTP | 检索政策、事项、通知、待办；先全部召回 Top 5 | `recommendation_plan` | `retrieval_results` | NaiveRAG、InstructRAG、政务数据联动 | 待搭建 |
| 12 | 候选内容标准化 | Code | 统一成候选内容结构 | `retrieval_results` | `candidates` | 推荐数据源融合适配、结构化框架生成 | 待搭建 |
| 13 | 内容适配补全 | LLM | 补描述、来源、入口、缺失字段、关联说明 | `candidates`、`clean_context` | `completed_candidates` | 推荐内容适配补全 | 待搭建 |
| 14 | 合规性前置校验 | Code / HTTP | MVP 校验只使用用户可见数据；后续接合规规则库 | `completed_candidates`、`permission_config` | `compliance_checked_candidates` | 推荐合规性前置校验、权限管控 | 待搭建 |
| 15 | 推荐排序 | Code / LLM | 按临期、相关度、角色、时效排序 | `compliance_checked_candidates`、`recommendation_plan` | `ranked_items` | 推荐结果排序 | 待搭建 |
| 16 | 个性化推荐生成 | LLM | 生成信息、服务、任务等分类推荐列表 | `ranked_items`、`user_profile_summary` | `recommendation_result` | 个性化推荐生成 | 待搭建 |
| 17 | 推荐结果优化 | LLM / Code | 去重、压缩、补推荐理由、统一展示格式 | `recommendation_result` | `optimized_recommendation` | 推荐结果优化 | 待搭建 |
| 18 | 最终回复生成 | LLM | 生成用户可见回答，不暴露内部 JSON | `optimized_recommendation`、`recommend_need_judgement` | `final_answer` | 个性化推荐列表、提示词管理 | 待搭建 |
| 19 | 反馈记录与记忆更新 | HTTP Request | 记录推荐日志；MVP 可先占位 | `final_answer`、`ranked_items`、`clean_context` | `feedback_log_result` | 推荐结果评估、偏好学习 | 待搭建 |
| 20 | 推荐效果分析 | Code / HTTP | MVP 只记录点击、满意度字段占位 | `feedback_log_result` | `analysis_result` | 推荐效果分析 | 待搭建 |
| 21 | 结束节点 | 结束 | 返回最终回复 | `final_answer` | 用户可见输出 | 输出结果 | 待搭建 |

## 6. MVP 可合并实施建议

为了第一版画布不失控，可以先合并实现，但文档里仍保留完整节点。

### 6.1 第一组合并

```text
角色与权限配置加载
固定数据获取
上下文汇总
数据预处理
```

MVP 可实现为：

```text
HTTP Request，可选
→ Code：上下文汇总与预处理
```

### 6.2 第二组合并

```text
推荐需求判定
用户画像与记忆整理
场景模板匹配
知识图谱关联与潜在需求挖掘
推荐任务规划
```

MVP 可实现为：

```text
LLM：场景理解与推荐规划
```

### 6.3 第三组合并

```text
内容适配补全
推荐排序
个性化推荐生成
推荐结果优化
```

MVP 可实现为：

```text
LLM：排序、理由和推荐结果生成
```

## 7. 当前你在 Dify 里优先搭的节点

当前建议先搭这 5 个：

```text
开始节点
→ Code：上下文汇总与预处理
→ LLM：场景理解与推荐规划
→ LLM：推荐排序与生成
→ 结束节点
```

如果 Dify 有默认用户输入，开始节点先建 3 个参数：

```text
business_scene
recommendation_context
custom_context
```

如果没有默认用户输入，再额外建：

```text
user_input
```

## 8. 第一个 Code 节点输出约定

第一个 Code 节点建议输出：

```text
agent_context
agent_context_text
```

`agent_context_text` 给后续 LLM 节点直接使用。

## 9. 第一个 LLM 节点输出约定

场景理解与推荐规划节点建议输出 JSON：

```json
{
  "is_recommendation_request": true,
  "non_recommendation_reason": "",
  "user_profile_summary": {},
  "scene_understanding": {},
  "matched_scene_template": {},
  "potential_needs": [],
  "recommendation_plan": {
    "recommendation_types": ["information", "service", "task"],
    "retrieval_targets": ["policies", "services", "todos", "notices"],
    "ranking_strategy": [],
    "max_items": 5
  }
}
```

## 10. 最终回复要求

最终回复只面向用户，不输出内部 JSON。

推荐列表建议格式：

```text
为您推荐以下内容：

1. 标题
类型：
推荐理由：
建议操作：
来源：
```

## 11. 状态维护规则

后续每搭完一个节点，在本文档中更新状态：

```text
待搭建
已搭建
已联调
已验收
后续增强
```

这样后续人员可以直接知道：

- 当前做到哪一步。
- 哪些是 MVP 简化。
- 哪些是原始需求要求但还没做满。
