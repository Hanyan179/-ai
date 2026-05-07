# Dify MVP 搭建操作稿

## 1. 当前要搭的最小链路

```text
开始节点
→ Code：上下文汇总与预处理
→ LLM：场景理解与推荐规划
→ LLM：推荐排序与生成
→ 结束节点
```

本文件只覆盖开始节点和第一个 Code 节点，目标是先把 MVP 主链路跑通。

## 2. 开始节点配置

如果当前应用是 Chatflow / Workflow，并且已经可以读取 Dify 默认用户输入，则开始节点只额外创建 3 个输入变量：

```text
business_scene
recommendation_context
custom_context
```

变量类型建议都先使用：

```text
Paragraph / Text
```

原因是 Dify 页面传入 JSON 时，通常更容易先按字符串接收，再在 Code 节点中统一解析。

## 3. 开始节点固定测试值

### 3.1 business_scene

```json
{
  "scene_name": "政务工作台首页",
  "module_name": "政务办公门户",
  "business_scene": "普通办公人员日常办公"
}
```

### 3.2 recommendation_context

```json
{
  "recommendation_business": "日常办公辅助推荐",
  "recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
  "max_items": 5
}
```

### 3.3 custom_context

```json
{
  "user_id": "u001",
  "tenant_id": "default",
  "extra_requirement": "优先推荐今日需要处理、需要阅读或需要确认的内容"
}
```

### 3.4 用户输入测试值

```text
今天有什么需要我优先处理？
```

## 4. 第一个 Code 节点配置

节点名称建议：

```text
上下文汇总与预处理
```

节点职责：

```text
接收 Dify 默认用户输入、business_scene、recommendation_context、custom_context，
统一解析为结构化上下文，输出 agent_context 和 agent_context_text。
```

## 5. Code 节点输入变量

MVP 阶段先配置 4 个输入：

| Code 入参名 | 变量来源 |
|---|---|
| `user_input` | Dify 默认用户输入，例如 `sys.query` |
| `business_scene` | 开始节点 `business_scene` |
| `recommendation_context` | 开始节点 `recommendation_context` |
| `custom_context` | 开始节点 `custom_context` |

后续接入接口、知识库、记忆或图谱后，再逐步增加：

