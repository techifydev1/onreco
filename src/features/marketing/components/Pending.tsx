import { pending } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";

export function Pending() {
  return (
    <section className="bg-paper-warm px-(--page-x) py-(--section-y)">
      <div className="flex items-center gap-26 max-[961px]:flex-col max-[961px]:gap-12">
        <div className="pending-review-card reveal flex flex-[0_0_692px] flex-col gap-4.25 max-[961px]:flex-none">
          <div className="flex justify-between text-[10px] text-moss">
            <span>{pending.label}</span>
            <span>{pending.note}</span>
          </div>

          <div className="overflow-hidden rounded-frame border border-hairline bg-paper-card">
            <div className="flex items-center justify-between p-6">
              <span className="text-[19px] font-medium text-ink">{pending.title}</span>
              <span className="inline-flex items-center gap-1.5 rounded bg-status-amber-bg px-2.25 py-1.5 text-[11px] font-medium text-status-amber-text">
                <Icon name="status-indicator" size={5} />
                {pending.badge}
              </span>
            </div>

            <div className="flex items-center gap-3.75 bg-sand px-6 py-4.5">
              <Icon name="arrow-down-left-2" size={22} />
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-[13px] font-medium text-ink">{pending.tx.name}</span>
                <span className="text-[11px] text-moss">{pending.tx.meta}</span>
              </div>
              <span className="whitespace-nowrap text-[18px] text-ink">{pending.tx.amount}</span>
            </div>

            <div className="flex flex-col gap-4.75 p-6">
              {pending.details.map((detail) => (
                <div key={detail.label} className="flex justify-between text-[12px]">
                  <span className="text-stone">{detail.label}</span>
                  <span className="text-ink">{detail.value}</span>
                </div>
              ))}
              <div className="h-px bg-hairline" aria-hidden="true" />
              <div className="flex items-center gap-3 text-[12px] leading-[1.5] text-moss">
                <Icon name="pause" size={15} />
                <p>{pending.outcome}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-hairline-strong" aria-hidden="true" />
            <span className="text-[11px] text-moss">{pending.caption}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Eyebrow tone="green">{pending.eyebrow}</Eyebrow>
          <LoraHeading size="50">
            {pending.heading[0]}
            <br />
            {pending.heading[1]}
          </LoraHeading>
          <p className="text-[16px] leading-[1.75] text-moss">{pending.body}</p>
          <p className="text-[14px] leading-[1.75] text-moss">{pending.bodySm}</p>
          <div className="flex items-center gap-2.5 border-t border-hairline pt-6">
            <p className="font-serif text-[24px] italic text-ink">{pending.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
