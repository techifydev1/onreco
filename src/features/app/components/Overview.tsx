"use client";

import { getDashboardSummary, getPlans, getUserProfile } from "../api";
import { overview } from "../content";
import { formatAmount, formatPercent } from "../format";
import { useApiData } from "@/lib/useApiData";
import { ActivityChart } from "./ActivityChart";
import { AppIcon } from "./AppIcon";
import { OverviewError } from "./OverviewError";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { PlanUsageCard } from "./PlanUsageCard";
import { RecentActivity } from "./RecentActivity";
import { StatCard } from "./StatCard";
import { SyncStatusCard } from "./SyncStatusCard";
import { WalletList } from "./WalletList";
import { AppCard, CardTitle } from "./primitives";

export function Overview() {
  const summary = useApiData(getDashboardSummary);
  const profile = useApiData(getUserProfile);
  const plans = useApiData(getPlans);

  if (summary.loading) return <OverviewSkeleton />;
  if (summary.error || !summary.data) {
    return (
      <OverviewError
        message={summary.error ?? "We could not load your dashboard."}
        onRetry={summary.reload}
      />
    );
  }

  const data = summary.data;
  const inflowChange = Number(data.inflowChange ?? 0);
  const outflowChange = Number(data.outflowChange ?? 0);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
            {overview.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal leading-[1.1] text-ink">
            {overview.title}
          </h1>
          <p className="max-w-120 text-[14px] leading-[1.6] text-moss">{overview.subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5">
          {overview.actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={
                action.primary
                  ? "inline-flex h-10 items-center gap-2 rounded bg-forest px-4 text-[13px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-90"
                  : "inline-flex h-10 items-center gap-2 rounded border border-hairline-strong bg-paper-card px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
              }
            >
              <AppIcon name={action.icon as "refresh" | "plus"} size={15} />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
        <StatCard
          label={overview.stats[0].label}
          icon="arrow-down-left"
          value={formatAmount(Number(data.inflow30d ?? 0))}
          delta={formatPercent(inflowChange)}
          deltaLabel="vs previous 30 days"
          deltaTone={inflowChange >= 0 ? "up" : "down"}
          delay={0}
        />
        <StatCard
          label={overview.stats[1].label}
          icon="arrow-up-right"
          value={formatAmount(Number(data.outflow30d ?? 0))}
          delta={formatPercent(outflowChange)}
          deltaLabel="vs previous 30 days"
          deltaTone={outflowChange >= 0 ? "down" : "up"}
          delay={80}
        />
        <StatCard
          label={overview.stats[2].label}
          icon="circle-check"
          value={(data.pushed30d ?? 0).toLocaleString()}
          delta={`${Number(data.reconciliationRate ?? 0).toFixed(1)}%`}
          deltaLabel="match rate"
          deltaTone="up"
          delay={160}
        />
        <StatCard
          label={overview.stats[3].label}
          icon="pause"
          value={(data.pendingSync ?? 0).toLocaleString()}
          deltaLabel="no matching rule yet"
          deltaTone="neutral"
          delay={240}
        />
      </div>

      {/* ── Chart + side column ─────────────────────────── */}
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 max-[1100px]:grid-cols-1">
        <AppCard className="flex flex-col gap-5">
          <CardTitle
            action={
              <div className="flex items-center gap-1 rounded-pill bg-sage p-1">
                {overview.chart.periods.map((period) => (
                  <span
                    key={period}
                    className={
                      period === overview.chart.activePeriod
                        ? "rounded-pill bg-paper-card px-2.5 py-1 text-[11px] font-medium text-ink"
                        : "px-2.5 py-1 text-[11px] text-moss"
                    }
                  >
                    {period}
                  </span>
                ))}
              </div>
            }
          >
            {overview.chart.title}
          </CardTitle>

          <ActivityChart data={data.activityChart ?? []} />
        </AppCard>

        <div className="flex flex-col gap-4">
          <PlanUsageCard profile={profile.data} plans={plans.data ?? []} summary={data} />
          <SyncStatusCard integrations={data.integrations ?? []} />
        </div>
      </div>

      {/* ── Recent activity + wallets ───────────────────── */}
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 max-[1100px]:grid-cols-1">
        <RecentActivity transactions={data.recentTransactions ?? []} />
        <WalletList wallets={data.connectedWallets ?? []} />
      </div>
    </div>
  );
}
