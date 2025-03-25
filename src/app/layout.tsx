import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next/document'

export const metadata: Metadata = {
  title: 'Flavio Espinoza | Portfolio',
  description: 'Frontend + AI Projects, Commit Tracker, and Visual Demos'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
