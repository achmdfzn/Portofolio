const FOCUS_AREAS = [
  {
    title: 'Web Development',
    desc: 'Full-stack dengan Next.js, TypeScript, Tailwind CSS. Clean Architecture, Atomic Design, Server Components.',
  },
  {
    title: 'AI / Machine Learning',
    desc: 'Deep Learning, NLP, model deployment. TensorFlow, PyTorch, Scikit-learn. Dari eksperimen ke produksi.',
  },
  {
    title: 'Software Engineering',
    desc: 'SOLID, separation of concerns, design patterns. Kode modular, reusable, dan maintainable.',
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Vercel, Docker, CI/CD. Dari development ke deployment dengan infrastruktur modern.',
  },
];

const AGENT_PRINCIPLES = [
  'Documentation-first — setiap keputusan mengacu pada PRD, DESIGN, dan konvensi',
  'Single source of truth — design system, aturan kode, kebutuhan di satu tempat',
  'Modular & reusable — no duplicate code, minimal footprint',
  'Quality by design — accessibility, performance, dan security bukan afterthought',
];

export default function AboutSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-5 py-24" id="about">
      {/* Heading */}
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        About
      </h2>
      <h3
        className="mb-4 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        How I Work
      </h3>
      <p
        className="mb-12 max-w-lg text-center text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Informatics Engineering student yang menggabungkan software engineering rigor dengan
        eksplorasi AI. Bukan sekadar coding — tapi membangun produk yang clean, scalable, dan berdampak.
      </p>

      {/* Focus Areas — grid cards */}
      <div className="mb-16 grid w-full gap-4 sm:grid-cols-2">
        {FOCUS_AREAS.map(({ title, desc }) => (
          <div
            key={title}
            className="group rounded border p-5 transition-all duration-200"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <h4
              className="mb-2 text-sm font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              {title}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Engineering Principles */}
      <div className="mb-16 w-full">
        <h4
          className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Engineering Principles
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {AGENT_PRINCIPLES.map((principle) => (
            <div
              key={principle}
              className="flex items-start gap-3 rounded border p-4"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <span
                className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {principle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
