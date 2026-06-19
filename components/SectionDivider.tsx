"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SectionDivider — visual transition antar section.
 *
 * Visual minimalis (1 gaya konsisten untuk 3 divider):
 *  - Garis wavy hand-drawn (pathLength draw on viewport)
 *  - Panah "↓" kecil di tengah (scale-in delayed)
 *
 * Dipakai di akhir Hero, About, Project. Contact tidak butuh
 * (section terakhir, langsung Footer).
 *
 * Accessibility: aria-hidden, reduced motion → langsung tergambar penuh.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={`flex w-full items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 60"
        className="h-12 w-32 text-ink sm:h-16 sm:w-48"
      >
        {/* Garis wavy */}
        <motion.path
          d="M10 25 C 40 15, 60 35, 90 25 S 140 15, 190 25"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Panah di bawah tengah */}
        <motion.path
          d="M100 38 L 100 50 M 94 44 L 100 50 L 106 44"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            pathLength: prefersReducedMotion ? 1 : 0,
            opacity: 0,
          }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            pathLength: {
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : 0.5,
            },
            opacity: {
              duration: 0.2,
              delay: prefersReducedMotion ? 0 : 0.4,
            },
          }}
        />
      </svg>
    </div>
  );
}
