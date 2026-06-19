"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

/**
 * ThemeToggle — tombol bergaya doodle untuk switch Light/Dark mode.
 *
 *  - Ikon: matahari (light) ↔ bulan (dark), bergaya hand-drawn SVG.
 *  - Animasi rotate + scale saat toggle (reduced-motion → tanpa animasi).
 *  - `mounted` guard mencegah hydration mismatch: render placeholder neutral
 *    (sun outline) saat SSR, lalu ikon aktual setelah mount.
 *  - A11y: aria-label dinamis, aria-pressed untuk state toggle.
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Aktifkan ${isDark ? "light" : "dark"} mode` : "Toggle tema"}
      aria-pressed={mounted ? isDark : undefined}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-ink-soft"
    >
      <motion.svg
        key={mounted ? theme : "placeholder"}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        initial={
          prefersReducedMotion
            ? false
            : { rotate: -90, opacity: 0, scale: 0.6 }
        }
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      >
        {/* Sebelum mount → render sun outline (neutral). Setelah mount →
            ikon sesuai tema aktif. */}
        {!mounted || !isDark ? <SunIcon /> : <MoonIcon />}
      </motion.svg>
    </button>
  );
}

/* ── Sun doodle: circle + radiating rays ── */
function SunIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" />
      <line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
      <line x1="4.9" y1="19.1" x2="6.7" y2="17.3" />
      <line x1="17.3" y1="6.7" x2="19.1" y2="4.9" />
    </>
  );
}

/* ── Moon doodle: crescent ── */
function MoonIcon() {
  return (
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z" />
  );
}
