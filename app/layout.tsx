import type { Metadata } from "next";
import { Kalam, Space_Grotesk, Inter } from "next/font/google";
import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

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
  return (
    <html
      lang="id"
      className={`${kalam.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Intro />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
