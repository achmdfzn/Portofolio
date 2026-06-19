"use client";

import { useSyncExternalStore } from "react";

/**
 * Client-only mount detector.
 *
 * useSyncExternalStore returns `false` during SSR/hydration (server snapshot),
 * then `true` after client mount (client snapshot). This avoids calling
 * setState inside useEffect (React 19 lint violation).
 *
 * Used by: Intro.tsx.
 */
const emptySubscribe = () => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
