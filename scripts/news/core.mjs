import { createHash } from 'node:crypto'
export function text(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) =>
      String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n))
    )
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}
function tag(block, name) {
  return block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || ''
}
export function parseFeed(xml, source) {
  return [...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)].flatMap(
    ([, , block]) => {
      const title = text(tag(block, 'title'))
      const rawUrl =
        text(tag(block, 'link')) || block.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1]
      const date = tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated')
      try {
        const url = new URL(rawUrl)
        if (
          !['http:', 'https:'].includes(url.protocol) ||
          !title ||
          !Number.isFinite(Date.parse(date))
        )
          return []
        url.hash = ''
        for (const key of [...url.searchParams.keys()])
          if (key.startsWith('utm_')) url.searchParams.delete(key)
        return [
          {
            id: createHash('sha256').update(url.href).digest('hex').slice(0, 16),
            title,
            originalTitle: title,
            url: url.href,
            source: source.name,
            publishedAt: new Date(date).toISOString(),
            summary: text(
              tag(block, 'description') ||
                tag(block, 'summary') ||
                tag(block, 'content:encoded') ||
                tag(block, 'content')
            ).slice(0, 450),
            category: 'AI 动态',
            summaryType: 'source',
          },
        ]
      } catch {
        return []
      }
    }
  )
}
export function selectNews(items, start, end, limit = 12) {
  const seen = new Set()
  const titles = new Set()
  return items
    .filter((n) => Date.parse(n.publishedAt) >= start && Date.parse(n.publishedAt) < end)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .filter((n) => {
      const title = n.originalTitle.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
      if (seen.has(n.id) || titles.has(title)) return false
      seen.add(n.id)
      titles.add(title)
      return true
    })
    .slice(0, limit)
}
export async function request(url, options = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(60000) })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response
    } catch (error) {
      if (attempt === 2) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }
}
export function validateReport(report) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(report.date) ||
    !Number.isFinite(Date.parse(report.generatedAt)) ||
    !Array.isArray(report.news)
  )
    throw new Error('Invalid report')
  const ids = new Set()
  for (const item of report.news) {
    if (
      !item.id ||
      ids.has(item.id) ||
      !item.title ||
      !item.source ||
      !/^https?:\/\//.test(item.url) ||
      !Number.isFinite(Date.parse(item.publishedAt))
    )
      throw new Error('Invalid news item')
    ids.add(item.id)
  }
  return report
}
