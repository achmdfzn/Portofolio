import { EXPERIENCES } from '@/constants';

export default function ExperienceSection() {
  return (
    <section
      className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24"
      id="experience"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Experience
      </h2>
      <h3
        className="mb-10 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Where I&apos;ve Worked
      </h3>

      <div className="relative w-full">
        {/* Timeline line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: 'var(--color-border)' }}
        />

        {EXPERIENCES.map(({ role, company, period, description, tags }) => (
          <div key={`${role}-${company}`} className="relative mb-10 pl-12 last:mb-0">
            {/* Timeline dot */}
            <div
              className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2"
              style={{
                background: 'var(--color-bg)',
                borderColor: 'var(--color-accent)',
              }}
            />

            <div
              className="rounded border p-5"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {role}
                </h4>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {period}
                </span>
              </div>
              <p
                className="mb-1 text-sm"
                style={{ color: 'var(--color-accent)' }}
              >
                {company}
              </p>
              <p
                className="mb-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
