import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: '2WebP — Video to Animated WebP Converter',
  description: 'Convert video to lightweight animated WebP images — instantly, in your browser. No uploads. No tracking. Just fast, private WebP conversion with smart defaults.',
  keywords: ['webp', 'video converter', 'animated webp', 'gif alternative', 'web performance', 'image optimization'],
  authors: [{ name: '2WebP' }],
  openGraph: {
    title: '2WebP — Video to Animated WebP Converter',
    description: 'Convert video to lightweight animated WebP — instantly, in your browser.',
    url: 'https://2webp.com',
    siteName: '2WebP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2WebP — Video to Animated WebP Converter',
    description: 'Convert video to lightweight animated WebP — instantly, in your browser.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3470675806627135"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="gradient-bg min-h-screen">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
