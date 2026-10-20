'use client'

import Link from 'next/link'
import { useState } from 'react'
import { initializeCheckout } from '@/components/landing-page/PlanCheckoutButton'
import { useToastStore } from '@/providers/toast-provider'
import type { SubscriptionPlan } from '@/services/SubscriptionService'

// Marketing-scoped pricing button. Reuses the shared checkout initialiser so
// billing behaviour is identical, but renders with the landing design system.
export default function PricingButton({
  plan,
  highlighted,
}: {
  plan: SubscriptionPlan
  highlighted: boolean
}) {
  const [pending, setPending] = useState(false)
  const { show } = useToastStore()
  const className = `pricing-cta ${highlighted ? 'pricing-cta-primary' : ''}`

  if (plan.price === 0) {
    return (
      <Link href="/signup" className={className}>
        Get started free
      </Link>
    )
  }

  const handleChoose = async () => {
    if (pending) return
    setPending(true)
    try {
      await initializeCheckout(plan.slug)
    } catch (err) {
      show(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
        'error'
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleChoose}
      disabled={pending}
      className={className}
    >
      {pending ? 'Opening checkout…' : `Choose ${plan.name}`}
    </button>
  )
}
