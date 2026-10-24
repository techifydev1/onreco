import { ImageResponse } from "next/og";
import { getPost } from "../_data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateMetadata() {
    return { contentType: "image/png" };
}

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = (await import("../_data/posts")).getPost(slug);

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f7f6f0",
                        padding: 60,
                    }}
                >
                    <div style={{ fontSize: 60, fontWeight: 700, color: "#285742", textAlign: "center" }}>
                        Onreco Blog
                    </div>
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f7f6f0",
                    padding: 80,
                    backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
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
                        {post.category}
                    </span>
                </div>

                <h1 style={{
                    fontSize: 56,
                    fontWeight: 700,
                    color: "#233d32",
                    textAlign: "center",
                    lineHeight: 1.15,
                    maxWidth: "90%",
                    fontFamily: "Georgia, serif",
                }}>
                    {post.title}
                </h1>

                <p style={{
                    fontSize: 24,
                    color: "#4f5b51",
                    textAlign: "center",
                    marginTop: 24,
                    maxWidth: "80%",
                    lineHeight: 1.5,
                }}>
                    {post.description}
                </p>

                <div style={{
                    marginTop: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    fontSize: 16,
                    color: "#7a8176",
                }}>
                    <span>By {post.author}</span>
                    <span>·</span>
                    <span>{new Date(post.publishedTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>

                <div style={{
                    marginTop: 32,
                    padding: "12px 24px",
                    backgroundColor: "#f0f3ea",
                    border: "1px solid #daddd2",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#285742",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                    <span>{post.category}</span>
                </div>

                <div style={{
                    position: "absolute",
                    bottom: 40,
                    left: 80,
                    right: 80,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 14,
                    color: "#7a8176",
                }}>
                    <span>Onreco Blog</span>
                    <span>onreco.xyz</span>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}