// Shapes returned by the Onreco backend for the app shell and overview.

export type Chain = "SOLANA" | "BASE" | "TRON" | (string & {});
export type Currency = "USDC" | "USDT" | (string & {});
export type SyncStatus = "PENDING" | "SYNCED" | "FAILED";
export type TransactionType = "RECEIVED" | "SENT";
export type Plan = "BASIC" | "STANDARD" | "PROFESSIONAL";

export type JournalEntry = {
  id: string;
  txHash: string;
  amount: number;
  currency: Currency;
  chain: Chain;
  type: TransactionType;
  syncStatus: SyncStatus;
  journalEntryId: string | null;
  txDate: string;
  createdAt: string;
};

export type Wallet = {
  id: string;
  address: string;
  chain: Chain;
  monitoredCurrencies: Currency[];
  label: string;
  active: boolean;
  createdAt: string;
  lastSyncAt: string | null;
  transactionCount30d: number;
};

export type IntegrationStatus = {
  name: string;
  slug: string;
  available: boolean;
  connected: boolean;
  connectedAt: string | null;
  lastSyncAt: string | null;
  pushed30d: number | null;
};

export type ChartPoint = {
  date: string;
  inFlow: number;
  outFlow: number;
};

export type DashboardSummary = {
  inflow30d: number;
  outflow30d: number;
  inflowChange: number;
  outflowChange: number;
  reconciliationRate: number;
  pendingSync: number;
  pushed30d: number;
  integrations: IntegrationStatus[];
  activityChart: ChartPoint[];
  recentTransactions: JournalEntry[];
  connectedWallets: Wallet[];
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  id: string;
  plan: Plan;
};

export type SubscriptionPlan = {
  name: string;
  slug: string;
  transactionCount: number;
  price: number;
  description: string;
};
