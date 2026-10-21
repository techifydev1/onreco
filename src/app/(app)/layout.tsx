import type { ReactNode } from "react";

// Authenticated product shell. Route access is guarded in middleware.ts.
export default function AppLayout({ children }: { children: ReactNode }) {
  return <div data-theme="app">{children}</div>;
}
