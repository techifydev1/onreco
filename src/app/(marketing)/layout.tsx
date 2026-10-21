import type { ReactNode } from "react";

// Public marketing shell (landing, pricing, blog...).
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div data-theme="marketing">{children}</div>;
}
