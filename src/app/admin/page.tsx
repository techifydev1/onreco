import type { Metadata } from "next";

import { AdminDashboard } from "@/features/admin/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — Onreco",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminDashboard />;
}
