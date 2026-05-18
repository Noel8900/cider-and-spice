import type { Metadata } from 'next';
import FloorPlanClient from './FloorPlanClient';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Floor Plan | Las Cruces Culinary Innovation Hub',
  description:
    'Interactive floor plan of the Las Cruces Culinary Innovation Hub — 8,000 sq ft, 13 vendor stalls, craft cider bar, commissary kitchen, and event stage. Opening Q1–Q2 2027.',
  openGraph: {
    title: 'Floor Plan | Las Cruces Culinary Innovation Hub',
    description: 'Explore the 8,000 sq ft layout — 13 vendor stalls, cider bar, commissary kitchen, and event stage.',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.lccullinaryhub.com/floor-plan',
      url: 'https://www.lccullinaryhub.com/floor-plan',
      name: 'Interactive Floor Plan — Las Cruces Culinary Innovation Hub',
      description:
        '8,000 sq ft interactive floor plan: 13 vendor stalls, craft cider bar with 20–25 rotating taps, shared commissary kitchen, and a live event stage. Opening Q1–Q2 2027 in downtown Las Cruces.',
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.lccullinaryhub.com/#website',
        name: 'Las Cruces Culinary Innovation Hub',
        url: 'https://www.lccullinaryhub.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.lccullinaryhub.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Floor Plan',
          item: 'https://www.lccullinaryhub.com/floor-plan',
        },
      ],
    },
  ],
};

export default function FloorPlanPage() {
  return (
    <>
      <StructuredData schema={schema} />
      <FloorPlanClient />
    </>
  );
}
