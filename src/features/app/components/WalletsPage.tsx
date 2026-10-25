"use client";

import { useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { connectWallet, deleteWallet, getDashboardSummary, getWallets } from "../api";
import { wallets as copy } from "../content";
import { formatAmount, formatDate, shortHash, timeAgo } from "../format";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppCard, ChainTag } from "./primitives";
import { AppButton, EmptyState, Figure, PageHeader } from "./page";
import { Modal, Select, TextInput } from "./form";

const CHAINS = [
  { value: "BASE", label: "Base" },
  { value: "SOLANA", label: "Solana" },
];

const CURRENCIES = ["USDC", "USDT"];

export function WalletsPage() {
  const wallets = useApiData(getWallets);
  const summary = useApiData(getDashboardSummary);

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("BASE");
  const [currencies, setCurrencies] = useState<string[]>(["USDC"]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [removing, setRemoving] = useState<string | null>(null);
  const [removingBusy, setRemovingBusy] = useState(false);

  function resetForm() {
    setLabel("");
    setAddress("");
    setChain("BASE");
    setCurrencies(["USDC"]);
    setFormError(null);
  }

  function toggleCurrency(currency: string) {
    setCurrencies((current) =>
      current.includes(currency)
        ? current.filter((item) => item !== currency)
        : [...current, currency],
    );
  }

  async function onSubmit() {
    setSaving(true);
    setFormError(null);
    try {
      await connectWallet({
        address: address.trim(),
        chain,
        monitoredCurrencies: currencies,
        label: label.trim() || undefined,
      });
      setOpen(false);
      resetForm();
      wallets.reload();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not connect the wallet.");
    } finally {
      setSaving(false);
    }
  }

  async function onRemove() {
    if (!removing) return;
    setRemovingBusy(true);
    try {
      await deleteWallet(removing);
      setRemoving(null);
      wallets.reload();
    } catch {
      setFormError("Could not remove the wallet.");
    } finally {
      setRemovingBusy(false);
    }
  }

  const list = wallets.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        actions={
          <AppButton
            variant="primary"
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            <AppIcon name="plus" size={15} />
            {copy.add}
          </AppButton>
        }
      />

      <AppCard className="flex flex-wrap gap-8">
        <Figure
          label={copy.stats.connected}
          value={(wallets.data?.length ?? 0).toLocaleString()}
        />
        <Figure
          label={copy.stats.networks}
          value={[
            ...new Set((wallets.data ?? []).map((wallet) => wallet.chain)),
          ]
            .map((chain) => (chain === "BASE" ? "Base" : chain === "SOLANA" ? "Solana" : chain))
            .join(", ") || "Not set"}
        />
        <Figure
          label={copy.stats.balance}
          value={formatAmount(Number(summary.data?.inflow30d ?? 0))}
          tone="positive"
        />
        <Figure
          label={copy.stats.inReview}
          value={(summary.data?.pendingSync ?? 0).toLocaleString()}
          tone={(summary.data?.pendingSync ?? 0) > 0 ? "warning" : "default"}
        />
      </AppCard>

      {wallets.error ? (
        <AppCard>
          <EmptyState
            icon="pause"
            title={wallets.error}
            action={
              <AppButton onClick={wallets.reload}>
                <AppIcon name="refresh" size={15} />
                Try again
              </AppButton>
            }
          />
        </AppCard>
      ) : wallets.loading ? (
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          <AppCard className="h-48 animate-pulse bg-sage2" />
          <AppCard className="h-48 animate-pulse bg-sage2" />
        </div>
      ) : list.length === 0 ? (
        <AppCard>
          <EmptyState
            icon="wallets"
            title={copy.empty.title}
            hint={copy.empty.hint}
            action={
              <AppButton
                variant="primary"
                onClick={() => {
                  resetForm();
                  setOpen(true);
                }}
              >
                <AppIcon name="plus" size={15} />
                {copy.add}
              </AppButton>
            }
          />
        </AppCard>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {list.map((wallet) => (
            <AppCard key={wallet.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[19px] font-normal text-ink">
                    {wallet.label || "Unnamed wallet"}
                  </span>
                  <ChainTag chain={wallet.chain} />
                </div>
                <span
                  className={
                    wallet.active
                      ? "inline-flex items-center rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                      : "inline-flex items-center rounded-sm bg-sage2 px-2 py-1 text-[11px] font-medium text-moss"
                  }
                >
                  {wallet.active ? "Active" : "Paused"}
                </span>
              </div>

              <div className="rounded bg-sage p-3.5">
                <span className="block font-mono text-[13px] break-all text-ink">
                  {wallet.address}
                </span>
                <span className="mt-1.5 block text-[11px] text-stone">
                  {shortHash(wallet.address)}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-[12px] text-moss">
                <div className="flex items-center justify-between gap-3">
                  <span>{copy.card.monitor}</span>
                  <span className="flex items-center gap-1.5">
                    {wallet.monitoredCurrencies?.map((currency) => (
                      <span
                        key={currency}
                        className="rounded-sm bg-paper-card px-2 py-0.5 text-[11px] font-medium text-ink"
                      >
                        {currency}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Activity</span>
                  <span className="tabular-nums">{copy.card.transactions(wallet.transactionCount30d)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Last sync</span>
                  <span>
                    {wallet.lastSyncAt
                      ? copy.card.lastSync(timeAgo(wallet.lastSyncAt))
                      : copy.card.never}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Added</span>
                  <span>{formatDate(wallet.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/app/transactions"
                  className="text-[12px] font-medium text-forest transition-opacity duration-200 hover:opacity-75"
                >
                  {copy.card.viewActivity} →
                </a>
                <button
                  type="button"
                  onClick={() => setRemoving(wallet.id)}
                  className="text-[11px] font-medium text-status-red-text transition-opacity duration-200 hover:opacity-70"
                >
                  {copy.card.remove}
                </button>
              </div>
            </AppCard>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={copy.form.title}
        subtitle={copy.form.subtitle}
        footer={
          <>
            <AppButton onClick={() => setOpen(false)}>{copy.form.cancel}</AppButton>
            <AppButton
              variant="primary"
              onClick={onSubmit}
              disabled={saving || !address.trim() || currencies.length === 0}
            >
              {saving ? "Connecting…" : copy.form.submit}
            </AppButton>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          {formError && (
            <p className="rounded border border-status-amber-text/25 bg-status-amber-bg px-3.5 py-2.5 text-[13px] text-status-amber-text">
              {formError}
            </p>
          )}

          <TextInput
            id="wallet-label"
            label={copy.form.label}
            value={label}
            onChange={setLabel}
            placeholder={copy.form.labelPlaceholder}
          />

          <TextInput
            id="wallet-address"
            label={copy.form.address}
            value={address}
            onChange={setAddress}
            placeholder={copy.form.addressPlaceholder}
          />

          <Select
            id="wallet-chain"
            label={copy.form.chain}
            value={chain}
            options={CHAINS}
            onChange={setChain}
          />

          <fieldset className="flex flex-col gap-2">
            <legend className="text-[13px] font-medium text-ink">{copy.form.currency}</legend>
            <div className="flex flex-wrap gap-2">
              {CURRENCIES.map((currency) => {
                const checked = currencies.includes(currency);
                return (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => toggleCurrency(currency)}
                    aria-pressed={checked}
                    className={
                      checked
                        ? "rounded border border-forest bg-sage2 px-3 py-1.5 text-[12px] font-medium text-forest"
                        : "rounded border border-hairline-strong bg-paper-card px-3 py-1.5 text-[12px] text-moss transition-colors duration-200 hover:bg-sage"
                    }
                  >
                    {currency}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </Modal>

      <Modal
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title={copy.card.remove}
        subtitle="We stop watching this address. Past transactions stay in your ledger."
        footer={
          <>
            <AppButton onClick={() => setRemoving(null)}>{copy.form.cancel}</AppButton>
            <AppButton variant="primary" onClick={onRemove} disabled={removingBusy}>
              {removingBusy ? "Removing…" : copy.card.remove}
            </AppButton>
          </>
        }
      >
        <p className="text-[13px] leading-[1.6] text-moss">This cannot be undone.</p>
      </Modal>
    </div>
  );
}
