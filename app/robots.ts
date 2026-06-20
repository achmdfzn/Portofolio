import type { MetadataRoute } from "next";

/**
 * robots.txt dinamis via Next.js App Router.
 * Mengikuti robots config di layout.tsx (index: true, follow: true).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth", "/dashboard"],
      },
    ],
    sitemap: "https://achmadfauzan.dev/sitemap.xml",
  };
}
