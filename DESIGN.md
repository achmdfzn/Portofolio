# Design System Documentation
## Website Portofolio Achmad Fauzan

---

## 1. Identitas Visual & Filosofi Desain

### Konsep Utama: Modern Pixel Aesthetic
Menggabungkan nuansa retro pixel art dengan tampilan modern minimalis, elegan, dan futuristik. Hasilnya adalah identitas visual yang unik, profesional, dan mudah diingat — bukan game lawas, melainkan teknologi masa depan yang terinspirasi dari akar digital.

### Tiga Pilar Desain
- **Clarity** — Setiap elemen memiliki tujuan. Tidak ada dekorasi yang tidak bermakna.
- **Precision** — Grid ketat, spacing konsisten, tipografi terukur. Mencerminkan mentalitas engineer.
- **Character** — Pixel aesthetic sebagai tanda tangan visual, bukan gimmick.

### Prinsip Desain
- Minimalis tapi berkarakter — kurangi noise, perkuat sinyal
- Konsistensi di atas kreativitas sesaat
- Aksesibilitas bukan afterthought, melainkan fondasi
- Performa adalah bagian dari desain

---

## 2. Color Palette

### Warna Dasar
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-bg` | `#0a0a0a` | Background utama |
| `--color-surface` | `#111111` | Card, panel, surface |
| `--color-surface-2` | `#1a1a1a` | Surface elevated |
| `--color-border` | `#222222` | Border default |
| `--color-border-subtle` | `#1a1a1a` | Border halus |

### Warna Teks
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-text-primary` | `#f0f0f0` | Teks utama |
| `--color-text-secondary` | `#a0a0a0` | Teks sekunder, caption |
| `--color-text-muted` | `#555555` | Placeholder, disabled |

### Aksen — Cyan Elektrik
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-accent` | `#00d4ff` | Aksen utama, CTA, highlight |
| `--color-accent-dim` | `#00d4ff33` | Background aksen transparan |
| `--color-accent-glow` | `#00d4ff66` | Efek glow |
| `--color-accent-dark` | `#0099bb` | Hover state aksen |

### Warna Status
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-success` | `#00ff88` | Status sukses |
| `--color-warning` | `#ffaa00` | Peringatan |
| `--color-error` | `#ff4444` | Error |

### Aturan Penggunaan Warna
- Aksen cyan hanya untuk elemen interaktif, highlight, dan focal point — jangan overuse
- Maksimal 2 warna aksen dalam satu viewport
- Background selalu gelap; jangan gunakan background terang kecuali untuk kontras yang disengaja
- Glow effect hanya pada elemen yang benar-benar ingin ditonjolkan

---

## 3. Tipografi

### Font Stack
```css
/* Heading utama — modern sans */
--font-heading: 'Geist', 'Inter', system-ui, sans-serif;

/* Pixel heading — hanya untuk nama / hero title */
--font-pixel: 'Press Start 2P', 'Courier New', monospace;

/* Body & UI */
--font-body: 'Geist', 'Inter', system-ui, sans-serif;

/* Code & terminal */
--font-mono: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

### Skala Tipografi
| Token | Size | Weight | Line Height | Penggunaan |
|-------|------|--------|-------------|------------|
| `--text-hero` | 4rem / 64px | 700 | 1.1 | Nama di hero (pixel font) |
| `--text-h1` | 2.5rem / 40px | 700 | 1.2 | Heading halaman |
| `--text-h2` | 1.75rem / 28px | 600 | 1.3 | Section heading |
| `--text-h3` | 1.25rem / 20px | 600 | 1.4 | Sub-heading |
| `--text-body-lg` | 1.125rem / 18px | 400 | 1.6 | Body besar |
| `--text-body` | 1rem / 16px | 400 | 1.6 | Body default |
| `--text-sm` | 0.875rem / 14px | 400 | 1.5 | Caption, label |
| `--text-xs` | 0.75rem / 12px | 400 | 1.4 | Badge, tag kecil |

### Aturan Tipografi
- Font pixel (`Press Start 2P`) **hanya** untuk nama "Achmad Fauzan" di hero dan elemen dekoratif tertentu
- Semua body text menggunakan Geist / Inter untuk keterbacaan optimal
- Jangan gunakan lebih dari 2 font family dalam satu halaman
- Letter spacing untuk pixel font: `0.05em`; untuk heading besar: `-0.02em`

---

## 4. Spacing & Layout

### Spacing Scale (berbasis 4px)
```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Grid System
- **Desktop**: 12 kolom, gutter 24px, max-width 1280px
- **Tablet**: 8 kolom, gutter 20px
- **Mobile**: 4 kolom, gutter 16px, padding horizontal 20px

