'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { connectWallet, disconnect, switchChain } from '@/redux/wallet-slice';

const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon',
  56: 'BSC',
  42161: 'Arbitrum',
  8453: 'Base',
  10: 'Optimism',
};

export default function WalletConnection() {
  const dispatch = useAppDispatch();
  const { address, chainId, isConnecting, isConnected, error } = useAppSelector(
    (state) => state.wallet
  );
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window !== 'undefined') {
        setHasMetaMask(typeof window.ethereum !== 'undefined');
      }
    };

    checkMetaMask();
    window.addEventListener('ethereum#initialized', checkMetaMask);
    const timeout = setTimeout(checkMetaMask, 1000);

    return () => {
      window.removeEventListener('ethereum#initialized', checkMetaMask);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          dispatch(disconnect());
        } else if (accounts[0] !== address) {
          dispatch(connectWallet());
        }
      };

      const handleChainChanged = (chainId: string) => {
        dispatch(switchChain(parseInt(chainId, 16)));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [address, dispatch]);

  const handleConnect = async () => {
    if (!hasMetaMask) {
      alert('Please install MetaMask to connect your wallet.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    const result = await dispatch(connectWallet());
    if (connectWallet.fulfilled.match(result)) {
      console.log('✅ Wallet connected:', result.payload);
    } else if (connectWallet.rejected.match(result)) {
      console.error('❌ Connection failed:', result.payload);
    }
  };

  const handleDisconnect = () => {
    dispatch(disconnect());
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  const handleSwitchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      dispatch(switchChain(targetChainId));
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      if (error.code === 4902) {
        alert('This network is not available in your MetaMask. Please add it manually.');
      }
    }
  };

  if (hasMetaMask === false) {
    return (
      <div className="p-6 border border-orange-200 rounded-lg bg-orange-50 shadow-sm">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🦊</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              MetaMask Not Detected
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please install MetaMask browser extension to connect your wallet
            </p>
          </div>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  if (hasMetaMask === null) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full" />
          <span className="text-gray-600 font-medium">Checking for MetaMask...</span>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 shadow-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full" />
          <div className="text-center">
            <p className="text-blue-800 font-semibold mb-1">Connecting...</p>
            <p className="text-sm text-blue-600">
              Please check MetaMask popup and approve the connection
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="p-6 border border-green-200 rounded-lg bg-white shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Wallet Connected</span>
            </div>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Wallet Address
            </p>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <code className="text-sm font-mono font-semibold text-gray-900 flex-1">
                {address.slice(0, 8)}...{address.slice(-6)}
              </code>
              <button
                onClick={copyAddress}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Copy address"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {chainId && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Network
              </p>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-900">
                    {CHAIN_NAMES[chainId] || `Chain ${chainId}`}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-full text-gray-600">
                  ID: {chainId}
                </span>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Switch Network
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSwitchNetwork(1)}
                disabled={chainId === 1}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  chainId === 1
                    ? 'bg-blue-50 border-blue-200 text-blue-700 cursor-not-allowed'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Ethereum
              </button>
              <button
                onClick={() => handleSwitchNetwork(137)}
                disabled={chainId === 137}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  chainId === 137
                    ? 'bg-purple-50 border-purple-200 text-purple-700 cursor-not-allowed'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Polygon
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={handleConnect}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reconnect
            </button>
            <button
              onClick={handleDisconnect}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 border border-gray-200 rounded-lg bg-white shadow-lg">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-5xl">🦊</span>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Connect with MetaMask to interact with blockchain applications. 
            Your wallet will open in a popup.
          </p>
        </div>

        <button
          onClick={handleConnect}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-3"
        >
          <span>Connect MetaMask</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
                <button
                  onClick={handleConnect}
                  className="text-xs text-red-700 hover:text-red-800 underline mt-1"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            New to Ethereum?{' '}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Get MetaMask
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}