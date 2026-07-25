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
  level: number;
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

/** Launch date - single source for countdown. */
export const LAUNCH_DATE = '2026-07-24T00:00:00+07:00';

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
  { name: 'HTML / CSS', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 75, category: 'backend' },
  { name: 'Python', level: 70, category: 'backend' },
  { name: 'PostgreSQL', level: 65, category: 'backend' },
  { name: 'Prisma / Drizzle', level: 55, category: 'backend' },
  { name: 'REST API', level: 75, category: 'backend' },
  { name: 'TensorFlow / PyTorch', level: 45, category: 'ml' },
  { name: 'Scikit-learn', level: 55, category: 'ml' },
  { name: 'Pandas / NumPy', level: 60, category: 'ml' },
  { name: 'NLP', level: 40, category: 'ml' },
  { name: 'Vercel', level: 70, category: 'cloud' },
  { name: 'Docker', level: 40, category: 'cloud' },
  { name: 'GitHub Actions', level: 50, category: 'cloud' },
  { name: 'Git / GitHub', level: 85, category: 'tools' },
  { name: 'Figma', level: 45, category: 'tools' },
  { name: 'VS Code', level: 90, category: 'tools' },
  { name: 'Linux / CLI', level: 55, category: 'tools' },
];

export const PROJECTS: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'Personal portfolio with Modern Pixel Aesthetic - built with Next.js 16, TypeScript, Tailwind CSS v4, and Atomic Design. Features dark/light theme, auto-launch date gate, and accessible components.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    href: '#',
    source: 'https://github.com/achmdfzn/portofolio',
  },
  {
    title: 'ML Model Pipeline',
    description:
      'End-to-end machine learning pipeline for predictive modeling. Includes data preprocessing, feature engineering, model training with Scikit-learn, evaluation metrics, and FastAPI deployment.',
    tags: ['Python', 'Scikit-learn', 'FastAPI', 'Pandas'],
    source: 'https://github.com/achmdfzn',
  },
  {
    title: 'E-Commerce API',
    description:
      'RESTful API for e-commerce platform with authentication, product management, cart system, and order processing. Built with clean architecture and comprehensive error handling.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    source: 'https://github.com/achmdfzn',
  },
  {
    title: 'Text Classification Model',
    description:
      'NLP model for multi-class text classification using TensorFlow. Implements tokenization, embedding layers, LSTM, and evaluation on benchmark datasets.',
    tags: ['Python', 'TensorFlow', 'NLP', 'LSTM'],
    source: 'https://github.com/achmdfzn',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Engineer (Freelance)',
    company: 'Self-employed',
    period: '2025 - Present',
    description:
      'Building full-stack web applications and AI/ML projects for clients. Focused on clean architecture, modern tech stacks (Next.js, TypeScript, Python), and user-centric design. Delivered projects on time with high-quality standards.',
    tags: ['Next.js', 'TypeScript', 'Python', 'AI/ML', 'PostgreSQL'],
  },
  {
    role: 'Teaching Assistant - Web Development',
    company: 'Informatics Engineering Department',
    period: '2025 - 2026',
    description:
      'Assisted in teaching web development fundamentals to undergraduate students. Created learning materials, reviewed code assignments, conducted lab sessions, and provided one-on-one mentoring.',
    tags: ['HTML/CSS', 'JavaScript', 'React', 'Mentoring'],
  },
  {
    role: 'Machine Learning Research Intern',
    company: 'University Research Lab',
    period: '2025',
    description:
      'Conducted research on NLP techniques for Indonesian text classification. Built and evaluated multiple model architectures, documented findings, and presented results to the research team.',
    tags: ['Python', 'TensorFlow', 'NLP', 'Research'],
  },
  {
    role: ' Informatics Engineering Student',
    company: 'University',
    period: '2023 - Present',
    description:
      'Pursuing a degree in Informatics Engineering. Active in software development, AI/ML exploration, and tech community activities. Focus on building strong foundations in computer science and practical engineering skills.',
    tags: ['Data Structures', 'Algorithms', 'Software Engineering', 'AI'],
  },
];

export const RESUME_URL = '/resume.pdf';

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/achmdfzn', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achmadfauzan', Icon: LinkedInIcon },
  { label: 'Email', href: 'mailto:achmddfzn@proton.me', Icon: MailIcon },
];
