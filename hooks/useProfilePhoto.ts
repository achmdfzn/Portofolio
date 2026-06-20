"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * useProfilePhoto — foto profil hero, reactive & hydration-safe.
 *
 * Foto disimpan sebagai data URL (base64) di localStorage. Dipakai bersama
 * oleh Hero (display) dan dashboard PhotoUploader (write). Kedua sisi auto
 * sinkron lewat CustomEvent("profilephotochange").
 *
 * Pola identik dengan hooks/useTheme.ts & hooks/useAuth.ts:
 *  - useSyncExternalStore: server snapshot selalu null (anti-mismatch).
 *  - mounted flag (false saat SSR) supaya Hero bisa render placeholder
 *    doodle AF sebelum hydrate, lalu swap ke foto asli tanpa flicker.
 *
 * Ketika foto null → Hero menampilkan doodle avatar AF default.
 */

const STORAGE_KEY = "af_profile_photo";
const CHANGE_EVENT = "profilephotochange";

function readClient(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServer(): string | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};
function useIsMountedClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useProfilePhoto() {
  const photo = useSyncExternalStore(subscribe, readClient, getServer);
  const mounted = useIsMountedClient();

  /** Simpan data URL foto. Dispatch event supaya Hero ikut update. */
  const setPhoto = useCallback((dataUrl: string | null) => {
    try {
      if (dataUrl) {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage penuh / diblok — abaikan; sesi ini tetap lihat perubahan
      // karena state komponen PhotoUploader sudah di-update optimistik.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    /** data URL foto, atau null (→ Hero pakai doodle AF default). */
    photo,
    /** true setelah mount client — untuk hindari hydration mismatch. */
    mounted,
    /** Tulis/hapus foto. */
    setPhoto,
    /** true bila user pernah set foto sendiri. */
    hasCustomPhoto: photo != null,
  };
}

/** Konstanta diekspos untuk dipakai komponen lain (mis. dashboard). */
export const PROFILE_PHOTO_STORAGE_KEY = STORAGE_KEY;
