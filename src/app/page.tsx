"use client"

import React, { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { Hero } from "@/components/hero"
import { Intro, Process, Tools, Services, Projects, Experience, Credentials, Faq } from "@/components/sections"
import { Contact } from "@/components/contact"

gsap.registerPlugin(ScrollTrigger)

// Avoid the SSR warning while still preventing first-paint flicker.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      // Full motion only when the user has no reduced-motion preference.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-item", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" })
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
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
        <Intro />
        <Process />
        <Tools />
        <Services />
        <Projects />
        <Experience />
        <Credentials />
        <Faq />
        <Contact />
      </main>
    </div>
  )
}
