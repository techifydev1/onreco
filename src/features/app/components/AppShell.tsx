import type { ReactNode } from "react";

import { BottomDock } from "./BottomDock";
import { FloatingAccount } from "./FloatingAccount";
import { FloatingBrand } from "./FloatingBrand";

/**
 * Authenticated app chrome. The navigation floats over the content: brand
 * chip top-left, account chip top-right, nav dock pinned to the bottom.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper">
      <FloatingBrand />
      <FloatingAccount />

      <main className="px-5 pt-26 pb-30 lg:px-9">{children}</main>

      <BottomDock />
    </div>
  );
}
