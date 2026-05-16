'use client';
// Persistent floating access point to the Floor Plan tool.
// Appears after 300 px of scroll on any page; slides in from bottom-right.
// Hidden on the /floor-plan/ route itself (no point linking to the current page).

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingFloorPlanButton() {
  const pathname  = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // set on mount
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Don't render on the floor-plan page itself
  if (pathname?.startsWith('/floor-plan')) return null;

  return (
    <Link
      href="/floor-plan/"
      aria-label="View interactive floor plan"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2
                  rounded-full bg-[#C4622D] px-5 py-3 font-sans text-sm
                  font-semibold text-white shadow-lg shadow-black/40
                  transition-all duration-300
                  hover:bg-[#a8521f] hover:shadow-xl hover:-translate-y-0.5
                  ${visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0 pointer-events-none'
                  }`}
    >
      <span aria-hidden="true">🗺</span>
      Floor Plan
    </Link>
  );
}
