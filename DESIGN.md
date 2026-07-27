# Design System
## Website Portofolio Achmad Fauzan

> **Design System Package**: `achmadfauzan-portfolio`
> **Category**: Portfolio & Personal Branding
> **Design Intent**: Modern Pixel Aesthetic — retro pixel art meets modern minimalist design. Not a game, but future technology inspired by digital roots.
> **Status**: Active — single source of truth for all visual decisions

---

## 1. Visual Philosophy

### Three Pillars
- **Clarity** — Every element has a purpose. No meaningless decoration.
- **Precision** — Strict grid, consistent spacing, measured typography. Reflects engineering mindset.
- **Character** — Pixel aesthetic as visual signature, not gimmick.

### Design Principles
- Minimal but distinctive — reduce noise, strengthen signal
- Consistency over momentary creativity
- Accessibility is foundation, not afterthought
- Performance is part of design
- **Brainstorm before design** — explore user intent, requirements, and approaches before committing to implementation
- **Design as contract** — DESIGN.md is the single source of truth that agents, designers, and code all reference

### Design Workflow (Agent-Native)
This design system follows the agent-native design loop:

1. **Discover the brief** — Understand user intent, constraints, success criteria
2. **Lock the direction** — Propose 2-3 approaches with trade-offs, get approval
3. **Stream the artifact** — Generate design output (component, page, animation) following this DESIGN.md
4. **Critique** — Review against this design system, check for consistency
5. **Deliver** — Present complete diff for human approval before committing

---

## 2. Design System Package Structure

```
DESIGN.md              # This file — canonical design prose for agents
tokens.css             # Compiled semantic token stylesheet
```

At runtime, agents consume `DESIGN.md` as the primary design reference and `tokens.css` as the compiled token source. All CSS custom properties in `globals.css` derive from the tokens defined here.

---

## 3. Color Palette

### Brand Token Contract

All colors are defined as CSS custom properties in `globals.css` via `@theme` and overridden for light theme via `[data-theme="light"]`.

#### Dark Theme (Default)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0a0a0a` | Primary background |
| `--color-surface` | `#111111` | Cards, panels, surfaces |
| `--color-surface-2` | `#1a1a1a` | Elevated surface |
| `--color-border` | `#222222` | Default border |
| `--color-border-subtle` | `#1a1a1a` | Subtle border |
| `--color-text-primary` | `#f0f0f0` | Primary text |
| `--color-text-secondary` | `#a0a0a0` | Secondary text, caption |
| `--color-text-muted` | `#555555` | Placeholder, disabled |

#### Accent — Cyan Electric
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#00d4ff` | Primary accent, CTA, highlight |
| `--color-accent-dim` | `#00d4ff33` | Transparent accent background |
| `--color-accent-glow` | `#00d4ff66` | Glow effects |
| `--color-accent-dark` | `#0099bb` | Accent hover state |

#### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#00ff88` | Success state |
| `--color-warning` | `#ffaa00` | Warning |
| `--color-error` | `#ff4444` | Error |

#### Light Theme Override
When `[data-theme="light"]` is set on `<html>`:
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#f5f5f5` | Soft off-white background |
| `--color-surface` | `#ffffff` | White cards/panels |
| `--color-surface-2` | `#eeeeee` | Elevated surface |
| `--color-border` | `#e0e0e0` | Default border |
| `--color-text-primary` | `#1a1a1a` | Soft black text |
| `--color-text-secondary` | `#555555` | Secondary text |
| `--color-text-muted` | `#999999` | Muted text |
| `--color-accent` | `#00b8e6` | Adjusted for light bg contrast |
| `--color-accent-dim` | `#00b8e61a` | Transparent accent |
| `--color-accent-glow` | `#00b8e640` | Glow |
| `--color-accent-dark` | `#0099bb` | Hover |
| `--color-success` | `#00cc66` | Adjusted |
| `--color-warning` | `#e69900` | Adjusted |
| `--color-error` | `#cc3333` | Adjusted |

### Color Usage Rules
- Accent cyan is for interactive elements, highlights, and focal points only — do not overuse
- Maximum 2 accent colors per viewport
- Glow effect only on elements that truly need emphasis
- Background is always dark by default; light theme uses soft off-white `#f5f5f5` not pure white
- All colors use CSS custom properties — no hardcoded hex in components

---

## 4. Typography

### Font Stack
```css
/* Primary sans — body and UI */
--font-sans: var(--font-geist-sans), 'Inter', system-ui, sans-serif;

/* Monospace — code, terminal, stats */
--font-mono: var(--font-geist-mono), 'JetBrains Mono', 'Fira Code', monospace;

/* Pixel — brand accent font */
--font-pixel: var(--font-pixel), 'Press Start 2P', 'Courier New', monospace;
```

