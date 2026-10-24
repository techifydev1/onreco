import { ImageResponse } from "next/og";
import { blogPosts } from "./_data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Onreco Blog - Stablecoin accounting, explained.";

export default function Image() {
    const posts = Object.values(blogPosts);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#f7f6f0",
                    padding: 72,
                    backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#285742",
                        backgroundColor: "#f0f3ea",
                        border: "1px solid #daddd2",
                        borderRadius: 9999,
                        padding: "6px 16px",
                    }}>
                        Onreco Blog
                    </span>
                    <span style={{ fontSize: 15, color: "#7a8176" }}>
                        Guides for stablecoin bookkeeping
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <h1 style={{
                        fontSize: 54,
                        fontWeight: 700,
                        color: "#233d32",
                        lineHeight: 1.15,
                        fontFamily: "Georgia, serif",
                    }}>
                        Stablecoin accounting, explained.
                    </h1>
                    <p style={{
                        fontSize: 23,
                        color: "#4f5b51",
                        lineHeight: 1.5,
                        maxWidth: "78%",
                    }}>
                        Practical guides on recording USDT and USDC transactions,
                        reconciling wallets, and automating your books.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 24,
                                borderTop: "1px solid #daddd2",
                                paddingTop: 10,
                            }}
                        >
                            <span style={{ fontSize: 18, color: "#233d32" }}>{post.title}</span>
                            <span style={{ fontSize: 14, color: "#7a8176", whiteSpace: "nowrap" }}>
                                {post.readingMinutes} min read
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 14,
                    color: "#7a8176",
                }}>
                    <span>Onreco</span>
                    <span>onreco.xyz/blog</span>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
