"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";

import { nav } from "../content";
import { resolveHref } from "./href";
import { Icon } from "./Icon";
import { WordmarkMark } from "./Wordmark";
import { routes } from "@/config/routes";

function Dropdown({ label, items, hrefPrefix }: { label: string; items: typeof nav.dropdown.product; hrefPrefix: string }) {
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
              href={resolveHref(item.href, hrefPrefix)}
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

export function Nav({ hrefPrefix = "" }: { hrefPrefix?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-hairline bg-paper">
      <div className="flex h-24 items-center justify-between px-(--page-x)">
        <Link href={hrefPrefix || "#top"} className="flex items-center gap-2.25" aria-label="Onreco home">
          <WordmarkMark />
          <span className="text-[30px] font-semibold tracking-[-0.01em] text-ink">onreco</span>
        </Link>

        <nav className="hidden items-center gap-8.5 min-[961px]:flex" aria-label="Main navigation">
          {nav.primary.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href, hrefPrefix)}
              className="nav-link text-[13px] text-moss transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <Dropdown label="Product" items={nav.dropdown.product} hrefPrefix={hrefPrefix} />
          <Dropdown label="Resources" items={nav.dropdown.resources} hrefPrefix={hrefPrefix} />
        </nav>

        <div className="hidden min-[961px]:flex items-center gap-3">
          <Link href={routes.login} className="text-[13px] text-moss transition-colors duration-200 hover:text-ink">
            Log in
          </Link>
          <Link href={routes.signup} className="text-[13px] text-moss transition-colors duration-200 hover:text-ink">
            Sign up
          </Link>
        </div>

        <Link
          href={resolveHref(nav.cta.href, hrefPrefix)}
          className="inline-flex h-10 items-center gap-2 rounded bg-forest px-5 text-[14px] font-medium text-paper-card transition-opacity duration-200 hover:opacity-[0.88]"
        >
          <span>{nav.cta.label}</span>
          <Icon name="arrow-up-right" size={14} className="hidden min-[701px]:block" />
        </Link>
      </div>
    </header>
  );
}