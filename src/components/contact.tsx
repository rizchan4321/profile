"use client"

import React, { useState } from "react"
import { Mail } from "lucide-react"
import { profile } from "@/lib/content"
import { SectionHeading } from "@/components/section-heading"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

type Errors = Partial<Record<"name" | "email" | "message", string>>

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "LinkedIn", value: profile.links.linkedin.replace("https://", ""), href: profile.links.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github, Icon: GithubIcon },
]

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState("")

  const validateField = (field: keyof Errors, value: string): string => {
    if (field === "name" && !value.trim()) return "Name is required."
    if (field === "email") {
      if (!value.trim()) return "Email is required."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email."
    }
    if (field === "message" && value.trim().length < 10)
      return "Message should be at least 10 characters."
    return ""
  }

  const handleBlur = (field: keyof Errors) => {
    const msg = validateField(field, values[field])
    setErrors((e) => ({ ...e, [field]: msg || undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    ;(["name", "email", "message"] as const).forEach((f) => {
      const msg = validateField(f, values[f])
      if (msg) next[f] = msg
    })
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus("Please fix the highlighted fields.")
      return
    }
    const subject = values.subject || `Portfolio inquiry from ${values.name}`
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setStatus("Opening your email client…")
  }

  const fieldClass = (field?: keyof Errors) =>
    `w-full rounded-lg border bg-background px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-bright/30 ${
      field && errors[field] ? "border-red-500/70" : "border-border focus:border-accent-bright"
    }`

  return (
    <section id="contact" className="border-t border-border bg-surface/30 px-4 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        <div className="reveal">
          <SectionHeading index="05" title="Contact" />
          <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
            Tertarik berkolaborasi atau punya pertanyaan tentang proyek saya?
            Kirim pesan lewat form atau hubungi langsung.
          </p>

          <ul className="space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-3.5 transition-colors hover:border-accent-bright"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent transition-colors group-hover:bg-accent-bright group-hover:text-[#0a0a0b]">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-foreground/90">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="reveal space-y-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass("name")}
                placeholder="John Doe"
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClass("email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
              className={fieldClass()}
              placeholder="Project inquiry"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => handleBlur("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldClass("message")} resize-y`}
              placeholder="Tell me about your project…"
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent-bright font-bold text-[#0a0a0b] transition-transform hover:-translate-y-0.5"
          >
            Send Message
          </button>

          <p aria-live="polite" className="min-h-5 text-center text-xs text-muted-foreground">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