### Container
```css
--container-sm:  640px
--container-md:  768px
--container-lg:  1024px
--container-xl:  1280px
--container-2xl: 1440px
```

---

## 5. Pixel Aesthetic — Panduan Penggunaan

### Elemen Pixel yang Diizinkan
- Nama "Achmad Fauzan" di hero section (font pixel)
- Pixel cursor custom (8×8 atau 16×16 px)
- Pixel grid overlay halus di background (opacity 3–5%)
- Pixel border / divider dekoratif (1px solid, sharp corner)
- Pixel icon kecil sebagai aksen (bukan icon utama)
- Loading animation berbasis pixel block

### Elemen Pixel yang Dilarang
- Sprite karakter game
- Pixel art yang mendominasi layout
- Warna palette 8-bit yang mencolok
- Animasi pixel yang mengganggu keterbacaan konten

### Noise Texture
- Gunakan SVG noise filter atau CSS grain dengan opacity 2–4%
- Terapkan hanya pada background, bukan pada teks atau komponen interaktif

---

## 6. Efek Visual

### Glow Effect
```css
/* Glow ringan untuk elemen aksen */
box-shadow: 0 0 20px var(--color-accent-glow);

/* Glow teks */
text-shadow: 0 0 20px var(--color-accent-glow);
```
Gunakan glow hanya pada: nama di hero, tombol CTA utama, dan elemen yang sedang di-hover/fokus.

### Border & Outline
- Border default: `1px solid var(--color-border)`
- Border aksen: `1px solid var(--color-accent)`
- Border radius: `4px` (sharp, pixel-feel) — jangan gunakan `rounded-full` kecuali untuk avatar
- Outline fokus: `2px solid var(--color-accent)` dengan `outline-offset: 2px`

### Backdrop & Blur
- Gunakan `backdrop-filter: blur(12px)` untuk panel overlay / modal
- Kombinasikan dengan `background: rgba(10,10,10,0.8)` untuk glassmorphism minimal

---

## 7. Animasi & Motion

### Prinsip Animasi
- Animasi harus memiliki tujuan: memberi feedback, mengarahkan perhatian, atau memperjelas hierarki
- Durasi pendek untuk micro-interaction (150–300ms), sedang untuk transisi halaman (400–600ms)
- Selalu sediakan `prefers-reduced-motion` fallback

### Timing Functions
```css
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1)   /* Material standard */
--ease-in:       cubic-bezier(0.4, 0, 1, 1)
--ease-out:      cubic-bezier(0, 0, 0.2, 1)
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1) /* Slight overshoot */
--ease-pixel:    steps(8, end)                    /* Pixel/stepped animation */
```

### Durasi
```css
--duration-fast:   150ms
--duration-normal: 300ms
--duration-slow:   500ms
--duration-page:   600ms
```

### Micro-interactions
- **Hover tombol**: scale 1.02, brightness +10%, durasi 150ms
- **Hover link**: underline slide-in dari kiri, warna berubah ke aksen
- **Hover card**: border berubah ke aksen, subtle glow, translate Y -2px
- **Click/tap**: scale 0.97, durasi 100ms
- **Focus**: outline aksen muncul dengan fade-in 150ms

