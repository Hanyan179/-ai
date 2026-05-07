# 司法局案例推荐 MVP 五卡片具体设计

## 1. 设计目标

本文把当前 MVP 的五张卡片落到可配置级别：

```text
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与案例推荐规划
→ Chat_2：案例推荐排序与结果生成
→ 结束_1
```

当前目标不是一次做完整推荐系统，而是先跑通一条可验收链路：

```text
接收用户输入和司法局案件上下文
汇总用户身份、权限、知识库可见范围和业务场景
让 LLM 只看到脱敏后的安全上下文
生成案例推荐规划
在有候选数据时生成推荐结果
在没有候选数据时明确说明待接入数据源，不编造案例
```

## 2. 总体变量流

```text
用户输入 / text
+ 开始_1.business_scene
+ 开始_1.recommendation_context
+ 开始_1.custom_context
+ 平台变量 user_info / now / model_name / conversation_id 等
        ↓
代码块_1
        ↓
llm_safe_context / llm_context_text / feasibility_report
        ↓
Chat_1 输出 recommendation_plan JSON
        ↓
Chat_2 输出用户可见推荐结果
        ↓
结束_1 返回 Chat_2 文本
```

推荐后续 Chat 节点优先引用：

```text
代码块_1.llm_context_text
```

如果变量选择器里看不到该字段，就引用：

```text
代码块_1.data
```

本文中的 `data` 默认输出为 `llm_context_text`，即脱敏后的 LLM 安全上下文。

## 3. 卡片一：开始_1

### 3.1 卡片职责

```text
接收司法局案例推荐场景、推荐范围、案件 / 事项自定义上下文。
```

开始节点只配置业务入参，不重复创建用户问题变量。用户问题仍由平台默认 `text` / `sys.query` / 用户输入变量提供。

### 3.2 输入变量

| 变量名 | 类型建议 | 是否必填 | 说明 |
|---|---|---|---|
| `business_scene` | Paragraph / Text | 是 | 当前业务场景，MVP 固定为司法局案例推荐 |
| `recommendation_context` | Paragraph / Text | 是 | 推荐业务、推荐范围、最大数量、排序偏好 |
| `custom_context` | Paragraph / Text | 否 | 当前案件 / 事项上下文、mock 候选数据、调用方扩展信息 |

### 3.3 推荐测试值

`business_scene`：

```json
{
  "scene_name": "司法局案例推荐",
  "module_name": "司法行政业务辅助",
  "business_scene": "案件办理或业务研判中的案例辅助推荐",
  "page_name": "案例推荐入口",
  "page_object": "当前案件或咨询事项"
}
```

`recommendation_context`：

```json
{
  "recommendation_business": "司法局案例辅助推荐",
  "recommendation_scope": ["相似案例", "相关法规", "办理指引", "文书模板"],
  "max_items": 5,
  "priority_requirement": "优先推荐与当前案情、争议焦点、适用依据相近的案例"
}
```

`custom_context`：

```json
{
  "tenant_id": "default",
  "caller_id": "judicial_case_assistant",
  "case_id": "",
  "case_title": "社区矫正对象多次未按时报到处置",
  "case_type": "社区矫正",
  "case_summary": "社区矫正对象近期多次未按规定时间报到，经工作人员电话提醒后仍未按要求提交情况说明。需要研判是否给予训诫、警告，或建议进一步依法处理。",
  "dispute_focus": ["违反监督管理规定", "教育帮扶与惩戒尺度", "是否需要提请进一步处置"],
  "keywords": ["社区矫正", "未按时报到", "训诫", "警告", "监督管理"],
  "extra_requirement": "推荐结果需要说明相似点、适用依据和参考价值"
}
```

用户输入测试值：

```text
请帮我推荐几个和当前社区矫正对象多次未按时报到类似的处理案例，并列出可以参考的法规依据。
```

### 3.4 带 mock 候选数据的测试值

如果暂时没有接入知识库，可以把候选数据临时放进 `custom_context`，用于验证 Chat_2 的真实推荐输出：

