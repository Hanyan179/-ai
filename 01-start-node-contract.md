# 开始节点设计

## 1. 节点定位

开始节点是调用方和政务主动推荐智能体之间的输入契约。

它不负责理解业务，也不负责查询数据，只负责接收本次推荐所需的最小业务上下文。

## 2. MVP 参数结论

按照原始需求和 MVP 目标，开始节点建议固定为：

```text
user_input
business_scene
recommendation_context
custom_context
```

其中：

- `user_input`：用户当前输入。
- `business_scene`：当前业务场景。
- `recommendation_context`：本次推荐业务、推荐目标和推荐范围。
- `custom_context`：调用方自定义上下文。

如果 Dify Chatflow 已经有默认用户输入变量，可以不额外创建 `user_input`，直接使用系统默认输入；但文档和后续节点里仍按 `user_input` 理解。

## 3. 为什么这样设计

开始节点的核心不是让调用方传完整用户画像，也不是让调用方传完整业务数据。

它只需要表达三件事：

```text
当前处于什么业务场景
本次希望做什么推荐
调用方还有什么自定义信息需要放进来
```

用户画像、行为数据、长短期记忆、权限范围等用户相关信息，应该由智能体后续根据登录态、用户 ID 或系统变量自行获取。

如果调用方确实需要临时传用户 ID、租户 ID、当前对象 ID、mock 数据或额外约束，可以统一放入 `custom_context`。

## 4. 三个上下文参数与原始需求关系

| 参数 | 对应原始需求 | 说明 |
|---|---|---|
| `business_scene` | 上下文场景数据、场景分析与感知 | 当前时间、地点、页面、模块、业务场景、当前对象 |
| `recommendation_context` | 推荐意图、推荐类型引导、推荐场景模板 | 本次推荐业务、推荐目标、推荐类型、推荐重点、推荐数量 |
| `custom_context` | 调用方可选上下文、扩展数据入口 | 调用方想临时存放的任意信息，如用户 ID、租户、当前对象、mock 数据、额外约束 |

## 5. MVP 固定业务场景

第一版 MVP 建议固定为：

```text
政务工作台首页 - 普通办公人员日常办公辅助推荐
```

该场景最适合验证原始需求中的三类推荐：

- 信息推荐：政策文件、通知公告、业务指南。
- 服务推荐：常用服务事项、服务入口。
- 任务推荐：个人待办任务、协同事项。

MVP 默认推荐目标：

```text
根据当前工作台场景、用户可见数据和近期行为，推荐今日最值得关注的政策文件、服务事项、待办任务和通知公告。
```

## 6. 入参定义

### 6.1 user_input

类型：`string`

含义：用户当前输入。

示例：

```text
今天有什么需要我优先处理？
```

如果用户没有明确输入，也可以由页面传默认值：

```text
请根据当前工作台场景为我推荐今天需要关注的内容。
```

### 6.2 business_scene

类型：`string`

含义：当前业务场景。用于说明用户现在处于什么页面、模块、业务位置或办公环境。

MVP 可固定为：

```json
{
  "scene_name": "政务工作台首页",
  "module_name": "政务办公门户",
  "business_scene": "普通办公人员日常办公",
  "time": "2026-05-07 09:00:00",
  "location": "单位办公室",
  "page_object": "今日工作台"
}
```

也可以传简单文本：

```text
政务办公门户 / 工作台首页 / 普通办公人员日常办公 / 今日工作台
```

### 6.3 recommendation_context

类型：`string`

含义：本次推荐业务和推荐目标。用于说明这次希望智能体推荐什么、推荐哪几类、最多推荐多少条。

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

也可以传简单文本：

```text
请推荐今日需要优先关注的个人待办、重要通知、相关政策和常用服务事项，最多 5 条。
```

### 6.4 custom_context

类型：`string`

含义：调用方自定义上下文。这里是调用方想要存放或放置的额外内容，不做固定字段限制。

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

## 7. Dify 开始节点最小配置

如果 Dify 默认已经提供用户输入，则开始节点只需要额外配置 3 个变量：

```text
business_scene
recommendation_context
custom_context
```

如果当前应用没有默认用户输入变量，则配置 4 个变量：

```text
user_input
business_scene
recommendation_context
custom_context
```

## 8. 调用示例

```json
{
  "user_input": "今天有什么需要我优先处理？",
  "business_scene": "{\"scene_name\":\"政务工作台首页\",\"module_name\":\"政务办公门户\",\"business_scene\":\"普通办公人员日常办公\",\"time\":\"2026-05-07 09:00:00\"}",
  "recommendation_context": "{\"recommendation_goal\":\"生成今日办公辅助推荐\",\"recommendation_business\":\"日常办公辅助推荐\",\"recommend_types\":[\"information\",\"service\",\"task\"],\"focus\":[\"个人待办\",\"重要通知\",\"相关政策\",\"常用服务事项\"],\"max_items\":5}",
  "custom_context": "{\"user_id\":\"u001\",\"tenant_id\":\"default\",\"caller_id\":\"government_office_portal\",\"deadline_scope\":\"today\"}"
}
```

## 9. 输出

开始节点不做业务处理，直接将用户输入和 3 个上下文参数传给后续节点。