### Animasi Halaman
- **Page enter**: fade-in + slide-up 20px, durasi 400ms, ease-out
- **Section reveal**: stagger children dengan delay 50ms per item
- **Countdown**: flip animation per digit, ease-spring

### Pixel Cursor
```css
cursor: url('/cursors/pixel-cursor.cur'), auto;
```
Cursor 16×16px, warna putih dengan outline hitam 1px.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Komponen Reusable

### Button
Varian: `primary`, `secondary`, `ghost`, `danger`
- Primary: background aksen, teks gelap, glow on hover
- Secondary: border aksen, teks aksen, background transparan
- Ghost: teks muted, border subtle, hover ke secondary
- Ukuran: `sm` (32px), `md` (40px), `lg` (48px)
- Border radius: 4px (pixel-feel)

### Badge / Tag
- Background: `var(--color-accent-dim)`
- Border: `1px solid var(--color-accent)`
- Teks: `var(--color-accent)`, font-size xs
- Padding: 2px 8px

### Card
- Background: `var(--color-surface)`
- Border: `1px solid var(--color-border)`
- Border radius: 4px
- Hover: border berubah ke aksen, glow ringan
- Padding: 24px

### Input / Form
- Background: `var(--color-surface-2)`
- Border: `1px solid var(--color-border)`
- Focus border: `var(--color-accent)`
- Border radius: 4px
- Placeholder: `var(--color-text-muted)`

### Divider
- `1px solid var(--color-border)`
- Atau pixel divider: `1px dashed var(--color-border)` dengan gap

---

## 9. Responsive Design

### Breakpoints
```css
--bp-sm:  640px   /* Mobile landscape */
--bp-md:  768px   /* Tablet */
--bp-lg:  1024px  /* Laptop */
--bp-xl:  1280px  /* Desktop */
--bp-2xl: 1536px  /* Large desktop */
```

### Perilaku Responsif
- **Mobile first** — mulai dari mobile, tambahkan kompleksitas ke atas
- Navigasi mobile: hamburger menu dengan slide-in panel
- Font hero di mobile: 2rem (dari 4rem di desktop)
- Grid kolom menyesuaikan breakpoint (lihat bagian Grid)
- Touch target minimal 44×44px di mobile
- Padding horizontal mobile: 20px

---

## 10. Aksesibilitas

### Standar
- WCAG 2.1 Level AA minimum
- Contrast ratio teks normal: minimal 4.5:1
- Contrast ratio teks besar (18px+): minimal 3:1
- Aksen cyan `#00d4ff` di atas background `#0a0a0a`: ratio ~9.5:1 ✓

### Implementasi
- Semua gambar memiliki `alt` text yang deskriptif
- Semua elemen interaktif dapat diakses via keyboard (Tab, Enter, Space, Escape)
- Focus indicator selalu terlihat — jangan `outline: none` tanpa pengganti
- ARIA label untuk icon-only button
- Heading hierarchy konsisten (h1 → h2 → h3, tidak melompat)
- `lang="id"` di root HTML

---

## 11. Dark Mode

Website ini secara default adalah dark mode. Jika light mode ditambahkan di Phase 4:
- Gunakan CSS custom properties untuk semua warna
- Toggle via `data-theme="light"` di root element
- Simpan preferensi di localStorage
- Hormati `prefers-color-scheme` sebagai default awal

---

## 12. Referensi Visual

- **Typografi & Layout**: Linear.app, Vercel.com
- **Pixel Aesthetic**: PICO-8, Lospec palette, early web aesthetic
- **Motion**: Stripe, Framer.com
- **Dark UI**: Raycast, Fig, Warp terminal
- **Portfolio**: Brittany Chiang (bchiang7.com), Josh Comeau

---

**Document Version**: 1.0
**Last Updated**: 23 Juli 2026
**Status**: Active — gunakan sebagai acuan utama selama development
