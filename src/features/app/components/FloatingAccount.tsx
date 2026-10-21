"use client";

import { useApiData } from "@/lib/useApiData";

import { getUserProfile } from "../api";
import { PLAN_LABELS } from "../content";

/** Floating account chip, pinned to the top-right of the viewport. */
export function FloatingAccount() {
  const { data: profile } = useApiData(getUserProfile);

  if (!profile) {
    return <div className="fixed top-5 right-5 z-40 h-10 w-40 rounded bg-paper-card/92" />;
  }

  const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase();
  const plan = PLAN_LABELS[profile.plan.toLowerCase()] ?? profile.plan;

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-3 rounded border border-hairline bg-paper-card/92 py-1.5 pr-4 pl-1.5 shadow-[0_10px_30px_-14px_rgba(35,61,50,0.24)] backdrop-blur-md">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage2 text-[11px] font-semibold text-forest">
        {initials || "O"}
      </span>

      <div className="hidden text-right sm:block">
        <p className="text-[12px] leading-tight font-medium text-ink">
          {profile.firstName} {profile.lastName}
        </p>
        <p className="text-[11px] leading-tight text-stone">{profile.email}</p>
      </div>

      <span className="hidden rounded-pill bg-sage px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-forest md:inline">
        {plan}
      </span>
    </div>
  );
}
