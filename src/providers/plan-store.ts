import { create } from "zustand";

import type { SubscriptionPlan } from "@/features/app/types";

interface PlanStoreState {
  plans: SubscriptionPlan[];
  setPlans: (plans: SubscriptionPlan[]) => void;
}

export const usePlanStore = create<PlanStoreState>((set) => ({
  plans: [],
  setPlans: (plans) => set({ plans }),
}));

export function usePlans() {
  return usePlanStore((state) => state.plans);
}