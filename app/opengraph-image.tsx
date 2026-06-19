import { ImageResponse } from "next/og";

/**
 * Open Graph image dinamis — di-render saat build oleh Next.js Image Optimization.
 * Ukuran 1200×630 sesuai DESIGN.md §Metadata.
 *
 * Menggunakan font bawaan sistem (sans-serif) karena next/font/google
 * tidak tersedia di ImageResponse runtime.
 */
export const runtime = "edge";
export const alt = "Achmad Fauzan — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#f4f0eb",
          // Paper texture — dots grid
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(28,28,28,0.035) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Monogram AF */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "4px solid #1c1c1c",
            backgroundColor: "#f4f0eb",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#1c1c1c",
              fontStyle: "italic",
            }}
          >
            AF
          </span>
        </div>

        {/* Nama */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1c1c1c",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Achmad Fauzan
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            fontWeight: 400,
            color: "#5a5650",
            lineHeight: 1.3,
          }}
        >
          Menulis Kode. Menggambar Ide.
        </div>

        {/* Badge tech stack */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 16,
          }}
        >
          {["FastAPI", "Next.js", "Supabase"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                border: "3px solid #1c1c1c",
                backgroundColor: "rgba(255, 215, 0, 0.25)",
                fontSize: 22,
                fontWeight: 600,
                color: "#1c1c1c",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
