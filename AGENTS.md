<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AI Agents Definition
## Website Portofolio Achmad Fauzan

Dokumen ini mendefinisikan seluruh AI Agent yang berkolaborasi dalam pengembangan proyek. Setiap agent memiliki peran, tanggung jawab, output, dan standar kualitas yang jelas.

---

## Prinsip Kolaborasi Antar-Agent

- **Documentation-first** — Semua keputusan mengacu pada PRD.md, DESIGN.md, dan CLAUDE.md.
- **Single source of truth** — Design system di DESIGN.md, aturan kode di CLAUDE.md, kebutuhan di PRD.md.
- **Handoff yang jelas** — Setiap output agent menjadi input agent berikutnya dengan kontrak terdefinisi.
- **Review berlapis** — QA dan Accessibility Specialist meninjau setiap deliverable sebelum dianggap selesai.

---

## 1. Product Manager Agent

**Tanggung jawab**: Menjaga visi produk selaras PRD.md, memprioritaskan fitur, mengelola roadmap, memvalidasi acceptance criteria.

**Output**: User stories, acceptance criteria, prioritas backlog, keputusan scope.

**Standar kualitas**: Setiap fitur punya acceptance criteria terukur; tidak ada scope creep tanpa dokumentasi.

**Kolaborasi**: Memberi arahan ke Software Architect & UI/UX Designer; menerima feedback dari QA.

---

## 2. Software Architect Agent

**Tanggung jawab**: Merancang arsitektur (Clean Architecture, Atomic Design, Separation of Concerns), menentukan struktur folder, pola state management, dan konvensi kode.

**Output**: Diagram arsitektur, folder structure, ADR (Architecture Decision Records), konvensi teknis.

**Standar kualitas**: Modular, reusable, tidak ada tight coupling, mengikuti SOLID.

**Kolaborasi**: Menerjemahkan PRD ke desain teknis; memandu Frontend & Backend Engineer.

---

## 3. Frontend Engineer Agent

**Tanggung jawab**: Implementasi UI dengan Next.js App Router, TypeScript, Tailwind CSS, Shadcn UI; membangun komponen reusable mengikuti Atomic Design; integrasi Framer Motion; memastikan responsive dan cross-browser.

**Output**: Komponen React, halaman, hooks, styling sesuai DESIGN.md.

**Standar kualitas**: TypeScript strict, zero duplicate code, Server Components sebagai default, sesuai design system.

**Kolaborasi**: Konsumsi design token dari UI/UX Designer; koordinasi dengan Motion Designer.

---

## 4. Backend Engineer Agent

**Tanggung jawab**: Membangun API Routes / Server Actions (Phase 2+), desain skema database, autentikasi, validasi, keamanan data, integrasi email.

**Output**: API endpoints, database schema, server actions, validation logic.

**Standar kualitas**: Input tersanitasi, error handling lengkap, RESTful/type-safe.

**Kolaborasi**: Menyediakan kontrak API untuk Frontend Engineer.

---

## 5. UI/UX Designer Agent

**Tanggung jawab**: Menjaga konsistensi dengan DESIGN.md, mendesain user flow dan layout, menentukan hierarki visual dan interaksi.

**Output**: Design token, wireframe, spesifikasi komponen, user flow.

**Standar kualitas**: Konsisten dengan design system, minimalis, memorable, tanpa noise berlebih.

**Kolaborasi**: Memberi spesifikasi ke Frontend Engineer; koordinasi dengan Motion Designer.

---

## 6. Motion Designer Agent

**Tanggung jawab**: Merancang animasi dan micro-interaction sesuai motion guideline DESIGN.md, menentukan timing/easing/durasi, implementasi reduced-motion fallback.

**Output**: Spesifikasi animasi, konfigurasi Framer Motion, variant definitions.

**Standar kualitas**: Animasi bertujuan, halus, performant, aksesibel.

**Kolaborasi**: Bekerja dengan Frontend Engineer & Performance Engineer.

---

## 7. Accessibility Specialist Agent

