import Link from 'next/link'
import { rules } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import { Check16, ChevronDown13, CircleCheck16, ConnectionIndicator } from '@/components/marketing/ui/Icons'

export default function Rules() {
  const { card } = rules
  return (
    <section className="rules-section" id="rules">
      <div className="rules-inner">
        <div className="rules-explanation">
          <p className="eyebrow eyebrow-green">{rules.eyebrow}</p>
          <h2 className="lora-heading lora-50">
            {rules.heading[0]}
            <br />
            {rules.heading[1]}
          </h2>
          <p className="body-text">{rules.description}</p>
          <ul className="rule-principles">
            {rules.principles.map((p) => (
              <li key={p}>
                <Check16 />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/#demo" className="text-link">
            {rules.tourLink}
          </Link>
        </div>

        <Reveal className="rule-builder">
          <div className="rule-builder-label">
            <span>{rules.builderLabel}</span>
            <span className="muted-label">{rules.builderNote}</span>
          </div>
          <div className="rule-card">
            <div className="rule-card-head">
              <div>
                <p className="rule-card-name">{card.name}</p>
                <p className="rule-card-desc">{card.desc}</p>
              </div>
              <span className="status-badge status-synced">
                <ConnectionIndicator />
                {card.status}
              </span>
            </div>
            <div className="rule-card-body">
              <div className="rule-field-group-header">
                <span className="condition-tag">IF</span>
                <span className="condition-label">{card.ifGroupLabel}</span>
              </div>
              <div className="rule-field-row">
                {card.fieldsIf
                  .filter((f) => !f.full)
                  .map((f) => (
                    <RuleField key={f.label} label={f.label} value={f.value} />
                  ))}
              </div>
              {card.fieldsIf
                .filter((f) => f.full)
                .map((f) => (
                  <RuleField key={f.label} label={f.label} value={f.value} />
                ))}
              <div className="rule-body-sep" aria-hidden="true" />
              <div className="rule-field-group-header">
                <span className="condition-tag">THEN</span>
                <span className="condition-label">{card.thenGroupLabel}</span>
              </div>
              <div className="rule-field-row">
                {card.fieldsThen.map((f) => (
                  <RuleField key={f.label} label={f.label} value={f.value} />
                ))}
              </div>
            </div>
            <div className="rule-card-result">
              <CircleCheck16 />
              <p>{card.result}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function RuleField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rule-field">
      <label className="rule-field-label">{label}</label>
      <div className="rule-field-val">
        <span>{value}</span>
        <ChevronDown13 />
      </div>
    </div>
  )
}
