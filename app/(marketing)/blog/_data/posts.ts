export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    category: string;
    readingMinutes: number;
    content: BlogBlock[];
    image?: string;
};


export type BlogBlock =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "hr" }
    | { type: "cta" };

export const blogPosts: Record<string, BlogPost> = {
    "lightweight-stablecoin-accounting": {
        slug: "lightweight-stablecoin-accounting",
        title: "Lightweight Stablecoin Accounting: A Better Way to Close Your Books",
        description:
            "Why the best stablecoin bookkeeping is lightweight and how a fast, automated ledger replaces heavy spreadsheet workflows.",
        publishedTime: "2026-09-14T00:00:00.000Z",
        author: "Onreco",
        category: "Guides",
        readingMinutes: 7,
        content: [
            {
                type: "p",
                text: "Manual stablecoin bookkeeping is heavy. It is a wall of CSV exports, wallet addresses, duplicate entries, and month-end reconciliation sprints.",
            },
            {
                type: "p",
                text: "Most accounting workflows that handle USDT and USDC started life as a spreadsheet. The heavier they get, the more they cost your finance team in time, errors, and context switching.",
            },
            {
                type: "p",
                text: "In this guide, you\u2019ll learn what lightweight stablecoin accounting actually looks like, why it beats spreadsheet workflows, and how a small automated ledger replaces the heavy lift.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Why Most Stablecoin Accounting Feels Heavy",
            },
            {
                type: "p",
                text: "Traditional stablecoin bookkeeping is heavy because it was assembled from parts that were never designed to work together.",
            },
            {
                type: "ul",
                items: [
                    "Manual CSV exports from wallets and exchanges",
                    "A spreadsheet of wallet addresses that drifts out of date",
                    "Duplicate entries recorded by hand",
                    "Reconciliation that waits until the end of the month",
                    "Reports that have to be rebuilt every cycle",
                    "Constant manual review to catch mistakes",
                ],
            },
            {
                type: "p",
                text: "Every one of these tasks is a small weight on its own. Together they become the reason books lag reality.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "What Lightweight Accounting Looks Like",
            },
            {
                type: "p",
                text: "A lightweight system is small by design. It automates the repetitive parts, keeps your data current, and shrinks the surface area where errors can appear.",
            },
            {
                type: "ul",
                items: [
                    "Wallet activity is detected on chain, not copied and pasted",
                    "Categorization is driven by rules that learn from confirmed entries",
                    "Payments are matched to open invoices automatically",
                    "Journal entries are generated for review instead of typed out",
                    "Syncing to QuickBooks or Xero happens in one step",
                ],
            },
            {
                type: "p",
                text: "You keep the accounting rigor. You lose the manual labor.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "A Three-Step Lightweight Workflow",
            },
            {
                type: "p",
                text: "A lightweight workflow collapses the old seven-step process into three steps:",
            },
            {
                type: "ol",
                items: [
                    "Connect your wallets",
                    "Categorize and match transactions automatically",
                    "Sync approved entries to QuickBooks or Xero",
                ],
            },
            {
                type: "p",
                text: "Each step is small, auditable, and reversible. Nothing is hidden inside a spreadsheet formula.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Where Onreco Fits In",
            },
            {
                type: "p",
                text: "Onreco is purpose-built to keep stablecoin bookkeeping light.",
            },
            {
                type: "p",
                text: "Onreco provides:",
            },
            {
                type: "ul",
                items: [
                    "Monitoring for USDT and USDC wallets on Base and Solana",
                    "Automatic transaction detection with read-only wallet access",
                    "Rules-based categorization that improves as you confirm entries",
                    "Invoice matching for stablecoin payments",
                    "Clean journal entries synced directly to QuickBooks and Xero",
                    "A full audit trail without manual record keeping",
                ],
            },
            {
                type: "p",
                text: "There are no CSV imports, no stale spreadsheets, and no guessing at wallet addresses. The books stay current because the workflow is light enough to run on its own.",
            },
            { type: "hr" },

            { type: "h2", text: "Final Thoughts" },
            {
                type: "p",
                text: "Heavy bookkeeping processes do not make your books more accurate. They just make them more expensive to maintain.",
            },
            {
                type: "p",
                text: "For teams that run on stablecoins, the shift is simple: keep the accounting standard, drop the manual work. When the ledger is lightweight, the close is faster, the reports are cleaner, and your team finally trusts the numbers.",
            },
            { type: "hr" },

            { type: "h2", text: "Learn More" },
            {
                type: "p",
                text: "Onreco helps teams keep stablecoin accounting lightweight, automated, and synced to QuickBooks and Xero.",
            },
            { type: "cta" },
        ],
    },
    "how-to-record-usdt-transactions-in-quickbooks": {
        slug: "how-to-record-usdt-transactions-in-quickbooks",
        title: "How to Record USDT Transactions in QuickBooks (Without Manual Journal Entries)",
        description:
            "Learn how to properly record USDT transactions in QuickBooks, how reconciliation works, and how teams can reduce manual bookkeeping errors.",
        publishedTime: "2026-06-17T00:00:00.000Z",
        author: "Onreco",
        category: "Guides",
        readingMinutes: 8,
        content: [
            {
                type: "p",
                text: "Stablecoins like USDT are now widely used for payroll, contractor payments, and cross-border settlements. However, most accounting tools like QuickBooks were not designed for blockchain transactions.",
            },
            {
                type: "p",
                text: "This creates a gap: businesses receive payments on-chain, but must still record them in traditional accounting systems.",
            },
            {
                type: "p",
                text: "In this guide, you\u2019ll learn how to properly record USDT transactions in QuickBooks, how reconciliation works, and how teams can reduce manual bookkeeping errors.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Why USDT Transactions Are Hard to Record in QuickBooks",
            },
            {
                type: "p",
                text: "QuickBooks is built around traditional banking systems.",
            },
            {
                type: "p",
                text: "USDT transactions, however, come from blockchain wallets, which introduces challenges like:",
            },
            {
                type: "ul",
                items: [
                    "No direct bank feed from wallets",
                    "Lack of invoice context on-chain",
                    "Multiple transactions per wallet address",
                    "No built-in blockchain recognition",
                    "Manual categorization required",
                ],
            },
            {
                type: "p",
                text: "As transaction volume grows, manual bookkeeping becomes slow and error-prone.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Method 1: Manual Journal Entries (Traditional Approach)",
            },
            {
                type: "p",
                text: "Most accountants use journal entries to record USDT transactions.",
            },
            { type: "h3", text: "Steps typically include:" },
            {
                type: "ol",
                items: [
                    "Check wallet for incoming USDT transaction",
                    "Confirm transaction amount and timestamp",
                    "Open QuickBooks journal entry screen",
                    "Create debit and credit entries",
                    "Assign appropriate accounts (e.g., income, liability, expense)",
                    "Save and categorize transaction",
                ],
            },

            { type: "h3", text: "Limitations of this approach" },
            {
                type: "ul",
                items: [
                    "Time-consuming for frequent transactions",
                    "High risk of human error",
                    "Difficult to scale for teams",
                    "No automatic reconciliation",
                    "Requires constant manual review",
                ],
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Method 2: Recording USDT as a Bank-Like Asset",
            },
            {
                type: "p",
                text: "Some businesses treat crypto wallets as bank accounts.",
            },
            { type: "h3", text: "Approach:" },
            {
                type: "ul",
                items: [
                    'Create a \u201CCrypto Wallet\u201D account in QuickBooks',
                    "Record USDT deposits as incoming transfers",
                    "Record payments as outgoing transactions",
                    "Categorize based on purpose (salary, service, expense)",
                ],
            },

            { type: "h3", text: "Challenges" },
            {
                type: "p",
                text: "While better structured, this still requires:",
            },
            {
                type: "ul",
                items: [
                    "Manual transaction tracking",
                    "Constant reconciliation",
                    "Matching wallet activity to accounting records",
                ],
            },
            { type: "hr" },

            {
                type: "h2",
                text: "How to Reconcile USDT Transactions in QuickBooks",
            },
            {
                type: "p",
                text: "Reconciliation ensures that your accounting records match actual wallet activity.",
            },
            { type: "p", text: "This involves:" },
            {
                type: "ul",
                items: [
                    "Matching wallet transactions with recorded entries",
                    "Identifying missing or duplicate entries",
                    "Verifying payment amounts",
                    "Ensuring invoice consistency (if applicable)",
                ],
            },
            {
                type: "p",
                text: "For teams handling frequent payments, reconciliation quickly becomes one of the most time-consuming tasks.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "Common Mistakes When Recording USDT Transactions",
            },
            { type: "p", text: "Many businesses struggle with:" },
            {
                type: "ul",
                items: [
                    "Recording duplicate transactions",
                    "Misclassifying payments",
                    "Missing wallet activity",
                    "Incorrect exchange assumptions",
                    "Poor reconciliation discipline",
                ],
            },
            {
                type: "p",
                text: "These issues lead to inaccurate financial reports.",
            },
            { type: "hr" },

            {
                type: "h2",
                text: "The Scalable Approach: Automating USDT Accounting",
            },
            {
                type: "p",
                text: "As transaction volume increases, manual bookkeeping becomes unsustainable.",
            },
            {
                type: "p",
                text: "Modern teams are moving toward automation that:",
            },
            {
                type: "ul",
                items: [
                    "Detects USDT transactions directly from wallets",
                    "Categorizes transactions based on rules or patterns",
                    "Matches payments with open invoices",
                    "Generates accounting entries automatically",
                    "Syncs directly with QuickBooks",
                ],
            },
            {
                type: "p",
                text: "This reduces manual effort and improves accuracy.",
            },
            { type: "hr" },

            { type: "h2", text: "Where Onreco Fits In" },
            {
                type: "p",
                text: "Onreco is built to automate stablecoin accounting workflows.",
            },
            { type: "p", text: "Instead of manually recording transactions, Onreco:" },
            {
                type: "ul",
                items: [
                    "Monitors wallet activity in real time",
                    "Detects USDT and USDC transactions on-chain",
                    "Categorizes transactions automatically",
                    "Matches payments to invoices when possible",
                    "Syncs entries directly into QuickBooks and Xero",
                ],
            },
            {
                type: "p",
                text: "This removes repetitive bookkeeping work and improves reconciliation accuracy.",
            },
            { type: "hr" },

            { type: "h2", text: "Final Thoughts" },
            {
                type: "p",
                text: "Recording USDT transactions in QuickBooks is possible manually, but it does not scale well for active businesses.",
            },
            { type: "p", text: "Most teams eventually face the same problems:" },
            {
                type: "ul",
                items: [
                    "Too many transactions",
                    "Too much manual work",
                    "Increasing reconciliation errors",
                ],
            },
            {
                type: "p",
                text: "Automation is becoming the standard for teams using stablecoins in daily operations.",
            },
            { type: "hr" },

            { type: "h2", text: "Learn More" },
            {
                type: "p",
                text: "Onreco helps teams automate stablecoin accounting, reconciliation, and QuickBooks/Xero synchronization.",
            },
            { type: "cta" },
        ],
    },
};

export function getAllPostSlugs(): string[] {
    return Object.keys(blogPosts);
}

export function getPost(slug: string): BlogPost | undefined {
    return blogPosts[slug];
}
