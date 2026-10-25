import type { Metadata } from "next";
import Link from "next/link";

import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { ResetPasswordForm } from "@/features/auth/components/PasswordResetForms";
import { resetPassword } from "@/features/auth/content";
import { AuthBrand, AuthShell } from "@/features/auth/components/primitives";

export const metadata: Metadata = {
  title: "Set a new password | Onreco",
  description: "Choose a new password for your Onreco account.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell panel={<AuthPanel />}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <AuthBrand className="min-[961px]:hidden" />
            <h2 className="font-serif text-[30px] font-normal leading-[1.15] text-ink">
              {resetPassword.invalidTitle}
            </h2>
            <p className="text-[14px] text-moss">{resetPassword.invalidBody}</p>
          </div>

          <Link
            href="/reset-password"
            className="inline-flex h-12 w-full items-center justify-center rounded bg-forest px-5.75 font-sans text-[14px] font-medium text-paper-card transition-[opacity] duration-[200ms] hover:opacity-[0.9]"
          >
            {resetPassword.requestNew}
          </Link>

          <div className="flex flex-col gap-4 border-t border-hairline pt-6">
            <Link
              href="/login"
              className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
            >
              ← {resetPassword.backToLogin}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell panel={<AuthPanel />}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <AuthBrand className="min-[961px]:hidden" />
          <h2 className="font-serif text-[30px] font-normal leading-[1.15] text-ink">
            {resetPassword.heading}
          </h2>
          <p className="text-[14px] text-moss">{resetPassword.subheading}</p>
        </div>

        <ResetPasswordForm token={token} />

        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
          <Link
            href="/login"
            className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
          >
            ← {resetPassword.backToLogin}
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
