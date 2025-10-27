import { createConfig, http } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
	chains: [mainnet, sepolia, polygon],
	connectors: [
		injected(),
		walletConnect({
			projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
		}),
		coinbaseWallet({ appName: 'My App' })
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[polygon.id]: http()
	}
})

declare module 'wagmi' {
	interface Register {
		config: typeof config
	}
}
