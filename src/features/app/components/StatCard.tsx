import { cn } from "@/lib/cn";

import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

export function StatCard({
  label,
  value,
  valueSuffix,
  icon,
  delta,
  deltaLabel,
  deltaTone = "neutral",
  delay,
}: {
  label: string;
  value: string;
  valueSuffix?: string;
  icon: AppIconName;
  delta?: string;
  deltaLabel?: string;
  deltaTone?: "up" | "down" | "neutral";
  delay?: number;
}) {
  return (
    <div
      className="reveal flex flex-col gap-3.5 rounded-frame border border-hairline bg-paper-card p-5"
      style={delay ? ({ "--delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stone">
          {label}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-chip bg-sage text-forest">
          <AppIcon name={icon} size={16} />
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-[28px] leading-none font-semibold tracking-[-0.02em] tabular-nums text-ink">
          {value}
        </span>
        {valueSuffix && <span className="text-[15px] text-moss">{valueSuffix}</span>}
      </div>

      {(delta || deltaLabel) && (
        <div className="flex items-center gap-2 text-[12px]">
          {delta && (
            <span
              className={cn(
                "font-medium",
                deltaTone === "up" && "text-status-green-text",
                deltaTone === "down" && "text-status-amber-text",
                deltaTone === "neutral" && "text-moss",
              )}
            >
              {delta}
            </span>
          )}
          {deltaLabel && <span className="text-stone">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}
