'use client';

import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, useAccount, useNetwork } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ERC721_ABI } from '@/lib/contract-abi';
import type { ContractConfig, CollectionInfo, MintState } from '@/types/contract';

export function useContract(config: ContractConfig) {
  const { address: userAddress } = useAccount();
  const { chain } = useNetwork();
  const [mintState, setMintState] = useState<MintState>({
    isLoading: false,
    error: null,
    txHash: null,
    quantity: 1,
  });

  // Contract read operations
  const { data: name } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'totalSupply',
  });

  const { data: maxSupply } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'maxSupply',
  });

  const { data: cost } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'cost',
  });

  const { data: publicSaleActive } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'publicSale',
  });

  const { data: userBalance } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    enabled: !!userAddress,
  });

  // Contract write operation
  const { writeAsync: mintNFT } = useContractWrite({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'mint',
  });

  const collectionInfo: CollectionInfo = {
    name: name as string || config.name,
    symbol: symbol as string || config.symbol,
    totalSupply: Number(totalSupply) || 0,
    maxSupply: Number(maxSupply) || config.maxSupply || 0,
    pricePerToken: cost ? cost.toString() : config.pricePerToken,
    owner: '',
    isPublicSaleActive: publicSaleActive || config.isPublicSaleActive,
    isWhitelistSaleActive: config.isWhitelistSaleActive,
    baseURI: '',
  };

  const mint = async (quantity: number) => {
    if (!mintNFT) return;

    setMintState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const totalCost = BigInt(collectionInfo.pricePerToken) * BigInt(quantity);
      
      const tx = await mintNFT({
        args: [BigInt(quantity)],
        value: totalCost,
      });

      setMintState(prev => ({ 
        ...prev, 
        txHash: tx.hash,
        isLoading: false 
      }));

      return tx.hash;
    } catch (error: any) {
      setMintState(prev => ({ 
        ...prev, 
        error: error.message || 'Minting failed', 
        isLoading: false 
      }));
      throw error;
    }
  };

  const clearError = () => {
    setMintState(prev => ({ ...prev, error: null }));
  };

  const setQuantity = (quantity: number) => {
    setMintState(prev => ({ ...prev, quantity }));
  };

  return {
    collectionInfo,
    mintState,
    userBalance: Number(userBalance) || 0,
    mint,
    clearError,
    setQuantity,
    isConnected: !!userAddress,
    currentChain: chain,
  };
} 