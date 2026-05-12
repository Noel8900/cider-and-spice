'use server'

/**
 * app/vendors/actions.ts
 *
 * Server Actions for the vendor application form.
 * Lives server-side so NCB_API_KEY is never exposed to the browser.
 * Imported directly into the 'use client' page — Next.js serialises
 * the call across the server/client boundary automatically.
 */

import { submitVendorApplication } from '@/lib/api'

// ─── Shared form-data type ────────────────────────────────────────────────────
// Exported so the client page can use it for useState typing.

export interface VendorFormData {
  name: string
  business_name: string
  email: string
  phone: string
  cuisine_type: string
  booth_preference: string
  description: string
}

// ─── Action result type ───────────────────────────────────────────────────────

export type VendorActionResult =
  | { ok: true }
  | { ok: false; message: string }

// ─── Server action ────────────────────────────────────────────────────────────

export async function applyAsVendor(
  data: VendorFormData,
): Promise<VendorActionResult> {
  // Basic server-side guard — client validation already ran, but
  // server actions can be called directly so we re-check critical fields.
  if (!data.name.trim() || !data.email.trim() || !data.cuisine_type) {
    return { ok: false, message: 'Name, email, and cuisine type are required.' }
  }

  // Simple e-mail format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  const result = await submitVendorApplication({
    name:             data.name.trim(),
    business_name:    data.business_name.trim(),
    email:            data.email.trim().toLowerCase(),
    phone:            data.phone.trim() || undefined,
    cuisine_type:     data.cuisine_type,
    booth_preference: data.booth_preference || undefined,
    description:      data.description.trim() || undefined,
  })

  if (!result.ok) {
    // Strip any internal error details before sending to the client
    const safe =
      result.status === 0
        ? 'Could not reach the server. Please check your connection and try again.'
        : result.status >= 500
          ? 'A server error occurred. Please try again in a moment.'
          : result.message   // 4xx — safe to surface (e.g. duplicate e-mail)
    return { ok: false, message: safe }
  }

  return { ok: true }
}
