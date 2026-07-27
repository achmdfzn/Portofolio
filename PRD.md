# Product Requirements Document (PRD)
## Website Portofolio Achmad Fauzan

---

## 1. Executive Summary

### Project Vision
Build a professional portfolio website that represents Achmad Fauzan's digital identity as a Software Engineer, AI Enthusiast, and Tech Builder — with modern industry standards, showcasing technical skills, featured projects, and career journey in an engaging and accessible way.

### Primary Goals
- Build strong personal branding in the technology industry
- Showcase technical skills and project portfolio professionally
- Attract recruiters, startups, and potential clients
- Platform for academic research and open source contributions
- Build credibility in Web Development, AI/ML, and Software Engineering

### Target Audience
1. **Recruiters & Hiring Managers** — Seeking qualified candidates for Software Engineer, Full Stack Developer, or AI Engineer roles
2. **Startup Founders & Tech Leads** — Looking for talent to join teams or collaborate on projects
3. **Potential Clients** — Needing website development, applications, or technology solutions
4. **Academic Community** — Lecturers, researchers, students interested in research and academic projects
5. **Tech Community** — Developers, engineers, tech enthusiasts wanting to collaborate or network

---

## 2. Problems Solved

### Problem Statement
1. Many portfolios look generic and unmemorable
2. Difficulty displaying technical skills and project complexity in visually engaging ways
3. Poor user experience on portfolio websites (slow, unresponsive, confusing navigation)
4. Difficulty building unique personal branding amid industry competition
5. Lack of professional documentation explaining development process transparently

### Solution Approach
1. **Unique Visual Identity** — Modern Pixel Aesthetic combining retro pixel art with modern minimalist design
2. **Optimal User Experience** — Intuitive navigation, fast loading, fully responsive, high accessibility
3. **Professional Showcase** — Display projects, skills, and achievements with engaging storytelling
4. **Technical Excellence** — Built with modern technology (Next.js, TypeScript, Tailwind CSS) proving technical capability
5. **Comprehensive Documentation** — Complete documentation from vision to technical implementation

---

## 3. Value Proposition

### For Recruiters
- Quick access to skill information, experience, and project portfolio
- Proof of technical capability through website quality itself
- Easy contact and CV/resume download

### For Startups & Clients
- Demonstration of problem-solving and technical execution ability
- Real project portfolio with case studies
- Transparency in development process and tech stack

### For Community
- Quality content through potential blog/tutorials/research
- Accessible open source contributions
- Networking and collaboration opportunities

---

## 4. Core Features

### Phase 1: Landing Page - Coming Soon (Complete)
- **Hero Section** with name, headline, professional tagline
- **Development Status** with countdown or progress indicator
- **Social Links** (GitHub, LinkedIn, Email) with hover animation
- **Visual Identity** with modern pixel aesthetic and light animation
- **Responsive Design** perfect on all devices
- **Performance Optimization** with loading time < 2 seconds

### Phase 2: Homepage & Core Pages (In Progress)
- **Navigation Bar** sticky with smooth scroll and active state
- **Hero Section** with animated introduction and CTA buttons
- **About Section** with focus areas, engineering principles
- **Skills Section** with animated marquee, category tabs, progress bars
- **Projects Showcase** with 3D tilt cards, tags, source links
- **Experience Timeline** with visual career journey
- **Contact Section** with social links
- **Footer** with copyright and attribution
- **Dark/Light Theme Toggle** with smooth transition, localStorage persistence, system preference detection

### Phase 3: Content & Enhancement (Planned)
- Project detail pages with case studies
- Blog system with content management
- Research & publications section
- Certificates showcase
- Testing and bug fixes
- User feedback implementation

### Phase 4: Advanced Features (Future)
- Multi-language support
- Analytics dashboard
- Admin panel for content management
- Advanced animations and interactions
- Accessibility audit and improvements
- Contact form with email integration

---

## 5. Development Roadmap

### Q3 2026 - Foundation (Complete)
- ✅ Project documentation (PRD, Design, Agents, Claude, Skill)
- ✅ Landing Page - Coming Soon with countdown
- ✅ Project structure with Next.js App Router
- ✅ Design system implementation (colors, typography, components)
- ✅ Core animation and micro-interactions
- ✅ Dark/Light theme toggle
- ✅ Skills section with animated marquee and brand icons

### Q4 2026 - Core Features
- ⬜ Complete homepage with all sections
- ⬜ Project detail pages
- ⬜ Contact form with email integration
- ⬜ Responsive design refinement
- ⬜ Performance optimization (Core Web Vitals)
- ⬜ SEO implementation

### Q1 2027 - Content & Enhancement
- ⬜ Blog system with CMS
- ⬜ Research & publications section
- ⬜ Certificates showcase
- ⬜ Testing and bug fixes

### Q2 2027 - Advanced Features
- ⬜ Multi-language support
- ⬜ Analytics dashboard
- ⬜ Admin panel for content management
- ⬜ Accessibility audit and improvement

---

## 6. Functional Requirements

