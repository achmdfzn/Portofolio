@AGENTS.md

---

# Working Rules
## Website Portofolio Achmad Fauzan

This document defines mandatory working rules for all development sessions. Every rule applies in every session.

---

## 1. Core Principles

- **Documentation-first** — Before writing code, read relevant PRD.md, DESIGN.md, and AGENTS.md.
- **Explain before big changes** — Before architecture changes, major refactors, or significant technical decisions, explain the plan and reasoning first.
- **No duplicate code** — Check whether similar components or functions exist before creating new ones.
- **Minimal footprint** — Write only necessary code. Avoid boilerplate, excessive comments, and premature abstraction.
- **Brainstorm before building** — Before any creative work (features, components, modifications), invoke brainstorming to explore user intent, requirements, and design before writing code.
- **Plan in bite-sized tasks** — Write implementation plans with steps that are one action each (2-5 minutes), independently testable.
- **Verify before completion** — Every task must pass verification gates before being marked done.
- **Human-partner model** — Present complete diffs, get explicit approval before submission. No blind commits.

---

## 2. Skill-First Workflow

Before any response or action — including clarifying questions, exploring the codebase, or checking files — check whether a relevant skill exists. If a skill applies to the task, you MUST use it.

**Skill invocation priority:**
1. Process skills come first (they set the approach)
2. Implementation skills carry out the approach
3. If unsure whether a skill applies, invoke it anyway

**Red flags — thoughts that mean STOP and invoke a skill:**
| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "I know what that means" | Knowing the concept != using the skill. Invoke it. |

---

## 3. TypeScript & Code Quality

- Always use **TypeScript strict mode** (`"strict": true` in tsconfig).
- No `any` unless truly no alternative — and must be commented with reason.
- Use `type` for union/intersection, `interface` for object shapes that will be extended.
- All component props must have explicit types.
- Use `const` as default; `let` only if value changes.
- No `console.log` in production code.

---

## 4. Component Structure & Architecture

- Follow **Atomic Design**: atoms → molecules → organisms → templates → pages.
- **Server Components** as default. Use `'use client'` only when browser interactivity is required (event handlers, hooks, browser API).
- One component = one responsibility (Single Responsibility Principle).
- Components used more than once must be moved to `components/`.
- Separate logic from presentation — use custom hooks for complex logic.

---

## 5. Naming Convention

| Entity | Convention | Example |
|--------|-----------|---------|
| React Component | PascalCase | `HeroSection`, `CountdownTimer` |
| Component file | kebab-case | `hero-section.tsx`, `countdown-timer.tsx` |
| Hooks | camelCase + `use` prefix | `useCountdown`, `useScrollPosition` |
| Utility functions | camelCase | `formatDate`, `cn` |
| Constants | SCREAMING_SNAKE_CASE | `LAUNCH_DATE`, `SOCIAL_LINKS` |
| CSS classes | Tailwind utility, no custom classes unless necessary |
| Types/Interfaces | PascalCase | `CountdownProps`, `SocialLink` |

---

## 6. Design System Compliance

- All colors use CSS custom properties from DESIGN.md — no hardcoded hex in components.
- All spacing uses Tailwind scale matching DESIGN.md spacing scale.
- Border radius always `rounded` (4px) — no `rounded-full` except for circular badges/avatars.
- Pixel font (`Press Start 2P`) only for "Achmad Fauzan" name in hero and decorative elements defined in DESIGN.md.
- Animations follow durations and easing from DESIGN.md — no magic numbers.

---

## 7. Performance

- Use `next/image` for all images — no plain `<img>` tags.
- Use `next/font` for all fonts — no `@import` Google Fonts in CSS.
- Dynamic import (`next/dynamic`) for heavy components not needed in initial load.
- Avoid unnecessary re-renders — use `useMemo` and `useCallback` judiciously (only when there is evidence of performance issues, not speculatively).

---

## 8. Accessibility

- All decorative images: `alt=""`. All informative images: descriptive `alt`.
- All icon-only buttons must have `aria-label`.
- Do not remove `outline` on focus without providing a visible alternative.
- Use correct semantic elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Heading hierarchy must be consistent — no skipping from `h1` to `h3`.

---

## 9. SEO

- Every page must have complete `metadata` via Next.js Metadata API.
- Use `generateMetadata` for dynamic pages.
- Structured data (JSON-LD) for main page.
- All URLs must be human-readable and descriptive.

---

## 10. Responsive Design

- **Mobile-first** — start from smallest breakpoint, add complexity upwards.
- Test at breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop).
- Touch target minimum 44x44px for all interactive elements on mobile.

---

## 11. Git & Documentation

- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`.
- Every non-trivial new component must have a brief JSDoc if its props are not self-explanatory.
- Update documentation (PRD, DESIGN, AGENTS) when technical decisions change project direction.
- Present complete diff before commit — get human partner approval.

---

## 12. Prohibited Practices

- ❌ Creating duplicate files with different names for the same function
- ❌ Using `!important` in CSS except for external library overrides
- ❌ Committing `.env` or files containing secrets
- ❌ Using `dangerouslySetInnerHTML` without sanitization
- ❌ Creating components over ~200 lines — split into sub-components
- ❌ Ignoring TypeScript errors with `@ts-ignore` without explanation
- ❌ Submitting changes without human review of the complete diff
- ❌ Making speculative or theoretical fixes without evidence of a real problem
- ❌ Bundling multiple unrelated changes in one commit

---

## 13. Pull Request Standards

Before submitting a PR:
1. Verify this solves a real problem someone actually experienced
2. Search for existing PRs (open and closed) addressing the same issue
3. Ensure the change belongs in core — not domain-specific or personal config
4. Show the complete diff to human partner and get explicit approval
5. Identify the agent environment that produced the contribution

---

**Document Version**: 2.0
**Last Updated**: 27 July 2026
**Status**: Active — applies to all development sessions
