import type { ChartPoint } from "../types";
import { formatDayMonth } from "../format";
import { overview } from "../content";
import { AppIcon } from "@/components/ui/AppIcon";

const WIDTH = 640;
const HEIGHT = 200;
const PAD_Y = 16;

type Series = { key: "inFlow" | "outFlow"; color: string; fill: string };

const SERIES: Series[] = [
  { key: "inFlow", color: "var(--color-forest)", fill: "var(--color-forest)" },
  { key: "outFlow", color: "var(--color-stone)", fill: "var(--color-stone)" },
];

/** Build a smooth cubic path through the points. */
function buildPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    d += ` C${midX},${current.y} ${midX},${next.y} ${next.x},${next.y}`;
  }
  return d;
}

export function ActivityChart({ data }: { data: ChartPoint[] }) {
  const hasActivity = data.some(
    (point) => Number(point.inFlow ?? 0) !== 0 || Number(point.outFlow ?? 0) !== 0,
  );

  if (!hasActivity) {
    return (
      <div className="flex min-h-50 flex-1 flex-col items-center justify-center gap-2 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-forest">
          <AppIcon name="activity" size={18} />
        </span>
        <p className="text-[13px] font-medium text-ink">{overview.chart.empty}</p>
        <p className="max-w-80 text-[12px] leading-[1.6] text-stone">{overview.chart.emptyHint}</p>
      </div>
    );
  }

  const max = Math.max(
    1,
    ...data.flatMap((point) => [Number(point.inFlow ?? 0), Number(point.outFlow ?? 0)]),
  );
  const stepX = data.length > 1 ? WIDTH / (data.length - 1) : WIDTH;
  const scaleY = (value: number) =>
    HEIGHT - PAD_Y - (Math.max(0, Number(value ?? 0)) / max) * (HEIGHT - PAD_Y * 2);

  const series = SERIES.map((s) => {
    const points = data.map((point, i) => ({
      x: i * stepX,
      y: scaleY(Number(point[s.key] ?? 0)),
    }));
    return { ...s, points, path: buildPath(points) };
  });

  const first = series[0];
  const areaPath = first.points.length
    ? `${first.path} L${first.points[first.points.length - 1].x},${HEIGHT} L0,${HEIGHT} Z`
    : "";

  return (
    <div className="flex min-h-50 flex-1 flex-col gap-3">
      <div className="min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-full w-full"
          role="img"
          aria-label="Cash flow over the last 30 days"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="app-inflow-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-forest)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              x2={WIDTH}
              y1={PAD_Y * 2 + ratio * (HEIGHT - PAD_Y * 3)}
              y2={PAD_Y * 2 + ratio * (HEIGHT - PAD_Y * 3)}
              stroke="var(--color-hairline)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={areaPath} fill="url(#app-inflow-fill)" />

          {series.map((s) => (
            <path
              key={s.key}
              d={s.path}
              fill="none"
              stroke={s.color}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px] text-stone">
        <span>{formatDayMonth(data[0]?.date)}</span>
        <span>{formatDayMonth(data[data.length - 1]?.date)}</span>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {[
          { label: "Inflow", color: "var(--color-forest)" },
          { label: "Outflow", color: "var(--color-stone)" },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-2 text-[12px] text-moss">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
