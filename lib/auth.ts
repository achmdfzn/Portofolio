/**
 * Kontrak autentikasi (interface) — source of truth untuk perilaku auth.
 *
 * Saat ini diimplementasikan oleh `lib/auth-mock.ts` (client-only, localStorage,
 * tanpa backend). Interface ini sengaja dibentuk mirip kontrak `@supabase/ssr`
 * (signInWithPassword, signOut, getUser) supaya saat Supabase diaktifkan
 * nanti, cukup ganti impl tanpa mengubah pemanggil di komponen/hook.
 *
 * Aman untuk diimpor dari Server Component (tidak ada akses DOM di sini).
 */

/** User yang sedang terautentikasi. Bentuk bidang menyusul Supabase User. */
export interface AuthUser {
  /** Internal id (mock: email dipakai sebagai id). */
  id: string;
  email: string;
  /** Nama tampilan untuk sapaan dashboard. */
  name: string;
  /** Role sederhana — memungkinkan pembatasan fitur di dashboard. */
  role: "admin" | "user";
  /** ISO timestamp login terakhir. */
  lastSignInAt: string;
}

/** Sesi aktif — dibaca hook & middleware. */
export interface AuthSession {
  user: AuthUser;
  /** ISO timestamp kedaluwarsa sesi (mock: 7 hari). */
  expiresAt: string;
}

/** Status permintaan sign-in — konsumsi AuthForm. */
export type AuthStatus = "idle" | "authenticated" | "unauthenticated";

/** Hasil signIn: sukses membawa session, gagal membawa pesan error. */
export type SignInResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: string };

export interface AuthClient {
  /** Login dengan email + password. Mengembalikan session bila valid. */
  signIn(email: string, password: string): Promise<SignInResult>;
  /** Hapus sesi aktif. */
  signOut(): Promise<void>;
  /** Baca sesi aktif saat ini (null bila belum login). */
  getSession(): AuthSession | null;
  /** Baca user aktif (null bila belum login). */
  getUser(): AuthUser | null;
}