```json
{
  "tenant_id": "default",
  "caller_id": "judicial_case_assistant",
  "case_title": "社区矫正对象多次未按时报到处置",
  "case_type": "社区矫正",
  "case_summary": "社区矫正对象近期多次未按规定时间报到，经工作人员电话提醒后仍未按要求提交情况说明。",
  "dispute_focus": ["违反监督管理规定", "教育帮扶与惩戒尺度", "是否需要提请进一步处置"],
  "keywords": ["社区矫正", "未按时报到", "训诫", "警告", "监督管理"],
  "mock_cases": [
    {
      "title": "社区矫正对象多次未按时报到的监督管理处置案例",
      "case_type": "社区矫正",
      "summary": "对象两次无正当理由未按时报到，司法所先行谈话教育并记录在案，后根据整改情况给予书面警告。",
      "match_points": ["多次未按时报到", "先教育提醒再分级处置", "保留谈话和通知记录"],
      "legal_basis": ["社区矫正对象监督管理相关规定", "社区矫正法相关条款"],
      "reference_value": "可参考其证据固定、教育提醒、分级处置流程。",
      "source": "MVP 模拟案例库"
    },
    {
      "title": "社区矫正对象拒不提交情况报告的处置案例",
      "case_type": "社区矫正",
      "summary": "对象未按要求提交书面情况报告，工作人员核实原因后开展训诫，并要求限期整改。",
      "match_points": ["未履行报告义务", "先核实原因", "训诫与限期整改结合"],
      "legal_basis": ["社区矫正日常报告制度相关规定"],
      "reference_value": "可参考其核实原因和限期整改安排。",
      "source": "MVP 模拟案例库"
    }
  ],
  "mock_laws": [
    {
      "title": "中华人民共和国社区矫正法",
      "summary": "用于判断社区矫正对象应遵守的监督管理要求及违反规定后的处理边界。",
      "source": "MVP 模拟法规库"
    }
  ],
  "extra_requirement": "推荐结果需要说明相似点、适用依据和参考价值"
}
```

## 4. 卡片二：代码块_1

### 4.1 卡片职责

```text
汇总用户输入、用户身份、组织权限、司法局案例推荐场景、推荐范围、案件上下文、知识库范围和运行环境。
输出统一 agent_context。
输出 LLM 安全上下文 llm_safe_context。
输出可行性研究报告 feasibility_report。
```

### 4.2 节点配置

```text
语言：Python
表达式模式：关
是否自动解析：开
```

当前平台的 Code 节点是 block 模式，不会自动调用 `main` 函数，代码最后必须提供 `result` 变量。

### 4.3 输入变量映射

最小必配：

| Code 入参 | 变量来源 |
|---|---|
| `user_input` | 当前用户输入，例如 `text` / `sys.query` |
| `business_scene` | `开始_1.business_scene` |
| `recommendation_context` | `开始_1.recommendation_context` |
| `custom_context` | `开始_1.custom_context` |

建议显式补充：

| Code 入参 | 变量来源 | 用途 |
|---|---|---|
| `current_time` | `now` | 当前时间 |
| `model_name_input` | `model_name` | 运行追踪 |
| `application_id_input` | `application_id` | 应用追踪 |
| `conversation_id_input` | `conversation_id` | 会话追踪 |
| `user_id_input` | `user_id` | 用户摘要，禁止原样送 LLM |
| `user_name_input` | `user_name` | 用户称呼 |
| `user_info_input` | `user_info` | 用户身份、组织、权限、知识库范围 |
| `knowledge_text_input` | `knowledge_text` | 知识库命中文本，接入知识库后使用 |
| `reference_data_input` | `reference_data` | 知识库引用来源，接入知识库后使用 |

代码里同时用 `globals().get()` 做兜底，所以某些变量暂时没映射也不会直接报错。

### 4.4 输出变量

| 输出字段 | 类型 | 说明 |
|---|---|---|
| `agent_context` | object | 统一上下文，仍保持脱敏 |
| `agent_context_text` | string | 统一上下文 JSON 字符串 |
| `llm_safe_context` | object | 推荐给 Chat 节点使用的安全上下文 |
| `llm_context_text` | string | LLM 安全上下文 JSON 字符串 |
| `feasibility_report` | object | 当前数据可行性盘点 |
| `retrieval_query_plan` | array | 后续知识库 / HTTP 检索节点可复用的检索计划 |
| `data` | string | 等于 `llm_context_text`，作为 Chat 节点兜底引用 |
| `message` | string | 节点执行摘要 |

### 4.5 完整 Python 代码

