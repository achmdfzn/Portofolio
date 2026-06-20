import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (middleware Next.js 16) — guard route /dashboard.
 *
 * Next 16 mengganti nama file konvensi `middleware.ts` → `proxy.ts`
 * (lihat https://nextjs.org/docs/messages/middleware-to-proxy). Pemindahan
 * ke proxy supaya build tidak lagi memancarkan deprecation warning.
 *
 * Strategi sederhana & zero-dependency: cek cookie flag `af_auth=1` yang
 * diset oleh lib/auth-mock.ts saat signIn berhasil. Cookie ini BUKAN
 * token aman (nilai tetap "1") — gunanya hanya memberi sinyal cepat ke
 * edge bahwa sesi mungkin valid, tanpa memanggil backend. Validasi
 * sesi sungguhan tetap dilakukan di client (hook useAuth membaca
 * localStorage + kedaluwarsa).
 *
 * Setelah migrasi ke Supabase SSR, file ini diganti dengan refresh
 * session Supabase (supabase.auth.getUser) — kontrak guard tidak berubah.
 *
 * Proxy berjalan di runtime edge (default), cocok untuk baca cookie.
 */

const PROTECTED_PREFIX = "/dashboard";
const AUTH_COOKIE = "af_auth";
const LOGIN_ROUTE = "/auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoggedIn = request.cookies.get(AUTH_COOKIE)?.value === "1";

  // 1. /dashboard tanpa sesi → arahkan ke /auth dengan param next.
  if (pathname.startsWith(PROTECTED_PREFIX) && !isLoggedIn) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_ROUTE;
    loginUrl.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  // 2. /auth saat sudah login → arahkan ke /dashboard (hindari login ulang).
  if (pathname === LOGIN_ROUTE && isLoggedIn) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = PROTECTED_PREFIX;
    dashUrl.search = "";
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Hanya jalankan untuk path yang relevan — ringan & cepat.
  matcher: ["/dashboard/:path*", "/auth"],
};
