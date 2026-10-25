import Link from '@/components/Link'
import { journey, works } from '@/data/personal'
export default function Home({ posts }) {
  const notes = posts.filter((p) => p.tags?.includes('学习记录')).slice(0, 3)
  return (
    <div className="field-home">
      <section className="field-hero">
        <div>
          <div className="eyebrow">
            <span className="status-dot" /> 持续学习 · 持续构建
          </div>
          <h1>
            把好奇，变成
            <br />
            <span>看得见的作品。</span>
          </h1>
          <p className="hero-copy">
            从理解一个工具，到跑通一个项目，再到做出自己的改变。这里记录我的学习路线、实践过程，以及每一次从想法到实现的进展。
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="field-button">
              探索我的作品 ↗
            </Link>
            <Link href="/journey" className="text-link">
              沿着学习路线走走 →
            </Link>
          </div>
          <div className="hero-caption">LEARN BY BUILDING. DOCUMENT THE JOURNEY.</div>
        </div>
        <div className="field-art" aria-label="探索、实践、复盘的学习路径">
          <div className="art-grid" />
          <div className="art-orbit" />
          <span className="art-label">A WORK IN PROGRESS</span>
          <div className="art-node node-a">
            <small>01 / EXPLORE</small>
            <strong>保持好奇</strong>
            <span>提出一个好问题 ↗</span>
          </div>
          <div className="art-node node-b">
            <small>02 / BUILD</small>
            <strong>动手实现</strong>
            <span>&lt; idea /&gt; → &lt; reality /&gt;</span>
          </div>
          <div className="art-node node-c">
            <small>03 / REFLECT</small>
            <strong>留下痕迹</strong>
            <span>记录 · 复盘 · 再出发</span>
          </div>
          <span className="art-bottom">每一次实践，都是向前的一步。 ✳</span>
        </div>
      </section>
      <div className="focus-strip">
        <span>目前的探索方向</span>
        <strong>AI Agent</strong>
        <i>/</i>
        <strong>开源项目二开</strong>
        <i>/</i>
        <strong>个人知识沉淀</strong>
      </div>
      <section className="field-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">01 — LEARNING PATH</div>
            <h2>学习不是直线，但每步都算数。</h2>
          </div>
          <Link href="/journey" className="text-link">
            完整路线 ↗
          </Link>
        </div>
        <div className="journey-grid">
          {journey.map((s, i) => (
            <Link href="/journey" className="journey-step" key={s.title}>
              <div className="step-top">
                <span>0{i + 1}</span>
                <small className={s.status === '已完成' ? 'badge done' : 'badge'}>{s.status}</small>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="step-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="field-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">02 — SELECTED WORK</div>
            <h2>在实践里，把想法落地。</h2>
          </div>
          <Link href="/projects" className="text-link">
            全部作品 ↗
          </Link>
        </div>
        <div className="work-grid">
          {works.map((w, i) => (
            <Link href={`/projects/${w.slug}`} className="work-card" key={w.slug}>
              <div className={`work-visual visual-${i}`}>
                <span className="visual-index">EXPERIMENT / 0{i + 1}</span>
                {i === 0 ? (
                  <div className="mini-browser">
                    <div className="browser-dots">● ● ●</div>
                    <div className="mini-body">
                      <small>我的数字空间</small>
                      <strong>
                        记录成长。
                        <br />
                        展示可能。
                      </strong>
                      <div className="mini-lines" />
                      <div className="mini-blocks">
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="agent-diagram">
                    <span>YOU</span>
                    <b>↓</b>
                    <strong>
                      OpenCode <em>↔</em> DeepSeek
                    </strong>
                    <b>↓</b>
                    <span>READ → BUILD → VERIFY</span>
                  </div>
                )}
                <span className="visual-status">{w.status}</span>
              </div>
              <div className="work-info">
                <small>{w.category}</small>
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
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="field-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">03 — FIELD NOTES</div>
            <h2>记录过程，也记录思考。</h2>
          </div>
          <Link href="/blog" className="text-link">
            全部记录 ↗
          </Link>
        </div>
        {notes.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="note-row">
            <time>{p.date.slice(0, 10).replaceAll('-', '.')}</time>
            <div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
            <span>↗</span>
          </Link>
        ))}
      </section>
      <section className="closing-note">
        <span>✳</span>
        <h2>
          不急着成为专家，
          <br />
          先做一个持续行动的人。
        </h2>
        <Link href="/about" className="text-link">
          关于这个空间 →
        </Link>
      </section>
    </div>
  )
}
