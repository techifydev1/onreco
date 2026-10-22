"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useApiData } from "@/lib/useApiData";

import {
  batchSync,
  getAccountingAccounts,
  getFailedEntries,
  getPendingEntries,
  getSupportedAccounting,
  getWallets,
} from "../api";
import { categorize as copy } from "../content";
import { formatAmount, formatDayMonth, shortHash } from "../format";
import type { CategorizeEntry } from "../types";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppCard, ChainTag } from "./primitives";
import { AppButton, EmptyState, FilterChips, PageHeader } from "./page";

type Tab = "pending" | "failed";

export function CategorizePage() {
  const pending = useApiData(getPendingEntries);
  const failed = useApiData(getFailedEntries);
  const providers = useApiData(getSupportedAccounting);
  const wallets = useApiData(getWallets);

  const [tab, setTab] = useState<Tab>("pending");
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "warn"; text: string } | null>(null);

  const connected = (providers.data ?? []).find((provider) => provider.connected);
  const accounts = useApiData(
    () => (connected ? getAccountingAccounts(connected.slug) : Promise.resolve([])),
    connected?.slug,
  );

  const entries = tab === "pending" ? (pending.data ?? []) : (failed.data ?? []);

  const walletLabels = useMemo(() => {
    const map = new Map<string, string>();
    for (const wallet of wallets.data ?? []) {
      map.set(wallet.address.toLowerCase(), wallet.label || shortHash(wallet.address));
    }
    return map;
  }, [wallets.data]);

  const accountOptions = useMemo(
    () =>
      (accounts.data ?? []).map((account) => ({
        value: account.id,
        label: account.label,
      })),
    [accounts.data],
  );

  // Checked rows, and the subset of them that already have an account.
  const checkedIds = Object.keys(selected);
  const chosenIds = Object.entries(selected)
    .filter(([, account]) => Boolean(account))
    .map(([id]) => id);

  const allSelected =
    entries.length > 0 && entries.every((entry) => entry.id in selected);

  function refresh() {
    pending.reload();
    failed.reload();
    wallets.reload();
    setNotice(null);
  }

  function toggle(id: string) {
    setSelected((current) => {
      const next = { ...current };
      if (id in next) delete next[id];
      else next[id] = "";
      return next;
    });
    setNotice(null);
  }

  function setAccount(id: string, account: string) {
    setSelected((current) => ({ ...current, [id]: account }));
    setNotice(null);
  }

  function toggleAll() {
    if (allSelected) {
      setSelected({});
      return;
    }
    setSelected(Object.fromEntries(entries.map((entry) => [entry.id, selected[entry.id] ?? ""])));
  }

  async function onSync() {
    const payload = chosenIds
      .map((id) => ({ journalEntryId: id, offsetAccountId: selected[id] }))
      .filter((entry) => entry.offsetAccountId);

    if (payload.length === 0) return;

    setBusy(true);
    setNotice(null);
    try {
      const result = await batchSync(payload);
      setNotice({
        tone: result.failed > 0 ? "warn" : "ok",
        text:
          result.failed > 0
            ? `${copy.synced(result.synced)} · ${copy.failed(result.failed)}`
            : copy.synced(result.synced),
      });
      setSelected({});
      refresh();
    } catch (cause) {
      setNotice({
        tone: "warn",
        text: cause instanceof Error ? cause.message : "Could not sync the selection.",
      });
    } finally {
      setBusy(false);
    }
  }

  const tabs = [
    { value: "pending", label: copy.tabs.pending, count: (pending.data ?? []).length },
    { value: "failed", label: copy.tabs.failed, count: (failed.data ?? []).length },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        actions={
          <AppButton onClick={refresh}>
            <AppIcon name="refresh" size={15} />
            {copy.refresh}
          </AppButton>
        }
      />

      <AppCard className="flex flex-wrap items-center justify-between gap-3">
        <FilterChips options={tabs} value={tab} onChange={(value) => setTab(value as Tab)} />

        {entries.length > 0 && (
          <div className="flex items-center gap-3 text-[12px] text-moss">
            <button
              type="button"
              onClick={toggleAll}
              className="font-medium text-forest transition-opacity duration-200 hover:opacity-75"
            >
              {allSelected ? copy.clear : copy.select}
            </button>
            {checkedIds.length > 0 && <span>{copy.selected(checkedIds.length)}</span>}
          </div>
        )}
      </AppCard>

      {notice && (
        <p
          className={
            notice.tone === "ok"
              ? "rounded border border-status-green-text/25 bg-status-green-bg px-3.5 py-2.5 text-[13px] text-status-green-text"
              : "rounded border border-status-amber-text/25 bg-status-amber-bg px-3.5 py-2.5 text-[13px] text-status-amber-text"
          }
          role="status"
        >
          {notice.text}
        </p>
      )}

      {pending.loading || failed.loading ? (
        <AppCard className="h-64 animate-pulse bg-sage2" />
      ) : pending.error || failed.error ? (
        <AppCard>
          <EmptyState
            icon="pause"
            title={pending.error ?? failed.error ?? "Something went wrong."}
            action={
              <AppButton onClick={refresh}>
                <AppIcon name="refresh" size={15} />
                Try again
              </AppButton>
            }
          />
        </AppCard>
      ) : !connected ? (
        <AppCard>
          <EmptyState
            icon="integrations"
            title={copy.noProvider.title}
            hint={copy.noProvider.hint}
            action={
              <Link
                href="/app/integrations"
                className="inline-flex h-10 items-center gap-2 rounded bg-forest px-4 text-[13px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-90"
              >
                <AppIcon name="plus" size={15} />
                {copy.noProvider.action}
              </Link>
            }
          />
        </AppCard>
      ) : entries.length === 0 ? (
        <AppCard>
          <EmptyState
            icon="circle-check"
            title={tab === "pending" ? copy.empty.pending.title : copy.empty.failed.title}
            hint={tab === "pending" ? copy.empty.pending.hint : copy.empty.failed.hint}
          />
        </AppCard>
      ) : (
        <AppCard padded={false} className="flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-[10px] uppercase tracking-[0.06em] text-stone">
                  <th scope="col" className="w-10 px-4 py-3" />
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.date}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.direction}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.asset}
                  </th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">
                    {copy.columns.amount}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.chain}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.wallet}
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    {copy.columns.counterparty}
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    {copy.columns.account}
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    walletLabel={walletLabels.get(entry.walletAddress?.toLowerCase() ?? "")}
                    account={selected[entry.id]}
                    options={accountOptions}
                    onToggle={() => toggle(entry.id)}
                    onAccountChange={(value) => setAccount(entry.id, value)}
                    disabled={busy}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {checkedIds.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-sage px-5 py-3.5">
              <span className="text-[12px] text-moss">{copy.selected(checkedIds.length)}</span>
              <AppButton
                variant="primary"
                onClick={onSync}
                disabled={busy || chosenIds.length === 0}
              >
                <AppIcon name="check" size={15} />
                {busy ? "Syncing…" : copy.syncSelected}
              </AppButton>
            </div>
          )}
        </AppCard>
      )}
    </div>
  );
}

