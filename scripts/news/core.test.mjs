import test from 'node:test'
import assert from 'node:assert/strict'
import { parseFeed, selectNews, validateReport } from './core.mjs'
test('RSS parsing strips markup, rejects unsafe links and invalid dates', () => {
  const xml =
    '<rss><item><title><![CDATA[AI &amp; tools]]></title><link>https://example.com/a?utm_source=x</link><pubDate>Sat, 24 Oct 2026 09:00:00 GMT</pubDate><description><![CDATA[<p>Hello <b>world</b></p>]]></description></item><item><title>bad</title><link>javascript:alert(1)</link><pubDate>invalid</pubDate></item></rss>'
  const [item, ...rest] = parseFeed(xml, { name: 'Example' })
  assert.equal(rest.length, 0)
  assert.equal(item.title, 'AI & tools')
  assert.equal(item.url, 'https://example.com/a')
  assert.equal(item.summary, 'Hello world')
})
test('Atom link and date supported', () => {
  const items = parseFeed(
    '<feed><entry><title>Release</title><link href="https://example.com/release"/><updated>2026-10-24T08:00:00Z</updated></entry></feed>',
    { name: 'Source' }
  )
  assert.equal(items.length, 1)
})
test('Beijing coverage excludes next-day midnight and removes duplicates', () => {
  const start = Date.parse('2026-10-24T00:00:00+08:00'),
    end = Date.parse('2026-10-25T00:00:00+08:00')
  const a = { id: 'a', originalTitle: 'Release', publishedAt: new Date(start).toISOString() }
  const b = { ...a, id: 'b' }
  const c = { ...a, id: 'c', originalTitle: 'Other', publishedAt: new Date(end).toISOString() }
  assert.deepEqual(selectNews([a, b, c], start, end), [a])
})
test('Report rejects duplicate news and non-web URLs', () => {
  const report = {
    date: '2026-10-25',
    generatedAt: new Date().toISOString(),
    news: [
      {
        id: 'a',
        title: 'A',
        source: 'S',
        url: 'javascript:bad',
        publishedAt: new Date().toISOString(),
      },
    ],
  }
  assert.throws(() => validateReport(report))
  report.news[0].url = 'https://example.com'
  report.news.push({ ...report.news[0] })
  assert.throws(() => validateReport(report))
})
