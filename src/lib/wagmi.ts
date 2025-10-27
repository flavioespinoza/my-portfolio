import { createConfig, http } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
	chains: [mainnet, sepolia, polygon],
	connectors: [
		injected(),
		walletConnect({
			// projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ''
			projectId: '22967924c193fdef5e3c4a2c7ce907c2'
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
