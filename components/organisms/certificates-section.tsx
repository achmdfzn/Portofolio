import { CERTIFICATES } from '@/constants';

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="mx-auto max-w-5xl px-5 py-24"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Credentials
      </h2>
      <h3
        className="mb-10 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Certificates
      </h3>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.title}
            className="rounded border p-5 transition-colors"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <h3
              className="mb-1 text-base font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {cert.title}
            </h3>
            <p
              className="mb-3 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {cert.issuer} &middot; {cert.date}
            </p>
            <div className="flex flex-wrap gap-2">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded px-2 py-0.5 text-xs"
                  style={{
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
