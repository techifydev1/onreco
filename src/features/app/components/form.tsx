"use client";

import type { ReactNode } from "react";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";

import { AppIcon } from "./AppIcon";

/**
 * `false` while server-rendered, `true` in the browser. Portalling needs a
 * real document, so the dialog waits for the client.
 */
function subscribe(): () => void {
  return () => {};
}

function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Labelled text input. */
export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-11 w-full rounded border border-hairline-strong bg-paper-card px-3.5",
          "text-[14px] text-ink placeholder:text-stone",
          "outline-none transition-colors duration-200",
          "focus:border-forest focus:ring-2 focus:ring-forest/12",
          "disabled:opacity-60",
        )}
      />
      {hint && <p className="text-[11px] leading-[1.5] text-stone">{hint}</p>}
    </div>
  );
}

/** Labelled select. */
export function Select({
  id,
  label,
  value,
  options,
  onChange,
  hint,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-11 w-full appearance-none rounded border border-hairline-strong bg-paper-card pr-9 pl-3.5",
            "text-[14px] text-ink",
            "outline-none transition-colors duration-200",
            "focus:border-forest focus:ring-2 focus:ring-forest/12",
            "disabled:opacity-60",
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <AppIcon
          name="chevron-down"
          size={15}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-stone"
        />
      </div>
      {hint && <p className="text-[11px] leading-[1.5] text-stone">{hint}</p>}
    </div>
  );
}

/** On/off switch. */
export function Toggle({
  id,
  checked,
  onChange,
  label,
  disabled,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-pill transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-forest" : "bg-hairline-strong",
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-paper-card transition-[left] duration-200",
          checked ? "left-5" : "left-1",
        )}
      />
    </button>
  );
}

/** Centred modal dialog. */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Freeze the page behind the dialog so it cannot scroll while the popup is
  // open. The previous value is restored when the dialog closes.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !isClient) return null;

  // The dialog is portalled to the body so it escapes the stacking context of
  // whatever rendered it. Otherwise a floating chrome element with a lower
  // z-index — the bottom dock, for one — would paint over the overlay.
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[90dvh] w-full max-w-120 flex-col overflow-hidden rounded-frame border border-hairline bg-paper-card shadow-[0_30px_70px_-30px_rgba(35,61,50,0.4)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-[20px] font-normal text-ink">{title}</h2>
            {subtitle && <p className="text-[12px] leading-[1.5] text-moss">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-moss transition-colors duration-200 hover:bg-sage hover:text-ink"
          >
            <AppIcon name="close" size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-hairline px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
