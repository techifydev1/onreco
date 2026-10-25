import type { Metadata } from "next";

import type { SubscriptionPlan } from "@/features/app/types";

import { seo } from "@/features/marketing/content";
import { faqSchema, jsonLd, organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { Nav } from "@/features/marketing/components/Nav";
import { Hero } from "@/features/marketing/components/Hero";
import { CompatStrip } from "@/features/marketing/components/CompatStrip";
import { Gap } from "@/features/marketing/components/Gap";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { Rules } from "@/features/marketing/components/Rules";
import { Pending } from "@/features/marketing/components/Pending";
import { Integrations } from "@/features/marketing/components/Integrations";
import { Pricing } from "@/features/marketing/components/Pricing";
import { Audience } from "@/features/marketing/components/Audience";
import { Faq } from "@/features/marketing/components/Faq";
import { Cta } from "@/features/marketing/components/Cta";
import { Footer } from "@/features/marketing/components/Footer";
import { ScrollReveal } from "@/features/marketing/components/ScrollReveal";
import { getPlans } from "@/features/app/api";
import PlansStoreInitializer from "@/providers/PlansStoreInitializer";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: "Onreco",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@onrecohq",
    title: seo.title,
    description: seo.description,
  },
};

export default async function LandingPage() {
  let plans: SubscriptionPlan[] = [];
  try {
    plans = await getPlans();
  } catch {
    plans = [];
  }

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([organizationSchema(), softwareApplicationSchema(), faqSchema()]),
        }}
      />
      <Nav />
      <main>
        <PlansStoreInitializer plans={plans} />
        <Hero />
        <CompatStrip />
        <Gap />
        <HowItWorks />
        <Rules />
        <Pending />
        <Integrations />
        <Pricing />
        <Audience />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}