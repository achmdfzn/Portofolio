import type { Metadata } from "next";
import { Kalam, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

/*
 * ThemeScript — anti-FOUC: set class .dark pada <html> SEBELUM React mount.
 *
 *  - Dijalankan synchronously di <head> (blocking) supaya tema benar dari
 *    frame pertama, tanpa flash tema putih.
 *  - Prioritas: localStorage("theme") → prefers-color-scheme.
 *  - suppressHydrationWarning di <html> diperlukan karena class .dark
 *    mungkin ditambah oleh script ini sebelum React hydrate.
 */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

/*
 * Tipografi doodle (DESIGN.md §Typography):
 *  - Handwritten: Kalam   → headline & catatan tangan
 *  - Display:     Space Grotesk → kontras tegas pada judul
 *  - Body:        Inter          → teks bersih yang mudah dibaca
 * Variabel CSS di-emit ke :root, dipetakan di globals.css @theme.
 */
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://achmadfauzan.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Achmad Fauzan - Fullstack Developer",
    template: "%s · Achmad Fauzan",
  },
  description:
    "Fullstack Developer yang membangun ekosistem digital dengan FastAPI & Next.js, didukung Supabase. Fokus pada performa, estetika, dan arsitektur yang solid.",
  keywords: [
    "Achmad Fauzan",
    "Fullstack Developer",
    "FastAPI",
    "Next.js",
    "Supabase",
    "Portofolio",
  ],
  authors: [{ name: "Achmad Fauzan" }],
  creator: "Achmad Fauzan",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Achmad Fauzan",
    title: "Achmad Fauzan - Fullstack Developer",
    description:
      "Fullstack Developer dengan FastAPI, Next.js, dan Supabase. Backend sekuat frontend.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Achmad Fauzan — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achmad Fauzan - Fullstack Developer",
    description:
      "Fullstack Developer dengan FastAPI, Next.js, dan Supabase.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * Root layout adalah shell paling luar untuk SEMUA route group:
   * (marketing), (auth), (app). Di sini hanya fondasi global — fonts,
   * theme anti-FOUC, background paper, dan skip-link. Chrome spesifik
   * per group (Header/Footer/Intro untuk marketing, dsb.) dipasang di
   * layout.tsx tiap route group supaya halaman seperti /auth dan
   * /dashboard tidak mewarisi Intro/Header/Footer portofolio publik.
   */
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${kalam.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a href="#main" className="skip-link">
          Langsung ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
