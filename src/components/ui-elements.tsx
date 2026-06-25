import React from "react"

/** Small uppercase mono label used for metadata / eyebrows. */
export function MonoLabel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground ${className}`}
    >
      {children}
    </span>
  )
}

/** Pulsing status dot — color carries meaning AND is paired with a label. */
export function StatusDot({
  tone = "status",
  className = "",
}: {
  tone?: "status" | "accent"
  className?: string
}) {
  const color = tone === "status" ? "bg-status" : "bg-accent-bright"
  return (
    <span className={`relative flex h-2.5 w-2.5 ${className}`} aria-hidden="true">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-60 motion-safe:animate-ping`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  )
}

/** Bracketed mono skill chip. */
export function SkillBadge({ name }: { name: string }) {
  return (
    <span className="group/badge inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-accent-bright hover:text-foreground">
      <span className="text-accent-bright transition-colors">[</span>
      {name}
      <span className="text-accent-bright transition-colors">]</span>
    </span>
  )
}
