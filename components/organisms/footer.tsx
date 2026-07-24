import { CONTACT_LINKS } from '@/constants';

export default function Footer() {
  return (
    <footer
      className="border-t py-8 text-center"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="mb-4 flex items-center justify-center gap-4">
        {CONTACT_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Icon />
          </a>
        ))}
      </div>
      <p
        className="text-xs"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        &copy; {new Date().getFullYear()} Achmad Fauzan. Built with Next.js, TypeScript &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
