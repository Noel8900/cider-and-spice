import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendor Application | Las Cruces Culinary Innovation Hub',
  description:
    "Apply to bring your food concept to the LC Culinary Hub. " +
    "We're curating 10-13 distinctive food concepts for our Q1-Q2 2027 " +
    "grand opening in downtown Las Cruces, NM.",
  alternates: { canonical: '/vendors' },
  openGraph: {
    title: 'Apply as a Vendor | LC Culinary Hub',
    description:
      'Join our curated lineup of global food concepts. Applications open for ' +
      'the 2027 grand opening in downtown Las Cruces.',
    url: 'https://www.lccullinaryhub.com/vendors',
  },
}

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