```python
import json
from datetime import datetime


# ============================================================
# 1. 安全读取和通用工具
# ============================================================

def get_var(name, default_value=""):
    return globals().get(name, default_value)


def is_empty(value):
    return value is None or value == "" or value == [] or value == {}


def json_safe(value):
    if value is None or isinstance(value, (str, int, float, bool)):
        return value

    if isinstance(value, dict):
        return {str(key): json_safe(val) for key, val in value.items()}

    if isinstance(value, (list, tuple, set)):
        return [json_safe(item) for item in value]

    return str(value)


def dumps(value):
    return json.dumps(json_safe(value), ensure_ascii=False, indent=2)


def parse_json(value, default_value):
    if is_empty(value):
        return default_value

    value = json_safe(value)

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

    if is_empty(parsed):
        return {}

    return {"raw": parsed}


def to_list(value):
    parsed = parse_json(value, [])

    if is_empty(parsed):
        return []

    if isinstance(parsed, list):
        return parsed

    if isinstance(parsed, dict):
        for key in ["data", "items", "records", "list", "results"]:
            if isinstance(parsed.get(key), list):
                return parsed.get(key)
        return [parsed]

    return [parsed]


def first_non_empty(*values):
    for value in values:
        if not is_empty(value):
            return value
    return ""


def get_nested(source, *paths):
    if not isinstance(source, dict):
        return ""

    for path in paths:
        current = source
        ok = True
        for key in path.split("."):
            if isinstance(current, dict) and key in current:
                current = current.get(key)
            else:
                ok = False
                break
        if ok and not is_empty(current):
            return current

    return ""


def to_int(value, default_value):
    try:
        number = int(value)
    except Exception:
        return default_value

    if number <= 0:
        return default_value

    return min(number, 20)


def mask_id(value):
    if is_empty(value):
        return ""

    value = str(value)
    if len(value) <= 8:
        return "***"

    return value[:4] + "***" + value[-3:]


def text_excerpt(value, max_length=1800):
    if is_empty(value):
        return ""

    value = str(value)
    if len(value) <= max_length:
        return value

    return value[:max_length] + "...[已截断]"


# ============================================================
# 2. 读取核心变量
# ============================================================

user_input = first_non_empty(
    get_var("user_input", ""),
    get_var("text", ""),
    get_var("query", "")
)

business_scene_raw = first_non_empty(
    get_var("business_scene", ""),
    get_var("business_scene_input", "")
)

recommendation_context_raw = first_non_empty(
    get_var("recommendation_context", ""),
    get_var("recommendation_context_input", "")
)

custom_context_raw = first_non_empty(
    get_var("custom_context", ""),
    get_var("custom_context_input", "")
)

user_info_raw = first_non_empty(
    get_var("user_info_input", ""),
    get_var("user_info", ""),
    get_var("userInfo", "")
)

current_time = first_non_empty(
    get_var("current_time", ""),
    get_var("now", ""),
    datetime.now().strftime("%Y-%m-%d %H:%M:%S")
)

model_name_value = first_non_empty(
    get_var("model_name_input", ""),
    get_var("model_name", "")
)

application_id_value = first_non_empty(
    get_var("application_id_input", ""),
    get_var("application_id", "")
)

conversation_id_value = first_non_empty(
    get_var("conversation_id_input", ""),
    get_var("conversation_id", "")
)

knowledge_text_value = first_non_empty(
    get_var("knowledge_text_input", ""),
    get_var("knowledge_text", "")
)

reference_data_value = first_non_empty(
    get_var("reference_data_input", ""),
    get_var("reference_data", "")
)


# ============================================================
# 3. 规范化业务场景和推荐配置
# ============================================================

def normalize_business_scene(value):
    parsed = parse_json(value, {})

    default_scene = {
        "scene_name": "司法局案例推荐",
        "module_name": "司法行政业务辅助",
        "business_scene": "案件办理或业务研判中的案例辅助推荐",
        "page_name": "案例推荐入口",
        "page_object": "当前案件或咨询事项"
    }

    if isinstance(parsed, dict):
        merged = default_scene.copy()
        merged.update(parsed)
        return merged

    if isinstance(parsed, str) and parsed:
        merged = default_scene.copy()
        merged["scene_name"] = parsed
        merged["business_scene"] = parsed
        return merged

    return default_scene


def normalize_recommendation_context(value):
    parsed = parse_json(value, {})

    default_config = {
        "recommendation_business": "司法局案例辅助推荐",
        "recommendation_scope": ["相似案例", "相关法规", "办理指引", "文书模板"],
        "max_items": 5,
        "priority_requirement": "优先推荐与当前案情、争议焦点、适用依据相近的案例"
    }

    if isinstance(parsed, dict):
        merged = default_config.copy()
        merged.update(parsed)
        merged["recommendation_scope"] = to_list(merged.get("recommendation_scope"))
        merged["max_items"] = to_int(merged.get("max_items"), 5)
        return merged

    if isinstance(parsed, list):
        merged = default_config.copy()
        merged["recommendation_scope"] = parsed
        return merged

    if isinstance(parsed, str) and parsed:
        merged = default_config.copy()
        merged["recommendation_scope"] = [parsed]
        return merged

    return default_config


business_scene_obj = normalize_business_scene(business_scene_raw)
recommendation_context_obj = normalize_recommendation_context(recommendation_context_raw)
custom_context_obj = to_dict(custom_context_raw)
user_info_obj = to_dict(user_info_raw)


# ============================================================
# 4. 提取用户身份、权限和可见知识库摘要
# ============================================================

def normalize_knowledge_bases(value):
    result = []

    for item in to_list(value):
        if isinstance(item, dict):
            result.append({
                "kb_id_masked": mask_id(first_non_empty(
                    item.get("id"),
                    item.get("kb_id"),
                    item.get("knowledge_base_id"),
                    item.get("knowledgeBaseId")
                )),
                "kb_name": first_non_empty(
                    item.get("name"),
                    item.get("kb_name"),
                    item.get("title"),
                    item.get("knowledgeBaseName"),
                    "未命名知识库"
                ),
                "kb_type": first_non_empty(
                    item.get("type"),
                    item.get("category"),
                    item.get("source_type"),
                    item.get("knowledgeBaseType")
                ),
                "scope": first_non_empty(
                    item.get("scope"),
                    item.get("data_scope"),
                    item.get("dataScope")
                ),
                "enabled": item.get("enabled", True)
            })
        else:
            result.append({
                "kb_id_masked": "",
                "kb_name": str(item),
                "kb_type": "",
                "scope": "",
                "enabled": True
            })

    return result


permissions = to_list(first_non_empty(
    get_nested(user_info_obj, "permissions", "permissionCodes", "permission_codes", "permissionList"),
    custom_context_obj.get("permissions", "")
))

roles = to_list(first_non_empty(
    get_nested(user_info_obj, "roles", "roleIds", "roleId", "role_ids"),
    custom_context_obj.get("roles", "")
))

visible_knowledge_bases = normalize_knowledge_bases(first_non_empty(
    get_nested(
        user_info_obj,
        "visibleKnowledgeBases",
        "visible_knowledge_bases",
        "knowledgeBases",
        "knowledge_bases",
        "accessibleKnowledgeBases",
        "accessible_knowledge_bases"
    ),
    custom_context_obj.get("visible_knowledge_bases", ""),
    custom_context_obj.get("knowledge_bases", "")
))

user_summary = {
    "user_id_masked": mask_id(first_non_empty(
        get_var("user_id_input", ""),
        get_var("user_id", ""),
        get_var("userId", ""),
        user_info_obj.get("id", ""),
        user_info_obj.get("user_id", "")
    )),
    "user_name": first_non_empty(
        get_var("user_name_input", ""),
        get_var("user_name", ""),
        get_var("userName", ""),
        user_info_obj.get("name", ""),
        user_info_obj.get("userName", ""),
        user_info_obj.get("realName", "")
    ),
    "dept_name": first_non_empty(
        get_nested(user_info_obj, "deptName", "dept_name", "departmentName", "department.name", "dept.name"),
        custom_context_obj.get("dept_name", "")
    ),
    "unit_name": first_non_empty(
        get_nested(user_info_obj, "unitName", "unit_name", "orgName", "organizationName", "unit.name", "org.name"),
        custom_context_obj.get("unit_name", "")
    ),
    "security_level_name": first_non_empty(
        get_nested(user_info_obj, "securityLevelName", "security_level_name", "securityLevel.name"),
        custom_context_obj.get("security_level_name", "")
    ),
    "role_count": len(roles),
    "permission_count": len(permissions),
    "accessible_knowledge_base_count": len(visible_knowledge_bases),
    "accessible_knowledge_bases": visible_knowledge_bases
}


# ============================================================
# 5. 提取案件上下文和候选数据
# ============================================================

case_context = {
    "case_id_masked": mask_id(first_non_empty(
        custom_context_obj.get("case_id", ""),
        custom_context_obj.get("current_object_id", "")
    )),
    "case_title": first_non_empty(
        custom_context_obj.get("case_title", ""),
        custom_context_obj.get("current_object_name", "")
    ),
    "case_type": first_non_empty(
        custom_context_obj.get("case_type", ""),
        custom_context_obj.get("matter_type", "")
    ),
    "case_summary": first_non_empty(
        custom_context_obj.get("case_summary", ""),
        custom_context_obj.get("summary", ""),
        user_input
    ),
    "dispute_focus": to_list(first_non_empty(
        custom_context_obj.get("dispute_focus", ""),
        custom_context_obj.get("focus_points", "")
    )),
    "keywords": to_list(custom_context_obj.get("keywords", "")),
    "legal_domains": to_list(first_non_empty(
        custom_context_obj.get("legal_domains", ""),
        custom_context_obj.get("law_domains", "")
    )),
    "region": first_non_empty(
        custom_context_obj.get("region", ""),
        custom_context_obj.get("area_name", "")
    ),
    "extra_requirement": custom_context_obj.get("extra_requirement", "")
}

candidate_data = {
    "case_candidates": to_list(first_non_empty(
        custom_context_obj.get("case_candidates", ""),
        custom_context_obj.get("mock_cases", ""),
        get_var("case_candidates", "")
    )),
    "law_candidates": to_list(first_non_empty(
        custom_context_obj.get("law_candidates", ""),
        custom_context_obj.get("mock_laws", ""),
        get_var("law_candidates", "")
    )),
    "guide_candidates": to_list(first_non_empty(
        custom_context_obj.get("guide_candidates", ""),
        custom_context_obj.get("mock_guides", ""),
        get_var("guide_candidates", "")
    )),
    "template_candidates": to_list(first_non_empty(
        custom_context_obj.get("template_candidates", ""),
        custom_context_obj.get("mock_templates", ""),
        get_var("template_candidates", "")
    )),
    "knowledge_text_excerpt": text_excerpt(knowledge_text_value),
    "reference_data": to_list(reference_data_value)
}

candidate_summary = {
    "case_candidate_count": len(candidate_data["case_candidates"]),
    "law_candidate_count": len(candidate_data["law_candidates"]),
    "guide_candidate_count": len(candidate_data["guide_candidates"]),
    "template_candidate_count": len(candidate_data["template_candidates"]),
    "has_knowledge_text": not is_empty(knowledge_text_value),
    "reference_data_count": len(candidate_data["reference_data"]),
    "has_structured_candidate_data": any([
        len(candidate_data["case_candidates"]) > 0,
        len(candidate_data["law_candidates"]) > 0,
        len(candidate_data["guide_candidates"]) > 0,
        len(candidate_data["template_candidates"]) > 0
    ])
}


# ============================================================
# 6. 生成后续检索计划
# ============================================================

query_terms = []
for value in [
    case_context.get("case_type"),
    case_context.get("case_title"),
    case_context.get("case_summary")
]:
    if not is_empty(value):
        query_terms.append(str(value))

for item in case_context.get("dispute_focus", []):
    if not is_empty(item):
        query_terms.append(str(item))

for item in case_context.get("keywords", []):
    if not is_empty(item):
        query_terms.append(str(item))

query_text = "；".join(query_terms)
if len(query_text) > 1200:
    query_text = query_text[:1200] + "...[已截断]"

max_items = recommendation_context_obj.get("max_items", 5)
top_k = max(max_items * 3, 8)

retrieval_query_plan = [
    {
        "target": "case_knowledge_base",
        "recommendation_type": "相似案例",
        "query": query_text,
        "top_k": top_k,
        "filters": ["用户可访问知识库范围", "安全等级", "案件类型", "争议焦点"]
    },
    {
        "target": "law_policy_knowledge_base",
        "recommendation_type": "相关法规",
        "query": query_text,
        "top_k": top_k,
        "filters": ["用户可访问知识库范围", "现行有效", "司法行政相关"]
    },
    {
        "target": "guide_knowledge_base",
        "recommendation_type": "办理指引",
        "query": query_text,
        "top_k": max_items,
        "filters": ["用户可访问知识库范围", "业务条线", "办理阶段"]
    },
    {
        "target": "template_knowledge_base",
        "recommendation_type": "文书模板",
        "query": query_text,
        "top_k": max_items,
        "filters": ["用户可访问知识库范围", "文书类型", "业务条线"]
    }
]


# ============================================================
# 7. 可行性盘点
# ============================================================

available_capabilities = {
    "user_input_available": not is_empty(user_input),
    "business_scene_available": not is_empty(business_scene_obj),
    "recommendation_context_available": not is_empty(recommendation_context_obj),
    "case_context_available": any([
        not is_empty(case_context.get("case_title")),
        not is_empty(case_context.get("case_type")),
        not is_empty(case_context.get("case_summary")),
        len(case_context.get("dispute_focus", [])) > 0,
        len(case_context.get("keywords", [])) > 0
    ]),
    "user_identity_available": any([
        not is_empty(user_summary.get("user_name")),
        not is_empty(user_summary.get("dept_name")),
        not is_empty(user_summary.get("unit_name"))
    ]),
    "permission_summary_available": user_summary.get("permission_count", 0) > 0 or user_summary.get("role_count", 0) > 0,
    "visible_knowledge_bases_available": user_summary.get("accessible_knowledge_base_count", 0) > 0,
    "knowledge_text_available": candidate_summary.get("has_knowledge_text"),
    "reference_data_available": candidate_summary.get("reference_data_count", 0) > 0,
    "structured_candidate_data_available": candidate_summary.get("has_structured_candidate_data")
}

missing_for_mvp = []
if not available_capabilities["user_input_available"]:
    missing_for_mvp.append("缺少用户当前问题或检索意图")
if not available_capabilities["case_context_available"]:
    missing_for_mvp.append("缺少案件类型、案情摘要、争议焦点或关键词")
if not available_capabilities["structured_candidate_data_available"] and not available_capabilities["knowledge_text_available"]:
    missing_for_mvp.append("缺少案例库 / 法规库 / 指引库 / 模板库的真实命中结果")

missing_for_final_requirement = [
    "案件系统接口：当前案件详情、办理阶段、材料清单",
    "案例知识库：相似案例、典型案例、处理结果、来源引用",
    "法规政策库：现行有效法规、政策文件、条款摘要",
    "办理指引库：业务流程、处置建议、注意事项",
    "文书模板库：通知书、告诫书、审批表等模板",
    "权限范围接口：用户可访问案例库、数据范围、安全等级",
    "用户行为数据：近期检索、点击、采纳、忽略记录",
    "反馈接口：推荐点击、采纳、满意度、负反馈"
]

feasibility_report = {
    "available_capabilities": available_capabilities,
    "missing_for_mvp": missing_for_mvp,
    "missing_for_final_requirement": missing_for_final_requirement,
    "suggested_data_sources": [
        "知识库_1：检索相似案例",
        "知识库_2：检索相关法规 / 政策依据",
        "知识库_3：检索办理指引",
        "知识库_4：检索文书模板",
        "HTTP_1：获取当前案件 / 事项详情",
        "HTTP_2：查询用户可访问知识库范围",
        "HTTP_4：记录推荐反馈"
    ],
    "variable_mapping_suggestions": [
        "Code 节点显式映射 user_input ← text / sys.query",
        "Code 节点显式映射 user_info_input ← user_info",
        "Code 节点显式映射 current_time ← now",
        "知识库接入后映射 knowledge_text_input 和 reference_data_input",
        "不要将 access_token、完整 request_vars、完整 permission codes 原样送入 Chat 节点"
    ]
}


# ============================================================
# 8. LLM 安全上下文
# ============================================================

llm_safe_context = {
    "user_input": user_input,
    "current_time": current_time,
    "business_scene": business_scene_obj,
    "recommend_config": {
        "recommendation_business": recommendation_context_obj.get("recommendation_business"),
        "recommendation_scope": recommendation_context_obj.get("recommendation_scope"),
        "max_items": recommendation_context_obj.get("max_items"),
        "priority_requirement": recommendation_context_obj.get("priority_requirement")
    },
    "case_context": case_context,
    "user_summary": user_summary,
    "candidate_summary": candidate_summary,
    "candidate_data": candidate_data,
    "retrieval_query_plan": retrieval_query_plan,
    "feasibility_report": feasibility_report,
    "safety_rules": [
        "只基于已提供的上下文、候选数据和知识库命中内容生成推荐",
        "没有真实候选数据时，不编造具体案例标题、案号、来源、法条原文",
        "不得输出 access_token、内部 URL、完整权限码、完整用户 ID、完整 request_vars",
        "推荐结果仅供业务研判参考，正式处理应以现行法规、单位制度和授权范围为准"
    ]
}


# ============================================================
# 9. 统一上下文和变量探测
# ============================================================

candidate_var_names = [
    "global_vars",
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
    "custom_context"
]

variable_probe = {}
for var_name in candidate_var_names:
    raw_value = get_var(var_name, "")
    variable_probe[var_name] = {
        "available": var_name in globals(),
        "type": type(raw_value).__name__,
        "is_empty": is_empty(raw_value)
    }

agent_context = {
    "user_input": user_input,
    "request_context": {
        "business_scene": business_scene_obj,
        "recommendation_context": recommendation_context_obj,
        "custom_context": {
            "tenant_id": custom_context_obj.get("tenant_id", ""),
            "caller_id": custom_context_obj.get("caller_id", ""),
            "case_id_masked": case_context.get("case_id_masked"),
            "extra_requirement": custom_context_obj.get("extra_requirement", "")
        }
    },
    "runtime_context": {
        "current_time": current_time,
        "model_name": model_name_value,
        "application_id": application_id_value,
        "conversation_id": conversation_id_value
    },
    "user_summary": user_summary,
    "case_context": case_context,
    "candidate_summary": candidate_summary,
    "retrieval_query_plan": retrieval_query_plan,
    "feasibility_report": feasibility_report,
    "debug": {
        "variable_probe": variable_probe
    },
    "meta": {
        "node_name": "上下文汇总与可行性盘点",
        "mvp_scene": "司法局案例推荐",
        "mvp_mode": True,
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
}


# ============================================================
# 10. 输出 result
# ============================================================

agent_context_text = dumps(agent_context)
llm_context_text = dumps(llm_safe_context)

result = {
    "agent_context": agent_context,
    "agent_context_text": agent_context_text,
    "llm_safe_context": llm_safe_context,
    "llm_context_text": llm_context_text,
    "feasibility_report": feasibility_report,
    "retrieval_query_plan": retrieval_query_plan,
    "data": llm_context_text,
    "message": "司法局案例推荐上下文汇总完成"
}
```

