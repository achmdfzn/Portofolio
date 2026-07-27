'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b"
      style={{
        background: 'transparent',
        borderColor: 'transparent',
      }}
    >
      <div
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {/* Logo / Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="text-sm font-semibold"
          style={{ color: 'var(--color-accent)', letterSpacing: '0.05em' }}
        >
          AF
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => handleClick(href)}
                aria-current={activeSection === href.slice(1) ? 'page' : undefined}
                className="relative text-sm transition-colors"
                style={{
                  color:
                    activeSection === href.slice(1)
                      ? 'var(--color-accent)'
                      : 'var(--color-text-secondary)',
                }}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 items-center justify-center sm:hidden"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className="block h-0.5 w-5 rounded transition-transform duration-200"
              style={{
                background: 'currentColor',
                transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-opacity duration-200"
              style={{
                background: 'currentColor',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-transform duration-200"
              style={{
                background: 'currentColor',
                transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t transition-all duration-300 sm:hidden',
          menuOpen ? 'max-h-80' : 'max-h-0',
        )}
        style={{ borderColor: 'var(--color-border)' }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMenuOpen(false);
        }}
      >
        <ul className="flex flex-col gap-2 px-5 py-4">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => handleClick(href)}
                className="w-full rounded px-3 py-2 text-left text-sm transition-colors"
                style={{
                  color:
                    activeSection === href.slice(1)
                      ? 'var(--color-accent)'
                      : 'var(--color-text-secondary)',
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
