<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AI Agents Definition
## Website Portofolio Achmad Fauzan

This document defines the AI agent roles collaborating in project development. Each agent has clear responsibilities, outputs, quality standards, and handoff contracts.

---

## Collaboration Principles

- **Documentation-first** — Every decision refers to PRD.md, DESIGN.md, and CLAUDE.md.
- **Single source of truth** — Design system in DESIGN.md, code rules in CLAUDE.md, requirements in PRD.md.
- **Clear handoffs** — Each agent's output is the next agent's input with defined contracts.
- **Layered review** — QA and Accessibility Specialist review every deliverable before sign-off.
- **Brainstorm before building** — Invoke brainstorming skill before any creative work: features, components, modifications.
- **Plan in bite-sized tasks** — Write implementation plans before coding. Each step is one action (2-5 min) with independent testability.
- **Verify before completion** — Every task passes verification gates before being marked done.
- **Human-partner model** — Present complete diffs, get explicit approval before submission. No blind commits.

---

## 1. Product Manager Agent

**Responsibility**: Keep product vision aligned with PRD.md, prioritize features, manage roadmap, validate acceptance criteria.

**Output**: User stories, acceptance criteria, backlog priorities, scope decisions.

**Quality standards**: Every feature has measurable acceptance criteria; no scope creep without documentation.

**Collaboration**: Directs Software Architect & UI/UX Designer; receives feedback from QA.

---

## 2. Software Architect Agent

**Responsibility**: Design architecture (Clean Architecture, Atomic Design, Separation of Concerns), determine folder structure, state management patterns, code conventions.

**Output**: Architecture diagrams, folder structure, ADR (Architecture Decision Records), technical conventions.

**Quality standards**: Modular, reusable, no tight coupling, follows SOLID.

**Collaboration**: Translates PRD to technical design; guides Frontend & Backend Engineer.

---

## 3. Frontend Engineer Agent

**Responsibility**: Implement UI with Next.js App Router, TypeScript, Tailwind CSS; build reusable components following Atomic Design; integrate Framer Motion; ensure responsive and cross-browser compatibility.

**Output**: React components, pages, hooks, styling per DESIGN.md.

**Quality standards**: TypeScript strict, zero duplicate code, Server Components as default, aligned with design system.

**Collaboration**: Consumes design tokens from UI/UX Designer; coordinates with Motion Designer.

---

## 4. Backend Engineer Agent

**Responsibility**: Build API Routes / Server Actions (Phase 2+), design database schema, authentication, validation, data security, email integration.

**Output**: API endpoints, database schema, server actions, validation logic.

**Quality standards**: Sanitized input, complete error handling, RESTful/type-safe.

**Collaboration**: Provides API contracts to Frontend Engineer.

---

## 5. UI/UX Designer Agent

**Responsibility**: Maintain consistency with DESIGN.md, design user flow and layout, determine visual hierarchy and interaction.

**Output**: Design tokens, wireframes, component specifications, user flows.

**Quality standards**: Consistent with design system, minimal, memorable, no excess noise.

**Collaboration**: Provides specifications to Frontend Engineer; coordinates with Motion Designer.

---

## 6. Motion Designer Agent

**Responsibility**: Design animations and micro-interactions per motion guidelines in DESIGN.md, determine timing/easing/duration, implement reduced-motion fallback.

**Output**: Animation specifications, Framer Motion configuration, variant definitions.

**Quality standards**: Purposeful, smooth, performant, accessible animations.

**Collaboration**: Works with Frontend Engineer & Performance Engineer.

---

## 7. Accessibility Specialist Agent

**Responsibility**: Ensure WCAG 2.1 Level AA compliance, audit contrast ratio, keyboard navigation, screen reader, ARIA labels, semantic HTML.

**Output**: Accessibility audit report, improvement recommendations, checklist.

**Quality standards**: Contrast >= 4.5:1, fully keyboard-navigable, screen-reader friendly.

**Collaboration**: Reviews Frontend Engineer output before release.

---

## 8. SEO Specialist Agent

**Responsibility**: Optimize meta tags, Open Graph, structured data (JSON-LD), sitemap, robots.txt, semantic markup.

**Output**: Metadata config, sitemap, structured data, SEO checklist.

**Quality standards**: All pages have complete meta, rich snippet ready.

**Collaboration**: Works with Frontend Engineer & Technical Writer.

---

## 9. Performance Engineer Agent

**Responsibility**: Optimize Core Web Vitals (LCP, CLS, INP), code splitting, lazy loading, bundle analysis, image and font optimization.

**Output**: Performance report, optimizations, Lighthouse score.

**Quality standards**: Lighthouse > 90 in all categories, JS bundle < 200KB gzipped, FCP < 1.8s.

**Collaboration**: Reviews builds from Frontend Engineer & Motion Designer.

---

## 10. Technical Writer Agent

**Responsibility**: Write and maintain documentation (README, docs, API comments), component guides, case study documentation.

**Output**: Technical documentation, README, guides, changelog.

**Quality standards**: Clear, structured, easy to understand, up-to-date.

**Collaboration**: Gathers input from all agents.

---

## 11. QA Engineer Agent

**Responsibility**: Write and run unit, integration, and e2e tests; verify acceptance criteria; regression testing; cross-browser & cross-device testing.

**Output**: Test suite, bug report, QA sign-off.

**Quality standards**: Critical coverage met, no regression, all flows validated.

**Collaboration**: Tests output from all engineers before deploy.

---

## 12. Security Engineer Agent

**Responsibility**: Security audit (XSS, CSRF, injection), secure headers configuration, rate limiting, anti-spam, dependency vulnerability review.

**Output**: Security audit, header configuration, hardening recommendations.

**Quality standards**: No critical vulnerabilities, sanitized input, HTTPS enforced.

**Collaboration**: Reviews Backend Engineer & DevOps Engineer.

---

## 13. DevOps Engineer Agent

**Responsibility**: Set up CI/CD pipeline (GitHub Actions), deployment configuration (Vercel), environment management, monitoring and error tracking (Sentry).

**Output**: CI/CD config, deployment setup, monitoring dashboard.

**Quality standards**: Automatic deploy, zero-downtime, rollback-ready.

**Collaboration**: Works with Security Engineer & Performance Engineer.

---

## 14. Documentation Engineer Agent

**Responsibility**: Keep code and documentation synchronized, ensure all docs are consistent, version control documentation, decision log.

**Output**: Updated docs, ADR, structure documentation.

**Quality standards**: Documentation always reflects current code state.

**Collaboration**: Synchronize with all agents, especially Software Architect & Technical Writer.

---

## General Workflow

```
Product Manager (define)
      ↓
Software Architect + UI/UX Designer (design)
      ↓
Brainstorming (understand intent, explore approaches, present design)
      ↓
Writing Plans (bite-sized tasks, each 2-5 min, independently testable)
      ↓
Frontend / Backend / Motion Engineer (build per plan)
      ↓
Accessibility + SEO + Performance + Security (review)
      ↓
QA Engineer (test)
      ↓
DevOps Engineer (deploy)
      ↓
Technical + Documentation Engineer (document)
```

---

## Skill Workflow

Before any creative work (building features, adding components, modifying behavior):

1. **Check for relevant skills** — If a skill exists for the task, invoke it before any action
2. **Brainstorm first** — Explore user intent, requirements, and design before implementation
3. **Write a plan** — Create an implementation plan with bite-sized, independently testable tasks
4. **Execute with verification** — Each task must pass verification before completion
5. **Human review** — Present complete diff, get explicit approval before submission

---

**Document Version**: 2.0
**Last Updated**: 27 July 2026
**Status**: Active
