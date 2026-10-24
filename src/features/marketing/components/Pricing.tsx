"use client";

import type { CSSProperties } from "react";

import { pricing } from "../content";
import { Eyebrow, LoraHeading } from "./primitives";
import { Icon } from "./Icon";
import { usePlans } from "@/providers/plan-store";
import { initializePayment } from "@/features/app/api";
import { useToastStore } from "@/providers/toast-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubscriptionPlan } from "@/features/app/types";

const formatPrice = (price: number) => (price === 0 ? "$0" : `$${price}`);

export function Pricing() {
  const { show } = useToastStore();
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const plans = usePlans();
  const displayPlans = plans.length > 0 ? plans : pricing.plans;

  const handleChoose = async (slug: string, price: number) => {
    if (price === 0) {
      router.push("/signup");
      return;
    }
    if (pendingSlug) return;
    setPendingSlug(slug);
    try {
      const { authorizationUrl } = await initializePayment(slug);
      window.open(authorizationUrl, "_self");
    } catch (err) {
      show(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setPendingSlug(null);
    }
  };

  return (
    <section id="pricing" className="border-t border-hairline px-(--page-x) py-(--section-y)">
      <div className="flex flex-col gap-12">
        <div className="flex items-end gap-37.5 max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-6">
          <div className="flex flex-[0_0_700px] flex-col gap-5.5 max-[961px]:flex-none">
            <Eyebrow tone="green">{pricing.eyebrow}</Eyebrow>
            <LoraHeading size="50">
              {pricing.heading[0]}
              <br />
              {pricing.heading[1]}
            </LoraHeading>
          </div>
          <p className="flex-1 text-[16px] leading-[1.7] text-moss">{pricing.body}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[961px]:grid-cols-1">
          {displayPlans.map((plan: SubscriptionPlan, i: number) => {
            const highlighted = plan.slug === pricing.highlighted;
            const txLabel = plan.transactionCount === 1 ? "transaction" : "transactions";
            return (
              <div
                key={plan.slug}
                className={
                  "plan-card reveal relative flex flex-col gap-3.5 rounded p-7.5 " +
                  (highlighted
                    ? "border-2 border-forest bg-paper-card"
                    : "border border-hairline bg-paper-card")
                }
                style={i ? ({ "--delay": `${i * 80}ms` } as CSSProperties) : undefined}
              >
                {highlighted && (
                  <span className="absolute -top-2.75 left-1/2 -translate-x-1/2 rounded-pill bg-forest px-2.75 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-paper-card">
                    Most popular
                  </span>
                )}

                <h3 className="text-[19px] font-medium text-ink">{plan.name}</h3>
                <p className="text-[13px] leading-[1.6] text-moss">{plan.description}</p>

                <div className="flex items-end gap-1.5 pt-1">
                  <span className="font-serif text-[40px] leading-none text-ink">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="pb-1 text-[13px] text-moss">per month</span>
                </div>

                <div className="flex items-center gap-2.5 border-t border-hairline pt-4">
                  <Icon name="check" size={15} />
                  <span className="text-[13px] text-ink">
                    <span className="font-semibold">{plan.transactionCount.toLocaleString()}</span>{" "}
                    {txLabel} per month
                  </span>
                </div>

                {plan.price === 0 ? (
                  <a
                    href="/signup"
                    className={`
                      mt-auto block w-full rounded-lg px-5 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
                        highlighted
                          ? "bg-forest text-paper-card"
                          : "border border-hairline-strong bg-paper-card text-ink hover:border-forest/50 hover:text-forest"
                      }
                    `}
                  >
                    Get Started Free
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={pendingSlug !== null}
                    onClick={() => handleChoose(plan.slug, plan.price)}
                    className={`
                      mt-auto w-full rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer ${
                        highlighted
                          ? "bg-forest text-paper-card"
                          : "border border-hairline-strong bg-paper-card text-ink hover:border-forest/50 hover:text-forest"
                      }
                    `}
                  >
                    {pendingSlug === plan.slug ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        Opening checkout…
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      </span>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}