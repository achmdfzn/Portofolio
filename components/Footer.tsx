"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";

/**
 * Footer (DESIGN.md §6).
 *
 *  - Border atas sobek kasar (jagged) via clip-path polygon — bukan garis
 *    lurus sempurna. Seperti sobekan halaman sketchbook.
 *  - Quick links (dari lib/nav.ts) + ikon sosial doodle inline
 *    (GitHub/LinkedIn/Email sebagai SVG kecil, bukan Font Awesome).
 *  - Copyright: "Dibuat dengan kopi, banyak debugging, dan sedikit
 *    kewarasan. © 2026 Achmad Fauzan."
 *  - Signature "AF" menggambar sendiri via pathLength saat masuk viewport
 *    (whileInView). Reduced motion → langsung tergambar penuh.
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      className="relative mt-24 bg-paper-dark pt-16"
      style={{
        // Border atas sobek: polygon dengan titik y tak beraturan.
        clipPath:
          "polygon(0 0, 4% 1.5%, 9% 0.5%, 14% 2%, 20% 0.8%, 26% 2.2%, 32% 1%, 39% 2.5%, 46% 1.2%, 53% 2.8%, 60% 1%, 67% 2.2%, 74% 1.5%, 81% 2.6%, 88% 1.2%, 94% 2.4%, 100% 1%, 100% 100%, 0 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-10 sm:gap-12">
          {/* Signature "AF" menggambar saat masuk viewport */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 140 60"
            className="h-16 w-36 text-ink sm:h-20 sm:w-44"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.path
              d="M10 50 L 30 12 L 50 50 M 20 34 L 40 34"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            />
            <motion.path
              d="M70 12 L 70 50 M 70 12 L 110 12 M 70 30 L 100 30 M 70 50 L 110 50"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.6,
              }}
            />
          </motion.svg>

          {/* Quick links */}
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-handwritten text-lg text-ink-soft underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink sm:text-xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ikon sosial doodle */}
          <ul className="flex items-center gap-6 sm:gap-8">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center text-ink-soft transition-transform hover:-translate-y-1 hover:text-ink"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="max-w-md text-center font-handwritten text-base leading-relaxed text-ink-muted sm:text-lg">
            Dibuat dengan kopi, banyak debugging, dan sedikit kewarasan.{" "}
            <span className="whitespace-nowrap">&copy; 2026 Achmad Fauzan.</span>
          </p>
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
