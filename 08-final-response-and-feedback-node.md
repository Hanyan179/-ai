# 最终回复生成与反馈记录节点设计

## 1. 最终回复生成节点

### 1.1 节点定位

最终回复生成节点负责把推荐排序结果转成用户可见的自然语言回答。

该节点不再做数据召回，不再重新排序，不暴露内部 JSON。

### 1.2 输入

```text
agent_context_text
recommendation_plan
recommended_items
```

### 1.3 输出

用户可见文本。

### 1.4 LLM 提示词

```text
你是面向政务办公场景的主动推荐服务智能体。

请根据统一上下文、推荐任务规划和推荐结果，生成最终给用户看的回答。

要求：
1. 不要输出 JSON。
2. 不要暴露内部节点、意图识别、排序规则。
3. 如果 response_mode 是 casual_reply，简短自然回应，并提示可以查看待办、政策、事项或通知。
4. 如果 response_mode 是 clarification，简短追问用户需要哪类帮助。
5. 如果 response_mode 是 recommendation，输出 3-5 条推荐，每条包含标题、推荐理由、建议操作。
6. 不要编造推荐结果之外的具体内容。
7. 语言简洁、稳重，适合政务办公场景。

统一上下文：
{{agent_context_text}}

推荐任务规划：
{{recommendation_plan}}

推荐结果：
{{recommended_items}}

请输出最终回答。
```

## 2. 反馈记录节点

### 2.1 节点定位

反馈记录节点用于记录本次推荐过程和结果，为后续个性化优化提供数据。

### 2.2 MVP 记录内容

```json
{
  "user_id": "",
  "query": "",
  "scene": "",
  "recommendation_plan": {},
  "recommended_items": [],
  "created_at": ""
}
```

### 2.3 实现方式

MVP 阶段可以先占位。

后续通过 HTTP Request 节点写入推荐日志服务。

## 3. 结束节点

结束节点只返回最终回复生成节点的文本输出。
