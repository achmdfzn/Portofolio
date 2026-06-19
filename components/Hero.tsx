"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionDivider } from "@/components/SectionDivider";

/**
 * Hero (DESIGN.md §2) — Redesigned: Split + Multi-Panel Doodle Grid.
 *
 * Layout split dua kolom (desktop):
 *  - Kiri: headline besar bold + wavy underline + tagline + subtitle.
 *  - Kanan: grid 2×2 panel doodle SVG, tiap panel warna highlighter
 *    berbeda, rotasi beda, masuk staggered.
 *
 * Mobile: stack vertikal — teks di atas, grid di bawah.
 * Reduced motion: semua animasi dimatikan, elemen langsung tampil.
 *
 * Vibe: gabungan Kokahu (split, bold type) + Ninja Strike
 * (colorful panels, playful stagger).
 */

/* ── Panel config ── */
interface PanelConfig {
  id: string;
  bg: string;           // CSS custom property value untuk --panel-bg
  rotate: number;        // derajat rotasi
  label: string;        // aria-label
}

const PANELS: PanelConfig[] = [
  { id: "avatar",   bg: "var(--color-highlighter-yellow)", rotate: -2, label: "Doodle avatar inisial AF" },
  { id: "code",     bg: "var(--color-highlighter-blue)",   rotate: 3,  label: "Doodle code bracket" },
  { id: "lightbulb", bg: "var(--color-highlighter-pink)",   rotate: 2,  label: "Doodle bohlam ide" },
  { id: "terminal", bg: "var(--color-highlighter-blue)",   rotate: -3, label: "Doodle terminal prompt" },
];

