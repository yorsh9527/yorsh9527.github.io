import { journey } from '@/data/personal'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '学习路线' })

export default function Page() {
  return (
    <div className="field-home field-page">
      <h1>我的学习路线</h1>
      <p className="page-intro">
        从搭环境开始，在真实项目里理解工具。这里记录当前已经走过的步骤，以及接下来准备探索的方向。
      </p>
      <Link href="/blog" className="text-link route-back">
        阅读实践记录
      </Link>
      <div className="route-index" aria-label="学习步骤与当前进展">
        {journey.map((step, index) => (
          <article key={step.title} className="route-entry">
            <span className="entry-number" aria-label={`第 ${index + 1} 步`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="entry-content">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
            <span className="entry-meta">{step.status}</span>
          </article>
        ))}
      </div>
      <div className="detail-panel">
        <p>路线会随实践更新。计划中的步骤代表探索方向，不代表已经掌握的能力。</p>
      </div>
    </div>
  )
}
