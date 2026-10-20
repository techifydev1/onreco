import { pending } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import {
  ArrowDownLeft22,
  Pause,
  StatusIndicator,
} from '@/components/marketing/ui/Icons'

export default function Pending() {
  const { card } = pending
  return (
    <section className="pending-section">
      <div className="pending-inner">
        {/* Left: demonstration */}
        <div className="pending-demo">
          <div className="pending-demo-label">
            <span>{pending.demoLabel}</span>
            <span className="muted-label">{pending.demoNote}</span>
          </div>
          <Reveal className="pending-review-card">
            <div className="pending-review-head">
              <span className="pending-review-title">{card.title}</span>
              <span className="status-badge status-pending">
                <StatusIndicator />
                {card.status}
              </span>
            </div>
            <div className="unmatched-tx">
              <ArrowDownLeft22 />
              <div className="unmatched-tx-info">
                <span className="unmatched-tx-name">{card.txName}</span>
                <span className="unmatched-tx-meta">{card.txMeta}</span>
              </div>
              <span className="unmatched-tx-amount">{card.txAmount}</span>
            </div>
            <div className="pending-review-details">
              {card.details.map((d) => (
                <div className="review-detail-row" key={d.label}>
                  <span className="review-detail-label">{d.label}</span>
                  <span className="review-detail-val">{d.value}</span>
                </div>
              ))}
              <div className="review-detail-sep" aria-hidden="true" />
              <div className="pending-outcome">
                <Pause />
                <p>{card.outcome}</p>
              </div>
            </div>
          </Reveal>
          <div className="pending-caption">
            <span className="pending-caption-rule" aria-hidden="true" />
            <span>{pending.caption}</span>
          </div>
        </div>

        {/* Right: copy */}
        <div className="pending-copy">
          <p className="eyebrow eyebrow-green">{pending.eyebrow}</p>
          <h2 className="lora-heading lora-50">
            {pending.heading[0]}
            <br />
            {pending.heading[1]}
          </h2>
          <p className="body-text">{pending.description}</p>
          <p className="body-text body-text-sm">{pending.description2}</p>
          <div className="pending-principle">
            <p className="lora-italic">{pending.principle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
