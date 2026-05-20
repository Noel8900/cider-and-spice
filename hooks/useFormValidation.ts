'use client';

import { useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FieldRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  custom?: (value: string) => string | null;
};

export type FieldRules<T extends Record<string, string>> = Partial<Record<keyof T, FieldRule>>;
export type FieldErrors<T extends Record<string, string>> = Partial<Record<keyof T, string>>;
export type TouchedFields<T extends Record<string, string>> = Partial<Record<keyof T, boolean>>;

// ─── Validator ────────────────────────────────────────────────────────────────

function validateField(value: string, rule?: FieldRule): string | null {
  if (!rule) return null;
  const v = value.trim();
  if (rule.required && !v) return 'This field is required.';
  if (rule.minLength && v.length < rule.minLength)
    return `Minimum ${rule.minLength} characters required.`;
  if (rule.maxLength && v.length > rule.maxLength)
    return `Maximum ${rule.maxLength} characters allowed.`;
  if (rule.pattern && !rule.pattern.test(v))
    return rule.patternMessage ?? 'Invalid format.';
  if (rule.custom) return rule.custom(v);
  return null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Provides real-time inline field validation with touched-state tracking.
// Fields only show errors after the user has interacted with them (blur)
// or after a submit attempt.

export function useFormValidation<T extends Record<string, string>>(
  values: T,
  rules: FieldRules<T>
) {
  const [touched, setTouched]   = useState<TouchedFields<T>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Compute errors for all fields
  const errors: FieldErrors<T> = {} as FieldErrors<T>;
  for (const key in rules) {
    const err = validateField(values[key] ?? '', rules[key]);
    if (err) errors[key as keyof T] = err;
  }

  const isValid = Object.keys(errors).length === 0;

  // Mark a field as touched on blur
  const onBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  // Returns the visible error for a field — only shown after touch or submit
  const getFieldError = useCallback(
    (field: keyof T): string | undefined => {
      if (!touched[field] && !submitAttempted) return undefined;
      return errors[field as keyof T];
    },
    [touched, submitAttempted, errors]
  );

  // Call before submit — marks all fields touched so all errors surface
  const validateAll = useCallback((): boolean => {
    setSubmitAttempted(true);
    const allTouched: TouchedFields<T> = {};
    for (const key in rules) allTouched[key as keyof T] = true;
    setTouched(allTouched);
    return isValid;
  }, [rules, isValid]);

  const resetValidation = useCallback(() => {
    setTouched({});
    setSubmitAttempted(false);
  }, []);

  return {
    errors,
    isValid,
    touched,
    getFieldError,
    onBlur,
    validateAll,
    resetValidation,
  };
}

// ─── Pre-built rule sets (reuse across vendor + investor forms) ───────────────

export const RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 80,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Please enter a valid email address.',
  },
  phone: {
    pattern: /^[\d\s()\-+.]{7,20}$/,
    patternMessage: 'Please enter a valid phone number.',
  },
  description: {
    required: true,
    minLength: 20,
    maxLength: 500,
  },
  message: {
    maxLength: 1000,
  },
  businessName: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
} as const;
