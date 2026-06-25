import React from "react"
import { experience } from "@/lib/content"
import { SectionHeading } from "@/components/section-heading"

export function Experience() {
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="reveal">
          <SectionHeading index="03" title="Experience" />
        </div>

        <ol className="relative">
          {experience.map((exp, i) => (
            <li
              key={i}
              className="reveal relative border-l border-border pb-12 pl-8 last:pb-0"
            >
              {/* node */}
              <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent-bright bg-background" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {exp.period}
              </span>
              <h3 className="mt-2 text-xl font-bold">{exp.title}</h3>
              <p className="mt-0.5 text-sm font-medium text-foreground/70">
                {exp.company}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {exp.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
