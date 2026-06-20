/**
 * Konstanta bersama untuk animasi & border doodle.
 *
 * Dulu tiap komponen mendeklarasikan `EASE_OUT_EXPO` dan
 * `ROUGH_BORDER_VARIANTS` sendiri-sendiri (duplikat 7× / 3×). Modul ini
 * jadi single source of truth — perubahan easing cukup di satu tempat.
 */

import type { Transition } from "framer-motion";

/**
 * Easing cubic-bezier "expo out" — gerakan yang cepat di awal lalu melambat
 * halus. Konsisten dengan estetika doodle: tidak kaku, tapi tetap punya "dan".
 * Bentuk tuple `[number, number, number, number]` agar lolos type Framer Motion.
 */
export const EASE_OUT_EXPO: Transition["ease"] = [0.16, 1, 0.3, 1];

/**
 * Varian class border rough yang dipakai berputar per index (i % length)
 * supaya kartu tidak identik — anti-slop (DESIGN.md §Motion & CLAUDE.md).
 */
export const ROUGH_BORDER_VARIANTS = [
  "rough-border",
  "rough-border-alt",
  "rough-border-soft",
] as const;
