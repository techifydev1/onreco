// Placeholder shown while the overview data streams in.

function Block({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-frame bg-sage2 ${className ?? ""}`} />;
}

export function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Block className="h-3 w-24" />
        <Block className="h-8 w-80 max-w-full" />
        <Block className="h-4 w-120 max-w-full" />
      </div>

      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-32" />
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 max-[1100px]:grid-cols-1">
        <Block className="h-80" />
        <div className="flex flex-col gap-4">
          <Block className="h-44" />
          <Block className="h-32" />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 max-[1100px]:grid-cols-1">
        <Block className="h-72" />
        <Block className="h-72" />
      </div>
    </div>
  );
}
