import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { SOCIAL_LINKS } from "@/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

const SITE_URL = "https://achmadfauzan-six.vercel.app";

/** Structured data (JSON-LD) untuk rich snippet — PRD KF-007. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Achmad Fauzan",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description:
    "Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering.",
  sameAs: SOCIAL_LINKS.filter((link) => link.external).map((link) => link.href),
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
  metadataBase: new URL('https://achmadfauzan-six.vercel.app/'),
  title: "Achmad Fauzan",
  description:
    "Portfolio website of Achmad Fauzan — Informatics Engineering student focused on Web Development, AI/ML, and Software Engineering. Coming soon.",
  openGraph: {
    title: "Achmad Fauzan",
    description:
      "Portfolio website of Achmad Fauzan. Coming soon — something great is being built.",
    type: "website",
    url: "https://achmadfauzan-six.vercel.app/",
    siteName: "Achmad Fauzan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achmad Fauzan",
    description:
      "Portfolio website coming soon — something great is being built.",
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
