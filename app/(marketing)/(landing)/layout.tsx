import { ReactNode } from 'react'
import '@/components/marketing/marketing.css'
import MarketingInteractions from '@/components/marketing/ui/MarketingInteractions'

// The marketing route group is fully isolated from the dashboard/dark shell.
// `mk` applies the scoped landing design system (see marketing.css).
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="marketing" className="mk min-h-screen">
      <MarketingInteractions />
      {children}
    </div>
  )
}
