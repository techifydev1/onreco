import type { Metadata } from "next";
import { Suspense } from "react";

import { VerifyConfirm } from "@/features/auth/components/VerifyConfirm";

export const metadata: Metadata = {
  title: "Email verified · Onreco",
  description: "Confirm your email address to unlock your Onreco workspace.",
  robots: { index: false, follow: true },
};

export default function VerifyConfirmPage() {
  return (
    <Suspense fallback={null}>
      <VerifyConfirm />
    </Suspense>
  );
}
