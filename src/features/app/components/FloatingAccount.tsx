"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useApiData } from "@/lib/useApiData";

import { createBillingPortal, getUserProfile, logout } from "../api";
import { account as copy, PLAN_LABELS } from "../content";
import { AppIcon } from "@/components/ui/AppIcon";
import { Modal } from "./form";
import { AppButton } from "./page";

/** Floating account chip, pinned to the top-right of the viewport. */
export function FloatingAccount() {
  const { data: profile } = useApiData(getUserProfile);

  const [open, setOpen] = useState(false);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [openingBilling, setOpeningBilling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  // Dismiss the menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!profile) {
    return <div className="fixed top-5 right-5 z-40 h-10 w-40 rounded bg-paper-card/92" />;
  }

  const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase();
  const planSlug = profile.plan?.toLowerCase() ?? "basic";
  const plan = PLAN_LABELS[planSlug] ?? planSlug;
  const fullName = `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() || "User";

  const handleManageBilling = async () => {
    if (openingBilling) return;
    setOpeningBilling(true);
    setError(null);
    try {
      const { customerPortalUrl } = await createBillingPortal();
      setOpen(false);
      window.location.assign(customerPortalUrl);
    } catch {
      setOpeningBilling(false);
      setError(copy.billingFailed);
    }
  };

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await logout();
      window.location.replace("/login");
    } catch {
      setSigningOut(false);
      setError(copy.signOutFailed);
      setConfirmingSignOut(false);
    }
  };

  return (
    <div ref={rootRef} className="fixed top-5 right-5 z-50">
      <button
        type="button"
        aria-label={copy.menuLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded border border-hairline bg-paper-card/92 py-1.5 pr-3 pl-1.5 shadow-[0_4px_14px_-8px_rgba(35,61,50,0.14)] backdrop-blur-md transition-colors duration-200 hover:bg-sage/70"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage2 text-[11px] font-semibold text-forest">
          {initials || "O"}
        </span>

        <span className="hidden min-w-0 text-left sm:block">
          <span className="block truncate text-[12px] leading-tight font-medium text-ink">
            {fullName}
          </span>
          <span className="block truncate text-[11px] leading-tight text-stone">
            {profile.email}
          </span>
        </span>

        <span className="hidden rounded-chip bg-sage px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-forest md:inline">
          {plan}
        </span>

        <AppIcon
          name="chevron-down"
          size={14}
          className={`text-stone transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={copy.menuLabel}
          className="absolute top-full right-0 mt-2 w-72 overflow-hidden rounded-frame border border-hairline bg-paper-card/96 shadow-[0_16px_36px_-22px_rgba(35,61,50,0.26)] backdrop-blur-md"
        >
          {/* Identity */}
          <div className="flex items-center gap-3 border-b border-hairline p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage2 text-[13px] font-semibold text-forest">
              {initials || "O"}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-semibold text-ink">{fullName}</span>
                <span className="shrink-0 rounded-chip bg-sage px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-forest">
                  {plan}
                </span>
              </div>
              <p className="truncate text-[12px] text-stone">{profile.email}</p>
            </div>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href="/app/settings#profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
            >
              <AppIcon name="user" size={16} className="text-stone" />
              {copy.profile}
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleManageBilling}
              disabled={openingBilling}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage disabled:opacity-60"
            >
              <AppIcon name="credit-card" size={16} className="text-stone" />
              {openingBilling ? copy.openingBilling : copy.manageBilling}
            </button>
          </div>

          {/* Sign out */}
          <div className="border-t border-hairline py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setConfirmingSignOut(true);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
            >
              <AppIcon name="log-out" size={16} className="text-stone" />
              {copy.signOut}
            </button>
          </div>

          {error && (
            <p className="border-t border-hairline px-4 py-2.5 text-[11px] leading-[1.5] text-status-red-text">
              {error}
            </p>
          )}

          {/* Footer */}
          <p className="border-t border-hairline px-4 py-2 text-[10px] font-semibold tracking-[0.08em] text-stone uppercase">
            {copy.footer}
          </p>
        </div>
      )}

      <Modal
        open={confirmingSignOut}
        onClose={() => setConfirmingSignOut(false)}
        title={copy.signOutTitle}
        footer={
          <>
            <AppButton onClick={() => setConfirmingSignOut(false)} disabled={signingOut}>
              {copy.signOutCancel}
            </AppButton>
            <AppButton variant="primary" onClick={handleSignOut} disabled={signingOut}>
              <AppIcon name="log-out" size={14} />
              {copy.signOutConfirm}
            </AppButton>
          </>
        }
      >
        <p className="text-[13px] leading-[1.6] text-moss">{copy.signOutHint}</p>
      </Modal>
    </div>
  );
}
