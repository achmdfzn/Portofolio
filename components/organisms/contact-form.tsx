'use client';

import { useState, type FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate({ name, email, message }: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }
  if (!message.trim()) errors.message = 'Message is required';
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setStatus('sending');

    // Fallback: buka mailto karena belum ada backend API
    const mailto = `mailto:achmddfzn@proton.me?subject=Portfolio Contact — ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0A— ${form.name} (${form.email})`;

    try {
      window.location.href = mailto;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md">
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          className="w-full rounded px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: 'var(--color-surface-2)',
            border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.name && <p className="mt-1 text-xs" style={{ color: 'var(--color-error)' }}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          className="w-full rounded px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: 'var(--color-surface-2)',
            border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.email && <p className="mt-1 text-xs" style={{ color: 'var(--color-error)' }}>{errors.email}</p>}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          className="w-full resize-none rounded px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: 'var(--color-surface-2)',
            border: `1px solid ${errors.message ? 'var(--color-error)' : 'var(--color-border)'}`,
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.message && <p className="mt-1 text-xs" style={{ color: 'var(--color-error)' }}>{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary inline-flex h-11 w-full items-center justify-center rounded px-6 text-sm font-medium transition-all"
      >
        {status === 'sending' ? 'Sending…' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? '✗ Failed — Try Again' : 'Send Message'}
      </button>
    </form>
  );
}
