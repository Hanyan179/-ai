# 项目模块与数据表映射

## 模块清单

项目模块目录格式：`module_{moduleId}`，位于 `src/main/java/cn/dreamit/p2340/` 下。

| 模块名称 | moduleId | 包路径 |
|---------|----------|--------|
| 荣誉管理 | 250725144610R91jjSIpmaZT5esO7yE | cn.dreamit.p2340.module_250725144610R91jjSIpmaZT5esO7yE |
| 扶贫管理 | 250730151231msjtgymlWkO2z6QghtE | cn.dreamit.p2340.module_250730151231msjtgymlWkO2z6QghtE |
| 党组织活动统计 | 220803164631bvaM8zvZIGLl1CCEPou | cn.dreamit.p2340.module_253D220803164631bvaM8zvZIGLl1CCEPou |
| 绩效考核 | 260104101852dKgSETHlgPUprLYqigW | cn.dreamit.p2340.module_260104101852dKgSETHlgPUprLYqigW |

> 此清单需要随项目迭代持续更新。当发现新模块时，补充到此表中。

## 常见表前缀

| 前缀 | 业务域 | 说明 |
|------|--------|------|
| `party_` | 党建业务 | 党组织活动、党员管理等 |
| `oa_` | OA 办公 | 办公自动化相关 |
| `g_` | 系统基础 | 码表(g_code)、权限、配置等通用表 |
| `asset_` | 资产管理 | 资产卡片、折旧、借用等 |
| `dq_` | 党群 | 党群工作相关 |
| `oa_preson_party` | 党员信息 | 党员基本信息主表 |

## 模块探查流程

当拿到一个需求时，按以下步骤定位涉及的数据表：

1. 根据需求关键词搜索表名：
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'dreamit_dj' AND table_name LIKE '%关键词%'
   ```

2. 查看匹配表的字段结构，确认是否为目标表

3. 查看表中的数据样例，理解字段含义

4. 如果需求跨模块，重复以上步骤定位所有相关表

5. 整理表之间的关联关系（通常通过 ID / PID / FID 等外键字段关联）
