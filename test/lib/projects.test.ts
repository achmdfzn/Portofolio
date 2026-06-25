/**
 * Unit test untuk lib/projects.ts — data layer.
 *
 * Cakupan:
 *  - PROJECTS array invariant (setiap item punya field wajib).
 *  - getProjectBySlug lookup.
 *  - Slug uniqueness (tidak ada duplikat slug).
 *  - Tidak ada placeholder "TODO" / "lorem ipsum" di konten
 *    (anti-slop rules — CLAUDE.md §Anti-Slop Rules item 1).
 */
import { describe, it, expect } from "vitest";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";

describe("PROJECTS data", () => {
  it("has at least one project", () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(1);
  });

  it("every project has all required fields", () => {
    for (const project of PROJECTS) {
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.tech)).toBe(true);
      expect(typeof project.year).toBe("number");
      expect(project.problemStatement).toBeTruthy();
      expect(project.role).toBeTruthy();
      // githubUrl wajib ada — minimal placeholder "#".
      expect(typeof project.githubUrl).toBe("string");
      expect(Array.isArray(project.screenshots)).toBe(true);
    }
  });

  it("has unique slugs (no duplicate)", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slug is URL-safe (no spaces, no special chars)", () => {
    for (const project of PROJECTS) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("has valid year range", () => {
    for (const project of PROJECTS) {
      expect(project.year).toBeGreaterThanOrEqual(2020);
      expect(project.year).toBeLessThanOrEqual(2030);
    }
  });

  it("tech array is non-empty", () => {
    for (const project of PROJECTS) {
      expect(project.tech.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("description does not contain placeholder text (anti-slop)", () => {
    const placeholders = [/insert/i, /lorem/i, /todo/i, /fixme/i, /xxx/i];
    for (const project of PROJECTS) {
      for (const pattern of placeholders) {
        expect(project.description).not.toMatch(pattern);
      }
    }
  });

  it("problemStatement does not contain placeholder text (anti-slop)", () => {
    const placeholders = [/insert/i, /lorem/i, /xxx/i];
    for (const project of PROJECTS) {
      for (const pattern of placeholders) {
        expect(project.problemStatement).not.toMatch(pattern);
      }
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the correct project for a known slug", () => {
    const project = getProjectBySlug("doodle-backend-api");
    expect(project).toBeDefined();
    expect(project?.title).toBe("Doodle Backend API");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("nonexistent-slug")).toBeUndefined();
  });

  it("works for all slugs in PROJECTS", () => {
    for (const project of PROJECTS) {
      expect(getProjectBySlug(project.slug)).toBe(project);
    }
  });

  it("is case-sensitive (lowercase only)", () => {
    expect(getProjectBySlug("Doodle-Backend-API")).toBeUndefined();
  });
});
