// Single source of truth for portfolio content (synced with CV, Nov 2026).
// Stock photos in /public/images are from Unsplash (free license) — swap for real
// photos of your own work when available.

// Prefix for public assets (set when exporting for XAMPP; empty on the server).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const profile = {
  name: "Muhammad Rizki Rahmadhan",
  shortName: "Rizki",
  role: "Electrical & Automation Engineer",
  tagline: "Electrical · Automation · IoT",
  summary:
    "Lulusan D-III Teknik Elektronika POLTEKBA berpengalaman di electrical maintenance, troubleshooting, instalasi, dan sistem kontrol — dari panel 3 fasa dan PLC/HMI hingga IoT dan machine learning.",
  location: "Balikpapan, Kalimantan Timur",
  email: "Rizkirmdan7890@gmail.com",
  title: "A.Md.T",
  photo: base + "/images/rizki.png",
  links: {
    github: "https://github.com/rizchan4321",
    linkedin: "https://www.linkedin.com/in/rizkirmdan/",
  },
} as const

// Skills orbiting the hero photo (from CV).
export const heroSkills = [
  "PLC Schneider",
  "HMI Haiwell",
  "Motor 3 Fasa",
  "VSD / Inverter",
  "Panel Listrik",
  "IoT · ESP32",
  "Machine Learning",
  "Troubleshooting",
  "Preventive Maintenance",
  "Web Development",
] as const

export const intro = {
  title: "Membangun sistem kelistrikan yang andal dan cerdas untuk industri",
  image: base + "/images/lab.jpg",
  card: {
    title: "Siap Bekerja di Industri",
    text: "Pengalaman lapangan di Pertamina Hulu Mahakam, PT Trakindo Utama, dan instalasi tenaga listrik — dengan prosedur keselamatan kerja sebagai prioritas.",
  },
  stats: [
    { value: "3,68", label: "IPK D-III Teknik Elektronika" },
    { value: "3+", label: "Penempatan industri & magang" },
    { value: "#2", label: "IoT — KMIPN VIII 2026" },
  ],
} as const

export const workflow = {
  title: "Cara saya bekerja",
  image: base + "/images/schematic.jpg",
  steps: [
    { title: "Analisis & Diagram", text: "Membaca diagram kelistrikan, analisis dasar, dan menemukan akar masalah peralatan." },
    { title: "Instalasi & Integrasi", text: "Panel 3 fasa, PLC Schneider/Omron, HMI Haiwell, VSD, hingga perangkat IoT." },
    { title: "Maintenance & Improvement", text: "Preventive maintenance dan continuous improvement untuk menjaga keandalan." },
  ],
} as const

// Wordmarks shown in the "tools" strip (plain text, not official logos).
export const tools = ["Schneider PLC", "Omron", "Haiwell HMI", "ESP32", "Python", "Next.js"] as const

export const services = [
  {
    title: "Electrical Installation & Maintenance",
    text: "Instalasi panel listrik 3 fasa, kubikel, meteran ≥33.000 VA, protection system, dan pemeliharaan instalasi.",
  },
  {
    title: "PLC, HMI & Automation",
    text: "Pemrograman PLC Schneider & Omron, HMI Haiwell, VSD/inverter, dan pengujian motor 3 fasa.",
  },
  {
    title: "IoT & Machine Learning",
    text: "Perangkat IoT berbasis ESP32 dan sistem AI seperti MediaPipe + CNN untuk monitoring real-time.",
  },
  {
    title: "Web & Mobile Development",
    text: "Dashboard monitoring dan aplikasi bisnis dengan Next.js, Laravel, dan mobile programming (BNSP).",
  },
] as const

export type Project = {
  title: string
  category: string
  year: string
  summary: string
  stack: string[]
  image: string
  github?: string
  demo?: string
  download?: string
  downloadLabel?: string
}

