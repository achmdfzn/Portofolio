import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

/**
 * Layout route group (app) — halaman dashboard.
 *
 * Chrome minimal khusus dashboard: top bar doodle kecil (monogram AF +
 * label "Dashboard" + theme toggle + tombol logout). TIDAK mewarisi
 * Intro/Header/Footer portofolio. Back link ke beranda tersedia di nav.
 */
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Kelola portofolio — foto profil, project, dan setelan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
}
