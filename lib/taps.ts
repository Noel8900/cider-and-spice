// ─── Tap List Data & Helpers ────────────────────────────────────────────────
// Static data — update LAST_UPDATED and tap entries when rotation changes.

export const LAST_UPDATED = '2027-07-01';

export type CiderStyle =
  | 'bone-dry'
  | 'off-dry'
  | 'hopped'
  | 'barrel-aged'
  | 'heritage'
  | 'fruit'
  | 'seasonal';

export const STYLE_LABELS: Record<CiderStyle, string> = {
  'bone-dry':   'Bone Dry',
  'off-dry':    'Off Dry',
  'hopped':     'Hopped',
  'barrel-aged':'Barrel Aged',
  'heritage':   'Heritage',
  'fruit':      'Fruit',
  'seasonal':   'Seasonal',
};

export const STYLE_COLOR: Record<CiderStyle, string> = {
  'bone-dry':   '#E8D3A5',
  'off-dry':    '#D4A84B',
  'hopped':     '#8BAF6A',
  'barrel-aged':'#C45D2A',
  'heritage':   '#C97A3E',
  'fruit':      '#4F98A3',
  'seasonal':   '#A07DB8',
};

export interface Tap {
  tap:          number;
  cidery:       string;
  region:       string;
  name:         string;
  style:        CiderStyle;
  abv:          number;      // e.g. 6.2
  notes:        string;
  featured:     boolean;
  available:    boolean;
}

