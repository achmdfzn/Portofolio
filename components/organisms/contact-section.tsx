import { CONTACT_LINKS } from '@/constants';
import ContactForm from './contact-form';

export default function ContactSection() {
  return (
    <section
      className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center"
      id="contact"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Contact
      </h2>
      <h3
        className="mb-4 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Get In Touch
      </h3>
      <p
        className="mb-4 max-w-md text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        I am always open to new opportunities, collaborations, and conversations.
        Whether you have a project in mind or just want to say hi — feel free to reach out.
      </p>

      <ContactForm />

      <div
        className="mb-6 mt-12 flex w-full items-center gap-3 text-xs uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <span className="flex-1" style={{ height: '1px', background: 'var(--color-border)' }} />
        <span>Or find me on</span>
        <span className="flex-1" style={{ height: '1px', background: 'var(--color-border)' }} />
      </div>

      <div className="flex items-center gap-4">
        {CONTACT_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="social-link flex items-center gap-2 rounded px-4 py-2.5 text-sm"
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
