"use client";

import Link from "next/link";
import { useReducedMotion, motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { TechBadge } from "@/components/TechBadge";

/**
 * ProjectList — daftar project read-only di dashboard.
 *
 * Menampilkan semua project dari lib/projects.ts dalam list compact bergaya
 * doodle. Setiap item punya judul + tahun, tech badges, dan link ke halaman
 * detail di portofolio. Mini-CMS vibe tapi read-only dulu — cukup memberikan
 * gambaran lengkap project yang ada.
 */

const BORDER_CLASSES = [
  "rough-border",
  "rough-border-alt",
  "rough-border-soft",
] as const;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectList() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.section
      aria-labelledby="projectlist-heading"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
      className="rough-border-alt border-2 border-ink bg-paper-soft p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8"
    >
      {/* Heading */}
      <p className="font-handwritten text-xl text-ink-muted">Inventaris</p>
      <h2 id="projectlist-heading" className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
        Project <span className="highlight-blue">Portofolio</span>
      </h2>
      <p className="mt-2 max-w-xl font-body text-base text-ink-soft">
        Daftar project yang tampil di beranda. Klik judul untuk melihat detail case study.
      </p>

      {/* List */}
      <ul className="mt-6 flex flex-col gap-4">
        {PROJECTS.map((project, i) => {
          const borderClass = BORDER_CLASSES[i % BORDER_CLASSES.length];
          return (
            <motion.li
              key={project.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : i * 0.08,
                ease: EASE_OUT_EXPO,
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`${borderClass} group block border-2 border-ink bg-paper p-4 shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5`}
              >
                {/* Row: judul + tahun */}
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                    {project.title}
                  </h3>
                  <span className="font-handwritten text-base text-ink-muted sm:text-lg">
                    {project.year}
                  </span>
                </div>

                {/* Description truncated */}
                <p className="mt-1.5 line-clamp-2 font-body text-sm text-ink-soft sm:text-base">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech} tech={tech} size="sm" />
                  ))}
                </div>

                {/* CTA arrow */}
                <span className="mt-2 inline-block font-handwritten text-sm text-ink-muted transition-transform group-hover:translate-x-1 sm:text-base">
                  Lihat detail →
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {/* Total count */}
      <p className="mt-5 border-t-2 border-dashed border-ink/20 pt-3 font-handwritten text-sm text-ink-muted sm:text-base">
        Total: {PROJECTS.length} project
      </p>
    </motion.section>
  );
}
