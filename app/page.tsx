import { Suspense } from 'react';
import CountdownTimer from '@/components/molecules/countdown-timer';
import { SOCIAL_LINKS } from '@/constants';

export default function Home() {
  return (
    <main
      className="bg-pixel-grid flex flex-1 flex-col items-center justify-center px-5 py-16 text-center"
      style={{ minHeight: '100dvh' }}
    >
      {/* Status badge */}
      <div
        className="animate-fade-up mb-10 inline-flex items-center gap-2 rounded px-3 py-1.5"
        style={{
          animationDelay: '0ms',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span
          className="animate-pulse-dot inline-block h-2 w-2 rounded-full"
          style={{ background: 'var(--color-success)' }}
        />
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          In Development
        </span>
      </div>

      {/* Nama — pixel font + glow */}
      <h1
        className="animate-fade-up glow-accent mb-4 leading-tight"
        style={{
          animationDelay: '80ms',
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(1.1rem, 4vw, 2rem)',
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
        }}
      >
        Achmad Fauzan
      </h1>

      {/* Headline */}
      <p
        className="animate-fade-up mb-3"
        style={{
          animationDelay: '160ms',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'var(--color-text-primary)',
          fontWeight: 600,
          maxWidth: '480px',
        }}
      >
        Software Engineer · AI Enthusiast · Tech Builder
      </p>

      {/* Description */}
      <p
        className="animate-fade-up mb-12"
        style={{
          animationDelay: '240ms',
          fontSize: '0.95rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '400px',
          lineHeight: 1.7,
        }}
      >
        Building something great. A professional portfolio website is coming soon.
      </p>

      {/* Countdown */}
      <div
        className="animate-fade-up mb-12"
        style={{ animationDelay: '320ms' }}
      >
        <p
          className="mb-4"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Launching in
        </p>
        <Suspense fallback={<div style={{ height: '80px' }} />}>
          <CountdownTimer />
        </Suspense>
      </div>

      {/* Social links */}
      <div
        className="animate-fade-up flex items-center gap-3"
        style={{ animationDelay: '400ms' }}
      >
        {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="social-link flex items-center gap-2 rounded px-4 py-2.5"
          >
            <Icon />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p
        className="animate-fade-up mt-16"
        style={{
          animationDelay: '480ms',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        © 2026 Achmad Fauzan
      </p>
    </main>
  );
}
