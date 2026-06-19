import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

/**
 * Sitemap dinamis — single source of truth dari data project (lib/projects.ts).
 * Setiap project punya halaman detail (/projects/[slug]) yang di-SSG.
 */
const SITE_URL = "https://achmadfauzan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
