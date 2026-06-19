/**
 * TechIcons — Hand-drawn SVG icons for tech stack badges.
 *
 *  - Setiap ikon adalah inline SVG dengan stroke-style doodle (tidak outline sempurna)
 *    untuk konsisten dengan estetika sketchbook (DESIGN.md).
 *  - Semua ikon menerima className untuk ukuran & warna.
 *  - Dipakai oleh TechBadge.tsx untuk menampilkan ikon di kiri nama tech.
 *
 *  15 ikon utama (project tech stack): FastAPI, Pydantic, PostgreSQL, Docker,
 *  Redis, Next.js, Supabase, TypeScript, Tailwind CSS, Row Level Security,
 *  React, Node.js, WebSocket, Canvas API, MongoDB.
 *  5 ikon Skills section: HTML, CSS, REST API, Framer Motion, Zod.
 *  3 bonus: Python, JavaScript, Git.
 *  + 1 fallback: GenericCodeIcon (code brackets) untuk tech tak terdaftar.
 */

import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* ── Helper: wrap semua ikon dengan viewBox 24×24 default ── */
function wrap(
  children: React.ReactNode,
  { className, ...rest }: IconProps = {}
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

/** FastAPI — lightning bolt inside a shield outline */
export function FastAPIIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Shield outline */}
      <path
        d="M12 2L3 7v5c0 5.25 3.83 10.15 9 11.25C17.17 22.15 21 17.25 21 12V7L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Lightning bolt */}
      <path
        d="M13 7L8 13h4l-1 6 5-6h-4l1-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </>,
    props
  );
}

/** Pydantic — checkmark inside a diamond */
export function PydanticIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Diamond */}
      <path
        d="M12 2l10 10-10 10L2 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
      <path
        d="M7.5 12.5l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** PostgreSQL — elephant silhouette (simplified, doodle-style) */
export function PostgreSQLIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Body */}
      <path
        d="M6 10c0-2.5 1.5-5 6-5s6 2.5 6 5c0 3-2 5-6 5s-6-2-6-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Trunk */}
      <path
        d="M8 12c-1 1-2.5 2.5-2.5 4.5s1.5 2.5 2.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ear */}
      <path
        d="M15 7c1-.5 2.5-.5 3 1s-.5 3-2 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Legs */}
      <path
        d="M9 15v5M15 15v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>,
    props
  );
}

/** Docker — whale with containers on top */
export function DockerIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Containers on top */}
      <rect x="3" y="8" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="8" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="8" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="4" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="4" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15" y="8" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="1.4" />
      {/* Whale body */}
      <path
        d="M2 14c0-1.5.5-3 4-3h14c1.5 0 2.5 1.2 2.5 2.5S21.5 16 20 16H6c-3.5 0-4 2-4 4 0 0-1-2-1-4s1-2.5 1-2.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Water splash */}
      <path
        d="M4 20c1-1 3-1 4 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>,
    props
  );
}

/** Redis — diamond shape with nested layers (like a stack) */
export function RedisIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Top diamond */}
      <path
        d="M12 3L21 8.5 12 14 3 8.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Side lines */}
      <path
        d="M4 9v5.5l8 4.5M20 9v5.5l-8 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Bottom arc */}
      <path
        d="M4 14.5c0 2 3.5 4 8 4s8-2 8-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Highlight */}
      <path
        d="M12 6l4.5 2.5L12 11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.35"
      />
    </>,
    props
  );
}

/** Next.js — N inside a circle with a triangle pointer */
export function NextjsIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* "N" letter — hand-drawn style */}
      <path
        d="M8 7v10l8-10v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** Supabase — lightning bolt emerging from a database cylinder */
export function SupabaseIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Database cylinder top */}
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Cylinder sides */}
      <path
        d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Lightning bolt overlay */}
      <path
        d="M14 9L9 14h3.5l-1.5 5 5-5h-3.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </>,
    props
  );
}

