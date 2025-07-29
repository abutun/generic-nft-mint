'use client';

import { useState, useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Plus, Minus, Wallet, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useContract } from '@/hooks/useContract';
import { formatPrice, formatAddress, cn } from '@/lib/utils';
import type { ContractConfig } from '@/types/contract';

interface MintInterfaceProps {
  config: ContractConfig;
}

export function MintInterface({ config }: MintInterfaceProps) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [quantity, setQuantity] = useState(1);
  
  const {
    collectionInfo,
    mintState,
    userBalance,
    mint,
    clearError,
    isConnected: contractConnected,
  } = useContract(config);

  const totalPrice = BigInt(collectionInfo.pricePerToken) * BigInt(quantity);
  const progress = collectionInfo.maxSupply > 0 
    ? (collectionInfo.totalSupply / collectionInfo.maxSupply) * 100 
    : 0;

  const handleMint = async () => {
    try {
      await mint(quantity);
    } catch (error) {
      console.error('Mint failed:', error);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    const maxAllowed = config.maxPerWallet || 10;
    const remaining = collectionInfo.maxSupply - collectionInfo.totalSupply;
    const max = Math.min(maxAllowed, remaining, 20);
    
    setQuantity(Math.max(1, Math.min(newQuantity, max)));
  };

  const canMint = isConnected && 
    collectionInfo.isPublicSaleActive && 
    collectionInfo.totalSupply < collectionInfo.maxSupply &&
    !mintState.isLoading;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="nft-card-glow bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          {config.image && (
            <div className="mb-4">
              <img 
                src={config.image} 
                alt={collectionInfo.name}
                className="w-32 h-32 mx-auto rounded-lg object-cover shadow-lg"
              />
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-white">
            {collectionInfo.name}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {config.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Collection Stats */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Minted</span>
              <span className="text-white font-medium">
                {collectionInfo.totalSupply} / {collectionInfo.maxSupply}
              </span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price</span>
              <span className="text-white font-medium">
                {formatPrice(collectionInfo.pricePerToken)}
              </span>
            </div>

            {isConnected && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Your Balance</span>
                <span className="text-white font-medium">{userBalance} NFTs</span>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {mintState.error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-sm">{mintState.error}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearError}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ×
              </Button>
            </div>
          )}

          {mintState.txHash && (
            <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <p className="text-green-400 text-sm">Minting successful!</p>
                <a 
                  href={`https://etherscan.io/tx/${mintState.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 text-xs hover:underline flex items-center gap-1"
                >
                  View transaction <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {!collectionInfo.isPublicSaleActive && (
            <div className="flex items-center gap-2 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <p className="text-yellow-400 text-sm">Public sale is not active</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-white font-medium">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="text-center bg-white/10 border-white/20 text-white"
                min={1}
                max={config.maxPerWallet || 10}
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (config.maxPerWallet || 10)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <span className="text-gray-400 text-sm">Total: </span>
              <span className="text-white font-bold">
                {formatPrice(totalPrice.toString())}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal, connectModalOpen }) => (
                <Button 
                  onClick={openConnectModal}
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={connectModalOpen}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          ) : (
            <Button
              onClick={handleMint}
              disabled={!canMint}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              {mintState.isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Minting...
                </>
              ) : (
                `Mint ${quantity} NFT${quantity > 1 ? 's' : ''}`
              )}
            </Button>
          )}

          {isConnected && (
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Connected: {formatAddress(address as string)}
              </p>
              {chain && (
                <p className="text-gray-500 text-xs">
                  Network: {chain.name}
                </p>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 