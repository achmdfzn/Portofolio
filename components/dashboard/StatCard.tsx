"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO, ROUGH_BORDER_VARIANTS } from "@/lib/motion";

/**
 * StatCard — kartu statistik bergaya doodle untuk dashboard.
 *
 * Border rough berputar per index (i % 3) supaya tidak identik —
 * anti-slop (DESIGN.md §Motion). Card menerima ikon SVG, angka,
 * label, dan warna highlighter sebagai prop.
 */

interface StatCardProps {
  index: number;
  value: string | number;
  label: string;
  icon: ReactNode;
  /** Warna highlighter accent — default kuning. */
  accent?: string;
}

export function StatCard({
  index,
  value,
  label,
  icon,
  accent = "var(--color-highlighter-yellow)",
}: StatCardProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const borderClass = ROUGH_BORDER_VARIANTS[index % ROUGH_BORDER_VARIANTS.length];

  return (
    <motion.div
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: 20, rotate: -2 }
      }
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      className={`${borderClass} border-2 border-ink bg-paper-soft p-5 shadow-[5px_5px_0_0_var(--color-ink)] transition-shadow hover:shadow-[8px_8px_0_0_var(--color-ink)] sm:p-6`}
    >
      {/* Ikon di atas accent strip (tinted bg, icon full opacity).
          Sebelumnya `opacity: 0.2` di parent ikut meredupkan icon — bug. */}
      <div className="relative mb-3 flex h-10 w-10 items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: accent, opacity: 0.2 }} />
        <div className="relative">{icon}</div>
      </div>

      {/* Angka */}
      <p className="font-display text-3xl font-bold text-ink sm:text-4xl">
        {value}
      </p>

      {/* Label */}
      <p className="mt-1 font-handwritten text-base text-ink-muted sm:text-lg">
        {label}
      </p>
    </motion.div>
  );
}
