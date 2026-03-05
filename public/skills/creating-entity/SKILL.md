---
name: creating-entity
description: 为数据库表创建完整的 DDD 分层 Java 代码（Constants → DO → BO → SQL模板 → Repository → Service → Controller）。当用户需要新建实体、映射数据库表、或创建 CRUD 基础代码时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# 创建实体类

为一张数据库表生成完整的 DDD 分层代码。执行前务必加载 `dsfa-framework-rules`。

## 工作流

```
查表结构 → 看同模块代码 → Constants → DO → BO → SQL模板 → Repository接口+实现 → Service接口+实现 → Controller
```

## 第一步：查数据库表结构

从 `.kiro/user-config.md` 获取数据库连接信息，查询表结构：

```sql
SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT
FROM information_schema.COLUMNS
WHERE TABLE_NAME = '表名' ORDER BY ORDINAL_POSITION;
```

## 第二步：查看同模块已有代码

确认当前模块使用的 BO 模式（Policy 用 @Data，KMS 用 ProductBaseModel），确认包路径和命名规范。

## 第三步：按顺序创建文件

### 3.1 Constants（domain 层）

位置：`domain/.../constants/{bizName}/XxxConstants.java`

```java
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class XxxConstants {
    public static final String TABLE_NAME = "实际表名";

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public class Column {
        public static final String ID = "表名_id";  // 主键 = 表名 + _id
    }
}
```

### 3.2 DO（infrastructure 层）

位置：`infrastructure/.../model/{bizName}/XxxDO.java`

继承 `DsfaBaseModel<T>`，`@TableBind` 绑定表名主键，静态 `DAO` 实例。详见 `dsfa-framework-rules` 的 [references/orm-patterns.md](../dsfa-framework-rules/references/orm-patterns.md)

### 3.3 BO（domain 层）

位置：`domain/.../model/{bizName}/XxxBO.java`

Policy 模块用 `@Data @Builder @NoArgsConstructor @AllArgsConstructor`，KMS 模块用 `ProductBaseModel`。

### 3.4 SQL 模板（infrastructure 层）

位置：`infrastructure/.../sql/{bizName}/{bizName}.sql`

`#namespace` 与 Repository 的 `SQL_KEY` 对应，所有查询包含 `ds_deleted = '0'`。

### 3.5 Repository 接口（domain 层）+ 实现（infrastructure 层）

接口在 `domain/.../repository/{bizName}/`，实现在 `infrastructure/.../repository/{bizName}/`。

### 3.6 Service 接口 + 实现（domain 层）

接口在 `domain/.../service/{bizName}/`，实现在 `domain/.../service/{bizName}/impl/`。

### 3.7 Controller（adapter 层）

位置：`adapter/.../web/controller/{bizName}/XxxController.java`

## 完成检查

- [ ] Constants 表名、主键、所有字段常量已定义
- [ ] DO 的 `@TableBind` 正确，`DAO` 静态实例存在
- [ ] BO 跟随模块现有模式
- [ ] SQL 模板 namespace 与 SQL_KEY 对应，查询包含 `ds_deleted = '0'`
- [ ] Repository 接口在 domain，实现在 infrastructure
- [ ] 包路径与同模块已有代码一致