/** TypeScript — "TS" text in a rounded rectangle */
export function TypeScriptIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Rounded rectangle */}
      <rect
        x="2"
        y="3"
        width="20"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* "TS" text */}
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="bold"
        stroke="none"
      >
        TS
      </text>
    </>,
    props
  );
}

/** Tailwind CSS — wind/wave curves */
export function TailwindIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Triple wave curves */}
      <path
        d="M4 12c2-4 5-4 7-2s3 4 7 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16c1.5-3 3.5-3 5-1.5s2.5 3 5.5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M6 8c1.5-3 3.5-3 5-1.5s2.5 3 5.5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </>,
    props
  );
}

/** Row Level Security — lock with shield */
export function RLSIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Shield outline */}
      <path
        d="M12 2L4 6v5c0 4.5 3.4 8.7 8 9.75C16.6 19.7 20 15.5 20 11V6L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Lock body */}
      <rect
        x="9"
        y="11"
        width="6"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Lock shackle */}
      <path
        d="M10 11V9a2 2 0 0 1 4 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="12" cy="13.5" r="0.8" fill="currentColor" stroke="none" />
    </>,
    props
  );
}

/** React — atom symbol with elliptical orbits */
export function ReactIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      {/* Orbit 1 — horizontal ellipse */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(0 12 12)"
      />
      {/* Orbit 2 — rotated 60° */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      {/* Orbit 3 — rotated -60° */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-60 12 12)"
      />
    </>,
    props
  );
}

/** Node.js — hexagon with "N" */
export function NodejsIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Hexagon */}
      <path
        d="M12 2l8.66 5v10L12 22l-8.66-5V7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* "N" letter */}
      <path
        d="M9 8v8l6-8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** WebSocket — bidirectional arrows with a socket plug */
export function WebSocketIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Left arrow */}
      <path
        d="M4 12h6M7 9l-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right arrow */}
      <path
        d="M20 12h-6M17 9l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center node */}
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
      {/* Signal waves */}
      <path
        d="M12 7c0-1.5 2-1.5 2 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M12 17c0 1.5 2 1.5 2 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>,
    props
  );
}

/** Canvas API — paintbrush drawing a curve */
export function CanvasAPIIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Brush handle */}
      <path
        d="M5 20L18 7l2 2-13 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Brush tip / bristles */}
      <path
        d="M18 7l2 2c1 1 .5 3-1 4s-3.5-.5-2-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Paint stroke */}
      <path
        d="M3 17c1-2 2-1 3 0s2 1 3 0 2-1 3 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>,
    props
  );
}

/** MongoDB — leaf shape (simplified) */
export function MongoDBIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Leaf outline */}
      <path
        d="M12 2c0 0-8 6-8 14 0 4 3.5 6 8 6s8-2 8-6c0-8-8-14-8-14z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Center vein */}
      <path
        d="M12 6v13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Side veins */}
      <path
        d="M12 10c-2-1-4 0-5 2M12 13c2-1 4 0 5 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </>,
    props
  );
}

/* ── Skill icons (Skills section ticker) ── */

/** HTML — angle brackets <> with a shield/page shape */
export function HTMLIcon(props: IconProps = {}) {
  return wrap(
    <>
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 10l-3 3 3 3M15 10l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** CSS — curly braces { } with a paint brush accent */
export function CSSIcon(props: IconProps = {}) {
  return wrap(
    <>
      <path
        d="M8 5c0-1.5 1-2 2.5-2h0c1.5 0 1.5 1.5 1.5 2.5v3c0 1.5 2 1.5 2 0V5.5c0-1 0-2.5 1.5-2.5h0c1.5 0 2.5.5 2.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 19c0 1.5 1 2 2.5 2h0c1.5 0 1.5-1.5 1.5-2.5v-3c0-1.5 2-1.5 2 0v3c0 1 0 2.5 1.5 2.5h0c1.5 0 2.5-.5 2.5-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** REST API — connected nodes in a chain */
export function RestAPIIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Three nodes */}
      <circle cx="6" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Connecting lines */}
      <line x1="8.5" y1="9.5" x2="15.5" y2="9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="7.5" y1="10.5" x2="10.5" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16.5" y1="10.5" x2="13.5" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Labels */}
      <text x="6" y="10" textAnchor="middle" fill="currentColor" fontSize="4" fontWeight="bold" stroke="none">R</text>
      <text x="18" y="10" textAnchor="middle" fill="currentColor" fontSize="4" fontWeight="bold" stroke="none">A</text>
    </>,
    props
  );
}

