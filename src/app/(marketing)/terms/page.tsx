import type { Metadata } from "next";

import { LegalPage } from "@/features/marketing/components/LegalPage";
import { legalTerms } from "@/features/marketing/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Onreco",
  description: "The terms and conditions governing your use of the Onreco platform.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Onreco",
    description: "The terms and conditions governing your use of the Onreco platform.",
    url: "/terms",
    siteName: "Onreco",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Onreco",
    description: "The terms and conditions governing your use of the Onreco platform.",
  },
};

export default function TermsPage() {
  return <LegalPage doc={legalTerms} />;
}