## 5. 卡片三：Chat_1 场景理解与案例推荐规划

### 5.1 卡片职责

```text
判断是否为案例推荐请求。
理解司法行政业务场景。
提取案情要素、案件类型、争议焦点、关键词和法律领域。
基于可用数据和缺失数据生成案例推荐规划。
```

### 5.2 输入变量

| 输入 | 来源 |
|---|---|
| `llm_context_text` | `代码块_1.llm_context_text` |
| 兜底输入 | `代码块_1.data` |

### 5.3 系统提示词

```text
你是“司法局案例推荐智能体”的场景理解与推荐规划模块。

你的任务是基于输入的 LLM 安全上下文，完成推荐意图识别和推荐规划。

工作要求：
1. 判断用户是否在请求相似案例、法规依据、办理指引或文书模板推荐。
2. 提取案情要素，包括案件类型、案情摘要、争议焦点、关键词、法律领域、办理阶段。
3. 判断当前可用数据，包括用户输入、案件上下文、用户身份摘要、知识库范围、候选案例、法规候选、知识库命中内容。
4. 判断缺失数据，并说明需要接入哪些知识库或接口。
5. 生成后续检索和排序计划。

安全要求：
1. 只使用输入上下文中的信息。
2. 不要编造具体案例标题、案号、来源、法规条文原文。
3. 不要输出 access_token、内部 URL、完整权限码、完整用户 ID、完整 request_vars。
4. 如果没有真实候选数据，只能输出推荐规划，不能假装已经检索到案例。

输出要求：
只输出一个合法 JSON 对象。
不要使用 Markdown。
不要使用代码块。
不要输出解释性前后缀。

JSON Schema：
{
  "is_recommendation_request": true,
  "request_type": "case_recommendation | law_basis | guide_template | mixed | not_recommendation",
  "intent_confidence": 0.0,
  "scene": "司法局案例推荐",
  "case_understanding": {
    "case_type": "",
    "case_summary": "",
    "dispute_focus": [],
    "keywords": [],
    "legal_domains": [],
    "handling_stage": "",
    "core_question": ""
  },
  "user_profile_summary": {
    "dept_name": "",
    "unit_name": "",
    "security_level_name": "",
    "role_count": 0,
    "permission_count": 0,
    "accessible_knowledge_base_count": 0
  },
  "available_data_summary": {
    "has_user_input": true,
    "has_case_context": true,
    "has_user_identity": true,
    "has_visible_knowledge_bases": false,
    "has_structured_candidate_data": false,
    "has_knowledge_text": false,
    "candidate_counts": {
      "case": 0,
      "law": 0,
      "guide": 0,
      "template": 0
    }
  },
  "missing_data_summary": [],
  "recommendation_plan": {
    "recommendation_types": [],
    "retrieval_targets": [
      {
        "target": "case_knowledge_base",
        "purpose": "检索相似案例",
        "query": "",
        "top_k": 10,
        "filters": []
      }
    ],
    "ranking_strategy": [],
    "max_items": 5,
    "fallback_strategy": ""
  },
  "compliance_notes": [],
  "clarifying_question": ""
}
```

