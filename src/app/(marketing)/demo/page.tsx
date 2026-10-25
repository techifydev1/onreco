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
    images: [
      {
        url: "/demo/og.png",
        width: 1200,
        height: 630,
        alt: "Onreco product tour - two minutes from payment to books.",
      },
    ],
  },
  twitter: {
    card: "player",
    site: "@onrecohq",
    title: demoPage.seo.title,
    description: demoPage.seo.description,
    images: ["/demo/og.png"],
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
