"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useReducedMotion, motion } from "framer-motion";

/**
 * DashboardNav — top bar minimal untuk route group (app).
 *
 * Tidak sticky (ikut document flow, scroll away), konsisten dengan
 * behavior Header portofolio di DESIGN.md §1.
 *
 * Isi: monogram AF + label "Dashboard" di kiri, theme toggle + tombol
 * logout di kanan. Back link ke beranda.
 */

export function DashboardNav() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const router = useRouter();
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <motion.nav
      aria-label="Navigasi dashboard"
      initial={prefersReducedMotion ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-b-2 border-ink bg-paper-soft"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 sm:px-8">
        {/* Kiri: branding + back */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Kembali ke beranda"
            className="flex items-center gap-2 text-ink transition-colors hover:text-ink-soft"
          >
            {/* Monogram kecil */}
            <svg
              viewBox="0 0 40 40"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="21" cy="19" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
              <text
                x="20"
                y="25"
                fontFamily="var(--font-kalam), 'Comic Sans MS', cursive"
                fontSize="14"
                fontWeight="bold"
                fill="currentColor"
                textAnchor="middle"
              >
                AF
              </text>
            </svg>
            <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              Dashboard
            </span>
          </Link>

          <span aria-hidden="true" className="h-5 w-px bg-ink/20" />

          <Link
            href="/"
            className="font-handwritten text-sm text-ink-muted transition-colors hover:text-ink sm:text-base"
          >
            ← Beranda
          </Link>
        </div>

        {/* Kanan: theme toggle + logout */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span aria-hidden="true" className="h-5 w-px bg-ink/20" />
          <button
            type="button"
            onClick={handleLogout}
            className="rough-border-soft border-2 border-ink bg-paper px-4 py-1.5 font-display text-xs font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-shadow hover:shadow-[5px_5px_0_0_var(--color-ink)] sm:text-sm"
          >
            Keluar
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
