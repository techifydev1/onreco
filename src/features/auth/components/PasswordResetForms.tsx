"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { requestPasswordReset, resetPassword } from "../api";
import { forgotPassword, resetPassword as resetCopy } from "../content";
import { AuthField, AuthNotice, AuthSubmit } from "./primitives";

/** Step one: ask the backend for a reset link by email. */
export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await requestPasswordReset(String(data.get("email") ?? ""));

    if (result.ok) {
      setSent(true);
      setPending(false);
      return;
    }

    setError(result.message);
    setPending(false);
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-5">
        <AuthNotice tone="info">{forgotPassword.sent}</AuthNotice>
        <Link
          href="/login"
          className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
        >
          ← {forgotPassword.backToLogin}
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      {error && <AuthNotice>{error}</AuthNotice>}

      <AuthField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        disabled={pending}
      />

      <AuthSubmit pending={pending} pendingLabel={forgotPassword.sending}>
        {forgotPassword.submit}
      </AuthSubmit>

      <Link
        href="/login"
        className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
      >
        ← {forgotPassword.backToLogin}
      </Link>
    </form>
  );
}

/** Step two: swap the password for the one carried by the emailed token. */
export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    const result = await resetPassword(token, password);

    if (result.ok) {
      setDone(true);
      setPending(false);
      return;
    }

    setError(result.message);
    setPending(false);
  }

  if (done) {
    return (
      <div className="flex flex-col gap-5">
        <AuthNotice tone="info">{resetCopy.success}</AuthNotice>
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-forest px-5.75 font-sans text-[14px] font-medium text-paper-card transition-[opacity,transform] duration-[200ms] hover:opacity-[0.9]"
        >
          {resetCopy.backToLogin}
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      {error && <AuthNotice>{error}</AuthNotice>}

      <AuthField
        id="password"
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        disabled={pending}
      />

      <AuthField
        id="confirm"
        name="confirm"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        disabled={pending}
      />

      <AuthSubmit pending={pending} pendingLabel={resetCopy.updating}>
        {resetCopy.submit}
      </AuthSubmit>
    </form>
  );
}
