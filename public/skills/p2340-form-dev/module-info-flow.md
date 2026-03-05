# 模块信息获取流程

## 概述

用户提供的信息可能是 module_id、form_id、list_id 中的任意一个。需要从任意入口反查出完整的模块开发上下文。

## 流程

### 入口1：用户提供 module_id

直接查询模块信息。

### 入口2：用户提供 form_id

先反查 module_id：
```sql
SELECT MODULE_ID FROM dreamit_dj."G_FORM" WHERE ID = '{form_id}' AND ROWSTATE = 1
```

### 入口3：用户提供 list_id

先反查 module_id：
```sql
SELECT MODULE_ID FROM dreamit_dj."G_LIST" WHERE ID = '{list_id}' AND ROWSTATE = 1
```

## 获取完整模块信息

拿到 module_id 后，依次查询：

### 1. 模块基本信息
```sql
SELECT ID, MODULE_NAME, MODULE_CODE, MODULE_TYPE_TEXT, STATUS_TEXT
FROM dreamit_dj."G_MODULE" WHERE ID = '{module_id}' AND ROWSTATE = 1
```

### 2. 模块下所有表单
```sql
SELECT ID, FORM_NAME, FORM_TYPE_TEXT, IS_DEFAULT_TEXT, STATUS_TEXT
FROM dreamit_dj."G_FORM"
WHERE MODULE_ID = '{module_id}' AND ROWSTATE = 1 AND IS_TAB <> 1
ORDER BY ID DESC LIMIT 30
```

### 3. 模块下所有列表
```sql
SELECT ID, LIST_NAME, LIST_TYPE_TEXT, STATUS_TEXT
FROM dreamit_dj."G_LIST"
WHERE MODULE_ID = '{module_id}' AND ROWSTATE = 1
ORDER BY ID DESC LIMIT 30
```

### 4. 模块元数据字段
```sql
SELECT META_ID, META_NAME, META_TYPE_TEXT, DB_TABLE
FROM dreamit_dj."G_MODULE_METADATA"
WHERE MODULE_ID = '{module_id}' AND ROWSTATE = 1
  AND META_ID NOT LIKE '%S-BASE-%' AND META_TYPE <> 1 AND FMETA_ID IS NULL
ORDER BY SHOWORDER LIMIT 50
```

## 输出

将查询结果整理为模块信息摘要，包含：
- 模块名称、编号
- 所有表单（ID + 名称）→ 用于确定 JS 文件路径
- 所有列表（ID + 名称）→ 用于确定列表 JS 和 Component 文件路径
- 元数据字段（META_ID + 名称 + 业务表）→ 用于 JS 中引用字段、后端操作数据表
- 文件路径推导结果（JS 路径、Controller 包路径等）
