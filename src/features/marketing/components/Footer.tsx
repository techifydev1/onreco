import Link from "next/link";

import { footer } from "../content";
import { resolveHref } from "./href";
import { WordmarkMark } from "./Wordmark";

export function Footer({ hrefPrefix = "" }: { hrefPrefix?: string }) {
  return (
    <footer className="bg-paper pt-15 pb-7">
      <div className="flex flex-col gap-13.5 px-(--page-x)">
        <div className="flex items-start justify-between max-[961px]:flex-col max-[961px]:gap-10">
          <div className="flex flex-[0_0_430px] flex-col gap-5 max-[961px]:flex-none">
            <Link href="#top" className="flex items-center gap-2.25" aria-label="Onreco home">
              <WordmarkMark />
              <span className="text-[30px] font-semibold text-ink">onreco</span>
            </Link>
            <p className="text-[14px] leading-[1.65] text-moss">
              {footer.tagline[0]}
              <br />
              {footer.tagline[1]}
            </p>
          </div>

          <div className="flex gap-22.5 max-[961px]:flex-wrap max-[961px]:gap-10">
            {footer.groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4.25">
                <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-forest">
                  {group.title}
                </p>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={resolveHref(link.href, hrefPrefix)}
                    className="text-[12px] text-moss transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-hairline pt-6 text-[11px] text-stone max-[961px]:flex-col max-[961px]:items-start max-[961px]:gap-4">
          <span>{footer.copyright}</span>
          <span>{footer.tag}</span>
          <div className="flex gap-6.25">
            {footer.legal.map((link) => (
              <Link
                key={link.label}
                href={resolveHref(link.href, hrefPrefix)}
                className="text-moss transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}