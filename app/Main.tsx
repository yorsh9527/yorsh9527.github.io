import Link from '@/components/Link'
import { journey, works } from '@/data/personal'
export default function Home({ posts }) {
  const notes = posts.filter((p) => p.tags?.includes('学习记录')).slice(0, 3)
  return (
    <div className="field-home">
      <section className="archive-hero">
        <div>
          <h1>
            把好奇，变成
            <br />
            看得见的作品。
          </h1>
          <p className="hero-copy">记录学习路线、实践过程，以及每一次从想法到实现的进展。</p>
          <div className="hero-actions">
            <Link href="/projects" className="field-button">
              探索我的作品
            </Link>
            <Link href="/journey" className="text-link">
              沿着学习路线走走
            </Link>
          </div>
        </div>
        <aside className="hero-index" aria-label="阅读目录">
          <h2>从这里读起</h2>
          <Link href="/journey">
            学习路线<span>01</span>
          </Link>
          <Link href="/projects">
            实践作品<span>02</span>
          </Link>
          <Link href="/blog">
            学习记录<span>03</span>
          </Link>
          <Link href="/news">
            每日观察<span>04</span>
          </Link>
          <Link href="/about">
            关于这个空间<span>05</span>
          </Link>
        </aside>
      </section>
      <div className="archive-scope">
        <p>目前的探索方向</p>
        <div>
          <span>AI Agent</span>
          <span>开源项目二开</span>
          <span>个人知识沉淀</span>
        </div>
      </div>
      <section className="field-section">
        <div className="section-heading">
          <h2>学习路线</h2>
          <Link href="/journey" className="text-link">
            完整路线
          </Link>
        </div>
        <div className="route-index">
          {journey.map((s, i) => (
            <Link href="/journey" className="route-entry" key={s.title}>
              <span className="entry-number">0{i + 1}</span>
              <div className="entry-content">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
              <span className="entry-meta">{s.status}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="field-section">
        <div className="section-heading">
          <h2>实践作品</h2>
          <Link href="/projects" className="text-link">
            全部作品
          </Link>
        </div>
        <div className="work-spread">
          {works.map((w, i) => (
            <article className="work-essay" key={w.slug}>
              <Link href={`/projects/${w.slug}`}>
                <h3>{w.title}</h3>
                <div className="entry-meta">
                  <span>{w.status}</span>
                </div>
                <p>{w.description}</p>
                <div className="stack-tags">
                  {w.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="field-section">
        <div className="section-heading">
          <h2>学习记录</h2>
          <Link href="/blog" className="text-link">
            全部记录
          </Link>
        </div>
        {notes.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="note-row">
            <time dateTime={p.date}>{p.date.slice(0, 10).replaceAll('-', '.')}</time>
            <div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
          </Link>
        ))}
      </section>
      <section className="closing-note">
        <h2>
          不急着成为专家，
          <br />
          先做一个持续行动的人。
        </h2>
        <Link href="/about" className="text-link">
          关于这个空间
        </Link>
      </section>
    </div>
  )
}
