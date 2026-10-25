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
    images: [
      {
        url: "/contact/og.png",
        width: 1200,
        height: 630,
        alt: "Contact Onreco - tell us what your payments look like.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onrecohq",
    title: contactPage.seo.title,
    description: contactPage.seo.description,
    images: ["/contact/og.png"],
  },
};

export default function Page() {
  return <ContactPage />;
}
