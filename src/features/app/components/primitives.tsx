import { cn } from "@/lib/cn";

import type { Chain, SyncStatus } from "../types";
import { CHAIN_COLORS, CHAIN_LABELS } from "../content";

/** Small coloured dot + name for a network. */
export function ChainTag({ chain }: { chain: Chain }) {
  const key = String(chain).toUpperCase();
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-moss">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: CHAIN_COLORS[key] ?? "var(--color-stone)" }}
        aria-hidden="true"
      />
      {CHAIN_LABELS[key] ?? key}
    </span>
  );
}

/** Synced / pending / failed status pill. */
export function StatusPill({ status }: { status: SyncStatus }) {
  const map = {
    SYNCED: { label: "Synced", className: "bg-status-green-bg text-status-green-text" },
    PENDING: { label: "Pending", className: "bg-status-amber-bg text-status-amber-text" },
    FAILED: { label: "Failed", className: "bg-status-red-bg text-status-red-text" },
  } as const;
  const key = String(status).toUpperCase() as keyof typeof map;
  const item = map[key] ?? map.PENDING;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-medium whitespace-nowrap",
        item.className,
      )}
    >
      {item.label}
    </span>
  );
}

/** Card surface used across the app. */
export function AppCard({
  children,
  className,
  padded = true,
}: {
  children?: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-frame border border-hairline bg-paper-card",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Section heading inside a card. */
export function CardTitle({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <h2 className="font-serif text-[18px] font-normal text-ink">{children}</h2>
      {action}
    </div>
  );
}
