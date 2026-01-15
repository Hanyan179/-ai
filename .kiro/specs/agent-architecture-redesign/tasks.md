# Implementation Tasks: Agent 架构页面重构

## 概述

重构 Agent 工程化架构展示页面，展示三种视图模式（黑盒/白盒/技术）的7阶段业务流程。

**核心目标**：让领导理解简单提示词 vs 工程化设计的区别，展示完整的业务流程

**涉及文件**：
- `types.ts` - 类型定义
- `architectureConstants.ts` - 架构数据常量
- `components/ArchitectureDiagram.tsx` - 架构图组件
- `pages/ArchitecturePage.tsx` - 架构页面
- `App.tsx` - 添加页面入口

---

## Tasks

- [x] 1. 项目结构准备
  - [x] 1.1 在 `types.ts` 中添加架构相关类型定义
    - `ViewMode`: 'blackbox' | 'whitebox' | 'technical'
    - `ArchNode`: 节点数据结构
    - `ArchConnection`: 连线数据结构
    - `ExternalService`: 外部服务数据结构
    - _Requirements: 3.1, 6.1-6.9_
  - [x] 1.2 创建 `architectureConstants.ts` 文件
    - 模式配置数据
    - 节点数据
    - 连线数据
    - _Requirements: 1.1, 2.1, 3.1_

- [x] 2. 实现架构数据常量
  - [x] 2.1 添加黑盒模式数据
    - 3个节点：用户输入 → AI处理 → 输出结果
    - 2条连线
    - _Requirements: 3.2_
  - [x] 2.2 添加白盒模式数据（7阶段流程）
    - Stage 1-2: 业务入口、Agent输入
    - Stage 3: 上下文编排 + 业务组件（角色设定、代码逻辑、风格组件、记忆系统）+ 编排融合
    - Stage 4-5: 审视校验、安全合规（新增阶段）
    - Stage 6-7: 输出、反馈闭环
    - 组件间协作连线
    - 回流闭环连线
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 4.1, 4.2, 4.3_
  - [x] 2.3 添加技术模式数据
    - 每个节点的技术栈详情
    - 外部服务层（LLM API、向量数据库、知识库、规则引擎、缓存层、MAP中台）
    - 技术连线和共通技术连线
    - _Requirements: 5.1, 5.2, 8.1, 8.2_
  - [x] 2.4 添加业务场景示例数据
    - 《工作计划》Prompt 与组件映射
    - 不同文种的组件差异说明
    - _Requirements: 7.2, 7.3_

- [x] 3. 实现视图组件
  - [x] 3.1 创建 `ModeToggle` 组件
    - 三个按钮：黑盒模式、白盒模式、技术模式
    - 当前模式高亮
    - 模式说明文字
    - _Requirements: 3.1_
  - [x] 3.2 创建 `NodeCard` 组件
    - 根据模式显示不同内容
    - 黑盒：标题
    - 白盒：标题 + 业务描述 + 输入输出标签
    - 技术：白盒内容 + 技术栈徽章
    - _Requirements: 3.2, 3.3, 3.4, 6.1-6.9_
  - [x] 3.3 创建 `ConnectionArrow` 组件
    - 支持4种类型样式：main(蓝色实线)、feedback(绿色虚线)、tech(紫色细线)、shared(橙色)
    - 支持数据标签显示
    - _Requirements: 5.3, 9.1_
  - [x] 3.4 创建 `ExternalServicesLayer` 组件
    - 仅技术模式显示
    - 显示6个外部服务节点
    - 显示与模块的连接线
    - _Requirements: 5.1, 5.2_

- [x] 4. 实现视图布局
  - [x] 4.1 创建 `BlackBoxView` 组件
    - 水平三节点布局
    - 简洁的箭头连线
    - _Requirements: 3.2_
  - [x] 4.2 创建 `WhiteBoxView` 组件
    - 垂直7阶段流程布局
    - 业务组件横向排列区域
    - 组件间协作连线
    - 回流闭环连线（虚线）
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 3.3, 4.3_
  - [x] 4.3 扩展 `TechnicalView` 组件
    - 继承白盒布局
    - 右侧外部服务层
    - 技术连线和共通技术标注
    - _Requirements: 3.4, 5.1, 5.2, 8.1, 8.2, 8.3_

