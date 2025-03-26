import type { Metadata } from 'next'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { AppThemeProvider } from '@/components/providers/theme-provider'
import '@/styles/globals.css'

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
		<html lang="en" suppressHydrationWarning>
			<body className="flex min-h-screen flex-col bg-background antialiased">
				<AppThemeProvider>
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</AppThemeProvider>
			</body>
		</html>
	)
}
