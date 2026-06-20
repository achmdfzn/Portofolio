"use client";

import { useReducedMotion, motion } from "framer-motion";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PhotoUploader } from "@/components/dashboard/PhotoUploader";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { useProfilePhoto } from "@/hooks/useProfilePhoto";
import { useAuth } from "@/hooks/useAuth";
import { PROJECTS } from "@/lib/projects";

/**
 * Halaman Dashboard — compose semua widget admin.
 *
 * Layout 2 kolom di desktop (content + sidebar), stack di mobile.
 * Semua section menggunakan doodle aesthetic — bukan dashboard SaaS
 * generik (anti-slop rules dari CLAUDE.md).
 *
 * Widget:
 *  1. WelcomeHeader — sapaan personal + waktu
 *  2. StatCard grid — 4 kartu stats doodle (project, sesi, tema, foto)
 *  3. PhotoUploader — upload foto profil (sinkron ke Hero)
 *  4. ProjectList — daftar project read-only
 */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Ikon SVG inline untuk stat cards ── */

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SunMoonIcon({ variant }: { variant: "sun" | "moon" }) {
  if (variant === "sun") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/* ── Halaman utama ── */

export default function DashboardPage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { hasCustomPhoto } = useProfilePhoto();
  const { user } = useAuth();

  const isDark =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10 sm:py-16"
    >
      {/* ── Welcome ── */}
      <WelcomeHeader />

      {/* ── Stats grid ── */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          index={0}
          value={PROJECTS.length}
          label="Project"
          icon={<FolderIcon />}
          accent="var(--color-highlighter-yellow)"
        />
        <StatCard
          index={1}
          value={user ? "Aktif" : "—"}
          label="Sesi Login"
          icon={<LockIcon />}
          accent="var(--color-highlighter-blue)"
        />
        <StatCard
          index={2}
          value={isDark ? "Gelap" : "Terang"}
          label="Tema Aktif"
          icon={<SunMoonIcon variant={isDark ? "moon" : "sun"} />}
          accent="var(--color-highlighter-pink)"
        />
        <StatCard
          index={3}
          value={hasCustomPhoto ? "Ada" : "Default"}
          label="Foto Profil"
          icon={<CameraIcon />}
          accent="var(--color-highlighter-yellow)"
        />
      </motion.div>

      {/* ── Konten: 2 kolom di desktop ── */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Kiri: Photo uploader */}
        <PhotoUploader />

        {/* Kanan: Project list */}
        <ProjectList />
      </div>
    </main>
  );
}
