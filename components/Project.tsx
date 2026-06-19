"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import { SectionDivider } from "@/components/SectionDivider";
import { TechBadge } from "@/components/TechBadge";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Project (DESIGN.md §4 — "Grid Anti-Slop").
 *
 *  - Layout: 3-column grid (bukan masonry — card minimal seragam).
 *  - Card minimal: judul + tahun, tech badges, CTA arrow.
 *    Deskripsi tidak ditampilkan di card — ada di halaman detail.
 *  - Magnetic hover ringan (translate ±6px mengikuti kursor).
 *    Nonaktif di < md (mobile) dan saat reduced-motion.
 *  - Tech badge: pil kecil bergaya tangan dengan ikon (rough-border-soft mini).
 *  - Card mengarah ke /projects/[slug] (halaman detail case study).
 */

/* Varian rough-border per card — bergantian agar tidak identik. */
const CARD_BORDER_CLASSES = [
  "rough-border",
  "rough-border-alt",
  "rough-border-soft",
] as const;

export function ProjectSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
    >
      {/* Heading */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
        }}
      >
        <p className="font-handwritten text-xl text-ink-muted sm:text-2xl">
          Project
        </p>
        <h2 id="projects-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Hal-hal yang{" "}
          <span className="highlight-blue">saya bangun</span>.
        </h2>
      </motion.div>

      {/* 3-column grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Divider transisi ke section berikutnya (Contact). */}
      <SectionDivider className="mt-16 sm:mt-20" />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  prefersReducedMotion,
}: {
  project: Project;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const borderClass = CARD_BORDER_CLASSES[index % CARD_BORDER_CLASSES.length];

  return (
    <motion.div
      initial={
        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0.4 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.12,
      }}
    >
      {/*
        Magnetic hover wrapper.
        Nonaktif di mobile (< md) & reduced-motion — lihat MagneticCard di bawah.
      */}
      <MagneticCard disabled={prefersReducedMotion}>
        <Link
          href={`/projects/${project.slug}`}
          className="group block"
          aria-label={`Lihat case study ${project.title}`}
        >
          <div
            className={`${borderClass} border-2 border-ink bg-paper-soft p-5 shadow-[5px_5px_0_0_var(--color-ink)] transition-shadow group-hover:shadow-[8px_8px_0_0_var(--color-ink)] sm:p-6`}
          >
            {/* Tahun + judul */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                {project.title}
              </h3>
              <span className="mt-1 shrink-0 font-handwritten text-sm text-ink-muted">
                {project.year}
              </span>
            </div>

            {/* Tech badges — dengan ikon di kiri setiap badge */}
            <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
              {project.tech.map((tech) => (
                <TechBadge key={tech} tech={tech} size="sm" />
              ))}
            </ul>

            {/* CTA — arrow mengarah ke halaman detail case study. */}
            <div className="mt-4 flex items-center gap-2 font-handwritten text-sm text-ink transition-transform group-hover:translate-x-1 sm:mt-5 sm:text-base">
              <span>Lihat case study</span>
              <svg
                className="h-4 w-4 text-ink"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </MagneticCard>
    </motion.div>
  );
}

/**
 * Magnetic hover — card benar-benar tertarik ke arah kursor (DESIGN.md §Motion).
 *
 *  - Translasi ringan (maks ~16px) mengikuti offset kursor relatif ke center card,
 *    dihaluskan via useSpring (mirip MagneticNavLink di Header.tsx).
 *  - Nonaktif total saat:
 *      • prefersReducedMotion (a11y)
 *      • viewport < md (DESIGN.md §Responsiveness: "otomatis nonaktif di bawah md")
 *      • touch device — tidak ada mousemove → fallback ke whileHover scale statis.
 *  - Saat mouse keluar, spring otomatis snap kembali ke origin.
 */
function MagneticCard({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  // < md → magnetic off. md:query dipakai karena breakpoint Tailwind `md`=768px.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enabled = !disabled && isDesktop;

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Offset kursor relatif ke center card, skala kecil (pull ringan).
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.12);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.12);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!enabled) {
    // Mobile / reduced-motion: fallback hover scale statis untuk feedback visual.
    return (
      <motion.div
        whileHover={disabled ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
