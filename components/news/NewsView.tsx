import Link from '@/components/Link'
import type { NewsReport } from '@/lib/news'
const stamp = (value: string) =>
  new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
export default function NewsView({
  report,
  dates,
}: {
  report: NewsReport | null
  dates: string[]
}) {
  return (
    <div className="field-home field-page">
      <div className="eyebrow">THE DAILY SIGNAL · 每日自动整理</div>
      <h1>每日观察</h1>
      <p className="page-intro">
        关注 AI 的新进展，也观察市场的变化。从可靠来源出发，把值得关注的信息收进一页。
      </p>
      <div className="news-toolbar">
        <span>{report ? `${report.date} 晨报` : '第一份日报正在准备中'}</span>
        <Link href="/news/archive/" className="text-link">
          旧版新闻归档 ↗
        </Link>
      </div>
      {report ? (
        <>
          <div className="news-meta">
            <span>生成于 {stamp(report.generatedAt)}（北京时间）</span>
            <span>
              覆盖 {stamp(report.coverageStart)} 至 {stamp(report.coverageEnd)}
            </span>
            <span>
              {report.summaryStatus === 'ai' ? 'DeepSeek 中文摘要' : '含来源原文摘要'} ·{' '}
              {report.news.length} 条新闻
            </span>
          </div>
          {report.warnings.length > 0 && (
            <aside className="news-notice" aria-label="数据更新状态">
              {report.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </aside>
          )}
          <section className="field-section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">01 — AI DISPATCH</div>
                <h2>AI 新闻精选</h2>
              </div>
            </div>
            {report.news.length ? (
              <div className="news-grid">
                {report.news.map((item) => (
                  <article className="news-card" key={item.id}>
                    <div className="news-card-top">
                      <span className="badge">{item.category}</span>
                      <span>{item.summaryType === 'ai' ? 'AI 辅助摘要' : '来源内容'}</span>
                    </div>
                    <h3>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title} ↗
                      </a>
                    </h3>
                    {item.originalTitle !== item.title && (
                      <p className="news-original">{item.originalTitle}</p>
                    )}
                    <p>{item.summary || '来源未提供摘要，请阅读原文。'}</p>
                    <div className="news-source">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.source} ↗
                      </a>
                      <time dateTime={item.publishedAt}>{stamp(item.publishedAt)}</time>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="news-notice">本次覆盖时段内，没有从已接入来源发现新条目。</div>
            )}
          </section>
          <section className="field-section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">02 — MARKET SNAPSHOT</div>
                <h2>市场快照</h2>
              </div>
            </div>
            <p className="page-intro">{report.market.message}</p>
            {report.market.indices.length > 0 && (
              <div className="market-grid">
                {report.market.indices.map((i) => (
                  <article key={i.code} className="market-card">
                    <h3>{i.name}</h3>
                    <strong>{i.close.toFixed(2)}</strong>
                    <span className={i.changePercent >= 0 ? 'market-up' : 'market-down'}>
                      {i.changePercent >= 0 ? '+' : ''}
                      {i.changePercent.toFixed(2)}%
                    </span>
                    <small>
                      {i.tradeDate} 收盘 · {i.provider || report.market.provider}
                    </small>
                  </article>
                ))}
              </div>
            )}
          </section>
          <section className="field-section">
            <div className="eyebrow">SOURCES & METHOD</div>
            <p className="news-method">
              来源：
              {report.sources
                .map((s) => `${s.name}${s.status === 'failed' ? '（本次不可用）' : ''}`)
                .join(' / ')}
              。新闻按原始发布时间筛选并去重；AI
              摘要可能存在误差，请以链接原文为准。市场数据为收盘快照，不构成投资建议。页面保留生成时间，请留意信息时效。
            </p>
          </section>
        </>
      ) : (
        <div className="news-notice">
          自动任务完成采集后，新闻会显示在这里。当前没有发布任何模拟新闻或行情。
        </div>
      )}
      <section className="field-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DAILY ARCHIVE</div>
            <h2>回看每一天</h2>
          </div>
        </div>
        <div className="news-archive">
          {dates.map((d) => (
            <Link href={`/news/${d}`} key={d} className="stack-tags">
              <span>{d} ↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
