# Visual Language & UI/UX Specs (DESIGN.md)

## 🎨 Theme: Premium Hand-Drawn / Doodle Aesthetic
The goal is to create a highly personalized, authentic vibe that looks like a high-end sketchbook. No "AI Slop" or generic SaaS templates.

- **Color Palette**: 
  - Background: Off-White / Paper `#f8f9fa` or slightly textured `#F4F0EB`.
  - Ink (Primary Text/Borders): Charcoal Black `#1c1c1c` or `#2d2d2d`.
  - Accents (Highlighters): Vibrant Yellow `#FFD700`, Electric Blue `#2196F3`, and Pastel Pink `#FFB6C1` (used as rough brush strokes behind text).
- **Dark Mode** (opt-in via toggle di Header):
  - Background: Deep warm paper `#1a1815` / `#242019` / `#15130f`.
  - Ink: Soft paper white `#f4f0eb` / `#e0dcd4` / muted `#a8a39a`.
  - Accents sedikit lebih terang supaya tetap pop di latar gelap.
  - Default mengikuti `prefers-color-scheme`; pilihan user disimpan di localStorage. Anti-FOUC via script blocking di `<head>`.
- **Typography**: 
  - Headings: A handwritten or display serif font (e.g., 'Kalam', 'Caveat', or 'Space Grotesk' for contrast).
  - Body: A clean, highly legible sans-serif (e.g., 'Inter' or 'Geist') to balance the messy doodle vibe.

## 📐 Layout & Components

### 1. Header (Navigation)
- **Structure**: Irregular-shaped pill container di atas halaman (flat, non-sticky). Header ikut normal document flow dan scroll away bersama konten — tidak melayang/nempel di atas saat scroll.
- **Branding**: "Achmad Fauzan" written in a bold, slightly jagged font.
- **Links**: `About`, `Project`, `Skills`, `Contact`.
- **Theme Toggle**: Tombol Light/Dark mode doodle (matahari ↔ bulan) di sisi kanan, tampil di desktop & mobile.
- **Animation**: On hover, a rough SVG scribble underlines the link (GSAP `drawSVG` or Framer Motion `pathLength` animation).

### 2. Hero Section
- **Layout**: Asymmetric split. Left side is text, right side is the visual element.
- **Copywriting Idea**: 
  - **Headline**: "Halo, Saya Achmad Fauzan. Menulis Kode. Menggambar Ide."
  - **Subheadline**: "Fullstack Developer yang membangun ekosistem digital dengan FastAPI & Next.js. Bebas dari desain membosankan, fokus pada performa dan estetika."
- **Visual Element (kanan)**: 
  - *Keputusan desain*: alih-alih foto polaroid tunggal (butuh upload foto asli), kolom kanan pakai **grid 2×2 panel doodle** — tiap panel warna highlighter berbeda (kuning/biru/pink), rotasi organik, berisi doodle SVG (avatar AF, code bracket, bohlam ide, terminal prompt). Panel melayang halus (idle floating animation) supaya terasa hidup, bukan statis.
  - Wavy underline hand-drawn menggambar sendiri (pathLength) di bawah headline.
- **Animation**: Panel masuk staggered (delay per panel), lalu idle float naik-turun berulang dengan offset berbeda supaya gerakan tidak sinkron. Reduced motion → semua animasi dimatikan.

### 3. About Section (The "Me" Canvas)
- **Design**: Looks like a ripped piece of paper or a sticky note taped to the screen.
- **Copywriting Idea**: "Saya percaya bahwa web development bukan sekadar menyatukan API dan UI, tapi tentang menciptakan pengalaman. Dengan Supabase sebagai fondasi data dan FastAPI untuk logika berat, saya memastikan *backend* sekuat *frontend*-nya."

### 4. Project Section (Grid Anti-Slop)
- **Layout**: 3-column uniform grid (responsive: 1 / 2 / 3 kolom). Cards have rough, hand-drawn borders.
- **Card (minimal)**: Judul + tahun, tech badges (dengan ikon doodle), CTA arrow. Deskripsi tidak ditampilkan di card — tersedia di halaman detail.
- **Project 1**: "Doodle Backend API" - Sistem arsitektur microservices menggunakan FastAPI dengan validasi Pydantic yang ketat.
- **Project 2**: "Next.js Supabase Vault" - Platform autentikasi kustom dengan implementasi Row Level Security (RLS) tingkat tinggi.
- **Project 3**: "Sketchboard Collab" - Aplikasi kolaborasi real-time bergaya infinite canvas dengan WebSocket dan Canvas API.

