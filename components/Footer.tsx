"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";

/**
 * Footer (DESIGN.md §6) — versi compact.
 *
 *  - Border atas sobek kasar (jagged) via clip-path polygon — bukan garis
 *    lurus sempurna. Seperti sobekan halaman sketchbook.
 *  - Signature "AF" bergaya tangan (organik) — versi ramping, menggambar
 *    sendiri via pathLength saat masuk viewport. Setelah draw selesai,
 *    signature melayang halus (idle float) supaya tidak statis total.
 *    Bug lama "AE" (F punya stroke bawah) sudah diperbaiki: F hanya stem +
 *    2 crossbar, TANPA garis bawah horizontal.
 *  - Layout 2 kolom (sm+): kiri signature + copyright, kanan quick links +
 *    ikon sosial. Mobile: stack vertikal ringkas.
 *  - Ikon sosial doodle inline (GitHub/LinkedIn/Email), bukan Font Awesome.
 *  - Reduced motion → signature langsung tergambar penuh tanpa animasi.
 */
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/achmdfzn",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/achmdfzn",
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:halo@achmadfauzan.dev",
    icon: EmailIcon,
  },
] as const;

export function Footer() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <footer
      className="relative mt-16 bg-paper-dark pt-10"
      style={{
        // Border atas sobek: polygon dengan titik y tak beraturan.
        clipPath:
          "polygon(0 0, 4% 1.5%, 9% 0.5%, 14% 2%, 20% 0.8%, 26% 2.2%, 32% 1%, 39% 2.5%, 46% 1.2%, 53% 2.8%, 60% 1%, 67% 2.2%, 74% 1.5%, 81% 2.6%, 88% 1.2%, 94% 2.4%, 100% 1%, 100% 100%, 0 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-10">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          {/* ── Kiri: Signature + copyright ── */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, -3, 0] }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      y: {
                        duration: 4,
                        delay: 1.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      },
                    }
              }
            >
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 240 90"
              className="h-14 w-36 text-ink sm:h-16 sm:w-44"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.4 }}
            >
              {/*
               * Huruf A — kaki lengkung (bukan lurus), apex miring, crossbar miring.
               * Stroke mengalir dari kaki kiri naik ke apex, turun ke kaki kanan,
               * lalu crossbar terpisah.
               */}
              <motion.path
                d="M20 75 C 24 48, 32 20, 44 14 C 56 8, 70 16, 74 32 C 76 42, 75 60, 72 76 M30 50 C 38 47, 50 46, 62 49"
                fill="none"
                stroke="currentColor"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.9 }}
              />
              {/*
               * Huruf F — stem vertikal (sedikit wobble), terminal flourish hook di
               * bawah, 2 crossbar miring. TIDAK ADA stroke bawah horizontal →
               * membedakan F dari E (perbaikan bug "AE").
               */}
              <motion.path
                d="M120 12 C 120 30, 118 52, 120 72 C 121 80, 126 82, 130 78 C 132 76, 132 72, 130 70 M118 18 C 132 16, 152 15, 168 18 M118 40 C 130 38, 146 38, 158 41"
                fill="none"
                stroke="currentColor"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.9,
                  delay: prefersReducedMotion ? 0 : 0.7,
                }}
              />
            </motion.svg>
            </motion.div>

            {/* Copyright */}
            <p className="max-w-xs text-center font-handwritten text-sm leading-relaxed text-ink-muted sm:max-w-sm sm:text-left sm:text-base">
              Dibuat dengan kopi, banyak debugging, dan sedikit kewarasan.{" "}
              <span className="whitespace-nowrap">&copy; 2026 Achmad Fauzan.</span>
            </p>
          </div>

          {/* ── Kanan: Quick links + social ── */}
          <div className="flex flex-col items-center gap-5 sm:items-end">
            {/* Quick links */}
            <nav aria-label="Navigasi footer">
              <ul className="flex flex-wrap items-center justify-center gap-5 sm:justify-end sm:gap-7">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-handwritten text-base text-ink-soft underline decoration-ink/60 decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink sm:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Doodle divider squiggle — accent pemisah organik */}
            <svg
              aria-hidden="true"
              viewBox="0 0 160 12"
              preserveAspectRatio="none"
              className="h-2.5 w-28 text-ink/30"
            >
              <path
                d="M4 6 C 18 1, 32 11, 46 6 S 74 1, 88 6 S 116 11, 130 6 S 150 3, 156 6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>

            {/* Ikon sosial doodle */}
            <ul className="flex items-center gap-4 sm:gap-5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center text-ink-soft transition-transform hover:-translate-y-1 hover:text-ink sm:h-10 sm:w-10"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Ikon sosial doodle (SVG inline, gaya tangan) ── */

type IconProps = { className?: string };

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function EmailIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
