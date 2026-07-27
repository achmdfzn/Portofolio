import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({ label, error, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="rounded px-3 py-2 text-sm outline-none transition-colors resize-y min-h-[100px]"
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