### 4b. Skills Section (Marquee Ticker)
- **Layout**: 2 baris marquee berjalan infinite. Baris atas geser ke kiri, baris bawah geser ke kanan (arah berlawanan).
- **Item**: Setiap skill berupa TechBadge (ikon SVG doodle + nama tech), dipakai untuk: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Python, FastAPI, Tailwind CSS, PostgreSQL, MongoDB, Redis, Docker, Git, Supabase, REST API, WebSocket, Framer Motion, Zod.
- **Animation**: CSS `@keyframes` infinite scroll (bukan JS) untuk performa optimal. Fade edges di kiri & kanan supaya transisi mulus. Hormati `prefers-reduced-motion` (marquee berhenti).
- **Copywriting Idea**: "Tools yang saya pakai. Dari frontend hingga backend — ini senjata harian saya."

### 5. Contact Section
- **Design**: Form bergaya lined-paper full-width (single column, tanpa ilustrasi envelope kolom kiri). Heading + copywriting singkat di atas form sebagai intro.
- **Form**: Input fields just have a solid bottom border (no full boxes), acting like lined paper. Field Nama & Email side-by-side (grid 2 kolom di desktop), Pesan full-width.
- **Copywriting Idea**: "Punya ide gila? Mari kita diskusikan. (Atau sekadar menyapa via email)."

### 6. Footer Section
- **Design**: Footer terlihat seperti bagian bawah halaman sketchbook, dibatasi garis sobekan kasar (jagged border-top) dari konten di atasnya.
- **Content**: Quick links (About, Project, Contact) dan ikon sosial media (GitHub, LinkedIn, Email) digambar manual sebagai doodle kecil, bukan ikon Font Awesome generik.
- **Copywriting Idea**: "Dibuat dengan kopi, banyak debugging, dan sedikit kewarasan. © 2026 Achmad Fauzan."
- **Animation**: Tanda tangan kecil yang seolah "menulis sendiri" (SVG `pathLength`) muncul saat footer masuk viewport.

### 7. Loading / Intro Sequence
- **Design**: Sebelum hero muncul, tampilkan animasi singkat berupa pena yang menggambar inisial "AF" stroke demi stroke, lalu fade ke hero section.
- **Duration**: Maksimal 1.5 detik, dan sediakan opsi skip (klik di mana saja pada layar) supaya pengunjung yang kembali lagi tidak harus menunggu animasi yang sama berulang kali.

### 8. Project Detail Page (Case Study)
- **Design**: Setiap card di Project Section mengarah ke halaman detail tersendiri, bukan sekadar modal popup, supaya project punya ruang cerita yang lebih lengkap.
- **Content**: Problem statement, peran Achmad di project tersebut, badge tech stack berbentuk pil dengan border tangan, screenshot dalam bingkai polaroid, dan tombol "Lihat di GitHub" yang didesain seperti stempel.

## 🌪️ Motion & Interactions (Taste-Skill Rules)
- **No cheap transitions**: Avoid standard `transition-all duration-300`. 
- **Magnetic Elements**: Use Framer Motion to make the "Project" cards slightly pull towards the user's cursor.
- **Scroll Reveal**: Elements don't just fade in; they "unfold" or "sketch" themselves into existence as they enter the viewport.
- **Reduced Motion**: Hormati setting `prefers-reduced-motion` di browser pengguna. Saat aktif, ganti animasi unfold/sketch dengan fade-in sederhana, jangan dihilangkan total agar transisi antar section tetap halus.

## 📱 Responsiveness & Accessibility (Quality Floor)
- **Breakpoints**: Mobile-first dengan breakpoint standar Tailwind (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px). Header berubah jadi hamburger menu bergambar tangan di mobile, dan efek magnetic cursor pada Project cards otomatis nonaktif di bawah breakpoint `md`.
- **Contrast**: Pastikan teks Charcoal di atas Off-White sudah lolos WCAG AA. Warna aksen (Yellow, Blue, Pink) dipakai untuk dekorasi atau highlight saja, bukan untuk teks penting, agar kontras tetap terjaga.
- **Focus State**: Ganti outline focus bawaan browser dengan ring tangan kasar (rough circle atau scribble underline) supaya pengguna keyboard tetap bisa melihat elemen aktif tanpa merusak vibe doodle-nya.
- **Alt Text**: Semua foto dan ilustrasi doodle wajib punya alt text deskriptif untuk screen reader.

## 🔍 Metadata & SEO
- **Favicon**: Ikon kecil berisi inisial "AF" dalam lingkaran tangan, konsisten dengan branding di header.
- **Open Graph Image**: Siapkan gambar 1200x630px bergaya sama dengan hero section, supaya preview link di WhatsApp atau LinkedIn tetap terlihat khas.
- **Title & Description**: Pakai pola title "Achmad Fauzan - Fullstack Developer" dan meta description singkat yang mengandung kata kunci FastAPI, Next.js, dan Supabase untuk membantu pencarian organik.