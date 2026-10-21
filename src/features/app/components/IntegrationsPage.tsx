"use client";

import { useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { disconnectAccounting, getSupportedAccounting } from "../api";
import { integrations as copy } from "../content";
import { formatDate, timeAgo } from "../format";
import { AppIcon } from "./AppIcon";
import { AppCard } from "./primitives";
import { AppButton, EmptyState, PageHeader } from "./page";
import { Modal } from "./form";

export function IntegrationsPage() {
  const { data, error, loading, reload } = useApiData(getSupportedAccounting);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onDisconnect() {
    if (!disconnecting) return;
    setBusy(true);
    try {
      await disconnectAccounting(disconnecting);
      setDisconnecting(null);
      reload();
    } finally {
      setBusy(false);
    }
  }

  const list = data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <AppCard className="flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-status-green-text">
          <span className="h-2 w-2 rounded-full bg-status-green-text" aria-hidden="true" />
          {copy.operational}
        </span>
        <div className="flex max-w-130 flex-col gap-1 text-right">
          <span className="text-[13px] font-medium text-ink">{copy.note.title}</span>
          <span className="text-[12px] leading-[1.6] text-moss">{copy.note.body}</span>
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
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          <AppCard className="h-52 animate-pulse bg-sage2" />
          <AppCard className="h-52 animate-pulse bg-sage2" />
        </div>
      ) : list.length === 0 ? (
        <AppCard>
          <EmptyState icon="integrations" title={copy.empty.title} hint={copy.empty.hint} />
        </AppCard>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {list.map((provider) => (
            <AppCard key={provider.slug} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[19px] font-normal text-ink">{provider.name}</span>
                  <span
                    className={
                      provider.connected
                        ? "inline-flex w-fit items-center rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                        : provider.available
                          ? "inline-flex w-fit items-center rounded-sm bg-sage2 px-2 py-1 text-[11px] font-medium text-moss"
                          : "inline-flex w-fit items-center rounded-sm bg-sand px-2 py-1 text-[11px] font-medium text-status-amber-text"
                    }
                  >
                    {provider.connected
                      ? copy.connected
                      : provider.available
                        ? copy.notConnected
                        : copy.unavailable}
                  </span>
                </div>
                {provider.picUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={provider.picUrl}
                    alt=""
                    className="h-9 w-9 rounded border border-hairline bg-paper-card object-contain p-1.5"
                  />
                )}
              </div>

              {provider.blurb && (
                <p className="text-[13px] leading-[1.6] text-moss">{provider.blurb}</p>
              )}

              <div className="flex flex-col gap-2 border-t border-hairline pt-4 text-[12px] text-moss">
                {provider.connected ? (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span>Status</span>
                      <span>{copy.since(formatDate(provider.connectedAt))}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Last sync</span>
                      <span>
                        {provider.connectedAt
                          ? copy.lastSync(timeAgo(provider.connectedAt))
                          : copy.neverSynced}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-[12px] leading-[1.6] text-stone">
                    Connect to start syncing matched transactions.
                  </p>
                )}
              </div>

              {provider.available &&
                (provider.connected ? (
                  <button
                    type="button"
                    onClick={() => setDisconnecting(provider.slug)}
                    className="self-start text-[12px] font-medium text-status-red-text transition-opacity duration-200 hover:opacity-70"
                  >
                    {copy.disconnect}
                  </button>
                ) : (
                  <a
                    href={`/api/integration/${provider.slug}/connect`}
                    className="inline-flex h-10 w-fit items-center gap-2 rounded bg-forest px-4 text-[13px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-90"
                  >
                    <AppIcon name="plus" size={15} />
                    {copy.connect}
                  </a>
                ))}
            </AppCard>
          ))}
        </div>
      )}

      <Modal
        open={disconnecting !== null}
        onClose={() => setDisconnecting(null)}
        title={copy.disconnect}
        subtitle="Syncing stops immediately. Entries already pushed stay in your books."
        footer={
          <>
            <AppButton onClick={() => setDisconnecting(null)}>Cancel</AppButton>
            <AppButton variant="primary" onClick={onDisconnect} disabled={busy}>
              {busy ? "Disconnecting…" : copy.disconnect}
            </AppButton>
          </>
        }
      >
        <p className="text-[13px] leading-[1.6] text-moss">
          You can reconnect at any time without losing your rules.
        </p>
      </Modal>
    </div>
  );
}
