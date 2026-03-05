import { SkillInfo, ScenarioItem, ToolInfo, DemoOutput } from './types';

// ========== Skills Data ==========

export const SKILLS_DATA: SkillInfo[] = [
  {
    id: 'dsfa-framework-rules',
    name: 'dsfa-framework-rules',
    displayName: 'DSFA 框架编码规则',
    description: 'DSFA 平台框架编码规则。生成 Java 代码时必须遵循的 DDD 分层、JFinal ORM、BO/DO 转换、Controller/Service/Repository 编码规范。',
    category: 'dsfa',
    sourcePath: 'skills/dsfa-framework-rules/SKILL.md',
    references: ['references/orm-patterns.md'],
    content: `# DSFA 平台框架规则

基于 \`dsfa-platform-parent:6.3.0\`，所有业务模块必须遵循以下规则。

## DDD 分层结构

\`\`\`
dsfa-xxx-starter/              # 父 POM（packaging: pom）
├── dsfa-xxx-api/              # 对外 Feign/Dubbo 接口 + POJO
├── dsfa-xxx-adapter/          # Controller + DTO + MetaExt 扩展
├── dsfa-xxx-application/      # 应用层编排（可选，复杂业务场景使用）
├── dsfa-xxx-domain/           # 领域层：BO + Service接口/实现 + Repository接口 + Constants + Utils + Enums
├── dsfa-xxx-infrastructure/   # 基础设施层：Repository实现 + DO + SQL模板
└── dsfa-xxx-bootstrap/        # 启动模块：Application类 + bootstrap.yml
\`\`\`

依赖方向：\`bootstrap → adapter + infrastructure → domain\`（domain 不依赖 infrastructure）

## ORM：JFinal ActiveRecord（非 MyBatis）

详细的 DO 定义、SQL 模板语法、Repository 实现模式见 references/orm-patterns.md

## BO 模式选择

项目中存在两种 BO 模式，**必须跟随所在模块的现有模式**：

- Policy 模块：\`@Data\` Lombok BO，Repository 中手动 Record → BO 映射
- KMS 模块：\`ProductBaseModel\` BO，使用 \`ProductModelUtil.convertDO2BO()\` 转换

## Controller 规范

\`\`\`java
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
\`\`\`

- 继承 \`BaseController\`（\`com.dsfa.platform.starter.web.base\`）
- 返回 \`Result.me().success()\` / \`.success(data)\` / \`.error()\` / \`.error("消息")\`
- 注入用 \`@Resource\`，免登录加 \`@AuthIgnore\`

## Service 规范

\`\`\`java
// domain/service/bizName/IXxxService.java
public interface IXxxService { ... }

// domain/service/bizName/impl/XxxServiceImpl.java
@Service
public class XxxServiceImpl implements IXxxService {
    @Resource
    IXxxRepository xxxRepository;
}
\`\`\`

## DTO / VO / BO 分工

| 类型 | 位置 | 用途 |
|------|------|------|
| DTO | domain/model/bizName/ | 请求参数（查询条件、分页参数），\`@Data\` |
| VO | domain/model/bizName/ | 响应/更新参数，\`@Data @Builder\` |
| BO | domain/model/bizName/ | 业务对象，对应数据库表，\`@Data @Builder @TableBind\` |

## MetaExt 扩展（表单钩子）

adapter 层的 \`ext/\` 目录下，用于拦截平台表单的保存/删除等操作。

## Constants 规范

\`\`\`java
public class XxxConstants {
    public static final String TABLE_NAME = "xxx_table_name";
    public static class Column {
        public static final String ID = "xxx_table_name_id";  // 主键 = 表名_id
    }
}
\`\`\`

## 平台 SDK 常用类

| 类 | 包 | 用途 |
|---|---|---|
| \`Result\` | \`com.dsfa.platform.sdk.common\` | 统一返回 |
| \`JSONObject/JSONArray\` | \`com.dsfa.platform.sdk.json\` | JSON 操作 |
| \`BaseController\` | \`com.dsfa.platform.starter.web.base\` | Controller 基类 |
| \`DsfaBaseModel<T>\` | \`com.dsfa.platform.starter.meta.base\` | DO 基类 |
| \`UserInfoHolder\` | \`com.dsfa.platform.starter.meta.session\` | 用户上下文 |
| \`Db/Kv/SqlPara/Record\` | \`com.dsfa.platform.starter.db.jfinal.*\` | 数据库操作 |
| \`@TableBind\` | \`com.dsfa.platform.starter.db.jfinal.tablebind\` | 表绑定注解 |
| \`MetaExt/MetaAspect\` | \`com.dsfa.platform.starter.meta.core.ext\` | 表单扩展 |`
  },
  {
    id: 'creating-entity',
    name: 'creating-entity',
    displayName: '实体创建工作流',
    description: '为数据库表创建完整的 DDD 分层 Java 代码（Constants → DO → BO → SQL模板 → Repository → Service → Controller）。',
    category: 'dsfa',
    sourcePath: 'skills/creating-entity/SKILL.md',
    content: `# 创建实体类

为一张数据库表生成完整的 DDD 分层代码。执行前务必加载 \`dsfa-framework-rules\`。

## 工作流

\`\`\`
查表结构 → 看同模块代码 → Constants → DO → BO → SQL模板 → Repository接口+实现 → Service接口+实现 → Controller
\`\`\`

## 第一步：查数据库表结构

\`\`\`sql
SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT
FROM information_schema.COLUMNS
WHERE TABLE_NAME = '表名' ORDER BY ORDINAL_POSITION;
\`\`\`

## 第二步：查看同模块已有代码

确认当前模块使用的 BO 模式（Policy 用 @Data，KMS 用 ProductBaseModel），确认包路径和命名规范。

## 第三步：按顺序创建文件

1. **Constants**（domain 层）— 表名、主键、字段常量
2. **DO**（infrastructure 层）— 继承 DsfaBaseModel，@TableBind 绑定
3. **BO**（domain 层）— 跟随模块现有模式
4. **SQL 模板**（infrastructure 层）— namespace 与 SQL_KEY 对应
5. **Repository** 接口（domain）+ 实现（infrastructure）
6. **Service** 接口 + 实现（domain 层）
7. **Controller**（adapter 层）

## 完成检查

- Constants 表名、主键、所有字段常量已定义
- DO 的 @TableBind 正确，DAO 静态实例存在
- BO 跟随模块现有模式
- SQL 模板 namespace 与 SQL_KEY 对应，查询包含 ds_deleted = '0'
- Repository 接口在 domain，实现在 infrastructure
- 包路径与同模块已有代码一致`
  },
  {
    id: 'project-overview',
    name: 'project-overview',
    displayName: '项目架构总览',
    description: '中小企业服务平台项目架构、技术栈、服务清单、依赖关系、Skills 导航索引。AI 在任何任务开始前自动加载。',
    category: 'dsfa',
    sourcePath: 'skills/project-overview/SKILL.md',
    content: `# 中小企业服务平台

## 核心原则

**绝对不要修改已有源码。** 只改配置或新增代码。

## 项目架构

\`\`\`
中小企业代码/
├── 后端代码/
│   ├── dsfa-infra-starter/        # 基础组件库（所有服务依赖）
│   ├── dsfa-gateway/              # API 网关（Spring Cloud Gateway）
│   ├── dsfa-platform-starter/     # 平台核心（用户/权限/基础服务）
│   ├── dsfa-kms-starter/          # 知识管理（DDD 多模块）
│   └── dsfa-policy-starter/       # 政策服务（DDD 多模块）— 主要业务开发
├── 中小企业-前端/                  # 已构建静态文件
└── nacos/nacos-dev/               # 本地 Nacos（内嵌 Derby）
\`\`\`

## 技术栈

- JDK 8（必须）、Spring Boot 2.x + Spring Cloud Alibaba
- Nacos（配置中心 + 服务发现）、Dubbo（服务间 RPC）
- JFinal ActiveRecord（ORM，非 MyBatis）
- MySQL / KingBase8 / 达梦（多数据库兼容）
- Redis、Elasticsearch、RocketMQ

## 服务清单

| 服务 | 端口 | JAR 路径 |
|------|------|----------|
| Nacos | 8848 | nacos-dev/bin/startup.sh |
| Platform | 20001 | target/dsfa-platform-starter.jar |
| Gateway | 20002 | target/dsfa-gateway-starter.jar |
| KMS | 19012 | dsfa-kms-bootstrap/target/dsfa-kms-starter.jar |
| Policy | 19021 | dsfa-policy-bootstrap/target/dsfa-policy-starter.jar |

## 启动顺序

\`\`\`
Nacos → Platform → Gateway → KMS + Policy（可并行）
\`\`\`

## Skills 导航

| Skill | 用途 | 何时使用 |
|-------|------|----------|
| dsfa-framework-rules | 框架编码规则 | 编写任何业务代码时 |
| creating-entity | 实体创建工作流 | 为数据库表创建 Java 实体全套代码 |
| requirement-analysis | 需求分析 | 用户提出新功能需求 |
| feature-workflow | 开发工作流 | 需求确认后，Git 分支 → 开发 → 提交 → MR |
| project-startup | 启动指南 | 搭建本地开发环境 |
| code-review | 代码审查 | 检查代码是否符合项目规范 |
| writing-skills | Skills 编写 | 创建或优化 skill 文件 |`
  },
  {
    id: 'project-startup',
    name: 'project-startup',
    displayName: '项目启动指南',
    description: '中小企业服务平台本地环境搭建与启动。包含前置环境、Nacos 配置、Maven 构建、服务启动顺序。',
    category: 'dsfa',
    sourcePath: 'skills/project-startup/SKILL.md',
    references: ['references/startup-steps.md'],
    content: `# 启动指南

本文档是 AI 执行本地环境搭建的操作手册。按顺序执行即可。

**绝对不要修改源码。** 只改配置。

## 工作流

\`\`\`
前置环境 → Maven 配置 → Nacos 启动与配置 → 前端部署 → 构建 → 启动服务 → 验证
\`\`\`

## 快速参考

| 步骤 | 关键命令/操作 |
|------|--------------|
| JDK 8 | \`brew install --cask zulu8\`，确认 java -version 输出 1.8.x |
| Maven | \`brew install maven\`，复制 dsfa.xml 到 ~/.m2/settings.xml |
| Redis | \`brew install redis && brew services start redis\` |
| Nacos | \`sh nacos-dev/bin/startup.sh -m standalone\` |
| 构建 | \`mvn clean package -DskipTests -f {pom路径}\` |
| 启动 | Nacos → Platform → Gateway → KMS + Policy |

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| BindException: Can't assign requested address | Nacos 中 dubbo.protocol.host 是公司内网 IP | 改成 127.0.0.1 |
| KMS 编译失败 WritingSupport 找不到方法 | infra API 版本不匹配 | 找同事拿匹配的 infra 源码 |
| Policy 编译失败找不到 parent POM | 私服缺少 POM | mvn install:install-file 安装本地 POM |
| 启动超时 | 数据库连不上/Redis 密码不对 | 检查 VPN、Redis 密码 |`
  },
  {
    id: 'requirement-analysis',
    name: 'requirement-analysis',
    displayName: '需求分析',
    description: '用户需求分析与需求文档编写。创建需求定义文档，明确边界、任务拆解、Git 分支规划。在写代码之前必须完成。',
    category: 'dsfa',
    sourcePath: 'skills/requirement-analysis/SKILL.md',
    content: `# 需求分析

用户提需求时，第一件事是创建需求文档，不是写代码。

## 工作流

\`\`\`
用户提需求 → 理解需求 → 调研现有代码 → 创建需求文档 → 用户确认 → 进入开发
\`\`\`

## 第一步：理解需求

向用户确认：功能描述、所属模块（policy/kms/platform）、新增还是修改、有无参考功能、是否涉及前端。

## 第二步：调研现有代码

- 涉及已有表 → 查看 Constants/DO/BO/Repository
- 有参考功能 → 读取 Controller → Service → Repository 全链路
- 涉及新表 → 查数据库表结构
- 确认包路径、命名规范、编码模式

## 第三步：创建需求文档

位置：\`docs/requirements/{日期}-{功能简述}.md\`

模板结构：

\`\`\`markdown
# {功能名称}

> 创建时间：{YYYY-MM-DD} | 所属模块：dsfa-{module}-starter | 状态：待确认

## 一、需求描述
## 二、功能边界（做什么 / 不做什么）
## 三、数据设计（新建表 / 涉及已有表）
## 四、接口设计（方法、路径、参数、返回）
## 五、开发任务（文件清单 + 开发顺序）
## 六、Git 规划
## 七、注意事项
\`\`\`

## 原则

1. **文档先行** — 没有需求文档不写代码
2. **边界清晰** — "做什么"和"不做什么"同样重要
3. **不假设** — 不确定就问用户
4. **不过度设计** — 只做用户要求的`
  },
  {
    id: 'feature-workflow',
    name: 'feature-workflow',
    displayName: '功能开发工作流',
    description: '从 Git 分支创建到代码开发、自检、提交、推送、创建 MR 的全流程。',
    category: 'dsfa',
    sourcePath: 'skills/feature-workflow/SKILL.md',
    references: ['references/mr-template.md'],
    content: `# 功能开发工作流

前置条件：需求文档已创建并经用户确认。

## 工作流

\`\`\`
创建 Git 分支 → 按需求文档开发 → 自检 → 提交 → 推送 → 创建 MR → 更新文档 → 通知用户
\`\`\`

## 第一步：创建 Git 分支

\`\`\`bash
git -C {服务目录} checkout dev && git -C {服务目录} pull origin dev
git -C {服务目录} checkout -b feature/{功能简述}_{YYYYMMDD}
\`\`\`

## 第二步：开发

按需求文档"开发任务"中的顺序：Constants → DO → BO → SQL模板 → Repository → Service → Controller

- 遵循 dsfa-framework-rules 编码规范
- 新建实体参考 creating-entity
- 每完成一个文件确认编译无错误
- 不修改已有源码

## 第三步：自检

- 需求文档每一项都已完成
- 包路径正确，Constants 与数据库一致
- SQL namespace 与 SQL_KEY 对应
- 所有查询包含 ds_deleted = '0'
- Controller 路径与接口设计一致
- \`mvn compile -DskipTests\` 通过

## 第四步：提交推送

\`\`\`bash
git -C {服务目录} add .
git -C {服务目录} commit -m "{类型}：{描述}"
git -C {服务目录} push origin feature/{功能简述}_{日期}
\`\`\`

## 第五步：创建 Merge Request

推送完成后，通过 GitLab API 创建 MR。

## 异常处理

- 需求理解有误 → 停下来，更新文档标注疑问
- 编译失败 → 检查 infra 是否 install、包路径和 import
- 需求变更 → 先更新需求文档，用户确认后继续`
  },
  {
    id: 'code-review',
    name: 'code-review',
    displayName: '代码审查规则',
    description: '检查新增或修改的 Java 代码是否符合项目编码规范、DDD 分层约束、JFinal ORM 使用规范、安全要求。',
    category: 'dsfa',
    sourcePath: 'skills/code-review/SKILL.md',
    content: `# 代码审查规则

## 审查清单

### 分层约束
- domain 层不依赖 infrastructure 层
- Controller 只调用 Service，不直接调用 Repository
- Repository 接口在 domain，实现在 infrastructure
- DO 在 infrastructure，BO/DTO/VO 在 domain

### ORM 使用
- SQL 使用 \`#para()\` 参数化，无字符串拼接（防注入）
- 所有查询包含 \`ds_deleted = '0'\` 软删除条件
- SQL 兼容 MySQL/KingBase8/达梦，无 MySQL 特有语法
- SQL_KEY 与 SQL 模板的 \`#namespace\` 一致
- 模糊查询用 \`concat(concat('%', #para(xxx)), '%')\`

### 编码规范
- 注入用 \`@Resource\`（非 \`@Autowired\`）
- Controller 返回 \`Result.me().success()\` / \`.error()\`
- Controller 继承 \`BaseController\`
- 列名使用 Constants 常量，不硬编码字符串
- BO 模式与所在模块一致

### 安全
- 需要登录的接口没有加 \`@AuthIgnore\`
- 公开接口明确加了 \`@AuthIgnore\`
- 敏感操作有权限校验
- 用户输入已做校验（长度、格式、范围）
- 文件上传有类型和大小限制
- 日志中不输出敏感信息
- 批量操作有数量上限，防止资源耗尽
- 导出接口有分页或数量限制

### 命名
- 主键命名：\`表名_id\`
- 平台字段前缀 \`ds_\`，业务字段前缀 \`p_\`，分类字段前缀 \`cm_\`
- 包路径与同模块已有代码一致`
  },
  {
    id: 'writing-skills',
    name: 'writing-skills',
    displayName: 'Skills 编写指南',
    description: '基于 Agent Skills 规范，创建新的 skill、优化现有 skill 的编写指南。',
    category: 'general',
    sourcePath: 'skills/writing-skills/SKILL.md',
    content: `# Skills 编写指南

基于 [Agent Skills 规范](https://agentskills.io/specification)，适配本项目。

## 目录结构

每个 skill 是一个独立文件夹，包含 SKILL.md 主文件：

\`\`\`
.kiro/skills/
├── skill-name/
│   ├── SKILL.md              # 必须，主文件
│   ├── references/            # 可选，详细参考文档
│   │   └── REFERENCE.md
│   ├── scripts/               # 可选，可执行脚本
│   └── assets/                # 可选，静态资源
\`\`\`

## SKILL.md 格式

\`\`\`yaml
---
name: skill-name          # 必须，kebab-case，与文件夹名一致
description: 描述功能和使用时机  # 必须，最多 1024 字符
license: Apache-2.0       # 可选
compatibility: 环境要求    # 可选
metadata:                  # 可选
  author: example-org
  version: "1.0"
---

Markdown 正文（skill 指令内容）
\`\`\`

## 渐进式披露

| 层级 | 加载时机 | Token 预算 |
|------|----------|-----------|
| name + description | 启动时加载所有 skill | ~100 tokens |
| SKILL.md 正文 | skill 被激活时 | < 5000 tokens |
| references/ 文件 | 按需加载 | 不限 |

- 主文件控制在 500 行以内
- 详细内容放 references/ 子目录
- 文件引用只做一级深度，不嵌套

## 编写原则

1. **只写 AI 不知道的信息**，不解释常识
2. **脆弱操作给精确指令**，灵活任务给方向性指导
3. **工作流型 skill** 提供清晰步骤 + checklist
4. 包含验证/反馈循环（做完 → 检查 → 修复）

## 迭代方法

1. 先不用 skill 完成一次任务，记录反复提供的上下文
2. 把这些上下文提取为 skill
3. 用 skill 再做一次类似任务，观察效果
4. 根据实际使用调整内容`
  },
  {
    id: 'p2340-database-query',
    name: 'p2340-database-query',
    displayName: 'P2340 模块数据探查',
    description: '通过查询数据库获取模块的完整开发要素（表单、列表、元数据字段等），生成模块信息文档。',
    category: 'p2340',
    sourcePath: 'p2340-database-query/skill.md',
    references: ['reference/module-info-queries.md', 'reference/module-doc-template.md', 'reference/conventions.md', 'reference/query-patterns.md', 'reference/modules.md'],
    content: `# P2340 模块数据探查

核心价值：将用户的文字需求（如"是否有效"）映射到开发所需的元数据编号（如 \`C-OFFICESUPPLIES-CATEGORY-0003\`）、表单ID、列表ID 等。

## 数据库连接

- MCP Server: \`p2340-database\`
- 工具: \`mcp_p2340_database_query\`（参数: sql）
- 数据库: KingbaseES（兼容 PostgreSQL）
- Schema: \`dreamit_dj\`
- 模式: 只读查询

## 核心工作流程

### 第一步：获取模块基本信息

用户提供 module_id 后，查询 SQL 模板，依次获取：

1. **模块基本信息**（G_MODULE）→ 模块名称、编号、类型
2. **模块表单列表**（G_FORM）→ 表单ID、名称、类型
3. **模块列表清单**（G_LIST）→ 列表ID、名称、类型
4. **模块元数据字段**（G_MODULE_METADATA）→ META_ID、字段名、业务表名

### 第二步：生成模块信息文档

将查询结果整理为结构化的模块信息文档，包含所有开发所需的 ID 和映射关系。

### 第三步：需求映射

根据用户的文字需求，在元数据中定位对应的 META_ID，为 JS 开发、表单操作等提供准确的编号。

## 包含参考文档

- 7 个 SQL 查询模板
- 数据库约定与注意事项
- 输出文档标准模板
- 通用查询模板
- 已知模块清单`
  },
  {
    id: 'p2340-form-dev',
    name: 'p2340-form-dev',
    displayName: 'P2340 表单功能开发',
    description: '覆盖表单页面的完整开发流程：从获取模块信息、定位/创建文件，到编写前端 JS 和后端 Java 代码。',
    category: 'p2340',
    sourcePath: 'p2340-form-dev/skill.md',
    references: ['reference/form-events.md', 'reference/code-templates.md', 'reference/backend-rules.md', 'reference/file-path-rules.md', 'reference/module-info-flow.md'],
    content: `# P2340 表单功能开发

## 完整开发流程

### 第一步：收集信息

用户需求通常是笼统的文字描述。需要确认：

1. **目标表单/列表**：需要 form_id、list_id 或 module_id（至少一个）
2. **操作类型**：自定义按钮？表单初始化？字段联动？列表按钮？
3. **业务逻辑**：点击后做什么？更新哪张表？哪些字段？

### 第二步：获取模块信息

使用 \`p2340-database-query\` skill 查询模块完整信息。

输出：模块名称、所有表单ID、所有列表ID、元数据字段（META_ID ↔ 字段名映射）、业务数据表名。

### 第三步：定位/创建文件

检查清单：
- 前端 JS: \`src/main/webapp/p2340/{moduleId}/js/{formId或listId}.js\`
- 后端 Controller: \`module_{moduleId}/controller/\`
- 后端 Service 接口 + 实现: \`module_{moduleId}/service/\`
- Entity（如需要）: \`module_{moduleId}/entity/\`

### 第四步：编写代码

包含 **9 种代码模板**：

1. 保存表单 + 调用后端接口
2. 确认弹窗 + 保存 + 调接口
3. 不保存直接调接口
4. 打开另一个列表弹窗
5. formReady：URL 参数填充字段
6. formReady：Ajax 获取数据填充
7. formReady：遍历子表单行设值
8. 列表按钮：根据状态打开不同表单节点
9. 列表按钮：后端动态决定表单节点

## 参考文档

- form-events.md — 表单固定事件名规范
- code-templates.md — 前端代码模板
- backend-rules.md — 后端开发规则
- file-path-rules.md — 文件路径命名规则
- module-info-flow.md — 模块信息获取流程`
  }
];

