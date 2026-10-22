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

export const verifyEmail = {
  heading: "Check your email",
  body: "We've sent a verification link to your email address. Click the link to verify your account and start using Onreco.",
  expiry: "The verification link expires in 1 hour. Check your spam folder if you don't see the email.",
  resend: "Resend verification email",
  sending: "Sending…",
  sent: "Verification email sent. Check your inbox.",
  failed: "Failed to send the verification email. Please try again.",
  backToLogin: "Back to login",
};

export const verifyConfirm = {
  loading: {
    heading: "Verifying your email…",
    body: "Please wait while we verify your email address.",
  },
  success: {
    heading: "Email verified!",
    body: "Your email has been verified. You can now use all features of Onreco.",
    action: "Continue to login",
  },
  error: {
    heading: "Verification failed",
    action: "Resend verification email",
  },
  invalid: {
    heading: "Invalid link",
    body: "No verification token was provided. Please check your email for the correct link.",
  },
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