### Type Scale
| Token | Size | Weight | Line Ht | Usage |
|-------|------|--------|---------|-------|
| Hero name | clamp(1.1rem, 4vw, 2rem) | 400 | 1.1 | Name in hero (pixel font) |
| Section heading | 1.5rem / 24px | 600 | 1.3 | Section titles |
| Card title | 1rem / 16px | 600 | 1.4 | Project/experience titles |
| Body | 0.875rem / 14px | 400 | 1.6 | Default body text |
| Small | 0.75rem / 12px | 400 | 1.5 | Caption, label, meta |
| Tag / badge | 0.65rem / 10px | 600 | 1.4 | Tags, badges |

### Typography Rules
- Pixel font (`Press Start 2P`) **only** for "Achmad Fauzan" name in hero and decorative elements — never for body text
- All body text uses Geist Sans for readability
- Monospace for code elements, terminal widgets, stats, and timestamps
- Maximum 2 font families per page
- Pixel font letter-spacing: `0.05em`
- Monospace letter-spacing: `0em`
- `<h2>` section labels (Skills, About, etc.) use monospace, uppercase, tracking `0.15em`

---

## 5. Spacing & Layout

### Spacing Scale (4px base)
```
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Layout Rules
- Max content width: `64rem` (1024px) for section content
- Section padding: `py-24` (96px) vertical, `px-5` (20px) horizontal
- Cards use `p-5` (20px) internal padding
- Gap between cards: `gap-4` (16px)
- Consistent vertical rhythm — same spacing between similar elements

---

## 6. Visual Effects

### Pixel Aesthetic Guidelines

**Allowed:**
- Pixel font for hero name
- Pixel grid overlay in background (`bg-pixel-grid` class, 3% opacity)
- Sharp corners (4px radius) throughout
- Monospace for technical elements

**Not Allowed:**
- Game character sprites
- Dominant pixel art
- 8-bit bright color palette
- Pixel animations that interfere with readability

### Glow Effects
```css
/* Text glow — hero name only */
text-shadow: 0 0 24px rgba(0, 212, 255, 0.45);

/* Box glow — CTA buttons, focused elements */
box-shadow: 0 0 24px rgba(0, 212, 255, 0.35);
```

### Borders
- Default: `1px solid var(--color-border)`
- Accent: `1px solid var(--color-accent)`
- Border radius: `4px` (sharp, pixel-feel) — never `rounded-full` except for circular badges
- Focus outline: `2px solid var(--color-accent)` with `outline-offset: 2px`

### Background Grid
```css
.bg-pixel-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

---

## 7. Motion & Animation

### Principles
- Animation has a purpose: feedback, attention direction, hierarchy clarification
- Short duration for micro-interactions (150-300ms), medium for transitions (400-600ms)
- Always provide `prefers-reduced-motion` fallback

### Timing Functions
```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);     /* Material standard */
```

### Durations
- Fast (hover effects): 150ms
- Normal (theme toggle, accordion): 300ms
- Slow (section reveals): 500ms
- Page enter: 600ms

### Micro-interactions
- **Button hover**: border/background color transition, 150ms
- **Card hover**: border color change to accent, translate Y -2px, 200ms
- **Link hover**: color change to accent, 150ms
- **Theme toggle**: icon rotation 360°, 500ms spring
- **Marquee**: 24s linear infinite, pause on hover

### Section Reveal (AnimateIn)
- Fade up: opacity 0 → 1, translateY 16px → 0
- Duration: 600ms
- Easing: `var(--ease-spring)`
- Stagger delay: 100ms between sibling sections