// ========== Scenario Data ==========

export const SCENARIOS: ScenarioItem[] = [
  { name: '列表按钮打开表单', frequency: '高', patternFixed: true, aiCapable: true, status: 'done', statusLabel: '✅ 已定义模板' },
  { name: '表单自定义按钮（保存+调接口）', frequency: '高', patternFixed: true, aiCapable: true, status: 'done', statusLabel: '✅ 已定义模板' },
  { name: '列表数据过滤 / Excel 导出', frequency: '高', patternFixed: true, aiCapable: true, status: 'done', statusLabel: '✅ 已定义模板' },
  { name: '表单初始化填充字段', frequency: '中', patternFixed: true, aiCapable: true, status: 'done', statusLabel: '✅ 已定义模板' },
  { name: '多表关联查询 / 复杂 SQL', frequency: '中', patternFixed: true, aiCapable: true, status: 'next', statusLabel: '🔜 可扩展' },
  { name: 'Excel 导入', frequency: '中', patternFixed: true, aiCapable: true, status: 'next', statusLabel: '🔜 下一步' },
  { name: '数据源接口开发', frequency: '中', patternFixed: true, aiCapable: true, status: 'next', statusLabel: '🔜 下一步' },
  { name: '工作流节点开发', frequency: '低', patternFixed: false, aiCapable: false, status: 'no', statusLabel: '❌ 暂不覆盖' },
  { name: '跨模块复杂业务', frequency: '低', patternFixed: false, aiCapable: false, status: 'no', statusLabel: '❌ 暂不覆盖' },
];

