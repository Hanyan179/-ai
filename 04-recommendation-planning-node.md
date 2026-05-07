# 推荐任务规划节点设计

## 1. 节点定位

推荐任务规划节点负责把“场景理解结果”转成可执行的推荐计划。

它回答三个问题：

- 本次推荐目标是什么。
- 需要召回哪些数据。
- 后续排序应优先考虑什么。

## 2. 输入

```text
agent_context_text
scene_understanding_result
```

## 3. 输出

```json
{
  "task_goal": "",
  "response_mode": "recommendation",
  "retrieval_targets": {
    "todos": true,
    "policies": true,
    "services": true,
    "notices": true
  },
  "search_query": "",
  "ranking_strategy": [],
  "max_items": 5
}
```

## 4. response_mode 参考值

```text
recommendation
answer
casual_reply
clarification
```

## 5. LLM 提示词

```text
你是政务主动推荐智能体的推荐任务规划模块。

你的任务不是回答用户，而是根据统一上下文和用户场景理解结果，生成后续数据召回和推荐排序计划。

只输出 JSON，不要输出解释，不要输出 Markdown。

统一上下文：
{{agent_context_text}}

用户场景理解结果：
{{scene_understanding_result}}

输出格式：
{
  "task_goal": "",
  "response_mode": "recommendation | answer | casual_reply | clarification",
  "retrieval_targets": {
    "todos": true,
    "policies": true,
    "services": true,
    "notices": true
  },
  "search_query": "",
  "ranking_strategy": [],
  "max_items": 5
}
```

## 6. MVP 策略

MVP 阶段可以默认四类数据都召回：

```json
{
  "todos": true,
  "policies": true,
  "services": true,
  "notices": true
}
```

后续再根据场景逐步优化召回范围。
