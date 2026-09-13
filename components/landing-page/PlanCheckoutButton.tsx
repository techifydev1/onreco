"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useToastStore } from "@/providers/toast-provider";
import type { SubscriptionPlan } from "@/services/SubscriptionService";

export async function initializeCheckout(slug: string): Promise<void> {
   const res = await fetch(`/api/payment/initialize/${slug}`, {
      method: "POST",
      credentials: "include",
   });

   if (res.status === 201) {
      const data: { authorizationUrl?: string } | null = await res
         .json()
         .catch(() => null);
      if (data?.authorizationUrl) {
         window.location.href = data.authorizationUrl;
         return;
      }
      throw new Error("Missing checkout URL from server. Please try again.");
   }

   if (res.status === 401) {
      window.location.href = `/login?redirect=${encodeURIComponent(`/?plan=${slug}`)}`;
      return;
   }

   if (res.status === 403) {
      window.location.href = "/verify-email";
      return;
   }

   const message = await res.text().catch(() => "");
   throw new Error(message || `Something went wrong (${res.status}). Please try again.`);
}

const PAID_BUTTON_CLASSES =
   "mt-auto w-full rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer";
const FREE_BUTTON_CLASSES =
   "mt-auto block w-full rounded-lg px-5 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90";

export default function PlanCheckoutButton({
   plan,
   highlighted,
}: {
   plan: SubscriptionPlan;
   highlighted: boolean;
}) {
   const [pending, setPending] = useState(false);
   const { show } = useToastStore();

   if (plan.price === 0) {
      return (
         <Link
            href="/signup"
            className={`${FREE_BUTTON_CLASSES} ${
               highlighted
                  ? "btn-primary text-on-primary-container"
                  : "border border-outline-variant/30 text-on-surface hover:border-primary/50 hover:text-primary"
            }`}
         >
            Get Started Free
         </Link>
      );
   }

   const handleChoose = async () => {
      if (pending) return;
      setPending(true);
      try {
         await initializeCheckout(plan.slug);
      } catch (err) {
         show(
            err instanceof Error ? err.message : "Something went wrong. Please try again.",
            "error"
         );
      } finally {
         setPending(false);
      }
   };

   return (
      <button
         type="button"
         onClick={handleChoose}
         disabled={pending}
         className={`${PAID_BUTTON_CLASSES} ${
            highlighted
               ? "btn-primary text-on-primary-container"
               : "border border-outline-variant/30 text-on-surface hover:border-primary/50 hover:text-primary"
         }`}
      >
         {pending ? (
            <span className="inline-flex items-center justify-center gap-2">
               Opening checkout…
               <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </span>
         ) : (
            `Choose ${plan.name}`
         )}
      </button>
   );
}

export function PricingCheckoutAutoInit({ plans }: { plans: SubscriptionPlan[] }) {
   const searchParams = useSearchParams();
   const { show } = useToastStore();
   const firedSlug = useRef<string | null>(null);

   useEffect(() => {
      const plan = searchParams.get("plan");
      if (!plan) return;
      if (firedSlug.current === plan) return;
      if (!plans.some((p) => p.slug === plan && p.price > 0)) return;

      firedSlug.current = plan;
      initializeCheckout(plan).catch((err) => {
         show(
            err instanceof Error ? err.message : "Something went wrong. Please try again.",
            "error"
         );
      });
   }, [searchParams, plans, show]);

   return null;
}