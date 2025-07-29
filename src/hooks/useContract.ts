'use client';

import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, useAccount, useNetwork } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ERC721_ABI } from '@/lib/contract-abi';
import type { ContractConfig, CollectionInfo, MintState } from '@/types/contract';

export function useContract(config: ContractConfig) {
  const { address: userAddress, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [mintState, setMintState] = useState<MintState>({
    isLoading: false,
    error: null,
    txHash: null,
    quantity: 1,
  });

  // Test basic ERC721 compatibility first
  const { data: basicName } = useContractRead({
    address: config.address as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'name',
    enabled: !!config.address,
  });

  // Contract read operations
  const { data: name } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'name',
    enabled: !!config.address,
  });

  const { data: symbol } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'symbol',
    enabled: !!config.address,
  });

  const { data: totalSupply } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'totalSupply',
    enabled: !!config.address,
  });

  const { data: maxSupply } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'MAX_TOKENS',
    enabled: !!config.address,
  });

  const { data: cost } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'price',
    enabled: !!config.address,
  });

  const { data: publicSaleActive } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'mainSale',
    enabled: !!config.address,
  });

  const { data: isPaused } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'paused',
    enabled: !!config.address,
  });

  const { data: maxMintPerWallet } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'maxMint',
    enabled: !!config.address,
  });

  const { data: preMintPrice } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'preMintPrice',
    enabled: !!config.address,
  });

  const { data: hasPresaleAccess } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'hasPresaleAccess',
    args: userAddress ? [userAddress] : undefined,
    enabled: !!userAddress && !!config.address,
  });

  const { data: userBalance } = useContractRead({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    enabled: !!userAddress && !!config.address,
  });

  // Contract write operations
  const { writeAsync: mintNFT } = useContractWrite({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'mint',
  });

  const { writeAsync: preMintNFT } = useContractWrite({
    address: config.address as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'preMint',
  });

  const collectionInfo: CollectionInfo = {
    name: name as string || config.name,
    symbol: symbol as string || config.symbol,
    totalSupply: Number(totalSupply) || 0,
    maxSupply: Number(maxSupply) || config.maxSupply || 0,
    pricePerToken: cost ? cost.toString() : config.pricePerToken,
    owner: '',
    isPublicSaleActive: typeof publicSaleActive === 'boolean' ? publicSaleActive : config.isPublicSaleActive,
    isWhitelistSaleActive: config.isWhitelistSaleActive,
    baseURI: '',
    isPaused: typeof isPaused === 'boolean' ? isPaused : false,
    maxMintPerWallet: Number(maxMintPerWallet) || 0,
    preMintPrice: preMintPrice ? preMintPrice.toString() : null,
    hasPresaleAccess: typeof hasPresaleAccess === 'boolean' ? hasPresaleAccess : false,
  };

  const mint = async (quantity: number) => {
    if (!userAddress) return;
    if (!mintNFT && !preMintNFT) {
      throw new Error('Mint function not available');
    }

    setMintState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Log all contract data first for debugging
      console.log('=== COMPLETE CONTRACT STATE DEBUG ===');
      console.log('Contract Address:', config.address);
      console.log('Current Chain:', chain);
      console.log('User Address:', userAddress);
      console.log('Is Connected:', isConnected);
      
      console.log('Basic ERC721 Test:', {
        basicName: basicName,
      });
      
      console.log('Raw contract responses:', {
        name,
        symbol,
        totalSupply: totalSupply?.toString(),
        maxSupply: maxSupply?.toString(),
        cost: cost?.toString(),
        publicSaleActive,
        isPaused,
        maxMintPerWallet: maxMintPerWallet?.toString(),
        preMintPrice: preMintPrice?.toString(),
        hasPresaleAccess,
        userBalance: userBalance?.toString(),
      });
      
      console.log('Processed collectionInfo:', collectionInfo);
      
      // If all contract calls are failing, throw a more specific error
      if (name === undefined && symbol === undefined && totalSupply === undefined) {
        throw new Error(`Contract not found or incompatible at address ${config.address}. Please verify the contract address and network.`);
      }
      
      // Pre-mint validation with detailed error messages
      if (collectionInfo.isPaused) {
        throw new Error('Contract is currently paused');
      }
      
             // Check if we should use preMint instead of mint
       const shouldUsePreMint = !collectionInfo.isPublicSaleActive && collectionInfo.hasPresaleAccess;
       const priceToUse = shouldUsePreMint && collectionInfo.preMintPrice 
         ? collectionInfo.preMintPrice 
         : collectionInfo.pricePerToken;
       
       if (!collectionInfo.isPublicSaleActive && !collectionInfo.hasPresaleAccess) {
         throw new Error('Neither public sale nor presale is active for your wallet');
       }
       
       if (shouldUsePreMint && !preMintNFT) {
         throw new Error('PreMint function not available');
       }
       
       if (!shouldUsePreMint && !mintNFT) {
         throw new Error('Mint function not available');
       }
      
      if (collectionInfo.totalSupply + quantity > collectionInfo.maxSupply) {
        throw new Error(`Not enough tokens available. Only ${collectionInfo.maxSupply - collectionInfo.totalSupply} remaining.`);
      }
      
      if (collectionInfo.maxMintPerWallet && (Number(userBalance) + quantity) > collectionInfo.maxMintPerWallet) {
        throw new Error(`Would exceed max ${collectionInfo.maxMintPerWallet} tokens per wallet`);
      }

      const totalCost = BigInt(priceToUse) * BigInt(quantity);
      
      console.log('=== MINT EXECUTION DEBUG ===');
      console.log({
        userAddress,
        quantity,
        shouldUsePreMint,
        priceToUse,
        totalCost: totalCost.toString(),
        publicSaleActive: collectionInfo.isPublicSaleActive,
        hasPresaleAccess: collectionInfo.hasPresaleAccess,
        isPaused: collectionInfo.isPaused,
        totalSupply: collectionInfo.totalSupply,
        maxSupply: collectionInfo.maxSupply,
        userBalance: Number(userBalance),
        maxMintPerWallet: collectionInfo.maxMintPerWallet
      });
      
      // Use the appropriate mint function
      const tx = shouldUsePreMint 
        ? await preMintNFT({
            args: [userAddress, BigInt(quantity)],
            value: totalCost,
          })
        : await mintNFT({
            args: [userAddress, BigInt(quantity)],
            value: totalCost,
          });

      setMintState(prev => ({ 
        ...prev, 
        txHash: tx.hash,
        isLoading: false 
      }));

      return tx.hash;
    } catch (error: any) {
      console.error('=== MINT ERROR DETAILS ===', error);
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
    isConnected: isConnected && !!userAddress,
    currentChain: chain,
  };
} 