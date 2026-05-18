import type { MetadataRoute } from 'next';

const BASE = 'https://www.lccullinaryhub.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              `${BASE}/`,
      lastModified:     new Date(),
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${BASE}/incubator`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.95,
    },
    {
      url:              `${BASE}/vendors`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              `${BASE}/vendors/onboarding`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.85,
    },
    {
      url:              `${BASE}/kitchen-policies`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    {
      url:              `${BASE}/cider-club`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              `${BASE}/investors`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.85,
    },
    {
      url:              `${BASE}/floor-plan`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.8,
    },
  ];
}
