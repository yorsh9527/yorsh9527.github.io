import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
export default function Header() {
  return (
    <header className="site-masthead">
      <div className="masthead-title">
        <Link href="/" aria-label="探索手记首页" className="site-wordmark">
          探索手记<span aria-hidden="true">。</span>
        </Link>
        <p>个人学习与作品档案</p>
      </div>
      <div className="masthead-bottom">
        <nav className="desktop-nav" aria-label="主导航">
          {headerNavLinks
            .filter((l) => l.href !== '/')
            .map((l) => (
              <Link key={l.href} href={l.href}>
                {l.title}
              </Link>
            ))}
        </nav>
        <span className="mobile-nav-label">学习、实践与日常观察</span>
        <div className="masthead-tools">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
