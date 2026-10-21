import { compat } from "../content";
import { Icon } from "./Icon";

export function CompatStrip() {
  return (
    <section className="border-y border-hairline bg-paper-card">
      <div className="flex flex-wrap items-center justify-between gap-6 px-(--page-x) py-7">
        <div className="flex items-center gap-2.5">
          <Icon name="check-check" size={18} />
          <span className="max-w-105 text-[13px] text-moss">{compat.tagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-8">
            {compat.platforms.map((platform) => (
              <span key={platform} className="font-serif text-[22px] text-ink">
                {platform}
              </span>
            ))}
          </div>
          <span className="hidden h-5 w-px bg-hairline-strong min-[961px]:block" aria-hidden="true" />
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.06em] text-stone">Networks</span>
            {compat.networks.map((network) => (
              <span
                key={network}
                className="inline-flex items-center gap-1.5 rounded bg-sage2 px-2 py-1 text-[11px] text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden="true" />
                {network}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
