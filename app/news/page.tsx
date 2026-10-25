import NewsView from '@/components/news/NewsView'
import { newsDates, readReport } from '@/lib/news'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({
  title: '每日观察',
  description: '每日整理 AI 新闻与市场快照，保留来源、发布时间与历史记录。',
})
export default function Page() {
  const dates = newsDates()
  return <NewsView dates={dates} report={dates.length ? readReport(dates[0]) : null} />
}
