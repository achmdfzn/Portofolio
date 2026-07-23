@AGENTS.md

---

# Claude AI Working Rules
## Website Portofolio Achmad Fauzan

Dokumen ini berisi aturan kerja khusus untuk Claude AI selama proses development proyek ini. Semua aturan bersifat wajib dan berlaku di setiap sesi kerja.

---

## 1. Prinsip Utama

- **Documentation-first** — Sebelum menulis kode, baca PRD.md, DESIGN.md, dan AGENTS.md yang relevan.
- **Explain before big changes** — Sebelum melakukan perubahan arsitektur, refactor besar, atau keputusan teknis signifikan, jelaskan rencana dan alasannya terlebih dahulu.
- **No duplicate code** — Cek apakah komponen atau fungsi serupa sudah ada sebelum membuat yang baru.
- **Minimal footprint** — Tulis hanya kode yang benar-benar diperlukan. Hindari boilerplate, komentar berlebihan, dan abstraksi prematur.

---

## 2. TypeScript & Kode

- Selalu gunakan **TypeScript strict mode** (`"strict": true` di tsconfig).
- Tidak ada `any` kecuali benar-benar tidak ada alternatif — dan harus diberi komentar alasannya.
- Gunakan `type` untuk union/intersection, `interface` untuk object shape yang akan di-extend.
- Semua props komponen harus memiliki tipe eksplisit.
- Gunakan `const` sebagai default; `let` hanya jika nilai berubah.
- Tidak ada `console.log` di kode produksi.

---

## 3. Struktur Komponen & Arsitektur

- Ikuti **Atomic Design**: atoms → molecules → organisms → templates → pages.
- **Server Components** sebagai default. Gunakan `'use client'` hanya jika benar-benar membutuhkan interaktivitas browser (event handler, hooks, browser API).
- Satu komponen = satu tanggung jawab (Single Responsibility Principle).
- Komponen yang digunakan lebih dari satu kali harus dipindahkan ke folder `components/`.
- Pisahkan logic dari presentasi — gunakan custom hooks untuk logic yang kompleks.

---

## 4. Naming Convention

| Entitas | Konvensi | Contoh |
|---------|----------|--------|
| Komponen React | PascalCase | `HeroSection`, `CountdownTimer` |
| File komponen | kebab-case | `hero-section.tsx`, `countdown-timer.tsx` |
| Hooks | camelCase + `use` prefix | `useCountdown`, `useScrollPosition` |
| Fungsi utilitas | camelCase | `formatDate`, `cn` |
| Konstanta | SCREAMING_SNAKE_CASE | `LAUNCH_DATE`, `SOCIAL_LINKS` |
| CSS class (Tailwind) | Tailwind utility, tidak ada custom class kecuali perlu |
| Type/Interface | PascalCase | `CountdownProps`, `SocialLink` |

---

## 5. Design System — Wajib Diikuti

- Semua warna menggunakan CSS custom properties dari DESIGN.md — tidak ada hardcode hex di komponen.
- Semua spacing menggunakan skala Tailwind yang sesuai dengan spacing scale di DESIGN.md.
- Border radius selalu `rounded` (4px) — tidak ada `rounded-full` kecuali untuk avatar/badge bulat.
- Font pixel (`Press Start 2P`) hanya untuk nama "Achmad Fauzan" di hero dan elemen dekoratif yang sudah didefinisikan di DESIGN.md.
- Animasi mengikuti durasi dan easing dari DESIGN.md — tidak ada magic number.

---

## 6. Performa

- Gunakan `next/image` untuk semua gambar — tidak ada tag `<img>` biasa.
- Gunakan `next/font` untuk semua font — tidak ada `@import` Google Fonts di CSS.
- Dynamic import (`next/dynamic`) untuk komponen berat yang tidak perlu di initial load.
- Hindari re-render yang tidak perlu — gunakan `useMemo` dan `useCallback` dengan bijak (hanya jika ada bukti performa, bukan spekulatif).

---

## 7. Aksesibilitas

- Semua gambar dekoratif: `alt=""`. Semua gambar informatif: `alt` yang deskriptif.
- Semua tombol icon-only harus punya `aria-label`.
- Jangan hapus `outline` pada focus tanpa menyediakan pengganti yang terlihat.
- Gunakan elemen semantik yang tepat: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Heading hierarchy harus konsisten — tidak boleh melompat dari `h1` ke `h3`.

---

## 8. SEO

- Setiap halaman harus memiliki `metadata` yang lengkap via Next.js Metadata API.
- Gunakan `generateMetadata` untuk halaman dinamis.
- Structured data (JSON-LD) untuk halaman utama.
- Semua URL harus human-readable dan deskriptif.

---

## 9. Responsive Design

- **Mobile-first** — mulai dari breakpoint terkecil, tambahkan kompleksitas ke atas.
- Uji di breakpoint: 375px (mobile), 768px (tablet), 1280px (desktop).
- Touch target minimal 44×44px untuk semua elemen interaktif di mobile.

---

## 10. Git & Dokumentasi

- Commit message mengikuti Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`.
- Setiap komponen baru yang non-trivial harus memiliki JSDoc singkat di atasnya jika props-nya tidak self-explanatory.
- Update dokumentasi (PRD, DESIGN, AGENTS) jika ada keputusan teknis yang mengubah arah proyek.

---

## 11. Hal yang Dilarang

- ❌ Membuat file duplikat dengan nama berbeda untuk fungsi yang sama
- ❌ Menggunakan `!important` di CSS kecuali untuk override library eksternal
- ❌ Meng-commit `.env` atau file berisi secret
- ❌ Menggunakan `dangerouslySetInnerHTML` tanpa sanitasi
- ❌ Membuat komponen dengan lebih dari ~200 baris — pecah menjadi sub-komponen
- ❌ Mengabaikan TypeScript error dengan `@ts-ignore` tanpa penjelasan

---

**Document Version**: 1.0
**Last Updated**: 23 Juli 2026
**Status**: Active — berlaku untuk semua sesi development