### 5.4 用户提示词

变量选择器如果支持 `代码块_1.llm_context_text`，使用下面版本：

```text
请基于以下 LLM 安全上下文生成司法局案例推荐规划。

LLM 安全上下文：
{{代码块_1.llm_context_text}}
```

如果变量选择器只能看到 `data`，使用下面版本：

```text
请基于以下 LLM 安全上下文生成司法局案例推荐规划。

LLM 安全上下文：
{{代码块_1.data}}
```

### 5.5 输出变量

Chat_1 默认输出文本字段即可，后续 Chat_2 引用：

```text
Chat_1.text
```

如果实际节点名不同，以画布变量选择器显示为准。

## 6. 卡片四：Chat_2 案例推荐排序与结果生成

### 6.1 卡片职责

```text
根据代码块_1 的安全上下文和 Chat_1 的推荐规划，生成用户可见推荐结果。
有真实候选数据时，按相似度、适用依据、权限可见性和参考价值排序输出。
没有真实候选数据时，输出推荐规划结果和待接入数据源，不编造案例。
```

### 6.2 输入变量

| 输入 | 来源 |
|---|---|
| `llm_context_text` | `代码块_1.llm_context_text` 或 `代码块_1.data` |
| `recommendation_plan` | `Chat_1.text` |

