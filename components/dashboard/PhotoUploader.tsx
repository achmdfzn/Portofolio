"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useProfilePhoto } from "@/hooks/useProfilePhoto";

/**
 * PhotoUploader — manager foto profil dashboard.
 *
 * Sinkron langsung dengan Hero via useProfilePhoto hook:
 *  - Preview polaroid real-time (optimistik, sebelum commit ke storage).
 *  - Drag-and-drop zone dengan border dashed doodle.
 *  - Tombol hidden <input type="file"> untuk klik.
 *  - Validasi: tipe (jpg/png/webp), ukuran max 2MB, dimensi min 200×200.
 *  - Convert ke base64 data URL → localStorage.
 *  - Tombol "Hapus" → reset ke doodle AF default.
 */

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const MIN_DIMENSION = 200;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type UploadStatus = "idle" | "dragging" | "preview" | "saving" | "success" | "error";

interface ValidationError {
  message: string;
}

export function PhotoUploader() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { photo, setPhoto } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  /*
   * previewUrl disimpan lokal supaya saat user upload (optimistik), preview
   * berubah SEBELUM localStorage commit — memberikan feedback instan. photo
   * dari hook digunakan sebagai initial + saat baca perubahan dari tab lain
   * via syncKey (React re-render tanpa setState-dalam-effect).
   */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  /*
   * Sync key: bila photo dari hook berubah (tab lain / dashboard pertama kali
   * mount) dan previewUrl masih null, sinkronkan. Ini menggantikan setState
   * dalam effect yang diperingatkan lint React 19.
   */
  const activePreview = previewUrl ?? photo;

  /** Validasi file sebelum proses. */
  function validateFile(file: File): ValidationError | null {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return { message: "Format tidak didukung. Gunakan JPG, PNG, atau WebP." };
    }
    if (file.size > MAX_SIZE_BYTES) {
      return {
        message: `Ukuran ${Math.round(file.size / 1024)}KB melebihi batas 2MB.`,
      };
    }
    return null;
  }

  /** Validasi dimensi gambar setelah load. */
  function validateDimensions(
    img: HTMLImageElement
  ): Promise<ValidationError | null> {
    return new Promise((resolve) => {
      if (img.naturalWidth >= MIN_DIMENSION && img.naturalHeight >= MIN_DIMENSION) {
        resolve(null);
      } else {
        resolve({
          message: `Ukuran ${img.naturalWidth}×${img.naturalHeight}px terlalu kecil. Minimal ${MIN_DIMENSION}×${MIN_DIMENSION}.`,
        });
      }
    });
  }

  /** Baca file sebagai data URL. */
  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Gagal membaca file."));
      reader.readAsDataURL(file);
    });
  }

  /** Proses file → base64 → simpan. */
  const processFile = useCallback(async (file: File) => {
    const validation = validateFile(file);
    if (validation) {
      setValidationError(validation);
      setStatus("error");
      return;
    }

    setValidationError(null);
    setStatus("saving");

    try {
      const dataUrl = await readFileAsDataUrl(file);
      // Validasi dimensi via Image object.
      const img = new window.Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Gagal memuat gambar."));
        img.src = dataUrl;
      });

      const dimError = await validateDimensions(img);
      if (dimError) {
        setValidationError(dimError);
        setStatus("error");
        return;
      }

      // Simpan → localStorage → sync ke Hero.
      setPhoto(dataUrl);
      setPreviewUrl(dataUrl);
      setStatus("success");
      setTimeout(() => successRef.current?.focus(), 50);
      // Reset status setelah beberapa detik.
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setValidationError({ message: "Gagal memproses gambar. Coba lagi." });
      setStatus("error");
    }
  }, [setPhoto]);

  /** Handler klik tombol upload. */
  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  /** Handler file input change. */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input supaya file sama bisa di-upload ulang.
    e.target.value = "";
  }

  /** Handler drag & drop. */
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
      setStatus("dragging");
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
    if (status === "dragging") setStatus("idle");
  }, [status]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  /** Handler hapus foto. */
  function handleRemove() {
    setPhoto(null);
    setPreviewUrl(null);
    setStatus("idle");
    setValidationError(null);
  }

  return (
    <motion.section
      aria-labelledby="uploader-heading"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
      className="rough-border border-2 border-ink bg-paper-soft p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8"
    >
      {/* Heading */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-handwritten text-xl text-ink-muted">Kelola</p>
          <h2 id="uploader-heading" className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
            Foto <span className="highlight-pink">Profil</span>
          </h2>
        </div>
        {activePreview && (
          <button
            type="button"
            onClick={handleRemove}
            className="rough-border-soft border-2 border-ink bg-paper px-4 py-1.5 font-display text-xs font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-shadow hover:shadow-[5px_5px_0_0_var(--color-ink)] sm:text-sm"
          >
            Hapus Foto
          </button>
        )}
      </div>

      <p className="mt-2 max-w-xl font-body text-base text-ink-soft">
        Upload foto yang muncul di beranda portofolio. Mendukung JPG, PNG, WebP — maks 2MB, min 200×200px.
      </p>

      {/* aria-live untuk status feedback */}
      <div aria-live="polite" aria-atomic="true" className="mt-6">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              ref={successRef}
              tabIndex={-1}
              role="status"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-handwritten text-lg text-ink"
            >
              Foto diperbarui di beranda! 🖼️
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Drop zone + preview */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative mt-6 flex flex-col items-center gap-4 rounded-sm border-2 border-dashed p-6 transition-colors sm:p-8 ${
          isDragOver
            ? "border-highlighter-blue bg-highlighter-blue/10"
            : "border-ink/30"
        }`}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFileChange}
          aria-label="Pilih file foto profil"
        />

        {/* Preview polaroid */}
        <div className="rough-border-soft relative w-48 border-2 border-ink bg-paper-soft p-2 pb-10 shadow-[6px_6px_0_0_var(--color-ink)] sm:w-56 sm:p-3 sm:pb-12">
          <div className="rough-border-soft aspect-square w-full overflow-hidden border border-ink/20 bg-paper-dark">
            {activePreview ? (
              <Image
                src={activePreview}
                alt="Preview foto profil"
                fill
                sizes="14rem"
                className="object-cover"
              />
            ) : (
              /* Default doodle AF placeholder */
              <div className="flex h-full w-full items-center justify-center text-ink">
                <svg viewBox="0 0 120 120" className="h-full w-full p-8" aria-hidden="true">
                  <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="61" cy="59" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
                  <rect x="32" y="44" width="56" height="32" rx="3" fill="var(--color-highlighter-yellow)" opacity="0.5" />
                  <text x="60" y="67" fontFamily="var(--font-kalam), 'Comic Sans MS', cursive" fontSize="28" fontWeight="bold" fill="currentColor" textAnchor="middle">AF</text>
                </svg>
              </div>
            )}
          </div>
          <p className="mt-2 text-center font-handwritten text-sm text-ink-muted sm:text-base">
            {previewUrl ? "~ Preview ~" : "~ Default ~"}
          </p>
        </div>

        {/* Upload button */}
        <motion.button
          type="button"
          onClick={handleUploadClick}
          disabled={status === "saving"}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02, rotate: [-0.5, 0.5, 0] }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          className="rough-border border-2 border-ink bg-highlighter-yellow px-6 py-2.5 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)] disabled:opacity-60 sm:text-base"
        >
          {status === "saving" ? "Menyimpan..." : "Ganti Foto"}
        </motion.button>

        <p className="font-handwritten text-xs text-ink-muted sm:text-sm">
          atau seret & lepas gambar ke area ini
        </p>
      </div>

      {/* Validation error */}
      {validationError && (
        <div
          role="alert"
          className="mt-4 rough-border-soft border-2 border-ink bg-highlighter-pink/40 px-4 py-2 font-handwritten text-base text-ink sm:text-lg"
        >
          {validationError.message}
        </div>
      )}
    </motion.section>
  );
}
