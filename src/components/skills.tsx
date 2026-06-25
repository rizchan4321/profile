import React from "react"
import { skillGroups } from "@/lib/content"
import { SectionHeading } from "@/components/section-heading"
import { SkillBadge } from "@/components/ui-elements"

export function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/30 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="reveal">
          <SectionHeading
            index="02"
            title="Skills"
            subtitle="A cross-stack toolkit spanning silicon to screen."
          />
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.code} className="reveal bg-surface p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="font-mono text-xs font-medium text-accent">
                  [{group.code}]
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wide">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <SkillBadge key={s} name={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
