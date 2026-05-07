# 司法局案例推荐 MVP 场景

## 1. 场景调整

原 MVP 场景为：

```text
政务工作台首页
```

现在为了贴近实际落地，MVP 优先改为：

```text
司法局案例推荐
```

该场景仍属于“政务办公辅助推荐智能体”的辅助推荐能力，只是把第一版验证范围收敛到一个更具体、更容易验收的业务场景。

## 2. 场景定位

司法局工作人员在办理、审核、研判或检索某个事项时，需要系统根据当前输入、案件/事项上下文、用户身份权限和知识库内容，推荐相关案例。

推荐结果可以包括：

```text
相似案例
典型案例
参考裁判 / 调解 / 处罚思路
相关法律法规
相关政策文件
办理指引
文书模板
注意事项
```

MVP 阶段先聚焦：

```text
相似案例推荐
相关法规依据推荐
办理指引或注意事项推荐
```

## 3. MVP 推荐范围

第一版推荐范围建议固定为：

```text
相似案例
相关法规
办理指引
文书模板
```

如果知识库暂时只接了案例库，则先只做：

```text
相似案例
相关依据
推荐理由
```

## 4. 开始节点变量

开始节点仍保持最小 3 个变量：

```text
business_scene
recommendation_context
custom_context
```

### 4.1 business_scene 示例

```json
{
  "scene_name": "司法局案例推荐",
  "module_name": "司法行政业务辅助",
  "business_scene": "案件办理或业务研判中的案例辅助推荐",
  "page_name": "案例推荐入口",
  "page_object": "当前案件或咨询事项"
}
```

### 4.2 recommendation_context 示例

```json
{
  "recommendation_business": "司法局案例辅助推荐",
  "recommendation_scope": ["相似案例", "相关法规", "办理指引", "文书模板"],
  "max_items": 5,
  "priority_requirement": "优先推荐与当前案情、争议焦点、适用依据相近的案例"
}
```

### 4.3 custom_context 示例

```json
{
  "tenant_id": "default",
  "caller_id": "judicial_case_assistant",
  "case_id": "",
  "case_title": "",
  "case_type": "",
  "case_summary": "",
  "dispute_focus": [],
  "keywords": [],
  "extra_requirement": "推荐结果需要说明相似点、适用依据和参考价值"
}
```

MVP 初期如果页面没有结构化案件字段，也可以只把用户输入作为案情描述，让 LLM 和知识库先基于自然语言检索。

## 5. 五卡片流程保持不变

司法局案例推荐 MVP 仍使用五卡片：

```text
开始_1
→ 代码块_1：上下文汇总与可行性盘点
→ Chat_1：场景理解与案例推荐规划
→ Chat_2：案例推荐排序与结果生成
→ 结束_1
```

### 5.1 开始_1

接收：

```text
business_scene
recommendation_context
custom_context
```

### 5.2 代码块_1

汇总：

```text
用户输入
用户身份
部门单位
权限与安全等级
可访问知识库
业务场景
推荐范围
案件上下文
运行环境
```

输出：

```text
agent_context
agent_context_text
llm_safe_context
llm_context_text
feasibility_report
```

### 5.3 Chat_1：场景理解与案例推荐规划

职责：

```text
识别用户是否在请求案例推荐
提取案情要素
识别案件类型、关键词、争议焦点
判断需要检索哪些知识库
生成案例推荐计划
```

建议输出：

```json
{
  "is_recommendation_request": true,
  "scene": "司法局案例推荐",
  "case_understanding": {
    "case_type": "",
    "case_summary": "",
    "dispute_focus": [],
    "keywords": [],
    "legal_domains": []
  },
  "recommendation_plan": {
    "recommendation_types": ["相似案例", "相关法规", "办理指引", "文书模板"],
    "retrieval_targets": ["case_knowledge_base", "law_policy_knowledge_base", "guide_knowledge_base", "template_knowledge_base"],
    "ranking_strategy": ["case_similarity_first", "legal_basis_relevance_first", "same_region_or_same_department_first", "newest_first"],
    "max_items": 5
  },
  "missing_data_summary": []
}
```

### 5.4 Chat_2：案例推荐排序与结果生成

职责：

```text
根据上下文、知识库结果和推荐规划生成推荐结果。
```

MVP 输出格式建议：

```text
为您推荐以下参考案例：

1. 案例标题
类型：
相似点：
适用依据：
参考价值：
建议操作：
来源：
```

如果暂时没有真实知识库检索结果，则输出：

```text
当前已完成案例推荐规划，但尚未接入案例知识库检索结果。
建议接入以下数据源后生成正式推荐：
1. 案例库
2. 法规政策库
3. 办理指引库
4. 文书模板库
```

## 6. 后续需要接入的数据源

司法局案例推荐场景优先接入：

```text
案例知识库
法律法规 / 政策文件知识库
司法行政业务指南库
文书模板库
用户可访问知识库范围
权限与安全等级
```

后续增强：

```text
案件系统接口
事项办理系统接口
用户行为数据
案例点击反馈
推荐采纳记录
知识图谱：案件类型、争议焦点、法律依据、裁判要点、办理流程
```

## 7. 与原始需求的关系

该 MVP 场景可以验证原始需求中的关键能力：

```text
上下文场景数据
用户身份与权限
推荐意图识别
场景模板匹配
知识库 / RAG 检索
推荐排序
推荐理由生成
合规边界控制
反馈优化入口
```

暂不做满：

```text
完整角色切换
完整长期记忆
完整知识图谱推理
多业务系统联动
推荐效果分析闭环
```

