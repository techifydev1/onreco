"use client";

import { useEffect } from "react";

import { AppIcon } from "@/components/ui/AppIcon";

/**
 * Error boundary for the authenticated shell. Without it a single bad field
 * in a response unmounts the whole React tree, taking the navigation with it.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App shell error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-forest">
        <AppIcon name="activity" size={20} />
      </span>

      <div className="space-y-1">
        <h2 className="font-serif text-[20px] font-normal text-ink">
          Something went wrong
        </h2>
        <p className="max-w-sm text-[13px] text-moss">
          This screen failed to load. Your data is safe. Try again, and if it
          keeps happening we&apos;ll look into it.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-forest px-3.5 py-2 text-[13px] font-medium text-paper-card transition-colors duration-200 hover:bg-forest-deep"
        >
          Try again
        </button>
        <a
          href="/app"
          className="rounded border border-hairline bg-paper-card px-3.5 py-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
        >
          Back to overview
        </a>
      </div>

      {error.digest ? (
        <p className="text-[11px] text-stone">Reference: {error.digest}</p>
      ) : null}
    </div>
  );
}
