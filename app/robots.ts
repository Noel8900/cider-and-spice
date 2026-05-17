import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/vendors/thank-you'],
      },
    ],
    sitemap: 'https://www.lccullinaryhub.com/sitemap.xml',
  };
}
