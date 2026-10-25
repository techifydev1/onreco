import type { Metadata } from "next";
import Link from "next/link";

import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { authAgreement, authFooter, signUp } from "@/features/auth/content";
import { AuthBrand, AuthShell } from "@/features/auth/components/primitives";

export const metadata: Metadata = {
  title: "Create account | Onreco",
  description: "Create your Onreco account and start accounting for stablecoin payments.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Create account | Onreco",
    description: "Create your Onreco account and start accounting for stablecoin payments.",
    url: "/signup",
    siteName: "Onreco",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@onrecohq",
    title: "Create account | Onreco",
    description: "Create your Onreco account and start accounting for stablecoin payments.",
  },
};

export default function SignupPage() {
  return (
    <AuthShell panel={<AuthPanel />}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <AuthBrand className="min-[961px]:hidden" />
          <h2 className="font-serif text-[30px] font-normal leading-[1.15] text-ink">
            {signUp.heading}
          </h2>
          <p className="text-[14px] text-moss">{signUp.subheading}</p>
        </div>

        <SignupForm />

        <p className="text-[13px] text-moss">
          {signUp.alternate.lead}{" "}
          <Link href={signUp.alternate.href} className="font-medium text-forest hover:opacity-75">
            {signUp.alternate.action}
          </Link>
        </p>

        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
          <p className="text-[11px] leading-[1.6] text-stone">
            {authAgreement.lead}{" "}
            <Link href={authAgreement.terms.href} className="text-moss hover:text-ink">
              {authAgreement.terms.label}
            </Link>{" "}
            {authAgreement.and}{" "}
            <Link href={authAgreement.privacy.href} className="text-moss hover:text-ink">
              {authAgreement.privacy.label}
            </Link>
            . {authAgreement.note}
          </p>
          <Link
            href="/"
            className="text-[12px] font-medium text-moss transition-colors duration-200 hover:text-ink"
          >
            ← {authFooter.backHome}
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
