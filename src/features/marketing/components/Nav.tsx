"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "../content";
import { AppIcon } from "@/components/ui/AppIcon";
import { Icon } from "./Icon";
import { WordmarkMark } from "./Wordmark";
import { routes } from "@/config/routes";

function Dropdown({ label, items }: { label: string; items: typeof nav.dropdown.product }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        ref={triggerRef}
        type="button"
        className="nav-link text-[13px] text-moss transition-colors duration-200 hover:text-ink flex items-center gap-1.5"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <Icon name="chevron-down" size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          ref={contentRef}
          className="absolute top-full left-0 z-50 mt-2 min-w-[200px] rounded-lg border border-hairline bg-paper-card shadow-lg py-2 animate-in fade-in slide-down-2"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-[13px] text-moss transition-colors hover:text-ink hover:bg-sage/20"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;

  const primaryHrefs = new Set(nav.primary.map((link) => link.href));
  const productLinks = nav.dropdown.product.filter((link) => !primaryHrefs.has(link.href));
  const resourceLinks = nav.dropdown.resources.filter((link) => !primaryHrefs.has(link.href));

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu({ open: false, path: pathname });
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-hairline bg-paper">
      <div className="flex h-24 items-center justify-between px-(--page-x)">
        <Link href="/#top" className="flex items-center gap-2.25" aria-label="Onreco home">
          <WordmarkMark />
          <span className="text-[30px] font-semibold tracking-[-0.01em] text-ink">onreco</span>
        </Link>

        <nav className="hidden items-center gap-8.5 min-[961px]:flex" aria-label="Main navigation">
          {nav.primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] text-moss transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <Dropdown label="Product" items={nav.dropdown.product} />
          <Dropdown label="Resources" items={nav.dropdown.resources} />
        </nav>

        <div className="hidden min-[961px]:flex items-center gap-3">
          <Link href={routes.login} className="text-[13px] text-moss transition-colors duration-200 hover:text-ink">
            Log in
          </Link>
          <Link href={routes.signup} className="text-[13px] text-moss transition-colors duration-200 hover:text-ink">
            Sign up
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={nav.cta.href}
            aria-label={nav.cta.label}
            className="inline-flex h-10 items-center gap-2 rounded bg-forest px-4 text-[13px] font-medium whitespace-nowrap text-paper-card transition-opacity duration-200 hover:opacity-[0.88] min-[701px]:px-5 min-[701px]:text-[14px]"
          >
            <span className="min-[380px]:hidden">{nav.cta.shortLabel}</span>
            <span className="hidden min-[380px]:inline">{nav.cta.label}</span>
            <Icon name="arrow-up-right" size={14} className="hidden min-[701px]:block" />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenu({ open: !menuOpen, path: pathname })}
            className="flex h-10 w-10 items-center justify-center rounded border border-hairline text-ink transition-colors duration-200 hover:bg-sage/70 min-[961px]:hidden"
          >
            <AppIcon name={menuOpen ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-x-0 top-24 bottom-0 z-[98] bg-ink/10 min-[961px]:hidden"
            onClick={() => setMenu({ open: false, path: pathname })}
            aria-hidden="true"
          />

          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-24 z-[99] max-h-[calc(100dvh-6rem)] overflow-y-auto border-b border-hairline bg-paper px-(--page-x) pt-3 pb-7 min-[961px]:hidden"
          >
            {nav.primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenu({ open: false, path: pathname })}
                className="block border-b border-hairline py-3.5 text-[15px] text-ink"
              >
                {link.label}
              </Link>
            ))}

            <p className="mt-5 mb-1 text-[10px] font-semibold tracking-[0.06em] text-forest uppercase">Product</p>
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenu({ open: false, path: pathname })}
                className="block border-b border-hairline py-3 text-[14px] text-moss"
              >
                {link.label}
              </Link>
            ))}

            <p className="mt-5 mb-1 text-[10px] font-semibold tracking-[0.06em] text-forest uppercase">Resources</p>
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenu({ open: false, path: pathname })}
                className="block border-b border-hairline py-3 text-[14px] text-moss"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href={routes.login}
                onClick={() => setMenu({ open: false, path: pathname })}
                className="flex h-11 items-center justify-center rounded border border-hairline text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-sage/70"
              >
                Log in
              </Link>
              <Link
                href={routes.signup}
                onClick={() => setMenu({ open: false, path: pathname })}
                className="flex h-11 items-center justify-center rounded bg-forest text-[14px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-[0.88]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}