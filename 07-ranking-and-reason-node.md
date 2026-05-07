# 推荐排序与理由生成节点设计

## 1. 节点定位

本节点负责从候选内容中选出最值得推荐的内容，并为每条内容生成推荐理由和建议操作。

MVP 可以将排序和理由生成放在一个 LLM 节点中。

后续稳定后，可以拆成：

```text
推荐排序 Code 节点
→ 推荐理由生成 LLM 节点
```

## 2. 输入

```text
agent_context_text
scene_understanding_result
recommendation_plan
candidates
```

## 3. 输出

```json
{
  "recommended_items": [
    {
      "id": "",
      "type": "",
      "title": "",
      "priority": "high",
      "reason": "",
      "suggested_action": "",
      "source": "",
      "url": ""
    }
  ]
}
```

## 4. 排序原则

MVP 使用以下规则：

- 临期优先。
- 岗位相关优先。
- 页面场景相关优先。
- 当前业务相关优先。
- 新发布内容优先。
- 有明确操作入口优先。

## 5. LLM 提示词

```text
你是政务主动推荐智能体的推荐排序与理由生成模块。

请根据统一上下文、场景理解结果、推荐任务规划和候选内容，选出最值得推荐给用户的 3-5 条内容。

要求：
1. 只使用候选内容，不要编造政策、事项、通知或待办。
2. 每条推荐必须说明推荐理由。
3. 每条推荐必须给出建议操作。
4. 优先推荐临期、重要、与岗位相关、与当前页面场景相关的内容。
5. 只输出 JSON，不要输出解释，不要输出 Markdown。

统一上下文：
{{agent_context_text}}

场景理解结果：
{{scene_understanding_result}}

推荐任务规划：
{{recommendation_plan}}

候选内容：
{{candidates}}

输出格式：
{
  "recommended_items": [
    {
      "id": "",
      "type": "",
      "title": "",
      "priority": "low | medium | high",
      "reason": "",
      "suggested_action": "",
      "source": "",
      "url": ""
    }
  ]
}
```
