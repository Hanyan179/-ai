# Dify 完整节点清单建议

## 1. 节点清单

以下节点用于对齐原始“辅助推荐智能体”需求。

MVP 阶段可以全部保留节点，但每个节点先轻量实现。

## 2. 推荐 Dify 编排

```text
开始
→ 角色与权限配置加载
→ 系统固定数据获取
→ 上下文汇总代码块
→ 数据预处理
→ 推荐需求判定
→ 用户画像与记忆整理
→ 场景模板匹配
→ 知识图谱关联与潜在需求挖掘
→ 推荐任务规划
→ 基础检索 NaiveRAG
→ 指令式检索 InstructRAG
→ 候选内容标准化
→ 内容适配补全
→ 合规性前置校验
→ 推荐排序
→ 个性化推荐生成
→ 推荐结果优化
→ 最终回复生成
→ 反馈记录与记忆更新
→ 推荐效果分析
→ 结束
```

## 3. 各节点 Dify 卡片选择

| 节点 | Dify 卡片 | MVP 说明 |
|---|---|---|
| 开始 | 开始节点 | 接收用户输入 + 3 个上下文参数 |
| 角色与权限配置加载 | HTTP Request / 代码块 | MVP 固定角色配置 |
| 系统固定数据获取 | HTTP Request | 获取用户画像、行为、待办、通知、记忆 |
| 上下文汇总 | Code | 汇总页面上下文和系统数据 |
| 数据预处理 | Code | 清洗空值、统一时间、统一列表格式 |
| 推荐需求判定 | LLM | 判断是否属于推荐服务范畴 |
| 用户画像与记忆整理 | LLM / Code | 整理画像、偏好、近期行为 |
| 场景模板匹配 | LLM / Code | 匹配高频推荐模板 |
| 知识图谱关联 | HTTP Request / LLM | MVP 可用规则或知识库关联替代 |
| 推荐任务规划 | LLM | 生成召回目标、推荐类型、排序策略 |
| 基础检索 NaiveRAG | 知识库检索 / HTTP | 明确需求关键词检索 |
| 指令式检索 InstructRAG | LLM + 知识库检索 | 模糊需求先解析再检索 |
| 候选内容标准化 | Code | 统一候选内容结构 |
| 内容适配补全 | LLM | 补推荐理由、入口、缺失字段 |
| 合规性前置校验 | HTTP Request / Code | MVP 只校验接口返回可见数据 |
| 推荐排序 | Code / LLM | 简单规则排序 |
| 个性化推荐生成 | LLM | 输出信息、服务、任务三类推荐 |
| 推荐结果优化 | LLM / Code | 去重、压缩、格式优化 |
| 最终回复生成 | LLM | 生成用户可见文本 |
| 反馈记录与记忆更新 | HTTP Request | 写入推荐日志和偏好 |
| 推荐效果分析 | HTTP Request / Code | MVP 记录点击和满意度即可 |
| 结束 | 结束节点 | 返回最终回复 |

## 4. 开始节点参数

如果 Dify 已有默认用户输入，开始节点额外保留 3 个上下文参数：

```text
business_scene
recommendation_context
custom_context
```

如果没有默认用户输入，则补充：

```text
user_input
```

## 5. 系统固定数据获取节点建议输入

```text
business_scene
recommendation_context
custom_context
```

## 6. 系统固定数据获取节点建议输出

```json
{
  "role_config": {},
  "permission_config": {},
  "user_profile": {},
  "behavior_data": [],
  "short_term_memory": {},
  "long_term_memory": {},
  "todo_data": [],
  "notice_data": [],
  "service_data": [],
  "policy_data": [],
  "knowledge_graph_relations": [],
  "scene_templates": []
}
```

## 7. 上下文汇总后的统一结构

```json
{
  "page_context": {
    "business_scene": {},
    "recommendation_context": {},
    "custom_context": {}
  },
  "agent_role": {
    "role_name": "政务办公辅助推荐专员",
    "persona": ["精准", "高效", "贴心"],
    "permission_scope": []
  },
  "user_model": {
    "profile": {},
    "behavior_data": [],
    "short_term_memory": {},
    "long_term_memory": {}
  },
  "business_context": {
    "todos": [],
    "notices": [],
    "services": [],
    "policies": [],
    "knowledge_graph_relations": []
  },
  "recommendation_runtime": {
    "scene_templates": [],
    "default_types": ["information", "service", "task"],
    "max_items": 5
  }
}
```

## 8. MVP 可合并的节点

为了 Dify 上先跑通，可以临时合并以下节点：

```text
角色与权限配置加载
+ 系统固定数据获取
+ 上下文汇总
= 一个 Code 节点或 HTTP + Code 组合
```

```text
用户画像与记忆整理
+ 场景模板匹配
+ 知识图谱关联与潜在需求挖掘
= 一个 LLM 节点
```

```text
内容适配补全
+ 推荐排序
+ 个性化推荐生成
= 一个 LLM 节点
```

这样 Dify 画布不会过分臃肿，同时文档框架仍然完整。
