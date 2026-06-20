import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

/**
 * Halaman /auth — pintu masuk tersembunyi ke dashboard.
 *
 *  - TIDAK terdaftar di nav (lib/nav.ts) maupun sitemap.
 *  - robots.ts menambahkan disallow /auth supaya tidak di-index.
 *  - Metadata: robots index/follow false (lapis ganda anti-index).
 *  - Tidak mewarisi chrome portofolio (Header/Footer/Intro) karena berada
 *    di route group (auth) dengan layout minimal sendiri.
 *  - Menerima ?next=/dashboard dari proxy saat redirect.
 */
export const metadata: Metadata = {
  title: "Masuk",
  description: "Area terbatas — masuk untuk mengelola portofolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Whitelist redirect tujuan: hanya path relatif internal, default dashboard.
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 sm:py-24"
    >
      {/* Back link */}
      <Link
        href="/"
        className="self-start font-handwritten text-lg text-ink-muted transition-colors hover:text-ink"
      >
        ← Kembali ke beranda
      </Link>

      <AuthForm next={safeNext} />
    </main>
  );
}
