'use client';
// PageTransition — wraps app children for route-change overlay.
// Fix: overlay now starts at opacity: 0.85 on route change (visible flash in),
// then fades to 0 over 0.55s. On first mount fades body in from opacity 0.
// z-index 9997 — sits below PageLoader (9998) so they don't fight.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children?: React.ReactNode }) {
  const pathname   = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPath   = useRef<string | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (prevPath.current === null) {
      gsap.from(document.body, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    } else if (prevPath.current !== pathname) {
      gsap.fromTo(
        overlay,
        { opacity: 0.85 },
        { opacity: 0, duration: 0.55, ease: 'power2.inOut' }
      );
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 9997,
          background: '#1C1209',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />
      {children}
    </>
  );
}
