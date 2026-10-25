"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AppIcon } from "@/components/ui/AppIcon";
import { renewSessionTokens, verifyEmailToken } from "@/services/auth";

import { verifyConfirm as copy } from "../content";
import { VerifyShell } from "./VerifyShell";

type Status = "loading" | "success" | "error";

/** Handles the link in the verification email. */
export function VerifyConfirm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  // The verification token is single use, so the request has to happen exactly
  // once. A ref guard keeps a re-run of the effect; StrictMode double-invokes
  // it in development, from spending the token a second time.
  const requested = useRef(false);

  useEffect(() => {
    if (!token || requested.current) return;
    requested.current = true;

    (async () => {
      try {
        await verifyEmailToken(token);
        // The email-verified claim is baked into the token, so the session has
        // to be re-issued before the app unlocks the gated features.
        try {
          await renewSessionTokens();
        } catch {
          // No session on this browser; the next sign in picks up the claim.
        }
        setStatus("success");
      } catch (cause) {
        setStatus("error");
        setMessage(cause instanceof Error ? cause.message : copy.error.heading);
      }
    })();
  }, [token]);

  if (!token) {
    return (
      <VerifyShell>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-status-red-bg text-status-red-text">
            <AppIcon name="close" size={30} />
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[26px] leading-[1.2] font-normal text-ink">
              {copy.invalid.heading}
            </h1>
            <p className="text-[14px] leading-[1.6] text-moss">{copy.invalid.body}</p>
          </div>

          <Link
            href="/verify-email"
            className="inline-flex h-11 items-center justify-center gap-2 rounded bg-forest px-5 font-sans text-[13px] font-medium text-paper-card transition-[opacity] duration-200 hover:opacity-90"
          >
            <AppIcon name="refresh" size={15} />
            {copy.error.action}
          </Link>
        </div>
      </VerifyShell>
    );
  }

  if (status === "loading") {
    return (
      <VerifyShell>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-forest">
            <AppIcon name="refresh" size={30} className="animate-spin" />
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[26px] leading-[1.2] font-normal text-ink">
              {copy.loading.heading}
            </h1>
            <p className="text-[14px] leading-[1.6] text-moss">{copy.loading.body}</p>
          </div>
        </div>
      </VerifyShell>
    );
  }

  if (status === "success") {
    return (
      <VerifyShell>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-status-green-bg text-status-green-text">
            <AppIcon name="check" size={30} />
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[26px] leading-[1.2] font-normal text-ink">
              {copy.success.heading}
            </h1>
            <p className="text-[14px] leading-[1.6] text-moss">{copy.success.body}</p>
          </div>

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center gap-2 rounded bg-forest px-5 font-sans text-[13px] font-medium text-paper-card transition-[opacity] duration-200 hover:opacity-90"
          >
            {copy.success.action}
          </Link>
        </div>
      </VerifyShell>
    );
  }

  return (
    <VerifyShell>
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-status-red-bg text-status-red-text">
          <AppIcon name="close" size={30} />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-[26px] leading-[1.2] font-normal text-ink">
            {copy.error.heading}
          </h1>
          <p className="text-[14px] leading-[1.6] text-moss">{message}</p>
        </div>

        <Link
          href="/verify-email"
          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-forest px-5 font-sans text-[13px] font-medium text-paper-card transition-[opacity] duration-200 hover:opacity-90"
        >
          <AppIcon name="refresh" size={15} />
          {copy.error.action}
        </Link>
      </div>
    </VerifyShell>
  );
}
