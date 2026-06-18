"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * About (DESIGN.md §3 — "The Me Canvas").
 *
 *  - Desain: sticky note / kertas sobek menempel di layar.
 *  - Pakai `.rough-border-alt` (variasi, belum terpakai di Phase 1).
 *  - Selotip dekoratif di sudut atas (pseudo-element div kecil).
 *  - Scroll reveal "unfold" via whileInView — bukan fade sederhana.
 *  - Reduced motion → fade statis, tanpa rotate unfold.
 */
export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
    >
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 40, rotate: -3 }
        }
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: prefersReducedMotion ? 0.4 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative rough-border-alt border-2 border-ink bg-paper-soft px-8 py-10 shadow-[6px_6px_0_0_var(--color-ink)] sm:px-12 sm:py-14"
      >
        {/* Selotip dekoratif di sudut kiri atas */}
        <div
          aria-hidden="true"
          className="absolute -top-4 left-6 h-8 w-20 rotate-[-2deg] bg-highlighter-yellow/70 shadow-sm sm:-top-5 sm:h-9 sm:w-24"
        />
        {/* Selotip kedua di sudut kanan */}
        <div
          aria-hidden="true"
          className="absolute -top-3 right-8 h-6 w-14 rotate-[3deg] bg-highlighter-blue/50 shadow-sm sm:-top-4 sm:h-7 sm:w-16"
        />

        {/* Heading handwritten */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
          className="font-handwritten text-xl text-ink-muted sm:text-2xl"
        >
          Tentang saya
        </motion.p>

        {/* Paragraf utama — copywriting dari DESIGN.md §3 */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.25,
          }}
        >
          <h2 className="mt-4 font-display text-3xl font-bold leading-snug text-ink sm:text-4xl">
            Web development bukan sekadar{" "}
            <span className="highlight-yellow">menyatukan API &amp; UI</span>.
          </h2>

          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
            Saya percaya bahwa web development bukan sekadar menyatukan API dan
            UI, tapi tentang{" "}
            <span className="highlight-blue">menciptakan pengalaman</span>.
            Dengan Supabase sebagai fondasi data dan FastAPI untuk logika berat,
            saya memastikan{" "}
            <span className="highlight-pink">backend</span> sekuat{" "}
            <span className="highlight-pink">frontend</span>-nya.
          </p>

          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
            Setiap baris kode yang saya tulis punya tujuan: performa yang bisa
            dirasakan, estetika yang diingat, dan arsitektur yang tidak menyesal
            di kemudian hari.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
