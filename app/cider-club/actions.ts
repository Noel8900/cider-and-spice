'use server';

import { createRecord } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

/** UI-facing tier values (includes 'founding' which maps to 'connoisseur' in NCB). */
export type CiderClubTier = 'taster' | 'enthusiast' | 'founding';

export interface CiderClubFormData {
  name: string;
  email: string;
  phone?: string;
  tier: CiderClubTier;
}

export type CiderClubActionResult =
  | { ok: true }
  | { ok: false; message: string };

// Map UI tier values to NCB schema values
const TIER_MAP: Record<CiderClubTier, 'taster' | 'enthusiast' | 'connoisseur'> = {
  taster:     'taster',
  enthusiast: 'enthusiast',
  founding:   'connoisseur', // 'founding' is a UI alias for the connoisseur tier
};

// ─── Server action ────────────────────────────────────────────────────────────

export async function joinCiderClub(
  data: CiderClubFormData,
): Promise<CiderClubActionResult> {
  // ── Validation ──────────────────────────────────────────────────────────────
  const name  = data.name.trim();
  const email = data.email.trim().toLowerCase();

  if (!name)  return { ok: false, message: 'Name is required.' };
  if (!email) return { ok: false, message: 'Email address is required.' };
  if (!data.tier) return { ok: false, message: 'Please select a membership tier.' };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return { ok: false, message: 'Please enter a valid email address.' };

  const ncbTier = TIER_MAP[data.tier];
  if (!ncbTier) return { ok: false, message: 'Invalid membership tier selected.' };

  // ── Persist ─────────────────────────────────────────────────────────────────
  const result = await createRecord('/api/tables/cider-club', {
    name,
    email,
    phone:        data.phone?.trim() || '',
    tier:         ncbTier,
    submitted_at: new Date().toISOString(),
  });

  if (!result.ok) {
    const safe =
      result.status >= 500
        ? 'A server error occurred. Please try again or email us directly.'
        : result.message;
    return { ok: false, message: safe };
  }

  return { ok: true };
}
