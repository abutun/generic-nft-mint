'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, sepolia],
  [
    // Truly free public RPC endpoints (no authentication required)
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://cloudflare-eth.com', // Cloudflare - truly free
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://ethereum-rpc.publicnode.com', // PublicNode - free tier
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://1rpc.io/eth', // 1RPC - free public endpoint
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://rpc.builder0x69.io', // Builder RPC - free
      }),
    }),
    publicProvider() // Wagmi's built-in public provider as last resort
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Generic NFT Mint',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 