/**
 * Navigasi global — single source of truth untuk link Header & Footer.
 * (DESIGN.md §1: links = About, Project, Skills, Contact.)
 * Saat section baru ditambah, ubah di sini saja — kedua komponen ikut.
 */
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