// ========== Tool Comparison ==========

export const TOOLS: ToolInfo[] = [
  { name: 'Trae', vendor: '字节跳动', free: '目前免费', paid: '暂未公布', note: '国内友好，内置 Skills 机制' },
  { name: 'Kiro', vendor: 'AWS', free: '有免费额度', paid: '~$19/月', note: '本次 Demo 使用' },
  { name: 'Cursor', vendor: 'Anysphere', free: '有限免费', paid: '$20/月', note: '最成熟的 AI IDE' },
  { name: 'Windsurf', vendor: 'Codeium', free: '有限免费', paid: '$15/月', note: '性价比高' },
  { name: 'GitHub Copilot', vendor: 'Microsoft', free: '个人免费版', paid: '$10-19/月', note: 'VS Code 深度集成' },
];

// ========== Demo Output ==========

// DSFA 项目启动 Demo
export const DEMO_DSFA = {
  name: 'DSFA 中小企业项目启动',
  desc: '让 AI 理解并启动一个完全陌生的 DSFA 项目，验证 Skill 文档能否承载项目启动所需的知识。',
  result: '删除所有 AI 生成内容后，AI 基于 Skill 文档在一定时间内重新把项目跑起来。',
  skillsUsed: ['project-overview', 'project-startup', 'dsfa-framework-rules'],
};

