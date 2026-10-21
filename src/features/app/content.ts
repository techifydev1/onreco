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
  { id: "transactions", label: "Transactions", href: "/app/transactions", icon: "transactions", available: false },
  { id: "rules", label: "Rules", href: "/app/rules", icon: "rules", available: false },
  { id: "wallets", label: "Wallets", href: "/app/wallets", icon: "wallets", available: false },
  { id: "integrations", label: "Integrations", href: "/app/integrations", icon: "integrations", available: false },
  { id: "reports", label: "Reports", href: "/app/reports", icon: "reports", available: false },
  { id: "settings", label: "Settings", href: "/app/settings", icon: "settings", available: false },
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

export const topbar = {
  searchPlaceholder: "Search transactions, wallets, rules…",
  notifications: "Notifications",
  account: "Account",
  signOut: "Sign out",
};
