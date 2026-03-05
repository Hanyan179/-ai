# 表单固定事件名规范

## 表单 JS 中的固定函数名

这些函数名是平台约定的，不能随意更改。写在表单对应的 JS 文件中即可自动生效。

### formReady — 表单加载完成事件

表单渲染完成后自动调用。用于：初始化字段值、设置默认值、根据 URL 参数填充字段。

```javascript
function formReady() {
    // 获取 URL 参数
    var partyId = DSF.getURLParam("partyId");

    // 设置字段值
    DSF.setElementValueByKey("{META_ID}", {"value": "值", "text": "显示文本"});

    // 遍历子表单行
    $(".x-subform").find(".x-subform-item").each(function () {
        var $row = $(this);
        var val = DSF.getElementMapValueByKey("{META_ID}", $row);
        // 设置子表单行中的字段
        DSF.setElementValueByKey("{META_ID}", {"value": "值", "text": "文本"}, $row);
    });
}
```

### customN — 自定义按钮事件

`custom1`、`custom2`、`custom3` ... 对应表单上配置的自定义按钮。按钮代码在表单设计器中配置，函数名必须与按钮代码一致。

```javascript
function custom1() { /* 按钮1的逻辑 */ }
function custom2() { /* 按钮2的逻辑 */ }
function custom3() { /* 按钮3的逻辑 */ }
```

### beforeSave — 保存前校验（如需要）

表单保存前触发，返回 false 可阻止保存。

```javascript
function beforeSave() {
    var value = DSF.getElementValueByKey("{META_ID}");
    if (!value) {
        top.layuiError("请填写必填字段");
        return false;
    }
    return true;
}
```

## 列表 JS 中的固定模式

### layui.dataGridButton.{按钮名} — 列表行按钮

```javascript
layui.dataGridButton.openFormByTask = function(elem, data, datagrid, rowPkMetaKey, funParams) {
    var pk = data['{META_ID}'];           // 从行数据中取值
    var moduleId = '{moduleId}';
    var nodeId = 67;                       // 表单节点：67=编辑, 71=查看 等
    var url = DSF.getURLRoot() + 'ctrl/formControl/sysForm?moduleId=' + moduleId
        + '&nodeId=' + nodeId + '&pk=' + pk + '&validateByList=1&listId={listId}';
    simpleWin(this, {"url": url + "&t=" + new Date().getTime(), "name": "窗口标题"});
};
```

## 前端常用 DSF API

### 字段取值

| API | 说明 | 返回值 |
|-----|------|--------|
| `DSF.getElementValueByKey("{META_ID}")` | 获取字段的 value | String |
| `DSF.getElementMapValueByKey("{META_ID}")` | 获取字段的 {value, text} 对象 | Object |
| `DSF.getElementMapValueByKey("{META_ID}", $row)` | 获取子表单行中的字段 | Object |
| `DSF.getURLParam("pk")` | 获取 URL 参数 | String |

### 字段赋值

| API | 说明 |
|-----|------|
| `DSF.setElementValueByKey("{META_ID}", {"value": "v", "text": "t"})` | 设置字段值 |
| `DSF.setElementValueByKey("{META_ID}", {"value": "v", "text": "t"}, $row)` | 设置子表单行中的字段 |

### 表单操作

| API | 说明 |
|-----|------|
| `xform.saveForm({enableTip: false}, callback)` | 保存表单（不弹提示） |
| `xform.close({confirm: false})` | 关闭表单（不弹确认框） |
| `DSF.SaveStatus.Success` | 保存成功状态常量 |
| `DSF.SaveStatus.VerifyError` | 验证失败状态常量 |
| `DSF.getURLRoot()` | 获取项目根路径（如 `/DreamWeb/`） |

### 弹窗提示

| API | 说明 |
|-----|------|
| `top.layuiOk("消息", callback)` | 成功提示 |
| `top.layuiError("消息")` | 错误提示 |
| `layer.load()` | 显示加载遮罩 |
| `layer.closeAll('loading')` | 关闭加载遮罩 |
| `layer.confirm('消息', {btn:['确定','取消']}, fn)` | 确认弹窗 |

### 打开窗口

| API | 说明 |
|-----|------|
| `openWinView(this, {"url": url})` | 打开弹窗（有遮罩） |
| `simpleWin(this, {"url": url, "name": "标题"})` | 打开新标签页 |
