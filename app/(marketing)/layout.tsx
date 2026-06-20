import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Layout route group (marketing) — halaman portofolio publik.
 *
 * Hanya halaman di bawah group ini yang dapat chrome portofolio penuh:
 *  - Intro (animasi "AF" sekali per sesi)
 *  - Header (nav doodle + theme toggle)
 *  - Footer (signature + social)
 *
 * Halaman di route group lain — (auth) dan (app) — sengaja TIDAK
 * mewarisi chrome ini supaya /auth dan /dashboard tampil mandiri
 * tanpa animasi intro maupun nav portofolio. Root layout (app/layout.tsx)
 * tetap menyediakan fondasi global (fonts, theme anti-FOUC, skip-link).
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Intro />
      <Header />
      {children}
      <Footer />
    </>
  );
}