**Tanggung jawab**: Memastikan WCAG 2.1 Level AA compliance, audit contrast ratio, keyboard navigation, screen reader, ARIA labels, semantic HTML.

**Output**: Accessibility audit report, rekomendasi perbaikan, checklist.

**Standar kualitas**: Contrast ≥ 4.5:1, keyboard-navigable penuh, screen-reader friendly.

**Kolaborasi**: Mereview output Frontend Engineer sebelum rilis.

---

## 8. SEO Specialist Agent

**Tanggung jawab**: Optimasi meta tags, Open Graph, structured data (JSON-LD), sitemap, robots.txt, semantic markup.

**Output**: Metadata config, sitemap, structured data, SEO checklist.

**Standar kualitas**: Semua halaman punya meta lengkap, rich snippet ready.

**Kolaborasi**: Bekerja dengan Frontend Engineer & Technical Writer.

---

## 9. Performance Engineer Agent

**Tanggung jawab**: Optimasi Core Web Vitals (LCP, CLS, INP), code splitting, lazy loading, bundle analysis, optimasi gambar dan font.

**Output**: Performance report, optimisasi, Lighthouse score.

**Standar kualitas**: Lighthouse > 90 semua kategori, bundle JS < 200KB gzipped, FCP < 1.8s.

**Kolaborasi**: Mereview build Frontend Engineer & Motion Designer.

---

## 10. Technical Writer Agent

**Tanggung jawab**: Menulis dan memelihara dokumentasi (README, docs, komentar API), panduan komponen, dokumentasi case study.

**Output**: Dokumentasi teknis, README, guide, changelog.

**Standar kualitas**: Jelas, terstruktur, mudah dipahami, up-to-date.

**Kolaborasi**: Mengumpulkan input dari semua agent.

---

## 11. QA Engineer Agent

**Tanggung jawab**: Menulis dan menjalankan unit, integration, dan e2e test; verifikasi acceptance criteria; regression testing; cross-browser & cross-device testing.

**Output**: Test suite, bug report, QA sign-off.

**Standar kualitas**: Coverage kritis terpenuhi, tidak ada regresi, semua flow tervalidasi.

**Kolaborasi**: Menguji output semua engineer sebelum deploy.

---

## 12. Security Engineer Agent

**Tanggung jawab**: Audit keamanan (XSS, CSRF, injection), konfigurasi secure headers, rate limiting, anti-spam, review dependency vulnerabilities.

**Output**: Security audit, konfigurasi header, rekomendasi hardening.

**Standar kualitas**: Tidak ada vulnerability kritis, input tersanitasi, HTTPS enforced.

**Kolaborasi**: Mereview Backend Engineer & DevOps Engineer.

---

## 13. DevOps Engineer Agent

**Tanggung jawab**: Setup CI/CD pipeline (GitHub Actions), konfigurasi deployment (Vercel), environment management, monitoring dan error tracking (Sentry).

**Output**: CI/CD config, deployment setup, monitoring dashboard.

**Standar kualitas**: Deploy otomatis, zero-downtime, rollback-ready.

**Kolaborasi**: Bekerja dengan Security Engineer & Performance Engineer.

---

## 14. Documentation Engineer Agent

**Tanggung jawab**: Menjaga sinkronisasi antara kode dan dokumentasi, memastikan semua file docs konsisten, version control dokumentasi, decision log.

**Output**: Docs terupdate, ADR, dokumentasi struktur.

**Standar kualitas**: Dokumentasi selalu mencerminkan kondisi kode terkini.

**Kolaborasi**: Sinkronisasi dengan semua agent, terutama Software Architect & Technical Writer.

---

## Alur Kerja Umum

```
Product Manager (define)
      ↓
Software Architect + UI/UX Designer (design)
      ↓
Frontend / Backend / Motion Engineer (build)
      ↓
Accessibility + SEO + Performance + Security (review)
      ↓
QA Engineer (test)
      ↓
DevOps Engineer (deploy)
      ↓
Technical + Documentation Engineer (document)
```

---

**Document Version**: 1.0
**Last Updated**: 23 Juli 2026
**Status**: Active
