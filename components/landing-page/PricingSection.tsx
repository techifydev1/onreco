import { Suspense } from "react";
import { Check } from "lucide-react";

import SubscriptionService, { type SubscriptionPlan } from "@/services/SubscriptionService";
import PlanCheckoutButton, { PricingCheckoutAutoInit } from "@/components/landing-page/PlanCheckoutButton";

const HIGHLIGHTED_SLUG = "standard";

const formatPrice = (price: number) =>
   price === 0 ? "$0" : `$${Number.isInteger(price) ? price : price.toFixed(2)}`;

function PlanCard({ plan, highlighted }: { plan: SubscriptionPlan; highlighted: boolean }) {
   const transactionLabel =
      plan.transactionCount === 1 ? "transaction" : "transactions";

   return (
      <div
         className={`relative flex flex-col rounded-xl p-8 border ${
            highlighted
               ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20"
               : "border-outline-variant/20 shadow-sm"
         }`}
      >
         {highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
               Most Popular
            </span>
         )}

         <h3 className="text-[20px] leading-7 font-semibold text-on-surface mb-1">{plan.name}</h3>
         <p className="text-sm text-on-surface-variant leading-5 mb-6">{plan.description}</p>

         <div className="mb-6">
            <span className="text-[40px] leading-10 font-bold tracking-tight text-on-surface">
               {formatPrice(plan.price)}
            </span>
            <span className="text-sm text-on-surface-variant ml-2">per month</span>
         </div>

         <ul className="flex flex-col gap-3 mb-8">
            <li className="flex items-start gap-2.5 text-sm text-on-surface">
               <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
               <span>
                  <span className="font-semibold">{plan.transactionCount.toLocaleString()}</span>{" "}
                  {transactionLabel} per month
               </span>
            </li>
         </ul>

         <PlanCheckoutButton plan={plan} highlighted={highlighted} />
      </div>
   );
}

export default async function PricingSection() {
   const plans = await SubscriptionService.getPlans();

   return (
      <section id="pricing" className="px-4 md:px-8 py-24 bg-surface-container-lowest border-b border-outline-variant/10">
         <div className="max-w-container-max mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
               <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-4">
                  Simple, transparent pricing
               </h2>
               <p className="text-[16px] leading-6 text-on-surface-variant">
                  Plans are based on transaction volume. Start free and upgrade as your bookkeeping grows. Cancel anytime.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {plans.map((plan) => (
                  <PlanCard
                     key={plan.slug}
                     plan={plan}
                     highlighted={plan.slug === HIGHLIGHTED_SLUG}
                  />
               ))}
            </div>

            <Suspense fallback={null}>
               <PricingCheckoutAutoInit plans={plans} />
            </Suspense>
         </div>
      </section>
   );
}