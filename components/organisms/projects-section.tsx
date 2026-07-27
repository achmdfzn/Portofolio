'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, KeyboardEvent } from 'react';
import { PROJECTS } from '@/constants';
import TiltCard from '@/components/atoms/tilt-card';

export default function ProjectsSection() {
  const router = useRouter();

  const goToProject = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const handleKeyDown = (slug: string) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToProject(slug);
    }
  };

  return (
    <section
      className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24"
      id="projects"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Projects
      </h2>
      <h3
        className="mb-10 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        What I&apos;ve Built
      </h3>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        {PROJECTS.map(({ title, slug, description, tags, source }) => (
          <TiltCard key={title}>
            <div
              role="link"
              tabIndex={0}
              aria-label={`View details for ${title}`}
              className="block cursor-pointer"
              onClick={() => goToProject(slug)}
              onKeyDown={handleKeyDown(slug)}
            >
              <article
                className="group flex flex-col rounded border p-6 transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {/* Icon area */}
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded"
                  style={{ background: 'var(--color-accent-dim)' }}
                >
                  <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>&#60;/&#62;</span>
                </div>

                <h4
                  className="mb-2 text-lg font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {title}
                </h4>

                <p
                  className="mb-4 flex-1 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded px-2 py-0.5 text-xs"
                      style={{
                        background: 'var(--color-surface-2)',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    View Details &rarr;
                  </span>
                  {source && (
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                        e.stopPropagation();
                      }}
                    >
                      Source Code &rarr;
                    </a>
                  )}
                </div>
              </article>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
