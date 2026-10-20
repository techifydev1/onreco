// All landing-page copy. Mirrors onreco-redesign/index.html exactly so the
// React port matches the faithful static build word-for-word.

// SEO keywords carried over from the previous landing page metadata.
export const seo = {
  title: 'Lightweight Stablecoin Accounting Tool | Onreco',
  description:
    'The lightweight stablecoin accounting tool for USDT and USDC. Detect transactions on Base and Solana, reconcile payments, and sync directly to QuickBooks and Xero without manual bookkeeping.',
  keywords: [
    'stablecoin accounting',
    'stablecoin accounting tool',
    'lightweight stablecoin accounting',
    'lightweight stablecoin accounting tool',
    'stablecoin accounting software',
    'stablecoin bookkeeping',
    'stablecoin bookkeeping software',
    'stablecoin reconciliation',
    'stablecoin transaction tracking',
    'stablecoin transaction monitoring',
    'QuickBooks crypto integration',
    'QuickBooks stablecoin integration',
    'QuickBooks USDT accounting',
    'QuickBooks USDC accounting',
    'QuickBooks crypto bookkeeping',
    'QuickBooks stablecoin bookkeeping',
    'Xero crypto integration',
    'Xero stablecoin integration',
    'Xero USDT accounting',
    'Xero USDC accounting',
    'Xero crypto bookkeeping',
    'Xero stablecoin bookkeeping',
    'USDT accounting',
    'USDT bookkeeping',
    'USDT reconciliation',
    'USDT transaction tracking',
    'USDC accounting',
    'USDC bookkeeping',
    'USDC reconciliation',
    'USDC transaction tracking',
    'automated bookkeeping',
    'bookkeeping automation',
    'accounting automation',
    'crypto bookkeeping automation',
    'crypto accounting automation',
    'automated journal entries',
    'automatic journal entries',
    'automated transaction categorization',
    'crypto reconciliation',
    'automated reconciliation',
    'transaction reconciliation',
    'wallet reconciliation',
    'stablecoin payment reconciliation',
    'wallet transaction monitoring',
    'wallet transaction sync',
    'wallet accounting automation',
    'crypto wallet accounting',
    'blockchain transaction accounting',
    'on-chain transaction accounting',
    'stablecoin payroll',
    'crypto payroll accounting',
    'stablecoin salary payments',
    'contractor payments in USDT',
    'contractor payments in USDC',
    'web3 accounting',
    'web3 bookkeeping',
    'accounting for web3 startups',
    'crypto startup accounting',
    'startup bookkeeping automation',
    'Solana stablecoin accounting',
    'Solana USDC accounting',
    'Base blockchain accounting',
    'Base stablecoin accounting',
    'manual bookkeeping automation',
    'month end reconciliation',
    'invoice matching automation',
    'transaction categorization software',
    'accounting workflow automation',
  ],
}

export const nav = {
  brand: 'onreco',
  links: [
    { label: 'How it works', href: '/#how' },
    { label: 'Integrations', href: '/#integrations' },
    { label: "Who it's for", href: '/#audience', secondary: true },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQs', href: '/#faq', secondary: true },
    { label: 'Blog', href: '/blog' },
  ],
  cta: { label: 'Book a demo', href: '/#demo' },
}

export const hero = {
  eyebrow: 'Stablecoin payments. Familiar books.',
  headline: ['Stablecoin payments.', 'Properly accounted for.'],
  description:
    'A lightweight stablecoin accounting tool that detects your USDC and USDT transactions on Base and Solana and syncs them to QuickBooks or Xero. Your rules decide what gets recorded.',
  primaryCta: { label: 'Book a demo', href: '/#demo' },
  secondaryCta: { label: 'See the flow ↓', href: '/#how' },
  demoCaption: 'FROM PAYMENT TO BOOKS, WITHOUT THE GUESSWORK',
  sampleNote: 'Illustrative workspace · Sample transactions',
  unmatchedBehavior: 'No matching rule?',
  unmatchedDetail: 'Stays pending. Nothing syncs until a rule matches.',
  assurance: [
    'For businesses paying or getting paid in USDC & USDT.',
    'Your accounting logic. Applied consistently.',
  ],
}

