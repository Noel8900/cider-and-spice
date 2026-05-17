import type { Metadata } from 'next';
import { notFound }       from 'next/navigation';
import { insights, getInsightBySlug } from '@/components/corp/data/insights';
import InsightDetailClient from './InsightDetailClient';
import CorpCTASection      from '@/components/corp/sections/CorpCTASection';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return insights.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};
  return {
    title:       article.title,
    description: article.excerpt,
    alternates:  { canonical: `/insights/${slug}` },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();
  return (
    <>
      <InsightDetailClient article={article} />
      <CorpCTASection />
    </>
  );
}
