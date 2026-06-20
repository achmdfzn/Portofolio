"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { AuthSession, AuthStatus } from "@/lib/auth";
import {
  mockAuthClient,
  subscribeAuth,
  DEMO_CREDENTIALS,
} from "@/lib/auth-mock";

/**
 * useAuth — akses sesi + action login/logout, reactive & hydration-safe.
 *
 * Pola identik dengan hooks/useTheme.ts:
 *  - useSyncExternalStore membaca sesi aktual dari client; server snapshot
 *    selalu null (anti-mismatch).
 *  - Perubahan sesi memancarkan CustomEvent("authchange") yang dilihat
 *    subscribeAuth → re-render otomatis di semua komponen pemakai hook.
 *  - `mounted` (false saat SSR, true setelah mount) dipakai untuk render
 *    placeholder yang benar (mis. tombol loading) tanpa hydration mismatch.
 *
 * Return:
 *  - user: AuthUser | null
 *  - session: AuthSession | null
 *  - status: "idle" | "authenticated" | "unauthenticated"
 *  - mounted: boolean
 *  - signIn(email, pw), signOut()
 */
function getServerSession(): AuthSession | null {
  return null;
}

/** Flag mounted via useSyncExternalStore (menghindari setState-dalam-effect). */
const noopSubscribe = () => () => {};
function useIsMountedClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}

export function useAuth() {
  const session = useSyncExternalStore(
    subscribeAuth,
    () => mockAuthClient.getSession(),
    getServerSession
  );
  const mounted = useIsMountedClient();

  const status: AuthStatus = session ? "authenticated" : "unauthenticated";

  const signIn = useCallback(
    (email: string, password: string) => mockAuthClient.signIn(email, password),
    []
  );
  const signOut = useCallback(() => mockAuthClient.signOut(), []);

  return {
    user: session?.user ?? null,
    session,
    status,
    mounted,
    signIn,
    signOut,
    /** Hint demo credentials — tampil di halaman /auth. */
    demoCredentials: DEMO_CREDENTIALS,
  };
}
