// Single source of truth for portfolio content.
// NOTE: Links (github/demo) and screenshots are intentionally left empty where
// not confirmed — fill them in rather than inventing URLs.

export const profile = {
  name: "Muhammad Rizki Rahmadhan",
  role: "Electrical & Automation Engineer",
  tagline: "electrical · ai · iot",
  summary:
    "D3 Electrical Engineering student at POLTEKBA bridging embedded systems, AI/ML, and modern web — building intelligent hardware and real-time monitoring systems.",
  location: "Balikpapan, Kalimantan Timur, ID",
  status: "Available for opportunities",
  focus: "Embedded · AI · IoT",
  email: "muhrizkirahmadhan@gmail.com",
  links: {
    github: "https://github.com/rizchan4321",
    linkedin: "www.linkedin.com/in/rizkirmdan",
  },
} as const;

export const about = {
  paragraphs: [
    "Saya mahasiswa D3 Teknik Elektronika di Politeknik Negeri Balikpapan (POLTEKBA) dengan antusiasme tinggi pada integrasi sistem — menggabungkan perangkat keras dan kecerdasan buatan menjadi solusi yang benar-benar berjalan.",
    "Berlatar sistem tertanam dan otomatisasi, saya memperluas keahlian ke pengembangan web modern untuk membangun dashboard monitoring real-time yang intuitif dan andal.",
  ],
  meta: [
    { label: "LOCATION", value: profile.location },
    { label: "TARGET", value: "PT Evans Indonesia / PT Pertamina" },
    { label: "FOCUS", value: profile.focus },
  ],
  highlights: [
    { code: "HW", title: "Embedded Systems", detail: "ESP32, Arduino, PLC/HMI Schneider" },
    { code: "AI", title: "AI & Machine Learning", detail: "MediaPipe, YOLOv8, CNN, TinyML" },
    { code: "WEB", title: "Web Development", detail: "React, Next.js, Laravel, Tailwind" },
    { code: "CERT", title: "Certifications", detail: "Jr. Mobile & Web Dev, Power Installation" },
  ],
} as const;

export const skillGroups = [
  {
    code: "01",
    title: "Hardware & Automation",
    items: ["ESP32", "Arduino", "PLC Schneider", "HMI", "Sensor Integration", "Wearable Tech", "Sistem Elektrikal"],
  },
  {
    code: "02",
    title: "AI & IoT",
    items: ["MediaPipe", "YOLOv8", "CNN", "TinyML", "Q-Learning", "Fuzzy Logic", "Real-time Monitoring"],
  },
  {
    code: "03",
    title: "Software Development",
    items: ["React.js", "Next.js", "Laravel", "Tailwind CSS", "GSAP", "Python", "Figma"],
  },
] as const;

export const experience = [
  {
    period: "2025 — Present",
    title: "EPT POS (Point of Sale)",
    company: "PT Excelindo Perkasa Teknik",
    desc: "Developing and maintaining a robust POS system for internal operations — inventory management and real-time transaction tracking.",
  },
  {
    period: "2024",
    title: "POS System Development",
    company: "UMKM Ayam Geprek Saly",
    desc: "Custom POS solution for a local business to streamline sales, financial reporting, and order management.",
  },
  {
    period: "2023 — 2024",
    title: "Koordinator Divisi IPTEK",
    company: "HMJ RE — POLTEKBA",
    desc: "Organized technology events and workshops, fostering innovation among Electrical Engineering students.",
  },
] as const;

export type ProjectStatus = "DEPLOYED" | "RESEARCH" | "FREELANCE";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  year: string;
  summary: string;
  stack: string[];
  github?: string;
  demo?: string;
  download?: string;
  downloadLabel?: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "PRJ-001",
    title: "Emotion Estimation (Tugas Akhir)",
    status: "RESEARCH",
    year: "2025",
    summary:
      "Estimasi tingkat fokus & emosi anak menggunakan MediaPipe Face Mesh + CNN (weighted late fusion) untuk analisis perilaku real-time.",
    stack: ["MediaPipe", "CNN", "Python", "Deep Learning"],
    github: "https://github.com/rizchan4321/yolo-ADHD",
    download: "/downloads/PemantauanADHD-Setup-0.3.6.exe",
    downloadLabel: "installer 0.3.6",
    images: [],
  },
  {
    id: "PRJ-002",
    title: "SIGAP Safety Platform",
    status: "RESEARCH",
    year: "2026",
    summary:
      "Monitoring keselamatan pekerja tambang: YOLOv8 PPE detection, MediaPipe drowsiness detection, ESP32 wearable, & React dashboard.",
    stack: ["YOLOv8", "ESP32", "React.js", "IoT"],
    images: [],
  },
  {
    id: "PRJ-004",
    title: "Digital Wedding Invitation",
    status: "FREELANCE",
    year: "2024",
    summary:
      "Premium HTML/CSS landing page dengan GSAP animations, countdown timer, RSVP form, dan backsound musik.",
    stack: ["GSAP", "HTML/CSS", "JavaScript", "Animation"],
    images: [],
  },
  {
    id: "PRJ-005",
    title: "School Information System",
    status: "FREELANCE",
    year: "2025",
    summary:
      "Web-based application with a React/Next.js frontend and a Laravel backend API for school data management.",
    stack: ["React.js", "Next.js", "Laravel", "MySQL"],
    images: [],
  },
];

export const navLinks = [
  { code: "01", name: "About", href: "#about" },
  { code: "02", name: "Skills", href: "#skills" },
  { code: "03", name: "Experience", href: "#experience" },
  { code: "04", name: "Projects", href: "#projects" },
  { code: "05", name: "Contact", href: "#contact" },
] as const;
