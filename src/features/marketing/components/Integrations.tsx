import type { CSSProperties } from "react";
import { integrations } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";

export function Integrations() {
  return (
    <section id="integrations" className="px-(--page-x) pt-(--section-y) pb-22.5">
      <div className="flex flex-col gap-10.5">
        <div className="flex items-end gap-37.5 max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-6">
          <div className="flex flex-[0_0_700px] flex-col gap-5.5 max-[961px]:flex-none">
            <Eyebrow tone="green">{integrations.eyebrow}</Eyebrow>
            <LoraHeading size="50">
              {integrations.heading[0]}
              <br />
              {integrations.heading[1]}
            </LoraHeading>
          </div>
          <p className="flex-1 text-[16px] leading-[1.7] text-moss">{integrations.body}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-[961px]:grid-cols-1">
          {integrations.cards.map((card, i) => (
            <div
              key={card.name}
              className="integration-card reveal flex flex-col gap-6.5 rounded border border-hairline bg-paper-card p-7.5"
              style={i ? ({ "--delay": `${i * 80}ms` } as CSSProperties) : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="text-[29px] font-semibold text-ink">{card.name}</span>
                <span className="text-[10px] tracking-[0.06em] text-forest">{card.badge}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-serif text-[clamp(1.25rem,2vw,25px)] leading-[1.25] text-ink">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-moss">{card.body}</p>
              </div>
              <div className="flex flex-col gap-3.5 rounded bg-sage p-4.5">
                <p className="text-[9px] tracking-[0.06em] text-stone">
                  EXAMPLE MATCHED TRANSACTION
                </p>
                <div className="flex justify-between text-[12px] text-ink">
                  <span className="font-medium">{card.sample.account}</span>
                  <span>{card.sample.amount}</span>
                </div>
                <div className="flex items-center gap-1.75 text-[11px] text-forest">
                  <Icon name="check" size={13} />
                  <span>{card.sample.confirm}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
