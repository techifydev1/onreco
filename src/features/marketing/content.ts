// Landing page copy + data. Mirrors onreco-redesign/index.html verbatim so the
// markup stays presentational and copy edits stay in one place.

export const seo = {
  title: "Onreco — Stablecoin accounting, in order",
  description:
    "Onreco detects your USDC and USDT transactions and syncs them to QuickBooks or Xero. Your rules decide what gets recorded.",
};

export const nav = {
  links: [
    { label: "How it works", href: "#how" },
    { label: "Integrations", href: "#integrations" },
    { label: "Who it's for", href: "#audience" },
    { label: "FAQs", href: "#faq" },
  ],
  cta: { label: "Book a demo", href: "#demo" },
};

export const hero = {
  eyebrow: "STABLECOIN PAYMENTS. FAMILIAR BOOKS.",
  headline: ["Stablecoin payments.", "Properly accounted for."],
  sub: "Onreco detects your USDC and USDT transactions and syncs them to QuickBooks or Xero. Your rules decide what gets recorded.",
  primaryCta: { label: "Book a demo", href: "#demo" },
  ghostLink: { label: "See the flow ↓", href: "#how" },
  demo: {
    captionLabel: "FROM PAYMENT TO BOOKS, WITHOUT THE GUESSWORK",
    captionNote: "Illustrative workspace · Sample transactions",
    wallet: {
      name: "Operating wallet",
      addr: "0x71c…8a2f",
      networks: ["Base", "Solana"],
    },
    transactions: [
      {
        name: "Client payment",
        meta: "Oct 20 · 0x83d…41c2 · Incoming",
        amount: "+ 2,400 USDC",
        status: "Synced" as const,
      },
      {
        name: "Contractor payment",
        meta: "Oct 19 · 0x92a…7b14 · Outgoing",
        amount: "− 850 USDT",
        status: "Synced" as const,
      },
      {
        name: "Incoming payment",
        meta: "Oct 19 · 0x56f…e903 · Incoming",
        amount: "+ 650 USDC",
        status: "Pending" as const,
      },
    ],
    flow: [
      { title: "Detected onchain", sub: "2,400 USDC received" },
      { title: "Your rule matched", sub: "Client receipts → Sales" },
      { title: "Synced to your books", sub: "Recorded in QuickBooks" },
    ],
  },
  assurance: {
    left: "For businesses paying or getting paid in USDC & USDT.",
    right: "Your accounting logic. Applied consistently.",
  },
};

export const compat = {
  tagline: "A new way to get paid. Not a new way to keep books.",
  platforms: ["QuickBooks", "xero"],
  networks: ["Base", "Solana"],
};

export const pricing = {
  eyebrow: "SIMPLE PRICING",
  heading: ["Plans that scale with", "your transaction volume."],
  body: "Start free and upgrade as your bookkeeping grows. Cancel anytime.",
  highlighted: "standard",
  plans: [
    {
      name: "Basic",
      slug: "basic",
      transactionCount: 50,
      price: 0,
      description: "For getting familiar with stablecoin bookkeeping.",
    },
    {
      name: "Standard",
      slug: "standard",
      transactionCount: 600,
      price: 15,
      description: "For founders and small teams automating their books.",
    },
    {
      name: "Professional",
      slug: "professional",
      transactionCount: 3000,
      price: 24,
      description: "For accountants and bookkeepers managing clients.",
    },
  ],
};

export const gap = {
  eyebrow: "LESS TRANSLATING. MORE CLARITY.",
  heading: ["The payment is digital.", "The bookkeeping is still bookkeeping."],
  body: [
    "Receiving a stablecoin payment shouldn't mean piecing together wallet activity, spreadsheets and your accounting software.",
    "Onreco connects what happened onchain to how you keep your books—with clear rules, not accounting guesswork.",
  ],
};

