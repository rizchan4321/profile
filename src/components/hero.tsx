"use client"

import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { heroSkills, profile } from "@/lib/content"

const MOBILE_LABELS = 6

// Run before paint so intro "from" states don't flash.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// The stage is a real CSS 3D scene: the photo is a plane at z=0, skill labels
// orbit on a horizontal circle (x/z), so they pass in front of and behind the photo.
export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLLIElement | null)[]>([])
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useIsoLayoutEffect(() => {
    const stage = stageRef.current
    const ring = ringRef.current
    if (!stage || !ring) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Orbit fade-in multiplier: labels/ring opacity is driven here, not by CSS,
    // because opacity on elements inside preserve-3d would flatten the scene.
    const intro = { a: reduce ? 1 : 0 }
    let angle = 0
    // Cached: reading offsetWidth every frame forced a layout per frame and made the scroll stutter.
    let w = stage.offsetWidth

    const place = () => {
      // Narrow screens: tighter orbit and only the first 6 labels (rest are max-sm:hidden).
      const narrow = w < 640
      const n = narrow ? MOBILE_LABELS : heroSkills.length
      const r = narrow ? w * 0.36 : Math.min(w * 0.46, 330)
      ring.style.width = ring.style.height = `${r * 2}px`
      ring.style.opacity = String(intro.a)
      labelRefs.current.forEach((el, i) => {
        if (!el || i >= n) return
        const t = angle + (i / n) * Math.PI * 2
        const z = Math.sin(t) * r
        el.style.transform = `translate(-50%, -50%) translate3d(${Math.cos(t) * r}px, 0, ${z}px)`
        el.style.opacity = String((0.55 + 0.45 * ((z / r + 1) / 2)) * intro.a)
      })
    }

    const onResize = () => {
      w = stage.offsetWidth
      place()
    }
    place()
    window.addEventListener("resize", onResize)
    if (reduce) return () => window.removeEventListener("resize", onResize)

    const ctx = gsap.context(() => {
      // Intro: title first, then the photo slides up over it with buttons + glow + orbit.
      gsap
        .timeline()
        .from(".hero-title", { y: -30, opacity: 0, duration: 1, stagger: 0.12, ease: "expo.out" })
        .from(".hero-photo", { y: 260, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.45")
        .from(".hero-fade", { opacity: 0, duration: 1.2, ease: "power2.out" }, "<0.2")
        .to(intro, { a: 1, duration: 1.2, ease: "power2.out" }, "<")
    }, rootRef)

    const tick = (_t: number, dt: number) => {
      if (pausedRef.current) return
      angle += dt * 0.00035
      place()
    }
    gsap.ticker.add(tick)

    // Mouse tilt on top of the base downward camera angle.
    const rotX = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3.out" })
    const rotY = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3.out" })
    gsap.set(stage, { rotationX: -14, rotationY: 0 })
    const onMove = (e: PointerEvent) => {
      rotY((e.clientX / window.innerWidth - 0.5) * 18)
      rotX(-14 - (e.clientY / window.innerHeight - 0.5) * 10)
    }
    window.addEventListener("pointermove", onMove)

    return () => {
      ctx.revert()
      gsap.ticker.remove(tick)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section ref={rootRef} id="top" className="glow-ink relative overflow-hidden px-4 pb-16 pt-28 text-white sm:pt-32">
      <div className="hero-inner mx-auto max-w-6xl text-center">
        <p className="hero-title mx-auto inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/80">
          {profile.name}, {profile.title} · {profile.location}
        </p>

        <h1 className="hero-title relative mt-6 font-display text-[clamp(1.6rem,5vw,3.6rem)] font-semibold uppercase leading-[1.1] tracking-tight">
          Halo, saya {profile.shortName}
          <span className="block text-accent">{profile.role}</span>
        </h1>

        {/* Negative margin pulls the photo up so it covers part of the title's second line. */}
        <div className="relative z-10 mx-auto -mt-24 h-[480px] max-w-4xl [perspective:1100px] sm:-mt-36 sm:h-[620px]">
          {/* Ambient glow behind the photo */}
          <div className="hero-fade absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl sm:h-96 sm:w-96" />

          <button
            type="button"
            onClick={() => {
              pausedRef.current = !paused
              setPaused(!paused)
            }}
            aria-pressed={paused}
            className="absolute bottom-2 right-0 z-20 min-h-11 rounded-full border border-white/15 px-4 text-xs text-on-ink-muted transition-colors hover:text-white motion-reduce:hidden"
          >
            {paused ? "Putar orbit" : "Jeda orbit"}
          </button>

          <div ref={stageRef} className="absolute inset-0 [transform:rotateX(-14deg)] [transform-style:preserve-3d]">
            {/* Orbit ring lying flat in the x/z plane, at chest height */}
            <div
              ref={ringRef}
              aria-hidden="true"
              className="absolute left-1/2 top-[52%] rounded-full border border-accent/50 shadow-[0_0_40px_rgba(255,91,31,0.25)] [transform:translate(-50%,-50%)_rotateX(90deg)]"
            />

            <div className="hero-photo absolute bottom-0 left-1/2 h-full w-[320px] -translate-x-1/2 sm:w-[420px]">
              <Image
                src={profile.photo}
                alt={`Foto ${profile.name}`}
                fill
                priority
                sizes="(min-width: 640px) 420px, 320px"
                className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
              />
            </div>

            {/* preserve-3d makes the <ul> the containing block, so it must fill the stage */}
            <ul aria-label="Keahlian utama" className="absolute inset-0 [transform-style:preserve-3d]">
              {heroSkills.map((skill, i) => (
                <li
                  key={skill}
                  ref={(el) => {
                    labelRefs.current[i] = el
                  }}
                  className={`${i >= MOBILE_LABELS ? "max-sm:hidden " : ""}absolute left-1/2 top-[52%] whitespace-nowrap rounded-full border border-white/15 bg-ink/80 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg shadow-black/40 backdrop-blur-sm will-change-transform sm:text-xs`}
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="hero-fade mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-on-ink-muted sm:text-base">
          {profile.summary}
        </p>

        <div className="hero-fade mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex h-12 items-center rounded-full bg-accent-strong px-6 text-sm font-semibold transition-colors hover:bg-accent-hover"
          >
            Lihat Project
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-white/85"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  )
}