export const demo = {
  workspace: 'Acme Studio',
  connection: 'QuickBooks connected',
  initials: 'AL',
  nav: [
    { label: 'Transactions', active: true },
    { label: 'Rules', active: false },
    { label: 'Integrations', active: false },
  ],
  walletLabel: 'CONNECTED WALLET',
  walletName: 'Operating wallet',
  walletAddress: '0x71c…8a2f',
  pageTitle: 'Transactions',
  dateFilter: 'This month ∨',
  tableHeadings: ['TRANSACTION', 'AMOUNT', 'STATUS'],
  rows: [
    {
      name: 'Client payment',
      detail: 'Oct 20 · 0x83d…41c2 · Incoming',
      amount: '+ 2,400 USDC',
      status: 'Synced',
      tone: 'synced' as const,
    },
    {
      name: 'Contractor payment',
      detail: 'Oct 19 · 0x92a…7b14 · Outgoing',
      amount: '− 850 USDT',
      status: 'Synced',
      tone: 'synced' as const,
    },
    {
      name: 'Incoming payment',
      detail: 'Oct 19 · 0x56f…e903 · Incoming',
      amount: '+ 650 USDC',
      status: 'Pending',
      tone: 'pending' as const,
    },
  ],
  rule: {
    label: 'MATCHED RULE',
    name: 'Client receipts',
    conditions: ['If incoming · USDC', 'From 0x83d…41c2'],
    syncLabel: 'Synced to QuickBooks',
    category: 'Sales · Services',
  },
  flow: [
    { num: '1', title: 'Detected onchain', sub: '2,400 USDC received' },
    { num: '2', title: 'Your rule matched', sub: 'Client receipts → Sales' },
    { num: '3', title: 'Synced to your books', sub: 'Recorded in QuickBooks' },
  ],
}

export const compat = {
  tagline: 'A new way to get paid. Not a new way to keep books.',
  platforms: ['QuickBooks', 'xero'],
  networks: {
    label: 'Networks supported',
    items: ['Base', 'Solana'],
  },
}

export const gap = {
  eyebrow: 'Less translating. More clarity.',
  heading: ['The payment is digital.', 'The bookkeeping is still bookkeeping.'],
  body: [
    "Receiving a stablecoin payment shouldn't mean piecing together wallet activity, spreadsheets and your accounting software.",
    'Onreco connects what happened onchain to how you keep your books—with clear rules, not accounting guesswork.',
  ],
  networksNote:
    'Detecting USDC and USDT on Base and Solana, and syncing matches to QuickBooks and Xero.',
}

export const how = {
  eyebrow: '01 / The everyday flow',
  heading: [
    'From onchain activity',
    'to a familiar line in your books.',
  ],
  description:
    'Three clear steps. One important boundary: only transactions that match your rules sync.',
  steps: [
    {
      num: '01',
      card: { amount: '+ 2,400 USDC', label: 'Incoming payment detected' },
      title: 'Detect the payment.',
      desc: 'Onreco detects onchain transactions, so you can see the USDC and USDT moving in and out.',
    },
    {
      num: '02',
      card: {
        ifLabel: 'IF',
        ifValue: 'Incoming · USDC · Client wallet',
        thenLabel: 'THEN',
        thenValue: 'Sales · Services',
      },
      title: 'Apply your rules.',
      desc: 'Your rules connect a transaction to its accounting treatment. No match? It stays pending.',
    },
    {
      num: '03',
      card: { amount: 'Sales · Services', label: 'Synced to QuickBooks' },
      title: 'Sync to your books.',
      desc: 'Matched transactions sync directly to QuickBooks or Xero, based on the rules you set.',
    },
  ],
  exception: 'No matching rule → Pending. Never silently sent to your books.',
}

export const rules = {
  eyebrow: '02 / Your accounting logic',
  heading: ['You know the payment.', 'You set the rule.'],
  description:
    "A client receipt and a contractor payment don't belong in the same place. Tell Onreco how to treat each one, using rules that reflect your books.",
  principles: [
    'Define what a matching payment looks like.',
    'Choose how it belongs in your accounts.',
    'Let matching transactions sync directly.',
  ],
  tourLink: 'Walk through a rule with us ↗',
  builderLabel: 'RULE BUILDER',
  builderNote: 'Illustrative example',
  card: {
    name: 'Client receipts',
    desc: 'A familiar payment. A consistent category.',
    status: 'Active rule',
    ifGroupLabel: 'A detected transaction matches',
    fieldsIf: [
      { label: 'Payment direction', value: 'Incoming' },
      { label: 'Stablecoin', value: 'USDC' },
      { label: 'From wallet', value: 'Client wallet · 0x83d…41c2', full: true },
    ],
    thenGroupLabel: 'Sync using this accounting treatment',
    fieldsThen: [
      { label: 'Accounting software', value: 'QuickBooks' },
      { label: 'Account', value: 'Sales · Services' },
    ],
    result: 'When this rule matches, the transaction syncs to QuickBooks.',
  },
}

