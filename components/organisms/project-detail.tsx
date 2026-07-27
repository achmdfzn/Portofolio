import Link from 'next/link';
import type { Project } from '@/constants';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      {/* Back link */}
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        style={{ color: 'var(--color-text-muted)' }}
      >
        &larr; Back to Projects
      </Link>

      {/* Title + tags */}
      <h1
        className="mb-3 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {project.title}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded px-2 py-0.5 text-xs"
            style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mb-10 flex items-center gap-4">
        {project.href && (
          <a
            href={project.href}
            className="btn-primary rounded px-4 py-2 text-sm font-medium transition-colors"
          >
            Live Demo &rarr;
          </a>
        )}
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary rounded px-4 py-2 text-sm font-medium transition-colors"
          >
            Source Code &rarr;
          </a>
        )}
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2
          className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Overview
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.longDescription}
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2
          className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Key Features
        </h2>
        <ul className="space-y-2">
          {project.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Details */}
      <section className="mb-10">
        <h2
          className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Technical Details
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.techDetails}
        </p>
      </section>
    </article>
  );
}
