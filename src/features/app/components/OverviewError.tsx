import { AppIcon } from "./AppIcon";

export function OverviewError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-frame border border-hairline bg-paper-card px-6 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-status-amber-bg text-status-amber-text">
        <AppIcon name="pause" size={20} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-[20px] font-normal text-ink">We could not load your data</h2>
        <p className="max-w-90 text-[13px] leading-[1.6] text-moss">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-10 items-center gap-2 rounded border border-hairline-strong bg-paper-card px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
      >
        <AppIcon name="refresh" size={15} />
        Try again
      </button>
    </div>
  );
}