export const pending = {
  eyebrow: '03 / A deliberate pause',
  heading: ['No rule?', 'No assumptions.'],
  description:
    "If a transaction doesn't match a rule, it stays pending in Onreco. It isn't synced to QuickBooks or Xero.",
  description2:
    'That gives you a clear place to review unfamiliar activity and decide how it should be accounted for.',
  principle: '"The right entry beats a fast guess."',
  demoLabel: 'THE OTHER PATH',
  demoNote: 'Illustrative example',
  card: {
    title: 'Pending review',
    status: 'No matching rule',
    txName: 'Incoming payment',
    txMeta: 'Oct 19 · From 0x56f…e903',
    txAmount: '+ 650 USDC',
    details: [
      { label: 'Detection', value: 'Transaction detected onchain' },
      { label: 'Rule check', value: 'No matching rule found' },
      { label: 'QuickBooks sync', value: 'Not synced' },
    ],
    outcome: 'Waiting for a rule that tells Onreco where this belongs.',
  },
  caption: 'A pause in the workflow. Not a guess in the ledger.',
}

export const integrations = {
  eyebrow: '04 / Right where you work',
  heading: ['Keep your books.', 'Connect your payments.'],
  description:
    'Your accounting software stays at the center. Onreco syncs matching transactions directly to QuickBooks or Xero, according to your rules.',
  cards: [
    {
      name: 'QuickBooks',
      badge: 'DIRECT SYNC',
      heading: 'A familiar home for every matched entry.',
      body: 'Bring stablecoin activity into the QuickBooks workflow you already use.',
      sampleLabel: 'EXAMPLE MATCHED TRANSACTION',
      account: 'Sales · Services',
      amount: '+ 2,400 USDC',
      confirm: 'Rule matched → Synced to QuickBooks',
    },
    {
      name: 'Xero',
      badge: 'DIRECT SYNC',
      heading: 'Your Xero books. Your accounting logic.',
      body: 'Apply your rules to stablecoin transactions and sync the matches to Xero.',
      sampleLabel: 'EXAMPLE MATCHED TRANSACTION',
      account: 'Contractor expenses',
      amount: '− 850 USDT',
      confirm: 'Rule matched → Synced to Xero',
    },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  heading: ['Simple, transparent pricing.', 'Pay for the volume you sync.'],
  description:
    'Plans are based on transaction volume. Start free and upgrade as your bookkeeping grows. Cancel anytime.',
  highlightedSlug: 'standard',
  mostPopular: 'MOST POPULAR',
  perMonth: 'per month',
  fallbackPlans: [
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
  ],
  cta: { label: 'Get started', href: '/signup' },
  note: 'Detects USDC & USDT on Base and Solana · Syncs to QuickBooks & Xero.',
}

export const audience = {
  eyebrow: '05 / Made for your day job',
  heading: [
    'For people who keep books.',
    'Not people who follow crypto.',
  ],
  description:
    'Whether you manage the ledger or the business, the goal is the same: payments accounted for.',
  cases: [
    {
      label: 'For accountants',
      icon: 'calculator' as const,
      heading: 'Accounting logic, not wallet detective work.',
      body: 'Give stablecoin payments a clear accounting treatment. Use rules for familiar transactions and keep unmatched activity pending.',
      tags: 'Client receipts · Accounting categories',
    },
    {
      label: 'For bookkeepers',
      icon: 'book' as const,
      heading: 'A repeatable routine for a new payment type.',
      body: 'Make USDC and USDT part of the bookkeeping workflow. Matching transactions go to the books; the exceptions stay visible.',
      tags: 'Routine entries · Pending review',
    },
    {
      label: 'For founders & CEOs',
      icon: 'briefcase' as const,
      heading: 'Get paid differently. Keep the books familiar.',
      body: 'Pay contractors or receive customer payments in stablecoins without making your accounting process a crypto project.',
      tags: 'Customer payments · Contractor expenses',
    },
  ],
}

export const faq = {
  eyebrow: '06 / A little more clarity',
  heading: ['Good questions.', 'Straight answers.'],
  description: 'No new vocabulary required. Here are the essentials.',
  invitation: { label: "Have a specific workflow? Let's talk ↗", href: '/#demo' },
  items: [
    {
      q: 'What does Onreco actually do?',
      a: 'Onreco detects onchain transactions, checks them against your rules and syncs matching transactions directly to QuickBooks or Xero. Transactions without a matching rule stay pending.',
    },
    {
      q: 'Which stablecoins and networks is Onreco for?',
      a: 'Onreco is for businesses that pay or get paid in USDC and USDT on Base or Solana. Bring your payment setup to a demo so we can walk through your workflow.',
    },
    {
      q: 'What happens if no rule matches?',
      a: 'The transaction stays pending in Onreco and does not sync to your accounting software. It remains there for review rather than being given an assumed accounting treatment.',
    },
    {
      q: 'Do I need to change accounting software?',
      a: 'No. Onreco connects directly to QuickBooks and Xero, so you can keep using your existing accounting software.',
    },
    {
      q: 'Is this only for accountants?',
      a: 'No. Onreco is for accountants, bookkeepers, founders and CEOs who need to account for stablecoin payments in a familiar way.',
    },
    {
      q: 'Do I need to be a crypto expert?',
      a: 'You work with transactions, rules and accounting categories. Onreco handles detecting the onchain activity, so the workflow can stay focused on the books.',
    },
  ],
}

export const cta = {
  eyebrow: "Let's put it in order",
  heading: ['Your next payment.', 'A clearer path to the books.'],
  description:
    "See how your USDC and USDT payments could move from detected to matched to recorded—with a deliberate pause when they don't match.",
  action: { label: 'Book a demo', href: '/#demo' },
  context: ['Bring your workflow.', "We'll walk through it together."],
  platforms: ['QuickBooks', 'Xero'],
}

export const footer = {
  brand: 'onreco',
  promise: [
    'Stablecoin payments. Familiar books.',
    'Accounting that stays in your language.',
  ],
  groups: [
    {
      label: 'Product',
      links: [
        { label: 'How it works', href: '/#how' },
        { label: 'Rules & pending review', href: '/#rules' },
        { label: 'Integrations', href: '/#integrations' },
        { label: 'Pricing', href: '/#pricing' },
      ],
    },
    {
      label: 'For your team',
      links: [
        { label: 'Accountants', href: '/#audience' },
        { label: 'Bookkeepers', href: '/#audience' },
        { label: 'Founders & CEOs', href: '/#audience' },
      ],
    },
    {
      label: 'Get in touch',
      links: [
        { label: 'Book a demo', href: '/#demo' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: 'mailto:hashbookshq@gmail.com' },
      ],
    },
  ],
  copyright: '© 2026 Onreco',
  description: 'Built around your books, not the other way around.',
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/eula' },
  ],
}