### FR-001: Navigation System
- User can access all pages through navigation bar
- Navigation bar sticky on scroll with smooth animation
- Active state indicator on current page/section
- Mobile navigation with hamburger menu
- Smooth scroll to specific sections

### FR-002: Theme Toggle
- User can switch between dark and light themes
- Theme preference persists in localStorage
- System preference detected on first visit
- Smooth transition between themes (300ms ease)
- Anti-flicker inline script prevents flash before hydration

### FR-003: Skills Display
- Skills shown in animated marquee ticker
- Category tabs filter skills (Frontend, Backend, AI/ML, Cloud, Tools)
- Progress bars for each skill level
- Brand SVG icons for each technology
- Marquee pauses on hover for usability

### FR-004: Project Showcase
- User can view project list with cards
- 3D tilt effect on hover for interactivity
- Tags show technologies used
- Links to source code and live demo
- Project cards wrapped in AnimateIn for scroll-reveal

### FR-005: Auto-Launch System
- Before launch date: Landing page with countdown timer
- After launch date: Full homepage automatically
- Date check runs every second via client component
- No redeploy needed at launch time

### FR-006: Responsive Design
- Layout adapts to desktop (1920px+)
- Layout adapts to laptop (1366px - 1919px)
- Layout adapts to tablet (768px - 1365px)
- Layout adapts to mobile (320px - 767px)
- Touch-friendly interactions on mobile

### FR-007: Performance
- First Contentful Paint (FCP) < 1.8 seconds
- Largest Contentful Paint (LCP) < 2.5 seconds
- Cumulative Layout Shift (CLS) < 0.1
- Image optimization with lazy loading
- Bundle JS < 200KB gzipped

### FR-008: SEO Optimization
- Meta tags optimization (title, description)
- Open Graph tags for social media sharing
- Structured data (JSON-LD) for rich snippets
- XML sitemap generation
- Robots.txt configuration

### FR-009: Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio minimum 4.5:1
- Focus indicators that are visible

---

## 7. Non-Functional Requirements

### Performance
- Page loading time < 2 seconds on 4G connection
- Time to Interactive (TTI) < 3.5 seconds
- Bundle size JavaScript < 200KB (gzipped)
- Smooth 60fps animation on all devices
- Lighthouse score > 90 for all categories

### Security
- HTTPS in production
- Input sanitization for all forms
- Protection against XSS and CSRF
- Secure headers (CSP, X-Frame-Options)

### Scalability
- Modular and reusable code structure
- Component-based architecture
- Efficient state management
- Server Components as default

### Maintainability
- Clean code with TypeScript strict mode
- Comprehensive documentation
- Atomic Design component organization
- Version control with Conventional Commits

### Usability
- Intuitive navigation with no learning curve
- Visual consistency across all pages
- Visual feedback for every user interaction
- User-friendly error handling
- Informative loading states

### Compatibility
- Modern browser support (Chrome, Firefox, Safari, Edge) - last 2 versions
- Graceful degradation for older browsers
- Progressive enhancement approach
- Cross-platform consistency

---

