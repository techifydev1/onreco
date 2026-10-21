import type { CSSProperties } from "react";
import { hero } from "../content";
import { Btn } from "./primitives";
import { Icon } from "./Icon";
import { StatusBadge } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="pt-24">
      <div className="flex flex-col gap-9.5 px-(--page-x) pt-17 pb-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
          {hero.eyebrow}
        </p>

        <div className="flex w-full flex-col items-start gap-6 min-[1201px]:flex-row min-[1201px]:items-end min-[1201px]:gap-17.5">
          <h1 className="hero-entrance w-full font-serif text-[clamp(2rem,4.2vw,44px)] font-normal leading-[1.08] text-ink min-[1201px]:w-[min(760px,58%)] min-[1201px]:flex-none min-[1201px]:text-[clamp(2.4rem,4vw,52px)]">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>

          <div
            className="hero-entrance flex flex-1 flex-col gap-5.75 pb-0.75"
            style={{ "--hero-delay": "120ms" } as CSSProperties}
          >
            <p className="text-[16px] leading-[1.65] text-moss">{hero.sub}</p>
            <div className="flex items-center gap-5">
              <Btn href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <Icon name="arrow-up-right" size={14} />
              </Btn>
              <a
                href={hero.ghostLink.href}
                className="text-[12px] text-forest transition-opacity duration-200 hover:opacity-75"
              >
                {hero.ghostLink.label}
              </a>
            </div>
          </div>
        </div>

        <DemoArea />

        <div className="flex w-full justify-between text-[12px] text-moss">
          <span>{hero.assurance.left}</span>
          <span className="text-forest">{hero.assurance.right}</span>
        </div>
      </div>
    </section>
  );
}

function DemoArea() {
  return (
    <div className="flex w-full flex-col gap-4 pt-2.75">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.04em] text-moss">
          {hero.demo.captionLabel}
        </span>
        <span className="text-[10px] text-stone">{hero.demo.captionNote}</span>
      </div>

      <div className="rounded-shell bg-paper-warm p-3 shadow-[0_18px_50px_-8px_rgba(36,60,48,0.07)]">
        <div className="overflow-hidden rounded-frame border border-hairline bg-paper-card">
          <AppHeader />
          <div className="flex h-95.75 max-[700px]:h-auto max-[700px]:flex-col">
            <AppSidebar />
            <div className="flex flex-1 flex-col gap-4.5 overflow-hidden p-6 max-[700px]:p-4">
              <div className="flex items-center justify-between">
                <span className="text-[19px] font-medium text-ink">Transactions</span>
                <span className="whitespace-pre text-[10px] text-moss">This month ∨</span>
              </div>

              <div className="flex flex-1 gap-6 overflow-hidden max-[700px]:flex-col">
                <TransactionList />
                <RuleInspector />
              </div>

              <FlowNarrative />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 pt-4 pb-1.5">
          <Icon name="corner-down-right" size={16} />
          <span className="text-[12px] text-moss">No matching rule?</span>
          <span className="text-[12px] font-medium text-ink">
            Stays pending. Nothing syncs until a rule matches.
          </span>
        </div>
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <div className="flex h-13 items-center justify-between border-b border-hairline px-5.5">
      <div className="flex items-center gap-3">
        <span className="text-[19px] font-semibold text-ink">onreco</span>
        <span className="h-4.5 w-px bg-hairline" aria-hidden="true" />
        <span className="text-[12px] text-moss">Acme Studio</span>
        <Icon name="chevron-down" size={12} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-moss">
        <Icon name="connection-indicator" size={5} />
        <span>QuickBooks connected</span>
        <div className="flex h-6.25 w-6.25 items-center justify-center rounded-full bg-sage2 text-[9px] text-ink">
          AL
        </div>
      </div>
    </div>
  );
}

