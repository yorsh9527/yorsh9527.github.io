import { journey } from '@/data/personal'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: '学习路线' })
export default function Page() {
  return (
    <div className="field-home field-page">
      <div className="eyebrow">LEARNING IN PUBLIC</div>
      <h1>我的学习路线</h1>
      <p className="page-intro">
        从搭环境开始，在真实项目里理解工具。这里记录当前已经走过的步骤，以及接下来准备探索的方向。
      </p>
      {journey.map((s, i) => (
        <article key={s.title} className="path-row">
          <span className="eyebrow">0{i + 1}</span>
          <div>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
          </div>
          <span className="badge">{s.status}</span>
        </article>
      ))}
      <div className="detail-panel">
        <p>路线会随实践更新。计划中的步骤代表探索方向，不代表已经掌握的能力。</p>
        <Link href="/blog" className="text-link">
          阅读实践记录 →
        </Link>
      </div>
    </div>
  )
}
