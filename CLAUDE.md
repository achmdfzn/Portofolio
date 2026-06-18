# Developer Guidelines & Tech Stack (CLAUDE.md)

## 🏗️ Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion / GSAP.
- **Backend**: FastAPI (Python) - `https://github.com/fastapi/fastapi`.
- **Database & Auth**: Supabase.
- **Styling Method**: Brutalist/Doodle aesthetic (Rough.js or custom SVG masking, raw CSS shapes).

## 🚫 Anti-Slop Rules (Taste-Skill Alignment)
1. **NO PLACEHOLDERS**: Do not use `[Insert Text Here]` or `// Add logic later`. Write complete, production-ready code.
2. **NO GENERIC UI**: Avoid standard 16px border-radius, generic glowing drop-shadows, or perfectly symmetric bento boxes.
3. **SPACING MATTERS**: Use extreme, intentional spacing. Let elements breathe (e.g., `gap-24`, `mb-32`).
4. **FULL OUTPUT**: Never truncate code responses. If writing a component, write the entire component from imports to export.

## 🛠️ Code Conventions
- **Next.js**: Use Server Components by default. Only use `'use client'` for interactive components (animations, state).
- **FastAPI**: Use standard Pydantic models. Keep routing modular (`/routers`).
- **Supabase**: Use Supabase SSR (Server-Side Rendering) packages for authentication securely in Next.js.

## 📁 Project Structure
```
/app                    -> Next.js App Router pages
/components             -> Reusable UI components
/lib                     -> Supabase client, fetcher, helper functions
/backend
  /routers               -> FastAPI route modules
  /models                -> Pydantic schemas
  /core                  -> Config, security, dependencies
.env.local               -> Local environment variables (jangan di-commit)
.env.example              -> Template environment variables untuk setup baru
```

## 🔐 Environment Variables
- **Frontend**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL` (alamat backend FastAPI).
- **Backend**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ALLOWED_ORIGINS` untuk konfigurasi CORS.
- **Aturan Penting**: Jangan pernah expose `SERVICE_ROLE_KEY` ke sisi frontend karena key tersebut bisa melewati Row Level Security.

## ✅ Testing & Linting
- **Next.js**: ESLint dan Prettier untuk konsistensi format, Vitest atau React Testing Library untuk unit test komponen penting.
- **FastAPI**: Ruff untuk linting, Pytest dengan `TestClient` untuk menguji endpoint sebelum dianggap selesai.

## 🌳 Git Convention
- Gunakan Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) supaya riwayat perubahan mudah ditelusuri.
- Branch `main` hanya menerima merge dari branch feature lewat pull request, hindari direct push ke `main`.

## 📈 Performance & Accessibility Target
- Target Lighthouse score minimal 90 untuk aspek Performance, Accessibility, dan SEO.
- Gunakan `next/image` untuk semua gambar supaya otomatis lazy load dan teroptimasi ukurannya.
- Seluruh animasi wajib menghormati `prefers-reduced-motion`, selaras dengan catatan accessibility di `DESIGN.md`.