```text
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

## 6. Code 节点输出变量

```text
agent_context      object
agent_context_text string
```

后续 LLM 节点统一引用：

```text
{{代码块_1.agent_context_text}}
```

如果实际节点名不是 `代码块_1`，以 Dify 画布中的变量选择器为准。

## 7. Code 节点 Python 代码

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

    if value is None or value == "":
        return {}

    return {"raw": value}


def main(
    user_input: str = "",
    business_scene: str = "",
    recommendation_context: str = "",
    custom_context: str = ""
) -> dict:
    business_scene_obj = parse_json(business_scene, {})
    recommendation_context_obj = parse_json(recommendation_context, {})
    custom_context_obj = ensure_dict(custom_context)

    max_items = 5
    if isinstance(recommendation_context_obj, dict):
        max_items = recommendation_context_obj.get("max_items", 5) or 5

    agent_context = {
        "user_input": user_input,
        "request_context": {
            "business_scene": business_scene_obj,
            "recommendation_context": recommendation_context_obj,
            "custom_context": custom_context_obj
        },
        "agent_role": {
            "role_config": {
                "role_name": "政务办公辅助推荐专员",
                "persona": ["精准", "高效", "贴心", "稳重", "合规"],
                "responsibility": "根据政务工作台场景，为用户推荐待办、通知、政策和常用服务事项。"
            },
            "permission_config": {
                "mvp_policy": "仅基于调用方传入上下文和后续可见数据生成推荐，不越权推断敏感信息。"
            }
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
            "policies": [],
            "services": [],
            "knowledge_graph_relations": []
        },
        "recommend_config": {
            "max_items": max_items,
            "recommendation_scope": (
                recommendation_context_obj.get("recommendation_scope", [])
                if isinstance(recommendation_context_obj, dict)
                else []
            ),
            "priority_rules": [
                "compliance_first",
                "deadline_first",
                "role_relevant_first",
                "scene_relevant_first",
                "today_first",
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

## 8. 跑通标准

第一次预览运行时，只要满足以下结果，就说明开始节点和第一个 Code 节点已经打通：

```text
Code 节点运行成功
agent_context 有结构化对象
agent_context_text 是完整 JSON 字符串
agent_context_text 中能看到 user_input、business_scene、recommendation_context、custom_context
```

下一步再配置：

```text
LLM：场景理解与推荐规划
```

## 9. 开始节点预览输出检查

如果开始节点预览结果类似：

```json
{
  "title": "开始_1",
  "input": [
    {
      "name": "business_scene",
      "type": "String",
      "value": "政务工作台首页"
    },
    {
      "name": "recommendation_context",
      "type": "String",
      "value": "[\"个人待办\", \"重要通知\", \"相关政策\", \"常用服务事项\"]"
    },
    {
      "name": "",
      "type": "String",
      "value": ""
    }
  ],
  "outputs": {
    "type": "object",
    "properties": {}
  }
}
```

说明开始节点已经能接收入参，但还需要调整：

```text
第三个变量 name 为空，需要改成 custom_context。
business_scene 可以先用纯文本，但建议改成 JSON 字符串。
recommendation_context 可以先用数组，但建议改成包含 recommendation_business、recommendation_scope、max_items 的 JSON 字符串。
```

推荐修正后的开始节点测试值：

```json
{
  "business_scene": "{\"scene_name\":\"政务工作台首页\",\"module_name\":\"政务办公门户\",\"business_scene\":\"普通办公人员日常办公\"}",
  "recommendation_context": "{\"recommendation_business\":\"日常办公辅助推荐\",\"recommendation_scope\":[\"个人待办\",\"重要通知\",\"相关政策\",\"常用服务事项\"],\"max_items\":5}",
  "custom_context": "{\"user_id\":\"u001\",\"tenant_id\":\"default\",\"extra_requirement\":\"优先推荐今日需要处理、需要阅读或需要确认的内容\"}"
}
```

`outputs.properties` 为空通常不是问题。开始节点主要负责接收入参并传给后续节点，不做业务处理。

## 10. 画布连线与变量映射检查

如果运行轨迹显示开始节点成功，但 Code 节点没有拿到参数，通常不是开始节点没有输出，而是没有完成变量映射。

画布应连接为：

```text
开始_1 → 代码块_1 → Chat / LLM 节点
```

不要让开始节点直接跳到 Chat / LLM 节点，否则 Code 节点不会参与本次运行。

在 `代码块_1` 中配置输入变量：

| Code 入参名 | 选择变量 |
|---|---|
| `user_input` | 系统用户输入，例如 `sys.query` |
| `business_scene` | `开始_1.business_scene` |
| `recommendation_context` | `开始_1.recommendation_context` |
| `custom_context` | `开始_1.custom_context` |

然后在 Code 节点代码中通过 `main(...)` 的同名参数接收：

```python
def main(
    user_input: str = "",
    business_scene: str = "",
    recommendation_context: str = "",
    custom_context: str = ""
) -> dict:
    ...
```

注意：调用方通过 API 传入的参数，必须先在开始节点声明为变量，再在 Code 节点输入区选择引用。Code 节点不能直接读取未声明、未映射的任意调用参数。

## 11. 当前平台代码块输出约定

当前项目中的 `代码块` 节点在 block 模式下会执行完整 Python 代码，但执行结束后需要读取名为 `result` 的变量。

因此不能只写：

```python
data = "..."
message = "..."
```

而应该在最后写：

```python
result = {
    "data": "...",
    "message": "..."
}
```

如果报错：

```text
NameError: name 'result' is not defined
```

说明代码已经执行到了最后，但没有按该平台约定设置 `result`。

## 12. 已验证可用的 Code 节点代码

当前平台的 `代码块` 节点请使用以下配置：

```text
语言：Python
表达式模式：关
是否自动解析：开
```

开始节点需要先配置并传入：

```text
business_scene
recommendation_context
custom_context
```

代码块输入变量建议配置：

```text
user_input
business_scene
recommendation_context
custom_context
```

其中：

```text
user_input              ← 当前用户输入
business_scene          ← 开始_1.business_scene
recommendation_context  ← 开始_1.recommendation_context
custom_context          ← 开始_1.custom_context
```

已验证可用代码如下：

```python
import json
from datetime import datetime


