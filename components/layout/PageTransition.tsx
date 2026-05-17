'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children?: React.ReactNode }) {
  const pathname  = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPath  = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current === null) {
      // First mount: fade in from 0
      gsap.from(document.body, { opacity: 0, duration: 0.45, ease: 'power2.out' });
    } else if (prevPath.current !== pathname) {
      // Route change: quick flash overlay then fade out
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.5, ease: 'power2.inOut' }
        );
      }
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <>
      {/* Full-screen fade overlay for route transitions */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#1C1209',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />
      {children}
    </>
  );
}
