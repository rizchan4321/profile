"use client"

import React, { useState } from "react"
import { Mail } from "lucide-react"
import { navLinks, profile } from "@/lib/content"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

type Errors = Partial<Record<"name" | "email" | "message", string>>

const channels = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.links.github, Icon: GithubIcon },
]

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState("")

  const validateField = (field: keyof Errors, value: string): string => {
    if (field === "name" && !value.trim()) return "Nama wajib diisi."
    if (field === "email") {
      if (!value.trim()) return "Email wajib diisi."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid."
    }
    if (field === "message" && value.trim().length < 10) return "Pesan minimal 10 karakter."
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
      setStatus("Periksa kembali kolom yang ditandai.")
      return
    }
    const subject = values.subject || `Pesan dari ${values.name} (portfolio)`
    const body = `${values.message}\n\nDari: ${values.name} (${values.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setStatus("Membuka aplikasi email Anda…")
  }

  const fieldClass = (field?: keyof Errors) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 ${
      field && errors[field] ? "border-red-400" : "border-white/10 focus:border-accent"
    }`

  const input = (id: "name" | "email", label: string, type: string, placeholder: string) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-white/90">
        {label} <span className="text-accent">*</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id}
        value={values[id]}
        onChange={(e) => setValues((v) => ({ ...v, [id]: e.target.value }))}
        onBlur={() => handleBlur(id)}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        className={fieldClass(id)}
        placeholder={placeholder}
      />
      {errors[id] && (
        <p id={`${id}-error`} className="text-xs text-red-300">
          {errors[id]}
        </p>
      )}
    </div>
  )

  return (
    <section id="contact" className="glow-contact px-4 pb-8 pt-20 text-white sm:pt-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div className="reveal flex flex-col">
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-tight">
            Mari bekerja sama. Ceritakan kebutuhan Anda.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Terbuka untuk posisi di bidang electrical, maintenance, automation, dan IoT. Kirim pesan
            lewat form atau hubungi langsung.
          </p>

          <div className="mt-10 md:mt-auto">
            <h3 className="text-sm font-semibold">Follow & Kontak</h3>
            <ul className="mt-4 flex gap-3">
              {channels.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-strong transition-colors hover:bg-accent-hover"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 break-all text-sm text-white/75">{profile.email}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="reveal space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {input("name", "Nama", "text", "Nama Anda")}
            {input("email", "Email", "email", "nama@perusahaan.com")}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-sm font-medium text-white/90">
              Subjek
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
              className={fieldClass()}
              placeholder="Lowongan / kerja sama"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium text-white/90">
              Pesan <span className="text-accent">*</span>
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
              placeholder="Ceritakan kebutuhan Anda…"
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-red-300">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-strong font-semibold transition-colors hover:bg-accent-hover"
          >
            Kirim Pesan
          </button>

          <p aria-live="polite" className="min-h-5 text-center text-xs text-white/70">
            {status}
          </p>
        </form>
      </div>

      <footer className="reveal mx-auto mt-20 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <li key={l.name}>
              <a href={l.href} className="inline-flex min-h-11 items-center hover:text-white">
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </section>
  )
}
