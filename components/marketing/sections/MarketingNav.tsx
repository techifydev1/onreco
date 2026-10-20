import Link from 'next/link'
import Image from 'next/image'
import { nav } from '@/components/marketing/content'
import { ArrowUpRight } from '@/components/marketing/ui/Icons'

// The onreco logo mark, rendered from the brand asset.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/onreco-logo.png"
      alt=""
      width={34}
      height={34}
      className={`wordmark-mark ${className}`}
      aria-hidden="true"
      priority
    />
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
