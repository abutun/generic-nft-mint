import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Generic NFT Mint | Cosmic Meta',
  description: 'A beautiful, generic NFT minting interface for any ERC-721 contract',
  keywords: ['NFT', 'mint', 'blockchain', 'ethereum', 'web3'],
  authors: [{ name: 'Cosmic Meta' }],
  openGraph: {
    title: 'Generic NFT Mint',
    description: 'A beautiful, generic NFT minting interface for any ERC-721 contract',
    type: 'website',
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