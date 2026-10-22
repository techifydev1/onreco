import type { ReactNode } from "react";

import { AuthBrand } from "./primitives";

/**
 * Centred card shell for the standalone verification pages. These screens sit
 * outside the split auth panel, so they carry the brand themselves.
 */
export function VerifyShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-paper px-5 py-15">
      <AuthBrand />

      <div className="w-full max-w-105 rounded-frame border border-hairline bg-paper-card p-8 shadow-[0_30px_70px_-40px_rgba(35,61,50,0.35)] max-[600px]:p-6">
        {children}
      </div>
    </div>
  );
}
