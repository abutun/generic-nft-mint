import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientProviders } from '@/components/client-providers';
import { DEPLOYMENT_PATHS } from '@/lib/deployment-paths';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(DEPLOYMENT_PATHS.siteUrl),
  title: `${DEPLOYMENT_PATHS.CONTRACT_NAME} | NFT Mint`,
  description: `Mint a ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} from the ${DEPLOYMENT_PATHS.CONTRACT_NAME} collection on Ethereum.`,
  keywords: ['NFT', 'mint', 'ERC-721', 'ethereum', 'blockchain', 'web3'],
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
    description: `Mint a ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} from the ${DEPLOYMENT_PATHS.CONTRACT_NAME} collection on Ethereum.`,
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
      description: `Mint a ${DEPLOYMENT_PATHS.CONTRACT_SHORT_NAME} from the ${DEPLOYMENT_PATHS.CONTRACT_NAME} collection on Ethereum.`,
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
        <ClientProviders>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
