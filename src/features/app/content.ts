// App shell copy and navigation. Pages marked `available: false` are rendered
// as inactive so the shell reads complete without linking to missing routes.

export type AppNavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  available: boolean;
};

export const appNav: AppNavItem[] = [
  { id: "overview", label: "Overview", href: "/app", icon: "overview", available: true },
  { id: "transactions", label: "Transactions", href: "/app/transactions", icon: "transactions", available: true },
  { id: "categorize", label: "Categorize", href: "/app/categorize", icon: "categorize", available: true },
  { id: "reconcile", label: "Reconciliation", href: "/app/reconcile", icon: "reconciliation", available: true },
  { id: "rules", label: "Rules", href: "/app/rules", icon: "rules", available: true },
  { id: "wallets", label: "Wallets", href: "/app/wallets", icon: "wallets", available: true },
  { id: "integrations", label: "Integrations", href: "/app/integrations", icon: "integrations", available: true },
  { id: "reports", label: "Reports", href: "/app/reports", icon: "reports", available: true },
  { id: "settings", label: "Settings", href: "/app/settings", icon: "settings", available: true },
];

export const appBrand = {
  name: "Onreco",
  home: "/",
};

/** Display names for the backend plan enum. */
export const PLAN_LABELS: Record<string, string> = {
  basic: "Basic",
  standard: "Standard",
  professional: "Professional",
};

export const CHAIN_LABELS: Record<string, string> = {
  BASE: "Base",
  SOLANA: "Solana",
  TRON: "TRON",
};

/** Accent colour per chain, used for the chain dot. */
export const CHAIN_COLORS: Record<string, string> = {
  BASE: "var(--color-chain-base)",
  SOLANA: "var(--color-chain-solana)",
  TRON: "var(--color-chain-tron)",
};

export const overview = {
  eyebrow: "LAST 30 DAYS",
  title: "Your stablecoin picture",
  subtitle: "A quiet look at everything moving through your accounts this month.",
  actions: [
    { label: "Sync now", icon: "refresh", primary: false },
    { label: "Add wallet", icon: "plus", primary: true },
  ],
  stats: [
    { key: "inflow", label: "Received", icon: "arrow-down-left" },
    { key: "outflow", label: "Booked spend", icon: "arrow-up-right" },
    { key: "reconciled", label: "Synced entries", icon: "circle-check" },
    { key: "pending", label: "Needs review", icon: "pause" },
  ] as const,
  chart: {
    title: "Cash flow",
    periods: ["7d", "30d", "90d"],
    activePeriod: "30d",
    empty: "No activity in the last 30 days.",
    emptyHint: "Connect a wallet and the payments you receive will show up here.",
    legend: [
      { label: "Inflow", tone: "inflow" },
      { label: "Outflow", tone: "outflow" },
    ],
  },
  usage: {
    title: "Plan usage",
    resetsOn: "Resets on the 1st.",
  },
  sync: {
    title: "Accounting sync",
    connect: "Connect",
    synced: "Synced",
    lastSync: (ago: string) => `Last sync ${ago} ago`,
    entries: (count: number) => `${count.toLocaleString()} entries pushed`,
  },
  activity: {
    title: "Recent activity",
    cta: "View ledger",
    empty: "No transactions yet.",
  },
  wallets: {
    title: "Your wallets",
    cta: "Manage",
    empty: "No wallets connected yet.",
    connect: "+ Connect another wallet",
  },
};

export const transactions = {
  eyebrow: "THE LEDGER",
  title: "Transactions",
  subtitle:
    "Every detected payment, and where it ended up. Anything without a matching rule waits here for review.",
  filters: {
    all: "All",
    income: "Income",
    expense: "Expense",
    usdc: "USDC",
    usdt: "USDT",
  },
  exportCsv: "Export CSV",
  searchPlaceholder: "Search by hash, wallet or account…",
  columns: {
    date: "Date",
    transaction: "Transaction",
    wallet: "Wallet",
    account: "Account",
    asset: "Asset",
    amount: "Amount",
    status: "Status",
  },
  empty: {
    title: "No transactions yet",
    hint: "Connect a wallet and Onreco will start listing the payments it detects.",
  },
  emptyFiltered: {
    title: "Nothing matches this filter",
    hint: "Try a different filter to see the rest of your ledger.",
  },
};

