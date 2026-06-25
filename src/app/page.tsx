"use client"

import React, { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { SectionHeading } from "@/components/section-heading"
import { ProjectGallery } from "@/components/project-gallery"
import { projects, profile } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

// Avoid the SSR warning while still preventing first-paint flicker.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Full motion only when the user has no reduced-motion preference.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: staggered intro (immediateRender hides items before paint).
        gsap.from(".hero-item", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        })

        // Section reveals on scroll.
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          })
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />

        <section id="projects" className="px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="reveal">
              <SectionHeading
                index="04"
                title="Projects"
                subtitle="Selected work across embedded systems, AI, and the web."
              />
            </div>
            <ProjectGallery projects={projects} />
          </div>
        </section>

        <Contact />
      </main>

      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with Next.js · Tailwind · GSAP
          </p>
        </div>
      </footer>
    </div>
  )
}
