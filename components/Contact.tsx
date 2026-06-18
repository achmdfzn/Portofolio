"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Contact (DESIGN.md §5).
 *
 *  - Desain: mailbox/envelope doodle SVG + form bergaya lined-paper.
 *  - Input fields: hanya border-b-2 (bukan full box), seperti coretan
 *    di atas garis kertas.
 *  - Validasi: zod (nama min 2, email valid, pesan min 10).
 *  - Submit simulasi: karena backend FastAPI ditunda, tampilkan pesan
 *    sukses setelah delay ~800ms. Siap di-upgrade saat backend siap.
 *  - A11y: label terhubung htmlFor/id, aria-invalid, aria-describedby.
 *    Focus ring otomatis dari globals.css.
 */

/* ── Zod schema ── */
const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Format email tidak valid."),
  message: z.string().min(10, "Pesan minimal 10 karakter."),
});

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error saat user mulai mengetik ulang.
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validasi zod.
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // Submit simulasi (backend ditunda).
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData(INITIAL_FORM);
      setErrors({});
    }, 800);
  }

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* ── Kiri: ilustrasi + copywriting ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
          }}
        >
          <p className="font-handwritten text-xl text-ink-muted sm:text-2xl">
            Kontak
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Punya ide <span className="highlight-pink">gila</span>?
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
            Mari kita diskusikan. Atau sekadar menyapa via email.
          </p>

          {/* Envelope doodle */}
          <EnvelopeDoodle className="mt-10 h-40 w-64 text-ink sm:h-48 sm:w-72" />
        </motion.div>

        {/* ── Kanan: form bergaya lined-paper ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.9, rotate: -2 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                className="rough-border border-2 border-ink bg-paper-soft p-8 text-center shadow-[6px_6px_0_0_var(--color-ink)] sm:p-10"
              >
                <p className="font-handwritten text-2xl text-ink sm:text-3xl">
                  Pesan terkirim! 🎉
                </p>
                <p className="mt-3 font-handwritten text-base text-ink-muted sm:text-lg">
                  (Simulasi — backend FastAPI menyusul.)
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rough-border-soft border-2 border-ink bg-paper px-6 py-2 font-display text-sm font-medium text-ink transition-shadow hover:shadow-[4px_4px_0_0_var(--color-ink)]"
                >
                  Kirim lagi
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="rough-border-alt border-2 border-ink bg-paper-soft p-8 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-10"
              >
                {/* Nama */}
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="block font-handwritten text-base text-ink-muted sm:text-lg"
                  >
                    Nama
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-highlighter-blue sm:text-xl"
                    placeholder="Achmad Fauzan"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1 font-handwritten text-sm text-ink-muted sm:text-base"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative mt-6">
                  <label
                    htmlFor="contact-email"
                    className="block font-handwritten text-base text-ink-muted sm:text-lg"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-highlighter-blue sm:text-xl"
                    placeholder="halo@contoh.com"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1 font-handwritten text-sm text-ink-muted sm:text-base"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Pesan */}
                <div className="relative mt-6">
                  <label
                    htmlFor="contact-message"
                    className="block font-handwritten text-base text-ink-muted sm:text-lg"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className="mt-1 w-full resize-none border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-highlighter-blue sm:text-xl"
                    placeholder="Tulis pesan kamu di sini..."
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1 font-handwritten text-sm text-ink-muted sm:text-base"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Tombol kirim */}
                <div className="mt-8">
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 1.03, rotate: [-1, 1, 0] }
                    }
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    className="rough-border border-2 border-ink bg-highlighter-yellow px-8 py-3 font-display text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] disabled:opacity-60 sm:text-lg"
                  >
                    {status === "submitting" ? "Mengirim..." : "Kirim Pesan"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Envelope doodle SVG (inline, bukan Font Awesome) ── */
function EnvelopeDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
    >
      {/* Amplop badan */}
      <rect
        x="20"
        y="30"
        width="200"
        height="130"
        rx="4"
        stroke="currentColor"
        strokeWidth="3"
        fill="var(--color-paper-soft)"
      />
      {/* Flap atas */}
      <path
        d="M20 30 L120 95 L220 30"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Garis bawah flap */}
      <path
        d="M20 160 L90 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M220 160 L150 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Stempel doodle kecil */}
      <circle
        cx="190"
        cy="135"
        r="18"
        stroke="var(--color-highlighter-pink)"
        strokeWidth="2"
        fill="var(--color-highlighter-pink)"
        fillOpacity="0.3"
        strokeDasharray="3 4"
      />
    </svg>
  );
}
