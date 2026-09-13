'use client';

import { useState } from 'react';
import { CreditCard, Crown, ExternalLink, Sparkles } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionHeading from './SectionHeading';
import PlanPickerDialog from '../upgrade/PlanPickerDialog';
import { useUserProfileStore } from '@/providers/user-profile-store';
import { useToastStore } from '@/providers/toast-provider';
import ApiClient from '@/services/ApiClient';
import { getPlanDisplayName, type PlanName } from '@/services/UserService';

export default function BillingSection() {
   const { userProfile } = useUserProfileStore();
   const { show } = useToastStore();
   const [showPlans, setShowPlans] = useState(false);
   const [opening, setOpening] = useState(false);

   const plan = (userProfile?.plan as PlanName | null | undefined) ?? 'BASIC';
   const isBasic = plan === 'BASIC';
   const planLabel = getPlanDisplayName(plan);

   const handleManageBilling = async () => {
      if (opening) return;
      setOpening(true);
      try {
         const { data } = await ApiClient.post<{ customerPortalUrl: string }, object>('/payment/portal', {});
         window.location.href = data.customerPortalUrl;
      } catch {
         show('Could not open billing portal. Please try again.', 'error');
         setOpening(false);
      }
   };

   return (
      <>
         <SectionCard id="billing">
            <SectionHeading
               icon={CreditCard}
               title="Billing"
               blurb={`You're on the ${planLabel} plan.`}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/10">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isBasic ? 'bg-tertiary-container/20 text-tertiary' : 'bg-primary/10 text-primary'}`}>
                     {isBasic ? <Sparkles className="w-5 h-5" strokeWidth={1.75} /> : <Crown className="w-5 h-5" strokeWidth={1.75} />}
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-on-surface capitalize">{planLabel} plan</p>
                     <p className={`text-xs mt-0.5 ${isBasic ? 'text-tertiary' : 'text-primary'}`}>
                        {isBasic
                           ? 'Free plan — upgrade for more transactions per month.'
                           : 'Active subscription — manage your payment method and invoices.'}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  {isBasic ? (
                     <button
                        type="button"
                        onClick={() => setShowPlans(true)}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors cursor-pointer"
                     >
                        <Sparkles className="w-4 h-4" strokeWidth={2} />
                        Upgrade plan
                     </button>
                  ) : (
                     <>
                        <button
                           type="button"
                           onClick={() => setShowPlans(true)}
                           className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-outline-variant/30 text-on-surface hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                        >
                           View plans
                        </button>
                        <button
                           type="button"
                           onClick={handleManageBilling}
                           disabled={opening}
                           className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                           <ExternalLink className="w-4 h-4" strokeWidth={2} />
                           {opening ? 'Opening...' : 'Manage Billing'}
                        </button>
                     </>
                  )}
               </div>
            </div>
         </SectionCard>

         <PlanPickerDialog open={showPlans} onOpenChange={setShowPlans} />
      </>
   );
}