import { ReactNode } from 'react'
import '@/components/marketing/marketing.css'

// Auth pages share the scoped landing design system (`mk`) so sign in / sign
// up match the marketing site's forest + paper identity.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="marketing" className="mk min-h-screen">
      {children}
    </div>
  )
}
