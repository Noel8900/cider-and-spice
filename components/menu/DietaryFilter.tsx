'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { DietaryTag, DIETARY_LABELS, DIETARY_COLOR } from '@/lib/menu';

const DIET_TAGS: DietaryTag[] = ['gf', 'vegan', 'vegetarian', 'spicy', 'dairy-free', 'nut-free'];

export default function DietaryFilter({
  activeVendor,
  activeDiet,
  vendors,
}: {
  activeVendor: string;
  activeDiet:   string;
  vendors:      { slug: string; name: string }[];
}) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback((key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!val || val === 'all') params.delete(key);
    else params.set(key, val);
    router.push(`/menu?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className="flex flex-col gap-4">
      {/* Vendor filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-label text-[8px] tracking-[0.25em] uppercase mr-1" style={{ color: 'rgba(232,211,165,0.22)' }}>Vendor</span>
        <button
          onClick={() => update('vendor', 'all')}
          aria-pressed={activeVendor === 'all'}
          className="px-3 py-1.5 font-label text-[7.5px] tracking-[0.18em] uppercase transition-all duration-300"
          style={{
            border:     activeVendor === 'all' ? '1px solid rgba(212,168,75,0.40)' : '1px solid rgba(232,211,165,0.09)',
            background: activeVendor === 'all' ? 'rgba(212,168,75,0.10)' : 'transparent',
            color:      activeVendor === 'all' ? '#D4A84B' : 'rgba(232,211,165,0.28)',
          }}
        >All</button>
        {vendors.map(v => (
          <button
            key={v.slug}
            onClick={() => update('vendor', v.slug)}
            aria-pressed={activeVendor === v.slug}
            className="px-3 py-1.5 font-label text-[7.5px] tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              border:     activeVendor === v.slug ? '1px solid rgba(212,168,75,0.40)' : '1px solid rgba(232,211,165,0.09)',
              background: activeVendor === v.slug ? 'rgba(212,168,75,0.10)' : 'transparent',
              color:      activeVendor === v.slug ? '#D4A84B' : 'rgba(232,211,165,0.28)',
            }}
          >{v.name}</button>
        ))}
      </div>

      {/* Dietary filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-label text-[8px] tracking-[0.25em] uppercase mr-1" style={{ color: 'rgba(232,211,165,0.22)' }}>Diet</span>
        <button
          onClick={() => update('diet', 'all')}
          aria-pressed={activeDiet === 'all'}
          className="px-3 py-1.5 font-label text-[7.5px] tracking-[0.18em] uppercase transition-all duration-300"
          style={{
            border:     activeDiet === 'all' ? '1px solid rgba(212,168,75,0.40)' : '1px solid rgba(232,211,165,0.09)',
            background: activeDiet === 'all' ? 'rgba(212,168,75,0.10)' : 'transparent',
            color:      activeDiet === 'all' ? '#D4A84B' : 'rgba(232,211,165,0.28)',
          }}
        >All</button>
        {DIET_TAGS.map(tag => {
          const isActive = activeDiet === tag;
          const color = DIETARY_COLOR[tag];
          return (
            <button
              key={tag}
              onClick={() => update('diet', tag)}
              aria-pressed={isActive}
              className="px-3 py-1.5 font-label text-[7.5px] tracking-[0.18em] uppercase transition-all duration-300"
              style={{
                border:     isActive ? `1px solid ${color}55` : '1px solid rgba(232,211,165,0.09)',
                background: isActive ? `${color}12`           : 'transparent',
                color:      isActive ? color                  : 'rgba(232,211,165,0.28)',
              }}
            >{DIETARY_LABELS[tag]}</button>
          );
        })}
      </div>
    </div>
  );
}
