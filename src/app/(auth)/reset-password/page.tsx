import type { Metadata } from "next";
import Link from "next/link";

import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { ForgotPasswordForm } from "@/features/auth/components/PasswordResetForms";
import { forgotPassword } from "@/features/auth/content";
import { AuthBrand, AuthShell } from "@/features/auth/components/primitives";

export const metadata: Metadata = {
  title: "Reset password | Onreco",
  description: "Request a password reset link for your Onreco account.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell panel={<AuthPanel />}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <AuthBrand className="min-[961px]:hidden" />
          <h2 className="font-serif text-[30px] font-normal leading-[1.15] text-ink">
            {forgotPassword.heading}
          </h2>
          <p className="text-[14px] text-moss">{forgotPassword.subheading}</p>
        </div>

        <ForgotPasswordForm />

        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
          <Link
            href="/"
            className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
