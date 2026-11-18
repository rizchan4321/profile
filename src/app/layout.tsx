import type { Metadata, Viewport } from "next";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://rizkirmdan.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Muhammad Rizki Rahmadhan",
    "Electrical Engineering",
    "Electrical Maintenance",
    "PLC HMI",
    "IoT",
    "ESP32",
    "YOLOv8",
    "MediaPipe",
    "Next.js",
    "POLTEKBA",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Balikpapan",
    addressRegion: "Kalimantan Timur",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Electrical Maintenance",
    "PLC & HMI",
    "Machine Learning",
    "Internet of Things",
    "Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${display.variable} min-h-dvh`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
