"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { getTransactions } from "../api";
import { transactions as copy } from "../content";
import { formatAmount, formatDate, shortHash } from "../format";
import type { LedgerTransaction, SyncStatus } from "../types";
import { AppIcon } from "./AppIcon";
import { AppCard, StatusPill } from "./primitives";
import { AppButton, EmptyState, Figure, FilterChips, PageHeader } from "./page";

type Filter = "all" | "synced" | "pending" | "failed";

export function TransactionsPage() {
  const router = useRouter();
  const { data, error, loading, reload } = useApiData(getTransactions);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const list = data ?? [];
    const term = query.trim().toLowerCase();

    return list.filter((tx) => {
      const status = String(tx.status).toUpperCase() as SyncStatus;
      if (filter === "synced" && status !== "SYNCED") return false;
      if (filter === "pending" && status !== "PENDING") return false;
      if (filter === "failed" && status !== "FAILED") return false;

      if (!term) return true;
      return [tx.counterparty, tx.wallet, tx.category, tx.asset]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term));
    });
  }, [data, filter, query]);

  const totals = useMemo(() => {
    const list = data ?? [];
    const sum = (predicate: (tx: LedgerTransaction) => boolean) =>
      list.filter(predicate).reduce((acc, tx) => acc + Number(tx.amount ?? 0), 0);

    return {
      received: sum((tx) => tx.direction === "RECEIVED"),
      sent: sum((tx) => tx.direction === "SENT"),
      synced: list.filter((tx) => tx.status === "SYNCED").length,
      pending: list.filter((tx) => tx.status === "PENDING").length,
    };
  }, [data]);

  const filters: Array<{ value: string; label: string; count?: number }> = [
    { value: "all", label: copy.filters.all, count: data?.length },
    {
      value: "synced",
      label: copy.filters.synced,
      count: data?.filter((tx) => tx.status === "SYNCED").length,
    },
    {
      value: "pending",
      label: copy.filters.pending,
      count: data?.filter((tx) => tx.status === "PENDING").length,
    },
    {
      value: "failed",
      label: copy.filters.failed,
      count: data?.filter((tx) => tx.status === "FAILED").length,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <AppCard className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterChips
            options={filters}
            value={filter}
            onChange={(value) => setFilter(value as Filter)}
          />

          <div className="relative min-w-56 flex-1 sm:max-w-72">
            <AppIcon
              name="search"
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchPlaceholder}
              className="h-10 w-full rounded border border-hairline-strong bg-paper-card pr-3 pl-9 text-[13px] text-ink placeholder:text-stone outline-none transition-colors duration-200 focus:border-forest focus:ring-2 focus:ring-forest/12"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 border-t border-hairline pt-4">
          <Figure label={copy.summary.received} value={formatAmount(totals.received)} tone="positive" />
          <Figure label={copy.summary.sent} value={formatAmount(totals.sent)} />
          <Figure label={copy.summary.synced} value={totals.synced.toLocaleString()} />
          <Figure
            label={copy.summary.pending}
            value={totals.pending.toLocaleString()}
            tone={totals.pending > 0 ? "warning" : "default"}
          />
        </div>
      </AppCard>

      {error ? (
        <AppCard>
          <EmptyState
            icon="pause"
            title={error}
            action={
              <AppButton onClick={reload}>
                <AppIcon name="refresh" size={15} />
                Try again
              </AppButton>
            }
          />
        </AppCard>
      ) : loading ? (
        <AppCard className="h-64 animate-pulse bg-sage2" />
      ) : rows.length === 0 ? (
        <AppCard>
          <EmptyState
            icon="transactions"
            title={(data?.length ?? 0) === 0 ? copy.empty.title : copy.emptyFiltered.title}
            hint={(data?.length ?? 0) === 0 ? copy.empty.hint : copy.emptyFiltered.hint}
            action={
              (data?.length ?? 0) === 0 ? (
                <AppButton variant="primary" onClick={() => router.push("/app/wallets")}>
                  <AppIcon name="plus" size={15} />
                  Add a wallet
                </AppButton>
              ) : undefined
            }
          />
        </AppCard>
      ) : (
        <AppCard padded={false} className="flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-[10px] uppercase tracking-[0.06em] text-stone">
                  <th scope="col" className="px-5 py-3 font-medium">
                    {copy.columns.date}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.transaction}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.wallet}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.account}
                  </th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">
                    {copy.columns.amount}
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    {copy.columns.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-hairline last:border-b-0 transition-colors duration-200 hover:bg-sage/60"
                  >
                    <td className="px-5 py-3 text-[12px] whitespace-nowrap text-moss">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-ink">
                          {tx.direction === "RECEIVED" ? "Received" : "Sent"} {tx.asset}
                        </span>
                        <span className="text-[11px] text-stone">{shortHash(tx.counterparty)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">{tx.wallet}</td>
                    <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">{tx.category}</td>
                    <td className="px-3 py-3 text-right text-[13px] font-medium whitespace-nowrap tabular-nums text-ink">
                      {tx.direction === "RECEIVED" ? "+" : "−"}
                      {formatAmount(Number(tx.amount ?? 0)).replace("-", "")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppCard>
      )}
    </div>
  );
}
