import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import StoreProvider from '@/components/providers/store-provider'
import WagmiProviders from '@/components/providers/wagmi-providers'
import '@/styles/globals.css'
import '@flavioespinoza/salsa-ui/dist/index.css'

const inter = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'], // Light (300), Regular (400), Medium (500), Bold (700)
	variable: '--font-inter'
})

export const metadata: Metadata = {
	title: 'Flavio Espinoza | Portfolio',
	description:
		'Senior Frontend Engineer specializing in React, TypeScript, and AI-powered interfaces.',
	metadataBase: new URL('https://my-portfolio.vercel.app'),
	icons: {
		icon: '/favicon.ico'
	},
	openGraph: {
		title: 'Flavio Espinoza | Portfolio',
		description:
			'Senior Frontend Engineer specializing in React, TypeScript, and AI-powered interfaces.',
		type: 'website',
		locale: 'en_US',
		url: '/',
		siteName: 'Flavio Espinoza Portfolio',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Flavio Espinoza Portfolio'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Flavio Espinoza | Portfolio',
		description:
			'Senior Frontend Engineer specializing in React, TypeScript, and AI-powered interfaces.',
		images: ['/og-image.png'],
		creator: '@flavioespinoza'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: 'Flavio Espinoza',
							email: 'mailto:flavio.espinoza@gmail.com',
							url: 'https://my-portfolio.vercel.app',
							sameAs: [
								'https://github.com/flavioespinoza',
								'https://linkedin.com/in/flavioespinoza'
							],
							jobTitle: 'Senior Frontend Developer',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Salt Lake City',
								addressRegion: 'UT',
								addressCountry: 'US'
							},
							alumniOf: {
								'@type': 'EducationalOrganization',
								name: 'University of Utah'
							},
							worksFor: {
								'@type': 'Organization',
								name: 'Bless Network'
							},
							hasOccupation: {
								'@type': 'Occupation',
								name: 'Frontend Engineer',
								skills: [
									'React',
									'Next.js',
									'TypeScript',
									'Tailwind CSS',
									'D3.js',
									'OpenAI API',
									'Zustand',
									'Zod',
									'Vercel'
								]
							},
							description:
								'Senior full-stack engineer with 11+ years of experience delivering responsive, performant, and accessible UI with React, TypeScript, and modern frameworks. Recent focus on LLM-powered applications using GPT-4o and D3.js for real-time visualization.'
						})
					}}
				/>
			</head>
			<body className={`${inter.variable} flex min-h-screen flex-col bg-[#808a78] antialiased`}>
				<WagmiProviders>
					<StoreProvider>
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</StoreProvider>
				</WagmiProviders>
			</body>
		</html>
	)
}
