import type { Metadata } from 'next';
import FloorPlanClient from './FloorPlanClient';

export const metadata: Metadata = {
  title: 'Floor Plan | Las Cruces Culinary Innovation Hub',
  description:
    'Interactive floor plan of the Las Cruces Culinary Innovation Hub — 8,000 sq ft, 13 vendor stalls, craft cider bar, commissary kitchen, and event stage. Opening Q1–Q2 2027.',
  openGraph: {
    title: 'Floor Plan | Las Cruces Culinary Innovation Hub',
    description: 'Explore the 8,000 sq ft layout — 13 vendor stalls, cider bar, commissary kitchen, and event stage.',
  },
};

export default function FloorPlanPage() {
  return <FloorPlanClient />;
}
