"use client";

import { useEffect } from "react";

/**
 * Inert siblings manager — mencegah konflik inert antar overlay (Intro & Header
 * mobile menu) yang sama-sama memanipulasi `document.body.children`.
 *
 * MASALAH SEBELUM FIX:
 *  Intro.tsx & Header.tsx masing-masing `setAttribute("inert","")` lalu
 *  `removeAttribute("inert")` di cleanup. Karena tidak ada koordinasi, cleanup
 *  satu overlay bisa menghapus inert milik overlay lain yang masih aktif →
 *  sibling sempat jadi focusable/interaktif padahal seharusnya di-trap
 *  (race condition saat dua overlay transisi bersamaan).
 *
 * SOLUSI:
 *  Map global `lockCount` per elemen. Tiap overlay yang aktif menambah +1 saat
 *  mount/aktif; saat lepas, -1. Elemen dapat `inert` selama count > 0, dan baru
 *  kehapus saat count kembali 0. Dengan begini dua overlay bisa overlap tanpa
 *  saling clobber.
 *
 * PARAMETER:
 *  - excludeRef: ref ke overlay sendiri (di-skip agar tidak men-inert diri).
 *  - active: true → kunci sibling saat ini; false → lepas.
 */
const lockCount = new Map<HTMLElement, number>();

/** +1 lock untuk setiap sibling body selain `exclude`. */
function acquire(exclude: HTMLElement): HTMLElement[] {
  const siblings: HTMLElement[] = [];
  Array.from(document.body.children).forEach((child) => {
    if (child !== exclude && child instanceof HTMLElement) {
      siblings.push(child);
      lockCount.set(child, (lockCount.get(child) ?? 0) + 1);
      child.setAttribute("inert", "");
    }
  });
  return siblings;
}

/** -1 lock untuk sibling yang sebelumnya di-acquire; hapus `inert` di count 0. */
function release(siblings: HTMLElement[]): void {
  siblings.forEach((el) => {
    const next = (lockCount.get(el) ?? 0) - 1;
    if (next <= 0) {
      lockCount.delete(el);
      el.removeAttribute("inert");
    } else {
      lockCount.set(el, next);
      // count masih > 0 → overlay lain masih aktif, pertahankan inert.
    }
  });
}

export function useInertSiblings(
  excludeRef: React.RefObject<HTMLElement | null>,
  active: boolean
): void {
  useEffect(() => {
    // Tidak aktif → jangan acquire. Cleanup effect sebelumnya sudah melepas.
    if (!active) return;

    const exclude = excludeRef.current;
    if (!exclude) return;

    const siblings = acquire(exclude);
    return () => release(siblings);
    // active sebagai dependensi: re-acquire saat toggle true/false.
    // excludeRef adalah ref object stabil; .current dibaca di sini.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
