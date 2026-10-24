import { faq, social } from "@/features/marketing/content";
import { env } from "@/config/env";

const org = {
  "@type": "Organization",
  "@id": `${env.siteUrl}/#organization`,
  name: "Onreco",
  url: env.siteUrl,
  email: social.inbox,
  sameAs: [social.x.href, social.linkedin.href],
  description:
    "Stablecoin accounting software that syncs matched USDC and USDT payments to QuickBooks and Xero.",
};

export function organizationSchema() {
  return { "@context": "https://schema.org", ...org };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Onreco",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: env.siteUrl,
    description:
      "Onreco detects USDC and USDT payments on Base and Solana, matches them to accounting rules, and posts the matches to QuickBooks or Xero.",
    publisher: { "@id": `${env.siteUrl}/#organization` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "24",
      offerCount: "3",
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function videoSchema({
  name,
  description,
  contentUrl,
  thumbnailUrl,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    contentUrl,
    thumbnailUrl,
    uploadDate,
    duration,
    publisher: { "@id": `${env.siteUrl}/#organization` },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Onreco",
    url: `${env.siteUrl}/contact`,
    about: { "@id": `${env.siteUrl}/#organization` },
  };
}

/** Serialises JSON-LD for a <script> tag without letting copy break the markup. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