function EntryRow({
  entry,
  walletLabel,
  account,
  options,
  onToggle,
  onAccountChange,
  disabled,
}: {
  entry: CategorizeEntry;
  walletLabel?: string;
  account: string | undefined;
  options: Array<{ value: string; label: string }>;
  onToggle: () => void;
  onAccountChange: (value: string) => void;
  disabled: boolean;
}) {
  const isSelected = account !== undefined;

  return (
    <tr className="border-b border-hairline last:border-b-0 transition-colors duration-200 hover:bg-sage/60">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          disabled={disabled}
          aria-label="Select transaction"
          className="h-4 w-4 accent-[#285742]"
        />
      </td>
      <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">
        {formatDayMonth(entry.txDate)}
      </td>
      <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">
        {entry.type === "RECEIVED" ? "Received" : "Sent"}
      </td>
      <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">{entry.currency}</td>
      <td className="px-3 py-3 text-right text-[13px] font-medium whitespace-nowrap tabular-nums text-ink">
        {entry.type === "RECEIVED" ? "+" : "−"}
        {formatAmount(Number(entry.amount ?? 0)).replace("-", "")}
      </td>
      <td className="px-3 py-3">
        <ChainTag chain={entry.chain} />
      </td>
      <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">
        {walletLabel ?? shortHash(entry.walletAddress)}
      </td>
      <td className="px-3 py-3 text-[12px] whitespace-nowrap text-moss">
        {shortHash(entry.counterpartyAddress)}
      </td>
      <td className="px-5 py-3">
        <select
          value={account ?? ""}
          onChange={(event) => onAccountChange(event.target.value)}
          disabled={disabled}
          aria-label={copy.columns.account}
          className="h-9 w-full min-w-44 rounded border border-hairline-strong bg-paper-card px-2.5 text-[12px] text-ink outline-none transition-colors duration-200 focus:border-forest focus:ring-2 focus:ring-forest/12 disabled:opacity-60"
        >
          <option value="">{copy.accountPlaceholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