# ============================================================
# 1. 读取代码块输入变量
# ============================================================
# 当前平台的代码块在 block 模式下不会自动调用 main 函数。
# 输入变量会进入执行环境，因此这里用 globals().get 读取。
# 如果某个变量暂时没有映射，也不会报 NameError，而是使用空字符串兜底。

user_input = globals().get("user_input", "")
business_scene = globals().get("business_scene", "")
recommendation_context = globals().get("recommendation_context", "")
custom_context = globals().get("custom_context", "")


# ============================================================
# 2. 通用解析函数
# ============================================================
# 后续会接入很多数据源：
# - 开始节点参数
# - 用户信息 / 权限信息
# - 待办 / 通知 / 协同事项
# - 政策库 / 服务事项库 / 模板资料
# - 长短期记忆
# - 知识图谱关系
#
# 这些数据可能是普通字符串、JSON 字符串、对象、数组或空值。
# 这里先在 MVP 阶段保留统一解析能力，后续扩展时直接复用。

def parse_json(value, default_value):
    if value is None or value == "":
        return default_value

    if isinstance(value, (dict, list)):
        return value

    if isinstance(value, str):
        try:
            return json.loads(value)
        except Exception:
            return value

    return value


def to_dict(value):
    parsed = parse_json(value, {})

    if isinstance(parsed, dict):
        return parsed

    if parsed is None or parsed == "":
        return {}

    return {"raw": parsed}


def to_list(value):
    parsed = parse_json(value, [])

    if parsed is None or parsed == "":
        return []

    if isinstance(parsed, list):
        return parsed

    if isinstance(parsed, dict):
        if isinstance(parsed.get("data"), list):
            return parsed.get("data")
        return [parsed]

    return [{"raw": parsed}]


def normalize_recommendation_context(value):
    parsed = parse_json(value, {})

    if isinstance(parsed, dict):
        return parsed

    if isinstance(parsed, list):
        return {
            "recommendation_business": "日常办公辅助推荐",
            "recommendation_scope": parsed,
            "max_items": 5
        }

    if isinstance(parsed, str) and parsed:
        return {
            "recommendation_business": "日常办公辅助推荐",
            "recommendation_scope": [parsed],
            "max_items": 5
        }

    return {
        "recommendation_business": "日常办公辅助推荐",
        "recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
        "max_items": 5
    }


# ============================================================
# 3. 解析 MVP 核心输入
# ============================================================

business_scene_obj = parse_json(business_scene, {})
recommendation_context_obj = normalize_recommendation_context(recommendation_context)
custom_context_obj = to_dict(custom_context)


# ============================================================
# 4. 汇总统一上下文
# ============================================================
# 本节点只负责上下文汇总和预处理。
# 不负责推荐判断、不负责召回、不负责排序、不负责最终回复生成。

