'use client'

import { Button, Card, Input } from '@flavioespinoza/salsa-ui'
import {
	useAccount,
	useBalance,
	useChainId,
	useConnect,
	useDisconnect,
	useSwitchChain
} from 'wagmi'

const CHAIN_NAMES: Record<number, string> = {
	1: 'Ethereum',
	11155111: 'Sepolia',
	137: 'Polygon'
}

export default function WagmiWallet() {
	const { address, isConnected } = useAccount()
	const { connect, connectors, isPending, error } = useConnect()
	const { disconnect } = useDisconnect()
	const chainId = useChainId()
	const { chains, switchChain } = useSwitchChain()

	const { data: balance } = useBalance({ address })

	const formatAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`
	}

	const copyAddress = () => {
		if (address) {
			navigator.clipboard.writeText(address)
			alert('Address copied!')
		}
	}

	if (!isConnected) {
		return (
			<Card className="p-6">
				<div className="space-y-4">
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
							<span className="text-5xl">🦊</span>
						</div>
						<h3 className="mb-2 text-2xl font-bold">Connect Wallet</h3>
						<p className="text-gray-600 text-sm">Choose your preferred wallet to continue</p>
					</div>

					<div className="space-y-2">
						{connectors.map((connector) => (
							<Button
								key={connector.id}
								onClick={() => connect({ connector })}
								disabled={isPending}
								variant="primary"
								size="lg"
								className="w-full justify-between"
							>
								<span>{connector.name}</span>
								{isPending && (
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
								)}
							</Button>
						))}
					</div>

					{error && (
						<Card className="border-red-200 bg-red-50 p-3">
							<p className="text-sm text-red-700">{error.message}</p>
						</Card>
					)}
				</div>
			</Card>
		)
	}

	return (
		<Card className="p-6">
			<div className="space-y-4">
				<div className="flex items-center justify-between border-b pb-3">
					<div className="text-green-600 flex items-center gap-2">
						<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">Connected</span>
					</div>
					<div className="bg-green-500 h-2 w-2 animate-pulse rounded-full" />
				</div>

				<div>
					<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Wallet Address</p>
					<div className="flex items-center gap-2">
						<Input value={formatAddress(address!)} readOnly className="flex-1 font-mono text-sm" />
						<Button onClick={copyAddress} variant="secondary" size="md">
							Copy
						</Button>
					</div>
				</div>

				{balance && (
					<div>
						<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Balance</p>
						<Card className="bg-gray-50 p-3">
							<p className="text-lg font-semibold">
								{parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
							</p>
						</Card>
					</div>
				)}

				<div>
					<p className="text-gray-500 mb-2 text-xs uppercase tracking-wide">Network</p>
					<Card className="bg-gray-50 mb-2 p-3">
						<div className="flex items-center justify-between">
							<span className="font-medium">{CHAIN_NAMES[chainId] || `Chain ${chainId}`}</span>
							<span className="rounded-full border bg-white px-2 py-1 text-xs">ID: {chainId}</span>
						</div>
					</Card>

					<div className="grid grid-cols-2 gap-2">
						{chains.map((chain) => (
							<Button
								key={chain.id}
								onClick={() => switchChain({ chainId: chain.id })}
								disabled={chainId === chain.id}
								variant={chainId === chain.id ? 'primary' : 'secondary'}
								size="md"
							>
								{chain.name}
							</Button>
						))}
					</div>
				</div>

				<div className="flex gap-2 border-t pt-3">
					<Button onClick={() => disconnect()} variant="danger" size="lg" className="flex-1">
						Disconnect
					</Button>
				</div>
			</div>
		</Card>
	)
}
