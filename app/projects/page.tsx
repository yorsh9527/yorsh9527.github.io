import { works } from '@/data/personal'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: '实践作品' })
export default function Page() {
  return (
    <div className="field-home field-page">
      <div className="eyebrow">A COLLECTION OF EXPERIMENTS</div>
      <h1>在做中学，在学中做。</h1>
      <p className="page-intro">
        展示正在进行的实践，而不只是最终成品。每个项目都是一次理解问题、尝试方案、验证结果的过程。
      </p>
      <div className="work-grid">
        {works.map((w) => (
          <Link key={w.slug} href={`/projects/${w.slug}`} className="work-card work-info">
            <small>
              {w.category} · {w.status}
            </small>
            <h3>
              {w.title}
              <span>↗</span>
            </h3>
            <p>{w.description}</p>
            <div className="stack-tags">
              {w.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
