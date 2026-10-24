import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import TopLoader from "nextjs-toploader";

import { env } from "@/config/env";
import { site } from "@/config/site";

import { VisitTracker } from "@/components/VisitTracker";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: `${site.name} — ${site.description}`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <TopLoader color="#285742" />
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}