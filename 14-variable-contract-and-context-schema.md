# 变量契约与上下文 Schema

## 1. 文档目的

本文档用于统一“政务办公辅助推荐智能体”的变量命名、数据来源和上下文结构。

后续编写：

```text
开始节点
Code 节点
Chat / LLM 提示词
HTTP 请求节点
知识库检索节点
工具调用节点
反馈记录节点
```

都应优先使用本文定义的变量契约。

## 2. 当前验证结论

### 2.1 Chat 节点可直接获取的变量

经测试，Chat 提示词中可获取：

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

其中：

```text
user_info / userInfo
```

是当前最重要的用户身份、组织、权限和可见知识库来源。

### 2.2 Code 节点当前可直接获取的变量

Code 节点在未显式映射时，可获取：

```text
request_vars
global_vars
session_vars
kms_base_url
```

但以下变量在 Code 节点中需要显式映射：

```text
text
user_id
user_name
user_info
access_token
business_scene
recommendation_context
custom_context
now
application_id
conversation_id
model_name
```

因此建议在 Code 节点输入变量区显式新增映射，不依赖隐式环境变量。

## 3. 推荐自定义变量

为了支撑最终完整需求，建议统一定义以下自定义变量。

### 3.1 开始节点变量

开始节点只保留最小入参：

```text
business_scene
recommendation_context
custom_context
```

其中 Dify / 平台默认用户输入由 `text` 或用户问题变量提供，不建议额外重复创建。

#### business_scene

含义：当前业务场景。

建议结构：

```json
{
  "scene_name": "政务工作台首页",
  "module_name": "政务办公门户",
  "business_scene": "普通办公人员日常办公",
  "page_name": "首页",
  "page_object": "今日工作台"
}
```

MVP 可先传字符串：

```text
政务工作台首页
```

#### recommendation_context

含义：本次推荐业务、范围和数量。

建议结构：

```json
{
  "recommendation_business": "日常办公辅助推荐",
  "recommendation_scope": ["个人待办", "重要通知", "相关政策", "常用服务事项"],
  "max_items": 5,
  "priority_requirement": "优先推荐今日需要处理、需要阅读或需要确认的内容"
}
```

MVP 可先传数组：

```json
["个人待办", "重要通知", "相关政策", "常用服务事项"]
```

#### custom_context

含义：调用方自由扩展上下文。

建议结构：

```json
{
  "caller_id": "government_office_portal",
  "tenant_id": "default",
  "current_object_id": "",
  "current_object_name": "",
  "extra_requirement": "优先推荐今日需要处理、需要阅读或需要确认的内容",
  "debug_mode": false
}
```

## 4. Code 节点建议输入变量

Code 节点建议显式配置以下输入变量。

### 4.1 平台基础变量

| Code 入参 | 来源变量 | 用途 |
|---|---|---|
| `user_input` | `text` | 用户当前问题 |
| `current_time` | `now` | 时间敏感推荐、日志 |
| `model_name_input` | `model_name` | 模型能力判断、日志 |
| `application_id_input` | `application_id` | 应用追踪 |
| `conversation_id_input` | `conversation_id` | 会话追踪 |
| `request_vars_input` | `request_vars` | 后端服务配置，需白名单过滤 |

### 4.2 用户变量

| Code 入参 | 来源变量 | 用途 |
|---|---|---|
| `user_id_input` | `user_id` | 用户唯一标识 |
| `user_name_input` | `user_name` | 用户称呼与个性化 |
| `user_info_input` | `user_info` | 用户身份、组织、权限、知识库范围 |
| `access_token_input` | `access_token` | 后端 API 鉴权，禁止直接输出给 LLM |

### 4.3 智能体变量

| Code 入参 | 来源变量 | 用途 |
|---|---|---|
| `business_scene_input` | `business_scene` | 当前业务场景 |
| `recommendation_context_input` | `recommendation_context` | 推荐范围与数量 |
| `custom_context_input` | `custom_context` | 调用方自定义上下文 |

### 4.4 知识库、文件和工具变量

| Code 入参 | 来源变量 | 用途 |
|---|---|---|
| `knowledge_text_input` | `knowledge_text` | 知识库命中文本 |
| `reference_data_input` | `reference_data` | 知识库引用来源 |
| `knowledge_base_params_input` | `knowledge_base_params` | 知识库检索参数 |
| `file_contents_input` | `file_contents` | 上传文件内容 |
| `files_input` | `files` | 上传文件列表 |
| `tool_calls_input` | `tool_calls` | 工具调用信息 |

## 5. 统一 agent_context Schema

后续 Code 节点应输出统一上下文：

```json
{
  "user_input": "",
  "request_context": {
    "business_scene": {},
    "recommendation_context": {},
    "custom_context": {}
  },
  "runtime_context": {
    "current_time": "",
    "model_name": "",
    "application_id": "",
    "conversation_id": ""
  },
  "user_identity": {
    "user_id": "",
    "user_name": "",
    "dept_id": "",
    "dept_name": "",
    "unit_id": "",
    "unit_name": "",
    "security_level": "",
    "security_level_name": ""
  },
  "permission_context": {
    "role_ids": [],
    "permission_codes": [],
    "permission_count": 0,
    "visible_knowledge_bases": []
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
    "tool_entries": []
  },
  "knowledge_context": {
    "knowledge_text": "",
    "reference_data": [],
    "accessible_knowledge_bases": [],
    "policy_kb_ids": [],
    "service_kb_ids": []
  },
  "recommend_config": {
    "recommendation_business": "",
    "recommendation_scope": [],
    "max_items": 5,
    "priority_rules": []
  },
  "feasibility_report": {
    "available_capabilities": {},
    "missing_for_final_requirement": [],
    "suggested_data_sources": [],
    "variable_mapping_suggestions": []
  },
  "llm_safe_context": {}
}
```

## 6. LLM 安全上下文原则

后续 LLM 不应直接吃完整原始变量，尤其不要原样展开：

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

可以直接给 LLM 的内容：

```text
user_name
deptName
unitName
business_scene
recommendation_context
securityLevelName
current_time
知识库名称和类型摘要
权限数量和角色数量摘要
```

需要摘要后再给 LLM 的内容：

```text
permissions
roleId
knowledgeBases
request_vars
reference_data
```

## 7. 当前已验证能力

当前平台已验证可支撑：

```text
用户身份识别
组织部门识别
安全等级识别
权限数量识别
可见知识库范围识别
当前业务场景识别
推荐范围识别
当前时间与会话追踪
```

当前仍需补齐：

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

