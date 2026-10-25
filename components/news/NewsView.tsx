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
    <div className="field-home field-page news-page">
      <header className="news-heading">
        <h1>每日观察</h1>
        <p className="page-intro">
          关注 AI 的新进展，也观察市场的变化。从可靠来源出发，把值得关注的信息收进一页。
        </p>
      </header>
      <div className="news-toolbar">
        <span>{report ? `${report.date} 晨报` : '第一份日报正在准备中'}</span>
        <span className="editorial-label">每日自动整理</span>
        <Link href="/news/archive/" className="text-link">
          旧版新闻归档
        </Link>
      </div>
      {report ? (
        <>
          <dl className="news-meta">
            <div>
              <dt>生成时间</dt>
              <dd>{stamp(report.generatedAt)}（北京时间）</dd>
            </div>
            <div>
              <dt>新闻覆盖</dt>
              <dd>
                {stamp(report.coverageStart)} 至 {stamp(report.coverageEnd)}
              </dd>
            </div>
            <div>
              <dt>本期内容</dt>
              <dd>
                {report.summaryStatus === 'ai' ? 'DeepSeek 中文摘要' : '含来源原文摘要'}，
                {report.news.length} 条新闻
              </dd>
            </div>
          </dl>
          {report.warnings.length > 0 && (
            <aside className="news-notice" aria-label="数据更新状态">
              {report.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </aside>
          )}
          <section className="field-section news-dispatch">
            <div className="section-heading">
              <h2>AI 新闻精选</h2>
            </div>
            {report.news.length ? (
              <ol className="news-layout">
                {report.news.map((item, index) => (
                  <li className="news-entry" key={item.id}>
                    <span className="news-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <article className="news-entry-content">
                      <div className="news-card-top">
                        <span>{item.category}</span>
                        <span>{item.summaryType === 'ai' ? 'AI 辅助摘要' : '来源内容'}</span>
                      </div>
                      <h3>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h3>
                      {item.originalTitle !== item.title && (
                        <p className="news-original">{item.originalTitle}</p>
                      )}
                      <p className="news-summary">
                        {item.summary || '来源未提供摘要，请阅读原文。'}
                      </p>
                      <div className="news-source">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.source}
                        </a>
                        <time dateTime={item.publishedAt}>{stamp(item.publishedAt)}</time>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="news-notice">本次覆盖时段内，没有从已接入来源发现新条目。</div>
            )}
          </section>
          <section className="field-section market-section">
            <div className="section-heading">
              <h2>市场快照</h2>
            </div>
            <p className="page-intro">{report.market.message}</p>
            {report.market.indices.length > 0 && (
              <div className="market-table-wrap">
                <table className="market-table">
                  <caption className="sr-only">各指数最近可用交易日收盘快照</caption>
                  <thead>
                    <tr>
                      <th scope="col">指数</th>
                      <th scope="col">收盘点位</th>
                      <th scope="col">涨跌幅</th>
                      <th scope="col">交易日期与来源</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.market.indices.map((i) => (
                      <tr key={i.code}>
                        <th scope="row">{i.name}</th>
                        <td className="market-value">{i.close.toFixed(2)}</td>
                        <td className={i.changePercent >= 0 ? 'market-up' : 'market-down'}>
                          {i.changePercent >= 0 ? '+' : ''}
                          {i.changePercent.toFixed(2)}%
                        </td>
                        <td className="market-provenance">
                          <time dateTime={i.tradeDate}>{i.tradeDate}</time>
                          <span>收盘</span>
                          <span>{i.provider || report.market.provider}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <section className="field-section news-method-section">
            <div className="section-heading">
              <h2>来源与方法</h2>
            </div>
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
          <h2>回看每一天</h2>
        </div>
        <div className="news-archive">
          {dates.map((d) => (
            <Link href={`/news/${d}`} key={d} className="text-link">
              <time dateTime={d}>{d}</time>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
