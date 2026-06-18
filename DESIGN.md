# Visual Language & UI/UX Specs (DESIGN.md)

## 🎨 Theme: Premium Hand-Drawn / Doodle Aesthetic
The goal is to create a highly personalized, authentic vibe that looks like a high-end sketchbook. No "AI Slop" or generic SaaS templates.

- **Color Palette**: 
  - Background: Off-White / Paper `#f8f9fa` or slightly textured `#F4F0EB`.
  - Ink (Primary Text/Borders): Charcoal Black `#1c1c1c` or `#2d2d2d`.
  - Accents (Highlighters): Vibrant Yellow `#FFD700`, Electric Blue `#2196F3`, and Pastel Pink `#FFB6C1` (used as rough brush strokes behind text).
- **Typography**: 
  - Headings: A handwritten or display serif font (e.g., 'Kalam', 'Caveat', or 'Space Grotesk' for contrast).
  - Body: A clean, highly legible sans-serif (e.g., 'Inter' or 'Geist') to balance the messy doodle vibe.

## 📐 Layout & Components

### 1. Header (Navigation)
- **Structure**: Floating, irregular-shaped pill container at the top center or left-aligned.
- **Branding**: "Achmad Fauzan" written in a bold, slightly jagged font.
- **Links**: `About`, `Contact`, `Project`. 
- **Animation**: On hover, a rough SVG scribble underlines the link (GSAP `drawSVG` or Framer Motion `pathLength` animation).

### 2. Hero Section
- **Layout**: Asymmetric split. Left side is text, right side is the photo card.
- **Copywriting Idea**: 
  - **Headline**: "Halo, Saya Achmad Fauzan. Menulis Kode. Menggambar Ide."
  - **Subheadline**: "Fullstack Developer yang membangun ekosistem digital dengan FastAPI & Next.js. Bebas dari desain membosankan, fokus pada performa dan estetika."
- **Photo Card**: 
  - The photo of Achmad Fauzan is placed inside a polaroid-style card with a slight rotation (e.g., `rotate-3`). 
  - **Doodle Element**: A hand-drawn SVG arrow points from the headline directly to the photo card with a handwritten note saying: *"Yep, ini saya!"*
- **Animation**: The photo card floats slightly up and down. The SVG arrow draws itself when the page loads.

### 3. About Section (The "Me" Canvas)
- **Design**: Looks like a ripped piece of paper or a sticky note taped to the screen.
- **Copywriting Idea**: "Saya percaya bahwa web development bukan sekadar menyatukan API dan UI, tapi tentang menciptakan pengalaman. Dengan Supabase sebagai fondasi data dan FastAPI untuk logika berat, saya memastikan *backend* sekuat *frontend*-nya."

### 4. Project Section (Grid Anti-Slop)
- **Layout**: Masonry or an irregular grid (do not use perfect squares). Cards have rough, hand-drawn borders.
- **Project 1**: "Doodle Backend API" - Sistem arsitektur microservices menggunakan FastAPI dengan validasi Pydantic yang ketat.
- **Project 2**: "Next.js Supabase Vault" - Platform autentikasi kustom dengan implementasi Row Level Security (RLS) tingkat tinggi.

### 5. Contact Section
- **Design**: A giant, hand-drawn mailbox or envelope.
- **Form**: Input fields just have a solid bottom border (no full boxes), acting like lined paper.
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

### 9. Custom Cursor (Signature Element)
- **Design**: Titik atau ujung pensil kecil mengikuti kursor dan meninggalkan jejak scribble samar saat hover di elemen interaktif.
- **Note**: Nonaktifkan efek ini di touch device, karena tidak relevan untuk perangkat tanpa mouse dan justru bisa mengganggu performa di mobile.

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