"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { register } from "../api";
import { signUp } from "../content";
import { AuthField, AuthNotice, AuthSubmit } from "./primitives";

export function SignupForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await register({
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });

    if (result.ok) {
      router.replace("/app");
      return;
    }

    setError(result.message);
    setPending(false);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      {error && <AuthNotice>{error}</AuthNotice>}

      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <AuthField
          id="firstName"
          name="firstName"
          label="First name"
          autoComplete="given-name"
          placeholder="Ada"
          disabled={pending}
        />
        <AuthField
          id="lastName"
          name="lastName"
          label="Last name"
          autoComplete="family-name"
          placeholder="Lovelace"
          disabled={pending}
        />
      </div>

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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        disabled={pending}
      />

      <AuthSubmit pending={pending} pendingLabel="Creating your account…">
        {signUp.submit}
      </AuthSubmit>
    </form>
  );
}
