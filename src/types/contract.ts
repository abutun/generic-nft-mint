export interface ContractConfig {
  address: string;
  abi: any[];
  name: string;
  symbol: string;
  description: string;
  image?: string;
  maxSupply?: number;
  pricePerToken: string; // in wei
  maxPerWallet?: number;
  isPublicSaleActive: boolean;
  isWhitelistSaleActive: boolean;
}

export interface MintState {
  isLoading: boolean;
  error: string | null;
  txHash: string | null;
  quantity: number;
}

export interface CollectionInfo {
  name: string;
  symbol: string;
  totalSupply: number;
  maxSupply: number;
  pricePerToken: string;
  owner: string;
  isPublicSaleActive: boolean;
  isWhitelistSaleActive: boolean;
  baseURI: string;
}

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
} 