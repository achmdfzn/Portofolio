import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-5 text-center"
      style={{ background: 'var(--color-bg)' }}
    >
      <h1
        className="mb-4 leading-tight"
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          color: 'var(--color-accent)',
        }}
      >
        404
      </h1>
      <p
        className="mb-2 text-lg font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Page Not Found
      </p>
      <p
        className="mb-8 max-w-sm text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-primary inline-flex h-11 items-center rounded px-6 text-sm font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}
