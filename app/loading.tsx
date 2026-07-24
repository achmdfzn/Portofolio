export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Animated dots */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 animate-pulse rounded-full"
          style={{ background: 'var(--color-accent)', animationDelay: '0ms' }}
        />
        <span
          className="inline-block h-3 w-3 animate-pulse rounded-full"
          style={{ background: 'var(--color-accent)', animationDelay: '200ms' }}
        />
        <span
          className="inline-block h-3 w-3 animate-pulse rounded-full"
          style={{ background: 'var(--color-accent)', animationDelay: '400ms' }}
        />
      </div>
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        Loading…
      </p>
    </div>
  );
}
