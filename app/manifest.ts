import type { MetadataRoute } from "next";

/**
 * Web app manifest — metadata dasar untuk PWA installability & browser chrome.
 * Sesuai DESAIN.md §Metadata: branding "Achmad Fauzan", warna theme paper.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Achmad Fauzan — Fullstack Developer",
    short_name: "AF Portofolio",
    description:
      "Fullstack Developer yang membangun ekosistem digital dengan FastAPI & Next.js, didukung Supabase.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0eb",
    theme_color: "#f4f0eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
