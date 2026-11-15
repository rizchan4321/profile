import Image from "next/image"
import { heroTags, profile } from "@/lib/content"

// Chip positions around the hero image (desktop only; stacked on mobile).
const chipPos = [
  "md:left-[6%] md:top-[18%]",
  "md:right-[6%] md:top-[28%]",
  "md:left-[10%] md:bottom-[30%]",
  "md:right-[9%] md:bottom-[22%]",
]

export function Hero() {
  return (
    <section id="top" className="glow-ink relative overflow-hidden px-4 pb-16 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-6xl text-center">
        <p className="hero-item mx-auto inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/80">
          {profile.tagline}
        </p>

        <h1 className="hero-item mt-6 font-display text-[clamp(1.6rem,5vw,3.6rem)] font-semibold uppercase leading-[1.1] tracking-tight">
          Halo, saya {profile.shortName}
          <span className="block text-accent">{profile.role}</span>
        </h1>

        <p className="hero-item mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-on-ink-muted sm:text-base">
          {profile.summary}
        </p>

        <div className="hero-item relative mx-auto mt-10 max-w-5xl">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[4/3] sm:max-w-2xl">
            <Image
              src={profile.heroImage}
              alt="Pekerjaan troubleshooting dan perbaikan rangkaian elektronik"
              fill
              priority
              sizes="(min-width: 640px) 672px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-6 flex flex-wrap justify-center gap-3 px-4">
              <a
                href="#projects"
                className="inline-flex h-12 items-center rounded-full bg-accent-strong px-6 text-sm font-semibold transition-colors hover:bg-accent"
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

          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:mt-0">
            {heroTags.map((tag, i) => (
              <li
                key={tag}
                className={`rounded-full bg-accent-strong px-3.5 py-1.5 text-xs font-medium shadow-lg shadow-black/30 md:absolute ${chipPos[i]}`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
