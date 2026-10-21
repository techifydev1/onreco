import Image from "next/image";
import { cn } from "@/lib/cn";

/** The onreco logo mark, rendered from the brand asset. */
export function WordmarkMark({ className }: { className?: string }) {
  return (
    <Image
      src="/onreco-logo.png"
      alt=""
      width={34}
      height={34}
      className={cn("h-8.5 w-8.5 shrink-0 rounded-card object-contain", className)}
      aria-hidden="true"
      priority
    />
  );
}

/** Full "onreco" wordmark with mark. */
export function Wordmark({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-2.25", className)}>
      <WordmarkMark />
      <span className={cn("text-[30px] font-semibold tracking-[-0.01em] text-ink", textClassName)}>
        onreco
      </span>
    </span>
  );
}
