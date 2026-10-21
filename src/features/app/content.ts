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
    synced: "Synced",
    pending: "Needs review",
    failed: "Failed",
  },
  searchPlaceholder: "Search by hash, wallet or account…",
  columns: {
    date: "Date",
    transaction: "Transaction",
    wallet: "Wallet",
    account: "Account",
    amount: "Amount",
    status: "Status",
  },
  empty: {
    title: "No transactions yet",
    hint: "Connect a wallet and Onreco will start listing the payments it detects.",
  },
  emptyFiltered: {
    title: "Nothing matches this filter",
    hint: "Try a different status to see the rest of your ledger.",
  },
  summary: {
    received: "Received",
    sent: "Sent",
    synced: "Synced",
    pending: "Needs review",
  },
};

export const rules = {
  eyebrow: "YOUR ACCOUNTING LOGIC",
  title: "Rules",
  subtitle:
    "Each rule decides how a matching payment is treated. A transaction that matches nothing stays pending.",
  newRule: "New rule",
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

export const wallets = {
  eyebrow: "CONNECTED ACCOUNTS",
  title: "Wallets",
  subtitle:
    "Onreco watches these addresses on Base and Solana and brings what moves through them into your books.",
  add: "Add wallet",
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
  disconnect: "Disconnect",
  connected: "Connected",
  notConnected: "Not connected",
  unavailable: "Not available yet",
  since: (date: string) => `Connected ${date}`,
  lastSync: (ago: string) => `Last sync ${ago} ago`,
  neverSynced: "No sync yet",
  entries: (count: number) => `${count.toLocaleString()} entries pushed (30 days)`,
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
