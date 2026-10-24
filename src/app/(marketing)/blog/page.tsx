import { Footer } from "@/features/marketing/components/Footer";
import { Nav } from "@/features/marketing/components/Nav";
import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./_data/posts";
import { blogIndexSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
    title: "Stablecoin Accounting Blog: USDT & USDC Guides | Onreco",
    description:
        "Practical guides on stablecoin accounting, recording USDT and USDC transactions, and automating QuickBooks and Xero bookkeeping.",
    keywords: [
        "stablecoin accounting",
        "USDT QuickBooks",
        "USDC QuickBooks",
        "USDT bookkeeping",
        "USDC bookkeeping",
        "crypto accounting automation",
        "Onreco blog",
    ],
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Stablecoin Accounting Blog: USDT & USDC Guides | Onreco",
        description:
            "Practical guides on stablecoin accounting, recording USDT and USDC transactions, and automating QuickBooks and Xero bookkeeping.",
        type: "website",
        url: "/blog",
        siteName: "Onreco",
        images: [
            {
                url: "/onreco_main_blog_banner.jpg",
                width: 1200,
                height: 630,
                alt: "Onreco Blog - Stablecoin accounting, explained.",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stablecoin Accounting Blog: USDT & USDC Guides | Onreco",
        description:
            "Practical guides on stablecoin accounting, recording USDT and USDC transactions, and automating QuickBooks and Xero bookkeeping.",
        images: ["/onreco_main_blog_banner.jpg"],
    },
};

export default function BlogIndexPage() {
    const posts = Object.values(blogPosts);

    return (
        <div className="bg-paper">
            <Nav />
            <main className="pt-24">
                <section className="px-(--page-x) pt-17 pb-21 max-[961px]:pb-16">
                    <div className="mx-auto max-w-3xl">
                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-forest">
                            Onreco Blog
                        </span>
                        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-ink mt-3 mb-4">
                            Stablecoin accounting, explained.
                        </h1>
                        <p className="max-w-2xl text-[16px] leading-[1.7] text-moss mb-12">
                            Practical guides on recording USDT and USDC
                            transactions, reconciling wallets, and automating
                            your books.
                        </p>

                        <ul className="flex flex-col gap-5">
                            {posts.map((post) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-paper-card rounded-frame p-6 border border-hairline hover:border-forest/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-forest bg-sage/20 border border-forest/20 rounded-full px-3 py-1">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-moss flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readingMinutes} min read
                                            </span>
                                        </div>
                                        <h2 className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.2] font-semibold text-ink mb-2 group-hover:text-forest transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-moss mb-4">
                                            {post.description}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest">
                                            Read article
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.onreco.xyz/" },
                                { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.onreco.xyz/blog" },
                            ],
                        }),
                    }}
                />
            </main>
            <Footer hrefPrefix="/" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLd(blogIndexSchema(posts)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        name: "Onreco",
                        url: "https://www.onreco.xyz",
                    }),
                }}
            />
        </div>
    );
}