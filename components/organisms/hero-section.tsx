import { RESUME_URL } from '@/constants';

const RULES = [
  'Documentation-first',
  'No duplicate code',
  'TypeScript strict',
  'Minimal footprint',
];

const AGENTS = [
  'PM', 'Arch', 'FE', 'BE', 'UI/UX', 'Motion',
  'Accessibility', 'SEO', 'Performance', 'QA', 'Security', 'DevOps',
];

const STACK = [
  'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion',
  'Node.js', 'Python', 'PostgreSQL',
];

export default function HeroSection() {
  return (
    <section
      className="bg-pixel-grid flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center"
      id="hero"
    >
      {/* Terminal / Code widget */}
      <div
        className="animate-fade-up mb-10 w-full max-w-lg overflow-hidden rounded border text-left font-mono text-xs"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-1.5 border-b px-3 py-2"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-error)' }} />
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-warning)' }} />
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-success)' }} />
          <span className="ml-2" style={{ color: 'var(--color-text-muted)' }}>portfolio</span>
        </div>

        {/* Terminal body */}
        <div className="flex flex-col gap-1.5 px-4 py-4">
          <p style={{ color: 'var(--color-text-muted)' }}>
            <span style={{ color: 'var(--color-success)' }}>$</span> build --stack modern
          </p>
          <p className="flex flex-wrap gap-x-2">
            <span style={{ color: 'var(--color-accent)' }}>principles:</span>
            {RULES.map((r) => (
              <span key={r} style={{ color: 'var(--color-text-secondary)' }}>{r}</span>
            ))}
          </p>
          <p className="flex flex-wrap gap-x-2">
            <span style={{ color: 'var(--color-accent)' }}>agents:</span>
            {AGENTS.map((a) => (
              <span key={a} style={{ color: 'var(--color-text-muted)' }}>{a}</span>
            ))}
          </p>
          <p className="flex flex-wrap gap-x-2">
            <span style={{ color: 'var(--color-accent)' }}>stack:</span>
            {STACK.map((s) => (
              <span key={s} style={{ color: 'var(--color-warning)' }}>{s}</span>
            ))}
          </p>
          <p style={{ color: 'var(--color-text-muted)' }}>
            <span style={{ color: 'var(--color-success)' }}>$</span> ready -
            <span style={{ color: 'var(--color-accent)' }}> deploy 2026</span>
          </p>
        </div>
      </div>

      {/* Name */}
      <h1
        className="animate-fade-up glow-accent mb-5 leading-tight"
        style={{
          animationDelay: '100ms',
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
        }}
      >
        Achmad Fauzan
      </h1>

      {/* Headline */}
      <p
        className="animate-fade-up mb-4"
        style={{
          animationDelay: '160ms',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
          color: 'var(--color-text-primary)',
          fontWeight: 600,
          maxWidth: '500px',
        }}
      >
        Software Engineer · AI Enthusiast · Tech Builder
      </p>

      {/* Description */}
      <p
        className="animate-fade-up mb-10"
        style={{
          animationDelay: '220ms',
          fontSize: '0.95rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '440px',
          lineHeight: 1.7,
        }}
      >
        Informatics Engineering student building with clean architecture, modern stack, and
        14 AI agents backing every line of code.
      </p>

      {/* CTA */}
      <div className="animate-fade-up flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '280ms' }}>
        <a
          href="#projects"
          className="btn-primary inline-flex h-11 items-center rounded px-6 text-sm font-medium"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="btn-secondary inline-flex h-11 items-center rounded px-6 text-sm font-medium"
        >
          Get In Touch
        </a>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex h-11 items-center rounded px-6 text-sm font-medium"
        >
          Resume ↗
        </a>
      </div>
    </section>
  );
}
