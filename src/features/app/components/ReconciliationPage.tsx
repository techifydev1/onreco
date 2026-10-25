"use client";

import Link from "next/link";
import { useState } from "react";

import { useApiData } from "@/lib/useApiData";

import {
  confirmMatch,
  getReconciliations,
  getSupportedAccounting,
} from "../api";
import { reconcile as copy } from "../content";
import { formatAmount, formatDayMonth, shortHash } from "../format";
import type { ReconcileMatch } from "../types";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppCard, ChainTag } from "./primitives";
import { AppButton, EmptyState, Figure, PageHeader } from "./page";

export function ReconciliationPage() {
  const providers = useApiData(getSupportedAccounting);
  const connected = (providers.data ?? []).find((provider) => provider.connected);

  // Only ask the backend to reconcile once something is connected; it needs
  // the open invoices from the accounting software to match against.
  const { data, error, loading, reload } = useApiData(
    () =>
      connected
        ? getReconciliations()
        : Promise.resolve({ matches: [], totalPending: 0, totalOpenInvoices: 0 }),
    connected?.slug ?? "none",
  );

  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "warn"; text: string } | null>(null);

  const matches = data?.matches ?? [];

  async function onConfirm(match: ReconcileMatch) {
    if (!match.invoice) return;
    setBusyId(match.journalEntryId);
    setNotice(null);
    try {
      await confirmMatch(match.journalEntryId, match.invoice.id);
      setNotice({ tone: "ok", text: copy.confirmed(1) });
      reload();
    } catch {
      setNotice({ tone: "warn", text: copy.confirmFailed });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        actions={
          <AppButton onClick={reload}>
            <AppIcon name="refresh" size={15} />
            {copy.refresh}
          </AppButton>
        }
      />

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

      {loading || providers.loading ? (
        <AppCard className="h-64 animate-pulse bg-sage2" />
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
      ) : error ? (
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
      ) : (
        <>
          <AppCard className="flex flex-wrap gap-8">
            <Figure label={copy.stats.pending} value={(data?.totalPending ?? 0).toLocaleString()} />
            <Figure
              label={copy.stats.invoices}
              value={(data?.totalOpenInvoices ?? 0).toLocaleString()}
            />
            <Figure label={copy.stats.matches} value={matches.length.toLocaleString()} />
          </AppCard>

          {matches.length === 0 ? (
            <AppCard>
              <EmptyState icon="circle-check" title={copy.empty.title} hint={copy.empty.hint} />
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
                        {copy.columns.payment}
                      </th>
                      <th scope="col" className="px-3 py-3 text-right font-medium">
                        {copy.columns.amount}
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        {copy.columns.chain}
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        {copy.columns.invoice}
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        {copy.columns.confidence}
                      </th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">
                        {copy.columns.action}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match) => (
                      <MatchRow
                        key={match.journalEntryId}
                        match={match}
                        busy={busyId === match.journalEntryId}
                        onConfirm={() => onConfirm(match)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </AppCard>
          )}
        </>
      )}
    </div>
  );
}

function confidenceTone(value: number): { label: string; className: string } {
  if (value >= 80) {
    return {
      label: copy.confidence.high,
      className: "bg-status-green-bg text-status-green-text",
    };
  }
  if (value >= 50) {
    return {
      label: copy.confidence.medium,
      className: "bg-sand text-status-amber-text",
    };
  }
  return {
    label: copy.confidence.low,
    className: "bg-sage2 text-moss",
  };
}

function MatchRow({
  match,
  busy,
  onConfirm,
}: {
  match: ReconcileMatch;
  busy: boolean;
  onConfirm: () => void;
}) {
  const tone = confidenceTone(match.confidence);

  return (
    <tr className="border-b border-hairline last:border-b-0 transition-colors duration-200 hover:bg-sage/60">
      <td className="px-5 py-3 text-[12px] whitespace-nowrap text-moss">
        {formatDayMonth(match.txDate)}
      </td>
      <td className="px-3 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-ink">
            {match.type === "RECEIVED" ? "Received" : "Sent"} {match.currency}
          </span>
          <span className="text-[11px] text-stone">{shortHash(match.txHash)}</span>
        </div>
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-medium whitespace-nowrap tabular-nums text-ink">
        {match.type === "RECEIVED" ? "+" : "−"}
        {formatAmount(Number(match.amount ?? 0)).replace("-", "")}
      </td>
      <td className="px-3 py-3">
        <ChainTag chain={match.chain} />
      </td>
      <td className="px-3 py-3">
        {match.invoice ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-medium text-ink">
              {copy.invoice.doc(match.invoice.docNumber)}
            </span>
            <span className="text-[11px] text-stone">
              {match.invoice.customerName} ·{" "}
              {copy.invoice.outstanding(Number(match.invoice.balance ?? 0))}
            </span>
          </div>
        ) : (
          <span className="text-[12px] text-stone">{copy.noInvoice}</span>
        )}
      </td>
      <td className="px-3 py-3">
        <div className="flex flex-col gap-1">
          <span
            className={`inline-flex w-fit items-center rounded-sm px-2 py-1 text-[11px] font-medium ${tone.className}`}
          >
            {match.confidence}% · {tone.label}
          </span>
        </div>
      </td>
      <td className="px-5 py-3 text-right">
        {match.invoice ? (
          <AppButton onClick={onConfirm} disabled={busy}>
            <AppIcon name="check" size={14} />
            {busy ? copy.confirming : copy.confirm}
          </AppButton>
        ) : (
          <span className="text-[12px] text-stone">·</span>
        )}
      </td>
    </tr>
  );
}
