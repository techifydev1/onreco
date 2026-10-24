import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateMetadata() {
    return { contentType: "image/png" };
}

export default function Image() {
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
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 24,
                }}>
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
                        Stablecoin Accounting
                    </span>
                </div>

                <h1 style={{
                    fontSize: 60,
                    fontWeight: 700,
                    color: "#233d32",
                    textAlign: "center",
                    lineHeight: 1.1,
                    maxWidth: "90%",
                    fontFamily: "Georgia, serif",
                }}>
                    Stablecoin accounting that lands in your books.
                </h1>

                <p style={{
                    fontSize: 28,
                    color: "#4f5b51",
                    textAlign: "center",
                    marginTop: 24,
                    maxWidth: "80%",
                    lineHeight: 1.5,
                }}>
                    Onreco detects USDC/USDT payments, matches them to rules, and posts journal entries to QuickBooks and Xero.
                </p>

                <div style={{
                    marginTop: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}>
                    <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "12px 24px",
                        backgroundColor: "#285742",
                        color: "#f7f6f0",
                        borderRadius: 9999,
                        fontSize: 16,
                        fontWeight: 600,
                    }}>
                        → Book a demo
                    </span>
                    <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "12px 24px",
                        backgroundColor: "white",
                        color: "#285742",
                        border: "1px solid #daddd2",
                        borderRadius: 9999,
                        fontSize: 16,
                        fontWeight: 500,
                    }}>
                        View pricing
                    </span>
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
                    <span>Onreco</span>
                    <span>onreco.xyz</span>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}