import type { Metadata } from 'next';
import { notFound }           from 'next/navigation';
import Link                   from 'next/link';
import { services, getServiceBySlug } from '@/components/corp/data/services';
import CorpCTASection         from '@/components/corp/sections/CorpCTASection';
import ServiceDetailClient    from './ServiceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return {};
  return {
    title:       svc.title,
    description: svc.tagline,
    alternates:  { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  return (
    <>
      <ServiceDetailClient service={svc} />
      <CorpCTASection />
    </>
  );
}
