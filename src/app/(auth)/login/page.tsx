import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { authAgreement, authFooter, signIn } from "@/features/auth/content";
import { AuthBrand, AuthShell } from "@/features/auth/components/primitives";

export const metadata: Metadata = {
  title: "Sign in · Onreco",
  description: "Sign in to Onreco to keep your stablecoin payments and books in order.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Sign in · Onreco",
    description: "Sign in to Onreco to keep your stablecoin payments and books in order.",
    url: "/login",
    siteName: "Onreco",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Onreco - Stablecoin accounting that lands in your books.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onrecohq",
    title: "Sign in · Onreco",
    description: "Sign in to Onreco to keep your stablecoin payments and books in order.",
    images: ["/og.png"],
  },
};

export default function LoginPage() {
  return (
    <AuthShell panel={<AuthPanel />}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <AuthBrand className="min-[961px]:hidden" />
          <h2 className="font-serif text-[30px] font-normal leading-[1.15] text-ink">
            {signIn.heading}
          </h2>
          <p className="text-[14px] text-moss">{signIn.subheading}</p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="text-[13px] text-moss">
          {signIn.alternate.lead}{" "}
          <Link href={signIn.alternate.href} className="font-medium text-forest hover:opacity-75">
            {signIn.alternate.action}
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
