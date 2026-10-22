"use client";

import { useState, useSyncExternalStore } from "react";

import { useApiData } from "@/lib/useApiData";

import { getReportTypes, reportDownloadUrl } from "../api";
import { reports as copy } from "../content";
import { formatMonth } from "../format";
import { AppIcon } from "./AppIcon";
import { AppCard } from "./primitives";
import { AppButton, EmptyState, PageHeader } from "./page";

const FORMAT_ICON: Record<string, "download" | "reports"> = {
  CSV: "download",
  PDF: "reports",
  XLSX: "reports",
};

/** Current month as `YYYY-MM`, matching the native month input format. */
function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function subscribeToMonth(): () => void {
  return () => {};
}

/**
 * The current month is only knowable in the browser. The server snapshot is
 * empty and the real value is swapped in after hydration, so the clock is
 * never read while the prerendered shell is being rendered.
 */
function useCurrentMonth(): string {
  return useSyncExternalStore(
    subscribeToMonth,
    currentMonth,
    () => "",
  );
}

/** First and last day of the selected month. */
function monthRange(month: string): { from: string; to: string } {
  const [year, mon] = month.split("-").map(Number);
  const iso = (date: Date) => date.toISOString().slice(0, 10);
  return {
    from: iso(new Date(Date.UTC(year, mon - 1, 1))),
    to: iso(new Date(Date.UTC(year, mon, 0))),
  };
}

export function ReportsPage() {
  const { data, error, loading, reload } = useApiData(getReportTypes);
  const list = data ?? [];

  const today = useCurrentMonth();
  const [picked, setPicked] = useState<string | null>(null);

  const month = picked ?? today;
  const range = month ? monthRange(month) : null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <AppCard className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="report-period"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-stone"
        >
          <AppIcon name="calendar" size={15} />
          {copy.period.label}
        </label>

        <input
          id="report-period"
          type="month"
          value={month}
          max={today || undefined}
          onChange={(event) => setPicked(event.target.value)}
          className="h-9 rounded border border-hairline-strong bg-paper-card px-3 text-[12px] text-ink outline-none transition-colors duration-200 focus:border-forest focus:ring-2 focus:ring-forest/12 [color-scheme:light]"
        />

        <span className="text-[12px] text-moss">
          {month ? copy.period.hint(formatMonth(month)) : copy.period.pending}
        </span>
      </AppCard>

      {error ? (
        <AppCard>
          <EmptyState
            icon="pause"
            title={error}
            action={
              <AppButton onClick={reload}>
                <AppIcon name="refresh" size={15} />
                Try again
              </AppButton>
            }
          />
        </AppCard>
      ) : loading ? (
        <div className="flex flex-col gap-4">
          <AppCard className="h-40 animate-pulse bg-sage2" />
          <AppCard className="h-40 animate-pulse bg-sage2" />
        </div>
      ) : list.length === 0 ? (
        <AppCard>
          <EmptyState icon="reports" title={copy.empty.title} hint={copy.empty.hint} />
        </AppCard>
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((report) => (
            <AppCard key={report.type} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[20px] font-normal text-ink">{report.name}</span>
                  <span className="text-[11px] text-stone">{copy.cadence(report.cadence)}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {report.formats.map((format) => (
                    <a
                      key={format}
                      href={reportDownloadUrl(report.type, format, range?.from, range?.to)}
                      className="inline-flex h-9 items-center gap-2 rounded border border-hairline-strong bg-paper-card px-3 text-[12px] font-medium text-ink transition-colors duration-200 hover:bg-sage"
                    >
                      <AppIcon name={FORMAT_ICON[format] ?? "download"} size={14} />
                      {format}
                    </a>
                  ))}
                </div>
              </div>

              <p className="max-w-140 text-[13px] leading-[1.6] text-moss">{report.blurb}</p>

              <div className="flex items-center gap-2 border-t border-hairline pt-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stone">
                  {copy.formats}
                </span>
                <span className="text-[12px] text-moss">{report.formats.join(" · ")}</span>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </div>
  );
}
