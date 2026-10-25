import { ImageResponse } from "next/og";

import { contactPage, demoPage } from "../content";

const OG_SIZE = { width: 1200, height: 630 };

const OG_HEADERS = {
    "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
};

type Banner = {
    eyebrow: string;
    headline: string;
    sub?: string;
    chips?: string[];
    footerLeft?: string;
    footerRight?: string;
};

function banner({ eyebrow, headline, sub, chips, footerLeft = "Onreco", footerRight = "onreco.xyz" }: Banner) {
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
                    backgroundImage:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#285742",
                            backgroundColor: "#f0f3ea",
                            border: "1px solid #daddd2",
                            borderRadius: 9999,
                            padding: "6px 16px",
                        }}
                    >
                        {eyebrow}
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <h1
                        style={{
                            fontSize: 54,
                            fontWeight: 700,
                            color: "#233d32",
                            lineHeight: 1.15,
                            fontFamily: "Georgia, serif",
                        }}
                    >
                        {headline}
                    </h1>
                    {sub ? (
                        <p
                            style={{
                                fontSize: 23,
                                color: "#4f5b51",
                                lineHeight: 1.5,
                                maxWidth: "80%",
                            }}
                        >
                            {sub}
                        </p>
                    ) : null}
                    {chips?.length ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                            {chips.map((chip) => (
                                <span key={chip} style={{ fontSize: 16, color: "#7a8176" }}>
                                    {chip}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 14,
                        color: "#7a8176",
                    }}
                >
                    <span>{footerLeft}</span>
                    <span>{footerRight}</span>
                </div>
            </div>
        ),
        { ...OG_SIZE, headers: OG_HEADERS }
    );
}

export function homepageOgImage() {
    return banner({
        eyebrow: "Stablecoin Accounting",
        headline: "Stablecoin accounting that lands in your books.",
        sub: "Onreco watches your Base and Solana wallets, matches USDC and USDT payments against rules you write, and posts the matches to QuickBooks or Xero.",
    });
}

export function demoOgImage() {
    return banner({
        eyebrow: demoPage.eyebrow,
        headline: demoPage.heading.join(" "),
        sub: demoPage.sub,
        chips: demoPage.meta,
        footerRight: "onreco.xyz/demo",
    });
}

export function contactOgImage() {
    return banner({
        eyebrow: contactPage.eyebrow,
        headline: contactPage.heading.join(" "),
        sub: contactPage.sub,
        footerRight: "hello@onreco.xyz",
    });
}
