import React from "react"
import { ArrowRight, Download, MapPin } from "lucide-react"
import { profile } from "@/lib/content"
import { MonoLabel, StatusDot } from "@/components/ui-elements"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { SignalCanvas } from "@/components/signal-canvas"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Oscilloscope signal + dot field behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-dotgrid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-soft blur-[120px]" />
        <div className="absolute inset-x-0 top-1/2 h-[55%] -translate-y-1/2 opacity-70 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <SignalCanvas />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        {/* Availability chip */}
        <div className="hero-item mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
          <StatusDot tone="status" />
          <span className="font-mono text-xs tracking-wide text-foreground/80">
            {profile.status}
          </span>
        </div>

        <p className="hero-item mb-4 font-mono text-sm text-accent">
          <span className="text-muted-foreground">&gt;</span> {profile.tagline}
        </p>

        <h1 className="hero-item text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl">
          Muhammad Rizki
          <br />
          <span className="text-glow text-accent-bright">Rahmadhan</span>
        </h1>

        <p className="hero-item mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          D3 Electrical Engineering student at{" "}
          <span className="text-foreground">POLTEKBA</span>. Bridging{" "}
          <span className="text-foreground">Embedded Systems</span>,{" "}
          <span className="text-foreground">AI/ML</span>, and{" "}
          <span className="text-foreground">Modern Web</span>.
        </p>

        {/* CTAs */}
        <div className="hero-item mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#projects"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent-bright px-7 font-medium text-[#0a0a0b] transition-transform hover:-translate-y-0.5"
          >
            View My Work
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-strong bg-surface/50 px-7 font-medium text-foreground transition-colors hover:border-accent-bright"
          >
            Contact Me
          </a>
          <div className="ml-0 flex items-center gap-1 sm:ml-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="/downloads/PemantauanADHD-Setup-0.3.8.exe"
              download
              aria-label="Download installer Pemantauan ADHD Tugas Akhir versi 0.3.8"
              className="ml-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-3 font-mono text-xs font-medium text-accent-bright transition-colors hover:border-accent-bright hover:bg-accent-bright hover:text-[#0a0a0b]"
            >
              <Download size={16} />
              Download TA
            </a>
          </div>
        </div>

        {/* System-stats mono strip */}
        <dl className="hero-item mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-3">
          <div>
            <dt className="mb-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-accent" />
              <MonoLabel>Location</MonoLabel>
            </dt>
            <dd className="text-sm text-foreground/90">{profile.location}</dd>
          </div>
          <div>
            <dt className="mb-1.5">
              <MonoLabel>Focus</MonoLabel>
            </dt>
            <dd className="text-sm text-foreground/90">{profile.focus}</dd>
          </div>
          <div>
            <dt className="mb-1.5">
              <MonoLabel>Status</MonoLabel>
            </dt>
            <dd className="font-mono text-sm text-status">ONLINE</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