/* ── Entrance easing ── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16 sm:py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32"
    >
      {/* ════════════════════════════════════════════════════════════════
       *  KOLAM KIRI: Copywriting
       * ════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-start lg:col-span-1">
        {/* Greeting */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE_OUT_EXPO }}
          className="font-handwritten text-xl text-ink-muted sm:text-2xl"
        >
          Halo, saya
        </motion.p>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-2 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          <span className="highlight-yellow">Achmad Fauzan</span>.
        </motion.h1>

        {/* Wavy underline */}
        <div className="mt-3 w-full max-w-sm sm:max-w-md lg:max-w-lg" aria-hidden="true">
          <svg
            viewBox="0 0 400 16"
            className="h-4 w-full text-ink sm:h-5"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M10 10 C 50 3, 90 14, 140 8 S 220 2, 280 9 S 350 4, 390 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.6,
                ease: EASE_OUT_EXPO,
              }}
            />
          </svg>
        </div>

        {/* Tagline */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.9,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-4 font-handwritten text-2xl text-ink-soft sm:text-3xl"
        >
          &ldquo;Menulis Kode. Menggambar Ide.&rdquo;
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 1.2,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-5 max-w-lg font-body text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Fullstack Developer yang membangun ekosistem digital dengan{" "}
          <span className="highlight-blue">FastAPI</span> &amp;{" "}
          <span className="highlight-blue">Next.js</span>. Bebas dari desain
          membosankan, fokus pada performa dan estetika.
        </motion.p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
       *  KOLAM KANAN: Grid 2×2 Doodle Panel
       * ════════════════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-1"
        aria-label="Panel-panel doodle keterampilan"
      >
        {PANELS.map((panel, i) => (
          <DoodlePanel
            key={panel.id}
            bg={panel.bg}
            rotate={panel.rotate}
            delay={prefersReducedMotion ? 0 : 0.3 + i * 0.15}
            floatIndex={i}
            prefersReducedMotion={prefersReducedMotion}
            ariaLabel={panel.label}
          >
            {panel.id === "avatar" && <DoodleAvatar />}
            {panel.id === "code" && <DoodleCode />}
            {panel.id === "lightbulb" && <DoodleLightbulb />}
            {panel.id === "terminal" && <DoodleTerminal />}
          </DoodlePanel>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          y: prefersReducedMotion ? 0 : [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.4, delay: prefersReducedMotion ? 0 : 1.6 },
          y: prefersReducedMotion
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
        }}
        className="col-span-2 mt-4 flex justify-center lg:mt-6"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-muted"
        >
          <path d="M12 5 L 12 19" />
          <path d="M5 13 L 12 19 L 19 13" />
        </svg>
      </motion.div>

      {/* Divider */}
      <SectionDivider className="col-span-2 mt-4" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  DoodlePanel — kartu panel berwarna highlighter
 * ═══════════════════════════════════════════════════════════════════════ */

interface DoodlePanelProps {
  children: React.ReactNode;
  bg: string;
  rotate: number;
  delay: number;
  /** Index panel (0–3) — digunakan untuk menghitung offset animasi floating idle. */
  floatIndex: number;
  prefersReducedMotion: boolean;
  ariaLabel: string;
}

function DoodlePanel({
  children,
  bg,
  rotate,
  delay,
  floatIndex,
  prefersReducedMotion,
  ariaLabel,
}: DoodlePanelProps) {
  return (
    <motion.div
      role="img"
      aria-label={ariaLabel}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 24, rotate: rotate * 2 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0, rotate }
          : {
              opacity: 1,
              y: [0, -5, 0],
              rotate,
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
              rotate: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
              // Floating idle: mulai setelah entrance selesai, repeat infinity.
              // Delay berbeda per panel supaya gerakan tidak sinkron (lebih organik).
              y: {
                duration: 3.5,
                delay: delay + 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.06, rotate: 0 }
      }
      className="doodle-panel rough-border aspect-square flex items-center justify-center overflow-hidden p-4 sm:p-6"
      style={{ "--panel-bg": bg } as React.CSSProperties}
    >
      <div className="h-full w-full">{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Doodle SVG Components (hand-drawn style)
 * ═══════════════════════════════════════════════════════════════════════ */

/** Lingkaran tangan + inisial AF */
function DoodleAvatar() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      {/* Lingkaran luar — solid */}
      <circle
        cx="60" cy="60" r="48"
        fill="none" stroke="currentColor" strokeWidth="3"
      />
      {/* Lingkaran dalam — dashed, sedikit meleset */}
      <circle
        cx="61" cy="59" r="48"
        fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeDasharray="4 6" opacity="0.5"
      />
      {/* Highlighter kuning di belakang inisial */}
      <rect
        x="30" y="40" width="60" height="36"
        rx="4" fill="var(--color-highlighter-yellow)" opacity="0.5"
      />
      {/* Inisial AF */}
      <text
        x="60" y="68"
        fontFamily="var(--font-kalam), 'Comic Sans MS', cursive"
        fontSize="34" fontWeight="bold" fill="currentColor"
        textAnchor="middle"
      >
        AF
      </text>
    </svg>
  );
}

/** Tag HTML/XML bergaya tangan */
function DoodleCode() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      {/* Bracket buka < */}
      <path
        d="M55 30 L30 60 L55 90"
        fill="none" stroke="currentColor" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Garis slash / */}
      <line
        x1="42" y1="95" x2="78" y2="25"
        stroke="currentColor" strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Bracket tutup > */}
      <path
        d="M65 30 L90 60 L65 90"
        fill="none" stroke="currentColor" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Bohlam tangan + garis cahaya */
function DoodleLightbulb() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      {/* Garis cahaya radiating */}
      <line x1="60" y1="12" x2="60" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="25" x2="40" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="25" x2="80" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="52" x2="32" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="52" x2="88" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bohlam body */}
      <path
        d="M40 55 C 40 35, 80 35, 80 55 L75 78 L45 78 Z"
        fill="none" stroke="currentColor" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Filamen */}
      <path
        d="M52 62 L60 48 L68 62"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Base */}
      <rect x="46" y="80" width="28" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="48" y="88" width="24" height="5" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="50" y="95" width="20" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

/** Terminal prompt + garis command */
function DoodleTerminal() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      {/* Terminal window */}
      <rect
        x="14" y="20" width="92" height="80" rx="6"
        fill="none" stroke="currentColor" strokeWidth="2.5"
      />
      {/* Title bar dots */}
      <circle cx="30" cy="32" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="40" cy="32" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="32" r="3" fill="currentColor" opacity="0.3" />
      {/* Separator line */}
      <line x1="14" y1="42" x2="106" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Prompt */}
      <text
        x="26" y="62"
        fontFamily="var(--font-space-grotesk), monospace"
        fontSize="14" fontWeight="600" fill="currentColor"
      >
        ~/af$ _
      </text>
      {/* Command line 1 */}
      <line x1="26" y1="78" x2="90" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Command line 2 */}
      <line x1="26" y1="92" x2="72" y2="92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
