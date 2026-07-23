# Achmad Fauzan — Portfolio Website

Modern portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Modern Pixel Aesthetic** design system.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2+ (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, CSS custom properties
- **Font**: Geist (sans/mono) + Press Start 2P (pixel accent)
- **Deployment**: Vercel (recommended)

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📤 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy
5. Done! Your site is live at `https://your-project.vercel.app`

**Environment Variables**: None required for landing page. Add `.env.local` for future features (contact form, CMS, analytics).

### Manual Deploy

```bash
npm run build
# Upload the `.next` folder + `public` + `package.json` to your hosting
```

## 📂 Project Structure

```
portofolio/
├── app/
│   ├── components/
│   │   └── countdown-timer.tsx   # Countdown to Aug 22, 2026
│   ├── globals.css               # Design tokens, animations
│   ├── layout.tsx                # Root layout, fonts, metadata
│   └── page.tsx                  # Landing page (Coming Soon)
├── public/                       # Static assets
├── AGENTS.md                     # AI agents definition
├── CLAUDE.md                     # Claude AI working rules
├── DESIGN.md                     # Design system (colors, typography, spacing)
├── PRD.md                        # Product Requirements Document
├── SKILL.md                      # Professional profile
└── README.md                     # You are here
```

## 🎨 Design System

- **Color Palette**: Black, white, gray + **Cyan Elektrik** accent (`#00d4ff`)
- **Typography**: Geist (body), Press Start 2P (pixel headings)
- **Aesthetic**: Modern Pixel — retro pixel art meets minimalist design
- **Responsive**: Mobile-first, tested at 375px / 768px / 1280px

Full design tokens documented in [DESIGN.md](./DESIGN.md).

## 📋 Development Roadmap

- [x] **Phase 1**: Documentation (PRD, DESIGN, AGENTS, CLAUDE, SKILL)
- [x] **Phase 2**: Landing Page Coming Soon
- [ ] **Phase 3**: Homepage Core Sections (Hero, About, Skills, Projects, Contact)
- [ ] **Phase 4**: CMS Integration & Admin Panel
- [ ] **Phase 5**: Blog & Interactive Features
- [ ] **Phase 6**: Performance Optimization & Analytics

See [PRD.md](./PRD.md) for detailed roadmap.

## 📄 License

Personal portfolio project by Achmad Fauzan.

## 📧 Contact

- GitHub: [achmdfzn](https://github.com/achmdfzn)
- Email: achmddfzn@proton.me
- LinkedIn: *(coming soon)*
