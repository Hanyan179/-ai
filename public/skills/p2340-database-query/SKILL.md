# P2340 模块数据探查

## Description

面向开发人员的模块数据探查技能。当用户提供 module_id、form_id 或 list_id 时，通过查询数据库获取该模块的完整开发要素（表单、列表、元数据字段等），生成模块信息文档，为后续编码提供准确的数据上下文。

核心价值：将用户的文字需求（如"是否有效"）映射到开发所需的元数据编号（如 `C-OFFICESUPPLIES-CATEGORY-0003`）、表单ID、列表ID 等。

## When to use

- 用户提供了 module_id，需要获取模块完整信息
- 用户提供了 form_id 或 list_id，需要反查所属模块
- 开发前需要了解模块的表单、列表、元数据结构
- 需要将用户的文字需求映射到具体的元数据编号
- 编写 Controller / Service / JS 前需要确认相关 ID

## 数据库连接

- MCP Server: `p2340-database`
- 工具: `mcp_p2340_database_query`（参数: `sql`）
- 数据库: KingbaseES（兼容 PostgreSQL）
- Schema: `dreamit_dj`
- 模式: 只读查询

## 核心工作流程

### 第一步：获取模块基本信息

用户提供 module_id 后，查询 `reference/module-info-queries.md` 中的 SQL 模板，依次获取：

1. 模块基本信息（G_MODULE）→ 模块名称、编号、类型
2. 模块表单列表（G_FORM）→ 表单ID、名称、类型
3. 模块列表清单（G_LIST）→ 列表ID、名称、类型
4. 模块元数据字段（G_MODULE_METADATA）→ META_ID、字段名、业务表名

### 第二步：生成模块信息文档

将查询结果整理为结构化的模块信息文档，包含所有开发所需的 ID 和映射关系。文档模板见 `reference/module-doc-template.md`。

### 第三步：需求映射

根据用户的文字需求，在元数据中定位对应的 META_ID，为 JS 开发、表单操作等提供准确的编号。

## References

- `reference/module-info-queries.md` — 模块信息获取的 SQL 查询模板
- `reference/module-doc-template.md` — 模块信息文档的输出模板
- `reference/conventions.md` — 数据库查询约定与注意事项
- `reference/query-patterns.md` — 通用查询模板（表结构、索引等）
- `reference/modules.md` — 已知模块清单
