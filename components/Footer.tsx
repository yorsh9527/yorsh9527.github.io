import Link from './Link'
export default function Footer() {
  return (
    <footer className="site-colophon">
      <div>
        <Link href="/" className="footer-wordmark">
          探索手记。
        </Link>
        <p>在实践中生长。</p>
      </div>
      <div className="footer-links">
        <Link href="/about">关于这个空间</Link>
        <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
          Tailwind Next.js Starter Blog
        </Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