export const projects: Project[] = [
  {
    title: "Pemantauan ADHD (Tugas Akhir)",
    category: "AI · Penelitian",
    year: "2026",
    summary:
      "Estimasi tingkat fokus & emosi anak ADHD dengan MediaPipe Face Mesh, CNN, dan sensor multimodal di Yayasan Daeng Mappacing Balikpapan.",
    stack: ["MediaPipe", "CNN", "Python", "Sensor Multimodal"],
    image: base + "/projects/pemantauan-adhd.jpeg",
    github: "https://github.com/rizchan4321/yolo-ADHD",
    download: base + "/downloads/PemantauanADHD-Setup-0.3.9.exe",
    downloadLabel: "Installer 0.3.9",
  },
  {
    title: "Instalasi Listrik & Otomasi",
    category: "Electrical",
    year: "2025",
    summary: "Implementasi instalasi listrik dan sistem otomasi di fasilitas industri.",
    stack: ["PLC", "HMI", "MCB", "Grounding"],
    image: base + "/images/electrician.jpg",
  },
  {
    title: "Point of Sale System",
    category: "Web · Freelance",
    year: "2024",
    summary: "Sistem kasir untuk UMKM Ayam Geprek Saly: penjualan, laporan keuangan, dan pesanan.",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    image: base + "/images/dashboard.jpg",
    demo: "https://bilgisa.id",
  },
]

export const experience = [
  {
    period: "Okt 2026 — Sekarang",
    title: "Facility Maintenance",
    company: "PT Aviako · PT Trakindo Utama",
    image: base + "/images/site-work.jpg",
    desc: "Maintenance sistem pendingin, pemasangan sensor limit crane Demag, pemeliharaan motor listrik, dan general facility maintenance.",
  },
  {
    period: "Sep — Des 2025",
    title: "Magang HVAC & WTP",
    company: "PT Beasco Jaya Mandiri · Pertamina Hulu Mahakam",
    image: base + "/images/industrial-motor.jpg",
    desc: "Troubleshooting AC split/inverter/cassette, pengujian motor 3 fasa dengan PLC Schneider & HMI Haiwell, dan preventive maintenance.",
  },
  {
    period: "Jul — Sep 2022",
    title: "Magang Instalasi Tenaga Listrik",
    company: "PT Nusa Jaya Mandiri",
    image: base + "/images/circuit.jpg",
    desc: "Troubleshooting kubikel termasuk penggantian CT, instalasi meteran ≥33.000 VA, dan pemeliharaan hingga penambahan daya.",
  },
] as const

// Rendered in the 3-card "plan" layout; `featured` gets the orange card.
export const credentials = [
  {
    label: "Sertifikasi BNSP",
    title: "Junior Web & Mobile",
    year: "2024 — 2025",
    items: ["Junior Web Developer (2024)", "Junior Mobile Programmer (2025)", "LSP Teknologi Digital"],
  },
  {
    label: "Prestasi",
    title: "Juara 2 IoT",
    year: "KMIPN VIII 2026",
    featured: true,
    items: ["Kategori Bisnis & Skalabilitas IoT", "Tim Rekayasa Tektrone — POLTEKBA", "Politeknik Negeri Ujung Pandang"],
  },
  {
    label: "Sertifikasi LSP",
    title: "Automation Maintenance",
    year: "2026",
    items: ["Junior Engineer — LSP POLTEKBA", "PKL Beasco: predikat Sangat Baik", "Prakerin NJM: predikat Sangat Puas"],
  },
] as const

export const faqs = [
  {
    q: "Bidang apa yang paling Anda kuasai?",
    a: "Electrical maintenance dan troubleshooting: panel 3 fasa, kubikel, motor listrik, PLC Schneider/Omron, HMI Haiwell, dan VSD.",
  },
  {
    q: "Apa latar belakang pendidikan Anda?",
    a: "D-III Teknik Elektronika, Politeknik Negeri Balikpapan (2023–2026, IPK 3,68) dan SMK Pangeran Antasari jurusan Teknik Instalasi Tenaga Listrik.",
  },
  {
    q: "Apakah punya pengalaman di lingkungan industri?",
    a: "Ya — facility maintenance di PT Trakindo Utama, magang HVAC & WTP di Pertamina Hulu Mahakam, dan instalasi tenaga listrik di PT Nusa Jaya Mandiri.",
  },
  {
    q: "Selain elektrikal, apa lagi yang bisa Anda kerjakan?",
    a: "Pengembangan perangkat IoT, machine learning (MediaPipe, CNN), serta web dan mobile — tersertifikasi BNSP.",
  },
] as const

export const navLinks = [
  { name: "Home", href: "#top" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "FAQ", href: "#faq" },
] as const
