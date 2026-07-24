'use client';

import { useTheme } from '@/components/theme-provider';
import { SunIcon, MoonIcon } from '@/components/atoms/icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle-btn fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded border"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <div
        className="flex items-center justify-center transition-transform duration-500"
        style={{
          transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(360deg) scale(0.9)',
        }}
      >
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </div>
    </button>
  );
}
