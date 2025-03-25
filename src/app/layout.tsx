import type { Metadata } from 'next'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Flavio Espinoza | Portfolio',
	description: 'Frontend + AI Projects, Commit Tracker, and Visual Demos'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-background flex min-h-screen flex-col antialiased">
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