export const TAPS: Tap[] = [
  { tap: 1,  cidery: 'Bosque Brew Works',      region: 'Albuquerque, NM',    name: 'Rio Grande Dry',           style: 'bone-dry',   abv: 6.8, notes: 'Crisp Rio Grande apple base. Zero residual sugar. Clean finish with a mineral edge.',                              featured: true,  available: true  },
  { tap: 2,  cidery: 'Bosque Brew Works',      region: 'Albuquerque, NM',    name: 'Green Chile Cider',        style: 'seasonal',   abv: 5.9, notes: 'Off-dry base with roasted Hatch green chile on the back palate. Crowd favourite.',                               featured: true,  available: true  },
  { tap: 3,  cidery: 'Corrales Cidehouse',     region: 'Corrales, NM',       name: 'Heritage Blend No. 7',     style: 'heritage',   abv: 7.2, notes: 'Old-growth Rio Grande valley apple blend. Tannin-forward, long finish, faint barnyard complexity.',              featured: true,  available: true  },
  { tap: 4,  cidery: 'Corrales Cidehouse',     region: 'Corrales, NM',       name: 'Wildflower Off-Dry',       style: 'off-dry',    abv: 6.1, notes: 'Lightly sweet with NM wildflower honey nose. Approachable entry point. Pairs with charcuterie.',                featured: false, available: true  },
  { tap: 5,  cidery: 'High Desert Cider Co.',  region: 'Santa Fe, NM',       name: 'Sangre Dry-Hop',           style: 'hopped',     abv: 6.5, notes: 'Bone-dry cider dry-hopped with Citra and Mosaic. IPA drinkers’ gateway cider.',                                  featured: true,  available: true  },
  { tap: 6,  cidery: 'High Desert Cider Co.',  region: 'Santa Fe, NM',       name: 'Piñon Smoked',             style: 'heritage',   abv: 7.0, notes: 'Subtle piñon smoke on the nose from cold-smoked apple must. Unique to NM terroir.',                             featured: false, available: true  },
  { tap: 7,  cidery: 'Manzanita Cider Works',  region: 'Taos, NM',           name: 'Mountain Bone-Dry',        style: 'bone-dry',   abv: 7.5, notes: 'High-altitude Taos apples. Extremely dry, high acid, built for food pairing.',                                  featured: false, available: true  },
  { tap: 8,  cidery: 'Manzanita Cider Works',  region: 'Taos, NM',           name: 'Lavender Honey',           style: 'fruit',      abv: 5.8, notes: 'NM lavender and local clover honey. Floral, lightly sweet. Best served cold.',                                   featured: false, available: true  },
  { tap: 9,  cidery: 'Manzanita Cider Works',  region: 'Taos, NM',           name: 'Red Wine Barrel Reserve',  style: 'barrel-aged',abv: 8.1, notes: 'Aged 6 months in NM Cabernet barrels. Rich, tannic, complex. Limited pours nightly.',                            featured: true,  available: true  },
  { tap: 10, cidery: 'Pecos Valley Cider',     region: 'Roswell, NM',        name: 'Pecos Dry',                style: 'bone-dry',   abv: 6.3, notes: 'Eastern NM apples. Straightforward, clean, and crushable. Great everyday pour.',                               featured: false, available: true  },
  { tap: 11, cidery: 'Pecos Valley Cider',     region: 'Roswell, NM',        name: 'Alien Fruit Blend',        style: 'fruit',      abv: 5.5, notes: 'Apricot, prickly pear, and golden delicious. Semi-sweet, desert-fruit forward.',                                featured: false, available: true  },
  { tap: 12, cidery: 'Pecos Valley Cider',     region: 'Roswell, NM',        name: 'Harvest Spice',            style: 'seasonal',   abv: 6.0, notes: 'Fall seasonal with cinnamon, clove, and nutmeg. Available Aug–Nov rotation only.',                             featured: false, available: true  },
  { tap: 13, cidery: 'Organ Mountains Cider',  region: 'Las Cruces, NM',     name: 'Mesilla Valley Select',   style: 'heritage',   abv: 7.1, notes: 'Local Las Cruces cidery. Heritage apple blend from the Mesilla Valley floor. Tart, dry, minerally.',            featured: true,  available: true  },
  { tap: 14, cidery: 'Organ Mountains Cider',  region: 'Las Cruces, NM',     name: 'Hatch Red Chile',          style: 'seasonal',   abv: 6.2, notes: 'The heat-forward version — roasted red Hatch chile. Capsaicin warmth on the finish. Local icon.',                featured: true,  available: true  },
  { tap: 15, cidery: 'Organ Mountains Cider',  region: 'Las Cruces, NM',     name: 'Pecan Wood Smoked',        style: 'barrel-aged',abv: 7.8, notes: 'Cold-smoked over Southern NM pecan wood. Deep, savoury, pairs with BBQ or aged cheese.',                        featured: false, available: true  },
  { tap: 16, cidery: 'Rio Bravo Cider House',  region: 'Albuquerque, NM',    name: 'Old Vine Blend',           style: 'heritage',   abv: 7.4, notes: 'Old-vine apple cider from 40+ year-old trees near Belen. Earthy, structured, tannin-rich.',                     featured: false, available: true  },
  { tap: 17, cidery: 'Rio Bravo Cider House',  region: 'Albuquerque, NM',    name: 'Hopped Saison',            style: 'hopped',     abv: 6.7, notes: 'Saison yeast fermentation with Hallertau hops. Belgian-inspired. Spicy, dry, aromatic.',                        featured: false, available: true  },
  { tap: 18, cidery: 'Rio Bravo Cider House',  region: 'Albuquerque, NM',    name: 'Bourbon Barrel Sour',      style: 'barrel-aged',abv: 8.4, notes: 'Wild-fermented cider aged in NM bourbon barrels. Sour, funky, exceptional complexity. Allocated pour.',         featured: true,  available: true  },
  { tap: 19, cidery: 'Enchanted Orchard',      region: 'Alcalde, NM',        name: 'Northern Apple Blend',     style: 'off-dry',    abv: 6.0, notes: 'Northern NM high-desert apples. Gentle sweetness, pear notes, soft acidity.',                                   featured: false, available: true  },
  { tap: 20, cidery: 'Enchanted Orchard',      region: 'Alcalde, NM',        name: 'Prickly Pear Rosé',        style: 'fruit',      abv: 5.7, notes: 'Southwest icon — prickly pear cactus fruit with Gala apple base. Vivid pink, semi-sweet.',                      featured: false, available: true  },
  { tap: 21, cidery: 'Enchanted Orchard',      region: 'Alcalde, NM',        name: 'Hopped Session',           style: 'hopped',     abv: 4.8, notes: 'Low ABV hopped cider. Mosaic and Amarillo. Easy-drinking, aromatic, sessionable.',                               featured: false, available: true  },
  { tap: 22, cidery: 'Sandia Crest Cider',     region: 'Tijeras, NM',        name: 'High-Altitude Heritage',   style: 'heritage',   abv: 7.6, notes: 'Sandia Mountains elevation apples. Dense, structured, earthy. The connoisseur pour.',                            featured: false, available: true  },
];

export function getAllTaps(): Tap[] {
  return TAPS.filter(t => t.available);
}

export function getTapsByStyle(style: CiderStyle): Tap[] {
  return TAPS.filter(t => t.available && t.style === style);
}

export function getFeaturedTaps(): Tap[] {
  return TAPS.filter(t => t.available && t.featured);
}

export function getCideries(): string[] {
  return [...new Set(TAPS.map(t => t.cidery))];
}
