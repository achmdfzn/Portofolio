"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";

/**
 * Header (DESIGN.md §1, §Responsiveness).
 *
 *  - Floating pill melayang dengan rough-border + hard-offset shadow.
 *  - Branding "Achmad Fauzan" font-display, miring kasar.
 *  - Link desktop: tiap item punya scribble underline yang menggambar saat
 *    hover + magnetic pull ringan mengikuti kursor (framer-motion).
 *  - Mobile: tombol hamburger doodle toggle overlay full-screen dengan
 *    link besar bergaya tulisan tangan.
 *  - Accessibility: fokus ring tangan kasar (otomatis dari globals.css),
 *    tombol hamburger punya aria-expanded & aria-controls.
 *  - Reduced motion: magnetic pull & animasi overlay diganti transisi
 *    instan (lihat prefersReducedMotion di bawah).
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:pt-6">
      <motion.nav
        initial={prefersReducedMotion ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="rough-border mx-auto flex max-w-5xl items-center justify-between gap-4 border-2 border-ink bg-paper-soft/95 px-5 py-3 shadow-[6px_6px_0_0_var(--color-ink)] backdrop-blur-sm sm:px-8"
      >
        {/* Branding */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-lg font-bold tracking-tight text-ink rotate-[-1deg] transition-transform hover:rotate-0 sm:text-xl"
        >
          Achmad Fauzan
        </Link>

        {/* Nav desktop (>= md) */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <MagneticNavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        {/* Tombol hamburger mobile (< md) */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Buka menu navigasi"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
        >
          <HamburgerIcon open={isOpen} />
        </button>
      </motion.nav>

      {/* Overlay mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.1 + i * 0.08,
                  duration: prefersReducedMotion ? 0 : 0.4,
                }}
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="font-handwritten text-4xl text-ink underline decoration-ink decoration-2 underline-offset-8 sm:text-5xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Link nav desktop dengan magnetic pull + scribble underline pada hover.
 * Magnetic pull ringan (geser ±3px ke arah kursor) — bukan magnetic cursor
 * penuh; cukup memberi kesan "tertarik" tanpa JS tracking kompleks.
 */
function MagneticNavLink({ href, label }: { href: string; label: string }) {
  const prefersReducedMotion = useReducedMotion();

  // Variant path: tergambar saat hover parent, terhapus saat keluar.
  const pathVariants = {
    rest: { pathLength: prefersReducedMotion ? 1 : 0 },
    hover: { pathLength: 1 },
  };

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={href}
        className="group relative inline-flex flex-col items-center font-display text-base font-medium text-ink"
      >
        <motion.span
          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {label}
        </motion.span>
        {/* Scribble underline via pathLength pada hover parent. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-1.5 left-0 h-[8px] w-full text-ink"
        >
          <motion.path
            d="M2 5 C 20 1, 35 7, 50 4 S 75 2, 98 5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            variants={pathVariants}
            transition={{
              pathLength: { duration: prefersReducedMotion ? 0 : 0.4 },
            }}
          />
        </svg>
      </Link>
    </motion.span>
  );
}

/**
 * Ikon hamburger bergaya tangan: 3 garis SVG yang berubah jadi 'X'
 * saat menu terbuka.
 */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="text-ink"
    >
      {/* Garis atas */}
      <motion.line
        x1="4"
        y1="9"
        x2="24"
        y2="9"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        transition={{ duration: 0.25 }}
      />
      {/* Garis tengah */}
      <motion.line
        x1="4"
        y1="14"
        x2="24"
        y2="14"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Garis bawah */}
      <motion.line
        x1="4"
        y1="19"
        x2="24"
        y2="19"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  );
}
