import type { Metadata } from "next";

import { LegalPage } from "@/features/marketing/components/LegalPage";
import { legalPrivacy } from "@/features/marketing/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Onreco",
  description: "How Onreco collects, uses, and safeguards your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Onreco",
    description: "How Onreco collects, uses, and safeguards your information.",
    url: "/privacy",
    siteName: "Onreco",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Onreco",
    description: "How Onreco collects, uses, and safeguards your information.",
  },
};

export default function PrivacyPage() {
  return <LegalPage doc={legalPrivacy} />;
}
