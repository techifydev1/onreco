import Link from "next/link";

import { Footer } from "./Footer";
import { Nav } from "./Nav";
import type { LegalBlock, LegalDocument } from "../legal";

/** Shared shell for the long-form legal documents. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />

      <main className="grow px-(--page-x) pt-32 pb-22.5">
        <article className="mx-auto max-w-3xl">
          <header className="flex flex-col gap-3 border-b border-hairline pb-8">
            <h1 className="font-serif text-[clamp(2rem,4vw,42px)] leading-[1.1] font-normal text-ink">
              {doc.title}
            </h1>
            <p className="text-[14px] text-moss">{doc.subtitle}</p>
            <p className="text-[12px] text-stone">Effective date: {doc.effectiveDate}</p>
          </header>

          <div className="flex flex-col gap-9 pt-10">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="font-serif text-[22px] leading-[1.25] font-normal text-ink">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3 text-[15px] leading-[1.7] text-moss">
                  {section.blocks.map((block, index) => (
                    <LegalBlockView key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.kind === "h3") {
    return <h3 className="text-[16px] font-medium text-ink">{block.text}</h3>;
  }

  if (block.kind === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-forest">
        {block.items.map((item, index) => (
          <li key={index}>
            {item.lead && <span className="font-medium text-ink">{item.lead} </span>}
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === "inline-link") {
    return (
      <p>
        {block.before}{" "}
        <Link href={block.href} className="font-medium text-forest underline underline-offset-2 hover:opacity-75">
          {block.label}
        </Link>
        {block.after}
      </p>
    );
  }

  return <p>{block.text}</p>;
}
