"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { getTransactions } from "../api";
import { transactions as copy } from "../content";
import { formatAmount, formatDate, shortHash } from "../format";
import type { LedgerTransaction } from "../types";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppCard, StatusPill } from "./primitives";
import { AppButton, EmptyState, FilterChips, PageHeader } from "./page";

type AssetFilter = "all" | "USDC" | "USDT";
type DirectionFilter = "all" | "RECEIVED" | "SENT";

/** Build a CSV of the rows currently on screen. */
function toCsv(rows: LedgerTransaction[]): string {
  const header = [
    "Date",
    "Direction",
    "Asset",
    "Amount",
    "Wallet",
    "Account",
    "Counterparty",
    "Status",
  ];
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

  const body = rows.map((tx) =>
    [
      tx.date,
      tx.direction,
      tx.asset,
      tx.amount,
      tx.wallet,
      tx.category,
      tx.counterparty,
      tx.status,
    ]
      .map(escape)
      .join(","),
  );

  return [header.join(","), ...body].join("\n");
}

export function TransactionsPage() {
  const router = useRouter();
  const { data, error, loading, reload } = useApiData(getTransactions);

  const [asset, setAsset] = useState<AssetFilter>("all");
  const [direction, setDirection] = useState<DirectionFilter>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => data ?? [], [data]);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();

    return list.filter((tx) => {
      if (asset !== "all" && tx.asset !== asset) return false;
      if (direction !== "all" && tx.direction !== direction) return false;

      if (!term) return true;
      return [tx.counterparty, tx.wallet, tx.category, tx.asset]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term));
    });
  }, [list, asset, direction, query]);

  const count = {
    all: list.length,
    synced: list.filter((tx) => tx.status === "SYNCED").length,
    pending: list.filter((tx) => tx.status === "PENDING").length,
    failed: list.filter((tx) => tx.status === "FAILED").length,
    usdc: list.filter((tx) => tx.asset === "USDC").length,
    usdt: list.filter((tx) => tx.asset === "USDT").length,
    income: list.filter((tx) => tx.direction === "RECEIVED").length,
    expense: list.filter((tx) => tx.direction === "SENT").length,
  };

  const assetFilters = [
    { value: "all", label: copy.filters.all },
    { value: "USDC", label: copy.filters.usdc, count: count.usdc },
    { value: "USDT", label: copy.filters.usdt, count: count.usdt },
  ];

  const directionFilters = [
    { value: "all", label: copy.filters.all },
    { value: "RECEIVED", label: copy.filters.income, count: count.income },
    { value: "SENT", label: copy.filters.expense, count: count.expense },
  ];

  function exportCsv() {
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `onreco-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        actions={
          <AppButton onClick={exportCsv} disabled={rows.length === 0}>
            <AppIcon name="download" size={15} />
            {copy.exportCsv}
          </AppButton>
        }
      />

      <AppCard className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              options={assetFilters}
              value={asset}
              onChange={(value) => setAsset(value as AssetFilter)}
            />
            <FilterChips
              options={directionFilters}
              value={direction}
              onChange={(value) => setDirection(value as DirectionFilter)}
            />
          </div>

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
            title={list.length === 0 ? copy.empty.title : copy.emptyFiltered.title}
            hint={list.length === 0 ? copy.empty.hint : copy.emptyFiltered.hint}
            action={
              list.length === 0 ? (
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
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.asset}
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
                    <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">{tx.asset}</td>
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
