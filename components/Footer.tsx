import Link from './Link'
export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 py-7 text-[11px] text-gray-500 dark:border-gray-800">
      <span>探索手记 © {new Date().getFullYear()} · 在实践中生长。</span>
      <div className="flex gap-5">
        <Link href="/about">关于这个空间 ↗</Link>
        <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
          基于 Tailwind Next.js Starter Blog
        </Link>
      </div>
    </footer>
  )
}