- [x] 5. 整合主组件
  - [x] 5.1 创建 `ArchitectureDiagram` 主组件
    - 状态管理：当前模式
    - 根据模式渲染对应视图
    - 模式切换动画
    - _Requirements: 3.1_
  - [x] 5.2 创建 `ArchitecturePage` 页面组件
    - 页面标题和描述（无营销术语）
    - 集成 ArchitectureDiagram
    - 响应式布局
    - _Requirements: 7.1, 7.3, 7.4_

- [x] 6. 添加页面入口
  - [x] 6.1 更新 `App.tsx` 添加架构页面路由入口
    - 在导航中添加"架构设计"入口
    - 或在 Hero 组件添加入口按钮
    - _Requirements: 需要页面入口_

- [ ] 7. 验证和测试
  - [ ] 7.1 验证三种模式切换正常
    - 黑盒模式显示3节点
    - 白盒模式显示完整7阶段流程
    - 技术模式显示外部服务层
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ] 7.2 验证文案无营销术语
    - 检查所有节点描述
    - 检查页面标题和说明
    - _Requirements: 7.1_
  - [ ] 7.3 验证7阶段流程完整性
    - 业务入口 → Agent输入 → 上下文编排 → 审视校验 → 安全合规 → 输出 → 反馈闭环
    - _Requirements: 4.3_

- [x] 8. 统一画布系统重构（核心任务）
  - [x] 8.1 创建 `UnifiedCanvas` 组件
    - 替代现有的 BlackBoxView、WhiteBoxView、TechnicalView
    - 所有模式共用一个画布
    - 根据 mode 和 node.visibleIn 决定显示/隐藏
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  - [x] 8.2 更新 `architectureConstants.ts` 统一布局
    - 定义 UNIFIED_LAYOUT 常量
    - 更新所有节点的 position 属性使用统一布局
    - 确保三种模式布局一致
    - _Requirements: 11.1, 11.2, 11.3_
  - [x] 8.3 实现正交连线算法
    - 替换现有的贝塞尔曲线
    - 使用只有水平和垂直线段的路径
    - 回流连线走左侧，技术连线走右侧
    - _Requirements: 12.1, 12.2, 12.4_
  - [x] 8.4 更新 `ArchitectureDiagram` 使用 UnifiedCanvas
    - 移除 BlackBoxView、WhiteBoxView、TechnicalView 的切换逻辑
    - 直接使用 UnifiedCanvas 并传入 mode
    - _Requirements: 10.2_
  - [x] 8.5 清理废弃组件
    - 删除或标记废弃 BlackBoxView.tsx
    - 删除或标记废弃 WhiteBoxView.tsx
    - 删除或标记废弃 TechnicalView.tsx
    - 保留 DraggableCanvas.tsx 作为 UnifiedCanvas 的基础
    - _Requirements: 10.1_

- [ ] 9. 验证统一画布
  - [ ] 9.1 验证模式切换时布局一致
    - 切换模式时节点位置不跳动
    - 共享节点在不同模式下位置相同
    - _Requirements: 10.3_
  - [ ] 9.2 验证连线不交叉
    - 主流程连线清晰
    - 回流连线在左侧
    - 技术连线在右侧
    - _Requirements: 12.2, 12.4_

---

## 验收标准

1. **黑盒模式**：只显示 用户输入 → AI处理 → 输出结果
2. **白盒模式**：显示完整7阶段业务流程 + 业务组件 + 回流闭环
3. **技术模式**：白盒 + 技术栈详情 + 外部服务连线 + 共通技术标注
4. **文案清晰**：无"越用越懂"、"人力倍增器"、"语义化学反应"等营销术语
5. **业务对应**：组件与实际 Prompt 结构对应（角色设定↔角色定位、代码逻辑↔处理流程、风格组件↔公文词汇）
6. **7阶段完整**：包含新增的"审视校验"和"安全合规"阶段
7. **统一画布**：三种模式共用一个 UnifiedCanvas 组件，切换时布局一致
8. **连线清晰**：使用正交连线，回流走左侧，技术连线走右侧，无交叉混乱

## 技术说明

- 使用 React + TypeScript
- 使用 Tailwind CSS 样式
- 使用 Framer Motion 动画（可选）
- 架构图使用 SVG 或 Canvas 渲染
