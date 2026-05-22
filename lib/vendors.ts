export type VendorStatus = 'confirmed' | 'reserved' | 'open';

export interface SocialLinks {
  instagram?: string;
  facebook?:  string;
  tiktok?:    string;
  website?:   string;
}

export interface VendorProfile {
  id:          string;
  slug:        string;
  name:        string;
  tagline:     string;
  stallId:     string;
  stallLabel:  string;
  sqft:        number;
  rent:        string;
  zone:        string;
  status:      VendorStatus;
  cuisineType: string;
  cuisineTags: string[];
  story:       string;
  hours:       string;
  social:      SocialLinks;
  featured:    boolean;
}

export const VENDOR_PROFILES: VendorProfile[] = [
  {
    id:          'cider-spice-bar',
    slug:        'cider-spice-bar',
    name:        'Cider & Spice Bar',
    tagline:     "Southern New Mexico\'s only dedicated craft cider bar — 20–25 rotating taps, all NM-sourced.",
    stallId:     'CB',
    stallLabel:  'Cider Bar',
    sqft:        480,
    rent:        'Anchor',
    zone:        'cider',
    status:      'confirmed',
    cuisineType: 'Craft Cider Bar',
    cuisineTags: ['Craft Cider', 'New Mexico', 'Rotating Taps', 'Bar-Top Seating', 'Cider Club'],
    story:       "The Cider & Spice Bar is the anchor experience of the LC Culinary Hub — 480 sq ft of dedicated cider bar space with bar-top seating for 14 and 20–25 rotating taps featuring exclusively New Mexico cideries. The program rotates seasonally, spotlighting 8–10 NM producers at any given time across bone-dry, off-dry, hopped, barrel-aged, and heritage styles. A food pairing menu rotates monthly in collaboration with the Hub\'s vendor cohort. Cider Club memberships start at $25/mo with three tiers offering progressive pour credits, exclusive producer events, and reserved bar-top seating.",
    hours:       'Tue–Thu 11 AM–9 PM · Fri–Sat 11 AM–11 PM · Sun 11 AM–8 PM',
    social:      { instagram: 'https://instagram.com/lccullinaryhub' },
    featured:    true,
  },
  {
    id:          'hub-commissary-kitchen',
    slug:        'hub-commissary-kitchen',
    name:        'Hub Commissary Kitchen',
    tagline:     'Licensed shared kitchen for vendor prep, catering operators, and culinary entrepreneurs.',
    stallId:     'CK',
    stallLabel:  'Kitchen',
    sqft:        320,
    rent:        'Shared',
    zone:        'kitchen',
    status:      'confirmed',
    cuisineType: 'Shared Commissary',
    cuisineTags: ['Commissary', 'Shared Kitchen', 'Licensed', 'Incubator', 'Catering'],
    story:       "The 320 sq ft Hub Commissary Kitchen is licensed under New Mexico Department of Health standards and available to all Hub vendors for prep work outside peak service hours. External bookings are also open to catering operators, food entrepreneurs, and NMSU/DACC culinary students at $25–$35/hr. The kitchen is equipped with commercial ranges, convection ovens, a 6-ft prep table, reach-in cold storage, and a dry goods area. It is a core piece of the Hub\'s incubator mission — reducing the barrier to entry for food businesses that do not yet have or need a dedicated kitchen space.",
    hours:       'Available by booking · Off-peak prep hours: 7 AM–11 AM & 3 PM–5 PM',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-01-open',
    slug:        'stall-01',
    name:        'Stall 01 — Open',
    tagline:     'North row · 8×12 ft · ideal for counter-service concepts.',
    stallId:     'S01',
    stallLabel:  'Stall 01',
    sqft:        96,
    rent:        '~$800/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — Any Cuisine',
    cuisineTags: ['Counter Service', 'Fast Casual', 'Any Cuisine', 'North Row'],
    story:       'A prime north-row position with natural flow from the main atrium. Ideal for a fast-casual counter concept — tacos, Vietnamese bowls, wraps, or anything with a tight ticket time and wide appeal. 8×12 ft with shared commissary access included. This stall is open and accepting applications for the founding vendor cohort.',
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-03-open',
    slug:        'stall-03',
    name:        'Stall 03 — Open',
    tagline:     'High-visibility corner approach · North row · 8×12 ft.',
    stallId:     'S03',
    stallLabel:  'Stall 03',
    sqft:        96,
    rent:        '~$800/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — Any Cuisine',
    cuisineTags: ['High Visibility', 'Corner Position', 'Desserts', 'Specialty Drinks', 'North Row'],
    story:       'High-visibility corner approach with sightlines from both the entry corridor and the central atrium. Perfect for a concept with strong visual branding — desserts, specialty drinks, or a showstopper open-flame station. 8×12 ft. Shared commissary access included. Applications open.',
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-04-open',
    slug:        'stall-04',
    name:        'Stall 04 — Open',
    tagline:     'Expanded format · Centre-north · 8×15 ft · longer prep line.',
    stallId:     'S04',
    stallLabel:  'Stall 04',
    sqft:        120,
    rent:        '~$1,100/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — Expanded Format',
    cuisineTags: ['Expanded Format', 'Mediterranean', 'BBQ', 'Ramen', 'Centre-North'],
    story:       'The largest north-row stall at 8×15 ft. Extra depth supports a longer prep line or a double-station setup — great for a Mediterranean spread, a Southern BBQ concept with a smoker connection, or a ramen bar with visible broth work. Applications open for the founding cohort.',
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-06-open',
    slug:        'stall-06',
    name:        'Stall 06 — Open',
    tagline:     'Adjacent to Cider Bar pass-through · highest foot traffic lane.',
    stallId:     'S06',
    stallLabel:  'Stall 06',
    sqft:        96,
    rent:        '~$800/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — Cider Pairing Preferred',
    cuisineTags: ['Cider Pairing', 'Charcuterie', 'Small Plates', 'High Traffic', 'North Row'],
    story:       'Positioned directly adjacent to the Cider Bar pass-through corridor — the highest foot-traffic lane in the building. A food pairing-friendly concept (charcuterie, elevated snacks, small plates) would have a built-in audience here every evening. Cider pairing-oriented concepts preferred but not required. Applications open.',
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-07-open',
    slug:        'stall-07',
    name:        'Stall 07 — Open',
    tagline:     'First stall from main entry · maximum foot traffic · South row.',
    stallId:     'S07',
    stallLabel:  'Stall 07',
    sqft:        96,
    rent:        '~$800/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — High Velocity',
    cuisineTags: ['High Velocity', 'Street Food', 'Mexican', 'Elotes', 'South Row'],
    story:       'First stall visible from the main entry — the highest foot-traffic position in the south row. Suited for a concept with instant recognizability and quick service. Mexican street food, elotes, or a loaded fries concept would thrive here. Applications open for the founding cohort.',
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
  {
    id:          'stall-09-open',
    slug:        'stall-09',
    name:        'Stall 09 — Open',
    tagline:     'Expanded south-row stall · 8×15 ft · extra cold storage.',
    stallId:     'S09',
    stallLabel:  'Stall 09',
    sqft:        120,
    rent:        '~$1,100/mo',
    zone:        'vendor',
    status:      'open',
    cuisineType: 'Open — Expanded Format',
    cuisineTags: ['Expanded Format', 'Sushi', 'BBQ', 'Chef Counter', 'South Row'],
    story:       "The largest south-row stall at 8×15 ft with extra cold storage access. Ideal for a concept with higher ingredient volume — sushi, a full BBQ operation, or a multicultural tasting menu format. The extra depth also supports a small chef\'s counter for visibility. Applications open.",
    hours:       'TBD by incoming vendor',
    social:      {},
    featured:    false,
  },
];

export function getAllVendorProfiles(): VendorProfile[] {
  return VENDOR_PROFILES;
}

export function getVendorProfile(slug: string): VendorProfile | undefined {
  return VENDOR_PROFILES.find(v => v.slug === slug);
}

export function getConfirmedVendors(): VendorProfile[] {
  return VENDOR_PROFILES.filter(v => v.status === 'confirmed');
}
