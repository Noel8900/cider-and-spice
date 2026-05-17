'use client';

import { useEffect, useState, useTransition } from 'react';
import { fetchVendors, updateVendorStatus, type Vendor, type VendorStatus } from './actions';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import SkeletonTable from '@/components/ui/SkeletonTable';
import SkeletonStats from '@/components/ui/SkeletonStats';

const statusOptions: VendorStatus[] = ['pending', 'approved', 'rejected'];

const statusVariant = (s?: string): 'ember' | 'grove' | 'muted' =>
  s === 'approved' ? 'grove' : s === 'rejected' ? 'muted' : 'ember';

const statusGlyph = (s?: string) =>
  s === 'approved' ? '◆' : s === 'rejected' ? '◇' : '◈';

export default function AdminPage() {
  const [vendors, setVendors]       = useState<Vendor[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchVendors().then((result) => {
      setLoading(false);
      if (!result.ok) { setError(result.message); return; }
      setVendors(result.data);
    });
  }, []);

  const handleStatusChange = (id: string, status: VendorStatus) => {
    setVendors((prev) => prev.map((v) => v.id === id ? { ...v, status } : v));
    startTransition(async () => {
      const result = await updateVendorStatus(id, status);
      if (!result.ok) {
        setError('Failed to update status. Please try again.');
        fetchVendors().then((r) => { if (r.ok) setVendors(r.data); });
      }
    });
  };

  return (
    <main className="min-h-screen bg-bg py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Admin"
          title="Vendor Dashboard"
          subtitle="Review and manage incoming vendor applications."
          align="left"
        />

        {/* Error banner */}
        {error && (
          <div role="alert"
            className="mb-6 border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-6">
            <SkeletonStats count={3} />
            <SkeletonTable rows={5} cols={6} />
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-px bg-cream/[0.06] mb-8 max-w-lg">
              {(['pending', 'approved', 'rejected'] as VendorStatus[]).map((s) => (
                <div key={s} className="bg-bg p-6 text-center">
                  <div className="font-corp-display text-4xl font-light text-gold mb-1">
                    {vendors.filter((v) => (v.status ?? 'pending') === s).length}
                  </div>
                  <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
                    {s}
                  </div>
                </div>
              ))}
            </div>

            {/* Vendor table */}
            <div className="border border-cream/[0.08] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-cream min-w-[700px]">
                  <thead className="border-b border-cream/[0.08]">
                    <tr>
                      {['Name', 'Business', 'Cuisine', 'Booth', 'Status', 'Action'].map((h) => (
                        <th key={h}
                          className="px-6 py-4 text-left font-label text-[9px]
                                     tracking-[0.25em] uppercase text-cream/40">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream/[0.05]">
                    {vendors.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center font-sans text-sm text-cream/30">
                          No applications yet.
                        </td>
                      </tr>
                    )}
                    {vendors.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.03] transition-colors duration-200">
                        <td className="px-6 py-4 font-corp-display text-base font-light text-cream">
                          {v.name}
                        </td>
                        <td className="px-6 py-4 font-sans text-cream/70">
                          {v.business_name}
                        </td>
                        <td className="px-6 py-4 font-sans text-cream/55">
                          {v.cuisine_type}
                        </td>
                        <td className="px-6 py-4 font-sans text-cream/55">
                          {v.booth_preference}
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 font-label text-[9px] tracking-[0.15em] uppercase">
                            <span className="font-corp-display text-sm text-gold/50" aria-hidden="true">
                              {statusGlyph(v.status)}
                            </span>
                            <Badge variant={statusVariant(v.status)}>
                              {v.status ?? 'pending'}
                            </Badge>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative inline-block">
                            <select
                              value={v.status ?? 'pending'}
                              onChange={(e) => handleStatusChange(v.id, e.target.value as VendorStatus)}
                              disabled={isPending}
                              className="appearance-none bg-bg border border-cream/20
                                         hover:border-gold/40 focus:border-gold/40 focus:outline-none
                                         focus:ring-1 focus:ring-gold/15 px-4 py-2 pr-8
                                         font-label text-[9px] tracking-[0.15em] uppercase
                                         text-cream/60 cursor-pointer transition-colors
                                         disabled:opacity-50"
                            >
                              {statusOptions.map((s) => (
                                <option key={s} value={s} className="bg-bg">
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gold/40"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table footer */}
            <p className="mt-4 font-sans text-xs text-cream/25">
              {vendors.length} application{vendors.length !== 1 ? 's' : ''} total
              {isPending && ' · Saving…'}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
