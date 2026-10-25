import NewsView from '@/components/news/NewsView'
import { newsDates, readReport } from '@/lib/news'
import { notFound } from 'next/navigation'
export const dynamicParams = false
export function generateStaticParams() {
  return newsDates().map((date) => ({ date }))
}
export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  return { title: `${date} 每日观察` }
}
export default async function Page({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const report = readReport(date)
  if (!report) notFound()
  return <NewsView dates={newsDates()} report={report} />
}