function AppSidebar() {
  const items = [
    { label: "Transactions", active: true },
    { label: "Rules", active: false },
    { label: "Integrations", active: false },
  ];
  return (
    <nav
      className="flex w-41.5 shrink-0 flex-col gap-1.75 bg-sage p-4 max-[700px]:w-full max-[700px]:flex-row max-[700px]:flex-wrap max-[700px]:gap-2 max-[700px]:p-3"
      aria-label="App navigation"
    >
      <span className="text-[9px] tracking-[0.06em] text-stone">WORKSPACE</span>
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          className={`flex h-8.25 items-center rounded px-2.5 text-[11px] text-ink transition-colors duration-200 hover:bg-sage2 ${
            item.active ? "bg-sage2 font-semibold" : ""
          }`}
        >
          {item.label}
        </a>
      ))}
      <div className="flex flex-col gap-2.25 px-2.5 pt-8.5 max-[700px]:hidden">
        <span className="text-[9px] tracking-[0.06em] text-stone">CONNECTED WALLET</span>
        <span className="text-[11px] text-ink">{hero.demo.wallet.name}</span>
        <span className="text-[10px] text-stone">{hero.demo.wallet.addr}</span>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {hero.demo.wallet.networks.map((network) => (
            <span
              key={network}
              className="inline-flex items-center gap-1.5 rounded bg-sage2 px-1.75 py-0.75 text-[9px] text-ink"
            >
              <span className="h-1.25 w-1.25 rounded-full bg-forest" aria-hidden="true" />
              {network}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}

function TransactionList() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-chip border border-hairline" role="table" aria-label="Transactions">
      <div className="flex h-7.5 items-center bg-sage px-4 text-[9px] tracking-[0.04em] text-stone" role="row">
        <span className="flex-1" role="columnheader">TRANSACTION</span>
        <span className="w-30.5" role="columnheader">AMOUNT</span>
        <span className="w-26.25" role="columnheader">STATUS</span>
      </div>
      {hero.demo.transactions.map((tx) => (
        <div
          key={tx.name}
          role="row"
          className="flex h-16 items-center border-b border-hairline px-4 last:border-b-0"
        >
          <div className="flex flex-1 flex-col gap-1.25" role="cell">
            <span className="text-[12px] font-medium text-ink">{tx.name}</span>
            <span className="text-[10px] text-stone">{tx.meta}</span>
          </div>
          <span className="w-30.5 text-[12px] text-ink" role="cell">{tx.amount}</span>
          <div className="w-26.25" role="cell">
            <StatusBadge status={tx.status === "Synced" ? "synced" : "pending"}>
              {tx.status}
            </StatusBadge>
          </div>
        </div>
      ))}
    </div>
  );
}

function RuleInspector() {
  return (
    <div className="flex w-73 shrink-0 flex-col gap-3.25 overflow-hidden rounded-chip bg-sage p-4.25">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.04em] text-forest">MATCHED RULE</span>
        <Icon name="check" size={13} />
      </div>
      <span className="text-[14px] font-medium text-ink">Client receipts</span>
      <div className="text-[11px] leading-[1.7] text-moss">
        <p>If incoming · USDC</p>
        <p>From 0x83d…41c2</p>
      </div>
      <div className="h-px bg-hairline" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <Icon name="circle-check" size={16} />
        <div>
          <span className="block text-[11px] font-medium text-ink">Synced to QuickBooks</span>
          <span className="block text-[10px] text-moss">Sales · Services</span>
        </div>
      </div>
    </div>
  );
}

function FlowNarrative() {
  return (
    <div
      className="flex shrink-0 items-center gap-4 rounded-chip bg-sage px-4.25 py-3.75 max-[700px]:flex-wrap max-[700px]:gap-3"
      aria-label="Transaction flow steps"
    >
      {hero.demo.flow.map((step, i) => (
        <div key={step.title} className="contents">
          {i > 0 && <Icon name="arrow-right" size={15} className="shrink-0" />}
          <div className="flex flex-1 items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest text-[10px] text-forest">
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-ink">{step.title}</span>
              <span className="text-[10px] text-moss">{step.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
