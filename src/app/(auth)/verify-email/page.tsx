import type { Metadata } from "next";

import { VerifyEmailScreen } from "@/features/auth/components/VerifyEmailScreen";

export const metadata: Metadata = {
  title: "Verify your email · Onreco",
  description: "Confirm your email address to unlock your Onreco workspace.",
  robots: { index: false, follow: true },
};

export default function VerifyEmailPage() {
  return <VerifyEmailScreen />;
}
