'use client';

import { useState } from 'react';
import { MintInterface } from '@/components/mint-interface';
import { ClientOnly } from '@/components/client-only';
import { ContractDiagnostics } from '@/components/contract-diagnostics';
import { ContractConfig } from '@/types/contract';
import { validateEthereumAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, ExternalLink, Github } from 'lucide-react';
import { ERC721_ABI } from '@/lib/contract-abi';

// Feature flags
const ENABLE_CONFIGURATION_PANEL = true; // Production mode - clean UI for end users

/**
 * Configuration Panel Toggle
 * 
 * When ENABLE_CONFIGURATION_PANEL = true:
 * - Shows configuration panel, diagnostics, and information panel in left sidebar
 * - Uses 3-column grid layout (1/3 sidebar, 2/3 minting interface)
 * 
 * When ENABLE_CONFIGURATION_PANEL = false:
 * - Hides entire configuration section
 * - Centers minting interface with full width
 * - Simplified UI for production/end-user deployments
 * 
 * Example usage:
 * - Development: ENABLE_CONFIGURATION_PANEL = true (full features)
 * - Production: ENABLE_CONFIGURATION_PANEL = false (clean interface)
 */

// Production configuration for Cosmic Meta War Chicks
const DEFAULT_CONFIG: ContractConfig = {
  address: '0xcAdb229D7989Aa25D35A8eEe7539E08E43c55fE8', // Cosmic Meta War Chicks contract
  abi: ERC721_ABI,
  name: 'Cosmic Meta War Chicks',
  symbol: 'CMWC',
  description: 'Cosmic Meta War Chicks - A collection of 2,222 unique generative art pieces, 100% stored and living on the Ethereum blockchain.',
  image: '/nft-placeholder.gif',
  maxSupply: 2222,
  pricePerToken: '12500000000000000', // 0.0125 ETH
  maxPerWallet: 10,
  isPublicSaleActive: true,
  isWhitelistSaleActive: false,
};

export default function HomePage() {
  const [config, setConfig] = useState<ContractConfig>(DEFAULT_CONFIG);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [tempConfig, setTempConfig] = useState<ContractConfig>(DEFAULT_CONFIG);

  const handleSaveConfig = () => {
    if (!validateEthereumAddress(tempConfig.address)) {
      alert('Please enter a valid Ethereum contract address');
      return;
    }
    setConfig(tempConfig);
    setIsConfiguring(false);
  };

  const handleResetConfig = () => {
    setTempConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <img 
              src="/logo.png" 
              alt="Cosmic Meta War Chicks" 
              className="mx-auto max-w-md w-full h-auto"
            />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Mint your unique <strong>Cosmic Meta War Chick</strong> - 2,222 generative art pieces living on the Ethereum blockchain. 
            Connect your wallet and join the battle!
          </p>
        </div>

        <div className={`grid grid-cols-1 ${ENABLE_CONFIGURATION_PANEL ? 'lg:grid-cols-3' : 'place-items-center'} gap-8`}>
          {/* Configuration Panel */}
          {ENABLE_CONFIGURATION_PANEL && (
            <div className="lg:col-span-1">
              <Card className="glass-effect border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Customize the contract settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setIsConfiguring(!isConfiguring)}
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {isConfiguring ? 'Cancel' : 'Configure Contract'}
                  </Button>

                  {isConfiguring && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium">Contract Address</label>
                        <Input
                          value={tempConfig.address}
                          onChange={(e) => setTempConfig({ ...tempConfig, address: e.target.value })}
                          placeholder="0x..."
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Collection Name</label>
                        <Input
                          value={tempConfig.name}
                          onChange={(e) => setTempConfig({ ...tempConfig, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Price (ETH)</label>
                        <Input
                          type="number"
                          step="0.001"
                          value={Number(tempConfig.pricePerToken) / 1e18}
                          onChange={(e) => setTempConfig({ 
                            ...tempConfig, 
                            pricePerToken: (Number(e.target.value) * 1e18).toString()
                          })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Max Supply</label>
                        <Input
                          type="number"
                          value={tempConfig.maxSupply || ''}
                          onChange={(e) => setTempConfig({ 
                            ...tempConfig, 
                            maxSupply: Number(e.target.value) 
                          })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveConfig}
                          variant="gradient"
                          size="sm"
                          className="flex-1"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleResetConfig}
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                              </CardContent>
            </Card>

            {/* Information Panel */}
            <Card className="glass-effect border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="text-gray-300">
                  <strong className="text-white">Contract:</strong><br />
                  <code className="text-xs break-all">{config.address}</code>
                </div>
                <div className="text-gray-300">
                  <strong className="text-white">Network:</strong> Ethereum Mainnet
                </div>
                <div className="text-gray-300">
                  <strong className="text-white">Standard:</strong> ERC-721
                </div>
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="https://github.com/abutun/generic-nft-mint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Contract Diagnostics */}
            <ClientOnly fallback={
              <Card className="glass-effect border-white/20">
                <CardContent className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <p className="text-white/70 text-sm">Loading diagnostics...</p>
                  </div>
                </CardContent>
              </Card>
            }>
              <ContractDiagnostics address={config.address} />
            </ClientOnly>
            </div>
          )}

          {/* Minting Interface */}
          <div className={`${ENABLE_CONFIGURATION_PANEL ? 'lg:col-span-2' : 'w-full max-w-4xl'} flex items-start justify-center pt-0`}>
            <ClientOnly fallback={
              <div className="w-full max-w-md mx-auto">
                <Card className="nft-card-glow bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <p className="text-white/70">Loading Web3...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            }>
              <MintInterface config={config} />
            </ClientOnly>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-400 text-sm">
          <p>Built with ❤️ for the Web3 community</p>
          <p className="mt-2">
            Powered by{' '}
            <a href="https://wagmi.sh" className="text-blue-400 hover:underline">
              Wagmi
            </a>{' '}
            and{' '}
            <a href="https://rainbowkit.com" className="text-blue-400 hover:underline">
              RainbowKit
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
} 