export const auth = {
  brand: 'Onreco',
  signIn: {
    panel: {
      eyebrow: 'Stablecoin payments. Familiar books.',
      headingLead: 'The accounting layer',
      headingAccent: 'stablecoin',
      headingTail: 'teams actually use.',
      body: 'Sync wallet activity straight into QuickBooks or Xero, match it to journal entries, and reconcile the books while everyone else is still copy-pasting.',
      stats: [
        { value: '19 transactions on Basic', label: 'Free. No card required.' },
      ],
    },
    heading: 'Welcome back',
    subheading: 'Sign in to pick up where you left off.',
    bullets: [
      'Automated stablecoin bookkeeping',
      'USDT and USDC synced to QuickBooks and Xero',
      'Reconciliation and categorization in real time',
    ],
    submit: 'Sign in',
    alternate: { lead: "Don't have an account yet?", action: 'Start on Basic', href: '/signup' },
  },
  signUp: {
    panel: {
      eyebrow: 'Start on Basic — free',
      headingLead: 'Turn onchain activity into',
      headingAccent: 'clear books',
      headingTail: 'from day one.',
      body: 'Create your workspace, connect a wallet or accounting file, and let your rules route every payment to the right place.',
      highlights: [
        { title: 'Stablecoin reconciliation', sub: 'Match wallet activity to journal entries automatically' },
        { title: 'AES-256 encryption', sub: 'Data encrypted at rest and in transit' },
      ],
    },
    heading: 'Create your account',
    subheading: 'Start automating stablecoin bookkeeping in minutes.',
    bullets: [
      'Stablecoin accounting automation',
      'QuickBooks and Xero integration',
      'USDT and USDC transaction tracking',
      'Automated reconciliation workflows',
    ],
    submit: 'Start automating accounting',
    alternate: { lead: 'Already have an account?', action: 'Sign in', href: '/login' },
  },
  agreement: {
    lead: 'By continuing you agree to our',
    terms: { label: 'Terms of Service', href: '/eula' },
    and: 'and',
    privacy: { label: 'Privacy Policy', href: '/privacy' },
    note: 'Free forever on Basic — no card, no surprises.',
  },
  backHome: 'Back to home',
}

