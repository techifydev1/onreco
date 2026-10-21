import { api } from "@/services/api/client";

import type {
  AccountingAccount,
  BatchSyncResult,
  CategorizeEntry,
  DashboardSummary,
  LedgerTransaction,
  ReportType,
  Rule,
  ReconcileResult,
  RuleInput,
  SubscriptionPlan,
  SupportedAccounting,
  UserProfile,
  Wallet,
} from "./types";

export function getDashboardSummary(): Promise<DashboardSummary> {
  return api.get<DashboardSummary>("/api/dashboard/summary");
}

export function getUserProfile(): Promise<UserProfile> {
  return api.get<UserProfile>("/api/users/me");
}

export function getPlans(): Promise<SubscriptionPlan[]> {
  return api.get<SubscriptionPlan[]>("/api/subscription/plans");
}

/* ── Ledger ─────────────────────────────────────────────────────── */

export function getTransactions(): Promise<LedgerTransaction[]> {
  return api.get<LedgerTransaction[]>("/api/transaction");
}

export function getPendingEntries(): Promise<CategorizeEntry[]> {
  return api.get<CategorizeEntry[]>("/api/categorize/pending");
}

export function getFailedEntries(): Promise<CategorizeEntry[]> {
  return api.get<CategorizeEntry[]>("/api/categorize/failed");
}

export function batchSync(
  entries: Array<{ journalEntryId: string; offsetAccountId: string }>,
): Promise<BatchSyncResult> {
  return api.post<BatchSyncResult>("/api/categorize/batch-sync", { entries });
}

export function getAccountingAccounts(provider: string): Promise<AccountingAccount[]> {
  return api.get<AccountingAccount[]>(`/api/integration/${provider}/accounts`);
}

/* ── Reconciliation ─────────────────────────────────────────────── */

export function getReconciliations(): Promise<ReconcileResult> {
  return api.get<ReconcileResult>("/api/reconcile");
}

export function confirmMatch(journalEntryId: string, invoiceId: string): Promise<void> {
  return api.post<void>("/api/reconcile/confirm", { journalEntryId, invoiceId });
}

/* ── Rules ──────────────────────────────────────────────────────── */

export function getRules(): Promise<Rule[]> {
  return api.get<Rule[]>("/api/rule");
}

export function createRule(input: RuleInput): Promise<Rule> {
  return api.post<Rule>("/api/rule", input);
}

export function updateRule(id: string, input: RuleInput): Promise<Rule> {
  return api.put<Rule>(`/api/rule/${id}`, input);
}

export function deleteRule(id: string): Promise<void> {
  return api.delete<void>(`/api/rule/${id}`);
}

/* ── Wallets ────────────────────────────────────────────────────── */

export function getWallets(): Promise<Wallet[]> {
  return api.get<Wallet[]>("/api/integration/wallet");
}

export function connectWallet(input: {
  address: string;
  chain: string;
  monitoredCurrencies: string[];
  label?: string;
}): Promise<Wallet> {
  return api.post<Wallet>("/api/integration/wallet/connect", input);
}

export function deleteWallet(id: string): Promise<void> {
  return api.delete<void>(`/api/integration/wallet/${id}`);
}

/* ── Accounting ─────────────────────────────────────────────────── */

export function getSupportedAccounting(): Promise<SupportedAccounting[]> {
  return api.get<SupportedAccounting[]>("/api/integration/supported/accounts");
}

export function disconnectAccounting(provider: string): Promise<void> {
  return api.delete<void>(`/api/integration/${provider}/disconnect`);
}

/**
 * The provider hands back the URL to send the user to. The browser has to
 * be the one that navigates there, so the URL is returned rather than
 * followed.
 */
export function getConnectUrl(provider: string): Promise<{ authorizationUrl: string }> {
  return api.get<{ authorizationUrl: string }>(`/api/integration/${provider}/connect`);
}

/* ── Reports ────────────────────────────────────────────────────── */

export function getReportTypes(): Promise<ReportType[]> {
  return api.get<ReportType[]>("/api/report/types");
}

export function reportDownloadUrl(
  type: string,
  format: string,
  from?: string,
  to?: string,
): string {
  const params = new URLSearchParams({ format });
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  return `/api/report/${type}?${params.toString()}`;
}

/* ── Profile ────────────────────────────────────────────────────── */

export function updateProfile(input: {
  firstName: string;
  lastName: string;
}): Promise<UserProfile> {
  return api.put<UserProfile>("/api/users/me", input);
}
