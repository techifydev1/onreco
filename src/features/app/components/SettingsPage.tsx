"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useApiData } from "@/lib/useApiData";
import { sendVerificationEmail } from "@/services/auth";
import { AppIcon } from "@/components/ui/AppIcon";
import { useToastStore } from "@/providers/toast-provider";

import {
  createBillingPortal,
  getDashboardSummary,
  getPlans,
  getUserProfile,
  logout,
  updateProfile,
} from "../api";
import { settings as copy } from "../content";
import { formatAmount } from "../format";
import type { UserProfile } from "../types";
import { AppCard } from "./primitives";
import { AppButton, PageHeader } from "./page";
import { TextInput } from "./form";

function ProfileForm({ profile }: { profile: UserProfile }) {
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  async function onSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await updateProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
      setSaved(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  async function onSendVerification() {
    if (sendingVerification) return;
    setSendingVerification(true);
    setVerificationSent(false);
    setVerificationError(null);
    try {
      await sendVerificationEmail();
      setVerificationSent(true);
    } catch (cause) {
      setVerificationError(
        cause instanceof Error ? cause.message : copy.profile.emailSendFailed,
      );
    } finally {
      setSendingVerification(false);
    }
  }

  return (
    <AppCard id="profile" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-[20px] font-normal text-ink">{copy.profile.title}</h2>
        <p className="text-[12px] text-moss">{copy.profile.hint}</p>
      </div>

      {error && (
        <p className="rounded border border-status-amber-text/25 bg-status-amber-bg px-3.5 py-2.5 text-[13px] text-status-amber-text">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
        <TextInput
          id="settings-first-name"
          label={copy.profile.firstName}
          value={firstName}
          onChange={setFirstName}
          disabled={saving}
        />
        <TextInput
          id="settings-last-name"
          label={copy.profile.lastName}
          value={lastName}
          onChange={setLastName}
          disabled={saving}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-ink">{copy.profile.email}</span>
        <div className="flex items-center justify-between gap-3 rounded border border-hairline bg-sage px-3.5 py-2.5">
          <span className="truncate text-[13px] text-moss">{profile.email}</span>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={
                profile.emailVerified
                  ? "rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                  : "rounded-sm bg-status-amber-bg px-2 py-1 text-[11px] font-medium text-status-amber-text"
              }
            >
              {profile.emailVerified ? copy.profile.emailVerified : copy.profile.emailUnverified}
            </span>

            {!profile.emailVerified && (
              <button
                type="button"
                onClick={onSendVerification}
                disabled={sendingVerification}
                className="inline-flex h-7 items-center gap-1.5 rounded border border-hairline-strong bg-paper-card px-2.5 text-[11px] font-medium text-ink transition-colors duration-200 hover:bg-sage disabled:cursor-not-allowed disabled:opacity-60"
              >
                <AppIcon
                  name="refresh"
                  size={13}
                  className={sendingVerification ? "animate-spin" : undefined}
                />
                {sendingVerification ? copy.profile.emailSending : copy.profile.emailVerify}
              </button>
            )}
          </div>
        </div>

        {!profile.emailVerified && (
          <p className="text-[11px] leading-[1.5] text-stone">{copy.profile.emailHint}</p>
        )}

        {verificationSent && (
          <p className="flex items-center gap-1.5 text-[11px] text-status-green-text">
            <AppIcon name="check" size={13} />
            {copy.profile.emailSent}
          </p>
        )}

        {verificationError && (
          <p className="text-[11px] leading-[1.5] text-status-red-text">{verificationError}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <AppButton
          variant="primary"
          onClick={onSave}
          disabled={saving || !firstName.trim() || !lastName.trim()}
        >
          {saving ? copy.profile.saving : copy.profile.save}
        </AppButton>
        {saved && (
          <span className="flex items-center gap-1.5 text-[12px] text-status-green-text">
            <AppIcon name="check" size={14} />
            {copy.profile.saved}
          </span>
        )}
      </div>
    </AppCard>
  );
}

export function SettingsPage() {
  const router = useRouter();
  const { show } = useToastStore();
  const profile = useApiData(getUserProfile);
  const plans = useApiData(getPlans);
  const summary = useApiData(getDashboardSummary);

  const [signingOut, setSigningOut] = useState(false);
  const [openingBilling, setOpeningBilling] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function onSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch {
      setSigningOut(false);
      show(copy.session.signOutFailed, "error");
    }
  }

  async function onManageBilling() {
    if (openingBilling) return;
    setOpeningBilling(true);
    try {
      const { customerPortalUrl } = await createBillingPortal();
      window.location.assign(customerPortalUrl);
    } catch {
      setOpeningBilling(false);
      show(copy.plan.billingFailed, "error");
    }
  }

  async function onCopy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      show(copy.support.copyFailed, "error");
    }
  }

  const plan = plans.data?.find(
    (item) => item.slug.toLowerCase() === (profile.data?.plan ?? "basic").toLowerCase(),
  );
  const limit = plan?.transactionCount ?? 0;
  const used = summary.data?.pushed30d ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        {profile.data ? (
          <ProfileForm key={profile.data.id} profile={profile.data} />
        ) : (
          <AppCard className="h-96 animate-pulse bg-sage2" />
        )}

        <div className="flex flex-col gap-4">
          {/* ── Plan ─────────────────────────────────────── */}
          <AppCard className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] font-normal text-ink">{copy.plan.title}</h2>
              <p className="text-[12px] text-moss">{copy.plan.hint}</p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4">
              <span className="text-[12px] text-moss">{copy.plan.current}</span>
              <span className="text-[14px] font-medium text-ink">
                {plan?.name ?? "Basic"}
                {plan ? ` · ${formatAmount(plan.price)}/mo` : ""}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-moss">{copy.plan.limit}</span>
              <span className="text-[13px] font-medium tabular-nums text-ink">
                {limit.toLocaleString()} transactions
              </span>
            </div>

            {plan && (
              <>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-sage2">
                  <div
                    className="h-full rounded-pill bg-forest"
                    style={{ width: `${limit > 0 ? Math.min(100, (used / limit) * 100) : 0}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone">{copy.plan.usage(used, limit)}</p>
              </>
            )}

            <p className="text-[12px] leading-[1.6] text-moss">
              {plan?.description ?? "Start free and upgrade as your bookkeeping grows."}
            </p>

            <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
              <Link
                href="/#pricing"
                className="inline-flex h-10 items-center gap-2 rounded border border-hairline-strong bg-paper-card px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
              >
                <AppIcon name="bolt" size={15} />
                {copy.plan.viewPlans}
              </Link>

              <AppButton onClick={onManageBilling} disabled={openingBilling}>
                <AppIcon name="credit-card" size={15} />
                {openingBilling ? copy.plan.openingBilling : copy.plan.manageBilling}
              </AppButton>
            </div>
          </AppCard>

          {/* ── Verification ─────────────────────────────── */}
          <AppCard className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] font-normal text-ink">
                {copy.verification.title}
              </h2>
              <p className="text-[12px] text-moss">{copy.verification.hint}</p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4">
              <span className="text-[12px] text-moss">{copy.verification.email}</span>
              <span className="truncate text-[13px] text-ink">{profile.data?.email ?? "Not available"}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-moss">{copy.verification.identity}</span>
                <span className="text-[11px] text-stone">{copy.verification.identityHint}</span>
              </div>
              <span
                className={
                  profile.data?.emailVerified
                    ? "shrink-0 rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                    : "shrink-0 rounded-sm bg-sand px-2 py-1 text-[11px] font-medium text-status-amber-text"
                }
              >
                {copy.verification.verifyIdentity}
              </span>
            </div>
          </AppCard>

          {/* ── Support ───────────────────────────────────── */}
          <AppCard className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] font-normal text-ink">{copy.support.title}</h2>
              <p className="text-[12px] text-moss">{copy.support.hint}</p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <AppIcon name="mail" size={15} className="shrink-0 text-stone" />
                <span className="truncate text-[13px] text-ink">{copy.support.email.value}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => onCopy(copy.support.email.value, "email")}
                  className="text-[12px] font-medium text-forest transition-opacity duration-200 hover:opacity-75"
                >
                  {copied === "email" ? copy.support.copied : copy.support.copy}
                </button>
                <a
                  href={copy.support.email.href}
                  className="text-[12px] font-medium text-forest transition-opacity duration-200 hover:opacity-75"
                >
                  {copy.support.open}
                </a>
              </div>
            </div>

            {copy.support.channels.map((channel) => (
              <div key={channel.label} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="text-[13px] font-medium text-ink">{channel.label}</span>
                  <span className="truncate text-[12px] text-moss">{channel.value}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onCopy(channel.value, channel.label)}
                    className="text-[12px] font-medium text-forest transition-opacity duration-200 hover:opacity-75"
                  >
                    {copied === channel.label ? copy.support.copied : copy.support.copy}
                  </button>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-medium text-forest transition-opacity duration-200 hover:opacity-75"
                  >
                    {copy.support.open}
                  </a>
                </div>
              </div>
            ))}
          </AppCard>

          {/* ── Session ──────────────────────────────────── */}
          <AppCard className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] font-normal text-ink">{copy.session.title}</h2>
              <p className="text-[12px] text-moss">{copy.session.hint}</p>
            </div>
            <AppButton className="self-start" onClick={onSignOut} disabled={signingOut}>
              <AppIcon name="close" size={15} />
              {signingOut ? copy.session.signingOut : copy.session.signOut}
            </AppButton>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
