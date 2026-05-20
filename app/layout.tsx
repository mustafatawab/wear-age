import type { Metadata } from 'next'
import { Syne, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/app/context/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wear Age — Engineered for the Modern Era',
  description: 'Premium menswear where architectural precision meets everyday comfort. Curated collections designed for those who lead.',
  openGraph: {
    title: 'Wear Age — Premium Fashion',
    description: 'Engineered for the modern era',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable}`}>
      <body className="antialiased bg-background text-foreground flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
