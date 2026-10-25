import { works } from '@/data/personal'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '实践作品' })

export default function Page() {
  return (
    <div className="field-home field-page">
      <h1>实践作品</h1>
      <p className="page-intro">
        在做中学，在学中做。展示正在进行的实践，而不只是最终成品。每个项目都是一次理解问题、尝试方案、验证结果的过程。
      </p>
      <div className="route-index" aria-label="实践作品目录">
        {works.map((work, index) => (
          <article key={work.slug} className="route-entry">
            <span className="entry-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="entry-content">
              <h2>
                <Link href={`/projects/${work.slug}`}>{work.title}</Link>
              </h2>
              <p>{work.description}</p>
              <div className="stack-tags" aria-label="项目技术栈">
                {work.stack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
            <div className="entry-meta">
              <span>{work.category.toLowerCase()}</span>
              <span>{work.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
