// Placeholder shown while the settings data streams in.

function Block({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-frame bg-sage2 ${className ?? ""}`} />;
}

export function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Block className="h-3 w-24" />
        <Block className="h-8 w-40 max-w-full" />
        <Block className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <Block className="h-96" />
        <div className="flex flex-col gap-4">
          <Block className="h-56" />
          <Block className="h-44" />
          <Block className="h-40" />
        </div>
      </div>
    </div>
  );
}
