import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { WordmarkMark } from "@/features/marketing/components/Wordmark";

/** Brand lockup used in the auth panel and card. */
export function AuthBrand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.25", className)}>
      <WordmarkMark />
      <span className="text-[24px] font-semibold tracking-[-0.01em] text-ink">onreco</span>
    </span>
  );
}

/** Split-page shell: brand panel on the left, form column on the right. */
export function AuthShell({ panel, children }: { panel: ReactNode; children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[minmax(0,1fr)_minmax(0,1fr)] bg-paper max-[961px]:grid-cols-1">
      <aside className="relative hidden flex-col justify-between bg-forest-deep px-15 py-13 text-dark-text min-[961px]:flex">
        {panel}
      </aside>
      <main className="flex items-center justify-center px-(--page-x) py-15 max-[961px]:py-12">
        <div className="w-full max-w-105">{children}</div>
      </main>
    </div>
  );
}

/** Labelled input with a leading icon slot. */
export function AuthField({
  id,
  label,
  type = "text",
  name,
  placeholder,
  autoComplete,
  disabled,
  action,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[13px] font-medium text-ink">
          {label}
        </label>
        {action}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded border border-hairline-strong bg-paper-card px-3.5",
          "text-[14px] text-ink placeholder:text-stone",
          "outline-none transition-colors duration-200",
          "focus:border-forest focus:ring-2 focus:ring-forest/15",
          "disabled:opacity-60",
        )}
      />
    </div>
  );
}

/** Primary submit button matching the landing `.btn` treatment. */
export function AuthSubmit({
  children,
  pending,
  pendingLabel,
}: {
  children: ReactNode;
  pending?: boolean;
  pendingLabel?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded",
        "bg-forest px-5.75 font-sans text-[14px] font-medium text-paper-card",
        "transition-[opacity,transform] duration-[200ms]",
        "hover:opacity-[0.9] disabled:cursor-not-allowed disabled:opacity-70",
      )}
    >
      {pending ? (pendingLabel ?? children) : children}
    </button>
  );
}

/** Inline error / notice banner. */
export function AuthNotice({ children, tone = "error" }: { children: ReactNode; tone?: "error" | "info" }) {
  const styles =
    tone === "error"
      ? "border-status-amber-text/25 bg-status-amber-bg text-status-amber-text"
      : "border-forest/20 bg-sage text-forest";
  return (
    <p className={cn("rounded border px-3.5 py-2.5 text-[13px] leading-[1.5]", styles)} role="alert">
      {children}
    </p>
  );
}
