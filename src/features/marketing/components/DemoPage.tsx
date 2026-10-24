import { demoPage } from "../content";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Icon } from "./Icon";
import { Eyebrow, LoraHeading } from "./primitives";
import { DemoPlayer } from "./DemoPlayer";
import { ScrollReveal } from "./ScrollReveal";

export function DemoPage() {
  return (
    <div className="bg-paper">
      <Nav hrefPrefix="/" />
      <main>
        <section id="tour" className="pt-24">
          <div className="flex flex-col gap-9.5 px-(--page-x) pt-17 pb-16">
            <Eyebrow>{demoPage.eyebrow}</Eyebrow>

            <div className="flex w-full flex-col items-start gap-6 min-[1201px]:flex-row min-[1201px]:items-end min-[1201px]:gap-17.5">
              <LoraHeading
                size="50"
                as="h1"
                className="hero-entrance w-full min-[1201px]:w-[min(760px,58%)] min-[1201px]:flex-none"
              >
                {demoPage.heading[0]}
                <br />
                {demoPage.heading[1]}
              </LoraHeading>

              <div className="flex flex-1 flex-col gap-5.75 pb-0.75">
                <p className="max-w-[46ch] text-[16px] leading-[1.65] text-moss">{demoPage.sub}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-moss">
                  {demoPage.meta.map((item, i) => (
                    <span key={item} className="flex items-center gap-4">
                      {i > 0 && <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <DemoPlayer />
          </div>
        </section>

        <section data-theme="dark" className="bg-forest-deep text-dark-text">
          <div className="grid grid-cols-3 gap-x-12 gap-y-10 px-(--page-x) py-18 max-[961px]:grid-cols-1">
            {demoPage.highlights.map((item, i) => (
              <article
                key={item.title}
                className="reveal flex flex-col gap-4"
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded bg-dark-text text-ink">
                  <Icon name={item.icon} size={18} />
                </div>
                <h2 className="font-serif text-[clamp(1.25rem,2vw,25px)] font-normal leading-[1.2] text-dark-text">
                  {item.title}
                </h2>
                <p className="max-w-[38ch] text-[14px] leading-[1.6] text-dark-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-paper">
          <div className="flex flex-col gap-8 px-(--page-x) py-21 max-[961px]:py-16">
            <div className="flex flex-col gap-5.5">
              <Eyebrow>{demoPage.cta.eyebrow}</Eyebrow>
              <LoraHeading size="50">
                {demoPage.cta.heading[0]}
                <br />
                {demoPage.cta.heading[1]}
              </LoraHeading>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={demoPage.cta.primary.href}
                className="inline-flex h-12.5 items-center gap-2 rounded bg-forest px-5.75 text-[14px] font-medium whitespace-nowrap text-paper-card transition-[opacity] duration-200 hover:opacity-[0.88]"
              >
                {demoPage.cta.primary.label}
                <Icon name="arrow-up-right" size={14} />
              </a>
              <a
                href={demoPage.cta.secondary.href}
                className="inline-flex h-12.5 items-center gap-2 rounded border border-hairline-strong bg-paper-card px-5.75 text-[14px] font-medium whitespace-nowrap text-ink transition-[opacity] duration-200 hover:opacity-[0.88]"
              >
                {demoPage.cta.secondary.label}
                <Icon name="arrow-up-right-2" size={15} />
              </a>
            </div>

            <p className="max-w-[62ch] text-[15px] leading-[1.65] text-moss">{demoPage.cta.sub}</p>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}
