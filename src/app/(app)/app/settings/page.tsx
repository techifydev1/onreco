import type { Metadata } from "next";

import { SettingsPage } from "@/features/app/components/SettingsPage";

export const metadata: Metadata = {
  title: "Settings | Onreco",
};

export default function Page() {
  return <SettingsPage />;
}
