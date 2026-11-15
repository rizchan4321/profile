"use client"

import React, { useEffect, useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { navLinks, profile } from "@/lib/content"

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"))
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState("#top")

  // Scroll-spy: highlight the nav item for the section in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label={`${profile.name} — kembali ke atas`} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo; next/image adds nothing here */}
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-mr.png`} alt="Logo MR" width={64} height={40} className="h-9 w-auto" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`rounded-full px-3 py-2 text-[13px] transition-colors ${
                active === link.href ? "text-white" : "text-on-ink-muted hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-on-ink-muted transition-colors hover:text-white"
          >
            <Search size={17} />
          </button>
          <a
            href="#contact"
            className="hidden h-10 items-center rounded-full bg-accent-strong px-5 text-[13px] font-semibold transition-colors hover:bg-accent md:inline-flex"
          >
            Hubungi Saya
          </a>
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm text-white/85 hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex h-11 items-center justify-center rounded-full bg-accent-strong text-sm font-semibold"
          >
            Hubungi Saya
          </a>
        </div>
      )}
    </nav>
  )
}
