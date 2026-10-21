import { overview } from "../content";
import { shortHash } from "../format";
import type { Wallet } from "../types";
import { AppCard, CardTitle, ChainTag } from "./primitives";

export function WalletList({ wallets }: { wallets: Wallet[] }) {
  return (
    <AppCard className="flex flex-col gap-4">
      <CardTitle
        action={<span className="text-[12px] text-moss">{overview.wallets.cta} →</span>}
      >
        {overview.wallets.title}
      </CardTitle>

      {wallets.length === 0 ? (
        <p className="text-[13px] text-stone">{overview.wallets.empty}</p>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {wallets.map((wallet) => (
            <li key={wallet.id} className="flex items-start justify-between gap-3 border-b border-hairline pb-3.5 last:border-b-0 last:pb-0">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                  {wallet.label}
                  <ChainTag chain={wallet.chain} />
                </span>
                <span className="text-[11px] text-stone">
                  {shortHash(wallet.address)}
                  {wallet.monitoredCurrencies?.length
                    ? ` · ${wallet.monitoredCurrencies.join(", ")}`
                    : ""}
                </span>
              </div>

              <span className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={
                    wallet.active
                      ? "inline-flex items-center rounded-sm bg-status-green-bg px-2 py-1 text-[11px] font-medium text-status-green-text"
                      : "inline-flex items-center rounded-sm bg-sage2 px-2 py-1 text-[11px] font-medium text-moss"
                  }
                >
                  {wallet.active ? "Active" : "Paused"}
                </span>
                <span className="text-[11px] text-stone tabular-nums">
                  {wallet.transactionCount30d.toLocaleString()} tx
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <span className="text-[12px] font-medium text-forest">{overview.wallets.connect}</span>
    </AppCard>
  );
}
