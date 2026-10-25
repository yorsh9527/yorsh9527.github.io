'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        aria-label="打开导航菜单"
        onClick={() => setOpen(true)}
        className="mobile-menu-trigger"
      >
        ☰
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-70">
        <div className="mobile-menu-backdrop" />
        <DialogPanel className="mobile-menu-panel">
          <DialogTitle className="mobile-menu-title">探索手记</DialogTitle>
          <button
            onClick={() => setOpen(false)}
            aria-label="关闭导航菜单"
            className="mobile-menu-close"
          >
            ✕
          </button>
          <nav>
            {headerNavLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.title}
              </Link>
            ))}
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  )
}
