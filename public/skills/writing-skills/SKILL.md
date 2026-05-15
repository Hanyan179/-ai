---
name: writing-skills
description: Agent Skills 规范编写指南。基于 agentskills.io 规范，当需要创建新的 skill、优化现有 skill、或了解 skill 编写规范时使用。
metadata:
  author: dsfa-team
  version: "1.0"
---

# Skills 编写指南

基于 [Agent Skills 规范](https://agentskills.io/specification)，适配本项目。

## 目录结构

每个 skill 是一个独立文件夹，包含 `SKILL.md` 主文件：

```
.kiro/skills/
├── skill-name/
│   ├── SKILL.md              # 必须，主文件
│   ├── references/            # 可选，详细参考文档
│   │   └── REFERENCE.md
│   ├── scripts/               # 可选，可执行脚本
│   └── assets/                # 可选，静态资源
```

## SKILL.md 格式

```yaml
---
name: skill-name          # 必须，kebab-case，与文件夹名一致
description: 描述功能和使用时机  # 必须，最多 1024 字符
license: Apache-2.0       # 可选
compatibility: 环境要求    # 可选，最多 500 字符
metadata:                  # 可选
  author: example-org
  version: "1.0"
---

Markdown 正文（skill 指令内容）
```

### name 规则
- 1-64 字符，仅小写字母、数字、连字符
- 不能以连字符开头或结尾
- 不能有连续连字符
- 必须与父目录名一致

### description 规则
- 1-1024 字符
- 描述功能 + 使用时机
- 包含关键词便于匹配

好的示例：`为数据库表创建完整的 DDD 分层 Java 代码。当用户需要新建实体、映射数据库表时使用。`

差的示例：`帮助处理代码`

## 渐进式披露

| 层级 | 加载时机 | Token 预算 |
|------|----------|-----------|
| name + description | 启动时加载所有 skill | ~100 tokens |
| SKILL.md 正文 | skill 被激活时 | < 5000 tokens |
| references/ 文件 | 按需加载 | 不限 |

- 主文件控制在 500 行以内
- 详细内容放 `references/` 子目录
- 文件引用只做一级深度，不嵌套

## 编写原则

1. 只写 AI 不知道的信息，不解释常识
2. 脆弱操作给精确指令，灵活任务给方向性指导
3. 工作流型 skill 提供清晰步骤 + checklist
4. 包含验证/反馈循环（做完 → 检查 → 修复）

## 迭代方法

1. 先不用 skill 完成一次任务，记录反复提供的上下文
2. 把这些上下文提取为 skill
3. 用 skill 再做一次类似任务，观察效果
4. 根据实际使用调整内容
