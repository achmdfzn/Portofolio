import "@testing-library/jest-dom/vitest";

/**
 * Setup Vitest + React Testing Library.
 *
 *  - @testing-library/jest-dom/vitest: inject custom matchers (toBeInTheDocument,
 *    toHaveTextContent, toHaveClass, dsb.) ke expect global Vitest.
 *  - matchMedia: jsdom tidak menyediakan window.matchMedia → di-mock di sini
 *    supaya komponen yang pakai useMediaQuery (Project.tsx, Header.tsx) tidak
 *    error saat dirender di test.
 *  - scrollTo: stub untuk menghindari error "window.scrollTo is not a function".
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

/**
 * IntersectionObserver mock — framer-motion `whileInView` membutuhkannya.
 * jsdom tidak menyediakan IntersectionObserver; tanpa mock ini komponen
 * yang pakai whileInView (Hero, About, Project, Skills, Contact, Footer)
 * akan throw "IntersectionObserver is not defined".
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: readonly number[] = [0];

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    // Langsung anggap intersecting agar elemen langsung terlihat.
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
