import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, GitMerge, ShieldCheck } from 'lucide-react'

import { auth, seo } from '@/components/marketing/content'
import { Wordmark } from '@/components/marketing/sections/MarketingNav'
import SignupForm from '@/components/auth/SignupForm'

export const metadata: Metadata = {
  title: 'Create Your Onreco Account | Stablecoin Accounting Tool',
  description:
    'Create your Onreco account to automate stablecoin accounting, transaction categorization, reconciliation, and QuickBooks or Xero synchronization for USDT and USDC.',
  keywords: seo.keywords,
  alternates: { canonical: '/signup' },
  openGraph: {
    title: 'Create Your Onreco Account | Stablecoin Accounting Tool',
    description:
      'Sign up for Onreco and automate stablecoin accounting, USDT and USDC transaction categorization, reconciliation, and QuickBooks or Xero synchronization.',
    type: 'website',
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/signup`,
    siteName: 'Onreco',
    images: [{ url: '/onreco_banner.jpg', width: 1200, height: 630, alt: 'Onreco sign up' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Onreco Account | Stablecoin Accounting Tool',
    description:
      'Sign up for Onreco and automate stablecoin accounting, USDT and USDC transaction categorization, reconciliation, and QuickBooks or Xero synchronization.',
    images: ['/onreco_banner.jpg'],
  },
}

const HIGHLIGHT_ICONS = [GitMerge, ShieldCheck]

export default function SignupPage() {
  const { panel, heading, subheading, alternate } = auth.signUp

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

        <div className="auth-highlights">
          {panel.highlights.map((hi, i) => {
            const Icon = HIGHLIGHT_ICONS[i] ?? GitMerge
            return (
              <div key={hi.title} className="auth-highlight">
                <span className="auth-stat-icon">
                  <Icon width={17} height={17} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="auth-highlight-title">{hi.title}</div>
                  <div className="auth-highlight-sub">{hi.sub}</div>
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

          <SignupForm />

          <p className="auth-alt">
            {alternate.lead} <Link href={alternate.href}>{alternate.action}</Link>
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
