// community-data.jsx — Shared content for the Community section directions
// Depends on: hp-tokens.jsx (HP, HP_IMGS)
// Honest framing: the Hub opens Q1–Q2 2027, so impact is stated as COMMITMENTS /
// the operating model, not achieved results — matching the site's "vision" tone.

const CM = {
  badge: 'Community',

  lead: 'Cider & Spice is more than a food hall. It is a launchpad — built by Las Cruces, for Las Cruces.',

  body: [
    'Seventy percent of our stalls are reserved for first-generation, immigrant, veteran, and women-owned food businesses — neighbors with a recipe and a dream, but not yet a storefront.',
    'Through the Semilla and Mariposa tracks, founders get a licensed commissary kitchen, no-cost mentorship from WESST New Mexico, SCORE, and the Las Cruces SBDC, and a built-in audience from the day they open.',
  ],

  pullQuote: 'Every plate served here helps a neighbor build a business that stays in the neighborhood.',

  // Stated as commitments / model — not results. value/suffix drive count-ups.
  commitments: [
    { value: 70,  suffix: '%',  label: 'Stalls reserved for first-gen, immigrant, veteran & women founders' },
    { value: 8,   suffix: '',   label: 'Founding-cohort businesses launching together' },
    { value: 0,   suffix: '',   prefix: '$', label: 'Cost of mentorship & coaching to every vendor' },
    { value: 100, suffix: '%',  label: 'New Mexico cider & locally sourced produce' },
    { value: 2,   suffix: '',   label: 'Incubator tracks — Semilla & Mariposa' },
  ],

  // Three community participation paths — distinct from the site's vendor/invest CTA.
  paths: [
    {
      icon: '◈', kicker: 'For Food Entrepreneurs', title: 'Bring Your Food',
      body: 'Have a concept and the drive? Apply to the incubator — no prior restaurant experience required. We provide the kitchen, the mentors, and the crowd.',
      actions: ['Submit your concept', 'Cook in the shared commissary', 'Get matched with a mentor'],
      cta: 'Apply to the incubator', href: 'Incubator Program.html',
    },
    {
      icon: '✦', kicker: 'For Neighbors & Diners', title: 'Show Up & Pitch In',
      body: 'The hall comes alive through the people in it. Come for the markets and chile-harvest nights — stay to volunteer, mentor, or simply spread the word.',
      actions: ['RSVP to markets & festivals', 'Volunteer on community nights', 'Join the Cider Club'],
      cta: 'See what’s on', href: '#cta',
    },
    {
      icon: '◉', kicker: 'For Partners & Nonprofits', title: 'Build It With Us',
      body: 'Schools, farms, lenders, and nonprofits make this work. Sponsor a founder’s first season, lead a workshop, or supply the line with local produce.',
      actions: ['Sponsor a founder’s first season', 'Lead a skills workshop', 'Supply local produce'],
      cta: 'Become a partner', href: 'Grant Programs.html',
    },
  ],

  // Illustrative founding-cohort concepts (reuse vision imagery + disclaimer).
  spotlights: [
    { name: 'Yazzie', cuisine: 'Japanese · NM Fusion', track: 'Semilla Track', img: HP_IMGS.stalls,
      quote: 'I cooked katsu out of my home kitchen for five years. The incubator is how it finally becomes a counter with my name on it.' },
    { name: 'Seoul Fire Chicken', cuisine: 'Korean', track: 'Mariposa Track', img: HP_IMGS.seoul,
      quote: 'We outgrew the farmers’ market. Cider & Spice is the bridge between a pop-up tent and a real storefront.' },
    { name: 'Sticky Stack Co.', cuisine: 'Artisan Jams', track: 'Semilla Track', img: HP_IMGS.sticky,
      quote: 'Shared kitchen time meant I could jar my Hatch jam at scale without a loan I couldn’t carry yet.' },
  ],

  partners: ['WESST New Mexico', 'SCORE', 'Las Cruces SBDC', 'SBA Lending', 'Local Farms & Growers', 'Community Microlenders'],
};

// Shared count-up stat (used by ledger direction). Lives here so all 3 share it.
function CommitmentNumber({ value, prefix = '', suffix = '', active, size = 52 }) {
  const n = useCountUp(value, active, 0, 1600);
  return (
    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: size, fontWeight: 300, color: HP.gold, lineHeight: 1, letterSpacing: '-.01em' }}>
      {prefix}{n}{suffix}
    </span>
  );
}

// Small reusable disclaimer line (matches gallery wording).
function CMDisclaimer({ style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ width: 20, height: 1, background: 'rgba(212,168,75,.3)' }} />
      <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(212,168,75,.45)' }}>Illustrative founding-cohort concepts · Not confirmed tenants</span>
    </div>
  );
}

Object.assign(window, { CM, CommitmentNumber, CMDisclaimer });
