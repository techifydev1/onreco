"use client";

import { useState } from "react";
import { Crown, Sparkles } from "lucide-react";

import AccountMenu from "./AccountMenu";
import PlanPickerDialog from "./upgrade/PlanPickerDialog";
import { useUserProfileStore } from "@/providers/user-profile-store";
import { getPlanDisplayName, type PlanName } from "@/services/UserService";

export default function Topbar() {
    const { userProfile } = useUserProfileStore();
    const [showPlans, setShowPlans] = useState(false);

    const plan = (userProfile?.plan as PlanName | null | undefined) ?? null;
    const isBasic = plan === null || plan === "BASIC";

    return (
        <>
            <header className="sticky top-0 z-30 h-16 border-b border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
                <div className="h-full px-4 md:px-8 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setShowPlans(true)}
                        className={
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer " +
                            (isBasic
                                ? "border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
                                : "border-outline-variant/20 text-on-surface hover:border-primary/40")
                        }
                        title={
                            isBasic
                                ? "You're on Basic — click to upgrade"
                                : `You're on ${getPlanDisplayName(plan)}`
                        }
                    >
                        {isBasic ? (
                            <>
                                <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                                Upgrade
                            </>
                        ) : (
                            <>
                                <Crown className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                                {getPlanDisplayName(plan)}
                            </>
                        )}
                    </button>
                    <div className="flex items-center gap-2 md:gap-3">
                        <AccountMenu />
                    </div>
                </div>
            </header>
            <PlanPickerDialog open={showPlans} onOpenChange={setShowPlans} />
        </>
    );
}