agent_context = {
    "user_input": user_input,
    "request_context": {
        "business_scene": business_scene_obj,
        "recommendation_context": recommendation_context_obj,
        "custom_context": custom_context_obj
    },
    "agent_role": {
        "role_config": {
            "role_name": "政务办公辅助推荐专员",
            "persona": ["精准", "高效", "贴心", "稳重", "合规"],
            "responsibility": "根据政务工作台场景，为用户推荐待办、通知、政策和常用服务事项。"
        },
        "permission_config": {
            "mvp_policy": "MVP 阶段仅基于调用方传入上下文和用户可见数据生成推荐，不越权推断敏感信息。"
        }
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
        "collaboration_items": [],
        "policies": [],
        "services": [],
        "guides": [],
        "reports": [],
        "templates": [],
        "knowledge_graph_relations": []
    },
    "recommend_config": {
        "recommendation_business": recommendation_context_obj.get(
            "recommendation_business",
            "日常办公辅助推荐"
        ),
        "recommendation_scope": recommendation_context_obj.get(
            "recommendation_scope",
            ["个人待办", "重要通知", "相关政策", "常用服务事项"]
        ),
        "max_items": recommendation_context_obj.get("max_items", 5),
        "priority_rules": [
            "compliance_first",
            "deadline_first",
            "urgent_first",
            "role_relevant_first",
            "scene_relevant_first",
            "today_first",
            "newest_first"
        ]
    },
    "mvp_boundary": {
        "fixed_business_scene": "政务工作台首页",
        "enabled_recommendation_scope": [
            "个人待办",
            "重要通知",
            "相关政策",
            "常用服务事项"
        ],
        "reserved_future_capabilities": [
            "角色与权限配置加载",
            "固定数据获取",
            "推荐需求判定",
            "用户画像与记忆整理",
            "场景模板匹配",
            "知识图谱关联",
            "多源检索",
            "候选标准化",
            "合规校验",
            "反馈记录",
            "效果分析"
        ]
    },
    "meta": {
        "node_name": "上下文汇总与预处理",
        "mvp_mode": True,
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
}


# ============================================================
# 5. 输出
# ============================================================
# 当前平台要求 block 模式代码最终提供 result 变量。
# 后续 LLM 节点优先引用：
# - 代码块_1.agent_context_text
# 如果变量选择器没有该字段，则引用：
# - 代码块_1.data

agent_context_text = json.dumps(agent_context, ensure_ascii=False, indent=2)

result = {
    "agent_context": agent_context,
    "agent_context_text": agent_context_text,
    "data": agent_context_text,
    "message": "agent_context 汇总完成"
}
```

## 13. 变量探测与完整上下文汇总代码

当前平台的 Chat 提示词中，如果直接引用未定义变量，例如：

```text
{{session_vars}}
```

可能会直接报错：

```text
变量 'session_vars' 未定义
```

因此不要在 Chat 节点里一次性硬写所有候选变量。建议先在 Code 节点中使用 `globals().get()` 做安全读取，再统一汇总到 `agent_context`。

已知可尝试读取的变量包括：

```text
global_vars
conversation_file_contents
request_vars
session_vars
now
model_name
text
application_id
conversation_id
knowledge_text
reference_data
file_contents
files
knowledge_base_params
tool_calls
user_id
userId
user_name
userName
user_info
userInfo
access_token
accessToken
kms_base_url
business_scene
recommendation_context
custom_context
data
```

推荐使用以下代码替换 `代码块_1`。它会：

```text
安全读取系统变量、用户变量、企业变量、开始节点变量、上一个节点变量
标记每个变量是否可用
把用户信息、请求上下文、知识库内容、文件内容、权限候选信息统一汇总
为后续 LLM 输出 agent_context_text / data
```

```python
import json
from datetime import datetime


# ============================================================
# 1. 安全读取变量
# ============================================================
# 当前平台的 Chat 模板直接引用未定义变量会报错。
# Code 节点中用 globals().get 可以避免变量不存在时报 NameError。

def get_var(name, default_value=""):
    return globals().get(name, default_value)


def exists_var(name):
    return name in globals()


def parse_json(value, default_value):
    # 兼容普通字符串、JSON 字符串、对象、数组和空值。
    if value is None or value == "":
        return default_value

    if isinstance(value, (dict, list)):
        return value

    if isinstance(value, str):
        try:
            return json.loads(value)
        except Exception:
            return value

    return value


def to_dict(value):
    parsed = parse_json(value, {})

    if isinstance(parsed, dict):
        return parsed

    if parsed is None or parsed == "":
        return {}

    return {"raw": parsed}


def to_list(value):
    parsed = parse_json(value, [])

    if parsed is None or parsed == "":
        return []

    if isinstance(parsed, list):
        return parsed

    if isinstance(parsed, dict):
        if isinstance(parsed.get("data"), list):
            return parsed.get("data")
        return [parsed]

    return [{"raw": parsed}]


def normalize_recommendation_context(value):
    parsed = parse_json(value, {})

    if isinstance(parsed, dict):
        return parsed

    if isinstance(parsed, list):
        return {
            "recommendation_business": "日常办公辅助推荐",
            "recommendation_scope": parsed,
            "max_items": 5
        }

    if isinstance(parsed, str) and parsed:
        return {
            "recommendation_business": "日常办公辅助推荐",
            "recommendation_scope": [parsed],
            "max_items": 5
        }

    return {
        "recommendation_business": "日常办公辅助推荐",
        "recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
        "max_items": 5
    }


def mask_token(value):
    # access_token 这类敏感变量只记录是否存在和前后少量字符，避免泄露。
    if not value:
        return ""

    value = str(value)
    if len(value) <= 12:
        return "***"

    return value[:6] + "***" + value[-4:]


# ============================================================
# 2. 候选变量探测
# ============================================================

candidate_var_names = [
    "global_vars",
    "conversation_file_contents",
    "request_vars",
    "session_vars",
    "now",
    "model_name",
    "text",
    "application_id",
    "conversation_id",
    "knowledge_text",
    "reference_data",
    "file_contents",
    "files",
    "knowledge_base_params",
    "tool_calls",
    "user_id",
    "userId",
    "user_name",
    "userName",
    "user_info",
    "userInfo",
    "access_token",
    "accessToken",
    "kms_base_url",
    "business_scene",
    "recommendation_context",
    "custom_context",
    "data"
]

variable_probe = {}
for var_name in candidate_var_names:
    raw_value = get_var(var_name, "")
    variable_probe[var_name] = {
        "available": exists_var(var_name),
        "type": type(raw_value).__name__,
        "is_empty": raw_value is None or raw_value == ""
    }


# ============================================================
# 3. 读取核心变量
# ============================================================
# user_input 优先使用代码块输入变量 user_input。
# 如果没有映射 user_input，则回退使用平台用户问题 text。

user_input = get_var("user_input", "") or get_var("text", "")

business_scene_raw = get_var("business_scene", "")
recommendation_context_raw = get_var("recommendation_context", "")
custom_context_raw = get_var("custom_context", "")

business_scene_obj = parse_json(business_scene_raw, {})
recommendation_context_obj = normalize_recommendation_context(recommendation_context_raw)
custom_context_obj = to_dict(custom_context_raw)


# ============================================================
# 4. 汇总系统、用户、组织、知识库和文件上下文
# ============================================================

user_info_raw = get_var("user_info", "") or get_var("userInfo", "")
user_info_obj = to_dict(user_info_raw)

request_vars_obj = to_dict(get_var("request_vars", ""))
global_vars_obj = to_dict(get_var("global_vars", ""))
session_vars_obj = to_dict(get_var("session_vars", ""))

knowledge_context = {
    "knowledge_text": get_var("knowledge_text", ""),
    "reference_data": parse_json(get_var("reference_data", ""), []),
    "knowledge_base_params": parse_json(get_var("knowledge_base_params", ""), {})
}

file_context = {
    "conversation_file_contents": parse_json(get_var("conversation_file_contents", ""), []),
    "file_contents": parse_json(get_var("file_contents", ""), []),
    "files": parse_json(get_var("files", ""), [])
}

tool_context = {
    "tool_calls": parse_json(get_var("tool_calls", ""), [])
}

runtime_context = {
    "now": get_var("now", ""),
    "model_name": get_var("model_name", ""),
    "application_id": get_var("application_id", ""),
    "conversation_id": get_var("conversation_id", ""),
    "kms_base_url": get_var("kms_base_url", "")
}

user_identity = {
    "user_id": get_var("user_id", "") or get_var("userId", "") or user_info_obj.get("user_id", "") or user_info_obj.get("id", ""),
    "user_name": get_var("user_name", "") or get_var("userName", "") or user_info_obj.get("name", ""),
    "user_info": user_info_obj,
    "access_token_masked": mask_token(get_var("access_token", "") or get_var("accessToken", ""))
}


# ============================================================
# 5. 预留后续数据源区域
# ============================================================
# 后续 HTTP、知识库、工具、图谱节点接入后，建议统一写入这些结构。

business_context = {
    "todos": [],
    "notices": [],
    "collaboration_items": [],
    "policies": [],
    "services": [],
    "guides": [],
    "reports": [],
    "templates": [],
    "tool_entries": []
}

user_model = {
    "profile": user_info_obj,
    "behavior_data": [],
    "short_term_memory": {},
    "long_term_memory": {},
    "preference_memory": {},
    "recent_recommendation_history": []
}

compliance_context = {
    "security_level": user_info_obj.get("securityLevel", ""),
    "security_level_name": user_info_obj.get("securityLevelName", ""),
    "permissions": user_info_obj.get("permissions", []),
    "role_ids": user_info_obj.get("roleId", []),
    "permission_check_result": {},
    "sensitive_rules": []
}


# ============================================================
# 6. 汇总 agent_context
# ============================================================

agent_context = {
    "user_input": user_input,
    "request_context": {
        "business_scene": business_scene_obj,
        "recommendation_context": recommendation_context_obj,
        "custom_context": custom_context_obj,
        "request_vars": request_vars_obj,
        "global_vars": global_vars_obj,
        "session_vars": session_vars_obj
    },
    "runtime_context": runtime_context,
    "user_identity": user_identity,
    "agent_role": {
        "role_config": {
            "role_name": "政务办公辅助推荐专员",
            "persona": ["精准", "高效", "贴心", "稳重", "合规"],
            "responsibility": "根据政务工作台场景，为用户推荐待办、通知、政策和常用服务事项。"
        },
        "permission_config": {
            "mvp_policy": "MVP 阶段仅基于调用方传入上下文和用户可见数据生成推荐，不越权推断敏感信息。"
        }
    },
    "user_model": user_model,
    "business_context": business_context,
    "knowledge_context": knowledge_context,
    "file_context": file_context,
    "tool_context": tool_context,
    "compliance_context": compliance_context,
    "recommend_config": {
        "recommendation_business": recommendation_context_obj.get("recommendation_business", "日常办公辅助推荐"),
        "recommendation_scope": recommendation_context_obj.get(
            "recommendation_scope",
            ["个人待办", "重要通知", "相关政策", "常用服务事项"]
        ),
        "max_items": recommendation_context_obj.get("max_items", 5),
        "priority_rules": [
            "compliance_first",
            "deadline_first",
            "urgent_first",
            "role_relevant_first",
            "scene_relevant_first",
            "today_first",
            "newest_first"
        ]
    },
    "mvp_boundary": {
        "fixed_business_scene": "政务工作台首页",
        "enabled_recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
        "reserved_future_capabilities": [
            "角色与权限配置加载",
            "固定数据获取",
            "推荐需求判定",
            "用户画像与记忆整理",
            "场景模板匹配",
            "知识图谱关联",
            "多源检索",
            "候选标准化",
            "合规校验",
            "反馈记录",
            "效果分析"
        ]
    },
    "debug": {
        "variable_probe": variable_probe
    },
    "meta": {
        "node_name": "上下文汇总与预处理",
        "mvp_mode": True,
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
}


# ============================================================
# 7. 输出
# ============================================================

agent_context_text = json.dumps(agent_context, ensure_ascii=False, indent=2)

result = {
    "agent_context": agent_context,
    "agent_context_text": agent_context_text,
    "data": agent_context_text,
    "message": "agent_context 汇总完成"
}
```

## 14. 可行性研究阶段的数据盘点原则

当前阶段的重点不是直接生成最终推荐，而是验证原始需求中的数据能否获取、从哪里获取、字段是否满足后续推荐编排。

因此 Code 节点应同时输出两类内容：

```text
1. agent_context
   面向后续 LLM / 程序节点使用的统一上下文。

2. feasibility_report
   面向可行性研究的数据盘点报告，用于判断哪些变量已可获取、哪些需要映射、哪些需要接口补齐。
```

原始需求需要的数据项可以按以下维度盘点：

```text
请求上下文：用户输入、业务场景、推荐范围、自定义上下文
用户身份：用户ID、用户名、部门、单位、岗位、角色、安全等级
权限合规：权限列表、角色ID、数据范围、可见知识库、涉密等级
用户行为：近期点击、搜索、办理、常用事项、偏好领域
长短期记忆：本轮会话记忆、长期偏好、负反馈、历史推荐
业务数据：待办、通知、协同事项、政策、服务、指南、报告、模板、工具入口
知识数据：知识库内容、引用内容、知识库参数、图谱关系、关联实体
运行环境：当前时间、应用ID、会话ID、模型名称、请求变量、企业变量
推荐策略：推荐业务、推荐范围、最大条数、排序规则、异常策略
反馈效果：点击、忽略、满意度、反馈记录、效果分析
```

可行性研究阶段可以保留 `debug.variable_probe`，但正式推荐链路中不建议把完整 `request_vars`、内部 URL、access token、debug 信息直接送入 LLM。
