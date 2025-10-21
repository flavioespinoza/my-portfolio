/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		domains: ['https://ai-multi-agent-backend-production.up.railway.app']
	},
	experimental: {
		serverActions: {
			allowedOrigins: ['https://ai-multi-agent-backend-production.up.railway.app']
		}
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
				]
			}
		]
	}
}

module.exports = nextConfig
