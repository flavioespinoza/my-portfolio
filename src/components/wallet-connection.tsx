'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { connectWallet, disconnect, switchChain } from '@/redux/wallet-slice'

const CHAIN_NAMES: Record<number, string> = {
	1: 'Ethereum Mainnet',
	11155111: 'Sepolia Testnet',
	137: 'Polygon',
	56: 'BSC',
	42161: 'Arbitrum',
	8453: 'Base',
	10: 'Optimism'
}

export default function WalletConnection() {
	const dispatch = useAppDispatch()
	const { address, chainId, isConnecting, isConnected, error } = useAppSelector(
		(state) => state.wallet
	)
	const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null)

	useEffect(() => {
		const checkMetaMask = () => {
			if (typeof window !== 'undefined') {
				setHasMetaMask(typeof window.ethereum !== 'undefined')
			}
		}

		checkMetaMask()
		window.addEventListener('ethereum#initialized', checkMetaMask)
		const timeout = setTimeout(checkMetaMask, 1000)

		return () => {
			window.removeEventListener('ethereum#initialized', checkMetaMask)
			clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			const handleAccountsChanged = (accounts: string[]) => {
				if (accounts.length === 0) {
					dispatch(disconnect())
				} else if (accounts[0] !== address) {
					dispatch(connectWallet())
				}
			}

			const handleChainChanged = (chainId: string) => {
				dispatch(switchChain(parseInt(chainId, 16)))
			}

			window.ethereum.on('accountsChanged', handleAccountsChanged)
			window.ethereum.on('chainChanged', handleChainChanged)

			return () => {
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
				window.ethereum.removeListener('chainChanged', handleChainChanged)
			}
		}
	}, [address, dispatch])

	const handleConnect = async () => {
		if (!hasMetaMask) {
			alert('Please install MetaMask to connect your wallet.')
			window.open('https://metamask.io/download/', '_blank')
			return
		}

		const result = await dispatch(connectWallet())
		if (connectWallet.fulfilled.match(result)) {
			console.log('✅ Wallet connected:', result.payload)
		} else if (connectWallet.rejected.match(result)) {
			console.error('❌ Connection failed:', result.payload)
		}
	}

	const handleDisconnect = () => {
		dispatch(disconnect())
	}

	const copyAddress = () => {
		if (address) {
			navigator.clipboard.writeText(address)
			alert('Address copied to clipboard!')
		}
	}

	const handleSwitchNetwork = async (targetChainId: number) => {
		if (!window.ethereum) return

		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: `0x${targetChainId.toString(16)}` }]
			})
			dispatch(switchChain(targetChainId))
		} catch (error: any) {
			console.error('Failed to switch network:', error)
			if (error.code === 4902) {
				alert('This network is not available in your MetaMask. Please add it manually.')
			}
		}
	}

	if (hasMetaMask === false) {
		return (
			<div className="rounded-lg border border-orange-200 bg-orange-50 p-6 shadow-sm">
				<div className="space-y-4 text-center">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
						<span className="text-4xl">🦊</span>
					</div>
					<div>
						<h3 className="text-gray-900 mb-1 text-lg font-semibold">MetaMask Not Detected</h3>
						<p className="text-gray-600 mb-4 text-sm">
							Please install MetaMask browser extension to connect your wallet
						</p>
					</div>
					<a
						href="https://metamask.io/download/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
					>
						Install MetaMask
					</a>
				</div>
			</div>
		)
	}

	if (hasMetaMask === null) {
		return (
			<div className="border-gray-200 bg-gray-50 rounded-lg border p-6 shadow-sm">
				<div className="flex items-center justify-center gap-3">
					<div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
					<span className="text-gray-600 font-medium">Checking for MetaMask...</span>
				</div>
			</div>
		)
	}

	if (isConnecting) {
		return (
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
				<div className="flex flex-col items-center gap-3">
					<div className="border-3 h-8 w-8 animate-spin rounded-full border-blue-600 border-t-transparent" />
					<div className="text-center">
						<p className="mb-1 font-semibold text-blue-800">Connecting...</p>
						<p className="text-sm text-blue-600">
							Please check MetaMask popup and approve the connection
						</p>
					</div>
				</div>
			</div>
		)
	}

	if (isConnected && address) {
		return (
			<div className="border-green-200 rounded-lg border bg-white p-6 shadow-lg">
				<div className="space-y-4">
					<div className="border-gray-100 flex items-center justify-between border-b pb-3">
						<div className="text-green-600 flex items-center gap-2">
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="font-semibold">Wallet Connected</span>
						</div>
						<div className="bg-green-500 h-2 w-2 animate-pulse rounded-full" />
					</div>

					<div>
						<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Wallet Address</p>
						<div className="bg-gray-50 flex items-center gap-2 rounded-lg p-3">
							<code className="text-gray-900 flex-1 font-mono text-sm font-semibold">
								{address.slice(0, 8)}...{address.slice(-6)}
							</code>
							<button
								onClick={copyAddress}
								className="hover:bg-gray-200 rounded p-2 transition-colors"
								title="Copy address"
							>
								<svg
									className="text-gray-600 h-4 w-4"
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
							<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Network</p>
							<div className="bg-gray-50 flex items-center justify-between rounded-lg p-3">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-blue-500" />
									<span className="text-gray-900 text-sm font-medium">
										{CHAIN_NAMES[chainId] || `Chain ${chainId}`}
									</span>
								</div>
								<span className="border-gray-200 text-gray-600 rounded-full border bg-white px-2 py-1 text-xs">
									ID: {chainId}
								</span>
							</div>
						</div>
					)}

					<div>
						<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Switch Network</p>
						<div className="grid grid-cols-2 gap-2">
							<button
								onClick={() => handleSwitchNetwork(1)}
								disabled={chainId === 1}
								className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
									chainId === 1
										? 'cursor-not-allowed border-blue-200 bg-blue-50 text-blue-700'
										: 'border-gray-200 text-gray-700 hover:bg-gray-50 bg-white'
								}`}
							>
								Ethereum
							</button>
							<button
								onClick={() => handleSwitchNetwork(137)}
								disabled={chainId === 137}
								className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
									chainId === 137
										? 'cursor-not-allowed border-purple-200 bg-purple-50 text-purple-700'
										: 'border-gray-200 text-gray-700 hover:bg-gray-50 bg-white'
								}`}
							>
								Polygon
							</button>
						</div>
					</div>

					<div className="border-gray-100 flex gap-2 border-t pt-3">
						<button
							onClick={handleConnect}
							className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
						>
							Reconnect
						</button>
						<button
							onClick={handleDisconnect}
							className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
						>
							Disconnect
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="border-gray-200 rounded-lg border bg-white p-8 shadow-lg">
			<div className="space-y-6 text-center">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
					<span className="text-5xl">🦊</span>
				</div>

				<div>
					<h3 className="text-gray-900 mb-2 text-2xl font-bold">Connect Your Wallet</h3>
					<p className="text-gray-600 mx-auto max-w-sm text-sm">
						Connect with MetaMask to interact with blockchain applications. Your wallet will open in
						a popup.
					</p>
				</div>

				<button
					onClick={handleConnect}
					className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-lg font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
				>
					<span>Connect MetaMask</span>
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</button>

				{error && (
					<div className="rounded-lg border border-red-200 bg-red-50 p-4">
						<div className="flex items-start gap-3">
							<svg
								className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
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
									className="mt-1 text-xs text-red-700 underline hover:text-red-800"
								>
									Try again
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="border-gray-100 border-t pt-4">
					<p className="text-gray-500 text-xs">
						New to Ethereum?{' '}
						<a
							href="https://metamask.io/download/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-blue-600 underline hover:text-blue-700"
						>
							Get MetaMask
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}
