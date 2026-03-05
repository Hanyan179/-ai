---
name: project-overview
description: 中小企业服务平台项目架构、技术栈、服务清单、依赖关系、Skills 导航索引。AI 在任何任务开始前自动加载，提供项目全局上下文和 Skills 快速匹配。
metadata:
  author: dsfa-team
  version: "1.0"
compatibility: Kiro IDE（inclusion: auto 每次对话自动加载）
---

# 中小企业服务平台

## 核心原则

**绝对不要修改已有源码。** 只改配置或新增代码。版本不匹配找同事要正确版本。

## 项目架构

```
中小企业代码/
├── 后端代码/
│   ├── dsfa-infra-starter/        # 基础组件库（所有服务依赖）
│   ├── dsfa-gateway/              # API 网关（Spring Cloud Gateway）
│   ├── dsfa-platform-starter/     # 平台核心（用户/权限/基础服务）
│   ├── dsfa-kms-starter/          # 知识管理（DDD 多模块）
│   └── dsfa-policy-starter/       # 政策服务（DDD 多模块）— 主要业务开发
├── 中小企业-前端/                  # 已构建静态文件，不需要 npm
└── nacos/nacos-dev/               # 本地 Nacos（内嵌 Derby）
```

## 技术栈

- JDK 8（必须）、Spring Boot 2.x + Spring Cloud Alibaba
- Nacos（配置中心 + 服务发现），命名空间 `policy`，分组 `product`
- Dubbo（服务间 RPC）、JFinal ActiveRecord（ORM，非 MyBatis）
- MySQL / KingBase8 / 达梦（多数据库兼容）
- Redis、Elasticsearch、RocketMQ
- 父 POM：`dsfa-platform-parent:6.3.0`

## 服务清单

| 服务 | 端口 | JAR 路径 |
|------|------|----------|
| Nacos | 8848 | nacos-dev/bin/startup.sh |
| Platform | 20001 | target/dsfa-platform-starter.jar |
| Gateway | 20002 | target/dsfa-gateway-starter.jar |
| KMS | 19012 | dsfa-kms-bootstrap/target/dsfa-kms-starter.jar |
| Policy | 19021 | dsfa-policy-bootstrap/target/dsfa-policy-starter.jar |

## 启动顺序

```
Nacos → Platform → Gateway → KMS + Policy（可并行）
```

## Gateway 路由

自动按 Nacos 服务名路由：`/platform/**` → 20001，`/kms/**` → 19012，`/policy/**` → 19021

## 外部依赖（需内网/VPN）

MySQL `10.1.3.144:3306`、ES `10.1.3.144:9200`、RocketMQ `10.1.3.144:9876`

## 本地环境限制

工作流服务（wf）、XXL-Job、部分 Dubbo provider 本地不可用，属正常现象。

## Skills 导航

| Skill | 用途 | 何时使用 |
|-------|------|----------|
| `dsfa-framework-rules` | 框架编码规则 | 编写任何业务代码时 |
| `creating-entity` | 实体创建工作流 | 为数据库表创建 Java 实体全套代码 |
| `requirement-analysis` | 需求分析 | 用户提出新功能需求，创建需求文档 |
| `feature-workflow` | 开发工作流 | 需求确认后，Git 分支 → 开发 → 提交 → 创建 MR |
| `project-startup` | 启动指南 | 搭建本地开发环境、启动服务 |
| `code-review` | 代码审查 | 检查代码是否符合项目规范 |
| `writing-skills` | Skills 编写 | 创建或优化 skill 文件 |

### 快速匹配

| 用户说 | 加载 |
|--------|------|
| "做一个新功能" / "实现 xxx 需求" | `requirement-analysis` → 确认后 `feature-workflow` + `dsfa-framework-rules` |
| "创建实体类" / "新建表的代码" | `creating-entity` + `dsfa-framework-rules` |
| "写一个接口" / "加个 Controller" | `dsfa-framework-rules` |
| "项目怎么启动" / "环境怎么搭" | `project-startup` |
| "审查一下代码" / "检查代码规范" | `code-review` |
| "创建 MR" / "提交合并请求" | `feature-workflow` |
| "怎么写 skill" | `writing-skills` |

## 用户配置

`.kiro/user-config.md` — 个人开发环境信息（Git 账号、GitLab Token、数据库密码等），AI 执行任务时读取。
