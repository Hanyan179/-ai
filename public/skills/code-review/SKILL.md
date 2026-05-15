---
name: code-review
description: DSFA 平台代码审查规则。检查新增或修改的 Java 代码是否符合项目编码规范、DDD 分层约束、JFinal ORM 使用规范、安全要求。当需要审查代码、检查代码质量时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# 代码审查规则

## 审查清单

### 分层约束
- [ ] domain 层不依赖 infrastructure 层
- [ ] Controller 只调用 Service，不直接调用 Repository
- [ ] Repository 接口在 domain，实现在 infrastructure
- [ ] DO 在 infrastructure，BO/DTO/VO 在 domain

### ORM 使用
- [ ] SQL 使用 `#para()` 参数化，无字符串拼接（防注入）
- [ ] 所有查询包含 `ds_deleted = '0'` 软删除条件
- [ ] SQL 兼容 MySQL/KingBase8/达梦，无 MySQL 特有语法
- [ ] SQL_KEY 与 SQL 模板的 `#namespace` 一致
- [ ] 模糊查询用 `concat(concat('%', #para(xxx)), '%')`

### 编码规范
- [ ] 注入用 `@Resource`（非 `@Autowired`）
- [ ] Controller 返回 `Result.me().success()` / `.error()`
- [ ] Controller 继承 `BaseController`
- [ ] 列名使用 Constants 常量，不硬编码字符串
- [ ] BO 模式与所在模块一致（Policy 用 @Data，KMS 用 ProductBaseModel）

### 安全
- [ ] 需要登录的接口没有加 `@AuthIgnore`
- [ ] 公开接口明确加了 `@AuthIgnore`
- [ ] 敏感操作有权限校验
- [ ] 用户输入已做校验（长度、格式、范围）
- [ ] 文件上传有类型和大小限制
- [ ] 日志中不输出敏感信息（密码、Token、身份证号）
- [ ] 批量操作有数量上限，防止资源耗尽
- [ ] 导出接口有分页或数量限制

### 命名
- [ ] 主键命名：`表名_id`
- [ ] 平台字段前缀 `ds_`，业务字段前缀 `p_`，分类字段前缀 `cm_`
- [ ] 包路径与同模块已有代码一致
