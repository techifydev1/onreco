"use client";

import Link from "next/link";
import { useState } from "react";

import { AppIcon } from "@/components/ui/AppIcon";
import { sendVerificationEmail } from "@/services/auth";

import { verifyEmail as copy } from "../content";
import { AuthNotice } from "./primitives";
import { VerifyShell } from "./VerifyShell";

/** "Check your email" screen, shown right after signing up. */
export function VerifyEmailScreen() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onResend() {
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      await sendVerificationEmail();
      setSent(true);
    } catch {
      setError(copy.failed);
    } finally {
      setSending(false);
    }
  }

  return (
    <VerifyShell>
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-forest">
          <AppIcon name="mail" size={30} />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-[26px] leading-[1.2] font-normal text-ink">
            {copy.heading}
          </h1>
          <p className="text-[14px] leading-[1.6] text-moss">{copy.body}</p>
        </div>

        <p className="w-full rounded border border-hairline bg-sage px-4 py-3 text-[12px] leading-[1.5] text-moss">
          {copy.expiry}
        </p>

        {error && <AuthNotice>{error}</AuthNotice>}
        {sent && !error && <AuthNotice tone="info">{copy.sent}</AuthNotice>}

        <button
          type="button"
          onClick={onResend}
          disabled={sending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-forest px-5 font-sans text-[13px] font-medium text-paper-card transition-[opacity] duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <AppIcon
            name="refresh"
            size={15}
            className={sending ? "animate-spin" : undefined}
          />
          {sending ? copy.sending : copy.resend}
        </button>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[12px] text-moss transition-colors duration-200 hover:text-ink"
        >
          <AppIcon name="arrow-left" size={14} />
          {copy.backToLogin}
        </Link>
      </div>
    </VerifyShell>
  );
}
