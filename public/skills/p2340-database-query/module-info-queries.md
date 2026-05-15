# 模块信息获取 SQL 查询模板

所有查询必须使用 `dreamit_dj."表名"` 格式（schema前缀 + 双引号包裹大写表名）。

## 1. 查询模块基本信息

```sql
SELECT ID, MODULE_NAME, MODULE_CODE, MODULE_TYPE_TEXT, STATUS_TEXT
FROM dreamit_dj."G_MODULE"
WHERE ID = '{module_id}' AND ROWSTATE = 1
```

输出：模块名称、模块编号、模块类型、状态。

## 2. 查询模块下的表单

```sql
SELECT ID, FORM_NAME, FORM_TYPE_TEXT, IS_DEFAULT_TEXT, STATUS_TEXT, VERSION
FROM dreamit_dj."G_FORM"
WHERE MODULE_ID = '{module_id}'
  AND ROWSTATE = 1
  AND IS_TAB <> 1
ORDER BY ID DESC
LIMIT 30
```

输出：表单ID（开发中用于构建表单URL）、表单名称、类型、是否默认。

## 3. 查询模块下的列表

```sql
SELECT ID, LIST_NAME, LIST_TYPE_TEXT, STATUS_TEXT, VERSION
FROM dreamit_dj."G_LIST"
WHERE MODULE_ID = '{module_id}'
  AND ROWSTATE = 1
ORDER BY ID DESC
LIMIT 30
```

输出：列表ID（开发中用于列表组件和 JS 文件命名）、列表名称、类型。

## 4. 查询模块元数据（顶层字段）

```sql
SELECT META_ID, META_NAME, META_TYPE_TEXT, CATEGORY_TEXT, DB_TABLE, FMETA_ID
FROM dreamit_dj."G_MODULE_METADATA"
WHERE MODULE_ID = '{module_id}'
  AND ROWSTATE = 1
  AND META_ID NOT LIKE '%S-BASE-%'
  AND META_TYPE <> 1
  AND FMETA_ID IS NULL
ORDER BY SHOWORDER
LIMIT 50
```

输出：
- META_ID — 元数据编号（如 `C-OFFICESUPPLIES-CATEGORY-0003`），JS 开发中引用此编号
- META_NAME — 字段中文名（如"是否有效"），对应用户需求中的文字描述
- DB_TABLE — 对应的业务数据表名

## 5. 查询子表单元数据（如有子表单）

```sql
SELECT META_ID, META_NAME, META_TYPE_TEXT, DB_TABLE, FMETA_ID
FROM dreamit_dj."G_MODULE_METADATA"
WHERE MODULE_ID = '{module_id}'
  AND ROWSTATE = 1
  AND FMETA_ID = '{parent_meta_id}'
ORDER BY SHOWORDER
LIMIT 50
```

## 6. 通过 form_id 反查模块

```sql
SELECT MODULE_ID FROM dreamit_dj."G_FORM"
WHERE ID = '{form_id}' AND ROWSTATE = 1
```

## 7. 通过 list_id 反查模块

```sql
SELECT MODULE_ID FROM dreamit_dj."G_LIST"
WHERE ID = '{list_id}' AND ROWSTATE = 1
```

## 8. 查询元数据总数

```sql
SELECT COUNT(1) FROM dreamit_dj."G_MODULE_METADATA"
WHERE MODULE_ID = '{module_id}'
  AND ROWSTATE = 1
  AND META_ID NOT LIKE '%S-BASE-%'
  AND META_TYPE <> 1
  AND FMETA_ID IS NULL
```
