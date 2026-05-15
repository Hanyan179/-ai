# Merge Request 模板与创建方式

## MR 信息

```
标题：{提交类型}：{功能简述}
源分支：feature/{功能简述}_{日期}
目标分支：dev
描述：使用下方模板
```

## MR 描述模板

```markdown
## 变更说明
{一句话描述本次变更}

## 变更类型
- [ ] 新增功能
- [ ] 修改功能
- [ ] Bug 修复
- [ ] 优化/重构

## 变更内容
{列出新增/修改的文件及其作用}

## 自检清单
- [ ] 编译通过（`mvn compile -DskipTests`）
- [ ] 不修改已有源码
- [ ] SQL 兼容多数据库
- [ ] 查询包含软删除条件
- [ ] 接口路径与设计一致

## 关联需求
{需求文档路径或链接}
```

## 通过 GitLab API 创建

需要在 `.kiro/user-config.md` 中配置 GitLab 地址、Private Token、项目 ID。

```bash
curl --request POST "https://{gitlab_host}/api/v4/projects/{project_id}/merge_requests" \
  --header "PRIVATE-TOKEN: {token}" \
  --header "Content-Type: application/json" \
  --data '{
    "source_branch": "feature/{功能简述}_{日期}",
    "target_branch": "dev",
    "title": "{提交类型}：{功能简述}",
    "description": "{MR 描述}",
    "remove_source_branch": true
  }'
```
