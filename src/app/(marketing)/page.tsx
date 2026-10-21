import type { Metadata } from "next";

import { seo } from "@/features/marketing/content";
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

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
};

export default function LandingPage() {
  return (
    <div className="bg-paper">
      <Nav />
      <main>
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
