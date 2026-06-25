import React from "react"
import { about } from "@/lib/content"
import { SectionHeading } from "@/components/section-heading"
import { MonoLabel } from "@/components/ui-elements"

export function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="reveal">
          <SectionHeading index="01" title="About" />
        </div>

        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
              {about.meta.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <dt>
                    <MonoLabel>{m.label}</MonoLabel>
                  </dt>
                  <dd className="text-sm text-foreground/90">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {about.highlights.map((h) => (
              <div
                key={h.code}
                className="group flex flex-col gap-2 bg-surface p-5 transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-xs font-medium text-accent">
                  {h.code}
                </span>
                <h3 className="text-sm font-bold leading-tight">{h.title}</h3>
                <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
