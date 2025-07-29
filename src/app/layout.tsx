import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cosmic Meta War Chicks | NFT Mint',
  description: 'Mint your unique Cosmic Meta War Chick - 2,222 generative art pieces living on the Ethereum blockchain. Join the battle!',
  keywords: ['Cosmic Meta', 'War Chicks', 'NFT', 'mint', 'generative art', 'ethereum', 'blockchain', 'web3'],
  authors: [{ name: 'Cosmic Meta' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Cosmic Meta War Chicks | NFT Mint',
    description: 'Mint your unique Cosmic Meta War Chick - 2,222 generative art pieces living on the Ethereum blockchain. Join the battle!',
    type: 'website',
    url: 'https://mint.cosmicmeta.io/war-chicks',
    siteName: 'Cosmic Meta War Chicks',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cosmic Meta War Chicks NFT Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmic Meta War Chicks | NFT Mint',
    description: 'Mint your unique Cosmic Meta War Chick - 2,222 generative art pieces living on the Ethereum blockchain. Join the battle!',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 