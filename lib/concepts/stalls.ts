// ─── Stall Concept Card Data ─────────────────────────────────────────────────
// Phase 2 audit — public-ready copy, tone-consistent, investor language removed
// All 11 vendor stalls + 3 anchor spaces

export interface StallConcept {
  id: string;
  label: string;
  sqft: number;
  rent: string;
  status: 'available' | 'reserved' | 'anchor';
  zone: 'vendor' | 'cider' | 'kitchen' | 'seating' | 'support';
  description: string;
  conceptType: string;
  story: string;
}

export const STALL_CONCEPTS: StallConcept[] = [
  {
    id: 'S01',
    label: 'Stall 01',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · North row · ideal for counter-service concepts.',
    conceptType: 'Open — Any Cuisine',
    story:
      'A prime north-row position with natural flow from the main atrium. Well-suited for a counter-service concept — tacos, Vietnamese bowls, wraps, or anything built for a fast lunch crowd. 8×12 ft with shared commissary access included.',
  },
  {
    id: 'S02',
    label: 'Stall 02',
    sqft: 96,
    rent: '~$800/mo',
    status: 'reserved',
    zone: 'vendor',
    description: '8×12 ft · North row · reserved — under letter of intent.',
    conceptType: 'Reserved',
    story:
      'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id: 'S03',
    label: 'Stall 03',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · North row · high-visibility corner approach.',
    conceptType: 'Open — Any Cuisine',
    story:
      'High-visibility corner position with sightlines from both the entry corridor and the central atrium. A strong fit for a concept with bold visual branding — desserts, specialty drinks, or a showstopper open-flame station.',
  },
  {
    id: 'S04',
    label: 'Stall 04',
    sqft: 120,
    rent: '~$1,100/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×15 ft · Centre-north · expanded prep line available.',
    conceptType: 'Open — Expanded Format',
    story:
      'The largest north-row stall at 8×15 ft. The extra depth supports a longer prep line or a double-station setup — well suited for a Mediterranean spread, a Southern BBQ concept, or a ramen bar with visible broth work.',
  },
  {
    id: 'S05',
    label: 'Stall 05',
    sqft: 96,
    rent: '~$800/mo',
    status: 'reserved',
    zone: 'vendor',
    description: '8×12 ft · North row · reserved — under letter of intent.',
    conceptType: 'Reserved',
    story:
      'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id: 'S06',
    label: 'Stall 06',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · North row · adjacent to Cider Bar pass-through.',
    conceptType: 'Open — Cider Pairing Preferred',
    story:
      'Positioned directly adjacent to the Cider Bar pass-through corridor — one of the highest foot-traffic lanes in the building. A food pairing-friendly concept — charcuterie, elevated snacks, or small plates — would have a built-in evening audience here.',
  },
  {
    id: 'S07',
    label: 'Stall 07',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · South row · near main entry — maximum foot traffic.',
    conceptType: 'Open — High Velocity',
    story:
      'First stall visible from the main entry — the highest foot-traffic position in the south row. Best suited for a concept with instant recognizability and quick service. Mexican street food, elotes, or a loaded fries concept would thrive here.',
  },
  {
    id: 'S08',
    label: 'Stall 08',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · South row · open.',
    conceptType: 'Open — Any Cuisine',
    story:
      'Open south-row stall with direct atrium visibility. A New Mexican, Asian fusion, or plant-forward concept would complement the existing mix and draw consistent weekday lunch traffic from the downtown corridor.',
  },
  {
    id: 'S09',
    label: 'Stall 09',
    sqft: 120,
    rent: '~$1,100/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×15 ft · Centre-south · expanded space with extra storage.',
    conceptType: 'Open — Expanded Format',
    story:
      'The largest south-row stall at 8×15 ft with extra cold storage access. A strong fit for concepts with higher ingredient volume — sushi, full BBQ, or a multicultural tasting-menu format. The extra depth also supports a small chef’s counter for added visibility.',
  },
  {
    id: 'S10',
    label: 'Stall 10',
    sqft: 96,
    rent: '~$800/mo',
    status: 'reserved',
    zone: 'vendor',
    description: '8×12 ft · South row · reserved — under letter of intent.',
    conceptType: 'Reserved',
    story:
      'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id: 'S11',
    label: 'Stall 11',
    sqft: 96,
    rent: '~$800/mo',
    status: 'available',
    zone: 'vendor',
    description: '8×12 ft · South row · open.',
    conceptType: 'Open — Any Cuisine',
    story:
      'Open south-row position near the event stage — stalls near live programming benefit from longer evening dwell time and impulse orders. Any cuisine welcome; a dessert or late-night concept would have a natural edge here.',
  },
  {
    id: 'CB',
    label: 'Cider Bar',
    sqft: 480,
    rent: 'Anchor',
    status: 'anchor',
    zone: 'cider',
    description: 'Cider & Spice Bar · 20–25 rotating taps · 480 sq ft · bar-top seating for 14.',
    conceptType: 'Hub Anchor — Craft Cider',
    story:
      'The 480 sq ft Cider & Spice Bar is the anchor experience of the Hub — Southern New Mexico’s only dedicated craft cider bar. 20–25 rotating taps featuring 8–10 NM cideries. Bar-top seating for 14. Cider Club membership tiers from $25/mo. Food pairing menus rotate monthly with vendor concepts.',
  },
  {
    id: 'CK',
    label: 'Kitchen',
    sqft: 320,
    rent: 'Shared',
    status: 'anchor',
    zone: 'kitchen',
    description: 'Shared commissary kitchen · 320 sq ft · licensed · available for vendor prep and private bookings.',
    conceptType: 'Hub Anchor — Commissary',
    story:
      'The 320 sq ft shared commissary kitchen is licensed and available to all vendors for prep work outside peak service hours. Also bookable by external food entrepreneurs, catering operators, and NMSU/DACC culinary students at $25–35/hr. A core part of the Hub’s culinary incubator mission.',
  },
];
