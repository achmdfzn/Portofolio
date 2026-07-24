'use client';

import { useState } from 'react';
import { SKILLS } from '@/constants';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ml', label: 'AI/ML' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'tools', label: 'Tools' },
] as const;

export default function SkillsSection() {
  const [active, setActive] = useState<string>('frontend');

  const filtered = SKILLS.filter((s) => s.category === active);

  return (
    <section
      className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24"
      id="skills"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Skills
      </h2>
      <h3
        className="mb-10 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Tech Stack
      </h3>

      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="rounded px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors"
            style={{
              background: active === key ? 'var(--color-accent-dim)' : 'var(--color-surface)',
              color: active === key ? 'var(--color-accent)' : 'var(--color-text-muted)',
              border: `1px solid ${active === key ? 'var(--color-accent)' : 'var(--color-border)'}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Skills bars */}
      <div className="flex w-full flex-col gap-5">
        {filtered.map(({ name, level }) => (
          <div key={name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span style={{ color: 'var(--color-text-primary)' }}>{name}</span>
              <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {level}%
              </span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded"
              style={{ background: 'var(--color-surface-2)' }}
            >
              <div
                className="h-full rounded transition-all duration-700 ease-out"
                style={{
                  width: `${level}%`,
                  background: 'var(--color-accent)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
