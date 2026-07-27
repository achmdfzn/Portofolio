import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="rounded px-3 py-2 text-sm outline-none transition-colors"
        style={{
          background: 'var(--color-surface-2)',
          border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
          color: 'var(--color-text-primary)',
        }}
      />
      {error && (
        <p className="text-xs" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
