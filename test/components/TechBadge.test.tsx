/**
 * Component test untuk TechBadge.
 *
 * Cakupan:
 *  - Render nama tech yang benar.
 *  - Tiap ukuran (sm / md) menghasilkan class CSS yang sesuai.
 *  - Render ikon (tidak null).
 *  - Ikon jatuh ke GenericCodeIcon untuk tech yang tidak dikenal.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechBadge } from "@/components/TechBadge";

describe("TechBadge", () => {
  it("renders the tech name", () => {
    render(<TechBadge tech="FastAPI" />);
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });

  it("renders an SVG icon next to the tech name", () => {
    const { container } = render(<TechBadge tech="Next.js" />);
    // TechBadge berisi <span> dengan <svg> di dalamnya.
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders as a <span> (not <li>) to avoid invalid HTML nesting", () => {
    const { container } = render(<TechBadge tech="React" />);
    // Root element harus <span>
    const root = container.firstElementChild;
    expect(root?.tagName).toBe("SPAN");
  });

  it("applies size=sm classes correctly", () => {
    const { container } = render(<TechBadge tech="TypeScript" size="sm" />);
    const root = container.firstElementChild;
    // Kelas untuk sm: text-xs atau text-ink-muted
    expect(root?.className).toContain("text-xs");
  });

  it("applies size=md classes correctly", () => {
    const { container } = render(<TechBadge tech="Python" size="md" />);
    const root = container.firstElementChild;
    expect(root?.className).toContain("text-sm");
  });

  it("renders with fallback icon for unknown tech", () => {
    const { container } = render(<TechBadge tech="UnknownTech2024" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders multiple badges independently", () => {
    render(
      <>
        <TechBadge tech="React" />
        <TechBadge tech="Vue" />
      </>
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });
});
