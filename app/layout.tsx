import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono, Outfit, Oxanium } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
})

const oxanium = Oxanium({ 
  subsets: ["latin"],
  variable: '--font-oxanium'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://laarainnovations.com'),
  title: {
    default: 'Laara Innovations | Drone R&D, Edutech & Software Excellence',
    template: '%s | Laara Innovations'
  },
  description: 'Leading multi-disciplinary tech startup in Vijayawada. Specializing in Drone Propeller R&D, advanced Edutech training, and premium Software Consultancy services.',
  keywords: ['Drone R&D', 'Aeronautical Engineering', 'Edutech India', 'Software Consultancy', 'Drone Propeller Research', 'Tech Training Vijayawada', 'Laara Innovations', 'SaaS Solutions', 'Robotics Research'],
  authors: [{ name: 'Laara Innovations Team' }],
  creator: 'Laara Innovations',
  publisher: 'Laara Innovations',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://laarainnovations.com',
    siteName: 'Laara Innovations',
    title: 'Laara Innovations | Engineering the Future',
    description: 'Bridging the gap between research and reality through Drone R&D, Edutech, and Software Solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Laara Innovations - Drone R&D and Software Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laara Innovations | Tech R&D and Education',
    description: 'Pioneering Drone Propeller R&D and cultivating the next generation of engineers.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

import { Toaster } from "sonner"
import { Providers } from "@/components/providers"
import { auth } from "@/auth"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${outfit.variable} ${oxanium.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Laara Innovations",
              "url": "https://laarainnovations.com",
              "logo": "https://laarainnovations.com/logo.png",
              "description": "Multi-disciplinary tech startup specializing in Drone Propeller R&D, Educational Technology, and Software Consultancy.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Vijayawada",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "521101",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "laarainnovations26@gmail.com"
              },
              "sameAs": [
                "https://www.linkedin.com/company/laara-innovations/",
                "https://www.instagram.com/laara_innovations"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers session={session}>
          {children}
          <Toaster position="top-right" richColors />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
