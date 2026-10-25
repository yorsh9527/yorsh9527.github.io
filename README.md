# 探索手记 · 学习与作品

个人学习路线、实践作品与 Markdown 学习记录。

网站：https://yorsh9527.github.io/

## 本地开发

使用 Node.js 24，执行：

```powershell
node .yarn/releases/yarn-3.6.1.cjs install --immutable
.\start-local.ps1
```

## 内容维护

- 学习文章：`data/blog/`，支持 `.md` / `.mdx`，标签包含「学习记录」。
- 学习路线和作品：`data/personal.ts`。
- 站点配置：`data/siteMetadata.js`。
- 原模板示例：`docs/template-posts/`，不参与公开文章生成。

## 发布

推送到 `master` 后，GitHub Actions 自动安装依赖、静态构建并发布到 GitHub Pages。

原新闻首页保留在 `/news/`，历史日报路径 `/daily-pages/` 继续有效。
相关旧说明见 `docs/news-archive.md`。

基于 MIT 许可的 [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)，保留原 LICENSE。

## 每日观察

入口：`/news/`；历史日报：`/news/YYYY-MM-DD/`；旧版归档：`/news/archive/`。

GitHub Actions 每天 UTC 23:37（次日北京时间 07:37）生成晨报，覆盖北京时间前一自然日。定时任务可能延迟。可在 Actions 的 Deploy personal website 工作流点击 Run workflow 手动采集；date 可填写补采日期。RSS 通常只提供近期内容，过久的日期无法保证补齐。

Secrets：
- `DEEPSEEK` 或 `DEEPSEEK_API_KEY`：DeepSeek API 密钥。
- `MARKET_API_TOKEN`（可选）：Tushare Token，须具有 `index_daily` 的接口权限。未配置时行情区明确显示待配置。

新闻来源配置：`scripts/news/sources.json`。仅将公开来源提供的标题和摘要发送到 DeepSeek；不发送个人文章。页面保留来源链接、原始标题和摘要标识。

本地执行：`node scripts/news/collect.mjs`，或 `node scripts/news/collect.mjs --date=2026-10-25`。测试：`node --test scripts/news/core.test.mjs`。

采集数据提交至 `data/news/`；每天仅进行一次新闻批量摘要。全部来源失败或生产构建失败时不发布新版本；摘要失败时退回来源内容。重复采集不会以空结果覆盖同日已有新闻。每个日报显示生成时间和覆盖范围，可据此判断数据是否过期。

新增 RSS 来源前，应确认其使用条款；公开展示行情前应确认对应数据权限。当前自动化不包含飞书或其他外部通知。

### 免费 A 股快照

未配置 Tushare Token（或 Tushare 调用失败）时，自动使用 AKShare 1.19.3 的公开日线接口，依次尝试东方财富、腾讯财经和新浪财经。无需新增 Secret。运行环境为 Python 3.12。

仅取晨报覆盖日期之前的收盘数据；涨跌幅由同一来源相邻两个交易日收盘价计算。每张卡片标注实际来源和交易日期；免费接口可能限流或失效，失败时保留明确标记的既有数据，首次失败不展示数字。数据不代表实时行情，免费获取也不构成上游数据的再分发授权。
