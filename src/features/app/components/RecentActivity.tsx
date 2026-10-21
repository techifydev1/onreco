import { overview } from "../content";
import { formatAmount, formatDayMonth, shortHash } from "../format";
import type { JournalEntry } from "../types";
import { AppCard, CardTitle, ChainTag, StatusPill } from "./primitives";

export function RecentActivity({ transactions }: { transactions: JournalEntry[] }) {
  return (
    <AppCard padded={false} className="flex flex-col gap-4 p-5">
      <div className="px-5 pt-5">
        <CardTitle
          action={
            <span className="text-[12px] text-moss">{overview.activity.cta} →</span>
          }
        >
          {overview.activity.title}
        </CardTitle>
      </div>

      {transactions.length === 0 ? (
        <p className="px-5 pb-5 text-[13px] text-stone">{overview.activity.empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-hairline text-[10px] uppercase tracking-[0.06em] text-stone">
                <th scope="col" className="px-5 py-2.5 font-medium">
                  Transaction
                </th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  Network
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">
                  Amount
                </th>
                <th scope="col" className="px-5 py-2.5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-hairline last:border-b-0 transition-colors duration-200 hover:bg-sage/60"
                >
                  <td className="px-5 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-ink">
                        {tx.type === "RECEIVED" ? "Received" : "Sent"} {tx.currency}
                      </span>
                      <span className="text-[11px] text-stone">
                        {formatDayMonth(tx.txDate)} · {shortHash(tx.txHash)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <ChainTag chain={tx.chain} />
                  </td>
                  <td
                    className={
                      tx.type === "RECEIVED"
                        ? "px-3 py-3 text-right text-[13px] font-medium tabular-nums text-ink"
                        : "px-3 py-3 text-right text-[13px] font-medium tabular-nums text-moss"
                    }
                  >
                    {tx.type === "RECEIVED" ? "+" : "−"}
                    {formatAmount(Number(tx.amount ?? 0)).replace("-", "")}
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={tx.syncStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppCard>
  );
}
