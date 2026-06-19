"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionDivider } from "@/components/SectionDivider";
import { TechBadge } from "@/components/TechBadge";

/**
 * Skills (Custom Section — ticker / marquee animasi berjalan).
 *
 *  - Posisi: antara Project & Contact di page.tsx.
 *  - Heading: "Tools & Skills" + subheading singkat.
 *  - 2 baris marquee: baris pertama geser ke kanan, baris kedua geser ke kiri.
 *  - Setiap item berupa TechBadge (ikon + nama tech).
 *  - Animasi berjalan infinite via CSS @keyframes (performa optimal, bukan JS).
 *  - Reduced motion: marquee berhenti (tidak bergeser).
 */

/* ── Data skills — single source of truth ── */
const SKILLS_ROW_1: readonly string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "Tailwind CSS",
];

const SKILLS_ROW_2: readonly string[] = [
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Git",
  "Supabase",
  "REST API",
  "WebSocket",
  "Framer Motion",
  "Zod",
];

/* ── Marquee row — menggandakan item untuk seamless infinite loop ── */
function MarqueeRow({
  items,
  direction = "left",
  delay = 0,
}: {
  items: readonly string[];
  /** Arah gerakan: "left" = geser kiri, "right" = geser kanan */
  direction?: "left" | "right";
  /** CSS animation-delay untuk offset stagger */
  delay?: number;
}) {
  // Gandakan 3× supaya loop seamless tanpa gap saat translateX.
  // 3× memastikan ada cukup konten di kedua sisi saat satu set keluar viewport.
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade edges agar item tidak terpotong tajam di pinggir */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28"
        aria-hidden="true"
      />

      {/* Marquee track */}
      <div
        className="marquee-track flex w-max gap-3 sm:gap-4"
        style={
          {
            "--marquee-direction": direction === "left" ? "normal" : "reverse",
            "--marquee-delay": `${delay}s`,
          } as React.CSSProperties
        }
      >
        {repeated.map((skill, i) => (
          <TechBadge key={`${skill}-${i}`} tech={skill} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
    >
      {/* Heading */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
        }}
      >
        <p className="font-handwritten text-xl text-ink-muted sm:text-2xl">
          Skills
        </p>
        <h2 id="skills-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Tools yang{" "}
          <span className="highlight-yellow">saya pakai</span>.
        </h2>
        <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
          Dari frontend hingga backend — ini senjata harian saya.
        </p>
      </motion.div>

      {/* ── Marquee container ── */}
      <div
        className={`mt-12 ${prefersReducedMotion ? "reduced-motion-marquee" : ""}`}
      >
        {/* Baris 1: geser ke kiri */}
        <MarqueeRow items={SKILLS_ROW_1} direction="left" delay={0} />

        {/* Baris 2: geser ke kanan (arah berlawanan) */}
        <MarqueeRow items={SKILLS_ROW_2} direction="right" delay={2} />
      </div>

      {/* Divider transisi ke section berikutnya (Contact). */}
      <SectionDivider className="mt-16 sm:mt-20" />
    </section>
  );
}
