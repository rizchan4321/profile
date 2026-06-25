"use client"

import React, { useEffect, useRef } from "react"

/**
 * Cursor-reactive oscilloscope. Decorative (aria-hidden).
 * - rAF loop, DPR-aware, paused when tab hidden or canvas off-screen.
 * - Honors prefers-reduced-motion: renders a single static trace, no loop.
 * - Reads accent/status colors from CSS vars so it adapts to light/dark.
 */
export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    // Live state
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let running = false
    let time = 0

    // Pointer (normalised 0..1), eased toward target for smooth response.
    const pointer = { x: 0.5, y: 0.5, active: false }
    const target = { x: 0.5, y: 0.5 }

    // Theme colors, refreshed on theme change.
    let accent = "#f5a524"
    let status = "#a3e635"
    let muted = "rgba(138,138,130,0.5)"
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      accent = cs.getPropertyValue("--accent-bright").trim() || accent
      status = cs.getPropertyValue("--status-bright").trim() || status
      muted = cs.getPropertyValue("--muted-foreground").trim() || muted
    }
    readColors()
    const themeObserver = new MutationObserver(readColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const trace = (
      amp: number,
      freq: number,
      phase: number,
      color: string,
      alpha: number,
      lineWidth: number
    ) => {
      const mid = height / 2
      const cursorBoost = pointer.active ? 1 : 0.55
      ctx.beginPath()
      for (let px = 0; px <= width; px += 2) {
        const t = px / width
        // Envelope peaks near the cursor's X for a "probe" feel.
        const dx = t - pointer.x
        const env = pointer.active ? 0.6 + Math.exp(-(dx * dx) / 0.02) * 0.9 : 1
        const y =
          mid +
          Math.sin(t * freq + phase) *
            amp *
            env *
            cursorBoost *
            (0.6 + pointer.y * 0.8) +
          Math.sin(t * freq * 2.3 + phase * 1.4) * amp * 0.18
        if (px === 0) ctx.moveTo(px, y)
        else ctx.lineTo(px, y)
      }
      ctx.globalAlpha = alpha
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const drawProbe = () => {
      if (!pointer.active) return
      const x = pointer.x * width
      const mid = height / 2
      // Vertical probe line
      ctx.globalAlpha = 0.35
      ctx.strokeStyle = muted
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.globalAlpha = 1

      // Probe dot on the main trace
      const t = pointer.x
      const dotY =
        mid +
        Math.sin(t * 14 + time) * (height * 0.16) * (0.6 + pointer.y * 0.8)
      ctx.fillStyle = accent
      ctx.beginPath()
      ctx.arc(x, dotY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Oscilloscope readout (mono)
      const volts = (2 - pointer.y * 4).toFixed(2)
      const freqHz = Math.round(60 + pointer.x * 480)
      ctx.font =
        "11px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.fillStyle = muted
      ctx.textBaseline = "top"
      const label = `CH1  ${volts}V   ${freqHz}Hz`
      const lx = Math.min(Math.max(x + 10, 8), width - 130)
      ctx.fillText(label, lx, 10)
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      // Ease pointer toward target
      pointer.x += (target.x - pointer.x) * 0.08
      pointer.y += (target.y - pointer.y) * 0.08

      const amp = height * 0.16
      trace(amp * 0.7, 9, time * 0.6, status, 0.25, 1.25) // secondary lime
      trace(amp, 14, time, accent, 0.85, 1.75) // main amber
      drawProbe()
    }

    const loop = () => {
      time += 0.03
      render()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion.matches) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Pause when off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") start()
        else stop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.visibilityState === "visible") start()
      else stop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = (e.clientY - rect.top) / rect.height
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      target.x = 0.5
      target.y = 0.5
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion.matches) render() // redraw static frame
    })
    ro.observe(canvas)

    resize()
    if (reduceMotion.matches) {
      render() // single static frame
    } else {
      start()
    }

    const onMotionChange = () => {
      stop()
      if (reduceMotion.matches) render()
      else start()
    }
    reduceMotion.addEventListener("change", onMotionChange)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      reduceMotion.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  )
}
