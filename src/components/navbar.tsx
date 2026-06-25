"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, Search } from "lucide-react"
import { navLinks } from "@/lib/content"

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"))
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll-spy: highlight the nav item for the section in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#top"
            className="font-mono text-lg font-bold tracking-tight"
            aria-label="Back to top"
          >
            MRR<span className="text-accent-bright">_</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-xs transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-accent" : "text-border-strong group-hover:text-accent"
                    }
                  >
                    {link.code}
                  </span>
                  {link.name}
                </Link>
              )
            })}
            <button
              onClick={openPalette}
              aria-label="Open command palette"
              className="ml-2 inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface/50 px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent-bright hover:text-foreground"
            >
              <Search size={13} />
              <kbd className="rounded bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={openPalette}
              aria-label="Open command palette"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 font-mono text-sm hover:bg-surface-2"
              >
                <span className="text-accent">{link.code}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
