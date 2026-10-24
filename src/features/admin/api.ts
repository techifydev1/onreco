import { api } from "@/services/api/client";

export type NamedCount = { name: string; count: number };
export type DailyCount = { date: string; count: number };

export type AdminOverview = {
  generatedAt: string;
  users: {
    total: number;
    verified: number;
    new7d: number;
    new30d: number;
    signups: DailyCount[];
  };
  activation: {
    withWallet: number;
    withActiveRule: number;
    withConnection: number;
    withSyncedEntry: number;
    withSubscription: number;
  };
  transactions: {
    total: number;
    last7d: number;
    last30d: number;
    syncSuccessRate30d: number;
    byStatus: NamedCount[];
    byType: NamedCount[];
    byChain: NamedCount[];
    byCurrency: NamedCount[];
    series30d: DailyCount[];
    topErrors30d: NamedCount[];
  };
  wallets: { total: number; active: number };
  rules: { total: number; active: number; usersWithActiveRules: number; topRules30d: NamedCount[] };
  integrations: { total: number; quickbooks: number; xero: number };
  billing: { active: number; pastDue: number; canceled: number; mrr: number; byPlan: NamedCount[] };
};

export function fetchAdminOverview(): Promise<AdminOverview> {
  return api.get<AdminOverview>("/api/admin/overview");
}

export type ReferralSummary = {
  total: number;
  days: number;
  sources: Record<string, number>;
};

export type ReferralRecent = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referral_page: string | null;
  visited_at: string;
  user_id_label: string;
};

export function fetchReferralSummary(days = 30): Promise<ReferralSummary> {
  return api.get<ReferralSummary>(`/api/track/summary?days=${days}`);
}

export function fetchReferralRecent(limit = 10): Promise<ReferralRecent[]> {
  return api.get<ReferralRecent[]>(`/api/track/recent?limit=${limit}`);
}