## 8. Application Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 16+ (App Router, React 19 Server Components)
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme`)
- **Animation**: Framer Motion
- **Icons**: Inline SVG components
- **Font**: Geist Sans/Mono + Press Start 2P (pixel accent)

#### Backend (Future)
- **API**: Next.js API Routes / Server Actions
- **Database**: PostgreSQL (Vercel Postgres) or Supabase
- **ORM**: Prisma or Drizzle
- **Authentication**: NextAuth.js

#### Development & Deployment
- **Package Manager**: npm
- **Version Control**: Git + GitHub
- **Code Quality**: TypeScript strict + ESLint
- **Deployment**: Vercel

### Folder Structure

```
portofolio/
├── app/                       # Next.js App Router pages
│   ├── globals.css            # Tailwind imports & design tokens
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root page (landing or homepage)
│   ├── page-gate.tsx          # Date gate: ComingSoon vs HomePage
│   ├── coming-soon.tsx        # Landing page before launch
│   ├── home-page.tsx          # Full homepage assembly
│   ├── robots.ts              # SEO robots.txt
│   └── sitemap.ts             # SEO sitemap
├── components/
│   ├── atoms/                 # Smallest UI components
│   │   ├── animate-in.tsx     # Scroll-reveal wrapper
│   │   ├── icons.tsx          # SVG icon components
│   │   ├── tech-icons.tsx     # Brand SVG icons for skills
│   │   ├── theme-toggle.tsx   # Dark/light toggle button
│   │   └── tilt-card.tsx      # 3D perspective tilt on hover
│   ├── molecules/
│   │   └── countdown-timer.tsx # Launch countdown
│   ├── organisms/
│   │   ├── about-section.tsx  # Focus areas + principles
│   │   ├── contact-section.tsx# Social links
│   │   ├── experience-section.tsx # Timeline
│   │   ├── footer.tsx         # Copyright
│   │   ├── hero-section.tsx   # Terminal widget + CTAs
│   │   ├── navbar.tsx         # Sticky navigation
│   │   ├── projects-section.tsx # Project cards
│   │   └── skills-section.tsx # Marquee + tabs + bars
│   └── theme-provider.tsx     # Theme context provider
├── constants/
│   └── index.ts              # All data (skills, projects, etc.)
├── lib/
│   └── utils.ts              # cn() utility
├── public/
│   ├── images/
│   │   └── favicon.svg       # Custom pixel avatar icon
│   └── resume.pdf            # Resume placeholder
├── AGENTS.md                 # AI Agent definitions
├── CLAUDE.md                 # Working rules
├── DESIGN.md                 # Design system
├── PRD.md                    # Product requirements
├── README.md                 # Project overview
├── SKILL.md                  # Professional skills profile
└── tsconfig.json             # TypeScript configuration
```

---

## 9. Success Metrics

### Phase 1 Metrics (Landing Page)
- **Performance**: Lighthouse score > 95 for all categories
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Load Time**: First Contentful Paint < 1 second

### Phase 2 Metrics (Full Website)
- **Performance**: Lighthouse > 90 for all categories
- **Engagement**: Average session duration > 2 minutes
- **SEO**: Top 10 Google result for "Achmad Fauzan portfolio"
- **Contact**: Growing professional network via displayed links

---

## 10. Development Milestones

### Milestone 1: Foundation & Documentation (Complete)
- ✅ PRD.md, DESIGN.md, AGENTS.md, CLAUDE.md, SKILL.md
- ✅ Next.js project setup with TypeScript
- ✅ Tailwind CSS v4 configuration
- ✅ ESLint setup

### Milestone 2: Landing Page (Complete)
- ✅ Design system via @theme (colors, typography, spacing)
- ✅ Reusable UI components (Icons, ThemeProvider)
- ✅ Landing page layout and structure
- ✅ Hero section with fade-up animation
- ✅ Countdown timer and status indicator
- ✅ Social links with hover effects
- ✅ Responsive design for all devices
- ✅ Vercel deployment

### Milestone 3: Homepage Core Sections (Complete)
- ✅ Navigation system with smooth scroll
- ✅ About section with focus areas and principles
- ✅ Skills section with marquee, tabs, brand icons
- ✅ Projects showcase with 3D tilt cards
- ✅ Experience timeline visualization
- ✅ Contact section with social links
- ✅ Footer with copyright
- ✅ Dark/light theme toggle with persistence
- ✅ SEO optimization (meta tags, sitemap, robots.txt)

### Milestone 4: Content & Polish (Planned)
- ⬜ Project detail pages
- ⬜ Blog system
- ⬜ Research and publications
- ⬜ Certificates showcase
- ⬜ Performance optimization
- ⬜ Cross-browser testing
- ⬜ Final QA and bug fixes

### Milestone 5: Advanced Features (Future)
- ⬜ Multi-language support
- ⬜ Analytics dashboard
- ⬜ Admin panel
- ⬜ Security audit and hardening
- ⬜ Documentation update and maintenance guide

---

## 11. Risks & Mitigation

### Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Performance issues on animation | High | Medium | Use CSS transforms for animation, optimize with will-change, test on low-end devices |
| Compatibility issues in older browsers | Medium | Low | Progressive enhancement, graceful degradation |
| Bundle size too large | High | Medium | Code splitting, tree shaking, dynamic imports |
| SEO not optimal with App Router | Medium | Medium | Metadata API, sitemap generation, server rendering for content |

### Project Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep during development | High | High | Strict adherence to roadmap, document change requests, prioritize features |
| Timeline delay due to complexity | Medium | Medium | Time buffer per milestone, MVP approach |
| Design inconsistency | Medium | Medium | Comprehensive design system, component library, regular design reviews |
| Content creation bottleneck | Low | High | Start content creation early, templates for case studies, progressive content updates |

---

## 12. Appendix

### References & Inspiration
- **Portfolio Websites**: Brittany Chiang, Leerob, Josh Comeau, Bruno Simon
- **Design System**: Material Design, Apple HIG, Tailwind UI
- **Animation**: Stripe, Linear, Framer
- **Pixel Art**: PICO-8 palette, Lospec color palettes
- **Agent Workflow**: Superpowers (github.com/obra/superpowers)

### Glossary
- **App Router**: Next.js 13+ routing system based on file system in app/ folder
- **Atomic Design**: Design system methodology with atoms, molecules, organisms, templates, pages
- **Core Web Vitals**: Google metrics measuring user experience (LCP, CLS, INP)
- **Modern Pixel Aesthetic**: Visual style combining pixel art elements with modern minimalist design
- **Server Components**: React components rendered on server for optimal performance

### Stakeholders
- **Owner & Developer**: Achmad Fauzan
- **Target Users**: Recruiters, startup founders, clients, academic community, tech community
- **Contributors**: Open to community contributions after launch

### Contact & Support
- **Email**: achmddfzn@proton.me
- **GitHub**: github.com/achmdfzn
- **LinkedIn**: linkedin.com/in/achmadfauzan

---

**Document Version**: 2.0
**Last Updated**: 27 July 2026
**Status**: Active
