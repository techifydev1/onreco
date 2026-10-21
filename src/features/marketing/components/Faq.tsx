import { faq } from "../content";
import { Eyebrow, LoraHeading, TextLink } from "./primitives";

export function Faq() {
  return (
    <section id="faq" className="px-(--page-x) py-24">
      <div className="flex items-start gap-27.5 max-[961px]:flex-col max-[961px]:gap-15">
        <div className="flex flex-[0_0_400px] flex-col gap-6.5 max-[961px]:flex-none">
          <Eyebrow tone="green">{faq.eyebrow}</Eyebrow>
          <LoraHeading size="50">
            {faq.heading[0]}
            <br />
            {faq.heading[1]}
          </LoraHeading>
          <p className="text-[16px] leading-[1.7] text-moss">{faq.body}</p>
          <TextLink href="#demo">{faq.link}</TextLink>
        </div>

        <div className="flex flex-1 flex-col">
          {faq.items.map((item) => (
            <div key={item.q} className="faq-item reveal flex flex-col gap-3 border-t border-hairline py-5.75">
              <h3 className="text-[16px] font-medium text-ink">{item.q}</h3>
              <p className="text-[14px] leading-[1.65] text-moss">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
