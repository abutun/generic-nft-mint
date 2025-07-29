'use client';

import { useState } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface ContractDiagnosticsProps {
  address: string;
}

export function ContractDiagnostics({ address }: ContractDiagnosticsProps) {
  const { chain } = useNetwork();
  const [isExpanded, setIsExpanded] = useState(false);

  // Test basic ERC721 functions
  const { data: basicName, error: nameError } = useContractRead({
    address: address as `0x${string}`,
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
    enabled: !!address,
  });

  const { data: basicSymbol, error: symbolError } = useContractRead({
    address: address as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "symbol", 
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'symbol',
    enabled: !!address,
  });

  const { data: basicTotalSupply, error: totalSupplyError } = useContractRead({
    address: address as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view", 
        "type": "function"
      }
    ],
    functionName: 'totalSupply',
    enabled: !!address,
  });

  const diagnostics = [
    {
      test: 'Contract Address Valid',
      status: !!(address && address.startsWith('0x') && address.length === 42),
      details: address
    },
    {
      test: 'Network Connected',
      status: !!chain,
      details: chain ? `${chain.name} (ID: ${chain.id})` : 'Not connected'
    },
    {
      test: 'Basic name() Function',
      status: basicName !== undefined,
      details: String(basicName || (nameError ? `Error: ${nameError.message}` : 'No response')),
      error: nameError
    },
    {
      test: 'Basic symbol() Function', 
      status: basicSymbol !== undefined,
      details: String(basicSymbol || (symbolError ? `Error: ${symbolError.message}` : 'No response')),
      error: symbolError
    },
    {
      test: 'Basic totalSupply() Function',
      status: basicTotalSupply !== undefined,
      details: String(basicTotalSupply?.toString() || (totalSupplyError ? `Error: ${totalSupplyError.message}` : 'No response')),
      error: totalSupplyError
    }
  ];

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />;
  };

  const allBasicTestsPass = diagnostics.slice(2).every(d => d.status);

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader 
        className="cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Contract Diagnostics
          </div>
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            {allBasicTestsPass ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            {/* Chevron icon */}
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {diagnostics.map((diagnostic, index) => (
            <div key={index} className="flex items-start gap-3">
              {getStatusIcon(diagnostic.status)}
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{diagnostic.test}</div>
                <div className="text-gray-300 text-xs break-all">{diagnostic.details}</div>
                {diagnostic.error && (
                  <div className="text-red-400 text-xs mt-1">
                    {diagnostic.error.message}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-3 bg-gray-800/50 border border-gray-600 rounded-lg">
            <div className="text-white text-sm font-medium mb-2">Diagnosis:</div>
            <div className="text-gray-300 text-xs">
              {!diagnostics[0].status && (
                <div className="text-red-400">❌ Invalid contract address format</div>
              )}
              {!diagnostics[1].status && (
                <div className="text-red-400">❌ Not connected to any network</div>
              )}
              {diagnostics[0].status && diagnostics[1].status && !allBasicTestsPass && (
                <div className="text-red-400">
                  ❌ Contract not found or incompatible at this address on {chain?.name}
                  <br />
                  💡 Try: Different network, verify contract address, or check if contract is verified
                </div>
              )}
              {allBasicTestsPass && (
                <div className="text-green-400">
                  ✅ Basic ERC721 functions work - ABI might need custom functions
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
} 