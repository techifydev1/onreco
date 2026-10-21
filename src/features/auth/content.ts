// Auth page copy + data. Kept presentational so markup stays in components.

export const authBrand = {
  name: "Onreco",
  home: "/",
};

export const authPanel = {
  eyebrow: "STABLECOIN PAYMENTS. FAMILIAR BOOKS.",
  headingLead: "The accounting layer",
  headingAccent: "stablecoin",
  headingTail: "teams actually use.",
  body: "Onreco detects your USDC and USDT transactions and syncs them to QuickBooks or Xero. Your rules decide what gets recorded.",
  points: [
    "Detect USDC & USDT on Base and Solana.",
    "Match transactions with your own rules.",
    "Sync the matches to QuickBooks or Xero.",
  ],
};

export const signIn = {
  heading: "Welcome back",
  subheading: "Sign in to pick up where you left off.",
  submit: "Sign in",
  alternate: { lead: "Don't have an account?", action: "Start on Basic", href: "/signup" },
};

export const signUp = {
  heading: "Create your account",
  subheading: "Start on Basic — free, no card required.",
  submit: "Create account",
  alternate: { lead: "Already have an account?", action: "Sign in", href: "/login" },
};

export const authAgreement = {
  lead: "By continuing you agree to our",
  terms: { label: "Terms of Service", href: "/terms" },
  and: "and",
  privacy: { label: "Privacy Policy", href: "/privacy" },
  note: "Free forever on Basic — no card, no surprises.",
};

export const authFooter = {
  backHome: "Back to home",
};
