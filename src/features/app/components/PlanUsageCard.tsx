import { overview, PLAN_LABELS } from "../content";

import type { DashboardSummary, SubscriptionPlan, UserProfile } from "../types";
import { AppCard, CardTitle } from "./primitives";

export function PlanUsageCard({
  profile,
  plans,
  summary,
}: {
  profile: UserProfile | null;
  plans: SubscriptionPlan[];
  summary: DashboardSummary;
}) {
  const slug = profile?.plan.toLowerCase() ?? "basic";
  const plan = plans.find((p) => p.slug.toLowerCase() === slug);
  const limit = plan?.transactionCount ?? 0;
  const used = summary.pushed30d ?? 0;
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const label = PLAN_LABELS[slug] ?? slug;
  const matchRate = Number(summary.reconciliationRate ?? 0);
  const matchPercent = Math.max(0, Math.min(100, matchRate));

  return (
    <AppCard className="flex flex-col gap-4">
      <CardTitle
        action={<span className="text-[12px] text-stone">— {label}</span>}
      >
        {overview.usage.title}
      </CardTitle>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[12px] text-moss">Entries synced (30 days)</span>
          <span className="text-[13px] font-medium tabular-nums text-ink">
            {used.toLocaleString()} / {limit.toLocaleString()}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-pill bg-sage2"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Monthly transaction usage"
        >
          <div className="h-full rounded-pill bg-forest" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-[11px] text-stone">
          {percent}% of your monthly limit · {overview.usage.resetsOn}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-hairline pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[12px] text-moss">Match rate</span>
          <span className="text-[13px] font-medium tabular-nums text-ink">
            {matchRate.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-pill bg-sage2">
          <div
            className="h-full rounded-pill bg-forest/60"
            style={{ width: `${matchPercent}%` }}
          />
        </div>
      </div>

      <p className="text-[11px] leading-[1.6] text-stone">
        {plan?.description ?? "Start free and upgrade as your bookkeeping grows."}
      </p>
    </AppCard>
  );
}
