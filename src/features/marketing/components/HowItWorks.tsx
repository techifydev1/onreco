import type { CSSProperties } from "react";
import { howItWorks } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";

export function HowItWorks() {
  return (
    <section
      id="how"
      data-theme="dark"
      className="bg-forest-deep text-dark-text"
    >
      <div className="flex flex-col gap-13 px-(--page-x) py-21">
        <div className="flex items-end gap-45 max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-8">
          <div className="flex flex-[0_0_700px] flex-col gap-5.5 max-[961px]:flex-none">
            <Eyebrow tone="muted">{howItWorks.eyebrow}</Eyebrow>
            <LoraHeading size="50" tone="light">
              {howItWorks.heading[0]}
              <br />
              {howItWorks.heading[1]}
            </LoraHeading>
          </div>
          <p className="flex-1 text-[16px] leading-[1.65] text-dark-muted">{howItWorks.desc}</p>
        </div>

        <div className="grid grid-cols-3 gap-12 max-[961px]:grid-cols-1">
          {howItWorks.steps.map((step, i) => (
            <article
              key={step.num}
              className="how-step reveal flex flex-col gap-5.75"
              style={i ? ({ "--delay": `${i * 80}ms` } as CSSProperties) : undefined}
            >
              <div className="flex items-center gap-3.5">
                <span className="shrink-0 text-[12px] text-dark-muted">{step.num}</span>
                <span className="h-px flex-1 bg-dark-border" aria-hidden="true" />
              </div>
              <div className="flex h-32 flex-col justify-center">
                <StepCard card={step.card} />
              </div>
              <h3 className="font-serif text-[clamp(1.4rem,2.2vw,29px)] font-normal leading-[1.2] text-dark-text">
                {step.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-dark-muted">{step.desc}</p>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-dark-border pt-6">
          <Icon name="pause" size={14} />
          <p className="text-[14px] text-dark-text">{howItWorks.exception}</p>
        </div>
      </div>
    </section>
  );
}

function StepCard({ card }: { card: (typeof howItWorks)["steps"][number]["card"] }) {
  if (card.kind === "detect") {
    return (
      <div className="flex items-center gap-3.5 rounded bg-dark-text p-5">
        <Icon name="arrow-down-left" size={22} />
        <div className="flex flex-1 flex-col gap-1.75">
          <span className="text-[18px] text-ink">{card.amount}</span>
          <span className="text-[11px] text-moss">{card.label}</span>
        </div>
      </div>
    );
  }

  if (card.kind === "rule") {
    return (
      <div className="flex flex-col gap-3.25 rounded bg-dark-text p-4.5">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 text-[10px] text-stone">IF</span>
          <span className="text-[12px] text-ink">{card.condition}</span>
        </div>
        <div className="h-px bg-hairline" aria-hidden="true" />
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 text-[10px] text-stone">THEN</span>
          <span className="text-[12px] font-medium text-forest">{card.action}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3.5 rounded bg-dark-text p-5">
      <Icon name="circle-check" size={22} />
      <div className="flex flex-1 flex-col gap-1.75">
        <span className="text-[18px] text-ink">{card.amount}</span>
        <span className="text-[11px] text-moss">{card.label}</span>
      </div>
    </div>
  );
}
