import Link from 'next/link'
import { nav } from '@/components/marketing/content'
import { ArrowUpRight } from '@/components/marketing/ui/Icons'

// The onreco reconciliation mark: three "ledger strokes" of differing heights.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark-mark ${className}`} aria-hidden="true">
      <span className="mark-stroke mark-s1" />
      <span className="mark-stroke mark-s2" />
      <span className="mark-stroke mark-s3" />
    </span>
  )
}

export default function MarketingNav() {
  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Onreco home">
          <Wordmark />
          <span className="nav-logo-text">{nav.brand}</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link"
              data-secondary={link.secondary ? 'true' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={nav.cta.href} className="nav-cta">
          {nav.cta.label}
          <ArrowUpRight width={14} height={14} />
        </Link>
      </div>
    </header>
  )
}
