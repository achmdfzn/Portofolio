/**
 * Data project — single source of truth untuk Project grid (Phase 2)
 * dan halaman detail /projects/[slug] (Phase 3).
 *
 * Tiap item punya slug unik (URL-friendly), deskripsi singkat, daftar tech,
 * tahun, dan konten case study (problem statement, peran, GitHub, screenshots).
 * Tambah/kurangi project di sini — grid & detail ikut.
 */
export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: readonly string[];
  year: number;
  // ── Phase 3 — konten case study ──
  problemStatement: string;
  role: string;
  githubUrl: string;
  /** Path gambar di /public, mis. "/screenshots/doodle-backend-api/1.png". */
  screenshots: readonly string[];
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "doodle-backend-api",
    title: "Doodle Backend API",
    description:
      "Sistem arsitektur microservices menggunakan FastAPI dengan validasi Pydantic yang ketat. Setiap endpoint dijaga oleh middleware autentikasi custom, rate-limiting, dan structured logging. Dibangun dengan filosofi: backend sekuat frontend.",
    tech: ["FastAPI", "Pydantic", "PostgreSQL", "Docker", "Redis"],
    year: 2025,
    problemStatement:
      "Tim butuh fondasi backend yang skalabel dan dapat diandalkan untuk menangani ribuan request per detik. Sistem lama monolitik sering crash saat traffic naik, tidak ada validasi data yang konsisten, dan debugging menjadi mimpi buruk karena log tidak terstruktur. Tujuan: membangun arsitektur microservices yang setiap service bisa dikembangkan, di-deploy, dan diskalakan secara independen tanpa mengorbankan keamanan.",
    role: "Lead Backend Engineer — merancang arsitektur microservices, mendefinisikan kontrak API berbasis Pydantic, dan mengimplementasikan middleware keamanan (autentikasi JWT, rate-limiting per endpoint, dan audit logging).",
    githubUrl: "#",
    screenshots: [],
  },
  {
    slug: "nextjs-supabase-vault",
    title: "Next.js Supabase Vault",
    description:
      "Platform autentikasi kustom dengan implementasi Row Level Security (RLS) tingkat tinggi. Fitur lengkap: magic link login, OAuth Google/GitHub, session management, dan role-based access control. Semua proteksi data berada di lapisan database, bukan di application code.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Row Level Security"],
    year: 2025,
    problemStatement:
      "Aplikasi SaaS butuh lapisan keamanan data yang tidak bisa di-bypass dari application code. Banyak implementasi autentikasi tradisional mengandalkan middleware yang rapuh — sekali ada bug di query builder, data user bisa bocor. Pendekatan Row Level Security (RLS) di PostgreSQL menjamin bahwa meskipun ada celah di aplikasi, database sendiri yang menolak akses tidak sah di level baris.",
    role: "Fullstack Developer — mendesain skema database dengan policy RLS granular, membangun flow autentikasi (magic link + OAuth), dan mengintegrasikan Supabase SSR untuk manajemen session yang aman di Next.js App Router.",
    githubUrl: "#",
    screenshots: [],
  },
  {
    slug: "sketchboard-collab",
    title: "Sketchboard Collab",
    description:
      "Aplikasi kolaborasi real-time bergaya infinite canvas. Pengguna bisa gambar, tulis catatan, dan share board secara live menggunakan WebSockets. Interface doodle-inspired — karena tools kolaborasi tidak harus membosankan.",
    tech: ["React", "Node.js", "WebSocket", "Canvas API", "MongoDB"],
    year: 2024,
    problemStatement:
      "Tim remote butuh papan tulis virtual yang terasa natural untuk brainstorming. Tools yang ada terlalu kaku, lambat saat banyak user, atau punya UI yang membosankan. Tantangan teknis: sinkronisasi real-time antar banyak klien tanpa konflik, performa rendering canvas yang halus di perangkat low-end, dan UX yang menyenangkan dipakai berjam-jam.",
    role: "Frontend Engineer — membangun komponen Canvas interaktif dengan optimasi performa (dirty rect rendering, requestAnimationFrame throttling), serta integrasi client WebSocket untuk sinkronisasi stroke real-time.",
    githubUrl: "#",
    screenshots: [],
  },
] as const;

/** Lookup cepat slug → project. Dipakai di halaman detail. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
