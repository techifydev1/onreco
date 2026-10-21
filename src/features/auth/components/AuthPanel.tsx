import Link from "next/link";

import { WordmarkMark } from "@/features/marketing/components/Wordmark";
import { authBrand, authPanel } from "../content";

function PanelCheck() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M10.8329 3.25L4.87516 9.2079L2.1671 6.49976"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AuthPanel() {
  return (
    <>
      <Link href={authBrand.home} aria-label="Onreco home" className="flex items-center gap-3">
        <WordmarkMark className="h-11 w-11" />
        <span className="text-[24px] font-semibold tracking-[-0.01em] text-dark-text">
          {authBrand.name}
        </span>
      </Link>

      <div className="flex flex-col gap-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-dark-muted">
          {authPanel.eyebrow}
        </p>
        <h1 className="font-serif text-[clamp(2rem,3vw,38px)] font-normal leading-[1.15] text-dark-text">
          {authPanel.headingLead}{" "}
          <span className="italic text-dark-text">{authPanel.headingAccent}</span>{" "}
          {authPanel.headingTail}
        </h1>
        <p className="max-w-110 text-[15px] leading-[1.7] text-dark-muted">{authPanel.body}</p>

        <ul className="flex flex-col gap-3.5 pt-2">
          {authPanel.points.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-dark-border/40 text-dark-text">
                <PanelCheck />
              </span>
              <span className="text-[14px] text-dark-text">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[12px] text-dark-muted">
        Base &amp; Solana · USDC &amp; USDT · QuickBooks &amp; Xero
      </p>
    </>
  );
}
