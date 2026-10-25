import type { Metadata } from "next";

import { demoPage } from "@/features/marketing/content";
import { DemoPage } from "@/features/marketing/components/DemoPage";
import { jsonLd, videoSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: demoPage.seo.title,
  description: demoPage.seo.description,
  alternates: { canonical: "/demo" },
  openGraph: {
    title: demoPage.seo.title,
    description: demoPage.seo.description,
    url: "/demo",
    siteName: "Onreco",
    type: "video.other",
    videos: [{ url: demoPage.tour.src }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onrecohq",
    title: demoPage.seo.title,
    description: demoPage.seo.description,
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            videoSchema({
              name: "Onreco product tour: from wallet payment to QuickBooks",
              description: demoPage.seo.description,
              contentUrl: demoPage.tour.src,
              thumbnailUrl: demoPage.tour.poster,
              uploadDate: "2026-10-22T09:00:00Z",
              duration: "PT2M49S",
            }),
          ),
        }}
      />
      <DemoPage />
    </>
  );
}
