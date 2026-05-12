'use server';

import { createRecord } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InvestorInquiryData {
  name: string;
  email: string;
  investment_range: string;
  message: string;
  organization?: string;
}

export type InvestorActionResult =
  | { ok: true }
  | { ok: false; message: string };

// ─── Server action ────────────────────────────────────────────────────────────

export async function submitInvestorInquiry(
  data: InvestorInquiryData,
): Promise<InvestorActionResult> {
  // ── Validation ──────────────────────────────────────────────────────────────
  const name    = data.name.trim();
  const email   = data.email.trim().toLowerCase();
  const message = data.message.trim();

  if (!name)    return { ok: false, message: 'Name is required.' };
  if (!email)   return { ok: false, message: 'Email address is required.' };
  if (!message) return { ok: false, message: 'Message is required.' };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return { ok: false, message: 'Please enter a valid email address.' };

  // ── Persist ─────────────────────────────────────────────────────────────────
  const result = await createRecord('/api/tables/investor-inquiries', {
    name,
    email,
    investment_range: data.investment_range || 'Not specified',
    organization:     data.organization?.trim() || '',
    message,
    interest:         'investor',
    submitted_at:     new Date().toISOString(),
  });

  if (!result.ok) {
    // Sanitise 5xx messages before returning to client
    const safe =
      result.status >= 500
        ? 'A server error occurred. Please try again or email us directly.'
        : result.message;
    return { ok: false, message: safe };
  }

  return { ok: true };
}
