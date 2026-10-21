"use client";

import { useMemo, useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { createRule, deleteRule, getRules, getWallets } from "../api";
import { rules as copy } from "../content";
import { formatDate } from "../format";
import type { Rule, RuleInput } from "../types";
import { AppIcon } from "./AppIcon";
import { AppCard, ChainTag } from "./primitives";
import { AppButton, EmptyState, PageHeader } from "./page";
import { Modal, Select, TextInput, Toggle } from "./form";

export function RulesPage() {
  const rules = useApiData(getRules);
  const wallets = useApiData(getWallets);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [walletId, setWalletId] = useState("");
  const [direction, setDirection] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [offsetAccountId, setOffsetAccountId] = useState("");
  const [priority, setPriority] = useState("1");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [removing, setRemoving] = useState<Rule | null>(null);
  const [removingBusy, setRemovingBusy] = useState(false);

  const walletOptions = useMemo(
    () => [
      { value: "", label: copy.card.anyWallet },
      ...(wallets.data ?? []).map((wallet) => ({
        value: wallet.id,
        label: wallet.label || wallet.address,
      })),
    ],
    [wallets.data],
  );

  function resetForm() {
    setName("");
    setWalletId("");
    setDirection("");
    setCounterparty("");
    setOffsetAccountId("");
    setPriority("1");
    setActive(true);
    setFormError(null);
  }

  async function onSubmit() {
    setSaving(true);
    setFormError(null);
    try {
      await createRule({
        name: name.trim(),
        walletId: walletId || null,
        direction: (direction || null) as RuleInput["direction"],
        counterpartyAddress: counterparty.trim() || null,
        offsetAccountId: offsetAccountId.trim(),
        priority: Number(priority) || 1,
        active,
      });
      setOpen(false);
      resetForm();
      rules.reload();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not create the rule.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!removing) return;
    setRemovingBusy(true);
    try {
      await deleteRule(removing.id);
      setRemoving(null);
      rules.reload();
    } catch {
      setFormError("Could not delete the rule.");
    } finally {
      setRemovingBusy(false);
    }
  }

  const list = rules.data ?? [];

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
            {copy.newRule}
          </AppButton>
        }
      />

      {rules.error ? (
        <AppCard>
          <EmptyState
            icon="pause"
            title={rules.error}
            action={
              <AppButton onClick={rules.reload}>
                <AppIcon name="refresh" size={15} />
                Try again
              </AppButton>
            }
          />
        </AppCard>
      ) : rules.loading ? (
        <AppCard className="h-56 animate-pulse bg-sage2" />
      ) : list.length === 0 ? (
        <AppCard>
          <EmptyState
            icon="rules"
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
                {copy.newRule}
              </AppButton>
            }
          />
        </AppCard>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {list.map((rule) => (
            <AppCard key={rule.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-[19px] font-normal text-ink">{rule.name}</span>
                  <span className="text-[11px] text-stone">
                    {copy.card.priority(rule.priority)} · {rule.active ? copy.card.active : copy.card.paused}
                  </span>
                </div>
                <span
                  className={
                    rule.active
                      ? "inline-flex items-center rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                      : "inline-flex items-center rounded-sm bg-sage2 px-2 py-1 text-[11px] font-medium text-moss"
                  }
                >
                  {rule.active ? copy.card.active : copy.card.paused}
                </span>
              </div>

              <div className="flex flex-col gap-2 rounded bg-sage p-3.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-sm bg-forest px-2 py-1 text-[10px] font-semibold tracking-[0.05em] text-paper-card">
                    {copy.card.when.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-[12px] text-ink">
                    {rule.direction ? copy.card.direction[rule.direction] : copy.card.anyDirection}
                    {rule.walletLabel ? ` · ${rule.walletLabel}` : ""}
                  </span>
                </div>
                <div className="h-px bg-hairline" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span className="rounded-sm bg-forest px-2 py-1 text-[10px] font-semibold tracking-[0.05em] text-paper-card">
                    THEN
                  </span>
                  <span className="text-[12px] text-ink">{rule.offsetAccountId}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-[11px] text-stone">
                <div className="flex items-center gap-2.5">
                  {rule.walletChain && <ChainTag chain={rule.walletChain} />}
                  <span>{formatDate(rule.createdAt)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRemoving(rule)}
                  className="text-[11px] font-medium text-status-red-text transition-opacity duration-200 hover:opacity-70"
                >
                  {copy.card.delete}
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
              disabled={saving || !name.trim() || !offsetAccountId.trim()}
            >
              {saving ? "Creating…" : copy.form.submit}
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
            id="rule-name"
            label={copy.form.name}
            value={name}
            onChange={setName}
            placeholder={copy.form.namePlaceholder}
          />

          <div className="grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">
            <Select
              id="rule-wallet"
              label={copy.form.wallet}
              value={walletId}
              options={walletOptions}
              onChange={setWalletId}
            />
            <Select
              id="rule-direction"
              label={copy.form.direction}
              value={direction}
              options={[
                { value: "", label: copy.card.anyDirection },
                { value: "RECEIVED", label: copy.card.direction.RECEIVED },
                { value: "SENT", label: copy.card.direction.SENT },
              ]}
              onChange={setDirection}
            />
          </div>

          <TextInput
            id="rule-counterparty"
            label={copy.form.counterparty}
            value={counterparty}
            onChange={setCounterparty}
            placeholder={copy.form.counterpartyPlaceholder}
            hint={copy.form.counterpartyHint}
          />

          <TextInput
            id="rule-account"
            label={copy.form.account}
            value={offsetAccountId}
            onChange={setOffsetAccountId}
            placeholder={copy.form.accountPlaceholder}
            hint={copy.form.accountHint}
          />

          <div className="grid grid-cols-2 items-end gap-4 max-[620px]:grid-cols-1">
            <TextInput
              id="rule-priority"
              label={copy.form.priority}
              value={priority}
              onChange={setPriority}
              type="number"
            />
            <div className="flex items-center gap-3 pb-2.5">
              <Toggle id="rule-active" checked={active} onChange={setActive} label={copy.form.active} />
              <span className="text-[13px] text-ink">{copy.form.active}</span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title={copy.card.deleteConfirm}
        subtitle={copy.card.deleteHint}
        footer={
          <>
            <AppButton onClick={() => setRemoving(null)}>{copy.form.cancel}</AppButton>
            <AppButton variant="primary" onClick={onDelete} disabled={removingBusy}>
              {removingBusy ? "Deleting…" : copy.card.delete}
            </AppButton>
          </>
        }
      >
        <p className="text-[13px] leading-[1.6] text-moss">
          <span className="font-medium text-ink">{removing?.name}</span> will stop matching new
          transactions.
        </p>
      </Modal>
    </div>
  );
}
