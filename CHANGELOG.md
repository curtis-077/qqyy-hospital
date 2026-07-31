---
name: medical-website-changelog
description: Changelog of the 七七医院 medical consultation website — features, issues, and fixes
metadata:
  type: project
---

# 七七医院 · 智能预诊网站 — 开发日志

## v1.0 — 初始搭建
- **创建三件套** `index.html` / `style.css` / `script.js`，模拟医院问诊
- **功能**: 患者输入症状 → 关键词匹配 → 生成病历 → 推荐科室 + 下一步建议
- **知识库**: 覆盖 14 个科室（神经内科→急诊科），约 20 组症状关键词
- **问题**: 纯关键词匹配，说"肚子疼"笼统匹配到消化内科，精准度差

## v1.1 — 品牌改名
- 全局替换: **仁和医院 → 七七医院** (7 处)

## v1.2 — 去掉楼层信息
- **问题**: 科室推荐带了 `门诊楼 X层 X区`，用户只需要知道去哪个科室
- **方案**: 从知识库 `department` 对象删除 `floor` 字段，回复/面板只显示科室名+简介
- **修改**: knowledge base 全部 department 对象 + `buildDeptResponse()` + `buildUnknownResponse()` + `updateRecordPanel()`

## v1.3 — 集成 Anthropic API（后被移除）
- **新增**: 右上角 ⚙️ 设置按钮 + 弹窗 → 填入 API Key + AI/本地模式切换
- **引擎**: 调用 `claude-haiku-4-5`，`system prompt` 输出结构化 JSON
- **降级**: API 失败或无 Key 时自动回退本地规则引擎
- **问题**: 用户不需要 API 配置，后续版本移除

## v2.0 — 去掉 API，纯本地 + 多轮追问架构（当前版本）
- **移除**: ⚙️ 设置按钮、API 弹窗、模式切换、全部 API 调用代码
- **核心改造**: 单轮匹配 → 多轮追问

### 新增能力
- **信息提取器 `extractInfo()`**: 从自由文本提取 7 维度（部位/性质/时长/伴随/诱因/严重度/既往史），使用正则 + 关键词字典
- **追问模板 `FOLLOWUP_TEMPLATES`**: 9 个症状区域各带 5-6 个针对性问题（abdominal/head/chest/joint/skin/fever/urinary/ent/mental）
- **追问引擎**: `findTemplate()` 识别症状模板 → `buildFollowupMessage()` 挑 3 个未问过的问题 → 最多追问 3 轮 → 信息够了自动进入诊断
- **细化知识库 `DETAILED_KNOWLEDGE`**:
  - 腹部拆成 8 个子区域 (upperRight/upperMiddle/lowerRight/...)，各自独立匹配
  - 每种区域按疼痛性质再细分 (cramping→肠痉挛, burning→反流, pressure→心绞痛)
  - 头部/胸部/关节/皮肤/发热同理拆分
  - 内置 `redFlags` 紧急警示，匹配到立即提示去急诊
- **状态管理**: `state` 对象跟踪已收集输入、已问维度、当前模板、诊断完成状态

### 核心流程
1. 用户输入 → 提取症状区域模板
2. 信息不足 → 追问 2-3 个针对性问题
3. 信息够了 → `runDiagnosis()` 综合全部输入 → 子类别+疼痛性质双重匹配
4. 输出: 初步诊断 + 鉴别诊断 + 科室推荐 + 分步建议 + 病历卡

### 已知局限
- 纯本地关键词+正则匹配，无法理解语义（"我娃肚子疼"和"我肚子疼"视为相同）
- 追问最多 3 轮即强制进入诊断，极复杂症状可能信息不足
- 知识库为静态硬编码，需要手动维护扩充
