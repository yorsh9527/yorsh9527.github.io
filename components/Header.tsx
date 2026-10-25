import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
export default function Header() {
  return (
    <header className="flex w-full items-center justify-between gap-3 border-b border-gray-200 py-6 dark:border-gray-800">
      <Link href="/" aria-label="探索手记首页" className="flex shrink-0 items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#334235] text-xl text-[#f6f1df]">
          ✳
        </span>
        <span className="text-base font-bold tracking-tight">
          探索手记
          <span className="ml-2 hidden text-[9px] font-normal tracking-widest text-gray-500 lg:inline">
            BUILD & BECOME
          </span>
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <nav className="hidden items-center gap-5 md:flex" aria-label="主导航">
          {headerNavLinks
            .filter((l) => l.href !== '/')
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-gray-600 hover:text-orange-700 dark:text-gray-300"
              >
                {l.title}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
