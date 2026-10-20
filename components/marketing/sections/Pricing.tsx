import SubscriptionService, {
  type SubscriptionPlan,
} from '@/services/SubscriptionService'
import { pricing } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import { Check16 } from '@/components/marketing/ui/Icons'
import PricingButton from './PricingButton'

const formatPrice = (price: number) =>
  price === 0 ? '$0' : `$${Number.isInteger(price) ? price : price.toFixed(2)}`

export default async function Pricing() {
  let plans: SubscriptionPlan[] = []
  try {
    plans = await SubscriptionService.getPlans()
  } catch {
    plans = []
  }
  if (!plans.length) plans = pricing.fallbackPlans

  const highlightedSlug = pricing.highlightedSlug

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-inner">
        <div className="pricing-intro">
          <div className="pricing-title-col">
            <p className="eyebrow eyebrow-green">{pricing.eyebrow}</p>
            <h2 className="lora-heading lora-50">
              {pricing.heading[0]}
              <br />
              {pricing.heading[1]}
            </h2>
          </div>
          <p className="pricing-desc">{pricing.description}</p>
        </div>

        <div className="pricing-cards">
          {plans.map((plan, i) => {
            const highlighted = plan.slug === highlightedSlug
            const transactionLabel =
              plan.transactionCount === 1 ? 'transaction' : 'transactions'
            return (
              <Reveal
                key={plan.slug}
                className={`pricing-card ${
                  highlighted ? 'pricing-card-featured' : ''
                }`}
                delay={i * 80}
              >
                {highlighted && (
                  <span className="pricing-badge">{pricing.mostPopular}</span>
                )}
                <div>
                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <p className="pricing-card-desc">{plan.description}</p>
                </div>

                <div className="pricing-price">
                  <span className="pricing-amount">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="pricing-period">{pricing.perMonth}</span>
                </div>

                <p className="pricing-feature">
                  <Check16 />
                  <span>
                    <strong>{plan.transactionCount.toLocaleString()}</strong>{' '}
                    {transactionLabel} per month
                  </span>
                </p>

                <PricingButton plan={plan} highlighted={highlighted} />
              </Reveal>
            )
          })}
        </div>

        <p className="pricing-note">{pricing.note}</p>
      </div>
    </section>
  )
}
