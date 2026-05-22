import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Las Cruces Culinary Innovation Hub',
    short_name: 'Cider & Spice',
    description: "Southern NM\'s first food hall, craft cider bar, and culinary incubator. Opening Q1–Q2 2027 in downtown Las Cruces.",
    start_url: '/',
    display: 'standalone',
    background_color: '#1C1209',
    theme_color: '#1C1209',
    icons: [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231C1209'/><text y='.85em' x='12' font-size='76' fill='%23d4a84b'>◈</text></svg>",
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
