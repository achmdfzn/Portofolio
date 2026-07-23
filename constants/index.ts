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
  { label: 'Contact', href: '#contact' },
];
