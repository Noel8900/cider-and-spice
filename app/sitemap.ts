import type { MetadataRoute } from 'next';

const BASE = 'https://www.lccullinaryhub.com';

// ── Culinary Hub routes (primary brand) ───────────────────────────────────────
const culinaryRoutes = [
  { url: '/',             priority: 1.0,  changeFrequency: 'monthly'  },
  { url: '/vendors',      priority: 0.9,  changeFrequency: 'monthly'  },
  { url: '/cider-club',   priority: 0.9,  changeFrequency: 'monthly'  },
  { url: '/investors',    priority: 0.8,  changeFrequency: 'monthly'  },
] as const;

// ── Nexus Capital corporate routes (secondary brand) ──────────────────────────
const corpServices = [
  'capital-advisory', 'strategic-transformation', 'private-equity',
  'risk-management', 'digital-excellence', 'global-expansion',
];
const corpInsights = [
  'sovereign-wealth-allocation-2025', 'enterprise-transformation-failure-rates',
  'basel-iv-strategic-opportunity', 'ai-advisory-transformation',
  'india-capital-markets-decade',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const culinary = culinaryRoutes.map(r => ({
    url:              `${BASE}${r.url}`,
    lastModified:     now,
    changeFrequency:  r.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority:         r.priority,
  }));

  const corp = [
    { url: `${BASE}/home`,     priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/about`,    priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE}/services`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE}/insights`, priority: 0.6, changeFrequency: 'monthly' as const },
    ...corpServices.map(slug => ({
      url: `${BASE}/services/${slug}`, priority: 0.5, changeFrequency: 'monthly' as const,
    })),
    ...corpInsights.map(slug => ({
      url: `${BASE}/insights/${slug}`, priority: 0.5, changeFrequency: 'monthly' as const,
    })),
  ].map(r => ({ ...r, lastModified: now }));

  return [...culinary, ...corp];
}
