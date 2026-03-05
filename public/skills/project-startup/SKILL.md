---
name: project-startup
description: 中小企业服务平台本地环境搭建与启动。包含 JDK/Maven/Redis 前置环境、Nacos 配置修改、Maven 构建、服务启动顺序。当用户需要搭建本地开发环境或启动服务时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# 启动指南

本文档是 AI 执行本地环境搭建的操作手册。按顺序执行即可。

**绝对不要修改源码。** 只改配置。版本不匹配找同事要正确版本。

## 工作流

```
前置环境 → Maven 配置 → Nacos 启动与配置 → 前端部署 → 构建 → 启动服务 → 验证
```

详细步骤见 [references/startup-steps.md](references/startup-steps.md)。

## 快速参考

| 步骤 | 关键命令/操作 |
|------|--------------|
| JDK 8 | `brew install --cask zulu8`，确认 `java -version` 输出 1.8.x |
| Maven | `brew install maven`，复制 `dsfa.xml` 到 `~/.m2/settings.xml` |
| Redis | `brew install redis && brew services start redis` |
| Nacos | `sh nacos-dev/bin/startup.sh -m standalone` |
| 构建 | `mvn clean package -DskipTests -f {pom路径}` |
| 启动 | Nacos → Platform → Gateway → KMS + Policy |

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| BindException: Can't assign requested address | Nacos 中 dubbo.protocol.host 是公司内网 IP | 改成 `127.0.0.1` |
| KMS 编译失败 WritingSupport 找不到方法 | infra API 版本不匹配 | 找同事拿匹配的 infra 源码，不改代码 |
| Policy 编译失败找不到 parent POM | 私服缺少 dsfa-kms-starter POM | `mvn install:install-file` 安装本地 POM |
| 启动超时 | 数据库连不上/Redis 密码不对 | 检查 VPN、Redis 密码 |
