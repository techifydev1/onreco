import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { Nav } from "@/features/marketing/components/Nav";
import { Footer } from "@/features/marketing/components/Footer";
import { getAllPostSlugs, getPost, type BlogBlock } from "@/features/marketing/content";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<RouteParams>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    return {
        title: `${post.title} | Onreco Blog`,
        description: post.description,
        keywords: [
            "USDT accounting",
            "USDT QuickBooks",
            "record USDT in QuickBooks",
            "stablecoin accounting",
            "crypto bookkeeping",
            "Onreco",
        ],
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: `/blog/${post.slug}`,
            siteName: "Onreco",
            publishedTime: post.publishedTime,
            modifiedTime: post.modifiedTime ?? post.publishedTime,
            authors: [post.author],
            images: [
                {
                    url: post.image || "/blog_banner_image_1.jpg",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image || "/blog_banner_image_1.jpg"],
        },
    };
}

function ArticleJsonLd({ post }: { post: ReturnType<typeof getPost> }) {
    if (!post) return null;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `https://www.onreco.xyz/blog/${post.slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.onreco.xyz/blog/${post.slug}`,
        },
        headline: post.title,
        description: post.description,
        datePublished: post.publishedTime,
        dateModified: post.modifiedTime ?? post.publishedTime,
        author: {
            "@type": "Organization",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Onreco",
            logo: {
                "@type": "ImageObject",
                url: `https://www.onreco.xyz/favicon.ico`,
            },
        },
        image: `https://www.onreco.xyz${post.image || "/blog_banner_image_1.jpg"}`,
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

function Block({ block }: { block: BlogBlock }) {
    switch (block.type) {
        case "h2":
            return (
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-[1.2] font-semibold text-ink mt-12 mb-4">
                    {block.text}
                </h2>
            );
        case "h3":
            return (
                <h3 className="text-[1.125rem] font-semibold text-ink mt-8 mb-3">
                    {block.text}
                </h3>
            );
        case "p":
            return (
                <p className="text-[16px] leading-[1.7] text-moss mb-4">
                    {block.text}
                </p>
            );
        case "ul":
            return (
                <ul className="list-disc pl-6 space-y-2 text-moss mb-6 marker:text-forest">
                    {block.items.map((item, i) => (
                        <li key={i} className="leading-[1.7]">
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "ol":
            return (
                <ol className="list-decimal pl-6 space-y-2 text-moss mb-6 marker:text-forest marker:font-semibold">
                    {block.items.map((item, i) => (
                        <li key={i} className="leading-[1.7]">
                            {item}
                        </li>
                    ))}
                </ol>
            );
        case "hr":
            return <hr className="my-10 border-hairline/15" />;
        case "cta":
            return (
                <div className="bg-sage/20 rounded-frame p-8 mt-8 text-center border border-forest/20">
                    <h3 className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-[1.2] font-semibold text-ink mb-3">
                        Get early access
                    </h3>
                    <p className="text-moss max-w-xl mx-auto mb-6">
                        Create your free account to start automating stablecoin transactions.
                    </p>
                    <a
                        href="/signup"
                        className="inline-flex h-12 items-center gap-2 rounded bg-forest px-5.75 text-[14px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-[0.88]"
                    >
                        Get Started
                    </a>
                </div>
            );
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<RouteParams>;
}) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const formattedDate = new Date(post.publishedTime).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <div className="bg-paper">
            <Nav hrefPrefix="/" />
            <main className="pt-24">
                <section className="px-(--page-x) pt-17 pb-21 max-[961px]:pb-16">
                    <div className="mx-auto max-w-3xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-moss hover:text-forest transition-colors mb-8"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-forest bg-sage/20 border border-forest/20 rounded-full px-3 py-1">
                                {post.category}
                            </span>
                            <span className="text-[12px] text-moss flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formattedDate}
                                <span aria-hidden="true">·</span>
                                <Clock className="w-3.5 h-3.5" />
                                {post.readingMinutes} min read
                            </span>
                        </div>

                        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold text-ink mb-6">
                            {post.title}
                        </h1>

                        <p className="max-w-2xl text-[16px] leading-[1.7] text-moss mb-8">
                            {post.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-moss">
                            <span>{post.author}</span>
                            <span aria-hidden="true">·</span>
                            <span>{formattedDate}</span>
                            {post.modifiedTime && (
                                <>
                                    <span aria-hidden="true">·</span>
                                    <span>Updated {new Date(post.modifiedTime).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <ArticleJsonLd post={post} />

                <section className="px-(--page-x) py-(--section-y)">
                    <div className="mx-auto max-w-3xl">
                        {post.content.map((block, i) => (
                            <Block key={i} block={block} />
                        ))}
                    </div>
                </section>
            </main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.onreco.xyz/" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.onreco.xyz/blog" },
                            { "@type": "ListItem", position: 3, name: post.title, item: `https://www.onreco.xyz/blog/${post.slug}` },
                        ],
                    }),
                }}
            />
            <Footer hrefPrefix="/" />
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