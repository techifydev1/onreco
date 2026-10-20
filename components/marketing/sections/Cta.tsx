import { cta } from '@/components/marketing/content'
import { ArrowUpRight } from '@/components/marketing/ui/Icons'

export default function Cta() {
  return (
    <section className="cta-section" id="demo">
      <div className="cta-inner">
        <div className="cta-copy">
          <p className="eyebrow eyebrow-muted">{cta.eyebrow}</p>
          <h2 className="lora-heading lora-59 lora-light">
            {cta.heading[0]}
            <br />
            {cta.heading[1]}
          </h2>
          <p className="cta-sub">{cta.description}</p>
        </div>
        <div className="cta-action">
          <a href={cta.action.href} className="btn btn-cta">
            {cta.action.label}
            <ArrowUpRight width={16} height={16} />
          </a>
          <div className="cta-note">
            {cta.context.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="cta-platforms">
            <span>{cta.platforms[0]}</span>
            <span className="cta-platform-sep" aria-hidden="true" />
            <span>{cta.platforms[1]}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
