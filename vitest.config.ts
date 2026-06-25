import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // jsdom memberikan DOM API di Node — cocok untuk component test React.
    environment: "jsdom",
    // Setup file dijalankan SEBELUM setiap test file — inject custom matchers
    // (toHaveTextContent, toBeInTheDocument, dsb.) dari @testing-library/jest-dom.
    setupFiles: ["./test/setup.ts"],
    // Global test utilities (describe, it, expect, vi) — tidak perlu import manual.
    globals: true,
    // CSS import diabaikan — tidak perlu di-parsing untuk component test.
    css: false,
    // Cocokkan file test — *.(test|spec).{ts,tsx} di mana saja.
    include: ["**/*.{test,spec}.{ts,tsx}"],
    // Lewati node_modules dan direktori build.
    exclude: ["node_modules", ".next", "dist"],
  },
  // Resolve alias @/ → src/ (Next.js path alias).
  // Karena project tidak punya src/ dir, alias langsung ke root.
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
