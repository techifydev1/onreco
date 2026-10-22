import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

/** Page heading: eyebrow, serif title, supporting line, optional actions. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal leading-[1.1] text-ink">
          {title}
        </h1>
        <p className="max-w-120 text-[14px] leading-[1.6] text-moss">{subtitle}</p>
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}

/** Secondary button used across the app pages. */
export function AppButton({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary: "bg-forest text-paper-card hover:opacity-90",
    secondary: "border border-hairline-strong bg-paper-card text-ink hover:bg-sage",
    ghost: "text-moss hover:text-ink hover:bg-sage",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded px-4 text-[13px] font-medium",
        "transition-[opacity,background-color,color] duration-200",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants,
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Centred empty state used when a list has nothing in it. */
export function EmptyState({
  icon,
  title,
  hint,
  action,
}: {
  icon: AppIconName;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-forest">
        <AppIcon name={icon} size={20} />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="text-[14px] font-medium text-ink">{title}</p>
        {hint && <p className="max-w-90 text-[13px] leading-[1.6] text-moss">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/** Row of filter chips. */
export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string; count?: number }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-card bg-sage p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-chip px-3 py-1.5 text-[12px] transition-colors duration-200",
              active
                ? "bg-paper-card font-medium text-ink shadow-[0_1px_2px_rgba(35,61,50,0.06)]"
                : "text-moss hover:text-ink",
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span className="ml-1.5 text-[11px] text-stone">{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Small labelled figure used in page summaries. */
export function Figure({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "warning";
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stone">
        {label}
      </span>
      <span
        className={cn(
          "text-[20px] leading-none font-semibold tabular-nums",
          tone === "positive" && "text-status-green-text",
          tone === "warning" && "text-status-amber-text",
          tone === "default" && "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}
