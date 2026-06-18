"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero (DESIGN.md §2).
 *
 *  - Split asimetris: kiri copywriting, kanan polaroid `rotate-3`.
 *  - Headline: "Halo, Saya Achmad Fauzan. Menulis Kode. Menggambar Ide."
 *    Nama diberi highlighter kuning (kuas di belakang teks).
 *  - Polaroid: next/image dengan float animation (y: [0,-8,0] loop 4s).
 *  - SVG arrow doodle melengkung dari headline ke polaroid + catatan
 *    tangan "Yep, ini saya!" — menggambar sendiri saat mount (pathLength).
 *  - Reduced motion: float dimatikan, arrow langsung tergambar penuh.
 *
 *  CATATAN FOTO: saat ini memakai placeholder doodle "AF". Ganti `src`
 *  di bawah menjadi "/hero-photo.jpg" setelah foto asli ditaruh di /public.
 *  (Ubah juga `width`/`height` sesuai rasio foto.)
 */
const HERO_PHOTO_SRC = "/hero-photo-placeholder.svg";
const HERO_PHOTO_WIDTH = 400;
const HERO_PHOTO_HEIGHT = 500;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Float keyframe untuk polaroid. Reduced motion → statis di y:0.
  const floatAnimate = prefersReducedMotion
    ? { y: 0 }
    : { y: [0, -8, 0] };

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-12 px-6 py-20 sm:py-28 lg:flex-row lg:items-center lg:gap-8 lg:py-32">
      {/* ── Kiri: copywriting ── */}
      <div className="relative w-full max-w-xl lg:w-1/2">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="font-handwritten text-xl text-ink-muted sm:text-2xl"
        >
          Halo, saya
        </motion.p>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.1,
          }}
          className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          <span className="highlight-yellow">Achmad Fauzan</span>.
          <br />
          Menulis Kode.
          <br />
          Menggambar Ide.
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.25,
          }}
          className="mt-8 max-w-md font-body text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Fullstack Developer yang membangun ekosistem digital dengan{" "}
          <span className="highlight-blue">FastAPI</span> &amp;{" "}
          <span className="highlight-blue">Next.js</span>. Bebas dari desain
          membosankan, fokus pada performa dan estetika.
        </motion.p>
      </div>

      {/* ── Kanan: polaroid melayang + arrow doodle ── */}
      <div className="relative w-full max-w-sm lg:w-1/2 lg:flex lg:justify-center">
        {/* Arrow doodle dari headline ke polaroid + catatan */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 200 160"
          className="pointer-events-none absolute -left-2 top-2 z-10 h-32 w-32 text-ink sm:-left-8 sm:h-40 sm:w-40 lg:-left-20 lg:top-0"
          initial="initial"
          animate="animate"
        >
          <motion.path
            d="M10 140 C 50 100, 90 60, 140 40"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.6,
            }}
          />
          {/* Ujung panah */}
          <motion.path
            d="M140 40 L 128 48 M 140 40 L 132 28"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 1.3,
              duration: 0.2,
            }}
          />
        </motion.svg>

        {/* Catatan tangan */}
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.5,
            duration: prefersReducedMotion ? 0 : 0.4,
          }}
          className="absolute -left-6 top-16 z-20 rotate-[-8deg] font-handwritten text-lg text-ink sm:text-xl lg:-left-16 lg:top-12"
        >
          &ldquo;Yep, ini saya!&rdquo;
        </motion.span>

        {/* Polaroid dengan float animation */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, rotate: 0 }}
          animate={{
            opacity: 1,
            rotate: 3,
            ...floatAnimate,
          }}
          transition={{
            opacity: {
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.4,
            },
            rotate: {
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.4,
            },
            y: prefersReducedMotion
              ? undefined
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
          }}
          className="rough-border-soft relative border-2 border-ink bg-paper-soft p-3 pb-14 shadow-[8px_8px_0_0_var(--color-ink)]"
        >
          <Image
            src={HERO_PHOTO_SRC}
            alt="Foto Achmad Fauzan — Fullstack Developer. Saat ini menampilkan placeholder doodle bertuliskan inisial AF."
            width={HERO_PHOTO_WIDTH}
            height={HERO_PHOTO_HEIGHT}
            priority
            className="rough-border-soft h-auto w-full border border-ink/20 bg-paper-dark"
          />
        </motion.div>
      </div>
    </section>
  );
}
