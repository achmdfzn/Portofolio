"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";

/**
 * Project (DESIGN.md §4 — "Grid Anti-Slop").
 *
 *  - Layout masonry/irregular grid via CSS columns (bukan kotak sempurna).
 *  - Card: rough-border variasi bergantian + border-2 border-ink + shadow.
 *  - Magnetic hover ringan (translate ±6px mengikuti kursor).
 *    Nonaktif di < md (mobile) dan saat reduced-motion.
 *  - Tech badge: pil kecil bergaya tangan (rough-border-soft mini).
 *  - Card mengarah ke /projects/[slug] (halaman detail Phase 3).
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
        <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Hal-hal yang{" "}
          <span className="highlight-blue">saya bangun</span>.
        </h2>
      </motion.div>

      {/* Masonry grid */}
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
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
      className="mb-6 break-inside-avoid"
    >
      {/*
        Magnetic hover wrapper.
        Nonaktif di mobile (< md) via media query — per DESIGN.md §Responsiveness.
      */}
      <MagneticCard disabled={prefersReducedMotion}>
        <Link
          href={`/projects/${project.slug}`}
          className="group block"
          aria-label={`Lihat case study ${project.title}`}
        >
          <div
            className={`${borderClass} border-2 border-ink bg-paper-soft p-6 shadow-[5px_5px_0_0_var(--color-ink)] transition-shadow group-hover:shadow-[8px_8px_0_0_var(--color-ink)]`}
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

            {/* Deskripsi */}
            <p className="mt-3 font-body text-base leading-relaxed text-ink-soft sm:text-lg">
              {project.description}
            </p>

            {/* Tech badges */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rough-border-soft border border-ink/30 bg-paper px-3 py-1 font-handwritten text-xs text-ink-muted sm:text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* CTA — mengarah ke halaman detail case study. */}
            <p className="mt-5 inline-flex items-center gap-2 font-handwritten text-base text-ink transition-transform group-hover:translate-x-1 sm:text-lg">
              Lihat case study
              <span aria-hidden="true">→</span>
            </p>
          </div>
        </Link>
      </MagneticCard>
    </motion.div>
  );
}

/**
 * Magnetic hover ringan — card geser ±6px mengikuti kursor.
 * Disabled saat prefersReducedMotion atau di mobile.
 *
 * CATATAN: efek ini hanya terasa di desktop karena pakai mouse event.
 * Di touch device tidak ada mousemove → fallback ke whileHover statis.
 */
function MagneticCard({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
