import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

const SITE_URL = "https://achmadfauzan-six.vercel.app";
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Achmad Fauzan",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description:
    "Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering.",
  sameAs: [
    "https://github.com/achmdfzn",
    "https://linkedin.com/in/achmadfauzan",
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Achmad Fauzan — Software Engineer & AI Enthusiast",
    template: "%s — Achmad Fauzan",
  },
  description:
    "Portfolio of Achmad Fauzan — Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering. Building clean, modern, and impactful digital experiences.",
  openGraph: {
    title: "Achmad Fauzan — Software Engineer & AI Enthusiast",
    description:
      "Portfolio of Achmad Fauzan — Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering.",
    type: "website",
    url: SITE_URL,
    siteName: "Achmad Fauzan Portfolio",
  },
  icons: {
    icon: '/images/favicon.svg',
  },
  twitter: {
    card: "summary_large_image",
    title: "Achmad Fauzan — Software Engineer & AI Enthusiast",
    description:
      "Portfolio of Achmad Fauzan — Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(!t){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.dataset.theme=t})()`,
          }}
        />
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
