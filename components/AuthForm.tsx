"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

/**
 * AuthForm — form login untuk /auth (DESIGN.md vibe doodle).
 *
 * Pola mengikuti Contact.tsx:
 *  - Input lined-paper (border-b-2, focus highlighter biru).
 *  - Validasi zod (email valid, password min 8).
 *  - aria-invalid / aria-describedby / role=alert / aria-busy.
 *  - Status union idle|submitting|error|success.
 *
 * Saat sukses: panggil useAuth.signIn → set cookie af_auth → router.push(next).
 * Hint demo credentials ditampilkan karena fase mock (bukan production).
 */

const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter."),
});

type AuthFormData = { email: string; password: string };
type FormErrors = Partial<Record<keyof AuthFormData, string>>;
type Status = "idle" | "submitting" | "error" | "success";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AuthForm({ next }: { next: string }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const router = useRouter();
  const { signIn, demoCredentials } = useAuth();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  // Simpan id timeout supaya bisa di-clear saat unmount (hindari router.push
  // / setState di komponen yang sudah unmount → React warning).
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuthFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Reset global error saat user mulai mengetik lagi.
    if (globalError) setGlobalError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = authSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof AuthFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setGlobalError(null);

    const res = await signIn(formData.email, formData.password);
    if (!res.ok) {
      setStatus("error");
      setGlobalError(res.error);
      return;
    }

    // Sukses: beri jeda singkat untuk tampilan konfirmasi, lalu redirect.
    setStatus("success");
    // Pindahkan fokus ke pengumuman sukses (a11y).
    timersRef.current.push(setTimeout(() => successRef.current?.focus(), 50));
    timersRef.current.push(setTimeout(() => router.push(next), 700));
  }

  /** Isi otomatis demo credentials (klik hint). */
  function fillDemo() {
    setFormData({
      email: demoCredentials.email,
      password: demoCredentials.password,
    });
    setErrors({});
    setGlobalError(null);
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE_OUT_EXPO }}
      className="relative mt-8"
    >
      {/* Selotip dekorasi di sudut atas */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-8 z-10 h-6 w-20 rotate-[-3deg] bg-highlighter-yellow/70 mix-blend-multiply"
        style={{ clipPath: "polygon(3% 10%, 98% 0%, 95% 88%, 5% 100%)" }}
      />

      <div className="rough-border-alt border-2 border-ink bg-paper-soft p-8 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-10">
        {/* Eyebrow + heading */}
        <p className="font-handwritten text-xl text-ink-muted">Area terbatas</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          Masuk ke <span className="highlight-blue">Studio</span>
        </h1>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          Pintu belakang untuk mengelola foto profil & project.
        </p>

        {/* aria-live untuk status / error global */}
        <div aria-live="polite" aria-atomic="true" className="mt-6">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p
                  ref={successRef}
                  tabIndex={-1}
                  className="font-handwritten text-2xl text-ink sm:text-3xl"
                >
                  Berhasil masuk! 🎉
                </p>
                <p className="mt-2 font-body text-sm text-ink-muted">
                  Mengarahkan ke dashboard...
                </p>
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
                className="flex flex-col gap-5"
              >
                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="auth-email"
                    className="block font-handwritten text-base text-ink-muted sm:text-lg"
                  >
                    Email
                  </label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "auth-email-error" : undefined}
                    className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/70 focus:border-highlighter-blue sm:text-xl"
                    placeholder="admin@achmadfauzan.dev"
                  />
                  {errors.email && (
                    <p
                      id="auth-email-error"
                      role="alert"
                      className="mt-1 font-handwritten text-sm text-ink-muted sm:text-base"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="auth-password"
                    className="block font-handwritten text-base text-ink-muted sm:text-lg"
                  >
                    Kata sandi
                  </label>
                  <input
                    id="auth-password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "auth-password-error" : undefined
                    }
                    className="mt-1 w-full border-b-2 border-ink bg-transparent pb-1 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/70 focus:border-highlighter-blue sm:text-xl"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p
                      id="auth-password-error"
                      role="alert"
                      className="mt-1 font-handwritten text-sm text-ink-muted sm:text-base"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Error global (credential salah, dsb.) */}
                {globalError && (
                  <p
                    role="alert"
                    className="rough-border-soft border-2 border-ink bg-highlighter-pink/40 px-4 py-2 font-handwritten text-base text-ink sm:text-lg"
                  >
                    {globalError}
                  </p>
                )}

                {/* Tombol submit */}
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.02, rotate: [-1, 1, 0] }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className="rough-border mt-2 border-2 border-ink bg-highlighter-yellow px-8 py-3 font-display text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
                >
                  {status === "submitting" ? "Memeriksa..." : "Masuk"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Hint demo credentials (fase mock) */}
        <div className="mt-7 border-t-2 border-dashed border-ink/20 pt-4">
          <p className="font-handwritten text-sm text-ink-muted sm:text-base">
            Mode demo — klik untuk isi otomatis:
          </p>
          <button
            type="button"
            onClick={fillDemo}
            disabled={status === "submitting" || status === "success"}
            className="mt-2 rough-border-soft border-2 border-ink bg-paper px-4 py-2 text-left font-body text-xs text-ink-soft transition-shadow hover:shadow-[3px_3px_0_0_var(--color-ink)] disabled:opacity-50 sm:text-sm"
          >
            <span className="block">{demoCredentials.email}</span>
            <span className="block">{demoCredentials.password}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
