import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectSection } from "@/components/Project";
import { Contact } from "@/components/Contact";

/**
 * Halaman beranda — portofolio satu halaman.
 *
 * Urutan section sesuai DESIGN.md:
 *  1. Hero   — split asimetris + polaroid (Phase 1)
 *  2. About  — sticky note "The Me Canvas" (Phase 2)
 *  3. Project — masonry grid anti-slop (Phase 2)
 *  4. Contact — lined-paper form + envelope doodle (Phase 2)
 *
 * Header & Footer sudah dipasang global di app/layout.tsx.
 * Anchor IDs (#about, #projects, #contact) ada di masing-masing section,
 * cocok dengan link navigasi di lib/nav.ts.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ProjectSection />
      <Contact />
    </main>
  );
}
