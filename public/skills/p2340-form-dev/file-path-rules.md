# 文件路径命名规则

## 核心规则

项目中所有文件路径都由三个 ID 决定：
- 产品ID（固定）: `p2340`
- 模块ID: 从 `G_MODULE.ID` 获取
- 表单ID / 列表ID: 从 `G_FORM.ID` 或 `G_LIST.ID` 获取

## 前端 JS 文件

### 表单 JS（针对某个表单页面的自定义逻辑）

```
src/main/webapp/{产品ID}/{模块ID}/js/{表单ID}.js
```

示例：
```
src/main/webapp/p2340/260104101852dKgSETHlgPUprLYqigW/js/260107101815WtRJXUSdUnVFuGqjkR4.js
```
- 产品ID: p2340
- 模块ID: 260104101852dKgSETHlgPUprLYqigW（考核管理）
- 表单ID: 260107101815WtRJXUSdUnVFuGqjkR4（个人抓基层党建工作述职报告）

### 列表 JS（针对某个列表页面的自定义逻辑）

```
src/main/webapp/{产品ID}/{模块ID}/js/{列表ID}.js
```

示例：
```
src/main/webapp/p2340/260104101852dKgSETHlgPUprLYqigW/js/260120102318Qa2UdBMzdHNtPM0WKSG.js
```
- 列表ID: 260120102318Qa2UdBMzdHNtPM0WKSG（党建责任制考核列表）

## 后端 Java 文件

### Controller

```
src/main/java/cn/dreamit/{产品ID}/module_{模块ID}/controller/{ControllerName}.java
```

包名: `cn.dreamit.{产品ID}.module_{模块ID}.controller`

### Service

```
src/main/java/cn/dreamit/{产品ID}/module_{模块ID}/service/{ServiceName}.java
src/main/java/cn/dreamit/{产品ID}/module_{模块ID}/service/impl/{ServiceImplName}.java
```

### Entity

```
src/main/java/cn/dreamit/{产品ID}/module_{模块ID}/entity/{EntityName}.java
```

### Component（列表组件）

```
src/main/java/cn/dreamit/{产品ID}/module_{模块ID}/component/List_{列表ID}.java
```

## 完整示例

模块"考核管理"（ID: `260104101852dKgSETHlgPUprLYqigW`）的文件结构：

```
src/main/webapp/p2340/260104101852dKgSETHlgPUprLYqigW/
└── js/
    ├── 2601061545545pZl8yHAwOUOfcj6J0d.js    ← 表单：考核任务发布
    ├── 260106163500ug5q2eJOFLi0CR9EIlX.js    ← 列表：考核任务发布
    ├── 260107101815WtRJXUSdUnVFuGqjkR4.js    ← 表单：个人抓基层党建工作述职报告
    └── ...

src/main/java/cn/dreamit/p2340/module_260104101852dKgSETHlgPUprLYqigW/
├── controller/
│   └── PerformEvaluateController.java
├── service/
│   ├── PerformEvaluateService.java
│   └── impl/PerformEvaluateServiceImpl.java
├── entity/
│   └── CResponAssessEntity.java
└── component/
    ├── List_260120102318Qa2UdBMzdHNtPM0WKSG.java
    └── List_260120181835X4kAxjobhHwXQ7MNEQz.java
```
