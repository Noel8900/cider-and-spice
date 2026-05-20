import { MenuItem, DIETARY_LABELS, DIETARY_COLOR } from '@/lib/menu';
import Link from 'next/link';

export default function DishCard({ item }: { item: MenuItem }) {
  return (
    <div
      className="flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #1A1510 0%, #13110D 100%)',
        border: '1px solid rgba(232,211,165,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
      }}
    >
      {item.featured && (
        <div style={{ height: 2, background: 'linear-gradient(90deg, #C97A3E, #D4A84B, transparent)' }} />
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-corp-display text-lg font-light leading-snug"
            style={{ color: '#E8D3A5' }}
          >{item.name}</h3>
          <span
            className="shrink-0 font-corp-display text-base font-light"
            style={{ color: '#D4A84B' }}
          >{item.price}</span>
        </div>

        <span
          className="font-label text-[7.5px] tracking-[0.2em] uppercase mb-2 block"
          style={{ color: 'rgba(201,122,62,0.55)' }}
        >{item.category}</span>

        <p
          className="font-sans text-xs leading-relaxed flex-1 mb-4"
          style={{ color: 'rgba(232,211,165,0.40)' }}
        >{item.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {item.dietary.map(tag => (
              <span
                key={tag}
                className="font-label text-[6.5px] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  color:      DIETARY_COLOR[tag],
                  border:     `1px solid ${DIETARY_COLOR[tag]}33`,
                  background: `${DIETARY_COLOR[tag]}0D`,
                }}
              >{DIETARY_LABELS[tag]}</span>
            ))}
          </div>
          <Link
            href={`/vendors/${item.vendorSlug}`}
            className="font-label text-[7px] tracking-[0.18em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(212,168,75,0.30)' }}
          >{item.vendorName} ↗</Link>
        </div>
      </div>
    </div>
  );
}
