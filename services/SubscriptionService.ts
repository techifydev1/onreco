export interface SubscriptionPlan {
   name: string;
   slug: string;
   transactionCount: number;
   price: number;
   description: string;
}

const getAppOrigin = () => {
   if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
   }
   return 'http://localhost:3000';
};

const FALLBACK_PLANS: SubscriptionPlan[] = [
   {
      name: 'Basic',
      slug: 'basic',
      transactionCount: 50,
      price: 0,
      description: 'For getting familiar with stablecoin bookkeeping.',
   },
   {
      name: 'Standard',
      slug: 'standard',
      transactionCount: 600,
      price: 15,
      description: 'For founders and small teams automating their books.',
   },
   {
      name: 'Professional',
      slug: 'professional',
      transactionCount: 3000,
      price: 24,
      description: 'For accountants and bookkeepers managing clients.',
   },
];

export default class SubscriptionService {
   static async getPlans(): Promise<SubscriptionPlan[]> {
      try {
         const response = await fetch(`${getAppOrigin()}/api/subscription/plans`, {
            cache: 'force-cache',
            headers: {
               Accept: 'application/json',
               'X-Client-Type': 'web',
            },
         });

         if (!response.ok) return FALLBACK_PLANS;

         const plans: unknown = await response.json();
         if (Array.isArray(plans) && plans.length > 0) return plans as SubscriptionPlan[];

         return FALLBACK_PLANS;
      } catch {
         return FALLBACK_PLANS;
      }
   }
}