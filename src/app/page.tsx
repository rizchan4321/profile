"use client"

import React, { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { Hero } from "@/components/hero"
import { Intro, Process, Tools, Services, Projects, Experience, Gallery, Credentials, Faq } from "@/components/sections"
import { Contact } from "@/components/contact"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// Avoid the SSR warning while still preventing first-paint flicker.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

const NAV_OFFSET = "top 64px"

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Full motion only when the user has no reduced-motion preference.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Buttery scroll on desktop; touch devices keep native scrolling.
        ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.1 })

        // Curtain: hero stays put while the light content slides up over it.
        const cover = { trigger: "#top", start: "bottom bottom", end: "bottom top", scrub: true }
        ScrollTrigger.create({ ...cover, pin: true, pinSpacing: false, scrub: false })
        gsap.to(".hero-inner", { scale: 0.88, opacity: 0.25, y: -60, ease: "none", scrollTrigger: cover })

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          })
        })

        // Lists/cards: items entering together rise one after another (per row on grids).
        gsap.set(".reveal-item", { opacity: 0, y: 70 })
        gsap.set(".reveal-scale", { scale: 0.92 })
        ScrollTrigger.batch(".reveal-item", {
          start: "top 88%",
          onEnter: (items) =>
            gsap.to(items, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.14, ease: "expo.out", overwrite: true }),
        })

        // About card slides in over the photo's corner, a beat after the photo.
        gsap.from(".about-card", {
          x: 80,
          opacity: 0,
          duration: 1.1,
          delay: 0.35,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-photo", start: "top 80%" },
        })

        // Dark CTA banner slides up and settles from a slight scale.
        gsap.from(".reveal-band", {
          y: 100,
          scale: 0.94,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".reveal-band", start: "top 90%" },
        })

        // Slow parallax drift inside framed images.
        gsap.utils.toArray<HTMLElement>(".parallax img").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.18 },
            { yPercent: 8, ease: "none", scrollTrigger: { trigger: img.parentElement, scrub: true } }
          )
        })
      })
    }, root)

    // In-page links: go through the smoother when it exists, native jump otherwise.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const target = a && document.querySelector(a.getAttribute("href")!)
      const smoother = ScrollSmoother.get()
      if (!target || !smoother) return
      e.preventDefault()
      smoother.scrollTo(target, true, NAV_OFFSET)
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root}>
      {/* Fixed UI must live outside the smoothed (transformed) content. */}
      <Navbar />
      <CommandPalette />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <div className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper shadow-[0_-30px_60px_rgba(0,0,0,0.45)]">
              <Intro />
              <Process />
              <Tools />
              <Services />
              <Projects />
              <Experience />
              <Gallery />
              <Credentials />
              <Faq />
              <Contact />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
