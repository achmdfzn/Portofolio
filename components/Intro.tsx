"use client";

import { useCallback, useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Intro (DESIGN.md §7 — Loading / Intro Sequence).
 *
 *  - Overlay full-screen (z-[100]) di atas semua konten.
 *  - Pena SVG menggambar inisial "AF" stroke demi stroke via pathLength.
 *  - Setelah tergambar, overlay fade out → konten muncul.
 *  - Duration maks 1.5 detik. Opsi skip: klik di mana saja.
 *  - Sekali per sesi: sessionStorage "intro-played" → pengunjung kembali
 *    tidak nonton ulang di sesi yang sama.
 *  - Reduced motion: langsung tampilkan "AF" statis, fade cepat ≤200ms.
 *  - Client-only render via useSyncExternalStore → mencegah hydration
 *    mismatch dengan Server Component di layout.tsx.
 */

const SESSION_KEY = "intro-played";
const DRAW_DURATION = 0.9; // detik, durasi pathLength 0→1
const FADE_OUT_DURATION = 0.4; // detik, durasi overlay fade
const SKIP_HINT_DELAY = 0.6; // detik, kapan hint skip muncul

/**
 * Client-only mount detector.
 * useSyncExternalStore returns `false` during SSR/hydration (snapshot = false),
 * then `true` after client mount (subscribe triggers re-read with snapshot = true).
 * This avoids calling setState inside useEffect (React 19 lint violation).
 */
const emptySubscribe = () => () => {};
function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );
}

export function Intro() {
  const isMounted = useIsMounted();
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Cek sessionStorage hanya setelah mount di client.
  const shouldShowIntro = isMounted && !sessionStorage.getItem(SESSION_KEY);

  // Timer: setelah animasi selesai, fade out overlay.
  useEffect(() => {
    if (!shouldShowIntro || !isVisible) return;

    const totalDuration = prefersReducedMotion
      ? 0.2 // Langsung fade cepat.
      : DRAW_DURATION + 0.15; // Draw + jeda singkat.

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, totalDuration * 1000);

    // Timer: tampilkan hint skip setelah delay.
    const skipTimer = setTimeout(
      () => setShowSkip(true),
      SKIP_HINT_DELAY * 1000
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(skipTimer);
    };
  }, [shouldShowIntro, isVisible, prefersReducedMotion]);

  const handleSkip = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, []);

  // Jangan render di SSR atau jika intro sudah pernah dimainkan.
  if (!shouldShowIntro) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper cursor-pointer"
          onClick={handleSkip}
          role="button"
          tabIndex={0}
          aria-label="Intro — klik untuk skip"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSkip();
          }}
        >
          {/* Inisial "AF" menggambar sendiri */}
          <svg
            viewBox="0 0 160 70"
            className="h-28 w-64 text-ink sm:h-36 sm:w-80"
            aria-hidden="true"
          >
            {/* Huruf A */}
            <motion.path
              d="M15 65 L 40 10 L 65 65 M 25 42 L 55 42"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : DRAW_DURATION,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {/* Huruf F */}
            <motion.path
              d="M85 10 L 85 65 M 85 10 L 135 10 M 85 38 L 120 38"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : DRAW_DURATION,
                ease: [0.16, 1, 0.3, 1],
                delay: prefersReducedMotion ? 0 : DRAW_DURATION * 0.4,
              }}
            />
          </svg>

          {/* Hint skip — muncul setelah delay */}
          {showSkip && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 font-handwritten text-base text-ink-muted sm:text-lg"
            >
              klik di mana saja untuk skip
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
