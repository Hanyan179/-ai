---
name: feature-workflow
description: 功能开发完整工作流。需求文档确认后，从 Git 分支创建到代码开发、自检、提交、推送、创建 MR 的全流程。当用户确认需求文档后开始开发时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# 功能开发工作流

前置条件：需求文档已创建并经用户确认（参考 `requirement-analysis`）。

## 工作流

```
创建 Git 分支 → 按需求文档开发 → 自检 → 提交 → 推送 → 创建 MR → 更新文档 → 通知用户
```

## 第一步：创建 Git 分支

```bash
git -C {服务目录} checkout dev && git -C {服务目录} pull origin dev
git -C {服务目录} checkout -b feature/{功能简述}_{YYYYMMDD}
```

Git 用户信息从 `.kiro/user-config.md` 获取。

## 第二步：开发

按需求文档"开发任务"中的顺序：Constants → DO → BO → SQL模板 → Repository → Service → Controller

- 遵循 `dsfa-framework-rules` 编码规范
- 新建实体参考 `creating-entity`
- 每完成一个文件确认编译无错误
- 不修改已有源码，除非需求文档明确标注

## 第三步：自检

- [ ] 需求文档每一项都已完成
- [ ] 包路径正确，Constants 与数据库一致
- [ ] SQL namespace 与 SQL_KEY 对应
- [ ] 所有查询包含 `ds_deleted = '0'`
- [ ] Controller 路径与接口设计一致
- [ ] `mvn compile -DskipTests` 通过

## 第四步：提交推送

```bash
git -C {服务目录} add .
git -C {服务目录} commit -m "{类型}：{描述}"
git -C {服务目录} push origin feature/{功能简述}_{日期}
```

提交类型：新增 / 修改 / 优化 / 修复 / 删除

## 第五步：创建 Merge Request

推送完成后，通过 GitLab API 创建 MR。详见 [references/mr-template.md](references/mr-template.md)。

如果未配置 GitLab Token，告知用户手动创建 MR 并提供 MR 信息。

## 第六步：通知用户

更新需求文档状态为"已完成"，告知用户：
- 分支名
- MR 链接（如已创建）或手动创建 MR 的信息
- 合并目标：`dev`

## 异常处理

- 需求理解有误 → 停下来，更新文档标注疑问，告知用户
- 编译失败 → 检查 infra 是否 install、包路径和 import 是否正确，不改已有代码
- 需求变更 → 先更新需求文档，用户确认后继续
