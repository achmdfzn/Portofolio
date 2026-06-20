"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

/**
 * useTheme — manajemen Light/Dark mode tanpa FOUC.
 *
 *  - Tema default mengikuti preferensi sistem (prefers-color-scheme).
 *  - Pilihan user disimpan di localStorage("theme") → override sistem.
 *  - Class .dark di-toggle pada document.documentElement (<html>).
 *  - Supaya tidak ada "flash" tema saat hydration:
 *      1. Script inline blocking di <head> (lihat THEME_SCRIPT di layout)
 *         men-set class .dark SEBELUM React mount.
 *      2. Hook ini baca state aktual dari DOM via useSyncExternalStore —
 *         sinkron & reactive tanpa setState-dalam-effect (anti-pattern
 *         React 19). Notifikasi perubahan via CustomEvent("themechange").
 *
 *  Return value:
 *   - theme: "light" | "dark" (resolved, post-mount)
 *   - toggleTheme(): switch light ↔ dark + persist + notify
 *   - mounted: false saat SSR, true setelah mount — untuk render tombol
 *     yang benar tanpa hydration mismatch.
 */

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";

/** Baca tema yang sudah di-resolve dari <html> class (sumber kebenaran). */
function getResolvedThemeClient(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Server snapshot: default light (anti-mismatch; THEME_SCRIPT benarkan di client). */
function getResolvedThemeServer(): Theme {
  return "light";
}

/** Subscribe ke perubahan tema (CustomEvent dispatch oleh toggleTheme). */
function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function useTheme() {
  // useSyncExternalStore: baca tema aktual dari DOM, reactive terhadap toggle.
  const theme = useSyncExternalStore(
    subscribe,
    getResolvedThemeClient,
    getResolvedThemeServer
  );

  // mounted: gunakan fakta bahwa getServerSnapshot !== getClientSnapshot
  // setelah mount. Tapi lebih eksplisit: cek via resolved theme snapshot —
  // kita pakai store terpisah sederhana untuk flag mounted.
  const mounted = useIsMounted();

  const toggleTheme = useCallback(() => {
    const next: Theme =
      document.documentElement.classList.contains("dark") ? "light" : "dark";

    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage bisa diblok (private mode) — abaikan, tema tetap berlaku
      // untuk sesi ini saja.
    }
    // Beritahu subscriber (komponen toggle) untuk re-render.
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { theme, toggleTheme, mounted };
}
