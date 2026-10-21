"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { login } from "../api";
import { signIn } from "../content";
import { AuthField, AuthNotice, AuthSubmit } from "./primitives";

/** Only allow same-origin, absolute-path redirects. */
function safeRedirect(value: string | null): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export function LoginForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await login(String(data.get("email") ?? ""), String(data.get("password") ?? ""));

    if (result.ok) {
      router.replace(redirect ?? "/app");
      return;
    }

    setError(result.message);
    setPending(false);
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

      <AuthField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        disabled={pending}
        action={
          <Link href="/reset-password" className="text-[12px] font-medium text-forest hover:opacity-75">
            Forgot password?
          </Link>
        }
      />

      <AuthSubmit pending={pending} pendingLabel="Signing you in…">
        {signIn.submit}
      </AuthSubmit>
    </form>
  );
}
