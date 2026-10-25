import { works } from '@/data/personal'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: works.find((w) => w.slug === slug)?.title || '作品' }
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = works.find((w) => w.slug === slug)
  if (!work) notFound()
  const personal = slug === 'personal-space'
  return (
    <div className="field-home field-page">
      <Link href="/projects" className="text-link">
        ← 全部作品
      </Link>
      <div className="eyebrow mt-10">
        {work.category} · {work.status}
      </div>
      <h1>{work.title}</h1>
      <p className="page-intro">{work.description}</p>
      <div className="stack-tags mb-10">
        {work.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <section className="detail-panel">
        <h2>为什么做这个项目</h2>
        <p>
          {personal
            ? '希望有一个自己的空间，把零散的学习过程连接起来，让作品与复盘一起被看到。'
            : '希望借助编程 Agent 理解开源项目，并逐步形成可重复的分析、开发和验证方式。'}
        </p>
      </section>
      <section className="detail-panel">
        <h2>当前进展</h2>
        <p>
          {personal
            ? '已在 Windows 本地运行开源模板，正在进行首页、学习路线和作品展示的个性化改造。'
            : '已安装 OpenCode，了解 DeepSeek API 的接入方式。实际模型连接与完整开发案例仍待实践验证。'}
        </p>
      </section>
      <section className="detail-panel">
        <h2>接下来做什么</h2>
        <p>
          {personal
            ? '补充个人资料与真实作品截图，持续整理学习记录，并在内容确认后规划公开上线。'
            : '完成模型配置，选择一个范围明确的二开任务，记录提示词、代码修改和测试结果。'}
        </p>
      </section>
      <section className="detail-panel">
        <h2>实践记录</h2>
        <Link href="/blog/starting-with-agents" className="text-link">
          从工具选择到第一次本地运行 →
        </Link>
      </section>
    </div>
  )
}
