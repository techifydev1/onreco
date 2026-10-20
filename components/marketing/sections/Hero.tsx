import { hero } from '@/components/marketing/content'
import { ArrowUpRight } from '@/components/marketing/ui/Icons'
import HeroDemo from './HeroDemo'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <p className="eyebrow">{hero.eyebrow}</p>

        <div className="hero-body">
          <h1 className="hero-headline">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>
          <div className="hero-side">
            <p className="hero-sub">{hero.description}</p>
            <div className="hero-actions">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
                <ArrowUpRight width={14} height={14} />
              </a>
              <a href={hero.secondaryCta.href} className="hero-ghost-link">
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <div className="demo-area">
          <div className="demo-caption">
            <span className="demo-caption-label">{hero.demoCaption}</span>
            <span className="demo-caption-note">{hero.sampleNote}</span>
          </div>
          <HeroDemo />
        </div>

        <div className="hero-assurance">
          <span>{hero.assurance[0]}</span>
          <span className="hero-assurance-em">{hero.assurance[1]}</span>
        </div>
      </div>
    </section>
  )
}
