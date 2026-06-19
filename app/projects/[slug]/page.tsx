import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { Polaroid } from "@/components/Polaroid";
import { TechBadge } from "@/components/TechBadge";

/**
 * Halaman detail project / case study (DESIGN.md §8).
 *
 *  Server Component (tidak butuh 'use client' — konten statis, sesuai
 *  konvensi CLAUDE.md: Server Components by default).
 *
 *  Konten per DESIGN.md §8:
 *   - Back link "← Kembali ke project"
 *   - Judul + tahun + highlighter
 *   - Problem statement (sticky note style)
 *   - Peran (role) Achmad di project
 *   - Tech stack badge pill
 *   - Screenshot dalam bingkai polaroid (placeholder bila kosong)
 *   - Tombol "Lihat di GitHub" bergaya stempel
 */

/** Pre-render semua slug dari PROJECTS saat build (static export). */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

/** Metadata dinamis per project — pakai template root layout. */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) {
      return { title: "Project tidak ditemukan" };
    }
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
      },
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Screenshot: pakai array project bila ada, fallback placeholder tunggal.
  const screenshots =
    project.screenshots.length > 0
      ? project.screenshots
      : ["/screenshots/placeholder.svg"];

  return (
    <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:py-24">
      {/* ── Back link ── */}
      <Link
        href="/#projects"
        className="inline-block font-handwritten text-lg text-ink-muted transition-colors hover:text-ink"
      >
        ← Kembali ke project
      </Link>

      {/* ── Header: judul + tahun ── */}
      <header className="mt-8">
        <p className="font-handwritten text-xl text-ink-muted sm:text-2xl">
          Case study
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            <span className="highlight-yellow">{project.title}</span>
          </h1>
          <span className="font-handwritten text-xl text-ink-muted sm:text-2xl">
            {project.year}
          </span>
        </div>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
          {project.description}
        </p>
      </header>

      {/* ── Problem Statement (sticky note) ── */}
      <section aria-labelledby="detail-problem" className="mt-16">
        <h2 id="detail-problem" className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Masalah yang{" "}
          <span className="highlight-blue">diselesaikan</span>
        </h2>
        <div className="mt-6 rough-border-alt border-2 border-ink bg-paper-soft px-8 py-8 shadow-[6px_6px_0_0_var(--color-ink)] sm:px-10 sm:py-10">
          <p className="font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
            {project.problemStatement}
          </p>
        </div>
      </section>

      {/* ── Peran (role) ── */}
      <section aria-labelledby="detail-role" className="mt-16">
        <h2 id="detail-role" className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Peran saya
        </h2>
        <p className="mt-6 max-w-2xl font-handwritten text-xl leading-relaxed text-ink-soft sm:text-2xl">
          <span className="highlight-pink">{project.role}</span>
        </p>
      </section>

      {/* ── Tech Stack ── */}
      <section aria-labelledby="detail-tech" className="mt-16">
        <h2 id="detail-tech" className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Tech <span className="highlight-yellow">stack</span>
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <TechBadge key={tech} tech={tech} size="md" />
          ))}
        </ul>
      </section>

      {/* ── Screenshot polaroid ── */}
      <section aria-labelledby="detail-screenshots" className="mt-16">
        <h2 id="detail-screenshots" className="font-display text-2xl font-bold text-ink sm:text-3xl">
          <span className="highlight-blue">Tampilan</span>
        </h2>
        <div className="mt-8 flex flex-col gap-12 sm:gap-16">
          {screenshots.map((src, i) => (
            <Polaroid
              key={`${src}-${i}`}
              src={src}
              alt={`${project.title} — tangkapan layar ${i + 1}`}
              width={800}
              height={500}
              rotate={i % 2 === 0 ? -2 : 2}
              captionGap="md"
              className="mx-auto w-full max-w-2xl"
            />
          ))}
        </div>
      </section>

      {/* ── Tombol GitHub stempel (hanya tampil jika URL bukan placeholder) ── */}
      {project.githubUrl !== "#" && (
        <section className="mt-20 flex justify-center sm:mt-24">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Lihat ${project.title} di GitHub`}
            className="rough-border inline-flex items-center gap-3 border-2 border-ink bg-highlighter-yellow px-10 py-5 shadow-[8px_8px_0_0_var(--color-ink)] transition-shadow hover:shadow-[12px_12px_0_0_var(--color-ink)] sm:px-12 sm:py-6"
          >
            <GitHubStampIcon className="h-7 w-7 text-ink sm:h-8 sm:w-8" />
            <span className="font-display text-xl font-bold uppercase tracking-wider text-ink sm:text-2xl">
              Lihat di GitHub
            </span>
          </a>
        </section>
      )}
    </main>
  );
}

/* ── Ikon GitHub bergaya stempel ── */
function GitHubStampIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.535-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
