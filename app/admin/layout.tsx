import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | LC Culinary Hub',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
