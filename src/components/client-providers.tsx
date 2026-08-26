'use client';

import dynamic from 'next/dynamic';

const Providers = dynamic(
  () => import('@/components/providers').then((module) => module.Providers),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
