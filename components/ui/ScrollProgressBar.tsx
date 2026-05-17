'use client';
// Thin gold scroll progress indicator — 1px line at the very top of the viewport.
// Grows from left to right as the user scrolls toward the bottom.
// Appears after 5% scroll; hidden on corporate routes.

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const CORP_PREFIXES = ['/home', '/about', '/services', '/insights'];

export default function ScrollProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Hide on corporate routes
  const isCorp = CORP_PREFIXES.some(
    (p) => pathname === p || pathname?.startsWith(p + '/')
  );
  if (isCorp) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-px bg-gradient-to-r from-gold/80 to-gold/40
                 transition-opacity duration-500"
      style={{
        width: `${progress}%`,
        opacity: progress > 2 ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}