### 6.3 系统提示词

```text
你是“司法局案例推荐智能体”的推荐排序与结果生成模块。

你会收到两类输入：
1. LLM 安全上下文：包含用户输入、案件上下文、用户摘要、候选数据摘要、候选数据、可行性盘点。
2. 推荐规划 JSON：由上一个节点生成，包含意图识别、案情理解、检索目标和排序策略。

你的任务：
1. 如果存在结构化候选数据或知识库命中内容，基于这些已提供数据生成推荐结果。
2. 如果没有结构化候选数据，也没有知识库命中内容，不得编造具体案例、来源、案号、法规条文原文。
3. 对每条推荐说明：推荐类型、相似点、适用依据、参考价值、建议操作、来源。
4. 排序优先级：合规可见 > 案情相似 > 争议焦点相同 > 适用依据相关 > 同业务条线 > 新近或典型。
5. 输出给司法局工作人员阅读，语气专业、清晰、克制。

安全边界：
1. 不输出 access_token、内部 URL、完整权限码、完整用户 ID、完整 request_vars。
2. 不作最终法律结论，只给业务研判参考。
3. 没有来源就写“待接入知识库来源”，不要伪造来源。
4. 法规依据只能概括已提供内容，不能捏造具体条款原文。

输出格式：
使用 Markdown。
不要输出原始 JSON。
最多输出 max_items 条推荐。
如果无真实候选数据，必须明确写“当前尚未接入真实案例知识库命中结果”。
```

