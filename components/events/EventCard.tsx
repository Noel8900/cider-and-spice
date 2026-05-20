'use client';

import Link from 'next/link';
import { Event, CATEGORY_LABELS, CATEGORY_COLOR } from '@/lib/events';

export default function EventCard({ event }: { event: Event }) {
  const color = CATEGORY_COLOR[event.category];
  const dateObj = new Date(event.date + 'T12:00:00');
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day   = dateObj.getDate();
  const weekday = dateObj.toLocaleString('en-US', { weekday: 'long' });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block transition-all duration-300"
      style={{
        background: 'linear-gradient(160deg, #1A1510 0%, #13110D 100%)',
        border: `1px solid rgba(232,211,165,0.08)`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div className="p-6 flex gap-5">
        {/* Date block */}
        <div
          className="shrink-0 flex flex-col items-center justify-center"
          style={{
            width: 56, minHeight: 64,
            background: `${color}11`,
            border: `1px solid ${color}33`,
          }}
        >
          <span
            className="font-label text-[8px] tracking-[0.25em] uppercase"
            style={{ color }}
          >{month}</span>
          <span
            className="font-corp-display text-3xl font-light leading-none mt-0.5"
            style={{ color: '#E8D3A5' }}
          >{day}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="font-label text-[7.5px] tracking-[0.22em] uppercase px-2 py-0.5"
              style={{
                color,
                border: `1px solid ${color}33`,
                background: `${color}0D`,
              }}
            >{CATEGORY_LABELS[event.category]}</span>
            {event.featured && (
              <span
                className="font-label text-[7px] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{ color: 'rgba(212,168,75,0.60)', border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.06)' }}
              >Featured</span>
            )}
          </div>

          <h3
            className="font-corp-display text-xl font-light leading-tight mb-0.5 group-hover:text-gold transition-colors duration-300"
            style={{ color: '#E8D3A5' }}
          >{event.title}</h3>
          <p
            className="font-label text-[8px] tracking-[0.18em] uppercase mb-3"
            style={{ color: 'rgba(201,122,62,0.60)' }}
          >{event.subtitle}</p>

          <p
            className="font-sans text-xs leading-relaxed mb-4"
            style={{ color: 'rgba(232,211,165,0.40)' }}
          >{event.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="font-label text-[8px] tracking-[0.15em] uppercase" style={{ color: 'rgba(232,211,165,0.30)' }}>
                {weekday} · {event.time}
              </span>
              <span
                className="font-label text-[8px] tracking-[0.15em] uppercase"
                style={{ color: event.price === 'Free' ? '#8BAF6A' : 'rgba(232,211,165,0.45)' }}
              >{event.price}</span>
            </div>
            <span
              className="font-label text-[8px] tracking-[0.22em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(212,168,75,0.40)' }}
            >Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
