import type { SVGProps, JSX } from 'react';

type TechIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export const TECH_ICONS: Record<string, TechIcon> = {
  TypeScript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
      <path d="M13.5 15.5v2.5a3 3 0 0 0 3 0v-2.5M9 11h6M12 11v7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'React / Next.js': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="3" ry="9" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="3" ry="9" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(-30 12 12)" />
    </svg>
  ),
  'Tailwind CSS': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 4C9.33 4 7.5 5.5 6.5 8.5c2-1.5 4-1.5 6 0 1.33 1 2.67 1 4 0C15.5 5.5 14 4 12 4zM6.5 12c-2.67 0-4.5 1.5-5.5 4.5 2-1.5 4-1.5 6 0 1.33 1 2.67 1 4 0-1-3-2.5-4.5-4.5-4.5z" fill="#38BDF8" />
    </svg>
  ),
  'Framer Motion': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="#fff" strokeWidth="1.2" fill="#0055FF" />
      <path d="M8 12l4 4 4-4M8 8l4 4 4-4" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  'HTML / CSS': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M5 3l1.5 18L12 22l5.5-1L19 3H5z" fill="#E44D26" />
      <path d="M12 21V4h5l-1 14.5-4 2.5z" fill="#F16529" />
      <path d="M8 7h8l-.5 5H10l.5 4 2 .5 2-.5.5-2" fill="#fff" />
    </svg>
  ),
  'Node.js': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933" />
      <path d="M12 22V12l9-5" fill="#237A23" />
      <path d="M12 12L3 7l9-5 9 5-9 5z" fill="#63D163" opacity="0.5" />
    </svg>
  ),
  Python: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 2c-4 0-4 2-4 3v2h8V5c0-1 0-3-4-3z" fill="#306998" />
      <path d="M20 12c0-4-2-4-3-4H7c-1 0-3 0-3 4s2 4 3 4h10c1 0 3 0 3-4z" fill="#FFD43B" />
      <path d="M8 8c-1 0-2 0-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" fill="#306998" />
      <circle cx="8" cy="10" r="1" fill="#FFD43B" />
      <path d="M16 14c1 0 2 0 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" fill="#FFD43B" />
      <circle cx="16" cy="12" r="1" fill="#306998" />
    </svg>
  ),
  PostgreSQL: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M16 2c-2 0-3 1-3 3l1 4-1 3h2l1-3V5c0-1 0-3-2-3z" fill="#336791" />
      <path d="M12 7c-1 0-3 0-4 2-1 2-1 4-1 5s1 3 2 3 2-1 2-2-1-2-1-3 0-3 2-4c1 0 2-1 2-1h-2z" fill="#336791" />
    </svg>
  ),
  'Prisma / Drizzle': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M20 19L4 22l7-19 9 16z" fill="#0C344B" stroke="#2D3748" strokeWidth="0.5" />
      <path d="M20 19L11 3l-7 19 16-3z" fill="#2B6CB0" opacity="0.6" />
      <path d="M11 3l9 16-16 3L11 3z" stroke="#63B3ED" strokeWidth="0.3" />
    </svg>
  ),
  'REST API': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="3" y="3" width="6" height="6" rx="1" fill="#4A5568" />
      <rect x="15" y="3" width="6" height="6" rx="1" fill="#4A5568" />
      <rect x="3" y="15" width="6" height="6" rx="1" fill="#4A5568" />
      <rect x="15" y="15" width="6" height="6" rx="1" fill="#4A5568" />
      <path d="M9 6h6M9 18h6M6 9v6M18 9v6" stroke="#718096" strokeWidth="1.2" />
    </svg>
  ),
  'TensorFlow / PyTorch': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 4v16M6 8l12 8M18 8l-12 8" stroke="#FF6F00" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#FF6F00" />
    </svg>
  ),
  'Scikit-learn': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <circle cx="8" cy="8" r="2" fill="#F7931E" />
      <circle cx="16" cy="16" r="2" fill="#F7931E" />
      <circle cx="16" cy="8" r="1.5" fill="#306998" />
      <circle cx="8" cy="16" r="1.5" fill="#306998" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#718096" strokeWidth="0.8" />
    </svg>
  ),
  'Pandas / NumPy': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="5" y="4" width="3" height="16" rx="0.5" fill="#130654" />
      <rect x="10" y="4" width="3" height="12" rx="0.5" fill="#FFCA3A" />
      <rect x="15" y="4" width="3" height="8" rx="0.5" fill="#130654" />
    </svg>
  ),
  NLP: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <circle cx="12" cy="8" r="4" fill="#6B46C1" />
      <path d="M6 20c0-4 2-6 6-6s6 2 6 6" stroke="#6B46C1" strokeWidth="1.2" />
      <path d="M9 10l3 3 3-3" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  Vercel: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 3L3 21h18L12 3z" fill="#fff" />
    </svg>
  ),
  Docker: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="3" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="7" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="11" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="7" y="6" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="11" y="6" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="15" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
      <path d="M3 14c0 2.5 2 5 6 5 4 0 6.5-2 7.5-4.5h1.5a2 2 0 0 0 2-2v-1h-2" stroke="#2496ED" strokeWidth="1" />
    </svg>
  ),
  'GitHub Actions': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="2" y="2" width="20" height="10" rx="2" fill="#2088FF" />
      <path d="M2 17v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2M6 11v2M12 11v2M18 11v2" stroke="#2088FF" strokeWidth="1.2" />
    </svg>
  ),
  'Git / GitHub': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.48 0-.24-.008-.87-.013-1.7-2.782.6-3.37-1.34-3.37-1.34-.454-1.16-1.11-1.47-1.11-1.47-.908-.62.069-.61.069-.61 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.09 2.91.83.092-.65.35-1.09.636-1.34-2.22-.25-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.029-2.69-.103-.25-.446-1.27.098-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85.004 1.705.115 2.504.34 1.909-1.29 2.747-1.02 2.747-1.02.546 1.38.202 2.4.1 2.65.64.7 1.028 1.6 1.028 2.69 0 3.84-2.339 4.68-4.566 4.94.359.31.678.92.678 1.86 0 1.34-.012 2.42-.012 2.75 0 .27.18.58.688.48A10.01 10.01 0 0 0 22 12c0-5.523-4.477-10-10-10z" fill="#333" />
    </svg>
  ),
  Figma: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#0ACF83" />
      <path d="M12 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#A259FF" />
      <path d="M12 6v6M6 18a3 3 0 0 0 3 3h3v-6H9a3 3 0 0 0-3 3z" fill="#F24E1E" />
    </svg>
  ),
  'VS Code': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <path d="M17 20L8 15l-4 2L2 15l6-3L2 9l2-2 4 2 9-5 4 3v12l-4 3z" fill="#007ACC" />
      <path d="M17 20V8l-5 4v4l5 4z" fill="#005A9E" />
    </svg>
  ),
  'Linux / CLI': (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props} width="16" height="16">
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#2D3748" />
      <circle cx="6" cy="7" r="1" fill="#4A5568" />
      <circle cx="9" cy="7" r="1" fill="#4A5568" />
      <path d="M6 11l3 3-3 3" stroke="#63B3ED" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 17h5" stroke="#63B3ED" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};
