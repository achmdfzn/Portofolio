/**
 * TechBadge (DESIGN.md §4, §8).
 *
 *  - Pill bergaya tangan untuk menampilkan tech stack.
 *  - Varian ukuran: "sm" (Project card), "md" (detail page).
 *  - Setiap badge menampilkan ikon SVG di kiri nama tech (dari TechIcons.tsx).
 *  - Digunakan di: Project.tsx, projects/[slug]/page.tsx, Skills.tsx.
 */

import { TECH_ICONS, GenericCodeIcon } from "@/components/TechIcons";

interface TechBadgeProps {
  tech: string;
  /** "sm" untuk card, "md" untuk halaman detail */
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: {
    wrapper: "px-2.5 py-1 text-xs text-ink-muted sm:text-sm",
    icon: "h-3.5 w-3.5 sm:h-4 sm:w-4",
  },
  md: {
    wrapper: "px-3.5 py-1.5 text-sm text-ink-soft sm:text-base",
    icon: "h-4.5 w-4.5 sm:h-5 sm:w-5",
  },
} as const;

/**
 * Render ikon tech berdasarkan nama. Pakai React.createElement di sini (bukan
 * menampung komponen di variabel di body komponen) untuk patuh aturan
 * `react-hooks/static-components` React 19 yang melarang "create components
 * during render".
 */
function renderTechIcon(tech: string, className: string) {
  const Icon = TECH_ICONS[tech] ?? GenericCodeIcon;
  return <Icon className={className} />;
}

export function TechBadge({ tech, size = "sm" }: TechBadgeProps) {
  const classes = SIZE_CLASSES[size];

  return (
    <li
      className={`rough-border-soft tech-badge inline-flex items-center gap-1.5 border border-ink/30 bg-paper font-handwritten ${classes.wrapper}`}
    >
      {renderTechIcon(tech, classes.icon)}
      <span>{tech}</span>
    </li>
  );
}
