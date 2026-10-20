import { audience } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'
import { BookOpen, Briefcase, Calculator } from '@/components/marketing/ui/Icons'

const icons = {
  calculator: Calculator,
  book: BookOpen,
  briefcase: Briefcase,
}

export default function People() {
  return (
    <section className="audience-section" id="audience">
      <div className="audience-inner">
        <div className="audience-intro">
          <div className="audience-title-col">
            <p className="eyebrow eyebrow-green">{audience.eyebrow}</p>
            <h2 className="lora-heading lora-50">
              {audience.heading[0]}
              <br />
              {audience.heading[1]}
            </h2>
          </div>
          <p className="body-text">{audience.description}</p>
        </div>

        <div className="audience-cases">
          {audience.cases.map((c, i) => {
            const Icon = icons[c.icon]
            return (
              <Reveal key={c.label} className="audience-case" delay={i * 80}>
                <div className="audience-case-head">
                  <span className="audience-label">{c.label}</span>
                  <Icon />
                </div>
                <h3 className="lora-heading lora-28">{c.heading}</h3>
                <p className="body-text-sm">{c.body}</p>
                <p className="audience-tags">{c.tags}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
