import type { ReactNode } from "react";

import { RevealObserver } from "@/components/RevealObserver";
import { AppShell } from "@/features/app/components/AppShell";

// Authenticated product shell. Route access is guarded in src/proxy.ts.
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      {children}
      <RevealObserver />
    </AppShell>
  );
}
