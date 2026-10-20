import type { Metadata } from 'next'
import MarketingNav from '@/components/marketing/sections/MarketingNav'
import Hero from '@/components/marketing/sections/Hero'
import Compatibility from '@/components/marketing/sections/Compatibility'
import HowItWorks from '@/components/marketing/sections/HowItWorks'
import Rules from '@/components/marketing/sections/Rules'
import Pending from '@/components/marketing/sections/Pending'
import Integrations from '@/components/marketing/sections/Integrations'
import Pricing from '@/components/marketing/sections/Pricing'
import People from '@/components/marketing/sections/People'
import Faq from '@/components/marketing/sections/Faq'
import Cta from '@/components/marketing/sections/Cta'
import MarketingFooter from '@/components/marketing/sections/MarketingFooter'
import { seo } from '@/components/marketing/content'

const SITE_URL = `https://${
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'
}`

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    url: SITE_URL,
    siteName: 'Onreco',
    images: [
      {
        url: '/onreco_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Onreco — Stablecoin accounting for QuickBooks & Xero',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onreco | Lightweight Stablecoin Accounting, Automated',
    description: seo.description,
    images: ['/onreco_banner.jpg'],
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Onreco',
    description:
      'A lightweight stablecoin accounting tool that detects USDC and USDT transactions on Base and Solana and syncs them to QuickBooks or Xero. Your rules decide what gets recorded.',
    applicationCategory: 'BusinessApplication, FinanceApplication',
    operatingSystem: 'All',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Automated stablecoin bookkeeping',
      'Real-time transaction detection on Base and Solana',
      'Direct sync to QuickBooks and Xero',
      'Rule-based matching with pending review for exceptions',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingNav />
      <main className="grow">
        <Hero />
        <Compatibility />
        <HowItWorks />
        <Rules />
        <Pending />
        <Integrations />
        <Pricing />
        <People />
        <Faq />
        <Cta />
      </main>
      <MarketingFooter />
    </>
  )
}
