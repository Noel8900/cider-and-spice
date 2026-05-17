'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'opportunity', label: 'The Hub'      },
  { id: 'concept',     label: 'How It Works' },
  { id: 'impact',      label: 'Community'    },
  { id: 'cider-bar',   label: 'Cider Bar'    },
];

export default function ActiveSectionHighlight() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  if (!active) return null;

  const label = SECTIONS.find(s => s.id === active)?.label;

  return (
    <div
      aria-hidden="true"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
    >
      {SECTIONS.map(({ id, label: sLabel }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-2.5 transition-all duration-300"
          tabIndex={-1}
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width:      active === id ? '20px' : '6px',
              height:     '2px',
              background: active === id ? '#D4A84B' : 'rgba(212,168,75,0.25)',
            }}
          />
          <span
            className="font-label text-[8px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              color:   active === id ? 'rgba(212,168,75,0.80)' : 'transparent',
              opacity: active === id ? 1 : 0,
              transform: active === id ? 'translateX(0)' : 'translateX(-4px)',
            }}
          >
            {sLabel}
          </span>
        </a>
      ))}
    </div>
  );
}
