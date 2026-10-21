import { api } from "@/services/api/client";

import type { DashboardSummary, SubscriptionPlan, UserProfile } from "./types";

export function getDashboardSummary(): Promise<DashboardSummary> {
  return api.get<DashboardSummary>("/api/dashboard/summary");
}

export function getUserProfile(): Promise<UserProfile> {
  return api.get<UserProfile>("/api/users/me");
}

export function getPlans(): Promise<SubscriptionPlan[]> {
  return api.get<SubscriptionPlan[]>("/api/subscription/plans");
}
