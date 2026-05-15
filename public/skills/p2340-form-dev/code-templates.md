# 表单开发代码模板

## 1. 自定义按钮：保存 + 调用接口

最常见的模式。先保存表单，成功后调用后端接口，提示结果并关闭表单。

```javascript
function custom2() {
    xform.saveForm({enableTip: false}, function (result) {
        if (result && result.status == DSF.SaveStatus.Success) {
            var pk = DSF.getURLParam("pk");
            layer.load();
            $.ajax({
                url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}',
                type: 'POST',
                data: { id: pk },
                success: function(res) {
                    layer.closeAll('loading');
                    if (res.type == 'success') {
                        top.layuiOk(res.message || "操作成功", function() {
                            xform.close({confirm: false});
                        });
                    } else {
                        top.layuiError(res.message || "操作失败");
                    }
                },
                error: function() {
                    layer.closeAll('loading');
                    top.layuiError("请求失败");
                }
            });
        } else if (result && result.status != DSF.SaveStatus.VerifyError) {
            top.layuiError(result.message || "保存失败");
        }
    });
}
```

## 2. 自定义按钮：确认弹窗 + 保存 + 调用接口

需要用户二次确认的操作（如发布、删除等）。

```javascript
function custom2() {
    layer.confirm('确定要执行此操作吗？', {
        btn: ['确定', '取消']
    }, function(index) {
        layer.close(index);
        xform.saveForm({enableTip: false}, function (result) {
            if (result && result.status == DSF.SaveStatus.Success) {
                var pk = DSF.getElementValueByKey("A0001");
                layer.load();
                $.ajax({
                    url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}',
                    type: 'POST',
                    data: { id: pk },
                    success: function(res) {
                        layer.closeAll('loading');
                        if (res.type == 'success') {
                            top.layuiOk(res.message || "操作成功", function() {
                                xform.close({confirm: false});
                            });
                        } else {
                            top.layuiError(res.message || "操作失败");
                        }
                    },
                    error: function() {
                        layer.closeAll('loading');
                        top.layuiError("请求失败");
                    }
                });
            } else if (result && result.status != DSF.SaveStatus.VerifyError) {
                top.layuiError(result.message || "保存失败");
            }
        });
    });
}
```

## 3. 自定义按钮：不保存直接调用接口

```javascript
function custom1() {
    var pk = DSF.getURLParam("pk");
    layer.load();
    $.ajax({
        url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}',
        type: 'POST',
        data: { id: pk },
        success: function(res) {
            layer.closeAll('loading');
            if (res.type == 'success') {
                top.layuiOk(res.message || "操作成功");
            } else {
                top.layuiError(res.message || "操作失败");
            }
        },
        error: function() {
            layer.closeAll('loading');
            top.layuiError("请求失败");
        }
    });
}
```

## 4. 自定义按钮：打开另一个列表弹窗

```javascript
function custom1() {
    var pk = DSF.getElementValueByKey("A0001");
    openWinView(this, {
        "url": DSF.getURLRoot() + "ctrl/list/{listId}?moduleId={moduleId}&fid=" + pk,
        "isfresh": false
    });
}
```

## 5. formReady：根据 URL 参数填充字段

```javascript
function formReady() {
    var paramValue = DSF.getURLParam("paramName");
    if (paramValue) {
        DSF.setElementValueByKey("{META_ID}", {
            "value": paramValue,
            "text": decodeURIComponent(DSF.getURLParam("paramText") || "")
        });
    }
}
```

## 6. formReady：Ajax 获取数据并填充字段

```javascript
function formReady() {
    $.ajax({
        url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}',
        type: 'GET',
        success: function(res) {
            if (res.type == 'success' && res.data) {
                DSF.setElementValueByKey("{META_ID}", {
                    "value": res.data.id || '',
                    "text": res.data.name || ''
                });
            }
        }
    });
}
```

## 7. formReady：遍历子表单行并设置值

```javascript
function formReady() {
    $(".x-subform").find(".x-subform-item").each(function () {
        var $row = $(this);
        var existingVal = DSF.getElementMapValueByKey("{META_ID}", $row);
        if (!existingVal || !existingVal.value) {
            $.ajax({
                url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/{methodName}',
                type: 'GET',
                success: function(res) {
                    if (res.type == 'success' && res.data) {
                        DSF.setElementValueByKey("{META_ID}", {
                            "value": res.data.id,
                            "text": res.data.name
                        }, $row);
                    }
                }
            });
        }
    });
}
```

