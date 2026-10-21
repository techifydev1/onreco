import { cn } from "@/lib/cn";

export type AssetIcon =
  | "arrow-up-right"
  | "arrow-up-right-2"
  | "arrow-right"
  | "arrow-down-left"
  | "arrow-down-left-2"
  | "check"
  | "check-2"
  | "check-check"
  | "circle-check"
  | "circle-check-2"
  | "chevron-down"
  | "chevron-down-2"
  | "connection-indicator"
  | "status-indicator"
  | "corner-down-right"
  | "corner-down-right-2"
  | "calculator"
  | "book-open"
  | "briefcase"
  | "pause";

/**
 * Static brand SVGs (self-colored strokes) served from /public/landing.
 * Rendered as <img> to match the source design exactly.
 */
export function Icon({
  name,
  size = 16,
  className,
  alt = "",
}: {
  name: AssetIcon;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/landing/${name}.svg`}
      alt={alt}
      width={size}
      height={size}
      aria-hidden={alt === "" ? true : undefined}
      className={cn("block", className)}
    />
  );
}
