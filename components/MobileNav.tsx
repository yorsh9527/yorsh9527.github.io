'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button aria-label="打开导航菜单" onClick={() => setOpen(true)} className="p-2 md:hidden">
        ☰
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-70">
        <div className="fixed inset-0 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#faf9f6] p-8 dark:bg-gray-950">
          <DialogTitle className="mb-8 text-xl font-bold">探索手记</DialogTitle>
          <button
            onClick={() => setOpen(false)}
            aria-label="关闭导航菜单"
            className="absolute top-7 right-7 p-2"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6">
            {headerNavLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-xl">
                {l.title}
              </Link>
            ))}
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  )
}
