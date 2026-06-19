"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";
import { useInertSiblings } from "@/hooks/useInertSiblings";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Header (DESIGN.md §1, §Responsiveness).
 *
 *  - Monogram "AF" lingkaran tangan sebagai branding utama.
 *    Hover → nama "Achmad Fauzan" muncul dengan efek stroke-draw
 *    (mirip pena menulis, pathLength dari kiri ke kanan).
 *  - Container flat (tanpa shadow/blur) — ikut normal document flow,
 *    scroll away bersama konten. Tidak sticky.
 *  - Link desktop: tiap item punya scribble underline yang menggambar saat
 *    hover + magnetic pull sungguhan mengikuti kursor (framer-motion).
 *  - Mobile: tombol hamburger doodle toggle overlay full-screen dengan
 *    link besar bergaya tulisan tangan + nama statis.
 *  - Theme toggle (Light/Dark) di kanan, desktop & mobile.
 *  - Accessibility:
 *    - Focus ring tangan kasar (otomatis dari globals.css).
 *    - Tombol hamburger punya aria-expanded & aria-controls.
 *    - Mobile overlay: role="dialog", aria-modal, focus trap, Escape close,
 *      inert siblings, auto-focus item pertama.
 *    - aria-label pada <nav>.
 *  - Reduced motion: magnetic pull & animasi overlay diganti transisi
 *    instan (lihat prefersReducedMotion di bawah).
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // ── Keyboard: Escape menutup menu ──
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }

      // Focus trap: tab tetap di dalam dialog.
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // ── Auto-focus close button saat menu dibuka ──
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // ── Inert siblings saat menu terbuka ──
  useInertSiblings(menuRef, isOpen);

  return (
    <header className="px-4 pt-4 sm:pt-6">
      <motion.nav
        aria-label="Navigasi utama"
        initial={prefersReducedMotion ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="rough-border mx-auto flex max-w-5xl items-center justify-between gap-4 border-2 border-ink bg-paper-soft px-5 py-3 sm:px-8"
      >
        {/* Branding: Monogram + nama hover reveal (desktop) */}
        {/*
         * Hover reveal diatur di parent (motion.div whileHover) lalu disebarkan
         * ke child via variants. Sebelumnya whileHover dipasang di motion.span
         * yang pointer-events-none → hover tidak pernah trigger (bug).
         */}
        <motion.div
          className="relative flex items-center gap-3"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Achmad Fauzan — Beranda"
          >
            <MonogramIcon className="h-10 w-10" />
          </Link>

          {/* Nama reveal saat hover monogram — desktop only */}
          <motion.span
            className="pointer-events-none absolute left-14 hidden md:block"
            variants={{
              rest: { opacity: 0, width: 0 },
              hover: { opacity: 1, width: "auto" },
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              viewBox="0 0 220 32"
              className="h-8 overflow-visible"
              aria-hidden="true"
            >
              <motion.text
                x="0"
                y="24"
                fontFamily="var(--font-space-grotesk), sans-serif"
                fontSize="22"
                fontWeight="700"
                fill="var(--color-ink)"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  rest: {
                    pathLength: prefersReducedMotion ? 1 : 0,
                    fillOpacity: prefersReducedMotion ? 1 : 0,
                  },
                  hover: { pathLength: 1, fillOpacity: 1 },
                }}
                transition={{
                  pathLength: {
                    duration: prefersReducedMotion ? 0 : 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  fillOpacity: {
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : 0.5,
                  },
                }}
              >
                Achmad Fauzan
              </motion.text>
            </svg>
          </motion.span>
        </motion.div>

        {/* Nav links + theme toggle (>= md) */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <MagneticNavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
          {/* Divider doodle antara nav & toggle */}
          <span aria-hidden="true" className="h-6 w-px bg-ink/20" />
          <ThemeToggle />
        </div>

        {/* Controls mobile (< md): theme toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Buka menu navigasi"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center text-ink"
          >
            <HamburgerIcon open={isOpen} />
          </button>
        </div>
      </motion.nav>

      {/* Overlay mobile — dialog role dengan focus trap */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper md:hidden"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeMenu();
            }}
          >
            {/* Close button untuk aksesibilitas */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Tutup menu navigasi"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-ink"
            >
              <CloseXIcon />
            </button>

            {/* Nama branding statis di mobile overlay */}
            <Link
              href="/"
              onClick={closeMenu}
              className="font-display text-2xl font-bold tracking-tight text-ink"
            >
              Achmad Fauzan
            </Link>

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
 * Ikon Monogram "AF" dalam lingkaran tangan.
 * Reuse pola visual dari app/icon.svg: lingkaran + inisial "AF".
 */
function MonogramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      {/* Lingkaran tangan kasar */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="33"
        cy="31"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.5"
      />
      {/* Highlighter kuning di belakang inisial */}
      <rect
        x="18"
        y="22"
        width="28"
        height="18"
        fill="var(--color-highlighter-yellow)"
        opacity="0.6"
      />
      {/* Inisial AF */}
      <text
        x="32"
        y="40"
        fontFamily="var(--font-kalam), 'Comic Sans MS', cursive"
        fontSize="22"
        fontWeight="bold"
        fill="currentColor"
        textAnchor="middle"
      >
        AF
      </text>
    </svg>
  );
}

/**
 * Ikon 'X' untuk tombol close di mobile menu.
 */
function CloseXIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="text-ink"
    >
      <line
        x1="6"
        y1="6"
        x2="22"
        y2="22"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="6"
        x2="6"
        y2="22"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Link nav desktop dengan magnetic pull + scribble underline pada hover.
 *
 * Magnetic pull: link terisi geser ke arah kursor (±25% dari offset relatif
 * ke center elemen), halus via useSpring. Cocok dengan DESIGN.md §Motion.
 * Saat mouse keluar, snap kembali ke origin.
 *
 * Nonaktif saat prefers-reduced-motion → link statis, tetap ada scribble
 * underline (pathLength langsung penuh).
 */
function MagneticNavLink({ href, label }: { href: string; label: string }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);

  // Motion value untuk translasi magnetic; useSpring = follow halus.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Offset kursor relatif ke center elemen, skala 0.25 (pull ringan).
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

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
      <motion.span
        ref={ref}
        onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
        onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
        style={
          prefersReducedMotion ? undefined : { x: springX, y: springY }
        }
      >
        <Link
          href={href}
          className="relative inline-flex flex-col items-center font-display text-base font-medium text-ink"
        >
          <span>{label}</span>
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