export const howItWorks = {
  eyebrow: "01 / THE EVERYDAY FLOW",
  heading: ["From onchain activity", "to a familiar line in your books."],
  desc: "Three clear steps. One important boundary: only transactions that match your rules sync.",
  steps: [
    {
      num: "01",
      title: "Detect the payment.",
      desc: "Onreco detects onchain transactions, so you can see the USDC and USDT moving in and out.",
      card: { kind: "detect" as const, amount: "+ 2,400 USDC", label: "Incoming payment detected" },
    },
    {
      num: "02",
      title: "Apply your rules.",
      desc: "Your rules connect a transaction to its accounting treatment. No match? It stays pending.",
      card: { kind: "rule" as const, condition: "Incoming · USDC · Client wallet", action: "Sales · Services" },
    },
    {
      num: "03",
      title: "Sync to your books.",
      desc: "Matched transactions sync directly to QuickBooks or Xero, based on the rules you set.",
      card: { kind: "sync" as const, amount: "Sales · Services", label: "Synced to QuickBooks" },
    },
  ],
  exception: "No matching rule → Pending. Never silently sent to your books.",
};

export const rules = {
  eyebrow: "02 / YOUR ACCOUNTING LOGIC",
  heading: ["You know the payment.", "You set the rule."],
  body: "A client receipt and a contractor payment don't belong in the same place. Tell Onreco how to treat each one, using rules that reflect your books.",
  principles: [
    "Define what a matching payment looks like.",
    "Choose how it belongs in your accounts.",
    "Let matching transactions sync directly.",
  ],
  link: "Walk through a rule with us ↗",
  builder: {
    label: "RULE BUILDER",
    note: "Illustrative example",
    name: "Client receipts",
    desc: "A familiar payment. A consistent category.",
    badge: "Active rule",
    if: {
      tag: "IF",
      label: "A detected transaction matches",
      fields: [
        { label: "Payment direction", value: "Incoming" },
        { label: "Stablecoin", value: "USDC" },
        { label: "From wallet", value: "Client wallet · 0x83d…41c2", full: true },
      ],
    },
    then: {
      tag: "THEN",
      label: "Sync using this accounting treatment",
      fields: [
        { label: "Accounting software", value: "QuickBooks" },
        { label: "Account", value: "Sales · Services" },
      ],
    },
    result: "When this rule matches, the transaction syncs to QuickBooks.",
  },
};

export const pending = {
  label: "THE OTHER PATH",
  note: "Illustrative example",
  title: "Pending review",
  badge: "No matching rule",
  tx: {
    name: "Incoming payment",
    meta: "Oct 19 · From 0x56f…e903",
    amount: "+ 650 USDC",
  },
  details: [
    { label: "Detection", value: "Transaction detected onchain" },
    { label: "Rule check", value: "No matching rule found" },
    { label: "QuickBooks sync", value: "Not synced" },
  ],
  outcome: "Waiting for a rule that tells Onreco where this belongs.",
  caption: "A pause in the workflow. Not a guess in the ledger.",
  eyebrow: "03 / A DELIBERATE PAUSE",
  heading: ["No rule?", "No assumptions."],
  body: "If a transaction doesn't match a rule, it stays pending in Onreco. It isn't synced to QuickBooks or Xero.",
  bodySm:
    "That gives you a clear place to review unfamiliar activity and decide how it should be accounted for.",
  quote: '"The right entry beats a fast guess."',
};

export const integrations = {
  eyebrow: "04 / RIGHT WHERE YOU WORK",
  heading: ["Keep your books.", "Connect your payments."],
  body: "Your accounting software stays at the center. Onreco syncs matching transactions directly to QuickBooks or Xero, according to your rules.",
  cards: [
    {
      name: "QuickBooks",
      badge: "DIRECT SYNC",
      title: "A familiar home for every matched entry.",
      body: "Bring stablecoin activity into the QuickBooks workflow you already use.",
      sample: { account: "Sales · Services", amount: "+ 2,400 USDC", confirm: "Rule matched → Synced to QuickBooks" },
    },
    {
      name: "Xero",
      badge: "DIRECT SYNC",
      title: "Your Xero books. Your accounting logic.",
      body: "Apply your rules to stablecoin transactions and sync the matches to Xero.",
      sample: { account: "Contractor expenses", amount: "− 850 USDT", confirm: "Rule matched → Synced to Xero" },
    },
  ],
};

