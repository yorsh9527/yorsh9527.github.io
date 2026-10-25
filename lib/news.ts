import fs from 'node:fs'
import path from 'node:path'
export interface NewsItem {
  id: string
  title: string
  originalTitle: string
  summary: string
  source: string
  url: string
  publishedAt: string
  category: string
  summaryType: string
}
export interface NewsReport {
  date: string
  generatedAt: string
  coverageStart: string
  coverageEnd: string
  status: string
  summaryStatus: string
  news: NewsItem[]
  warnings: string[]
  sources: { name: string; status: string }[]
  market: {
    status: string
    message: string
    provider: string
    tradeDate: string | null
    indices: {
      provider?: string
      code: string
      name: string
      close: number
      changePercent: number
      tradeDate: string
    }[]
  }
}
const directory = path.join(process.cwd(), 'data/news')
export function newsDates(): string[] {
  return fs
    .readdirSync(directory)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .map((f) => f.slice(0, 10))
    .sort()
    .reverse()
}
export function readReport(date: string): NewsReport | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const file = path.join(directory, `${date}.json`)
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''))
    : null
}