### 3D Tilt (Project Cards)
- Perspective: 800px
- Max rotation: 6 degrees on X and Y axis
- Mouse-tracked: rotates away from cursor center
- Applied via JS transform on mousemove, not CSS animation

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .animate-fade-up { opacity: 1; }
}
```

---

## 8. Component Design

### Navigation Bar
- Sticky top, full width
- Background: transparent (no blur, no background color)
- Links: muted text, accent on hover/active
- Active section detected via IntersectionObserver (rootMargin: `-40% 0px -55% 0px`)
- Mobile: hamburger menu with animated bars (translateY + rotate transforms)

### Hero Section (Terminal Widget)
- Terminal-styled box with colored dots (error, warning, success)
- Principles list, agents list, stack list
- Name in pixel font with glow
- CTA buttons: View My Work, Get In Touch, Resume
- CTAs use `btn-primary`, `btn-secondary`, `btn-ghost` classes

### About Section
- No images — pure typographic layout
- Focus area cards: 4 cards in 2x2 grid
- Engineering principles: 4 items in 2x2 grid with dot markers
- Consistent card styling with surface background and border

### Skills Section
- Animated marquee ticker (all 21 skills, duplicated for seamless loop)
- Category filter tabs: Frontend, Backend, AI/ML, Cloud, Tools
- Progress bars per skill (height: 8px, rounded, accent fill)
- Brand SVG icons (16x16) for each skill via `TECH_ICONS` record
- Marquee pauses on hover for usability

### Project Cards
- Background: surface, border: border
- 3D tilt effect on mouse move (perspective 800px, max 6deg)
- Title, description, tag list, source link
- Framer Motion fade-up on scroll reveal via AnimateIn wrapper

### Experience Timeline
- Vertical timeline layout with dot markers
- Role, company, period, description, tags
- Consistent vertical spacing between entries

### Contact Section
- Minimal: heading, description, social icon row
- Social icons: GitHub, LinkedIn, Email
- Icons use `social-link` class (44px touch target)

### Footer
- `(c) 2026 Achmad Fauzan` in monospace
- Centered, muted color

### Theme Toggle
- Fixed top-right position (`top-4 right-4`)
- Size: 32x32px (h-8 w-8)
- Rounded border, transparent background
- Icon rotates 360deg on toggle (transition-transform duration-500)
- Sun icon for dark mode, Moon icon for light mode
- aria-label for accessibility

### Coming Soon (Pre-Launch)
- Name in pixel font with glow
- Status badge: "In Development" with pulsing dot
- Headline and description
- Countdown timer
- Social links
- Footer with copyright

---

## 9. Component Classes

### Button Variants
| Class | Background | Text | Border | Hover |
|-------|-----------|------|--------|-------|
| `btn-primary` | `var(--color-accent)` | `var(--color-bg)` | `var(--color-accent)` | Darker accent bg |
| `btn-secondary` | Transparent | `var(--color-accent)` | `var(--color-accent)` | `var(--color-accent-dim)` bg |
| `btn-ghost` | Transparent | `var(--color-text-secondary)` | Transparent | Accent text + border |

### Layout Classes
- `social-link`: 44px min size, surface bg, border, accent on hover
- `.animate-fade-up`: opacity 0 → 1, translateY 16px → 0
- `.animate-marquee`: translateX 0 → -50%, 24s linear
- `.animate-pulse-dot`: opacity/scale pulse for status indicator

---

## 10. Responsive Design

### Breakpoints
| Name | Width | Behavior |
|------|-------|----------|
| Mobile | < 640px | Single column, hamburger nav, 20px padding |
| Tablet | 640px - 1024px | 2-column grids, full nav |
| Desktop | > 1024px | Full layout, max-width 1024px content |

### Responsive Rules
- **Mobile-first** — start from smallest breakpoint, add complexity upward
- Navigation: hamburger menu with slide-in panel on mobile
- Font sizes scale with `clamp()` for fluid typography
- Touch targets: minimum 44x44px for all interactive elements
- Section padding: 96px vertical on all breakpoints

---

## 11. Accessibility

### Standards
- WCAG 2.1 Level AA minimum
- Normal text contrast: minimum 4.5:1
- Large text (18px+): minimum 3:1
- Accent cyan `#00d4ff` on background `#0a0a0a`: ratio ~9.5:1 — passes
- Light theme accent `#00b8e6` on `#f5f5f5`: ratio ~5.2:1 — passes

### Implementation
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- All images have descriptive `alt` (or `alt=""` for decorative)
- All icon-only elements have `aria-label`
- Focus indicators always visible — no `outline: none` without replacement
- Heading hierarchy consistent: no skipping levels
- Keyboard navigation for all interactive elements
- Reduced motion respected via `prefers-reduced-motion`

---

## 12. Theme System

### Architecture
- Default: dark mode
- Theme stored in `localStorage` as `'theme'` key
- System preference detected via `prefers-color-scheme` on first visit
- Theme applied via `data-theme` attribute on `<html>`
- Anti-flicker inline script in layout reads localStorage/matchMedia before React hydrates

### Implementation Pattern
```tsx
// ThemeProvider context
const [theme, setTheme] = useState<Theme>('dark');
useEffect(() => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}, [theme]);

// CSS: all colors use var(--color-*) so one attribute switch updates everything
[data-theme="light"] {
  --color-bg: #f5f5f5;
  /* ... all color overrides */
}
```

---

## 13. Open Design Integration

This design system follows the Open Design design system package format:

- **DESIGN.md** serves as the canonical design prose for agents
- **globals.css** contains the compiled semantic tokens via `@theme`
- Design tokens are the single source of truth — components never hardcode values
- All visual decisions trace back to a token defined in this document

The design system is consumed by:
- **Frontend agents** building components and pages
- **Motion designers** creating animations
- **Performance engineers** optimizing token usage
- **Accessibility specialists** auditing contrast compliance
- **Any AI agent** entering the project — this file is the brand contract

---

## 14. References & Inspiration

- **Typography & Layout**: Linear.app, Vercel.com
- **Pixel Aesthetic**: PICO-8, Lospec palette, early web aesthetic
- **Motion**: Stripe, Framer.com
- **Dark UI**: Raycast, Fig, Warp terminal
- **Portfolio**: Brittany Chiang (bchiang7.com), Josh Comeau
- **Design System Format**: Open Design (github.com/nexu-io/open-design) — 151 bundled design system packages, agent-native design loop, DESIGN.md as brand contract
- **Agent Workflow**: Superpowers (github.com/obra/superpowers) — brainstorming-first approach, plan-then-execute, human-partner review

---

**Package Version**: 2.0
**Last Updated**: 27 July 2026
**Status**: Active — single source of truth for all visual decisions
