import WalletConnection from '@/components/wallet-connection'

export default function WalletPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8 text-center">
					<h1 className="text-gray-900 mb-2 text-4xl font-bold">Wallet Connection</h1>
					<p className="text-gray-600">
						Connect your MetaMask wallet to interact with the blockchain
					</p>
				</div>

				<WalletConnection />

				{/* Info Cards */}
				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="border-gray-200 rounded-lg border bg-white p-4 shadow-sm">
						<div className="mb-2 text-2xl">🔐</div>
						<h3 className="text-gray-900 mb-1 font-semibold">Secure</h3>
						<p className="text-gray-600 text-sm">Your keys never leave your wallet</p>
					</div>
					<div className="border-gray-200 rounded-lg border bg-white p-4 shadow-sm">
						<div className="mb-2 text-2xl">⚡</div>
						<h3 className="text-gray-900 mb-1 font-semibold">Fast</h3>
						<p className="text-gray-600 text-sm">Connect in seconds with one click</p>
					</div>
					<div className="border-gray-200 rounded-lg border bg-white p-4 shadow-sm">
						<div className="mb-2 text-2xl">🌐</div>
						<h3 className="text-gray-900 mb-1 font-semibold">Multi-chain</h3>
						<p className="text-gray-600 text-sm">Switch between networks easily</p>
					</div>
				</div>
			</div>
		</main>
	)
}
