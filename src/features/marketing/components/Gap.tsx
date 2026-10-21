import { gap } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";

export function Gap() {
  return (
    <section className="px-(--page-x) py-(--section-y)">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-17.5 max-[961px]:grid-cols-1 max-[961px]:gap-9">
        <div className="flex flex-col gap-6">
          <Eyebrow>{gap.eyebrow}</Eyebrow>
          <LoraHeading size="50">
            {gap.heading[0]}
            <br />
            {gap.heading[1]}
          </LoraHeading>
        </div>
        <div className="flex flex-col gap-5.5 pt-1.5">
          {gap.body.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-[1.75] text-moss">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
