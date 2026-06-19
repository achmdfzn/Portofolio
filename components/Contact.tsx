"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Contact (DESIGN.md §5).
 *
 *  - Desain: form bergaya lined-paper full-width, tanpa kolom kiri.
 *  - Heading & copywriting di atas form sebagai intro singkat.
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
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  // Ref ke tombol "Kirim lagi" — dipakai memindahkan fokus keyboard saat form
  // submit sukses. Tanpa ini, fokus hilang karena <form> yang difokus di-unmount
  // saat AnimatePresence swap ke panel sukses (WCAG 2.4.3 — focus order).
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  // Saat sukses, pindahkan fokus ke tombol "Kirim lagi" agar user keyboard
  // tidak kehilangan posisi setelah form diganti panel sukses.
  useEffect(() => {
    if (status === "success" && resetButtonRef.current) {
      resetButtonRef.current.focus();
    }
  }, [status]);

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
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
    >
      {/* ── Heading + copywriting ── */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
        }}
      >
        <p className="font-handwritten text-xl text-ink-muted sm:text-2xl">
          Kontak
        </p>
        <h2 id="contact-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Punya ide <span className="highlight-pink">gila</span>?
        </h2>
        <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
          Mari kita diskusikan. Atau sekadar menyapa via email.
        </p>
      </motion.div>

      {/* ── Form bergaya lined-paper (full-width) ── */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          delay: prefersReducedMotion ? 0 : 0.15,
        }}
        className="mt-10"
      >
        <AnimatePresence mode="wait">
          {/* aria-live: announce status changes to screen readers */}
          <div aria-live="polite" aria-atomic="true">
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
                  ref={resetButtonRef}
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
                aria-busy={status === "submitting"}
                className="rough-border-alt border-2 border-ink bg-paper-soft p-8 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-10"
              >
                {/* ── Row: Nama + Email side-by-side ── */}
                <div className="grid gap-6 sm:grid-cols-2">
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
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/70 focus:border-highlighter-blue sm:text-xl"
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
                  <div className="relative">
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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/70 focus:border-highlighter-blue sm:text-xl"
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
                    required
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className="mt-1 w-full resize-none border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/70 focus:border-highlighter-blue sm:text-xl"
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
          </div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
