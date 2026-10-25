"use client";

import Link from "next/link";

import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { useApiData } from "@/lib/useApiData";
import { type AdminOverview, type DailyCount, type NamedCount, fetchAdminOverview } from "../api";
import {
  type ReferralRecent,
  type ReferralSummary,
  fetchReferralRecent,
  fetchReferralSummary,
} from "../api";

const number = new Intl.NumberFormat("en-US");

const percent = (value: number) => `${Math.round(value * 100)}%`;

const dayLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

const share = (value: number, total: number) => (total === 0 ? "0%" : percent(value / total));

function Stat({ label, value, icon, hint }: { label: string; value: string; icon: AppIconName; hint?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-frame border border-hairline bg-paper-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stone">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-chip bg-sage text-forest">
          <AppIcon name={icon} size={16} />
        </span>
      </div>
      <span className="text-[28px] leading-none font-semibold tracking-[-0.02em] tabular-nums text-ink">
        {value}
      </span>
      {hint && <span className="text-[12px] text-stone">{hint}</span>}
    </div>
  );
}

function Panel({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-frame border border-hairline bg-paper-card p-5 ${className ?? ""}`}>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
        {meta && <span className="text-[12px] text-stone">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

function Bars({ data }: { data: DailyCount[] }) {
  const max = Math.max(1, ...data.map((point) => point.count));
  const hasData = data.some((point) => point.count > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-36 items-end gap-[3px]">
        {data.map((point) => (
          <div
            key={point.date}
            className="group relative flex h-full flex-1 items-end"
            title={`${dayLabel(point.date)}: ${number.format(point.count)}`}
          >
            <div
              className="w-full rounded-t-[2px] bg-forest/80 transition-colors group-hover:bg-forest"
              style={{ height: `${Math.max(point.count === 0 ? 1.5 : (point.count / max) * 100, 1.5)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-stone">
        <span>{dayLabel(data[0]?.date ?? "")}</span>
        {!hasData && <span>No entries in this window</span>}
        <span>{dayLabel(data[data.length - 1]?.date ?? "")}</span>
      </div>
    </div>
  );
}

function Table({ rows, empty }: { rows: NamedCount[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-[13px] text-stone">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-hairline">
      {rows.map((row) => (
        <li key={row.name} className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
          <span className="truncate text-[13px] text-moss">{row.name}</span>
          <span className="shrink-0 text-[13px] font-medium tabular-nums text-ink">{number.format(row.count)}</span>
        </li>
      ))}
    </ul>
  );
}

function Funnel({ data }: { data: AdminOverview }) {
  const total = data.users.total;
  const stages = [
    { label: "Signed up", value: total, icon: "user" as AppIconName },
    { label: "Verified email", value: data.users.verified, icon: "mail" as AppIconName },
    { label: "Added a wallet", value: data.activation.withWallet, icon: "wallet" as AppIconName },
    { label: "Created a rule", value: data.activation.withActiveRule, icon: "rules" as AppIconName },
    { label: "Connected books", value: data.activation.withConnection, icon: "integrations" as AppIconName },
    { label: "Synced an entry", value: data.activation.withSyncedEntry, icon: "circle-check" as AppIconName },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {stages.map((stage, index) => (
        <div key={stage.label} className="flex items-center gap-3 rounded-frame border border-hairline bg-paper p-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-sage text-forest">
            <AppIcon name={stage.icon} size={16} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] text-stone">{stage.label}</p>
            <p className="text-[16px] font-semibold tabular-nums text-ink">
              {number.format(stage.value)}
              <span className="ml-2 text-[12px] font-normal text-stone">{share(stage.value, total)}</span>
            </p>
          </div>
          <span className="ml-auto text-[11px] font-medium text-stone">0{index + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function AdminDashboard() {
  const { data, error, loading, reload } = useApiData<AdminOverview>(fetchAdminOverview);
  const { data: referralSummary, loading: referralLoading } = useApiData<ReferralSummary>(
    fetchReferralSummary,
    "summary"
  );
  const { data: referralRecent } = useApiData<ReferralRecent[]>(fetchReferralRecent, "recent");

  const denied = error && data === null && (error.includes("access") || error.includes("Forbidden"));

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-hairline bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-baseline gap-3">
            <Link href={"/"} className="font-serif text-[22px] leading-none text-ink">
              Onreco
            </Link>
            <span className="rounded-sm bg-sage px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-forest">
              Admin
            </span>
          </div>
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center gap-2 rounded-chip border border-hairline bg-paper-card px-3 py-2 text-[12px] font-medium text-moss transition-colors hover:text-ink"
          >
            <AppIcon name="refresh" size={14} />
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 lg:px-8 lg:py-9">
        {loading && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((key) => (
              <div key={key} className="h-32 animate-pulse rounded-frame border border-hairline bg-paper-card" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-frame border border-hairline bg-paper-card p-8 text-center">
            <p className="text-[15px] font-medium text-ink">
              {denied ? "This account is not on the admin allowlist." : error}
            </p>
            <p className="mt-1 text-[13px] text-stone">
              {denied
                ? "Sign in with an allowlisted email, or add one to ADMIN_EMAILS."
                : "The backend may be restarting. Try again in a moment."}
            </p>
          </div>
        )}

        {data && (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat
                label="Users"
                value={number.format(data.users.total)}
                icon="user"
                hint={`${number.format(data.users.new7d)} in 7d · ${number.format(data.users.new30d)} in 30d`}
              />
              <Stat
                label="MRR"
                value={`$${number.format(data.billing.mrr)}`}
                icon="credit-card"
                hint={`${number.format(data.billing.active)} active · ${number.format(data.billing.pastDue)} past due`}
              />
              <Stat
                label="Entries (30d)"
                value={number.format(data.transactions.last30d)}
                icon="transactions"
                hint={`${number.format(data.transactions.total)} all time · ${number.format(data.transactions.last7d)} in 7d`}
              />
              <Stat
                label="Sync success"
                value={percent(data.transactions.syncSuccessRate30d)}
                icon="circle-check"
                hint="Synced vs failed, last 30 days"
              />
              <Stat
                label="Referrals (30d)"
                value={number.format(referralSummary?.total ?? 0)}
                icon="search"
                hint={referralLoading ? "Loading…" : `Sources: ${Object.keys(referralSummary?.sources ?? {}).length}`}
              />
            </div>

            <Panel title="Activation" meta="Distinct users">
              <Funnel data={data} />
            </Panel>

            <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
              <Panel title="New users" meta="Last 30 days">
                <Bars data={data.users.signups} />
              </Panel>
              <Panel title="Journal entries" meta="Last 30 days">
                <Bars data={data.transactions.series30d} />
              </Panel>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <Panel title="Review status" meta="All time">
                <Table rows={data.transactions.byStatus} empty="No entries yet" />
              </Panel>
              <Panel title="Direction" meta="All time">
                <Table rows={data.transactions.byType} empty="No entries yet" />
              </Panel>
              <Panel title="Currency" meta="All time">
                <Table rows={data.transactions.byCurrency} empty="No entries yet" />
              </Panel>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <Panel title="Networks" meta="All time">
                <Table rows={data.transactions.byChain} empty="No entries yet" />
              </Panel>
              <Panel title="Books connected" meta={`${number.format(data.integrations.total)} active`}>
                <Table
                  rows={[
                    { name: "QuickBooks", count: data.integrations.quickbooks },
                    { name: "Xero", count: data.integrations.xero },
                  ]}
                  empty="No connections yet"
                />
              </Panel>
              <Panel title="Plans" meta={`$${number.format(data.billing.mrr)} MRR`}>
                <Table rows={data.billing.byPlan} empty="No active subscriptions" />
              </Panel>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <Panel title="Top rules" meta="Matches in 30 days">
                <Table rows={data.rules.topRules30d} empty="No rule matches in this window" />
              </Panel>
              <Panel title="Top sync errors" meta="Last 30 days">
                {data.transactions.topErrors30d.length === 0 ? (
                  <p className="text-[13px] text-stone">No failures in this window</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {data.transactions.topErrors30d.map((row) => (
                      <li key={row.name} className="flex items-start justify-between gap-4">
                        <span className="text-[12px] leading-[1.5] break-words text-moss">{row.name}</span>
                        <span className="shrink-0 text-[12px] font-medium tabular-nums text-ink">
                          {number.format(row.count)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <Panel title="Top referral sources" meta="Last 30 days">
                {referralSummary?.sources && Object.keys(referralSummary.sources).length > 0 ? (
                  <Table
                    rows={Object.entries(referralSummary.sources)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([name, count]) => ({ name, count }))}
                    empty="No referral sources yet"
                  />
                ) : (
                  <p className="text-[13px] text-stone">No referral sources yet</p>
                )}
              </Panel>
              <Panel title="Recent referrals" meta="Last 30 days">
                {referralRecent && referralRecent.length > 0 ? (
                  <ul className="divide-y divide-hairline">
                    {referralRecent.map((r, i) => (
                      <li key={`referral-${i}`} className="py-2 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <span className="text-[12px] text-moss">
                              {r.utm_source ?? "(direct)"}
                              {r.utm_campaign ? ` · ${r.utm_campaign}` : ""}
                            </span>
                            <span className="text-[11px] text-stone block">
                              {r.referral_page}
                            </span>
                          </div>
                          <span className="shrink-0 text-[12px] font-medium tabular-nums text-ink">
                            {r.visited_at ? new Date(r.visited_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              timeZone: "UTC",
                            }) : "–"}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-stone">No referrals yet</p>
                )}
              </Panel>
            </div>

            <p className="pb-4 text-[11px] text-stone">
              Wallets: {number.format(data.wallets.active)} active of {number.format(data.wallets.total)} · Rules:{" "}
              {number.format(data.rules.active)} active of {number.format(data.rules.total)} · Updated{" "}
              {new Date(data.generatedAt).toLocaleString("en-US")}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
