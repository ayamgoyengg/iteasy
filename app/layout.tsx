import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { PageLoader } from '@/components/PageLoader'
import { EdgeAccent } from '@/components/EdgeAccent'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ITEASY — Design & Development Studio',
  description: 'Crafting Outstanding Digital Experiences | Design & Development Studio based in Surabaya, Indonesia',
  keywords: 'design studio, web development, UI/UX, digital experiences, Surabaya, Indonesia',
  authors: [{ name: 'ITEASY Studio' }],
  icons: {
    icon: '/assets/logoonly.png',
    apple: '/assets/logoonly.png',
  },
  openGraph: {
    title: 'ITEASY — Design & Development Studio',
    description: 'Crafting Outstanding Digital Experiences',
    url: 'https://iteasy.co',
    siteName: 'ITEASY',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <meta name="theme-color" content="#0CC0DF" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} bg-background text-foreground overflow-x-hidden font-body`}>
        <EdgeAccent />
        <PageLoader />
        <ScrollProgress />
        <Navbar />
        <main className="w-full overflow-x-hidden relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
