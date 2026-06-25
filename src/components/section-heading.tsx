import React from "react"

interface SectionHeadingProps {
  index: string
  title: string
  subtitle?: string
  align?: "left" | "center"
}

/** Numbered, mono-prefixed section header: [01] // TITLE */
export function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <div
        className={`mb-3 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="font-mono text-sm font-medium text-accent">
          [{index}]
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
          {title}
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px w-full max-w-[7rem] bg-border-strong ${centered ? "mx-auto" : ""}`}
      />
    </div>
  )
}
