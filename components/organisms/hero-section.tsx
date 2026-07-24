export default function HeroSection() {
  return (
    <section
      className="bg-pixel-grid flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center"
      id="hero"
    >
      {/* Greeting */}
      <p
        className="animate-fade-up mb-6 text-sm"
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Hi, my name is
      </p>

      {/* Name */}
      <h1
        className="animate-fade-up glow-accent mb-6 leading-tight"
        style={{
          animationDelay: '80ms',
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
        Software Engineer, AI Enthusiast, Tech Builder
      </p>

      {/* Description */}
      <p
        className="animate-fade-up mb-10"
        style={{
          animationDelay: '240ms',
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
      <div className="animate-fade-up flex items-center gap-4" style={{ animationDelay: '320ms' }}>
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
      </div>
    </section>
  );
}
