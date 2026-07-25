'use client';

import { useState } from 'react';
import { SKILLS } from '@/constants';
import { TECH_ICONS } from '@/components/atoms/tech-icons';

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ml', label: 'AI/ML' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'tools', label: 'Tools' },
] as const;

const DEFAULT_ICON = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
    <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.4" />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function SkillsSection() {
  const [active, setActive] = useState<string>('frontend');

  const filtered = SKILLS.filter((s) => s.category === active);

  return (
    <section
      className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24"
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

      {/* Animated marquee — all skills running with brand icons */}
      <div
        className="mb-10 w-full overflow-hidden rounded border py-3"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex animate-marquee gap-5 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...SKILLS, ...SKILLS].map(({ name }, i) => {
            const Icon = TECH_ICONS[name] || DEFAULT_ICON;
            return (
              <span
                key={`${name}-${i}`}
                className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-medium"
                style={{
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Icon />
                {name}
              </span>
            );
          })}
        </div>
      </div>

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
        {filtered.map(({ name, level }) => {
          const Icon = TECH_ICONS[name] || DEFAULT_ICON;
          return (
          <div key={name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Icon />
                {name}
              </span>
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
          );
        })}
      </div>
    </section>
  );
}