export const reconcile = {
  eyebrow: "MATCHING",
  title: "Reconciliation",
  subtitle:
    "Payments we think settle an open invoice. Confirm the match and it is booked against that invoice.",
  refresh: "Refresh",
  stats: {
    pending: "Pending entries",
    invoices: "Open invoices",
    matches: "Suggested matches",
  },
  columns: {
    date: "Date",
    payment: "Payment",
    amount: "Amount",
    chain: "Chain",
    invoice: "Suggested invoice",
    confidence: "Confidence",
    action: "Action",
  },
  invoice: {
    doc: (value: string) => `Invoice ${value}`,
    due: (value: string) => `Due ${value}`,
    outstanding: (value: number) => `${value.toLocaleString()} outstanding`,
  },
  confidence: {
    high: "Strong match",
    medium: "Likely match",
    low: "Weak match",
  },
  confirm: "Confirm",
  confirming: "Confirming…",
  confirmed: (count: number) =>
    `${count} match${count === 1 ? "" : "es"} confirmed and sent to your books`,
  confirmFailed: "Could not confirm that match",
  noInvoice: "No open invoice suggested",
  empty: {
    title: "Nothing to reconcile",
    hint: "When a payment looks like it settles an open invoice, it shows up here for you to confirm.",
  },
  noProvider: {
    title: "Connect your accounting software first",
    hint: "Reconciliation compares your payments against the open invoices in your books.",
    action: "Go to integrations",
  },
};

export const rules = {
  eyebrow: "YOUR ACCOUNTING LOGIC",
  title: "Rules",
  subtitle:
    "Each rule decides how a matching payment is treated. A transaction that matches nothing stays pending.",
  newRule: "New rule",
  tabs: {
    all: "All rules",
    active: "Active",
    paused: "Paused",
  },
  suggest: {
    title: "Got a repeating vendor?",
    body: "Rules learn from your approval history too — review a few transactions and Onreco will offer to build one for you.",
    action: "Draft from history",
  },
  empty: {
    title: "No rules yet",
    hint: "Create a rule and matching transactions will start syncing to your books automatically.",
  },
  card: {
    when: "When",
    then: "Then",
    direction: {
      RECEIVED: "Incoming",
      SENT: "Outgoing",
    } as Record<string, string>,
    anyDirection: "Any direction",
    anyWallet: "Any wallet",
    anyCounterparty: "Any counterparty",
    active: "Active",
    paused: "Paused",
    priority: (value: number) => `Priority ${value}`,
    delete: "Delete rule",
    deleteConfirm: "Delete this rule?",
    deleteHint: "Transactions already synced stay synced.",
  },
  form: {
    title: "New rule",
    subtitle: "Tell Onreco what a matching payment looks like and where it belongs.",
    name: "Rule name",
    namePlaceholder: "Client receipts",
    wallet: "Wallet",
    direction: "Direction",
    counterparty: "Counterparty address",
    counterpartyPlaceholder: "0x83d…41c2",
    counterpartyHint: "Leave blank to match any counterparty.",
    account: "Accounting account",
    accountPlaceholder: "Sales · Services",
    accountHint: "The account or category this payment belongs to.",
    priority: "Priority",
    active: "Rule is active",
    submit: "Create rule",
    cancel: "Cancel",
  },
};

export const categorize = {
  eyebrow: "THE OTHER PATH",
  title: "Categorize",
  subtitle:
    "Transactions no rule matched. Give them an account and they sync — nothing is ever sent to your books on a guess.",
  tabs: {
    pending: "Needs review",
    failed: "Failed",
  },
  columns: {
    date: "Date",
    direction: "Direction",
    asset: "Asset",
    amount: "Amount",
    chain: "Chain",
    wallet: "Wallet",
    counterparty: "Counterparty",
    account: "Categorize as",
  },
  refresh: "Refresh",
  select: "Select",
  selected: (count: number) => `${count} selected`,
  clear: "Clear",
  syncSelected: "Sync selected",
  syncOne: "Sync",
  synced: (count: number) => `${count} transaction${count === 1 ? "" : "s"} synced`,
  failed: (count: number) => `${count} could not be synced`,
  empty: {
    pending: {
      title: "Nothing waiting for review",
      hint: "Every detected transaction has a matching rule. New activity lands here when it does not.",
    },
    failed: {
      title: "No failed syncs",
      hint: "Transactions that could not reach your books would show up here.",
    },
  },
  noProvider: {
    title: "Connect your accounting software first",
    hint: "We need to know which accounts exist before we can book a transaction against one.",
    action: "Go to integrations",
  },
  accountPlaceholder: "Choose an account",
  customAccount: "Or type an account name",
};

