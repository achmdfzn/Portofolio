# Portofolio — Achmad Fauzan

Personal portfolio bergaya **hand-drawn / doodle aesthetic**. Bukan template SaaS
generik — setiap sudut dirancang seperti sketchbook premium: border kasar tangan,
accent highlighter, dan animasi yang "menggambar dirinya sendiri".

Dibangun **frontend-first**: seluruh halaman (marketing, login, dashboard) sudah
berfungsi penuh secara lokal dengan mock auth berbentuk kontrak Supabase. Saat
Supabase & FastAPI diaktifkan, cukup ganti implementasi auth tanpa menyentuh
komponen/hook.

> ⚠️ **Status**: Fase frontend-first. Backend FastAPI & Supabase belum
> terhubung. Autentikasi saat ini adalah **mock** (lihat
> [`lib/auth-mock.ts`](lib/auth-mock.ts)) — bukan autentikasi sungguhan.

---

## 🧱 Tech Stack

| Lapisan      | Teknologi                                                 |
| ------------ | --------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router) + React 19  |
| Styling      | Tailwind CSS v4                                           |
| Animasi      | Framer Motion (magnetic hover, scroll reveal, pathLength) |
| Validasi     | Zod                                                       |
| Auth (mock)  | `lib/auth-mock.ts` — kontrak identik dengan target Supabase SSR |
| Backend*     | FastAPI + Supabase (direncanakan, lihat [`CLAUDE.md`](CLAUDE.md)) |

*Belum diintegrasikan pada fase ini.

---

## 🚀 Quick Start

Prasyarat: Node.js 18.18+ (atau versi terbaru yang didukung Next 16) dan npm.

```bash
# 1. Install dependency
npm install

# 2. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> Di Windows, jika dev server bermasalah (HMR/compile lambat), gunakan flag
> webpack: `npm run dev:webpack`.

### Scripts

| Perintah            | Fungsi                                     |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server (Turbopack)                     |
| `npm run dev:webpack` | Dev server dengan bundler webpack (fallback Windows) |
| `npm run build`     | Build produksi                             |
| `npm run start`     | Jalankan hasil build                       |
| `npm run lint`      | ESLint (`eslint-config-next`)              |

---

## 🔐 Demo Login

Halaman login tersembunyi di [`/auth`](http://localhost:3000/auth). Setelah login,
route [`/dashboard`](http://localhost:3000/dashboard) terbuka.

```
Email    : admin@achmdfauzan.dev
Password : portofolio2026
```

Sesi berlaku 7 hari, disimpan di `localStorage` + cookie flag `af_auth=1` yang
dibaca oleh [`proxy.ts`](proxy.ts) (konvensi middleware Next.js 16) untuk
mengguard `/dashboard`. Lihat detail & catatan keamanan di
[`lib/auth-mock.ts`](lib/auth-mock.ts).

---

## 📁 Struktur Project

```
app/
  (marketing)/        # Halaman publik: /, /projects/...
  (auth)/auth/        # Halaman login tersembunyi
  (app)/dashboard/    # Area terlindungi (perlu login)
  layout.tsx          # Root layout + script anti-FOUC tema
  sitemap.ts / robots.ts / manifest.ts / opengraph-image.tsx
components/
  *.tsx               # Section marketing (Hero, About, Project, Skills, Contact, Footer)
  dashboard/          # Widget dashboard (StatCard, PhotoUploader, dst.)
hooks/                # useAuth, useTheme, useMediaQuery, useProfilePhoto, ...
lib/
  auth.ts             # Kontrak interface (source of truth perilaku auth)
  auth-mock.ts        # Implementasi mock (akan diganti Supabase)
  projects.ts / nav.ts
proxy.ts              # Middleware Next 16 — guard /dashboard
DESIGN.md             # Spec visual & UX (source of truth desain)
CLAUDE.md             # Konvensi kode & tech stack
AGENTS.md             # Peran & protokol AI agent
```

---

## 🎨 Design System

Source of truth desain ada di [`DESIGN.md`](DESIGN.md). Ringkasannya:

- **Palet**: kertas off-white `#f8f9fa` + tinta charcoal `#1c1c1c`, accent
  highlighter (kuning / biru / pink) sebagai sapuan kasar di belakang teks.
- **Dark mode**: default mengikuti `prefers-color-scheme`, override disimpan di
  `localStorage`. Anti-FOUC via script blocking di `<head>`.
- **Tipografi**: heading handwritten/display serif, body sans-serif bersih.
- **Motion**: tidak ada `transition-all` murahan. Kartu project "magnetis"
  mengikuti kursor, elemen "tersketsa" saat masuk viewport. Semua animasi
  menghormati `prefers-reduced-motion`.

Konvensi kode (Server Component by default, `'use client'` hanya untuk yang
interaktif) dijabarkan di [`CLAUDE.md`](CLAUDE.md).

---

## 🗺️ Roadmap

- [ ] Integrasikan Supabase SSR (ganti `auth-mock.ts`, jaga kontrak `auth.ts`)
- [ ] Sambungkan backend FastAPI (Pydantic models, modular routers)
- [ ] Halaman detail project (case study) — lihat DESIGN.md §8
- [ ] Test suite: Vitest/RTL (frontend) + Pytest/TestClient (backend)
- [ ] Deploy: Next.js → Vercel, FastAPI → Railway/Render

---

## 📄 Lisensi

Kode pribadi. Hubungi pemilik repo untuk penggunaan.
