import Link from 'next/link'
import { footer } from '@/components/marketing/content'
import { Wordmark } from './MarketingNav'

export default function MarketingFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-wordmark" aria-label="Onreco home">
              <Wordmark />
              <span>{footer.brand}</span>
            </Link>
            <p className="footer-tagline">
              {footer.promise[0]}
              <br />
              {footer.promise[1]}
            </p>
          </div>
          <div className="footer-links">
            {footer.groups.map((group) => (
              <div className="footer-link-group" key={group.label}>
                <p className="footer-group-title">{group.label}</p>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span>{footer.description}</span>
          <div className="footer-legal">
            {footer.legal.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
