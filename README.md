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
