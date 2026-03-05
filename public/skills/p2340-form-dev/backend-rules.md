# 后端开发规则

## 文件检查与创建流程

当需要后端接口支持时，按以下顺序检查和创建文件：

### 1. 检查 Controller 是否存在

路径：`src/main/java/cn/dreamit/p2340/module_{moduleId}/controller/`

- 如果该模块已有 Controller → 在现有 Controller 中添加方法
- 如果没有 Controller → 创建新的 Controller 文件

### 2. 检查 Service 是否需要

如果业务逻辑复杂（多步操作、事务等），需要 Service 层：

- 接口：`src/main/java/cn/dreamit/p2340/module_{moduleId}/service/{Name}Service.java`
- 实现：`src/main/java/cn/dreamit/p2340/module_{moduleId}/service/impl/{Name}ServiceImpl.java`

简单的单表更新可以直接在 Controller 中完成，不需要 Service。

### 3. 检查 Entity 是否需要

如果需要用 `DataEntityKit` 做插入/更新操作，需要 Entity：

- 路径：`src/main/java/cn/dreamit/p2340/module_{moduleId}/entity/{Name}Entity.java`

## Controller 创建规范

```java
package cn.dreamit.p2340.module_{moduleId}.controller;

import cn.dreamit.dreamweb.bean.MessageBean;
import cn.dreamit.dreamweb.web.controller.base.BaseController;
import cn.dreamit.p1000.util.SuperKit;
import org.springframework.web.bind.annotation.*;
import xsf.IContextDictionary;
import xsf.data.DBManager;
import xsf.data.DataTable;
import xsf.data.Parameter;
import xsf.data.Sql;

import java.util.HashMap;
import java.util.Map;

/**
 * {模块名称} Controller
 */
@RestController
@RequestMapping("/{controllerMapping}")
public class {Name}Controller extends BaseController {

    /**
     * {方法描述}
     */
    @PostMapping("/{methodName}")
    public MessageBean methodName() {
        try {
            IContextDictionary dict = getContextDictionary();
            String id = dict.getString("id");

            // 业务逻辑
            Sql sql = new Sql("UPDATE {DB_TABLE} SET STATUS = ? WHERE ID = ?");
            sql.addParameter(new Parameter("STATUS", 1, 4));
            sql.addParameter(new Parameter("ID", id, 12));
            DBManager.execute(sql);

            return SuperKit.success("操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            return SuperKit.error("操作失败: " + e.getMessage());
        }
    }
}
```

### Controller 规范要点

- 继承 `BaseController`
- 使用 `@RestController` + `@RequestMapping`
- 查询用 `@GetMapping`，写入用 `@PostMapping`
- 参数通过 `getContextDictionary().getString("key")` 获取
- 返回 `SuperKit.success()` 或 `SuperKit.error()`
- 所有方法必须有 try-catch 异常处理
- 必填参数要做非空校验

### Controller 命名规则

- `@RequestMapping` 的路径用驼峰命名，如 `/performEvaluate`
- 前端 JS 中调用：`DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}'`
- 注意：前端 URL 中有 `ctrl/` 前缀（来自 `spring.mvc.servlet.path=/ctrl/`）

## Service 创建规范

### 接口

```java
package cn.dreamit.p2340.module_{moduleId}.service;

public interface {Name}Service {
    void methodName(String param1, String param2);
}
```

### 实现

```java
package cn.dreamit.p2340.module_{moduleId}.service.impl;

import cn.dreamit.p2340.module_{moduleId}.service.{Name}Service;
import org.springframework.stereotype.Service;
import xsf.data.*;

@Service
public class {Name}ServiceImpl implements {Name}Service {

    @Override
    public void methodName(String param1, String param2) {
        // 业务逻辑
    }
}
```

### Controller 注入 Service

```java
import javax.annotation.Resource;

@Resource
private {Name}Service nameService;
```

## Entity 创建规范

参考 `docs/04-entity-design.md`。Entity 的表名来自元数据的 `DB_TABLE` 字段。

## 前后端联调要点

1. 前端 JS 中的 URL：`DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}'`
2. 后端 `@RequestMapping("/{controllerMapping}")` 对应前端 URL 中 `ctrl/` 后面的部分
3. 前端 `data: { id: pk }` → 后端 `dict.getString("id")`
4. 后端返回 `SuperKit.success(data)` → 前端 `res.type == 'success'`，数据在 `res.data`
5. 后端返回 `SuperKit.error(msg)` → 前端 `res.type != 'success'`，消息在 `res.message`
