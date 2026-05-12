'use client';

import { useEffect, useState, useTransition } from 'react';
import { fetchVendors, updateVendorStatus, type Vendor, type VendorStatus } from './actions';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import SkeletonTable from '@/components/ui/SkeletonTable';
import SkeletonStats from '@/components/ui/SkeletonStats';

const statusOptions: VendorStatus[] = ['pending', 'approved', 'rejected'];

const statusVariant = (s?: string): 'ember' | 'grove' | 'muted' =>
  s === 'approved' ? 'grove' : s === 'rejected' ? 'muted' : 'ember';

export default function AdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchVendors().then((result) => {
      setLoading(false);
      if (!result.ok) { setError(result.message); return; }
      setVendors(result.data);
    });
  }, []);

  const handleStatusChange = (id: string, status: VendorStatus) => {
    // Optimistic update — UI reflects change instantly
    setVendors((prev) => prev.map((v) => v.id === id ? { ...v, status } : v));
    startTransition(async () => {
      const result = await updateVendorStatus(id, status);
      if (!result.ok) {
        // Revert on failure
        setError('Failed to update status. Please try again.');
        fetchVendors().then((r) => { if (r.ok) setVendors(r.data); });
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#1C1209] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Admin"
          title="Vendor Dashboard"
          subtitle="Review and manage incoming vendor applications."
          align="left"
        />

        {/* Error banner */}
        {error && (
          <div role="alert" className="mb-6 px-4 py-3 rounded-xl bg-red-500/10
                                       border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading state — reusable skeleton components */}
        {loading && (
          <div className="space-y-6">
            <SkeletonStats count={3} />
            <SkeletonTable rows={5} cols={6} />
          </div>
        )}

        {/* Loaded state */}
        {!loading && !error && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
              {(['pending', 'approved', 'rejected'] as VendorStatus[]).map((s) => (
                <GlassCard key={s} className="p-4 text-center" hover={false}>
                  <div className="font-serif text-2xl font-bold text-[#C4622D]">
                    {vendors.filter((v) => (v.status ?? 'pending') === s).length}
                  </div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#F5ECD7] mt-1"
                       style={{ opacity: 0.50 }}>
                    {s}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Vendor table */}
            <GlassCard hover={false} className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-[#F5ECD7] min-w-[700px]">
                  <thead className="border-b border-[#F5ECD7]/10">
                    <tr>
                      {['Name', 'Business', 'Cuisine', 'Booth', 'Status', 'Action'].map((h) => (
                        <th key={h} className="px-6 py-4 text-left font-sans font-medium
                                               text-xs tracking-widest uppercase"
                            style={{ opacity: 0.50 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5ECD7]/5">
                    {vendors.map((v) => (
                      <tr key={v.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-serif font-medium" style={{ opacity: 1 }}>
                          {v.name}
                        </td>
                        <td className="px-6 py-4 font-sans" style={{ opacity: 0.70 }}>
                          {v.business_name}
                        </td>
                        <td className="px-6 py-4 font-sans" style={{ opacity: 0.60 }}>
                          {v.cuisine_type}
                        </td>
                        <td className="px-6 py-4 font-sans" style={{ opacity: 0.60 }}>
                          {v.booth_preference}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={statusVariant(v.status)}>
                            {v.status ?? 'pending'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={v.status ?? 'pending'}
                            onChange={(e) => handleStatusChange(v.id, e.target.value as VendorStatus)}
                            disabled={isPending}
                            className="bg-transparent border border-[#F5ECD7]/20 rounded-lg
                                       px-3 py-1.5 text-[#F5ECD7] text-xs font-sans
                                       focus:outline-none focus:border-[#C4622D]/60
                                       disabled:opacity-50 transition-colors"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s} className="bg-[#1C1209]">
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </main>
  );
}
