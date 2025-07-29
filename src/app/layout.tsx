import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { DEPLOYMENT_PATHS } from '@/lib/deployment-paths';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${DEPLOYMENT_PATHS.CONTRACT_NAME} | NFT Mint`,
  description: `Mint your unique ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} - ${DEPLOYMENT_PATHS.CONTRACT_MAX_SUPPLY} generative art pieces living on the Ethereum blockchain. Join the battle!`,
  keywords: ['Cosmic Meta', 'War Chicks', 'NFT', 'mint', 'generative art', 'ethereum', 'blockchain', 'web3'],
  authors: [{ name: 'Cosmic Meta Digital' }],
  icons: {
    icon: [
      { url: DEPLOYMENT_PATHS.favicon, sizes: 'any' },
      { url: DEPLOYMENT_PATHS.favicon16, type: 'image/png', sizes: '16x16' },
      { url: DEPLOYMENT_PATHS.favicon32, type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: DEPLOYMENT_PATHS.appleIcon, sizes: '180x180' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: DEPLOYMENT_PATHS.androidIcon192 },
      { rel: 'android-chrome-512x512', url: DEPLOYMENT_PATHS.androidIcon512 },
    ],
  },
  manifest: DEPLOYMENT_PATHS.manifest,
  openGraph: {
    title: `${DEPLOYMENT_PATHS.CONTRACT_NAME} | NFT Mint`,
    description: `Mint your unique ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} - ${DEPLOYMENT_PATHS.CONTRACT_MAX_SUPPLY} generative art pieces living on the Ethereum blockchain. Join the battle!`,
    type: 'website',
    url: DEPLOYMENT_PATHS.siteUrl,
    siteName: DEPLOYMENT_PATHS.CONTRACT_NAME,
          images: [
        {
          url: DEPLOYMENT_PATHS.ogImage,
          width: 1200,
          height: 630,
          alt: `${DEPLOYMENT_PATHS.CONTRACT_NAME} NFT Collection`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${DEPLOYMENT_PATHS.CONTRACT_NAME} | NFT Mint`,
      description: `Mint your unique ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} - ${DEPLOYMENT_PATHS.CONTRACT_MAX_SUPPLY} generative art pieces living on the Ethereum blockchain. Join the battle!`,
    images: [DEPLOYMENT_PATHS.ogImage],
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