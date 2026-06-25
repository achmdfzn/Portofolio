"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe, reactive media query hook.
 *
 * Subscribe ke `change` event dari MatchMedia agar komponen re-render
 * saat viewport melewati breakpoint — bukan hanya snapshot sekali lalu
 * diam (bug sebelumnya: noopSubscribe → tidak reaktif).
 *
 * Pola:
 *  - Server snapshot: false (safe default — asumsi fitur nonaktif).
 *  - Client snapshot: baca `matches` terkini dari matchMedia.
 *  - subscribe: pasang/lepas listener `change` via addEventListener.
 *    Wajib di-memoize dengan useCallback — tanpa itu, tiap render
 *    membuat fungsi subscribe baru → useSyncExternalStore unsubscribe
 *    lalu re-subscribe (minor, tapi boros).
 *
 * Dipakai untuk menonaktifkan efek magnetic cursor di bawah breakpoint `md`
 * (DESIGN.md §Responsiveness), tanpa flicker hydration.
 *
 * Used by: Project.tsx (MagneticCard), Header.tsx (MagneticNavLink).
 */
export function useMediaQuery(query: string): boolean {
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
