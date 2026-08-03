"use client"

import React, { useEffect, useRef, useState } from "react"
import { ArrowUpRight, RotateCcw, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react"
import type { Project, ProjectStatus } from "@/lib/content"
import { GithubIcon } from "@/components/icons"

const statusStyles: Record<ProjectStatus, string> = {
  DEPLOYED: "border-status/40 text-status",
  RESEARCH: "border-accent/40 text-accent",
  FREELANCE: "border-border-strong text-muted-foreground",
}

export function SpecCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const hasImages = project.images.length > 0
  const multi = project.images.length > 1

  const rootRef = useRef<HTMLDivElement>(null)
  const frontBtnRef = useRef<HTMLButtonElement>(null)
  const backBtnRef = useRef<HTMLButtonElement>(null)

  const step = (dir: 1 | -1) => {
    setImgIndex((i) => (i + dir + project.images.length) % project.images.length)
  }

  // Move focus to the visible face on flip — but only if focus was already
  // inside this card (so scrolling/mounting never steals focus).
  useEffect(() => {
    const root = rootRef.current
    if (!root || !root.contains(document.activeElement)) return
    if (flipped) backBtnRef.current?.focus()
    else frontBtnRef.current?.focus()
  }, [flipped])

  return (
    <div ref={rootRef} className="perspective-1000 h-[22rem]">
      <div
        className={`preserve-3d relative h-full w-full transition-transform duration-500 ease-out ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ---------- FRONT: spec sheet ---------- */}
        <button
          ref={frontBtnRef}
          type="button"
          onClick={() => setFlipped(true)}
          tabIndex={flipped ? -1 : 0}
          aria-hidden={flipped}
          aria-label={`Flip card to view ${project.title} preview`}
          className={`backface-hidden group absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors hover:border-accent-bright focus-visible:border-accent-bright focus-visible:outline-none ${
            flipped ? "pointer-events-none" : ""
          }`}
        >
          {/* Schematic header */}
          <div className="bg-scanlines bg-dotgrid relative flex h-36 items-center justify-center overflow-hidden border-b border-border bg-surface-2">
            {hasImages ? (
              <>
                {/* Decorative thumbnail; the project title remains the accessible label. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[0]}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/25" />
              </>
            ) : (
              <span className="select-none font-mono text-3xl font-bold tracking-widest text-border-strong transition-colors group-hover:text-accent/40">
                {project.id}
              </span>
            )}
            <span className={`absolute left-3 top-3 font-mono text-[10px] tracking-widest ${hasImages ? "text-white/80 drop-shadow" : "text-muted-foreground"}`}>
              {project.id} · {project.year}
            </span>
            <span
              className={`absolute right-3 top-3 rounded border bg-background/70 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider backdrop-blur-sm ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-accent-bright">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.stack.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent opacity-70 transition-opacity group-hover:opacity-100">
              flip to view <ArrowUpRight size={13} />
            </span>
          </div>
        </button>

        {/* ---------- BACK: actual preview ---------- */}
        <div
          aria-hidden={!flipped}
          className={`backface-hidden rotate-y-180 absolute inset-0 overflow-hidden rounded-xl border border-accent-bright/40 bg-[#0d0e11] ${
            flipped ? "" : "pointer-events-none"
          }`}
        >
          {/* Preview media (fills the card) */}
          <div className="bg-scanlines bg-dotgrid absolute inset-0 flex items-center justify-center bg-surface-2">
            {hasImages ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.images[imgIndex]}
                alt={`${project.title} preview ${imgIndex + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="px-6 text-center">
                <span className="block font-mono text-2xl font-bold tracking-[0.3em] text-border-strong">
                  {project.id}
                </span>
                <span className="mt-2 block font-mono text-[11px] text-muted-foreground">
                  {"// preview coming soon"}
                </span>
              </div>
            )}
          </div>

          {/* Image nav */}
          {multi && (
            <>
              <button
                type="button"
                tabIndex={flipped ? 0 : -1}
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-accent-bright hover:text-[#0a0a0b]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                tabIndex={flipped ? 0 : -1}
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-accent-bright hover:text-[#0a0a0b]"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Flip back */}
          <button
            ref={backBtnRef}
            type="button"
            tabIndex={flipped ? 0 : -1}
            onClick={() => setFlipped(false)}
            aria-label="Flip card back"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-accent-bright hover:text-[#0a0a0b]"
          >
            <RotateCcw size={16} />
          </button>

          {/* Bottom info overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-10">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] text-white/60">
              <span className="text-accent-bright">{project.id}</span>
              <span>·</span>
              <span>{project.status}</span>
            </div>
            <h3 className="text-base font-bold text-white">{project.title}</h3>
            <div className="mt-3 flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-white/80 transition-colors hover:text-accent-bright"
                >
                  <GithubIcon size={15} /> code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-white/80 transition-colors hover:text-accent-bright"
                >
                  <ExternalLink size={15} /> demo
                </a>
              )}
              {project.download && (
                <a
                  href={project.download}
                  download
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-bright transition-colors hover:text-white"
                >
                  <Download size={15} /> {project.downloadLabel ?? "installer"}
                </a>
              )}
              {!project.github && !project.demo && !project.download && (
                <span className="font-mono text-xs text-white/40">
                  {"// links coming soon"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
