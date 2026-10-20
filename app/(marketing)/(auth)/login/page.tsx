import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowLeft, BarChart3, Bolt, Wallet } from 'lucide-react'

import { auth, seo } from '@/components/marketing/content'
import { Wordmark } from '@/components/marketing/sections/MarketingNav'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In | Onreco Stablecoin Accounting Tool',
  description:
    'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
  keywords: seo.keywords,
  alternates: { canonical: '/login' },
  openGraph: {
    title: 'Sign In to Onreco | Stablecoin Accounting Tool',
    description:
      'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
    type: 'website',
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/login`,
    siteName: 'Onreco',
    images: [{ url: '/onreco_banner.jpg', width: 1200, height: 630, alt: 'Onreco sign in' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In to Onreco | Stablecoin Accounting Tool',
    description:
      'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
    images: ['/onreco_banner.jpg'],
  },
  robots: { index: false, follow: true },
}

const STAT_ICONS = [Wallet, BarChart3, Bolt]

export default function LoginPage() {
  const { panel, heading, subheading, alternate } = auth.signIn

  return (
    <div className="auth-shell">
      <aside className="auth-panel">
        <div className="auth-panel-top">
          <Link href="/" className="auth-brand">
            <Wordmark />
            <span>{auth.brand}</span>
          </Link>

          <div className="auth-panel-copy">
            <p className="eyebrow">{panel.eyebrow}</p>
            <h1 className="auth-panel-heading">
              {panel.headingLead}{' '}
              <span className="serif-accent">{panel.headingAccent}</span>{' '}
              {panel.headingTail}
            </h1>
            <p className="body-text">{panel.body}</p>
          </div>
        </div>

        <div className="auth-stats">
          {panel.stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? Wallet
            return (
              <div key={stat.value} className="auth-stat">
                <span className="auth-stat-icon">
                  <Icon width={17} height={17} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="auth-stat-value">{stat.value}</div>
                  <div className="auth-stat-label">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div>
            <h2 className="auth-heading">{heading}</h2>
            <p className="auth-subheading">{subheading}</p>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <p className="auth-alt">
            {alternate.lead}{' '}
            <Link href={alternate.href}>{alternate.action}</Link>
          </p>

          <div className="auth-divider" />

          <p className="auth-agreement">
            {auth.agreement.lead}{' '}
            <Link href={auth.agreement.terms.href}>{auth.agreement.terms.label}</Link>{' '}
            {auth.agreement.and}{' '}
            <Link href={auth.agreement.privacy.href}>
              {auth.agreement.privacy.label}
            </Link>
            .<br />
            {auth.agreement.note}
          </p>

          <Link href="/" className="auth-back">
            <ArrowLeft width={15} height={15} />
            {auth.backHome}
          </Link>
        </div>
      </main>
    </div>
  )
}
