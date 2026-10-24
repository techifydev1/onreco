import type { Metadata } from "next";

import { ContactPage } from "@/features/marketing/components/ContactPage";
import { contactPage } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: contactPage.seo.title,
    description: contactPage.seo.description,
    url: "/contact",
    siteName: "Onreco",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@onrecohq",
    title: contactPage.seo.title,
    description: contactPage.seo.description,
  },
};

export default function Page() {
  return <ContactPage />;
}