## 8. 列表按钮：根据状态打开不同节点的表单

```javascript
layui.dataGridButton.openFormByTask = function(elem, data, datagrid, rowPkMetaKey, funParams) {
    var pk = data['{主键META_ID}'];
    var moduleId = '{moduleId}';
    // 根据状态判断打开编辑还是查看
    var status = data['{状态META_ID}.value'];
    var nodeId = (status == '-1' || status == -1) ? 67 : 71;  // 67=编辑, 71=查看
    var url = DSF.getURLRoot() + 'ctrl/formControl/sysForm?moduleId=' + moduleId
        + '&nodeId=' + nodeId + '&pk=' + pk
        + '&validateByList=1&listId={listId}';
    simpleWin(this, {
        "url": url + "&t=" + new Date().getTime(),
        "name": "窗口标题"
    });
};
```

## 9. 列表按钮：后端动态决定 nodeId（根据字段值）

适用场景：列表按钮打开表单时，nodeId 不仅取决于状态，还需要根据记录中某个字段的值（如"所属组织名称"）来决定打开哪个表单节点。前端无法直接获取该字段值，需要调用后端接口查询。

### 前端 JS（列表按钮）

```javascript
layui.dataGridButton.openFormByTask = function(elem, data, datagrid, rowPkMetaKey, funParams) {
    var pk = data['{主键META_ID}'];
    var moduleId = '{moduleId}';
    var listId = '{listId}';

    // 先调用后端接口，根据记录数据动态获取 nodeId
    layer.load();
    $.ajax({
        url: DSF.getURLRoot() + 'ctrl/{controllerMapping}/getNodeId',
        type: 'GET',
        data: { id: pk },
        success: function(res) {
            layer.closeAll('loading');
            if (res.type == 'success' && res.data) {
                var nodeId = res.data.nodeId;
                var url = DSF.getURLRoot() + 'ctrl/formControl/sysForm?moduleId=' + moduleId
                    + '&nodeId=' + nodeId + '&pk=' + pk
                    + '&validateByList=1&listId=' + listId;
                simpleWin(this, {"url": url + "&t=" + new Date().getTime(), "name": "窗口标题"});
            } else {
                top.layuiError(res.message || "获取表单节点失败");
            }
        },
        error: function() {
            layer.closeAll('loading');
            top.layuiError("请求失败");
        }
    });
};
```

### 后端 Controller

```java
/**
 * 根据记录的字段值动态返回 nodeId
 */
@GetMapping("/getNodeId")
public MessageBean getNodeId() {
    try {
        IContextDictionary dict = getContextDictionary();
        String id = dict.getString("id");
        if (id == null || id.isEmpty()) {
            return SuperKit.error("id参数不能为空");
        }

        // 查询记录中的判断字段（如所属组织名称）
        Sql sql = new Sql("SELECT {判断字段} FROM {DB_TABLE} WHERE ID = ? AND ROWSTATE = 1");
        sql.addParameter(new Parameter("ID", id, 12));
        DataTable dt = DBManager.getDataTable(sql);

        int nodeId = {默认nodeId};  // 默认节点
        if (dt != null && dt.getRowCount() > 0) {
            String fieldValue = dt.getRows().get(0).getString("{判断字段}");
            // 根据字段值映射 nodeId
            if ("值A".equals(fieldValue)) {
                nodeId = 55;
            } else if ("值B".equals(fieldValue)) {
                nodeId = 56;
            }
            // 其他情况使用默认 nodeId
        }

        Map<String, Object> result = new HashMap<>();
        result.put("nodeId", nodeId);
        return SuperKit.success(result);
    } catch (Exception e) {
        return SuperKit.error("获取节点失败: " + e.getMessage());
    }
}
```

### 适用场景说明

- 同一列表中的记录，因某个字段值不同，需要打开不同的表单节点（不同的表单布局/权限）
- 典型例子：不同组织类型对应不同的表单模板
- 可与模板 #8 结合：先判断状态（编辑/查看），再在编辑模式下根据字段值选择具体节点

## 获取主键的两种方式

| 场景 | 方式 | 说明 |
|------|------|------|
| 表单 JS 中 | `DSF.getURLParam("pk")` | 从 URL 参数获取 |
| 表单 JS 中 | `DSF.getElementValueByKey("A0001")` | 从元数据字段获取（A0001 通常是主键） |
| 列表 JS 中 | `data[rowPkMetaKey]` | 从行数据获取 |
| 列表 JS 中 | `data['{模块编号}.A0001']` | 从行数据按元数据路径获取 |
