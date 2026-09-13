"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Crown, X, Zap } from "lucide-react";

import { useUserProfileStore } from "@/providers/user-profile-store";
import { useToastStore } from "@/providers/toast-provider";
import SubscriptionService, {
   type SubscriptionPlan,
} from "@/services/SubscriptionService";
import { getPlanDisplayName, type PlanName } from "@/services/UserService";
import { initializeCheckout } from "@/components/landing-page/PlanCheckoutButton";

type Props = {
   open: boolean;
   onOpenChange: (open: boolean) => void;
};

const formatPrice = (price: number) =>
   price === 0 ? "$0" : `$${Number.isInteger(price) ? price : price.toFixed(2)}`;

export default function PlanPickerDialog({ open, onOpenChange }: Props) {
   // Portal target must be read on the client (no SSR mismatch).
   const [mounted, setMounted] = useState(false);
   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
   const [pendingSlug, setPendingSlug] = useState<string | null>(null);
   const { userProfile } = useUserProfileStore();
   const { show } = useToastStore();

   const currentPlan = (userProfile?.plan as PlanName | null | undefined) ?? "BASIC";

   useEffect(() => {
      setMounted(true);
   }, []);

   // Fetch the plan catalog the first time the dialog opens.
   useEffect(() => {
      if (!open || plans.length > 0) return;
      let active = true;
      SubscriptionService.getPlans()
         .then((list) => {
            if (active && list.length > 0) setPlans(list);
         })
         .catch(() => {});
      return () => {
         active = false;
      };
   }, [open, plans.length]);

   // Lock body scroll while the dialog is open.
   useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = prev;
      };
   }, [open]);

   // Close on ESC.
   useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") onOpenChange(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, [open, onOpenChange]);

   const handleChoose = async (slug: string) => {
      if (pendingSlug) return;
      setPendingSlug(slug);
      try {
         await initializeCheckout(slug);
      } catch (err) {
         show(
            err instanceof Error ? err.message : "Something went wrong. Please try again.",
            "error"
         );
         setPendingSlug(null);
      }
   };

   if (!mounted) return null;

   return createPortal(
      <div
         aria-hidden={!open}
         className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none"
      >
         {/* Scrim */}
         <div
            onClick={() => onOpenChange(false)}
            className={
               "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-200 " +
               (open ? "opacity-100" : "opacity-0")
            }
         />

         {/* Panel */}
         <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plans-title"
            className={
               "relative w-full max-w-lg flex flex-col max-h-[85vh] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl glow-top transition-all duration-200 ease-out " +
               (open
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none")
            }
         >
            {/* Close button */}
            <button
               type="button"
               aria-label="Close"
               onClick={() => onOpenChange(false)}
               className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
               <X className="w-4 h-4" strokeWidth={1.75} />
            </button>

            {/* Header — stays fixed while the plans scroll */}
            <div className="px-6 pt-6 pb-4 shrink-0">
               <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6" strokeWidth={1.75} />
               </div>

               <h2 id="plans-title" className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface mb-2">
                  {currentPlan === "BASIC" ? "Upgrade your plan" : "Plans & pricing"}
               </h2>
               <p className="text-sm text-on-surface-variant leading-relaxed">
                  {currentPlan === "BASIC"
                     ? "You're on the Basic plan. Pick a plan with more transactions per month to keep your books growing."
                     : `You're on the ${getPlanDisplayName(currentPlan)} plan. Compare plans or switch to something that fits better.`}
               </p>
            </div>

            {/* Plans — scrollable */}
            <div className="px-6 pb-6 overflow-y-auto min-h-0">
               <ul className="flex flex-col gap-3">
                  {plans.map((plan) => {
                     const isCurrent = plan.slug === currentPlan.toLowerCase();
                     return (
                        <li
                           key={plan.slug}
                           className={
                              "flex items-center justify-between gap-4 p-4 rounded-xl border transition-colors " +
                              (isCurrent
                                 ? "border-primary bg-primary/5"
                                 : "border-outline-variant/20 bg-surface-container-low/50")
                           }
                        >
                           <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm font-semibold text-on-surface">{plan.name}</span>
                                 {isCurrent && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                                       Current
                                    </span>
                                 )}
                              </div>
                              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                                 {plan.transactionCount.toLocaleString()} transactions/mo &middot; {formatPrice(plan.price)}/mo
                              </p>
                              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{plan.description}</p>
                           </div>

                           <div className="shrink-0">
                              {isCurrent ? (
                                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary">
                                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    Current plan
                                 </span>
                              ) : plan.price === 0 ? (
                                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-outline">
                                    Free tier
                                 </span>
                              ) : (
                                 <button
                                    type="button"
                                    onClick={() => handleChoose(plan.slug)}
                                    disabled={pendingSlug !== null}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                                 >
                                    {pendingSlug === plan.slug ? (
                                       <>
                                          Opening checkout…
                                          <Zap className="w-3.5 h-3.5" strokeWidth={2} />
                                       </>
                                    ) : (
                                       <>
                                          {currentPlan === "BASIC" ? "Upgrade" : "Switch"}
                                          <Zap className="w-3.5 h-3.5" strokeWidth={2} />
                                       </>
                                    )}
                                 </button>
                              )}
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </div>
         </div>
      </div>,
      document.body
   );
}