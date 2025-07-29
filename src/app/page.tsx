'use client';

import { useState } from 'react';
import { MintInterface } from '@/components/mint-interface';
import { ContractConfig } from '@/types/contract';
import { validateEthereumAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, ExternalLink, Github } from 'lucide-react';

// Default configuration - users can modify this
const DEFAULT_CONFIG: ContractConfig = {
  address: '0x1234567890123456789012345678901234567890', // Replace with actual contract address
  abi: [], // Will use the standard ERC721_ABI
  name: 'Generic NFT Collection',
  symbol: 'GNFT',
  description: 'A beautiful NFT collection with unique digital artworks',
  image: 'https://via.placeholder.com/300x300?text=NFT+Collection',
  maxSupply: 10000,
  pricePerToken: '50000000000000000', // 0.05 ETH in wei
  maxPerWallet: 5,
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Generic NFT Mint
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A beautiful, configurable NFT minting interface for any ERC-721 contract. 
            Connect your wallet and start minting!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
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
            <Card className="glass-effect border-white/20">
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
                    href="https://github.com/cosmicmeta/generic-nft-mint"
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
          </div>

          {/* Minting Interface */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <MintInterface config={config} />
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