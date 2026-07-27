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
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  techDetails: string;
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

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  href?: string;
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
  { label: 'Certificates', href: '#certificates' },
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
    slug: 'portfolio-website',
    description:
      'Personal portfolio with Modern Pixel Aesthetic - built with Next.js 16, TypeScript, Tailwind CSS v4, and Atomic Design. Features dark/light theme, auto-launch date gate, and accessible components.',
    longDescription:
      'A professional portfolio website built from the ground up with modern web technologies. The design follows a Modern Pixel Aesthetic — combining retro pixel art influences with clean, minimal modern design. The architecture uses Atomic Design principles for component organization and Clean Architecture for separation of concerns. Features include a dark/light theme toggle with localStorage persistence and system preference detection, a date-gated auto-launch system that transitions from a Coming Soon landing page to the full homepage, animated skills marquee with custom brand SVG icons, 3D tilt cards for project showcase, and a terminal-styled hero section.',
    features: [
      'Dark/light theme with smooth CSS transitions and anti-flicker script',
      'Auto-launch date gate — no redeploy needed at launch time',
      'Animated skills marquee with 21 custom brand SVG icons',
      '3D perspective tilt on project cards (mouse-tracked, 6° max rotation)',
      'Terminal-styled hero widget with principles, agents, and stack display',
      'Scroll-reveal animations via Framer Motion with staggered delays',
      'Responsive design with mobile hamburger navigation',
      'SEO optimized with JSON-LD structured data, sitemap, and Open Graph',
    ],
    techDetails:
      'Next.js 16 App Router with React 19 Server Components. Tailwind CSS v4 with CSS-first @theme configuration and CSS custom properties for dynamic theming. Framer Motion for scroll animations. TypeScript strict mode throughout. Inline SVG icons with zero external icon dependencies.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    href: '#',
    source: 'https://github.com/achmdfzn/portofolio',
  },
  {
    title: 'ML Model Pipeline',
    slug: 'ml-model-pipeline',
    description:
      'End-to-end machine learning pipeline for predictive modeling. Includes data preprocessing, feature engineering, model training with Scikit-learn, evaluation metrics, and FastAPI deployment.',
    longDescription:
      'A complete machine learning pipeline designed for production-ready predictive modeling. The pipeline handles the full ML lifecycle — from raw data ingestion through preprocessing, feature engineering, model training with hyperparameter tuning, evaluation with multiple metrics, and deployment via a FastAPI REST API. The architecture is modular, allowing each stage to be tested and improved independently.',
    features: [
      'Automated data preprocessing pipeline with missing value handling and outlier detection',
      'Feature engineering module with automated feature selection',
      'Multiple model training with Scikit-learn (Random Forest, XGBoost, Logistic Regression)',
      'Hyperparameter tuning via GridSearchCV and RandomizedSearchCV',
      'Comprehensive evaluation metrics (accuracy, precision, recall, F1, ROC-AUC)',
      'FastAPI REST API for model inference with input validation',
      'Docker containerization for reproducible deployment',
    ],
    techDetails:
      'Python with Scikit-learn, Pandas, NumPy for data processing and modeling. FastAPI for REST API deployment. Docker for containerization. MLflow for experiment tracking. Pydantic for request/response validation.',
    tags: ['Python', 'Scikit-learn', 'FastAPI', 'Pandas'],
    source: 'https://github.com/achmdfzn',
  },
  {
    title: 'E-Commerce API',
    slug: 'e-commerce-api',
    description:
      'RESTful API for e-commerce platform with authentication, product management, cart system, and order processing. Built with clean architecture and comprehensive error handling.',
    longDescription:
      'A production-grade RESTful API for an e-commerce platform. Built with Node.js and Express following Clean Architecture principles. The API handles user authentication with JWT, product catalog management, shopping cart operations, order processing with status tracking, and payment integration. Every endpoint features input validation, comprehensive error handling, and proper HTTP status codes.',
    features: [
      'JWT-based authentication with refresh tokens and role-based access control',
      'Product CRUD with category management, search, and pagination',
      'Shopping cart with session persistence and merge on login',
      'Order processing with status workflow (pending, confirmed, shipped, delivered)',
      'Input validation with Joi/Zod schemas on every endpoint',
      'Centralized error handling with consistent error response format',
      'Rate limiting and request logging middleware',
      'PostgreSQL database with Prisma ORM and migration management',
    ],
    techDetails:
      'Node.js with Express.js framework. PostgreSQL database with Prisma ORM. JWT for authentication with access/refresh token pattern. Zod for input validation. Winston for logging. Docker Compose for local development environment.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    source: 'https://github.com/achmdfzn',
  },
  {
    title: 'Text Classification Model',
    slug: 'text-classification-model',
    description:
      'NLP model for multi-class text classification using TensorFlow. Implements tokenization, embedding layers, LSTM, and evaluation on benchmark datasets.',
    longDescription:
      'A deep learning model for multi-class text classification built with TensorFlow. The model architecture includes text tokenization, word embeddings, bidirectional LSTM layers, and dense classification layers. Trained and evaluated on benchmark NLP datasets. The project includes data preprocessing scripts, model training with early stopping and checkpointing, and a evaluation dashboard for visualizing model performance across metrics and classes.',
    features: [
      'Text preprocessing pipeline with custom tokenization and padding',
      'Bidirectional LSTM architecture for sequence understanding',
      'Word embeddings with pre-trained GloVE vectors',
      'Training with early stopping, model checkpointing, and learning rate scheduling',
      'Evaluation with confusion matrix, classification report, and per-class metrics',
      'Model export for TensorFlow Serving deployment',
      'Jupyter notebooks for exploratory data analysis and model interpretation',
    ],
    techDetails:
      'Python with TensorFlow/Keras for deep learning. NumPy and Pandas for data processing. Matplotlib and Seaborn for visualization. Jupyter notebooks for interactive development. TensorFlow SavedModel format for deployment.',
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

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Google IT Support Professional',
    issuer: 'Coursera / Google',
    date: '2025',
    tags: ['IT Support', 'Networking', 'Security'],
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Stanford Online',
    date: '2025',
    tags: ['ML', 'TensorFlow', 'Python'],
  },
  {
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    date: '2024',
    tags: ['AI', 'Python'],
  },
  {
    title: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding Indonesia',
    date: '2024',
    tags: ['ML', 'Python', 'Scikit-learn'],
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/achmdfzn', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achmadfauzan', Icon: LinkedInIcon },
  { label: 'Email', href: 'mailto:achmddfzn@proton.me', Icon: MailIcon },
];
