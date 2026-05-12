'use server';

// Server-side only — NCB_API_KEY never reaches browser bundle
import { getVendors, updateRecord } from '@/lib/api';

// `table` is not exported from lib/api, so we define it locally.
// Identical implementation: `/api/tables/{name}`
const table = (name: string) => `/api/tables/${name}`;

// ─── Types ────────────────────────────────────────────────────────────────────

export type VendorStatus = 'pending' | 'approved' | 'rejected';

// Full shape of a vendor record returned by NCB, including admin-managed fields.
// Defined here (not re-exported from lib/api) so admin and form layers stay decoupled.
export interface Vendor {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone?: string;
  cuisine_type: string;
  booth_preference?: string;
  description?: string;
  status?: VendorStatus;
}

// ─── Server actions ───────────────────────────────────────────────────────────

export async function fetchVendors(): Promise<
  { ok: true; data: Vendor[] } | { ok: false; message: string }
> {
  const result = await getVendors();
  if (!result.ok) return { ok: false, message: 'Failed to load vendor applications.' };
  return { ok: true, data: result.data as Vendor[] };
}

export async function updateVendorStatus(
  id: string,
  status: VendorStatus,
): Promise<{ ok: boolean; message?: string }> {
  const result = await updateRecord(table('vendors'), id, { status });
  if (!result.ok) return { ok: false, message: 'Failed to update status.' };
  return { ok: true };
}
