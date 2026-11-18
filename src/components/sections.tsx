import Image from "next/image"
import { ArrowUpRight, Check, ChevronDown, Code2, Cpu, Download, ExternalLink, Wifi, Zap } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { credentials, experience, faqs, gallery, intro, workflow, projects, services, tools } from "@/lib/content"

function Heading({ title, center }: { title: string; center?: boolean }) {
  return (
    <h2
      className={`reveal font-display text-[clamp(1.35rem,3vw,2.1rem)] font-medium leading-tight tracking-tight ${
        center ? "mx-auto max-w-2xl text-center" : "max-w-xl"
      }`}
    >
      {title}
    </h2>
  )
}

export function Intro() {
  return (
    <section id="about" className="px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Heading title={intro.title} />

        <div className="about-photo relative mt-10">
          <div className="reveal parallax relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
            <Image src={intro.image} alt={intro.imageAlt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </div>
          {/* Overlaps the photo's top-right corner on desktop; sits below it on mobile. */}
          <div className="about-card relative z-10 mt-4 max-w-sm rounded-2xl bg-card p-5 shadow-xl shadow-black/10 md:absolute md:-top-16 md:right-6 md:mt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{intro.card.title}</h3>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-strong text-white">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{intro.card.text}</p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {intro.stats.map((s) => (
            <div key={s.label} className="reveal-item rounded-2xl bg-card p-5">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-accent-strong">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="px-4 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Heading title={workflow.title} />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="reveal parallax relative aspect-[4/5] overflow-hidden rounded-3xl md:sticky md:top-24">
            <Image src={workflow.image} alt={workflow.imageAlt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <ol className="space-y-6">
            {workflow.steps.map((step, i) => (
              <li key={step.title} className="reveal-item flex gap-5 rounded-3xl bg-card p-4 sm:p-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl sm:w-32">
                  <Image src={step.image} alt={step.alt} fill sizes="128px" className="object-cover" />
                </div>
                <div>
                  <span className="font-display text-2xl text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Tools() {
  // Two identical lists side by side; the track slides -50% (one list) and loops seamlessly.
  const list = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-12 pr-12">
      {tools.map((t) => (
        <li key={t} className="whitespace-nowrap font-display text-base font-semibold tracking-tight text-text/70 sm:text-lg">
          {t}
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-labelledby="tools-title" className="bg-paper-2 py-14">
      <h2 id="tools-title" className="px-4 text-center text-lg font-medium">Tools & Platform yang Saya Gunakan</h2>
      <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused]">
          {list()}
          {list(true)}
        </div>
      </div>
    </section>
  )
}

const serviceIcons = [Zap, Cpu, Wifi, Code2]

export function Services() {
  return (
    <section id="skills" className="px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Heading title="Keahlian teknis yang saya bawa ke setiap pekerjaan" />
          <a href="#contact" className="reveal inline-flex h-11 w-fit items-center rounded-full bg-accent-strong px-5 text-sm font-semibold text-white hover:bg-accent-hover">
            Diskusikan Kebutuhan
          </a>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[i]
            const featured = i === 1
            return (
              <li
                key={s.title}
                className={`reveal-item group flex min-h-64 flex-col rounded-3xl p-6 transition-colors ${
                  featured ? "bg-accent-strong text-white" : "bg-card hover:bg-white"
                }`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${featured ? "bg-white text-accent-strong" : "bg-ink text-white"}`}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold">{s.title}</h3>
                <p className={`mt-auto pt-6 text-sm leading-relaxed ${featured ? "text-white/90" : "text-muted"}`}>{s.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className="px-4 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Heading title="Explore project dan karya terbaru saya" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => {
            const wide = i === 0 || (i === projects.length - 1 && i % 2 === 1)
            return (
            <li
              key={p.title}
              className={`reveal-item group relative overflow-hidden rounded-3xl bg-ink text-white ${
                p.fullImage ? "flex flex-col sm:block" : "aspect-[4/5]"
              } ${
                wide ? "sm:aspect-[16/9] md:col-span-2 md:aspect-[21/9]" : "sm:aspect-[4/3]"
              }`}
            >
              <div className={p.fullImage ? "relative aspect-[3/2] sm:absolute sm:inset-0 sm:aspect-auto" : "absolute inset-0"}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes={wide ? "(min-width: 1152px) 1152px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
                style={p.focus ? { objectPosition: p.focus } : undefined}
              />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent ${p.fullImage ? "hidden sm:block" : ""}`} />
              <div className={`${p.fullImage ? "relative sm:absolute" : "absolute"} inset-x-0 bottom-0 p-5 sm:p-7`}>
                <p className="text-xs text-white/70">
                  {p.year ? `${p.category} · ${p.year}` : p.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-medium sm:text-xl">{p.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">{p.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px]">{t}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.download && (
                    <a href={p.download} download className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent-strong px-4 text-xs font-semibold hover:bg-accent-hover">
                      <Download size={14} aria-hidden="true" /> {p.downloadLabel}
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-ink hover:bg-white/85">
                      <GithubIcon size={14} /> Source
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-ink hover:bg-white/85">
                      <ExternalLink size={14} aria-hidden="true" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="bg-paper-2 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Heading title="Pengalaman kerja & magang" center />
        <p className="reveal mx-auto mt-3 max-w-xl text-center text-sm text-muted">
          Penempatan di lingkungan industri: oil & gas, alat berat, dan instalasi tenaga listrik.
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {experience.map((e) => (
            <li key={e.title} className="reveal-item overflow-hidden rounded-3xl bg-card">
              <div className="relative aspect-[16/10]">
                <Image src={e.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-accent-strong">{e.period}</p>
                <h3 className="mt-1.5 font-semibold">{e.title}</h3>
                <p className="text-sm text-muted">{e.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Credentials() {
  return (
    <section className="px-4 pb-20 sm:pb-24">
      <div className="reveal-band glow-ink -mx-4 px-4 pb-40 pt-16 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-display text-[clamp(1.3rem,3vw,2rem)] font-medium leading-tight">
            Mari wujudkan sistem yang andal bersama.
          </p>
          <a href="#contact" className="mt-6 inline-flex h-12 items-center rounded-full bg-accent-strong px-6 text-sm font-semibold hover:bg-accent-hover">
            Hubungi Saya
          </a>
        </div>
      </div>

      <div className="mx-auto -mt-28 max-w-6xl">
        <div className="rounded-3xl bg-paper p-5 sm:p-8">
          <Heading title="Sertifikasi & prestasi" center />
          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:items-center">
            {credentials.map((c) => {
              const featured = "featured" in c && c.featured
              return (
                <li
                  key={c.title}
                  className={`reveal-item reveal-scale flex flex-col rounded-3xl p-6 ${featured ? "bg-ink text-white md:py-10" : "bg-card"}`}
                >
                  <ul className="space-y-2.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        <span className={featured ? "text-white/85" : "text-muted"}>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-6 rounded-2xl p-4 ${featured ? "bg-accent-strong" : "bg-paper-2"}`}>
                    <p className={`text-xs ${featured ? "text-white/85" : "text-muted"}`}>{c.label}</p>
                    <p className="mt-1 font-display text-xl font-semibold">{c.title}</p>
                    <p className={`mt-0.5 text-xs ${featured ? "text-white/85" : "text-muted"}`}>{c.year}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="px-4 pb-24">
      <div className="mx-auto max-w-3xl">
        <Heading title="Pertanyaan yang sering diajukan recruiter" center />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="reveal-item group rounded-2xl bg-card px-5 transition-colors open:bg-ink open:text-white">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform group-open:rotate-180 group-open:bg-accent-strong">
                  <ChevronDown size={15} aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted group-open:text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 id="gallery-title" className="reveal font-display text-[clamp(1.35rem,3vw,2.1rem)] font-medium leading-tight tracking-tight">
          Dokumentasi & pencapaian
        </h2>
        <ul className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <li
              key={g.caption}
              className={`reveal-item group relative overflow-hidden rounded-3xl bg-ink ${i === 0 ? "col-span-2 row-span-2" : "wide" in g ? "col-span-2 md:col-span-1" : ""}`}
            >
              <Image
                src={g.image}
                alt={g.caption}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, " + ("wide" in g ? "100vw" : "50vw")}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 text-xs font-medium text-white sm:text-sm">{g.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
