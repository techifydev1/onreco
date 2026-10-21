import { cta } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";

export function Cta() {
  return (
    <section id="demo" data-theme="dark" className="bg-forest-deep">
      <div className="flex items-center gap-30 px-(--page-x) py-21.5 max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-12">
        <div className="flex flex-[0_0_760px] flex-col gap-6.25 max-[961px]:flex-none">
          <Eyebrow tone="muted">{cta.eyebrow}</Eyebrow>
          <LoraHeading size="59" tone="light">
            {cta.heading[0]}
            <br />
            {cta.heading[1]}
          </LoraHeading>
          <p className="text-[17px] leading-[1.65] text-dark-muted">{cta.sub}</p>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <a
            href={cta.button.href}
            className="inline-flex h-12.5 w-fit items-center gap-2 rounded bg-dark-text px-5.75 text-[14px] font-medium whitespace-nowrap text-ink transition-[opacity,transform] duration-200 hover:opacity-[0.88] hover:-translate-y-px"
          >
            {cta.button.label}
            <Icon name="arrow-up-right-2" size={16} />
          </a>
          <div className="text-[13px] leading-[1.6] text-dark-muted">
            {cta.note.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[12px] text-dark-text">
            <span>{cta.platforms[0]}</span>
            <span className="h-3.25 w-px bg-dark-border" aria-hidden="true" />
            <span>{cta.platforms[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
