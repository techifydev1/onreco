import Link from "next/link";

import { WordmarkMark } from "@/features/marketing/components/Wordmark";

import { appBrand } from "../content";

/** Floating brand chip, pinned to the top-left of the viewport. */
export function FloatingBrand() {
  return (
    <Link
      href={appBrand.home}
      aria-label="Onreco home"
      className="fixed top-5 left-5 z-40 flex items-center gap-2.5 rounded border border-hairline bg-paper-card/92 px-2.5 py-2 shadow-[0_10px_30px_-14px_rgba(35,61,50,0.24)] backdrop-blur-md transition-colors duration-200 hover:bg-sage/70"
    >
      <WordmarkMark />
      <span className="text-[18px] font-semibold tracking-[-0.01em] text-ink">onreco</span>
    </Link>
  );
}
