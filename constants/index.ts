import type { ComponentType, SVGProps } from 'react';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/atoms/icons';

export interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'ml' | 'cloud' | 'tools';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  source?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** Tanggal peluncuran — sumber tunggal untuk countdown. */
export const LAUNCH_DATE = '2026-08-22T00:00:00+07:00';

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/achmdfzn', Icon: GitHubIcon, external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achmadfauzan', Icon: LinkedInIcon, external: true },
  { label: 'Email', href: 'mailto:achmddfzn@proton.me', Icon: MailIcon, external: false },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'React / Next.js', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend' },
  { name: 'Framer Motion', level: 60, category: 'frontend' },
  { name: 'Node.js', level: 75, category: 'backend' },
  { name: 'Python', level: 70, category: 'backend' },
  { name: 'PostgreSQL', level: 65, category: 'backend' },
  { name: 'Prisma / Drizzle', level: 55, category: 'backend' },
  { name: 'TensorFlow / PyTorch', level: 45, category: 'ml' },
  { name: 'Scikit-learn', level: 55, category: 'ml' },
  { name: 'Pandas / NumPy', level: 60, category: 'ml' },
  { name: 'Vercel', level: 70, category: 'cloud' },
  { name: 'Docker', level: 40, category: 'cloud' },
  { name: 'Git / GitHub', level: 85, category: 'tools' },
  { name: 'Figma', level: 45, category: 'tools' },
  { name: 'VS Code', level: 90, category: 'tools' },
];

export const PROJECTS: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'Personal portfolio with Modern Pixel Aesthetic — built with Next.js, TypeScript, Tailwind CSS v4, and Atomic Design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    href: '#',
    source: 'https://github.com/achmdfzn/portofolio',
  },
  {
    title: 'ML Model Pipeline',
    description:
      'End-to-end machine learning pipeline for predictive modeling with data preprocessing, training, evaluation, and deployment.',
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'FastAPI'],
    source: 'https://github.com/achmdfzn',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Engineer (in progress)',
    company: 'Freelance / Personal Projects',
    period: '2024 — Present',
    description:
      'Building full-stack web applications and AI/ML projects. Focused on clean architecture, modern tech stack, and user-centric design.',
    tags: ['Next.js', 'TypeScript', 'Python', 'AI/ML'],
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/achmdfzn', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achmadfauzan', Icon: LinkedInIcon },
  { label: 'Email', href: 'mailto:achmddfzn@proton.me', Icon: MailIcon },
];
