"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useApiData } from "@/lib/useApiData";

import { getDashboardSummary, getPlans, getUserProfile, updateProfile } from "../api";
import { settings as copy } from "../content";
import { formatAmount } from "../format";
import type { UserProfile } from "../types";
import { AppIcon } from "./AppIcon";
import { AppCard } from "./primitives";
import { AppButton, PageHeader } from "./page";
import { TextInput } from "./form";

function ProfileForm({ profile }: { profile: UserProfile }) {
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <AppCard className="flex flex-col gap-5">
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
          <span
            className={
              profile.emailVerified
                ? "shrink-0 rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                : "shrink-0 rounded-sm bg-status-amber-bg px-2 py-1 text-[11px] font-medium text-status-amber-text"
            }
          >
            {profile.emailVerified ? copy.profile.emailVerified : copy.profile.emailUnverified}
          </span>
        </div>
        {!profile.emailVerified && (
          <p className="text-[11px] leading-[1.5] text-stone">{copy.profile.emailHint}</p>
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
  const profile = useApiData(getUserProfile);
  const plans = useApiData(getPlans);
  const summary = useApiData(getDashboardSummary);

  const [signingOut, setSigningOut] = useState(false);

  async function onSignOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "X-Client-Type": "web" },
        credentials: "include",
      });
    } finally {
      router.replace("/login");
      router.refresh();
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
              <span className="truncate text-[13px] text-ink">{profile.data?.email ?? "—"}</span>
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

          {/* ── Session ──────────────────────────────────── */}
          <AppCard className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] font-normal text-ink">{copy.session.title}</h2>
              <p className="text-[12px] text-moss">{copy.session.hint}</p>
            </div>
            <AppButton className="self-start" onClick={onSignOut} disabled={signingOut}>
              <AppIcon name="close" size={15} />
              {signingOut ? "Signing out…" : copy.session.signOut}
            </AppButton>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
