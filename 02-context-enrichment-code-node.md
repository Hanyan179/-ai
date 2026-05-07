# 固定信息获取与上下文汇总节点设计

## 1. 节点定位

本节点负责把调用方传入的用户输入和 3 个上下文参数，与智能体能够自行获取的固定信息汇总成统一上下文。

它是后续推荐需求判定、用户场景理解、任务规划和推荐生成的基础。

## 2. 前置数据来源

调用方传入：

- `user_input`
- `business_scene`
- `recommendation_context`
- `custom_context`

智能体可自行获取：

- 角色配置。
- 权限配置。
- 用户画像。
- 用户行为数据。
- 短期会话记忆。
- 长期偏好记忆。
- 当前用户待办。
- 当前用户通知。
- 常用事项。
- 政策知识库检索结果。
- 服务事项知识库检索结果。
- 知识图谱关联结果。

MVP 阶段可以先只接开始节点参数，接口数据为空也允许流程继续。

## 3. 推荐节点组合

```text
开始节点
→ HTTP：获取角色与权限配置，可选
→ HTTP：获取用户画像，可选
→ HTTP：获取用户行为数据，可选
→ HTTP：获取短期/长期记忆，可选
→ HTTP：获取待办任务，可选
→ HTTP：获取通知公告，可选
→ 知识库：检索政策，可选
→ 知识库：检索服务事项，可选
→ Code：汇总上下文
```

## 4. Code 节点输入

```text
user_input
business_scene
recommendation_context
custom_context
api_role_config
api_permission_config
api_user_profile
api_behavior_data
api_short_term_memory
api_long_term_memory
api_todos
api_notices
policy_docs
service_docs
graph_relations
```

如果 Dify 使用默认用户输入变量，可以将默认输入映射到 `user_input`。

## 5. Code 节点输出

```text
agent_context      object
agent_context_text string
```

## 6. Python 代码示例

```python
import json
from datetime import datetime


def parse_json(value, default=None):
    if default is None:
        default = {}

    if value is None or value == "":
        return default

    if isinstance(value, (dict, list)):
        return value

    if isinstance(value, str):
        try:
            return json.loads(value)
        except Exception:
            return value

    return value


def ensure_dict(value):
    value = parse_json(value, {})
    if isinstance(value, dict):
        return value
    return {"raw": value}


def ensure_list(value):
    value = parse_json(value, [])

    if value is None or value == "":
        return []

    if isinstance(value, list):
        return value

    if isinstance(value, dict):
        data = value.get("data")
        if isinstance(data, list):
            return data
        return [value]

    return [value]


def main(
    user_input: str = "",
    business_scene: str = "",
    recommendation_context: str = "",
    custom_context: str = "",
    api_role_config: str = "",
    api_permission_config: str = "",
    api_user_profile: str = "",
    api_behavior_data: str = "",
    api_short_term_memory: str = "",
    api_long_term_memory: str = "",
    api_todos: str = "",
    api_notices: str = "",
    policy_docs: str = "",
    service_docs: str = "",
    graph_relations: str = ""
) -> dict:

    business_scene_obj = parse_json(business_scene, business_scene)
    recommendation_context_obj = parse_json(recommendation_context, recommendation_context)
    custom_context_obj = ensure_dict(custom_context)
    user_profile = ensure_dict(api_user_profile)

    role_config = ensure_dict(api_role_config)
    if not role_config or role_config == {"raw": ""}:
        role_config = {
            "role_name": "政务办公辅助推荐专员",
            "persona": ["精准", "高效", "贴心", "稳重", "合规"],
            "default_greeting": "您好，我是政务办公辅助推荐专员，可向您推送适配的政策文件、服务事项与待办任务。"
        }

    agent_context = {
        "user_input": user_input,
        "request_context": {
            "business_scene": business_scene_obj,
            "recommendation_context": recommendation_context_obj,
            "custom_context": custom_context_obj
        },
        "agent_role": {
            "role_config": role_config,
            "permission_config": ensure_dict(api_permission_config)
        },
        "user_model": {
            "profile": user_profile,
            "behavior_data": ensure_list(api_behavior_data),
            "short_term_memory": ensure_dict(api_short_term_memory),
            "long_term_memory": ensure_dict(api_long_term_memory)
        },
        "business_context": {
            "todos": ensure_list(api_todos),
            "notices": ensure_list(api_notices),
            "policies": ensure_list(policy_docs),
            "services": ensure_list(service_docs),
            "knowledge_graph_relations": ensure_list(graph_relations)
        },
        "recommend_config": {
            "max_items": 5,
            "default_types": ["information", "service", "task"],
            "priority_rules": [
                "compliance_first",
                "deadline_first",
                "role_relevant_first",
                "scene_relevant_first",
                "behavior_preference_first",
                "newest_first"
            ]
        },
        "meta": {
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "mvp_mode": True,
            "fixed_mvp_scene": "政务工作台首页 - 普通办公人员日常办公辅助推荐"
        }
    }

    return {
        "agent_context": agent_context,
        "agent_context_text": json.dumps(agent_context, ensure_ascii=False, indent=2)
    }
```

## 7. 说明

本节点不负责判断推荐什么，也不负责生成最终回答。

它只负责将不同来源的上下文统一成 `agent_context`，供后续节点使用。