### 6.4 用户提示词

变量选择器如果支持 `代码块_1.llm_context_text`，使用下面版本：

```text
请基于以下上下文和推荐规划，生成用户可见的司法局案例推荐结果。

LLM 安全上下文：
{{代码块_1.llm_context_text}}

推荐规划 JSON：
{{Chat_1.text}}
```

如果变量选择器只能看到 `data`，使用下面版本：

```text
请基于以下上下文和推荐规划，生成用户可见的司法局案例推荐结果。

LLM 安全上下文：
{{代码块_1.data}}

推荐规划 JSON：
{{Chat_1.text}}
```

### 6.5 有候选数据时的输出样式

```text
## 推荐结果

基于当前案情，我优先推荐以下内容供研判参考。

### 1. 案例标题

- 推荐类型：相似案例
- 匹配度：高 / 中 / 低
- 相似点：说明与当前案情相似的事实、争议焦点或处理思路
- 适用依据：概括已提供的法规或政策依据
- 参考价值：说明对当前事项办理、审核或研判的帮助
- 建议操作：建议查看原文、核对适用条件、补充材料或进入下一步处置
- 来源：候选数据中的来源；没有来源则写“来源待核验”

## 相关依据

- 依据名称：适用场景和注意事项

## 办理提示

- 需要核对的事实
- 需要补充的材料
- 需要注意的合规边界
```