/** Framer Motion — overlapping motion bars */
export function FramerMotionIcon(props: IconProps = {}) {
  return wrap(
    <>
      <path
        d="M4 4h10v10H4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20h10v-6H10L4 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** Zod — validation checkmark with angular brackets */
export function ZodIcon(props: IconProps = {}) {
  return wrap(
    <>
      <path
        d="M4 4h16v16H4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7 13l3 3 7-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/* ── Bonus icons (untuk fleksibilitas masa depan) ── */

/** Python — intertwined snakes forming a P shape */
export function PythonIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Top snake head */}
      <circle cx="9" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 6.5c0 2 0 3 2 3h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Bottom snake head */}
      <circle cx="15" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M15 17.5c0-2 0-3-2-3h-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Body curves */}
      <path
        d="M14 9.5h1c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5h-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.5H9c-1.5 0-2.5-1-2.5-2.5S7.5 9.5 9 9.5h1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </>,
    props
  );
}

/** JavaScript — "JS" in a rounded square */
export function JavaScriptIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Rounded square */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* "JS" text */}
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="bold"
        stroke="none"
      >
        JS
      </text>
    </>,
    props
  );
}

/** Git — branching lines with dots */
export function GitIcon(props: IconProps = {}) {
  return wrap(
    <>
      {/* Main line */}
      <path
        d="M12 4v16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Branch */}
      <path
        d="M12 9c0 0 4-1 6 2s0 5-2 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Commits / dots */}
      <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </>,
    props
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 *  Registry — single source of truth: tech name → icon component.
 *  Dipakai oleh TechBadge. Tambah entri baru di sini saat ada tech baru.
 * ────────────────────────────────────────────────────────────────────────── */

export const TECH_ICONS: Record<string, ComponentType<IconProps>> = {
  FastAPI: FastAPIIcon,
  Pydantic: PydanticIcon,
  PostgreSQL: PostgreSQLIcon,
  Docker: DockerIcon,
  Redis: RedisIcon,
  "Next.js": NextjsIcon,
  Supabase: SupabaseIcon,
  TypeScript: TypeScriptIcon,
  "Tailwind CSS": TailwindIcon,
  "Row Level Security": RLSIcon,
  React: ReactIcon,
  "Node.js": NodejsIcon,
  WebSocket: WebSocketIcon,
  "Canvas API": CanvasAPIIcon,
  MongoDB: MongoDBIcon,
  // ── Skills section ──
  HTML: HTMLIcon,
  CSS: CSSIcon,
  "REST API": RestAPIIcon,
  "Framer Motion": FramerMotionIcon,
  Zod: ZodIcon,
  // ── Bonus ──
  Python: PythonIcon,
  JavaScript: JavaScriptIcon,
  Git: GitIcon,
};

/** Lookup cepat: tech name → icon component. Fallback: generic code bracket icon. */
export function getTechIcon(name: string): ComponentType<IconProps> {
  return TECH_ICONS[name] ?? GenericCodeIcon;
}

/** Fallback icon — generic code brackets < /> */
export function GenericCodeIcon(props: IconProps = {}) {
  return wrap(
    <path
      d="M8 6l-4 6 4 6M16 6l4 6-4 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    props
  );
}
