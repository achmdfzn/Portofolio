"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionDivider } from "@/components/SectionDivider";

/**
 * About (DESIGN.md §3 — "The Me Canvas") — versi compact.
 *
 *  - Desain: sticky note / kertas sobek menempel di layar.
 *  - Pakai `.rough-border-alt` (variasi rough-border, kontras dengan Hero/Project).
 *  - Selotip dekoratif di sudut atas (pseudo-element div kecil).
 *  - Scroll reveal "unfold" via whileInView — bukan fade sederhana.
 *  - Reduced motion → fade statis, tanpa rotate unfold.
 */
export function About() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20"
    >
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 32, rotate: -3 }
        }
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: prefersReducedMotion ? 0.4 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative rough-border-alt border-2 border-ink bg-paper-soft px-6 py-7 shadow-[6px_6px_0_0_var(--color-ink)] sm:px-10 sm:py-9"
      >
        {/* Selotip dekoratif di sudut kiri atas */}
        <div
          aria-hidden="true"
          className="absolute -top-3 left-6 h-7 w-20 rotate-[-2deg] bg-highlighter-yellow/70 shadow-sm sm:-top-4 sm:h-8 sm:w-24"
        />
        {/* Selotip kedua di sudut kanan */}
        <div
          aria-hidden="true"
          className="absolute -top-2 right-8 h-5 w-12 rotate-[3deg] bg-highlighter-blue/50 shadow-sm sm:-top-3 sm:h-6 sm:w-16"
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
          className="font-handwritten text-lg text-ink-muted sm:text-xl"
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
          <h2 id="about-heading" className="mt-3 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Web development bukan sekadar{" "}
            <span className="highlight-yellow">menyatukan API &amp; UI</span>.
          </h2>

          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
            Saya percaya web development adalah tentang{" "}
            <span className="highlight-blue">menciptakan pengalaman</span>, bukan
            sekadar menyatukan API dan UI. Dengan{" "}
            <span className="highlight-blue">Supabase</span> sebagai fondasi data
            dan <span className="highlight-blue">FastAPI</span> untuk logika
            berat, saya memastikan{" "}
            <span className="highlight-pink">backend</span> sekuat{" "}
            <span className="highlight-pink">frontend</span>-nya. Setiap baris
            kode punya tujuan: performa yang bisa dirasakan, estetika yang
            diingat, dan arsitektur yang tidak disesali.
          </p>
        </motion.div>
      </motion.div>

      {/* Divider transisi ke section berikutnya (Project). */}
      <SectionDivider className="mt-12 sm:mt-16" />
    </section>
  );
}
