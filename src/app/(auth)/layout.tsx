import type { ReactNode } from "react";

// Shared shell for unauthenticated routes (login, signup...).
// The split-panel layout lives in AuthShell so each page controls its own copy.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
