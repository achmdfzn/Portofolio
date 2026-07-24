'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-5 text-center"
      style={{ background: 'var(--color-bg)' }}
    >
      <h1
        className="mb-4 leading-tight"
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          color: 'var(--color-error)',
        }}
      >
        Oops!
      </h1>
      <p
        className="mb-2 text-lg font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Something went wrong
      </p>
      <p
        className="mb-8 max-w-sm text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        An unexpected error occurred. Please try again later.
      </p>
      <button
        onClick={reset}
        className="btn-primary inline-flex h-11 items-center rounded px-6 text-sm font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
