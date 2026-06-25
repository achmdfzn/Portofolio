/**
 * Unit test untuk lib/nav.ts — data navigasi.
 */
import { describe, it, expect } from "vitest";
import { NAV_LINKS } from "@/lib/nav";

describe("NAV_LINKS", () => {
  it("has exactly 4 links", () => {
    expect(NAV_LINKS).toHaveLength(4);
  });

  it("every link has label and href", () => {
    for (const link of NAV_LINKS) {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href).toMatch(/^#/);
    }
  });

  it("contains the expected sections", () => {
    const labels = NAV_LINKS.map((l) => l.label);
    expect(labels).toContain("About");
    expect(labels).toContain("Project");
    expect(labels).toContain("Skills");
    expect(labels).toContain("Contact");
  });

  it("href starts with # and is lowercased", () => {
    for (const link of NAV_LINKS) {
      expect(link.href).toMatch(/^#[a-z-]+$/);
    }
  });

  it("has consistent href for every label", () => {
    // Label "Project" → href "#projects" (plural).
    const expected: Record<string, string> = {
      About: "#about",
      Project: "#projects",
      Skills: "#skills",
      Contact: "#contact",
    };
    for (const link of NAV_LINKS) {
      expect(link.href).toBe(expected[link.label]);
    }
  });
});
