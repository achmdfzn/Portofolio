"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * useSyncExternalStore memberi snapshot konsisten antara server & client:
 *  - server snapshot: false (asumsi fitur off → safe default untuk progressive enhancement)
 *  - client snapshot: hasil matchMedia.resolve queryString
 *
 * Dipakai untuk menonaktifkan efek magnetic cursor di bawah breakpoint `md`
 * (DESIGN.md §Responsiveness), tanpa flicker hydration.
 *
 * Used by: Project.tsx (MagneticCard).
 */
const noopSubscribe = () => () => {};

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia(query).matches, // client snapshot
    () => false // server snapshot
  );
}
