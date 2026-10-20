import { how } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import {
  ArrowDownLeft24,
  CheckCheck,
  CircleCheck18,
  CornerDownRight19,
} from '@/components/marketing/ui/Icons'

export default function HowItWorks() {
  return (
    <section className="how-section" id="how">
      <div className="how-inner">
        <div className="how-intro">
          <div className="how-title-col">
            <p className="eyebrow eyebrow-muted">{how.eyebrow}</p>
            <h2 className="lora-heading lora-50 lora-light">
              {how.heading[0]}
              <br />
              {how.heading[1]}
            </h2>
          </div>
          <p className="how-desc">{how.description}</p>
        </div>

        <div className="how-steps">
          {/* Step 01 — detect */}
          <Reveal className="how-step" as="div">
            <div className="step-index">
              <span className="step-num">{how.steps[0].num}</span>
              <span className="step-rule" aria-hidden="true" />
            </div>
            <div className="step-illustration">
              <div className="step-card">
                <ArrowDownLeft24 />
                <div className="step-card-text">
                  <span className="step-card-amount">
                    {how.steps[0].card.amount}
                  </span>
                  <span className="step-card-label">
                    {how.steps[0].card.label}
                  </span>
                </div>
                <CircleCheck18 />
              </div>
            </div>
            <h3 className="step-title">{how.steps[0].title}</h3>
            <p className="step-desc">{how.steps[0].desc}</p>
          </Reveal>

          {/* Step 02 — rules */}
          <Reveal className="how-step" as="div" delay={80}>
            <div className="step-index">
              <span className="step-num">{how.steps[1].num}</span>
              <span className="step-rule" aria-hidden="true" />
            </div>
            <div className="step-illustration">
              <div className="step-card step-card-rule">
                <div className="rule-row">
                  <span className="rule-if">{how.steps[1].card.ifLabel}</span>
                  <span className="rule-condition">
                    {how.steps[1].card.ifValue}
                  </span>
                </div>
                <div className="rule-sep" aria-hidden="true" />
                <div className="rule-row">
                  <span className="rule-then">{how.steps[1].card.thenLabel}</span>
                  <span className="rule-action">
                    {how.steps[1].card.thenValue}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="step-title">{how.steps[1].title}</h3>
            <p className="step-desc">{how.steps[1].desc}</p>
          </Reveal>

          {/* Step 03 — sync */}
          <Reveal className="how-step" as="div" delay={160}>
            <div className="step-index">
              <span className="step-num">{how.steps[2].num}</span>
              <span className="step-rule" aria-hidden="true" />
            </div>
            <div className="step-illustration">
              <div className="step-card">
                <CheckCheck />
                <div className="step-card-text">
                  <span className="step-card-amount">
                    {how.steps[2].card.amount}
                  </span>
                  <span className="step-card-label">
                    {how.steps[2].card.label}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="step-title">{how.steps[2].title}</h3>
            <p className="step-desc">{how.steps[2].desc}</p>
          </Reveal>
        </div>

        <div className="how-exception">
          <CornerDownRight19 />
          <p>{how.exception}</p>
        </div>
      </div>
    </section>
  )
}
