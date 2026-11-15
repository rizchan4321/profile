"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Search,
  CornerDownLeft,
  Hash,
  Mail,
  Copy,
  Check,
} from "lucide-react"
import { navLinks, profile } from "@/lib/content"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

type Command = {
  id: string
  label: string
  hint: string
  group: "Navigation" | "Actions"
  keywords: string
  icon: React.ReactNode
  perform: () => void
  keepOpen?: boolean
}

const PROSE_INPUTS = ["INPUT", "TEXTAREA"]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    setCopied(false)
    restoreRef.current?.focus()
  }, [])

  const launch = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement
    setQuery("")
    setActive(0)
    setOpen(true)
  }, [])

  const go = useCallback(
    (href: string) => {
      const el = document.querySelector(href)
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    },
    []
  )

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navLinks.map((l) => ({
      id: `nav-${l.name}`,
      label: l.name,
      hint: "Jump to section",
      group: "Navigation",
      keywords: `${l.name} section goto`,
      icon: <Hash size={16} />,
      perform: () => go(l.href),
    }))

    const actions: Command[] = [
      {
        id: "email",
        label: "Email me",
        hint: profile.email,
        group: "Actions",
        keywords: "email mail contact message",
        icon: <Mail size={16} />,
        perform: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        keywords: "copy email clipboard",
        icon: copied ? <Check size={16} className="text-status" /> : <Copy size={16} />,
        keepOpen: true,
        perform: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          })
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: profile.links.github.replace("https://", ""),
        group: "Actions",
        keywords: "github code source repo",
        icon: <GithubIcon size={16} />,
        perform: () => window.open(profile.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: profile.links.linkedin.replace("https://", ""),
        group: "Actions",
        keywords: "linkedin network social",
        icon: <LinkedinIcon size={16} />,
        perform: () => window.open(profile.links.linkedin, "_blank", "noopener"),
      },
    ]

    return [...nav, ...actions]
  }, [go, copied])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords.toLowerCase().includes(q)
    )
  }, [commands, query])

  // Derive a safe index instead of storing an out-of-range one (the list
  // shrinks as the query narrows).
  const safeActive = active < filtered.length ? active : 0

  const run = useCallback(
    (cmd: Command | undefined) => {
      if (!cmd) return
      cmd.perform()
      if (!cmd.keepOpen) close()
    },
    [close]
  )

  // Global open shortcuts: ⌘K / Ctrl+K, and "/" outside inputs. Plus navbar event.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing =
        PROSE_INPUTS.includes(tag) || (e.target as HTMLElement)?.isContentEditable

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (open) close()
        else launch()
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault()
        launch()
      }
    }
    const onCustom = () => {
      if (open) close()
      else launch()
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("open-command-palette", onCustom)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("open-command-palette", onCustom)
    }
  }, [open, launch, close])

  // Focus input + lock scroll while open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(filtered.length, 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      run(filtered[safeActive])
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  let renderedGroup = ""

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm motion-safe:animate-[fade_0.15s_ease-out]"
        onClick={close}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/15 bg-ink-2 text-white shadow-2xl shadow-black/40 motion-safe:animate-[cmdk-pop_0.18s_ease-out]">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Search size={16} className="shrink-0 text-on-ink-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onListKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[safeActive] ? `cmdk-${filtered[safeActive].id}` : undefined}
            placeholder="Search sections & actions…"
            className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-on-ink-muted"
          />
          <kbd className="hidden shrink-0 rounded border border-white/10 bg-ink px-1.5 py-0.5 font-mono text-[10px] text-on-ink-muted sm:block">
            ESC
          </kbd>
        </div>

        {/* List */}
        <ul id="cmdk-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-1.5">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-xs text-on-ink-muted">
              No results for &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((cmd, i) => {
            const showGroup = cmd.group !== renderedGroup
            renderedGroup = cmd.group
            return (
              <React.Fragment key={cmd.id}>
                {showGroup && (
                  <li className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-ink-muted">
                    {cmd.group}
                  </li>
                )}
                <li
                  id={`cmdk-${cmd.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                    i === safeActive ? "bg-white/10 text-white" : "text-white/80"
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-on-ink-muted">
                    {cmd.icon}
                  </span>
                  <span className="flex-1 truncate">{cmd.label}</span>
                  <span className="truncate font-mono text-[11px] text-on-ink-muted">
                    {cmd.hint}
                  </span>
                  {i === safeActive && (
                    <CornerDownLeft size={13} className="shrink-0 text-accent" />
                  )}
                </li>
              </React.Fragment>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
