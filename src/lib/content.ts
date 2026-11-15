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
  "PLC programing",
  "HMI Haiwell",
  "VSD / Inverter",
  "IoT Development",
  "Machine Learning",
  "Electrical Installation",
  "Automation Junior Engineer",
  "Web Development",
] as const

export const intro = {
  title: "Membangun sistem kelistrikan yang andal dan cerdas untuk industri",
  image: base + "/images/real/magang-beasco.jpg",
  imageAlt: "Foto bersama tim magang di PT Beasco Jaya Mandiri",
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
  image: base + "/images/real/cara-saya-bekerja.jpg",
  imageAlt: "Rizki mempresentasikan project di depan kelas",
  steps: [
    {
      title: "Analisis & Diagram",
      text: "Membaca diagram kelistrikan, menyusun ladder diagram, dan menemukan akar masalah peralatan.",
      image: base + "/images/real/ladder-diagram.jpg",
      alt: "Dokumentasi pembuatan ladder diagram",
    },
    {
      title: "Instalasi & Integrasi",
      text: "Panel 3 fasa, PLC Schneider/Omron, HMI Haiwell, VSD, hingga perangkat IoT.",
      image: base + "/images/real/plc-schneider-upload.jpg",
      alt: "Mengunggah program ladder ke PLC Schneider",
    },
    {
      title: "Maintenance & Improvement",
      text: "Preventive maintenance dan continuous improvement untuk menjaga keandalan.",
      image: base + "/images/real/sertifikasi-automation.jpg",
      alt: "Sertifikasi Automation Maintenance Junior Engineer",
    },
  ],
} as const

// Wordmarks shown in the "tools" strip (plain text, not official logos).
export const tools = [
  "Schneider PLC",
  "Omron",
  "Haiwell HMI",
  "ESP32",
  "Arduino IDE",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Next.js",
  "GitHub",
  "Azure VM",
] as const

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
  year?: string
  summary: string
  stack: string[]
  image: string
  /** CSS object-position for cropping portrait photos into wide tiles. */
  focus?: string
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
    image: base + "/images/real/mediapipe-tugas-akhir.jpg",
    focus: "center 8%",
    github: "https://github.com/rizchan4321/yolo-ADHD",
    download: base + "/downloads/PemantauanADHD-Setup-0.3.9.exe",
    downloadLabel: "Installer 0.3.9",
  },
  {
    title: "Alat Stunting AI",
    category: "AI · IoT · Juara 2 KMIPN VIII",
    year: "2026",
    summary:
      "Alat berbasis AI untuk stunting yang meraih Juara 2 IoT kategori Bisnis & Skalabilitas di KMIPN VIII 2026 bersama tim Rekayasa Tektrone.",
    stack: ["AI", "IoT", "Perakitan Hardware"],
    image: base + "/images/real/stunting-ai-perakitan.jpg",
  },
  {
    title: "Monitoring Suhu Ruang Server",
    category: "IoT",
    year: "2025",
    summary:
      "Sistem monitoring suhu & kelembaban ruang server secara lokal: perangkat dengan LCD mengirim data ke dashboard web real-time dengan riwayat dan ekspor CSV.",
    stack: ["IoT", "Sensor Suhu & Kelembaban", "LCD", "Web Dashboard"],
    image: base + "/images/real/monitoring-suhu-server.jpg",
  },
  {
    title: "Face Recognition dengan dlib",
    category: "Computer Vision",
    summary: "Penerapan pengenalan wajah menggunakan library dlib dengan Python.",
    stack: ["Python", "dlib", "Computer Vision"],
    image: base + "/images/real/face-recognition-dlib.jpg",
  },
  {
    title: "Prototipe Alat Pemadam Api Berbasis Fuzzy",
    category: "AI · Tugas Kecerdasan Buatan",
    summary: "Prototipe alat pemadam api dengan logika fuzzy, dibuat untuk tugas mata kuliah kecerdasan buatan.",
    stack: ["Fuzzy Logic", "Kecerdasan Buatan", "Prototipe"],
    image: base + "/images/real/pemadam-api-fuzzy.jpg",
  },
  {
    title: "Panel Pengujian Motor 3 Fasa",
    category: "Electrical",
    summary: "Perakitan panel untuk pengujian motor 3 fasa.",
    stack: ["Panel Listrik", "Motor 3 Fasa", "Wiring"],
    image: base + "/images/real/panel-motor-3fasa.jpg",
  },
  {
    title: "Alat Pencacah Pakan Ikan Tenaga Surya",
    category: "Pengabdian Masyarakat",
    summary:
      "Program Kemitraan Berdikari: meningkatkan produktivitas budidaya ikan lele dengan alat pencacah pakan bertenaga surya, didukung LPDP dan POLTEKBA.",
    stack: ["Tenaga Surya", "Motor Listrik", "Pemberdayaan UMKM"],
    image: base + "/images/real/kemitraan-banner.jpg",
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
    image: base + "/images/real/troubleshooting-ac-split.jpg",
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

// Activity photos (user-provided). First item is shown large.
export const gallery = [
  { image: base + "/images/real/kmipn-poster.jpg", caption: "Juara 2 IoT — KMIPN VIII 2026" },
  { image: base + "/images/real/penyerahan-juara-motor-listrik.jpg", caption: "Menyerahkan piala lomba motor listrik sebagai Koordinator IPTEK" },
  { image: base + "/images/real/kmipn-sertifikat.jpg", caption: "Sertifikat Juara 2 KMIPN VIII 2026" },
  { image: base + "/images/real/kemitraan-group.jpg", caption: "Program Kemitraan Berdikari" },
  { image: base + "/images/real/mobile-app.jpg", caption: "Pemrograman aplikasi mobile" },
] as const
