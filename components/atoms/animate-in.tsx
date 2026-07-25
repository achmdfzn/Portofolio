'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimateIn({ children, delay = 0, className }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
