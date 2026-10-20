import { integrations } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import { Check13 } from '@/components/marketing/ui/Icons'

export default function Integrations() {
  return (
    <section className="integrations-section" id="integrations">
      <div className="integrations-inner">
        <div className="integrations-intro">
          <div className="integrations-title-col">
            <p className="eyebrow eyebrow-green">{integrations.eyebrow}</p>
            <h2 className="lora-heading lora-50">
              {integrations.heading[0]}
              <br />
              {integrations.heading[1]}
            </h2>
          </div>
          <p className="body-text">{integrations.description}</p>
        </div>

        <div className="integrations-cards">
          {integrations.cards.map((card, i) => (
            <Reveal
              key={card.name}
              className="integration-card"
              delay={i * 80}
            >
              <div className="integration-head">
                <span className="integration-name">{card.name}</span>
                <span className="integration-badge">{card.badge}</span>
              </div>
              <div className="integration-body">
                <h3 className="lora-heading lora-25">{card.heading}</h3>
                <p>{card.body}</p>
              </div>
              <div className="integration-sample">
                <p className="integration-sample-label">{card.sampleLabel}</p>
                <div className="integration-sample-entry">
                  <span className="integration-entry-account">
                    {card.account}
                  </span>
                  <span className="integration-entry-amount">{card.amount}</span>
                </div>
                <div className="integration-sample-confirm">
                  <Check13 />
                  <span>{card.confirm}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
