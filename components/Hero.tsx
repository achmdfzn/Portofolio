"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionDivider } from "@/components/SectionDivider";
import { useProfilePhoto } from "@/hooks/useProfilePhoto";

/**
 * Hero (DESIGN.md §2) — Redesign: Split + Polaroid Foto Profil.
 *
 * Layout split dua kolom (desktop):
 *  - Kiri: greeting + headline + wavy underline + tagline + subtitle +
 *    dua CTA (Lihat Dashboard ↗ / Lihat Project).
 *  - Kanan: polaroid foto profil miring, dengan selotip doodle di sudut.
 *    - Bila user sudah upload foto (lihat dashboard), tampilkan foto itu.
 *    - Bila belum, tampilkan doodle avatar AF sebagai default.
 *    - Idle-float halus supaya terasa hidup.
 *
 * Mobile: stack vertikal — teks di atas, polaroid di bawah.
 * Reduced motion: semua animasi dimatikan.
 */

/* ── Entrance easing (signature repo-wide) ── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { photo, mounted } = useProfilePhoto();

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-16 sm:py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32"
    >
      {/* ════════════════════════════════════════════════════════════════
       *  KOLAM KIRI: Copywriting + CTA
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
            delay: prefersReducedMotion ? 0 : 1.1,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-5 max-w-lg font-body text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Fullstack Developer yang membangun ekosistem digital dengan{" "}
          <span className="highlight-blue">FastAPI</span> &amp;{" "}
          <span className="highlight-blue">Next.js</span>. Bebas dari desain
          membosankan, fokus pada performa dan estetika.
        </motion.p>

        {/* CTA pair */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 1.3,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          {/* Primary: dashboard (hidden route) */}
          <Link
            href="/dashboard"
            className="rough-border group inline-flex items-center justify-center gap-2 border-2 border-ink bg-highlighter-yellow px-7 py-3 font-display text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] sm:text-lg"
          >
            Lihat Dashboard
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              ↗
            </span>
          </Link>
          {/* Secondary: anchor project */}
          <Link
            href="#projects"
            className="rough-border-alt inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-7 py-3 font-display text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] sm:text-lg"
          >
            Lihat Project
          </Link>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
       *  KOLAM KANAN: Polaroid Foto Profil
       * ════════════════════════════════════════════════════════════════ */}
      <div className="flex justify-center lg:col-span-1">
        <ProfilePolaroid
          photo={photo}
          mounted={mounted}
          prefersReducedMotion={prefersReducedMotion}
        />
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
 *  ProfilePolaroid — bingkai polaroid kasar + selotip doodle.
 *  Foto diganti via useProfilePhoto (di-set dari dashboard).
 *  Default: doodle avatar AF (jika belum upload).
 * ═══════════════════════════════════════════════════════════════════════ */

interface ProfilePolaroidProps {
  photo: string | null;
  mounted: boolean;
  prefersReducedMotion: boolean;
}

function ProfilePolaroid({
  photo,
  mounted,
  prefersReducedMotion,
}: ProfilePolaroidProps) {
  return (
    <motion.div
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: 24, rotate: -8 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0, rotate: -3 }
          : { opacity: 1, y: [0, -6, 0], rotate: -3 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO },
              rotate: { duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO },
              y: {
                duration: 4,
                delay: 1.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
      }
      whileHover={prefersReducedMotion ? undefined : { rotate: 0, scale: 1.02 }}
      className="relative"
    >
      {/* Selotip doodle di sudut atas ( dekorasi sketchbook ) */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-2deg] bg-highlighter-yellow/70 mix-blend-multiply"
        style={{
          clipPath:
            "polygon(2% 10%, 98% 0%, 96% 90%, 4% 100%)",
        }}
      />

      {/* Bingkai polaroid (recipe Polaroid.tsx) */}
      <div className="rough-border-soft relative w-64 border-2 border-ink bg-paper-soft p-3 pb-14 shadow-[8px_8px_0_0_var(--color-ink)] sm:w-72 sm:p-4 sm:pb-16 lg:w-80">
        {/* Area foto: rasio 1:1 */}
        <div className="rough-border-soft relative aspect-square w-full overflow-hidden border border-ink/20 bg-paper-dark">
          {/*
           * Render placeholder doodle selama SSR / sebelum mount untuk
           * hindari hydration mismatch (photo null di server). Setelah
           * mount, swap ke foto asli bila ada.
           */}
          {!mounted || !photo ? (
            <DoodleAvatar />
          ) : (
            <Image
              src={photo}
              alt="Foto profil Achmad Fauzan"
              fill
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 16rem"
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Caption tangan */}
        <p className="mt-3 text-center font-handwritten text-lg text-ink-soft sm:text-xl">
          ~ Achmad Fauzan ~
        </p>
      </div>

      {/* Selotip kecil di sudut bawah kanan */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -right-3 z-10 h-6 w-16 rotate-[6deg] bg-highlighter-pink/60 mix-blend-multiply"
        style={{
          clipPath: "polygon(4% 12%, 100% 0%, 92% 88%, 0% 96%)",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  DoodleAvatar — default foto profil (avatar doodle AF)
 *  Dipakai bila user belum upload foto.
 * ═══════════════════════════════════════════════════════════════════════ */

function DoodleAvatar() {
  return (
    <div className="flex h-full w-full items-center justify-center text-ink">
      <svg viewBox="0 0 120 120" className="h-full w-full p-6" aria-hidden="true">
        {/* Lingkaran luar — solid */}
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        {/* Lingkaran dalam — dashed, sedikit meleset */}
        <circle
          cx="61"
          cy="59"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />
        {/* Highlighter kuning di belakang inisial */}
        <rect
          x="30"
          y="40"
          width="60"
          height="36"
          rx="4"
          fill="var(--color-highlighter-yellow)"
          opacity="0.5"
        />
        {/* Inisial AF */}
        <text
          x="60"
          y="68"
          fontFamily="var(--font-kalam), 'Comic Sans MS', cursive"
          fontSize="34"
          fontWeight="bold"
          fill="currentColor"
          textAnchor="middle"
        >
          AF
        </text>
      </svg>
    </div>
  );
}
