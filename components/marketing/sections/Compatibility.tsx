import { compat, gap } from '@/components/marketing/content'

// Section 2 — compatibility strip + the editorial "accounting gap" block.
export default function Compatibility() {
  return (
    <>
      <section
        className="compat-strip"
        aria-label="Compatible accounting platforms"
      >
        <div className="compat-strip-inner">
          <p className="compat-tagline">{compat.tagline}</p>
          <div className="compat-platforms">
            <span className="compat-platform-name">{compat.platforms[0]}</span>
            <span className="compat-divider" aria-hidden="true" />
            <span className="compat-platform-name compat-xero">
              {compat.platforms[1]}
            </span>
          </div>
        </div>
      </section>

      <section className="compat-networks" aria-label="Supported networks">
        <div className="compat-networks-inner">
          <span className="compat-networks-label">{compat.networks.label}</span>
          {compat.networks.items.map((network) => (
            <span key={network} className="compat-network-chip">
              {network}
            </span>
          ))}
        </div>
      </section>

      <section className="gap-section">
        <div className="gap-inner">
          <div className="gap-editorial">
            <p className="eyebrow eyebrow-green">{gap.eyebrow}</p>
            <h2 className="lora-heading lora-50">
              {gap.heading[0]}
              <br />
              {gap.heading[1]}
            </h2>
          </div>
          <div className="gap-body">
            {gap.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="gap-networks-note">{gap.networksNote}</p>
          </div>
        </div>
      </section>
    </>
  )
}
