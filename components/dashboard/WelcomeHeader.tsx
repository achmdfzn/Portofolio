"use client";

import { useReducedMotion, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

/**
 * WelcomeHeader — sapaan personal di dashboard.
 *
 * Menampilkan nama user (dari sesi), waktu lokal singkat, dan tagline
 * motivasi bergaya tangan.
 */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Selamat pagi";
  if (h < 17) return "Selamat siang";
  if (h < 21) return "Selamat malam";
  return "Selamat malam";
}

function formatTime(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function WelcomeHeader() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { user } = useAuth();
  const name = user?.name ?? "Pengunjung";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
      className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
    >
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        <span className="highlight-yellow">{getGreeting()}</span>, {name} ✏️
      </h1>
      <p className="font-handwritten text-base text-ink-muted sm:text-lg">
        {formatTime(new Date())}
      </p>
    </motion.div>
  );
}
