import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Icon } from "./Icon";

/** `.eyebrow`: uppercase 11px label; tone picks the color. */
export function Eyebrow({
  children,
  tone = "faint",
  className,
}: {
  children: ReactNode;
  tone?: "faint" | "green" | "muted";
  className?: string;
}) {
  const toneClass = {
    faint: "text-stone",
    green: "text-forest",
    muted: "text-dark-muted",
  }[tone];
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.08em]", toneClass, className)}>
      {children}
    </p>
  );
}

/** Lora editorial heading. `size` maps to the landing's clamp scale. */
export function LoraHeading({
  children,
  size = "50",
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  size?: "59" | "50" | "28" | "25";
  tone?: "ink" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const sizeClass = {
    "59": "text-[clamp(2.6rem,5vw,59px)]",
    "50": "text-[clamp(2.2rem,4vw,50px)]",
    "28": "text-[clamp(1.4rem,2.4vw,28px)] leading-[1.25]",
    "25": "text-[clamp(1.25rem,2vw,25px)]",
  }[size];
  const toneClass = tone === "light" ? "text-dark-text" : "text-ink";
  return (
    <Tag className={cn("font-serif font-normal leading-[1.08]", toneClass, sizeClass, className)}>
      {children}
    </Tag>
  );
}

/** `.status-badge`: synced (green) or pending (amber). */
export function StatusBadge({
  children,
  status,
  className,
}: {
  children: ReactNode;
  status: "synced" | "pending";
  className?: string;
}) {
  const styles =
    status === "synced"
      ? "bg-status-green-bg text-status-green-text"
      : "bg-status-amber-bg text-status-amber-text";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.25 py-1.5 text-[11px] font-medium whitespace-nowrap",
        styles,
        className,
      )}
    >
      <Icon name={status === "synced" ? "connection-indicator" : "status-indicator"} size={5} />
      {children}
    </span>
  );
}

/** `.btn` variants used across the landing. */
export function Btn({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "cta" | "ghost";
  className?: string;
}) {
  const variantClass = {
    cta: "bg-dark-text text-ink",
    ghost: "border border-hairline-strong bg-paper-card text-ink",
    primary: "bg-forest text-paper-card",
  }[variant];
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded px-5.75 h-12.5",
        "font-sans text-[14px] font-medium whitespace-nowrap",
        "transition-[opacity] duration-[200ms] hover:opacity-[0.88]",
        variantClass,
        className,
      )}
    >
      {children}
    </a>
  );
}

/** `.text-link`: inline forest link with faint ↗ affordance. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn("text-[14px] font-medium text-forest transition-opacity duration-200 hover:opacity-75", className)}
    >
      {children}
    </a>
  );
}
