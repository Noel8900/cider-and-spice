// Server shell — wraps the 'use client' CiderClubClient component
// so we can inject server-rendered JSON-LD structured data.
import StructuredData from '@/components/seo/StructuredData';
import CiderClubClient from './CiderClubClient';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.lccullinaryhub.com/cider-club',
      url: 'https://www.lccullinaryhub.com/cider-club',
      name: 'Cider Club Membership — Las Cruces Culinary Innovation Hub',
      description:
        'Pre-register for the Cider Club — three founding-member tiers (Taster $25/mo, Enthusiast $45/mo, Founding Member $85/mo) with tasting flights, pour discounts, and exclusive events at Southern New Mexico's first specialty cider bar.',
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
          name: 'Cider Club',
          item: 'https://www.lccullinaryhub.com/cider-club',
        },
      ],
    },
  ],
};

export default function CiderClubPage() {
  return (
    <>
      <StructuredData schema={schema} />
      <CiderClubClient />
    </>
  );
}
