import { CONTACT_LINKS } from '@/constants';

export default function ContactSection() {
  return (
    <section
      className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center"
      id="contact"
    >
      {/* Heading mini - pixel style */}
      <h2
        className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Contact
      </h2>

      <p
        className="mb-10 max-w-sm text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Open for opportunities, collaborations, or just a conversation.
      </p>

      {/* Social links - row */}
      <div className="flex items-center justify-center gap-3">
        {CONTACT_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="social-link flex h-10 w-10 items-center justify-center rounded"
          >
            <Icon />
          </a>
        ))}
      </div>
    </section>
  );
}