export const wallets = {
  eyebrow: "CONNECTED ACCOUNTS",
  title: "Wallets",
  subtitle:
    "Onreco watches these addresses on Base and Solana and brings what moves through them into your books.",
  add: "Add wallet",
  stats: {
    connected: "Connected wallets",
    networks: "Networks",
    balance: "Received (30 days)",
    inReview: "In review",
    balanceHint: "Across all connected wallets",
    reviewHint: "Nothing queued — all caught up",
  },
  empty: {
    title: "No wallets connected",
    hint: "Add the address you receive stablecoin payments on to get started.",
  },
  card: {
    monitor: "Monitoring",
    transactions: (count: number) => `${count.toLocaleString()} transactions (30 days)`,
    added: (date: string) => `Added ${date}`,
    lastSync: (ago: string) => `Last sync ${ago} ago`,
    never: "Not synced yet",
    remove: "Remove wallet",
    viewActivity: "View activity",
  },
  form: {
    title: "Add a wallet",
    subtitle: "We only read activity from this address. We never move funds.",
    label: "Label",
    labelPlaceholder: "Treasury USDC",
    address: "Wallet address",
    addressPlaceholder: "0x2f3a1a2c4bd9e8f7a6b5c4d3e2f1a0b9c8d7e6f5",
    chain: "Network",
    currency: "Currencies to monitor",
    submit: "Connect wallet",
    cancel: "Cancel",
  },
};

export const integrations = {
  eyebrow: "WHERE YOU KEEP BOOKS",
  title: "Integrations",
  subtitle:
    "Your accounting software stays at the centre. Onreco only sends what your rules matched.",
  connect: "Connect",
  connecting: "Opening…",
  connectFailed: "Could not start the connection. Please try again.",
  disconnect: "Disconnect",
  disconnectFailed: "Could not disconnect. Please try again.",
  connected: "Connected",
  notConnected: "Not connected",
  unavailable: "Not available yet",
  since: (date: string) => `Connected ${date}`,
  lastSync: (ago: string) => `Last sync ${ago} ago`,
  neverSynced: "No sync yet",
  entries: (count: number) => `${count.toLocaleString()} entries pushed (30 days)`,
  operational: "All systems operational",
  note: {
    title: "Connect once. Stay quiet.",
    body: "Onreco never stores your bookkeeping credentials — integrations exchange OAuth tokens scoped to read and write only.",
  },
  empty: {
    title: "No integrations available",
    hint: "We will let you know as soon as your accounting software is supported.",
  },
};

export const reports = {
  eyebrow: "REPORTS",
  title: "Reports",
  subtitle:
    "Ready-made exports for finance reviews, budget reconciliation and tax filing.",
  cadence: (value: string) => `Refreshes ${value.toLowerCase()}`,
  download: "Download",
  formats: "Formats",
  period: {
    label: "Period",
    hint: (month: string) => `Reports include transactions for ${month}.`,
    pending: "Reports include transactions for the month you pick.",
  },
  empty: {
    title: "No reports available",
    hint: "Reports appear once your workspace is connected.",
  },
};

export const settings = {
  eyebrow: "SETTINGS",
  title: "Settings",
  subtitle: "Your profile, your plan, and the small print.",
  profile: {
    title: "Profile",
    hint: "How we address you in your workspace.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    emailVerified: "Verified",
    emailUnverified: "Not verified",
    emailHint: "Verify your email to connect wallets and accounting software.",
    save: "Save changes",
    saved: "Saved",
    saving: "Saving…",
  },
  plan: {
    title: "Plan & usage",
    hint: "Your plan is based on transaction volume.",
    current: "Current plan",
    limit: "Monthly limit",
    used: "Used this month",
    usage: (used: number, limit: number) => `${used.toLocaleString()} of ${limit.toLocaleString()} transactions`,
    upgrade: "Talk to us about upgrading",
  },
  verification: {
    title: "Verification",
    hint: "Trust signals for the billing account and support queue.",
    email: "Email address",
    identity: "Identity check",
    identityHint: "Required before checkout on paid plans",
    verifyIdentity: "Verify identity",
  },
  session: {
    title: "Session",
    hint: "Sign out of this workspace.",
    signOut: "Sign out",
  },
};

export const topbar = {
  searchPlaceholder: "Search transactions, wallets, rules…",
  notifications: "Notifications",
  account: "Account",
  signOut: "Sign out",
};
