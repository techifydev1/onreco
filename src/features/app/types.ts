// Shapes returned by the Onreco backend for the app shell and pages.

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

/* ── Ledger ─────────────────────────────────────────────────────── */

export type LedgerTransaction = {
  id: string;
  date: string;
  direction: TransactionType;
  asset: Currency;
  amount: number;
  usd: number;
  wallet: string;
  category: string;
  counterparty: string;
  status: SyncStatus;
  gasAmount: number | null;
  gasCurrency: string | null;
  convertedAmount: number | null;
  convertedCurrency: string | null;
};

export type CategorizeEntry = {
  id: string;
  txHash: string;
  amount: number;
  currency: Currency;
  chain: Chain;
  type: TransactionType;
  txDate: string;
  walletAddress: string;
  counterpartyAddress: string;
  syncStatus: SyncStatus;
  errorMessage: string | null;
};

/* ── Categorize ─────────────────────────────────────────────────── */

export type AccountingAccount = {
  id: string;
  label: string;
  type: string | null;
};

export type BatchSyncResult = {
  synced: number;
  failed: number;
  results: Array<{
    journalEntryId: string;
    status: SyncStatus;
    error: string | null;
  }>;
};

/* ── Rules ──────────────────────────────────────────────────────── */

export type Rule = {
  id: string;
  name: string;
  walletId: string | null;
  walletLabel: string | null;
  walletAddress: string | null;
  walletChain: string | null;
  direction: TransactionType | null;
  counterpartyAddress: string | null;
  offsetAccountId: string;
  active: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export type RuleInput = {
  name: string;
  walletId?: string | null;
  direction?: TransactionType | null;
  counterpartyAddress?: string | null;
  offsetAccountId: string;
  priority: number;
  active?: boolean;
};

/* ── Accounting integrations ────────────────────────────────────── */

export type SupportedAccounting = {
  name: string;
  slug: string;
  available: boolean;
  connected: boolean;
  connectedAt: string | null;
  picUrl: string | null;
  blurb: string | null;
};

/* ── Reports ────────────────────────────────────────────────────── */

export type ReportFormat = "CSV" | "PDF" | "XLSX";

export type ReportType = {
  type: string;
  name: string;
  blurb: string;
  formats: ReportFormat[];
  cadence: string;
};
