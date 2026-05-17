'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // On mount: read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem('lc-theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(t: 'dark' | 'light') {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
  }

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('lc-theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative flex h-8 w-8 items-center justify-center transition-colors
                 duration-300 hover:text-gold text-cream/50"
    >
      {/* Sun icon — show when currently dark (clicking switches to light) */}
      <svg
        className={`absolute h-4 w-4 transition-all duration-300
          ${ theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75' }`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      {/* Moon icon — show when currently light */}
      <svg
        className={`absolute h-4 w-4 transition-all duration-300
          ${ theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75' }`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      </svg>
    </button>
  );
}
