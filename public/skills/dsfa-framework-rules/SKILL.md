---
name: dsfa-framework-rules
description: DSFA 平台框架编码规则。生成 Java 代码时必须遵循的 DDD 分层、JFinal ORM、BO/DO 转换、Controller/Service/Repository 编码规范。当需要写业务代码、创建实体、编写 SQL 模板时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# DSFA 平台框架规则

基于 `dsfa-platform-parent:6.3.0`，所有业务模块必须遵循以下规则。

## DDD 分层结构

```
dsfa-xxx-starter/              # 父 POM（packaging: pom）
├── dsfa-xxx-api/              # 对外 Feign/Dubbo 接口 + POJO
├── dsfa-xxx-adapter/          # Controller + DTO + MetaExt 扩展
├── dsfa-xxx-application/      # 应用层编排（可选，复杂业务场景使用）
├── dsfa-xxx-domain/           # 领域层：BO + Service接口/实现 + Repository接口 + Constants + Utils + Enums
├── dsfa-xxx-infrastructure/   # 基础设施层：Repository实现 + DO + SQL模板
└── dsfa-xxx-bootstrap/        # 启动模块：Application类 + bootstrap.yml
```

依赖方向：`bootstrap → adapter + infrastructure → domain`（domain 不依赖 infrastructure）

## ORM：JFinal ActiveRecord（非 MyBatis）

详细的 DO 定义、SQL 模板语法、Repository 实现模式见 [references/orm-patterns.md](references/orm-patterns.md)

## BO 模式选择

项目中存在两种 BO 模式，**必须跟随所在模块的现有模式**：

- Policy 模块：`@Data` Lombok BO，Repository 中手动 Record → BO 映射
- KMS 模块：`ProductBaseModel` BO，使用 `ProductModelUtil.convertDO2BO()` 转换

详细代码示例见 [references/orm-patterns.md](references/orm-patterns.md)

## Controller 规范

```java
@RestController
@RequestMapping("/bizName")
public class XxxController extends BaseController {
    @Resource
    IXxxService xxxService;

    @GetMapping("/query")
    public Result query(@RequestParam String id) {
        return Result.me().success(xxxService.query(id));
    }

    @PostMapping("/add")
    public Result add(@RequestBody XxxDTO dto) {
        boolean flag = xxxService.add(dto);
        return flag ? Result.me().success() : Result.me().error();
    }
}
```

- 继承 `BaseController`（`com.dsfa.platform.starter.web.base`）
- 返回 `Result.me().success()` / `.success(data)` / `.error()` / `.error("消息")`
- 注入用 `@Resource`，免登录加 `@AuthIgnore`

## Service 规范

```java
// domain/service/bizName/IXxxService.java
public interface IXxxService { ... }

// domain/service/bizName/impl/XxxServiceImpl.java
@Service
public class XxxServiceImpl implements IXxxService {
    @Resource
    IXxxRepository xxxRepository;
}
```

## DTO / VO / BO 分工

| 类型 | 位置 | 用途 |
|------|------|------|
| DTO | domain/model/bizName/ | 请求参数（查询条件、分页参数），`@Data` |
| VO | domain/model/bizName/ | 响应/更新参数，`@Data @Builder` |
| BO | domain/model/bizName/ | 业务对象，对应数据库表，`@Data @Builder @TableBind` |

DTO 示例（分页查询）：
```java
@Data
public class XxxDto {
    private Integer pageNum = 1;
    private Integer pageSize = 10;
    // 查询条件字段
}
```

## MetaExt 扩展（表单钩子）

adapter 层的 `ext/` 目录下，用于拦截平台表单的保存/删除等操作：

```java
@MetaAspect("policy.bizName.edit")
public class XxxFormExt extends MetaExt {
    @Resource
    IXxxDao xxxDao;

    @Override
    public void beforePersistData(MetaPoint metaPoint, PersistData persistData) {
        JSONObject data = persistData.getData();
        // 校验逻辑
    }
}
```

## Constants 规范

```java
public class XxxConstants {
    public static final String TABLE_NAME = "xxx_table_name";
    public static class Column {
        public static final String ID = "xxx_table_name_id";  // 主键 = 表名_id
        // 平台字段前缀 ds_，业务字段前缀 p_，分类字段前缀 cm_
    }
}
```

## 用户上下文

```java
@Resource
UserInfoHolder userInfoHolder;
String userId = userInfoHolder.getUserId();
```

## 数据库兼容

同时兼容 MySQL、KingBase8、达梦（DM），避免 MySQL 特有语法。

## 平台 SDK 常用类

| 类 | 包 | 用途 |
|---|---|---|
| `Result` | `com.dsfa.platform.sdk.common` | 统一返回 |
| `JSONObject/JSONArray` | `com.dsfa.platform.sdk.json` | JSON 操作 |
| `BaseController` | `com.dsfa.platform.starter.web.base` | Controller 基类 |
| `DsfaBaseModel<T>` | `com.dsfa.platform.starter.meta.base` | DO 基类 |
| `UserInfoHolder` | `com.dsfa.platform.starter.meta.session` | 用户上下文 |
| `Db/Kv/SqlPara/Record` | `com.dsfa.platform.starter.db.jfinal.*` | 数据库操作 |
| `@TableBind` | `com.dsfa.platform.starter.db.jfinal.tablebind` | 表绑定注解 |
| `MetaExt/MetaAspect` | `com.dsfa.platform.starter.meta.core.ext` | 表单扩展 |
