"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useInertSiblings } from "@/hooks/useInertSiblings";

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
 *
 *  Accessibility (WCAG 4.2.1.1, 4.1.2.1):
 *  - role="dialog" + aria-modal="true" saat visible.
 *  - Focus trap di dalam dialog selama overlay aktif.
 *  - Sibling content (body children selain dialog) ditandai inert.
 *  - Focus dikembalikan ke trigger / skip-link setelah dialog ditutup.
 */

const SESSION_KEY = "intro-played";
const DRAW_DURATION = 0.9; // detik, durasi pathLength 0→1
const FADE_OUT_DURATION = 0.4; // detik, durasi overlay fade
const SKIP_HINT_DELAY = 0.6; // detik, kapan hint skip muncul

export function Intro() {
  const isMounted = useIsMounted();
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [exited, setExited] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // Focus trap: tab tetap di dalam dialog saat visible.
  useEffect(() => {
    if (!shouldShowIntro || !isVisible || !dialogRef.current) return;

    const dialog = dialogRef.current;

    // Auto-focus dialog saat muncul.
    dialog.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Trap: hanya fokusable element di dalam dialog.
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldShowIntro, isVisible]);

  // Inert siblings: tetap aktif selama overlay masih ada di DOM — yaitu saat
  // visible MAUPUN selama exit fade-out (AnimatePresence menahan node hingga
  // animasi `exit` selesai). Pakai manager ref-counted (hook) supaya tidak
  // konflik dengan inert milik Header mobile menu saat dua overlay transisi
  // bersamaan. `exited` baru true setelah onAnimationComplete exit.
  useInertSiblings(dialogRef, shouldShowIntro && isVisible && !exited);

  // Restore focus ke skip-link setelah dialog ditutup.
  useEffect(() => {
    if (shouldShowIntro && !isVisible) {
      const skipLink = document.querySelector<HTMLAnchorElement>(".skip-link");
      if (skipLink) skipLink.focus();
    }
  }, [shouldShowIntro, isVisible]);

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
          ref={dialogRef}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION }}
          onAnimationComplete={() => {
            // Fire sekali saat animasi exit selesai → lepas inert siblings.
            // (Animasi entrance tidak memicu ini karena tanpa `exit` flag.)
            if (!isVisible) setExited(true);
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper cursor-pointer"
          onClick={handleSkip}
          role="dialog"
          aria-modal="true"
          aria-label="Intro animasi — klik untuk skip ke konten utama"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSkip();
            }
            if (e.key === "Escape") handleSkip();
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
