import { rules } from "../content";
import { Eyebrow, LoraHeading, TextLink } from "./primitives";
import { Icon } from "./Icon";

export function Rules() {
  return (
    <section className="border-t border-hairline px-(--page-x) py-(--section-y)">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-17.5 max-[961px]:grid-cols-1 max-[961px]:gap-12">
        <div className="flex flex-col gap-6">
          <Eyebrow>{rules.eyebrow}</Eyebrow>
          <LoraHeading size="50">
            {rules.heading[0]}
            <br />
            {rules.heading[1]}
          </LoraHeading>
          <p className="max-w-120 text-[15px] leading-[1.75] text-moss">{rules.body}</p>
          <ul className="flex flex-col gap-3.5 pt-2">
            {rules.principles.map((principle) => (
              <li key={principle} className="flex items-center gap-2.5">
                <Icon name="check" size={15} />
                <span className="text-[14px] text-ink">{principle}</span>
              </li>
            ))}
          </ul>
          <TextLink href="#demo" className="pt-2">
            {rules.link}
          </TextLink>
        </div>

        <RuleBuilder />
      </div>
    </section>
  );
}

function RuleBuilder() {
  const { builder } = rules;
  return (
    <div className="rule-builder reveal flex flex-col gap-4 rounded-frame bg-paper-warm p-3 shadow-[0_18px_50px_-8px_rgba(36,60,48,0.07)]">
      <div className="flex items-center justify-between px-2 pt-1">
        <span className="text-[10px] font-semibold tracking-[0.05em] text-stone">{builder.label}</span>
        <span className="text-[10px] text-stone">{builder.note}</span>
      </div>

      <div className="flex flex-col gap-4 rounded-card border border-hairline bg-paper-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.25">
            <span className="text-[17px] font-medium text-ink">{builder.name}</span>
            <span className="text-[12px] text-moss">{builder.desc}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded bg-status-green-bg px-2.25 py-1.5 text-[11px] font-medium text-status-green-text">
            <Icon name="connection-indicator" size={5} />
            {builder.badge}
          </span>
        </div>

        <RuleBlock tag={builder.if.tag} label={builder.if.label} fields={builder.if.fields} />
        <div className="flex justify-center">
          <Icon name="corner-down-right" size={16} />
        </div>
        <RuleBlock tag={builder.then.tag} label={builder.then.label} fields={builder.then.fields} />

        <div className="flex items-center gap-2 border-t border-hairline pt-4">
          <Icon name="circle-check" size={15} />
          <span className="text-[12px] text-moss">{builder.result}</span>
        </div>
      </div>
    </div>
  );
}

function RuleBlock({
  tag,
  label,
  fields,
}: {
  tag: string;
  label: string;
  fields: { label: string; value: string; full?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-3.5 rounded-chip bg-sage p-4.25">
      <div className="flex items-center gap-2.5">
        <span className="rounded-sm bg-forest px-2 py-1 text-[10px] font-semibold tracking-[0.05em] text-paper-card">
          {tag}
        </span>
        <span className="text-[11px] text-moss">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {fields.map((field) => (
          <div
            key={field.label}
            className={`flex flex-col gap-1.5 ${field.full ? "col-span-2 max-[700px]:col-span-1" : ""}`}
          >
            <span className="text-[10px] text-stone">{field.label}</span>
            <span className="rounded border border-hairline bg-paper-card px-2.75 py-2.25 text-[12px] text-ink">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
