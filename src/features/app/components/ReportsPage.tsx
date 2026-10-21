"use client";

import { useApiData } from "@/lib/useApiData";

import { getReportTypes, reportDownloadUrl } from "../api";
import { reports as copy } from "../content";
import { AppIcon } from "./AppIcon";
import { AppCard } from "./primitives";
import { AppButton, EmptyState, PageHeader } from "./page";

const FORMAT_ICON: Record<string, "download" | "reports"> = {
  CSV: "download",
  PDF: "reports",
  XLSX: "reports",
};

export function ReportsPage() {
  const { data, error, loading, reload } = useApiData(getReportTypes);
  const list = data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

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
                      href={reportDownloadUrl(report.type, format)}
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
