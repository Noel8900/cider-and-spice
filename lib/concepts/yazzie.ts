// ─── Yazzie — Concept Card Data ──────────────────────────────────────────────
// Japanese cutlet & curry · Fast casual assembly model
// Phase 1 copy — locked May 2026

export const YAZZIE_CONCEPT = {
  name: 'Yazzie',
  tagline: 'Crispy. Sauced. New Mexican.',
  conceptLabel: 'JAPANESE CUTLET & CURRY · FAST CASUAL ASSEMBLY MODEL',

  proteins: [
    'Chicken Katsu',
    'Pork Katsu',
    'Tofu Katsu',
    'Chicken Curry',
    'Vegetable Curry',
  ],

  sauces: [
    'Hatch Gold Curry',
    'Green Chile Curry',
    'Red Chile Curry',
    'Katsu Sauce',
  ],

  sides: [
    'Steamed rice',
    'Pickled daikon',
    'Cucumber salad',
  ],

  buildModel:
    'Fast casual assembly line — protein → sauce → side. Designed for speed, consistency, and volume.',

  status: 'concept' as const,
} as const;

export type YazzieConcept = typeof YAZZIE_CONCEPT;
