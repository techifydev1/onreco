import { nav } from "../content";
import { Icon } from "./Icon";
import { WordmarkMark } from "./Wordmark";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-hairline bg-paper">
      <div className="flex h-24 items-center justify-between px-(--page-x)">
        <a href="#top" className="flex items-center gap-2.25" aria-label="Onreco home">
          <WordmarkMark />
          <span className="text-[30px] font-semibold tracking-[-0.01em] text-ink">onreco</span>
        </a>

        <nav className="hidden items-center gap-8.5 min-[961px]:flex" aria-label="Main navigation">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] text-moss transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={nav.cta.href}
          className="inline-flex h-10 items-center gap-2 rounded bg-forest px-5 text-[14px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-[0.88]"
        >
          <span>{nav.cta.label}</span>
          <Icon name="arrow-up-right" size={14} className="hidden min-[701px]:block" />
        </a>
      </div>
    </header>
  );
}
