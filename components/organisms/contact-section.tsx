'use client';

import { useActionState } from 'react';
import { CONTACT_LINKS } from '@/constants';
import { sendContact, type FormState } from '@/app/actions/send-contact';
import Input from '@/components/atoms/input';
import Textarea from '@/components/atoms/textarea';

const initialState: FormState = { success: false, message: '' };

export default function ContactSection() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  return (
    <section
      className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center"
      id="contact"
    >
      <h2
        className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Contact
      </h2>

      <p
        className="mb-8 max-w-sm text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Open for opportunities, collaborations, or just a conversation.
      </p>

      {/* Form */}
      <form action={formAction} className="mb-10 w-full text-left">
        <div className="flex flex-col gap-4">
          <Input
            id="contact-name"
            name="name"
            label="Name"
            placeholder="Your name"
            error={state.errors?.name?.[0]}
            disabled={pending}
          />
          <Input
            id="contact-email"
            name="email"
            type="email"
            label="Email"
            placeholder="your@email.com"
            error={state.errors?.email?.[0]}
            disabled={pending}
          />
          <Textarea
            id="contact-message"
            name="message"
            label="Message"
            placeholder="What would you like to say?"
            error={state.errors?.message?.[0]}
            disabled={pending}
            rows={4}
          />
          <button
            type="submit"
            disabled={pending}
            className="btn-primary rounded px-4 py-2 text-sm font-medium transition-all disabled:opacity-50"
          >
            {pending ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {state.message && (
          <p
            className="mt-3 text-sm"
            style={{ color: state.success ? 'var(--color-success)' : 'var(--color-error)' }}
          >
            {state.message}
          </p>
        )}
      </form>

      {/* Social links */}
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
