import type { CSSProperties } from "react";
import { audience } from "../content";
import type { AssetIcon } from "./Icon";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";

export function Audience() {
  return (
    <section id="audience" className="bg-sage2 px-(--page-x) py-(--section-y)">
      <div className="flex flex-col gap-12">
        <div className="flex items-end gap-25 max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-6">
          <div className="flex flex-[0_0_800px] max-w-[65%] flex-col gap-5.5 max-[961px]:max-w-full max-[961px]:flex-none">
            <Eyebrow tone="green">{audience.eyebrow}</Eyebrow>
            <LoraHeading size="50">
              {audience.heading[0]}
              <br />
              {audience.heading[1]}
            </LoraHeading>
          </div>
          <p className="flex-1 text-[16px] leading-[1.7] text-moss">{audience.body}</p>
        </div>

        <div className="grid grid-cols-3 gap-10.5 max-[961px]:grid-cols-1">
          {audience.cases.map((item, i) => (
            <div
              key={item.label}
              className="audience-case reveal flex flex-col gap-5.5 border-t border-hairline pt-6"
              style={i ? ({ "--delay": `${i * 80}ms` } as CSSProperties) : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-forest">{item.label}</span>
                <Icon name={item.icon as AssetIcon} size={22} />
              </div>
              <h3 className="font-serif text-[clamp(1.4rem,2.4vw,28px)] font-normal leading-[1.25] text-ink">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-moss">{item.body}</p>
              <p className="text-[10px] text-forest">{item.tags}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
