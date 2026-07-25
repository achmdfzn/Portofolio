import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      className="bg-pixel-grid flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center"
      id="hero"
    >
      {/* Avatar */}
      <div className="animate-fade-up mb-8">
        <Image
          src="/images/avatar.svg"
          alt=""
          width={120}
          height={120}
          className="rounded-full"
          priority
          style={{
            border: '2px solid var(--color-border)',
          }}
        />
      </div>

      {/* Greeting */}
      <p
        className="animate-fade-up mb-4 text-sm"
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          animationDelay: '40ms',
        }}
      >
        Hi, my name is
      </p>

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
        Informatics Engineering student crafting clean, modern web experiences and
        exploring artificial intelligence to build impactful solutions.
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
          href="/resume.pdf"
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
