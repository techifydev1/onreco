import { overview } from "../content";
import { timeAgo } from "../format";
import type { IntegrationStatus } from "../types";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppCard, CardTitle } from "./primitives";

export function SyncStatusCard({ integrations }: { integrations: IntegrationStatus[] }) {
  return (
    <AppCard className="flex flex-col gap-4">
      <CardTitle>
        <span className="font-serif text-[18px] font-normal text-ink">
          {overview.sync.title}
        </span>
      </CardTitle>

      {integrations.length === 0 ? (
        <p className="text-[13px] text-stone">No accounting software connected yet.</p>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {integrations.map((integration) => (
            <li
              key={integration.slug}
              className="flex items-start justify-between gap-3 border-b border-hairline pb-3.5 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-medium text-ink">{integration.name}</span>
                <span className="text-[11px] text-stone">
                  {integration.connected
                    ? overview.sync.lastSync(timeAgo(integration.lastSyncAt))
                    : "Not connected"}
                  {integration.connected && integration.pushed30d
                    ? ` · ${integration.pushed30d.toLocaleString()} entries pushed`
                    : ""}
                </span>
              </div>

              <span
                className={
                  integration.connected
                    ? "inline-flex items-center gap-1.5 rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                    : "inline-flex items-center gap-1.5 rounded-sm bg-sage2 px-2 py-1 text-[11px] font-medium text-moss"
                }
              >
                <AppIcon name={integration.connected ? "check" : "plus"} size={11} />
                {integration.connected ? overview.sync.synced : overview.sync.connect}
              </span>
            </li>
          ))}
        </ul>
      )}
    </AppCard>
  );
}
