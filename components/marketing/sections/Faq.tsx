import { faq } from '@/components/marketing/content'
import Reveal from '@/components/marketing/ui/Reveal'

export default function Faq() {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-intro">
          <p className="eyebrow eyebrow-green">{faq.eyebrow}</p>
          <h2 className="lora-heading lora-50">
            {faq.heading[0]}
            <br />
            {faq.heading[1]}
          </h2>
          <p className="body-text">{faq.description}</p>
          <a href={faq.invitation.href} className="text-link">
            {faq.invitation.label}
          </a>
        </div>
        <div className="faq-list">
          {faq.items.map((item) => (
            <Reveal key={item.q} className="faq-item">
              <h3 className="faq-q">{item.q}</h3>
              <p className="faq-a">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
