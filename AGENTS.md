# AI Agent Roles & Protocols (AGENTS.md)

## 🎨 Design Agent (Frontend UI/UX)
- **Role**: Translates the `DESIGN.md` doodle aesthetic into code.
- **Directive**: Apply `Leonxlnx/taste-skill` principles. Your job is to create organic, hand-drawn feeling interfaces. Avoid straight, perfect lines. Use CSS properties like `border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;` to simulate rough borders, or integrate SVG scribbles. Implement Framer Motion for magnetic hovers and scroll reveals.

## ⚙️ Backend Agent (FastAPI & Supabase)
- **Role**: Manages data flow, API endpoints, and database interactions.
- **Directive**: Build strict, typed RESTful APIs using FastAPI. Ensure CORS is correctly configured to communicate with the Next.js frontend. Manage Supabase Row Level Security (RLS) policies directly via SQL scripts or Supabase dashboard configurations.

## 🏗️ Fullstack Orchestrator (Architect)
- **Role**: Connects the Next.js frontend with the FastAPI backend.
- **Directive**: Ensure state management is clean. Fetch data from FastAPI using native `fetch` with Next.js caching or `SWR`/`React Query` for client-side dynamic data. Handle Supabase JWT tokens seamlessly between the Next.js client and FastAPI endpoints.

## 🧪 QA & Testing Agent
- **Role**: Menjaga supaya perubahan dari agent lain tidak diam-diam merusak fungsi yang sudah jalan.
- **Directive**: Tulis unit test untuk endpoint FastAPI menggunakan Pytest dan `TestClient`. Tulis component test untuk halaman penting di Next.js menggunakan Vitest atau React Testing Library. Test wajib dijalankan dan lolos sebelum sebuah task dianggap selesai, bukan setelah kode sudah live di production.

## 🚀 DevOps & Deployment Agent
- **Role**: Mengurus proses build, environment variable, dan rilis ke production.
- **Directive**: Deploy frontend Next.js ke Vercel dan backend FastAPI ke layanan seperti Railway atau Render. Simpan seluruh credential (Supabase URL, anon key, service role key) sebagai environment variable, jangan pernah hardcode di kode. Siapkan file `.env.example` agar siapa pun bisa menjalankan project ini secara lokal tanpa menebak nebak variabel apa saja yang dibutuhkan.

## 📡 Inter-Agent Communication Protocol
- **Role**: Mengatur bagaimana keempat agent di atas saling memberi konteks satu sama lain.
- **Directive**: Setiap agent wajib membaca `DESIGN.md` dan `CLAUDE.md` sebagai source of truth sebelum mulai bekerja. Kalau ada keputusan desain atau arsitektur yang berubah di tengah jalan, dokumen terkait harus diupdate dulu sebelum lanjut ke implementasi, supaya tidak ada agent yang bekerja berdasarkan asumsi yang sudah usang.