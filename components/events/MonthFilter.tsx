'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { EventCategory, CATEGORY_LABELS, CATEGORY_COLOR } from '@/lib/events';

const ALL_CATEGORIES: { id: EventCategory | 'all'; label: string }[] = [
  { id: 'all',          label: 'All Events'    },
  { id: 'live-music',   label: 'Live Music'    },
  { id: 'cider-tasting',label: 'Cider Tasting' },
  { id: 'cooking-class',label: 'Cooking Class' },
  { id: 'pitch-night',  label: 'Pitch Night'   },
  { id: 'market',       label: 'Market'        },
];

export default function MonthFilter({ active }: { active: EventCategory | 'all' }) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback((id: EventCategory | 'all') => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'all') params.delete('cat');
    else params.set('cat', id);
    router.push(`/events?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="font-label text-[8px] tracking-[0.25em] uppercase mr-1"
        style={{ color: 'rgba(232,211,165,0.25)' }}
      >Filter</span>
      {ALL_CATEGORIES.map(({ id, label }) => {
        const isActive = active === id;
        const color = id === 'all' ? '#D4A84B' : CATEGORY_COLOR[id as EventCategory];
        return (
          <button
            key={id}
            onClick={() => setFilter(id)}
            aria-pressed={isActive}
            className="px-4 py-2 font-label text-[8px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              border:     isActive ? `1px solid ${color}55` : '1px solid rgba(232,211,165,0.09)',
              background: isActive ? `${color}12`           : 'transparent',
              color:      isActive ? color                  : 'rgba(232,211,165,0.30)',
              boxShadow:  isActive ? `0 0 16px ${color}08 inset` : 'none',
            }}
          >{label}</button>
        );
      })}
    </div>
  );
}