export const audience = {
  eyebrow: "05 / MADE FOR YOUR DAY JOB",
  heading: ["For people who keep books.", "Not people who follow crypto."],
  body: "Whether you manage the ledger or the business, the goal is the same: payments accounted for.",
  cases: [
    {
      label: "For accountants",
      icon: "calculator",
      title: "Accounting logic, not wallet detective work.",
      body: "Give stablecoin payments a clear accounting treatment. Use rules for familiar transactions and keep unmatched activity pending.",
      tags: "Client receipts · Accounting categories",
    },
    {
      label: "For bookkeepers",
      icon: "book-open",
      title: "A repeatable routine for a new payment type.",
      body: "Make USDC and USDT part of the bookkeeping workflow. Matching transactions go to the books; the exceptions stay visible.",
      tags: "Routine entries · Pending review",
    },
    {
      label: "For founders & CEOs",
      icon: "briefcase",
      title: "Get paid differently. Keep the books familiar.",
      body: "Pay contractors or receive customer payments in stablecoins without making your accounting process a crypto project.",
      tags: "Customer payments · Contractor expenses",
    },
  ],
};

export const faq = {
  eyebrow: "06 / A LITTLE MORE CLARITY",
  heading: ["Good questions.", "Straight answers."],
  body: "No new vocabulary required. Here are the essentials.",
  link: "Have a specific workflow? Let's talk ↗",
  items: [
    {
      q: "What does Onreco actually do?",
      a: "Onreco detects onchain transactions, checks them against your rules and syncs matching transactions directly to QuickBooks or Xero. Transactions without a matching rule stay pending.",
    },
    {
      q: "Which stablecoins is Onreco for?",
      a: "Onreco is for businesses that pay or get paid in USDC and USDT. Bring your payment setup to a demo so we can walk through your workflow.",
    },
    {
      q: "Which chains and networks does Onreco support?",
      a: "Onreco currently supports Base and Solana. Transactions are detected on those networks, checked against your rules and synced to your books when they match.",
    },
    {
      q: "What happens if no rule matches?",
      a: "The transaction stays pending in Onreco and does not sync to your accounting software. It remains there for review rather than being given an assumed accounting treatment.",
    },
    {
      q: "Do I need to change accounting software?",
      a: "No. Onreco connects directly to QuickBooks and Xero, so you can keep using your existing accounting software.",
    },
    {
      q: "Is this only for accountants?",
      a: "No. Onreco is for accountants, bookkeepers, founders and CEOs who need to account for stablecoin payments in a familiar way.",
    },
    {
      q: "Do I need to be a crypto expert?",
      a: "You work with transactions, rules and accounting categories. Onreco handles detecting the onchain activity, so the workflow can stay focused on the books.",
    },
  ],
};

export const cta = {
  eyebrow: "LET'S PUT IT IN ORDER",
  heading: ["Your next payment.", "A clearer path to the books."],
  sub: "See how your USDC and USDT payments could move from detected to matched to recorded—with a deliberate pause when they don't match.",
  button: { label: "Book a demo", href: "#" },
  note: ["Bring your workflow.", "We'll walk through it together."],
  platforms: ["QuickBooks", "Xero"],
};

export const footer = {
  tagline: ["Stablecoin payments. Familiar books.", "Accounting that stays in your language."],
  groups: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Rules & pending review", href: "#" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "For your team",
      links: [
        { label: "Accountants", href: "#audience" },
        { label: "Bookkeepers", href: "#audience" },
        { label: "Founders & CEOs", href: "#audience" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Book a demo", href: "#demo" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Onreco",
  tag: "Built around your books, not the other way around.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
