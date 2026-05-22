// ─── Event Data & Helpers ────────────────────────────────────────────────────

export type EventCategory =
  | 'live-music'
  | 'cooking-class'
  | 'pitch-night'
  | 'cider-tasting'
  | 'market'
  | 'private';

export interface Event {
  slug:        string;
  title:       string;
  subtitle:    string;
  date:        string;        // ISO 8601 — YYYY-MM-DD
  time:        string;        // e.g. '7:00 PM'
  doors:       string;        // e.g. '6:30 PM'
  category:    EventCategory;
  tags:        string[];
  description: string;
  story:       string;
  ticketUrl:   string | null; // null = free / no ticket
  price:       string;        // e.g. 'Free' | '$12' | '$45'
  capacity:    number;
  image:       string | null; // /images/... path or null
  featured:    boolean;
}

export const EVENTS: Event[] = [
  {
    slug:        'live-music-fridays-july-11',
    title:       'Live Music Fridays',
    subtitle:    'Desert Soul & Roots Night',
    date:        '2027-07-11',
    time:        '7:00 PM',
    doors:       '6:30 PM',
    category:    'live-music',
    tags:        ['Live Music', 'Friday', 'All Ages'],
    description: 'Weekly live music on the Hub stage. This week: desert soul, roots, and original works from Las Cruces artists.',
    story:       'Every Friday the Hub stage comes alive with local and regional talent. This week features a rotating lineup of desert soul, roots music, and original compositions from artists rooted in the Mesilla Valley. Food and cider service runs through last call at 10:30 PM. No tickets required — walk in, find your seat, order something good.',
    ticketUrl:   null,
    price:       'Free',
    capacity:    120,
    image:       null,
    featured:    true,
  },
  {
    slug:        'chile-harvest-tasting-2027',
    title:       'Chile Harvest Tasting',
    subtitle:    'Hatch & Mesilla Valley Showcase',
    date:        '2027-08-23',
    time:        '6:00 PM',
    doors:       '5:30 PM',
    category:    'cider-tasting',
    tags:        ['Cider', 'Chile', 'Seasonal', 'Featured'],
    description: 'A special tasting event pairing NM craft ciders with dishes built around the Hatch chile harvest.',
    story:       'August means chile. The Hub brings together 6 New Mexico cideries for a curated pairing night built around the Hatch and Mesilla Valley chile harvest. Each pairing station features a distinct cider style — bone-dry, off-dry, hopped, barrel-aged — matched with a vendor dish designed around fresh, roasted, and dried New Mexican chile. Limited to 80 guests. Tickets include 5 pours and 5 tastings.',
    ticketUrl:   '/contact',
    price:       '$45',
    capacity:    80,
    image:       null,
    featured:    true,
  },
  {
    slug:        'food-entrepreneur-pitch-night-q3',
    title:       'Entrepreneur Pitch Night',
    subtitle:    'Q3 Incubator Cohort Showcase',
    date:        '2027-09-10',
    time:        '6:30 PM',
    doors:       '6:00 PM',
    category:    'pitch-night',
    tags:        ['Incubator', 'Business', 'Networking'],
    description: 'Q3 incubator cohort presents their food concepts to a panel of investors, chefs, and community leaders.',
    story:       'The Hub Incubator Q3 cohort takes the stage. Five emerging food entrepreneurs — each completing 90 days of mentorship, kitchen hours, and market testing — present their concepts to a live panel of local investors, established restaurateurs, and culinary leaders. The event is open to the public. Come to support, connect, and taste concept samples served during the reception hour.',
    ticketUrl:   null,
    price:       'Free',
    capacity:    100,
    image:       null,
    featured:    false,
  },
  {
    slug:        'knife-skills-cooking-class-aug',
    title:       'Knife Skills & Mise en Place',
    subtitle:    'Hands-On Class with Chef Instructors',
    date:        '2027-08-09',
    time:        '2:00 PM',
    doors:       '1:45 PM',
    category:    'cooking-class',
    tags:        ['Cooking Class', 'Hands-On', 'Beginner Friendly'],
    description: 'A 2-hour hands-on class in the Hub commissary kitchen covering foundational knife work and prep techniques.',
    story:       'A 2-hour hands-on session in the Hub commissary kitchen. You will leave with sharper knife skills, a cleaner mise en place workflow, and the confidence to break down proteins and prep vegetables like a line cook. Led by a Hub culinary instructor. Class size capped at 12. All tools and ingredients provided. No prior kitchen experience needed.',
    ticketUrl:   '/contact',
    price:       '$65',
    capacity:    12,
    image:       null,
    featured:    false,
  },
  {
    slug:        'sunday-makers-market-july',
    title:       'Sunday Makers Market',
    subtitle:    'Local Artisans, Farmers & Food Producers',
    date:        '2027-07-27',
    time:        '10:00 AM',
    doors:       '10:00 AM',
    category:    'market',
    tags:        ['Market', 'Family Friendly', 'Local'],
    description: 'Monthly Sunday market inside the Hub atrium featuring local artisans, farmers, and food producers.',
    story:       'Once a month the Hub atrium opens up for a curated indoor makers market. Local farmers, food producers, artisans, and small-batch makers bring their work directly to the community. Vendor stalls run along the atrium perimeter. The Cider Bar opens at noon. Live acoustic set from 11 AM. Free to attend — bring the family.',
    ticketUrl:   null,
    price:       'Free',
    capacity:    300,
    image:       null,
    featured:    false,
  },
  {
    slug:        'cider-club-member-night-july',
    title:       'Cider Club Member Night',
    subtitle:    'Exclusive Summer Tap Preview',
    date:        '2027-07-18',
    time:        '7:30 PM',
    doors:       '7:00 PM',
    category:    'cider-tasting',
    tags:        ['Cider Club', 'Members Only', 'Exclusive'],
    description: 'Members-only preview of the summer tap rotation with the cidery producers in attendance.',
    story:       'Cider Club members get first access to the summer tap rotation before it opens to the public. Six cidery producers will be in attendance to walk through their process, this season\'s apple and pear sources, and what makes each expression unique. Flight pours included with membership. Guest tickets available for one guest per member at $25.',
    ticketUrl:   '/cider-club',
    price:       'Members Free / Guest $25',
    capacity:    60,
    image:       null,
    featured:    true,
  },
];

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  'live-music':    'Live Music',
  'cooking-class': 'Cooking Class',
  'pitch-night':   'Pitch Night',
  'cider-tasting': 'Cider Tasting',
  'market':        'Market',
  'private':       'Private Event',
};

export const CATEGORY_COLOR: Record<EventCategory, string> = {
  'live-music':    '#D4A84B',
  'cooking-class': '#4F98A3',
  'pitch-night':   '#C97A3E',
  'cider-tasting': '#C45D2A',
  'market':        '#8BAF6A',
  'private':       'rgba(232,211,165,0.35)',
};

export function getAllEvents(): Event[] {
  return [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
}

export function getEvent(slug: string): Event | undefined {
  return EVENTS.find(e => e.slug === slug);
}

export function getEventsByMonth(year: number, month: number): Event[] {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return getAllEvents().filter(e => e.date.startsWith(prefix));
}

export function getFeaturedEvents(): Event[] {
  return getAllEvents().filter(e => e.featured);
}
