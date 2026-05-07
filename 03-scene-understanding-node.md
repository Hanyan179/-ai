# 用户场景理解节点设计

## 1. 节点定位

用户场景理解节点负责综合理解：

- 用户是谁。
- 用户当前在哪个页面。
- 当前页面涉及什么业务。
- 用户输入表达了什么需求。
- 页面提示希望智能体推荐什么。

该节点是“用户上下文整理”和“意图理解”的合并节点。

## 2. 输入

```text
agent_context_text
```

来源：固定信息获取与上下文汇总节点。

## 3. 输出

输出 JSON：

```json
{
  "user_summary": {
    "department": "",
    "position": "",
    "roles": [],
    "business_domains": []
  },
  "scene_understanding": {
    "raw_scene": "",
    "normalized_scene": "",
    "module_name": "",
    "business_domain": "",
    "object_type": "",
    "object_name": "",
    "object_id": ""
  },
  "need_understanding": {
    "need_type": "",
    "need_summary": "",
    "urgency": "low"
  },
  "recommendation_direction": {
    "primary_targets": [],
    "secondary_targets": [],
    "focus": ""
  }
}
```

## 4. need_type 参考值

```text
daily_priority_recommendation
policy_relevance_explanation
service_handling_assistance
todo_handling_assistance
notice_attention_recommendation
general_government_qa
non_business_interaction
unclear_need
```

## 5. LLM 提示词

```text
你是政务主动推荐智能体的用户场景理解模块。

你的任务是综合用户身份、用户输入、当前页面场景、页面推荐提示和可选上下文，判断用户当前处于什么业务场景、可能需要什么帮助，以及后续推荐应重点关注哪些内容。

你不是最终回答模块，不要生成给用户看的回复。
只输出 JSON，不要输出解释，不要输出 Markdown。

统一上下文：
{{agent_context_text}}

输出格式：
{
  "user_summary": {
    "department": "",
    "position": "",
    "roles": [],
    "business_domains": []
  },
  "scene_understanding": {
    "raw_scene": "",
    "normalized_scene": "",
    "module_name": "",
    "business_domain": "",
    "object_type": "",
    "object_name": "",
    "object_id": ""
  },
  "need_understanding": {
    "need_type": "",
    "need_summary": "",
    "urgency": "low | medium | high"
  },
  "recommendation_direction": {
    "primary_targets": [],
    "secondary_targets": [],
    "focus": ""
  }
}
```

## 6. MVP 要求

MVP 阶段不要求识别特别细的场景。

只要能产出：

- 当前大概业务域。
- 用户大概需求。
- 后续应召回哪些类型数据。

即可进入下一节点。
