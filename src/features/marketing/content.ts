// Landing page copy + data. Mirrors onreco-redesign/index.html verbatim so the
// markup stays presentational and copy edits stay in one place.

export const seo = {
  title: "Stablecoin accounting software for QuickBooks and Xero | Onreco",
  description:
    "Stablecoin accounting for teams paid in USDC and USDT. Onreco matches payments to rules you write and posts them to QuickBooks or Xero.",
};

export const social = {
  x: { label: "X", href: "https://x.com/onrecohq" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/company/onreco" },
  inbox: "hello@onreco.xyz",
};

export const nav = {
  primary: [
    { label: "How it works", href: "/#how" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
  ],
  dropdown: {
    product: [
      { label: "How it works", href: "/#how" },
      { label: "Rules", href: "/#rules" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Product tour", href: "/demo", page: true },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/#faq" },
      { label: "Who it's for", href: "/#audience" },
    ],
  },
  cta: { label: "Book a demo", shortLabel: "Demo", href: "/contact" },
};

export const hero = {
  eyebrow: "STABLECOIN PAYMENTS. FAMILIAR BOOKS.",
  headline: ["Stablecoin accounting", "that lands in your books."],
  sub: "Onreco watches your Base and Solana wallets, matches USDC and USDT payments against rules you write, and posts the matches to QuickBooks or Xero. If nothing matches, the payment waits for you.",
  primaryCta: { label: "Book a demo", href: "/contact" },
  ghostLink: { label: "See the flow ↓", href: "/#how" },
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
    right: "The same rule, applied the same way every time.",
  },
};

export const compat = {
  tagline: "Get paid in stablecoins. Keep the books you already trust.",
  platforms: ["QuickBooks", "xero"],
  networks: ["Base", "Solana"],
};

export const pricing = {
  eyebrow: "PRICING",
  heading: ["Pay for the volume", "you actually move."],
  body: "Basic is free for your first 50 transactions. Standard is $15 a month for 600, and Professional is $24 for 3,000, which is what most firms running several clients need. Cancel anytime.",
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
  eyebrow: "WHY THIS IS AWKWARD TODAY",
  heading: ["The payment arrives in seconds.", "The bookkeeping takes an afternoon."],
  body: [
    "A stablecoin payment lands in your wallet with a hash, a network and no invoice attached. Your books want a date, an account and a category.",
    "Onreco reads the onchain transaction, applies the rule you wrote for that kind of payment, and posts the result to QuickBooks or Xero. The hash stays on the entry, so the paper trail survives an audit.",
  ],
};

export const howItWorks = {
  eyebrow: "01 / THE EVERYDAY FLOW",
  heading: ["From wallet activity", "to a line in your books."],
  desc: "Three steps, and one rule that matters: nothing reaches your accounting software until a rule matches it.",
  steps: [
    {
      num: "01",
      title: "Detect the payment.",
      desc: "Add a wallet once. Onreco picks up every USDC and USDT transfer in or out on Base and Solana, and keeps the hash it came from.",
      card: { kind: "detect" as const, amount: "+ 2,400 USDC", label: "Incoming payment detected" },
    },
    {
      num: "02",
      title: "Apply your rules.",
      desc: "A rule says what a payment is and where it belongs. Incoming USDC from a client goes to Sales. A contractor payment goes to Contract expenses. No match, no entry.",
      card: { kind: "rule" as const, condition: "Incoming · USDC · Client wallet", action: "Sales · Services" },
    },
    {
      num: "03",
      title: "Sync to your books.",
      desc: "Matched payments sync to QuickBooks or Xero with the date from the chain and the account from your rule. QuickBooks gets a journal entry; Xero gets a manual journal.",
      card: { kind: "sync" as const, amount: "Sales · Services", label: "Synced to QuickBooks" },
    },
  ],
  exception: "No matching rule means pending. It never lands in your books by accident.",
};

export const rules = {
  eyebrow: "02 / YOUR ACCOUNTING LOGIC",
  heading: ["You know the payment.", "Set the rule once."],
  body: "A client receipt and a contractor payment are different entries. Write a rule for each pattern you see often, then let the matched ones post themselves while you get on with the close.",
  principles: [
    "Describe the payment: direction, coin and the wallet it came from.",
    "Pick the account it should hit in your books.",
    "Let it post. Or leave it pending until you are sure.",
  ],
  link: "Walk through a rule with us ↗",
  builder: {
    label: "RULE BUILDER",
    note: "Illustrative example",
    name: "Client receipts",
    desc: "Incoming USDC from one client, filed the same way every month.",
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
    result: "When this rule matches, Onreco posts a USDC journal entry to QuickBooks.",
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
  outcome: "It sits here until a rule, or you, says where it belongs.",
  caption: "A pause costs less than a wrong entry.",
  eyebrow: "03 / WHEN NOTHING MATCHES",
  heading: ["Unmatched payments", "wait in one place."],
  body: "If a transaction does not match a rule, it stays pending in Onreco and does not touch QuickBooks or Xero.",
  bodySm:
    "You get one list to review before you close, with the hash, the amount and the wallet for each payment.",
  quote: '"The right entry beats a fast guess."',
};

export const integrations = {
  eyebrow: "04 / WHERE IT LANDS",
  heading: ["Keep the ledger.", "Add the payments."],
  body: "QuickBooks or Xero stays the source of truth. Onreco connects to both, and only writes an entry when a payment matched one of your rules.",
  cards: [
    {
      name: "QuickBooks",
      badge: "DIRECT SYNC",
      title: "A QuickBooks crypto integration that posts journal entries.",
      body: "Matched USDC and USDT payments arrive as journal entries, with your account mapping and the transaction hash in the memo.",
      sample: { account: "Sales · Services", amount: "+ 2,400 USDC", confirm: "Rule matched → Synced to QuickBooks" },
    },
    {
      name: "Xero",
      badge: "DIRECT SYNC",
      title: "A Xero crypto integration for manual journals.",
      body: "Matched payments post as manual journals in Xero, dated from the chain and narrated with the payment details.",
      sample: { account: "Contractor expenses", amount: "− 850 USDT", confirm: "Rule matched → Synced to Xero" },
    },
  ],
};

export const audience = {
  eyebrow: "05 / WHO THIS IS FOR",
  heading: ["Built for the person", "who closes the books."],
  body: "Crypto accounting for accountants and bookkeepers usually means a second set of tools and a second set of habits. This one is meant to sit inside the routine you already have.",
  cases: [
    {
      label: "For accountants",
      icon: "calculator",
      title: "Stablecoin bookkeeping that fits your close.",
      body: "Set the treatment for each recurring payment once. Your client's USDC sales and USDT contractor payments land in the same accounts every month, with the hash attached.",
      tags: "Client receipts · Accounting categories",
    },
    {
      label: "For bookkeepers",
      icon: "book-open",
      title: "A routine for a payment type that is not going away.",
      body: "Wallets, rules and pending review work like the rest of your checklist. Matched payments post themselves and the exceptions stay in one list.",
      tags: "Routine entries · Pending review",
    },
    {
      label: "For founders & CEOs",
      icon: "briefcase",
      title: "Get paid in stablecoins without turning finance into a project.",
      body: "Receive customer payments or pay contractors in USDC and USDT. Your accountant still opens QuickBooks or Xero and sees a normal ledger.",
      tags: "Customer payments · Contractor expenses",
    },
  ],
};

export const faq = {
  eyebrow: "06 / STRAIGHT ANSWERS",
  heading: ["Good questions.", "Straight answers."],
  body: "The short version, without the crypto vocabulary.",
  link: "Have a specific workflow? Let's talk ↗",
  items: [
    {
      q: "What does Onreco do?",
      a: "It watches the wallets you add, matches USDC and USDT payments to rules you write, and posts the matches to QuickBooks or Xero. Payments with no matching rule stay pending in Onreco.",
    },
    {
      q: "How do I record a USDC payment in QuickBooks?",
      a: "Add the wallet, write a rule for that kind of payment, and let Onreco post it. The result is a QuickBooks journal entry dated from the chain. The offset account comes from your rule; the stablecoin account comes from your integration settings.",
    },
    {
      q: "Can I sync crypto to QuickBooks automatically?",
      a: "For payments that match a rule, yes. Onreco creates the journal entry in QuickBooks for you. Anything unmatched waits until you add a rule or categorize it.",
    },
    {
      q: "How does crypto payment reconciliation work?",
      a: "Every transfer is detected with its hash and wallet, so the evidence is there before you start. Rules decide the accounting treatment, and the reconcile screen matches a payment against an open invoice when you have one.",
    },
    {
      q: "Which stablecoins and networks are supported?",
      a: "USDC and USDT on Base and Solana. Both coins use the same rules and the same set of books, so you do not have to treat them separately.",
    },
    {
      q: "What happens if no rule matches?",
      a: "The payment stays pending in Onreco. Nothing is posted to your accounting software until you add a rule or assign the account yourself.",
    },
    {
      q: "Do I have to change accounting software?",
      a: "No. Onreco connects to QuickBooks and Xero. Your ledger, chart of accounts and closing process stay where they are.",
    },
    {
      q: "Is this a full accounting package?",
      a: "No. Onreco is stablecoin accounting software that connects to the accounting package you already use. QuickBooks and Xero keep the ledger.",
    },
    {
      q: "Who writes the rules?",
      a: "You do, or your accountant does. Most teams start with two: money in from clients and money out to contractors.",
    },
  ],
};

export const cta = {
  eyebrow: "NEXT STEP",
  heading: ["Bring one wallet.", "See where it lands."],
  sub: "A demo runs on your setup: which wallets you use, what you pay people in, and which accounts those payments should hit. Twenty minutes, no deck.",
  button: { label: "Book a demo", href: "/contact" },
  note: ["Bring a wallet address or two.", "We'll walk through the rest."],
  platforms: ["QuickBooks", "Xero"],
};

export const footer = {
  tagline: ["Stablecoin payments. Familiar books.", "Accounting that stays in your language."],
  groups: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/#how" },
        { label: "Rules & pending review", href: "/#rules" },
        { label: "Integrations", href: "/#integrations" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "For your team",
      links: [
        { label: "Accountants", href: "/#audience" },
        { label: "Bookkeepers", href: "/#audience" },
        { label: "Founders & CEOs", href: "/#audience" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Book a demo", href: "/contact" },
        { label: "Contact", href: "/contact" },
        { label: social.inbox, href: `mailto:${social.inbox}` },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ],
  copyright: "© 2026 Onreco",
  tag: "Built around your books, not the other way around.",
  legal: [
    { label: social.x.label, href: social.x.href },
    { label: social.linkedin.label, href: social.linkedin.href },
  ],
};

export const contactPage = {
  seo: {
    title: "Contact Onreco | Stablecoin accounting for QuickBooks and Xero",
    description:
      "Questions about USDC or USDT bookkeeping, QuickBooks sync or a demo? Send a note to Onreco and we will reply from hello@onreco.xyz.",
  },
  eyebrow: "CONTACT",
  heading: ["Tell us what your", "payments look like."],
  sub: "Send a note and we will reply from hello@onreco.xyz. If you are setting up a demo, mention the wallets you use and which accounting software you are on.",
  form: {
    name: { label: "Name", placeholder: "Amina Bello" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "We take USDC payments on Base and use QuickBooks. I want the client payments to hit Sales without retyping anything.",
    },
    submit: "Send message",
    submitting: "Sending...",
    note: "We use your email only to reply to this message.",
  },
  success: {
    heading: "Message sent.",
    body: "We will reply from hello@onreco.xyz, usually within one business day.",
    again: "Send another message",
  },
  error: "That did not send. Try again, or email hello@onreco.xyz directly.",
  fallback: {
    label: "Prefer email?",
    href: `mailto:${social.inbox}`,
    text: social.inbox,
  },
  aside: {
    eyebrow: "ELSEWHERE",
    body: "Short updates on what we are building, and the occasional note on stablecoin bookkeeping.",
    links: [social.x, social.linkedin],
  },
};

export const demoPage = {
  seo: {
    title: "Onreco product tour | From wallet payment to QuickBooks",
    description:
      "A two-minute walk through Onreco: detected payments, rules, categorization and the sync into QuickBooks.",
  },
  eyebrow: "PRODUCT TOUR",
  heading: ["Two minutes.", "From payment to books."],
  sub: "A real workspace, recorded end to end. Watch the whole tour, or jump to the part you care about.",
  meta: ["Real workspace", "USDC & USDT", "QuickBooks connected"],
  player: {
    label: "ONRECO / PRODUCT TOUR",
    note: "Recorded in a live workspace · 1600 × 1000",
    download: "Download the tour",
  },
  tour: {
    id: "tour",
    title: "Full tour",
    blurb: "Everything, in order: landing, workspace, rules, sync.",
    src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/onreco-product-tour_e8jt2l.mp4",
    poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/02-overview_q3s70d.jpg",
    duration: "2:49",
  },
  chapters: [
    {
      id: "01",
      title: "Landing",
      blurb: "The pitch in one screen: stablecoin payments, familiar books.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/01-landing_ajgixw.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/01-landing_ajgixw.jpg",
      duration: "0:17",
    },
    {
      id: "02",
      title: "Overview",
      blurb: "Balances, cash flow and sync status for the last 30 days.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/02-overview_q3s70d.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/02-overview_q3s70d.jpg",
      duration: "0:28",
    },
    {
      id: "03",
      title: "Transactions",
      blurb: "Every detected payment, with the wallet it landed in.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/03-transactions_cpsfz7.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/03-transactions_cpsfz7.jpg",
      duration: "0:11",
    },
    {
      id: "04",
      title: "Categorize",
      blurb: "Payments no rule matched wait here until you assign an account.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/04-categorize_tjk6ww.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/04-categorize_tjk6ww.jpg",
      duration: "0:15",
    },
    {
      id: "05",
      title: "Rules",
      blurb: "One rule per pattern. Incoming USDC from a client goes to Sales.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/05-rules-overview_vtqbyb.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/05-rules-overview_vtqbyb.jpg",
      duration: "0:08",
    },
    {
      id: "06",
      title: "Create a rule",
      blurb: "Describe the payment and pick the account it posts to.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/06-rule-create_l568zp.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/06-rule-create_l568zp.jpg",
      duration: "0:17",
    },
    {
      id: "07",
      title: "Edit a rule",
      blurb: "Change a rule after the fact. No re-entry, no backlog.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/07-rule-edit_rvcptb.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/07-rule-edit_rvcptb.jpg",
      duration: "0:20",
    },
    {
      id: "08",
      title: "Wallets",
      blurb: "The addresses Onreco watches, on Base and Solana.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/08-wallets_vmxzrm.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/08-wallets_vmxzrm.jpg",
      duration: "0:08",
    },
    {
      id: "09",
      title: "Integrations",
      blurb: "QuickBooks stays the source of truth. Onreco only sends matches.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/09-integrations_y27laj.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/09-integrations_y27laj.jpg",
      duration: "0:07",
    },
    {
      id: "10",
      title: "Reconciliation",
      blurb: "Confirm which payment settles which open invoice.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/10-reconciliation_fhx9ou.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/10-reconciliation_fhx9ou.jpg",
      duration: "0:10",
    },
    {
      id: "11",
      title: "Reports",
      blurb: "Ready-made exports for finance reviews and tax filing.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/11-reports_ctwqf3.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/11-reports_ctwqf3.jpg",
      duration: "0:10",
    },
    {
      id: "12",
      title: "Settings",
      blurb: "Profile, plan and the details underneath.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/12-settings_asimgz.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/12-settings_asimgz.jpg",
      duration: "0:08",
    },
    {
      id: "13",
      title: "Closing",
      blurb: "Back to where it started.",
      src: "https://res.cloudinary.com/dvpkp0u9u/video/upload/13-closing_bqdmio.mp4",
      poster: "https://res.cloudinary.com/dvpkp0u9u/video/upload/h_800,q_auto/13-closing_bqdmio.jpg",
      duration: "0:07",
    },
  ],
  highlights: [
    {
      icon: "book-open" as const,
      title: "Rules, not guesswork",
      body: "A payment only reaches your books when a rule matches it. Everything else waits, visibly.",
    },
    {
      icon: "calculator" as const,
      title: "Your ledger stays yours",
      body: "QuickBooks and Xero remain the ledger. Onreco only writes what it can explain.",
    },
    {
      icon: "circle-check" as const,
      title: "Two chains, one view",
      body: "Base and Solana wallets roll into the same workspace, with the same rules.",
    },
  ],
  cta: {
    eyebrow: "SEE IT WITH YOUR OWN WALLETS",
    heading: ["Bring your payments.", "We'll walk the workflow."],
    sub: "A demo is a conversation about your setup: which wallets you use, who you pay, and where it should land in your books.",
    primary: { label: "Book a demo", href: "/#demo" },
    secondary: { label: "Open the workspace", href: "/app" },
  },
};
export { getAllPostSlugs, getPost, type BlogPost, type BlogBlock } from "@/app/(marketing)/blog/_data/posts";
