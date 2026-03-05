# 数据库约定与注意事项

## 基本约定

- 数据库：KingbaseES（兼容 PostgreSQL 语法）
- Schema：`dreamit_dj`
- 所有查询必须是只读 SELECT，禁止 INSERT / UPDATE / DELETE / DROP / ALTER
- 查询数据时必须加 `LIMIT`，建议不超过 50 条

## 字段命名约定

| 字段名 | 含义 | 说明 |
|--------|------|------|
| ID | 主键 | VARCHAR(50)，通常为 UUID |
| PID | 父级ID | 树形结构的父节点 |
| FID | 外键ID | 关联其他表的外键 |
| ROWSTATE | 行状态 | 1=有效, -1=逻辑删除, 0=草稿 |
| CREATE_TIME | 创建时间 | timestamp |
| CREATE_USERID | 创建人ID | |
| CREATE_UNAME | 创建人姓名 | |
| CREATE_DEPTID | 创建人部门ID | |
| CREATE_UNITID | 创建人单位ID | |
| MODULE_ID | 模块ID | 对应模块的 moduleId |
| FORM_ID | 表单ID | |
| FLOW_ID | 流程ID | |
| STATUS | 状态 | 业务状态字段 |
| STATUS_TEXT | 状态文本 | |

## 表名和 Schema 规则（重要）

KingbaseES 对表名大小写敏感，且 MCP 连接不会自动解析 search_path。所有查询必须：

1. 使用 `dreamit_dj."表名"` 格式（schema前缀 + 双引号包裹大写表名）
2. 字段名直接写大写即可，不需要双引号

正确写法：
```sql
SELECT ID, MODULE_NAME FROM dreamit_dj."G_MODULE" WHERE ROWSTATE = 1
```

错误写法（会报 relation does not exist）：
```sql
-- 缺少 schema 前缀
SELECT * FROM G_MODULE
SELECT * FROM "G_MODULE"
-- 小写表名
SELECT * FROM dreamit_dj.g_module
```

## 逻辑删除

项目使用 `ROWSTATE` 字段做逻辑删除，查询业务数据时务必加条件：
```sql
WHERE ROWSTATE = 1
```

## 字段类型映射（数据库 → Java）

| 数据库类型 | Java 类型 | Parameter 类型值 |
|-----------|----------|-----------------|
| varchar | String | 12 |
| numeric / integer | Integer / BigDecimal | 4 / 2 |
| timestamp | Date | 93 |
| date | Date | 91 |
| boolean | Boolean | 16 |

## 与项目代码的结合

查询到表结构后，结合以下文档生成代码：
- 实体类 → `docs/04-entity-design.md`
- 数据库操作 → `docs/03-database-operations.md`
- Controller → `docs/01-controller-development.md`
- Service → `docs/09-service-development.md`