### 6.6 无候选数据时的输出样式

```text
## 推荐规划已完成

当前尚未接入真实案例知识库命中结果，因此我不会编造具体案例。

根据当前案情，建议优先检索：

1. 相似案例：围绕案件类型、争议焦点和关键词检索。
2. 相关法规：检索现行有效的司法行政法规和监督管理依据。
3. 办理指引：检索本业务条线的处置流程和注意事项。
4. 文书模板：检索告知、训诫、警告、审批或报告类模板。

## 当前提取到的案情要素

- 案件类型：
- 争议焦点：
- 关键词：
- 核心问题：

## 下一步建议接入

- 知识库_1：相似案例库
- 知识库_2：法规 / 政策依据库
- 知识库_3：办理指引库
- 知识库_4：文书模板库
```

## 7. 卡片五：结束_1

### 7.1 卡片职责

```text
返回 Chat_2 的用户可见输出。
```

### 7.2 输出配置

| 结束节点字段 | 来源 |
|---|---|
| `answer` / `result` / 默认回复字段 | `Chat_2.text` |

实际字段名称以当前平台结束节点配置为准。MVP 阶段只需要把 Chat_2 的文本返回给用户。

## 8. 推荐结果卡片 JSON 结构

如果后续前端不想直接渲染 Markdown，而是要渲染结构化卡片，可以把 Chat_2 改成输出 JSON。MVP 当前先用 Markdown 更容易跑通；前端联调时再切换为下面结构。

```json
{
  "title": "司法局案例推荐结果",
  "data_status": {
    "has_real_candidates": true,
    "source_note": "基于已接入知识库 / mock 候选数据生成"
  },
  "case_understanding": {
    "case_type": "",
    "dispute_focus": [],
    "keywords": []
  },
  "cards": [
    {
      "card_type": "similar_case",
      "title": "",
      "subtitle": "",
      "match_level": "高",
      "tags": [],
      "summary": "",
      "match_points": [],
      "legal_basis": [],
      "reference_value": "",
      "suggested_action": "",
      "source": {
        "name": "",
        "doc_id": "",
        "confidence_note": ""
      }
    }
  ],
  "related_basis": [],
  "handling_tips": [],
  "missing_data": []
}
```

## 9. 预览运行验收标准

第一次跑通时，只要满足以下标准即可：

```text
开始_1 能接收 business_scene、recommendation_context、custom_context。
代码块_1 运行成功，输出 result。
代码块_1.data 是脱敏后的 JSON 字符串。
Chat_1 输出合法 JSON，不混入 Markdown。
Chat_2 能根据有无候选数据输出不同结果。
结束_1 能返回 Chat_2 文本。
```

重点观察：

```text
如果没有 mock_cases / 知识库命中，Chat_2 不应编造具体案例。
如果 custom_context 带 mock_cases，Chat_2 应基于 mock 数据生成推荐列表。
输出中不应出现 access_token、内部 URL、完整权限码、完整用户 ID。
```

## 10. 下一步扩展顺序

五卡片跑通后，建议按这个顺序扩展：

```text
1. 知识库_1：检索相似案例
2. 知识库_2：检索相关法规 / 政策依据
3. 代码块_2：标准化候选案例、法规、指引和模板
4. Chat_2 改为基于标准化候选数据排序和生成
5. HTTP_4：记录点击、采纳、忽略、满意度反馈
```

