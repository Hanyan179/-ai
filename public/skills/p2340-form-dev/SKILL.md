# P2340 表单功能开发

## Description

面向开发人员的表单功能开发技能。覆盖表单页面的完整开发流程：从获取模块信息、定位/创建文件，到编写前端 JS（自定义按钮、表单事件、字段操作）和后端 Java（Controller、Service、Entity）代码。

## When to use

- 用户需要在表单上添加自定义按钮（custom1、custom2 等）
- 用户需要表单加载时的初始化逻辑（formReady）
- 用户需要表单字段联动、取值、赋值
- 用户需要表单提交后调用后端接口更新数据
- 用户需要在列表上添加自定义按钮打开表单
- 用户提供了 form_id、list_id 或 module_id，需要进行表单相关开发

## 完整开发流程

### 第一步：收集信息

用户需求通常是笼统的文字描述。需要确认：

1. 目标表单/列表：需要 form_id、list_id 或 module_id（至少一个）
2. 操作类型：自定义按钮？表单初始化？字段联动？列表按钮？
3. 业务逻辑：点击后做什么？更新哪张表？哪些字段？

如果用户只提供了部分信息，主动询问缺失的部分。

### 第二步：获取模块信息

使用 `p2340-database-query` skill 查询模块完整信息。详见 `reference/module-info-flow.md`。

输出：模块名称、所有表单ID、所有列表ID、元数据字段（META_ID ↔ 字段名映射）、业务数据表名。

### 第三步：定位/创建文件

根据路径规则检查文件是否存在，不存在则创建。详见 `reference/file-path-rules.md`。

检查清单：
- 前端 JS 文件：`src/main/webapp/p2340/{moduleId}/js/{formId或listId}.js`
- 后端 Controller：`src/main/java/cn/dreamit/p2340/module_{moduleId}/controller/`
- 后端 Service 接口 + 实现：`src/main/java/cn/dreamit/p2340/module_{moduleId}/service/`
- Entity（如需要）：`src/main/java/cn/dreamit/p2340/module_{moduleId}/entity/`

### 第四步：编写代码

前端 JS：详见 `reference/form-events.md`（表单固定事件）和 `reference/code-templates.md`（代码模板）。
后端 Java：详见 `reference/backend-rules.md`（后端开发规则）。

额外参考：
- `docs/06-frontend-development.md` — 前端开发规范
- `docs/01-controller-development.md` — Controller 开发规范
- `docs/03-database-operations.md` — 数据库操作规范
- `docs/09-service-development.md` — Service 开发规范

## References

- `reference/form-events.md` — 表单固定事件名规范（formReady、customN 等）
- `reference/code-templates.md` — 前端代码模板（自定义按钮、字段操作、列表按钮）
- `reference/backend-rules.md` — 后端开发规则（Controller/Service/Entity 创建规范）
- `reference/file-path-rules.md` — 文件路径命名规则
- `reference/module-info-flow.md` — 模块信息获取流程
