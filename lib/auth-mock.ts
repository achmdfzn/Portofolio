"use client";

import type {
  AuthClient,
  AuthSession,
  AuthUser,
  SignInResult,
} from "@/lib/auth";

/**
 * Mock AuthClient — implementasi client-only tanpa backend.
 *
 * Tujuan fase frontend-first: seluruh alur login/logout/dashboard bisa
 * dicoba secara lokal sebelum Supabase aktif. State sesi disimpan di
 * localStorage + sebuah cookie flag (`af_auth=1`) yang dibaca middleware
 * Next.js untuk mengguard /dashboard.
 *
 * Catatan keamanan: ini BUKAN autentikasi sungguhan. Password hanya
 * di-hash supaya tidak tersimpan plaintext di repo/bundle; hash ini
 * sangat lemah (SHA-256 tanpa salt) dan mudah di-reverse untuk siapa
 * saja yang membaca source. JANGAN pakai password yang Anda pakai di
 * tempat lain. Setelah migrasi ke Supabase, file ini dihapus.
 *
 * Kontrak (signIn/signOut/getSession/getUser) identik dengan target
 * Supabase — lihat lib/auth.ts. Pemanggil tidak perlu berubah saat
 * impl di-swap.
 */

/* ── Konstanta penyimpanan ── */

const STORAGE_KEY = "af_session";
const COOKIE_FLAG = "af_auth";
const CHANGE_EVENT = "authchange";
const SESSION_TTL_DAYS = 7;

/**
 * Demo credentials. Dipakai juga sebagai hint di halaman /auth.
 * Password di-hash saat startup (lihat DEMO_PASSWORD_HASH di bawah) —
 * plaintext HANYA ada sebagai konstanta string, tidak disandingkan
 * dengan hash dalam payload login (bandingkan hash vs hash).
 */
const DEMO_EMAIL = "admin@achmdfauzan.dev";
const DEMO_PASSWORD = "portofolio2026";
const DEMO_USER: AuthUser = {
  id: "af-admin",
  email: DEMO_EMAIL,
  name: "Achmad Fauzan",
  role: "admin",
  lastSignInAt: new Date(0).toISOString(),
};

/**
 * Hash password demo, dihitung sekali saat modul pertama dimuat.
 * Pakai sinkron bukan di sini — getter di-resolve saat signIn dipanggil
 * (di dalam async function) supaya SubtleCrypto tersedia.
 */
let demoPasswordHashPromise: Promise<string> | null = null;
function getDemoPasswordHash(): Promise<string> {
  if (!demoPasswordHashPromise) {
    demoPasswordHashPromise = sha256(DEMO_PASSWORD);
  }
  return demoPasswordHashPromise;
}

/* ── Util: hashing & cookie ── */

/** SHA-256 hex digest via Web Crypto (browser & edge runtime). */
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Tulis cookie flag yang dibaca middleware (HttpOnly=false dgn sengaja). */
function setAuthCookie(expiresAt: Date): void {
  document.cookie = `${COOKIE_FLAG}=1; path=/; expires=${expiresAt.toUTCString()}; SameSite=Lax`;
}

/** Hapus cookie flag. */
function clearAuthCookie(): void {
  document.cookie = `${COOKIE_FLAG}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

/** Notifikasi komponen yang subscribe (via useSyncExternalStore di hook). */
function notifyChange(): void {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Hitung tanggal kedaluwarsa sesi dari sekarang. */
function computeExpiry(): Date {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_TTL_DAYS);
  return d;
}

/** Serialize + persist session ke localStorage, lalu set cookie flag. */
function persistSession(session: AuthSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // localStorage bisa diblok (private mode) — sesi hanya bertahan untuk
    // sesi tab ini. Cookie flag tetap diset supaya middleware mengizinkan
    // navigasi ke /dashboard selama tab terbuka.
  }
  setAuthCookie(new Date(session.expiresAt));
}

/** Baca + deserialize session dari localStorage. Validasi kedaluwarsa. */
function readStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (!session?.expiresAt) return null;
    // Kedaluwarsa → bersihkan.
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      clearStoredSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/** Hapus session dari localStorage tanpa menyentuh cookie/notifikasi. */
function clearStoredSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* abaikan */
  }
}

/* ── Implementasi AuthClient ── */

export const mockAuthClient: AuthClient = {
  async signIn(email, password): Promise<SignInResult> {
    // Simulasi latensi jaringan supaya state "submitting" terlihat.
    await new Promise((r) => setTimeout(r, 600));

    const normalized = email.trim().toLowerCase();
    const inputHash = await sha256(password);
    const expectedHash = await getDemoPasswordHash();

    if (normalized !== DEMO_EMAIL || inputHash !== expectedHash) {
      return {
        ok: false,
        error: "Email atau kata sandi salah. Periksa kembali.",
      };
    }

    const now = new Date();
    const session: AuthSession = {
      user: { ...DEMO_USER, lastSignInAt: now.toISOString() },
      expiresAt: computeExpiry().toISOString(),
    };
    persistSession(session);
    notifyChange();
    return { ok: true, session };
  },

  async signOut(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    clearStoredSession();
    clearAuthCookie();
    notifyChange();
  },

  getSession(): AuthSession | null {
    return readStoredSession();
  },

  getUser(): AuthUser | null {
    return readStoredSession()?.user ?? null;
  },
};

/* ── Aksesori yang dipakai hook (subscribe + event name) ── */

export const AUTH_CHANGE_EVENT = CHANGE_EVENT;
export const AUTH_STORAGE_KEY = STORAGE_KEY;

/** Subscribe listener ke perubahan sesi. Return unsubscribe. */
export function subscribeAuth(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  // Reaktif terhadap perubahan tab/storage (login dari tab lain).
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) callback();
  });
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Demo credentials — diekspos untuk ditampilkan sebagai hint di /auth. */
export const DEMO_CREDENTIALS = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
} as const;
