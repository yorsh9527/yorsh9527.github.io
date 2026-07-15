# 每日新闻日报

自动化新闻日报生成系统，每日早上 7:30 更新前一日重要新闻，覆盖六大领域，通过 GitHub Pages 发布并推送飞书。

## 覆盖领域

| 序号 | 板块 | 范围 |
|------|------|------|
| 01 | AI / 人工智能 | 模型发布、产业政策、国际动态、研究进展 |
| 02 | 国际 | 地缘政治、冲突、重大灾难、外交 |
| 03 | 电力能源 | 用电负荷、电网保供、能源安全、油气 |
| 04 | 算电协同 | 数据中心、GPU 云平台、算力网政策、东数西算、绿电直供 |
| 05 | A股 | 指数行情、热点板块、成交额、机构观点（周末标休市） |
| 06 | 其他领域 | 台风/天气、防汛、高温、国内重大事件 |

## 项目结构

```
.
├── index.html                  # 首页（最新日报卡片 + 历史归档列表）
├── daily-pages/
│   ├── 2026-07-14.html         # 单日报页（完整格式模板）
│   └── YYYY-MM-DD.html         # 历史日报归档
└── README.md
```

## 自动化工作流

### 定时触发

通过 Claude Code 定时任务（Cron），每天早上 **7:27** 自动执行。

### 生成流程

```
┌─────────────────────────────────────────────────┐
│ 1. 搜索六个领域的当日新闻（WebSearch × 6）       │
│ 2. 提取核心要点，每领域 2-4 条                   │
│ 3. 参考 daily-pages/2026-07-14.html 格式生成 HTML │
│    - Hero 区：日期、领域标签                      │
│    - Nav 导航：六个板块锚点链接                    │
│    - 今日要点：6条高亮摘要                        │
│    - 六个板块：各含 2-4 篇带标签和来源链接的文章    │
│    - 侧边栏：阅读说明 + 风险提示                   │
│ 4. 更新 index.html：最新卡片 + 历史列表顶部插入    │
│ 5. Git commit & push → main + master 分支         │
│ 6. 飞书 Webhook 推送日报摘要（六行要点 + 链接）    │
└─────────────────────────────────────────────────┘
```

### 飞书推送

通过飞书自定义机器人 Webhook 发送文本消息，格式如下：

```
每日新闻日报 · YYYY-MM-DD

🤖 AI：...
🌍 国际：...
⚡ 电力能源：...
🖥️ 算电协同：...
📈 A股：...
📋 其他：...

完整日报 → https://yorsh9527.github.io/daily-pages/YYYY-MM-DD.html
```

**乱码防范**：中文 JSON 必须通过 Write 工具写入文件，再用 `curl --data-binary @文件` 发送，不可在 shell 中直接拼接中文。

## 日报生成提示词

以下是定时任务使用的完整提示词模板（`{date}` 和 `{yesterday}` 为运行时替换变量）：

```
生成今天的新闻日报，流程如下：

1. 当前日期是 {date}，覆盖前一自然日（{yesterday}）的新闻。
2. 搜索以下六个领域新闻，每个领域提取 2-4 条核心要点：
   - AI / 人工智能
   - 国际新闻
   - 电力能源
   - 算电协同（数据中心、GPU云平台、算力网政策、东数西算、绿电直供等）
   - A股（周末则标注休市）
   - 其他领域（天气、国内重大事件等）
3. 参考 daily-pages/2026-07-14.html 的 HTML 格式生成新日报。
   注意：hero subtitle、nav 导航栏、section 编号都必须包含全部 6 个板块。
4. 更新 index.html：最新日报卡片 + 历史日报列表顶部插入。
5. Git 提交并推送 origin main 和 origin master。
6. 飞书推送：Write 工具写 JSON 文件 → curl --data-binary @文件 发送。
```

## HTML 日报模板关键结构

```
daily-pages/YYYY-MM-DD.html
├── <header class="hero">     # 日期、领域标签、覆盖/生成时间
├── <nav>                     # 六个板块快捷导航（sticky）
├── <main class="wrap">
│   ├── .grid
│   │   ├── 左栏 (1.35fr)
│   │   │   ├── .panel        # 今日要点 <ol>
│   │   │   ├── #ai           # 01 · AI
│   │   │   ├── #world        # 02 · 国际
│   │   │   ├── #energy       # 03 · 电力能源
│   │   │   ├── #compute      # 04 · 算电协同
│   │   │   ├── #ashare       # 05 · A股
│   │   │   └── #other        # 06 · 其他领域
│   │   └── 右栏 (0.65fr)
│   │       ├── .panel        # 阅读说明
│   │       └── .risk         # 风险提示
├── <p class="footer">        # 免责声明
```

每篇文章结构：
```html
<article class="article">
  <span class="tag">标签</span>
  <h3>标题</h3>
  <p>正文摘要</p>
  <a class="source" target="_blank" rel="noopener" href="...">来源：媒体名 ↗</a>
</article>
```

## 发布到 GitHub Pages

1. 在 GitHub 创建**公开**仓库
2. 将代码推送到仓库 `main` 分支（GitHub Pages 部署分支）
3. Settings → Pages → Deploy from a branch → `main` / `/(root)`
4. 等待部署后通过 `https://<user>.github.io` 访问

> ⚠️ 仓库同时维护 `main`（部署分支）和 `master`（工作分支），推送需同步两个分支。

## 本地开发

### 新增单日报页

1. 复制 `daily-pages/2026-07-14.html` 为新的 `YYYY-MM-DD.html`
2. 修改 hero 日期、各板块文章内容和来源链接
3. 更新 `index.html` 的最新卡片和历史列表

### 飞书推送测试

```bash
# 先写 JSON 文件（UTF-8）
# 再用 curl 发送
curl -s -X POST '<WEBHOOK_URL>' \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data-binary @tmp_feishu.json
```

## 风险提示

- 日报内容基于公开可检索的媒体报道，仅供参考
- 地缘政治事件信息处于快速变化中
- 市场相关内容不构成投资建议
- GitHub Pages 页面公开可见，请勿写入个人敏感信息
