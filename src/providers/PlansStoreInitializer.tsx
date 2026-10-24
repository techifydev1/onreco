"use client";

import { useEffect } from "react";

import type { SubscriptionPlan } from "@/features/app/types";

import { usePlanStore } from "./plan-store";

export function useHydratedPlanStore(plans: SubscriptionPlan[]) {
  const { setPlans } = usePlanStore();
  useEffect(() => {
    setPlans(plans);
  }, [plans, setPlans]);
}

export default function PlansStoreInitializer({
  plans,
}: {
  plans: SubscriptionPlan[];
}) {
  useHydratedPlanStore(plans);
  return null;
}