import { Fragment } from 'react'
import { demo, hero } from '@/components/marketing/content'
import {
  ArrowRight15,
  Check13,
  ChevronDown12,
  CircleCheck16,
  ConnectionIndicator,
  CornerDownRight16,
  StatusIndicator,
} from '@/components/marketing/ui/Icons'

export default function HeroDemo() {
  return (
    <div className="demo-shell">
      <div className="app-frame">
        {/* App header */}
        <div className="app-header">
          <div className="app-workspace">
            <span className="app-brand">onreco</span>
            <span className="app-separator" aria-hidden="true" />
            <span className="app-workspace-name">{demo.workspace}</span>
            <ChevronDown12 />
          </div>
          <div className="app-connection">
            <ConnectionIndicator />
            <span>{demo.connection}</span>
            <div className="app-avatar" aria-label="User initials">
              {demo.initials}
            </div>
          </div>
        </div>

        {/* App body */}
        <div className="app-body">
          <nav className="app-sidebar" aria-label="App navigation">
            <span className="sidebar-label">WORKSPACE</span>
            {demo.nav.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`sidebar-item ${item.active ? 'sidebar-item-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <div className="sidebar-wallet">
              <span className="sidebar-label">{demo.walletLabel}</span>
              <span className="sidebar-wallet-name">{demo.walletName}</span>
              <span className="sidebar-wallet-addr">{demo.walletAddress}</span>
            </div>
          </nav>

          <div className="app-content">
            <div className="app-page-header">
              <span className="app-page-title">{demo.pageTitle}</span>
              <span className="app-filter">{demo.dateFilter}</span>
            </div>

            <div className="app-workspace-layout">
              {/* Transaction list */}
              <div className="tx-list" role="table" aria-label="Transactions">
                <div className="tx-list-head" role="row">
                  <span className="tx-col-main" role="columnheader">
                    {demo.tableHeadings[0]}
                  </span>
                  <span className="tx-col-amount" role="columnheader">
                    {demo.tableHeadings[1]}
                  </span>
                  <span className="tx-col-status" role="columnheader">
                    {demo.tableHeadings[2]}
                  </span>
                </div>
                {demo.rows.map((row) => (
                  <div className="tx-row" role="row" key={row.name + row.detail}>
                    <div className="tx-details" role="cell">
                      <span className="tx-name">{row.name}</span>
                      <span className="tx-meta">{row.detail}</span>
                    </div>
                    <span className="tx-amount" role="cell">
                      {row.amount}
                    </span>
                    <div className="tx-status" role="cell">
                      <span
                        className={`status-badge ${
                          row.tone === 'synced'
                            ? 'status-synced'
                            : 'status-pending'
                        }`}
                      >
                        {row.tone === 'synced' ? (
                          <ConnectionIndicator />
                        ) : (
                          <StatusIndicator />
                        )}
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rule inspector */}
              <div className="rule-inspector">
                <div className="rule-inspector-header">
                  <span className="rule-matched-label">{demo.rule.label}</span>
                  <Check13 />
                </div>
                <span className="rule-name">{demo.rule.name}</span>
                <div className="rule-conditions">
                  {demo.rule.conditions.map((c) => (
                    <p key={c}>{c}</p>
                  ))}
                </div>
                <div className="rule-divider" aria-hidden="true" />
                <div className="rule-destination">
                  <CircleCheck16 />
                  <div>
                    <span className="rule-dest-title">{demo.rule.syncLabel}</span>
                    <span className="rule-dest-sub">{demo.rule.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow narrative */}
            <div className="flow-narrative" aria-label="Transaction flow steps">
              {demo.flow.map((step, i) => (
                <Fragment key={step.num}>
                  {i > 0 && <ArrowRight15 className="flow-arrow" />}
                  <div className="flow-step">
                    <span className="flow-step-num" aria-hidden="true">
                      {step.num}
                    </span>
                    <div className="flow-step-detail">
                      <span className="flow-step-title">{step.title}</span>
                      <span className="flow-step-sub">{step.sub}</span>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending note */}
      <div className="pending-note">
        <CornerDownRight16 />
        <span className="pending-note-prefix">{hero.unmatchedBehavior}</span>
        <span className="pending-note-text">{hero.unmatchedDetail}</span>
      </div>
    </div>
  )
}