// DreamWeb DJ 四个场景 — 数据来源：AI-Coding-Demo-Report 02/03/04
export const DEMO_OUTPUTS: DemoOutput[] = [
  {
    name: '列表按钮打开"其他信息"表单',
    desc: '列表自定义点击事件 limengshabi，打开党员其他信息表单',
    lines: 26,
    rounds: 2,
    myWords: [
      { round: 1, text: '列表 241011153457h9oDes5p3yoJZxsNBDg 需要增加一个自定义点击事件，点击后打开该党员的「其他信息」表单。' },
      { round: 2, text: '按钮名称是 limengshabi，表单 ID 你自己搜索去。' },
    ],
    skillsUsed: [
      'p2340-form-dev/skill.md',
      'p2340-form-dev/reference/form-events.md',
      'p2340-form-dev/reference/code-templates.md',
      'p2340-form-dev/reference/module-info-flow.md',
    ],
    aiSteps: [
      '通过列表 ID 推导 JS 文件路径：src/main/webapp/p1109/{moduleId}/js/{listId}.js',
      '读取同模块另一个列表 JS，发现已有 testopen 事件（打开"身份信息"表单），提取代码模式',
      '在模块 JS 目录下搜索「其他信息」关键字，定位表单 ID：220805101528EEqOGE3F0vJngSpREmQ',
      '复制 testopen 模式，替换事件名为 limengshabi、customXForm 为其他信息表单 ID、窗口标题为"其他信息"',
      '代码插入到已有 custom1、custom2 事件之后',
    ],
    files: [
      '241011153457h9oDes5p3yoJZxsNBDg.js（目标列表 JS，代码写入此文件）',
      '230111180941547caFAYhBEHB64wtll.js（同模块另一列表，参考 testopen 代码模式）',
      '220805101528EEqOGE3F0vJngSpREmQ.js（"其他信息"表单 JS，提取表单 ID）',
    ],
    note: '第一轮 AI 留了占位符（没主动搜索表单 ID、自行假设了按钮名），第二轮用户明确后一次完成。理想情况下应一轮搞定。',
  },
  {
    name: '列表过滤：只显示有身份证号的党员',
    desc: '后端列表组件 setCustomWhere 添加 CARDID 非空过滤',
    lines: 2,
    rounds: 4,
    myWords: [
      { round: 1, text: '241011153457h9oDes5p3yoJZxsNBDg 这个列表我需要进入的时候增加过滤条件。我只要有身份证的数据。没有值的过滤' },
      { round: 2, text: '自己搜索去。' },
      { round: 3, text: '如果是管理员的话也需要过滤的' },
    ],
    skillsUsed: [
      'p2340-form-dev/skill.md',
      'p2340-form-dev/reference/code-templates.md',
      'p2340-form-dev/reference/backend-rules.md',
    ],
    aiSteps: [
      '通过列表 ID 搜索代码，定位后端列表组件 List_241011153457h9oDes5p3yoJZxsNBDg.java',
      '搜索项目中「身份证」关键字，在 PartyOrgMemberEntity.java 中确认字段名为 CARDID',
      '分析 setCustomWhere 方法中的管理员判断逻辑：管理员走提前 return，非管理员追加组织范围条件',
      '将 CARDID IS NOT NULL and CARDID != \'\' 条件加在管理员判断之前，确保所有用户都生效',
    ],
    files: [
      'List_241011153457h9oDes5p3yoJZxsNBDg.java（修改 setCustomWhere 方法）',
      'PartyOrgMemberEntity.java（确认身份证字段名 CARDID）',
      'PartyOrgMemberDaoImpl.java（确认查询中表别名 x.CARDID）',
      'ProBaseCustomList.java（列表基类，确认方法签名）',
    ],
    note: '第一轮 AI 反问了身份证字段名（不该问），第二轮自己搜到了。第三轮用户发现管理员分支漏了过滤。理想情况下第一轮就应一次性搞定。',
  },
  {
    name: 'Excel 导出：组织身份证导出',
    desc: 'custom3 工具栏按钮 + Controller + Service + Excel 全链路',
    lines: 87,
    rounds: 1,
    myWords: [
      { round: 1, text: '列表 241011153457h9oDes5p3yoJZxsNBDg 需要增加一个自定义按钮3（custom3），功能是「身份证导出」，将列表中有身份证号的党员数据导出为 Excel 文件，导出文件名为「组织身份证」。' },
    ],
    skillsUsed: [
      'docs/05-excel-import-export.md',
      'docs/06-frontend-development.md',
    ],
    aiSteps: [
      '查阅 Excel 导出规范文档和前端按钮规范文档',
      '在 PartyOrgMemberController.java 中搜索已有导出方法（orgExport、memberExport 等），提取导出模式',
      '重点阅读 memberExport 完整实现：Controller → Service → DAO 查询 → HSSFWorkbook 构建 → response 输出流',
      '阅读 DAO 层 builderTemplateMemberImport()，了解主表 party_org_member、关联表 party_org_dept、可用字段',
      '确定修改范围：Service 接口 + 实现 + Controller + 前端 JS，共 4 个文件',
      '复制 memberExport 模式，简化为 4 列（序号、姓名、所在党支部、公民身份证号），去掉复杂合并单元格',
      '前端 JS 添加 custom3 工具栏按钮，通过 window.location.href 触发下载',
    ],
    files: [
      'PartyOrgMemberService.java（新增 cardIdExport 方法声明）',
      'PartyOrgMemberServiceImpl.java（新增 cardIdExport 实现，约 50 行）',
      'PartyOrgMemberController.java（新增 /cardIdExport 接口）',
      '241011153457h9oDes5p3yoJZxsNBDg.js（新增 custom3 按钮事件）',
    ],
    note: '一次性完成，无需额外交互。原因：需求明确、同模块已有 memberExport 可直接复制简化、数据源清晰。',
  },
  {
    name: '依赖管理：pom.xml 新增依赖',
    desc: 'pom.xml 新增 Apache POI 依赖',
    lines: 6,
    rounds: 1,
    myWords: [
      { round: 1, text: '项目缺少 Excel 导出的依赖，帮我加上。' },
    ],
    skillsUsed: ['dsfa-framework-rules'],
    aiSteps: [
      '检查现有 pom.xml 依赖',
      '确认需要 Apache POI 相关依赖',
      '在对应模块的 pom.xml 中添加依赖声明',
    ],
    files: ['pom.xml'],
  },
];

// ========== Skills Marketplace Links ==========

export const SKILLS_MARKETPLACES = [
  { name: 'Agent Skills Marketplace', url: 'https://agentskills.to', desc: '社区驱动的 Skills 集合，支持 Claude Code、Cursor、Codex CLI 等主流 AI 编程工具' },
];