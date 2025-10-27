'use client'

import { useState } from 'react'
import { config } from '@/lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

export default function WagmiProviders({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}
