"use client";

import { useEffect } from "react";

import { RevealObserver } from "@/components/RevealObserver";

/**
 * Marketing page interactions: scroll reveal and the active nav link
 * highlight on scroll.
 */
export function ScrollReveal() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* ── Active nav link on scroll ─────────────────────── */
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], header[id]"),
    );
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    if (sections.length && navLinks.length) {
      const update = () => {
        const scrollY = window.scrollY + 120;
        let current = "";
        sections.forEach((sec) => {
          if (sec.offsetTop <= scrollY) current = sec.id;
        });
        navLinks.forEach((link) => {
          const href = link.getAttribute("href")?.replace("#", "");
          link.style.color = href === current ? "var(--ink)" : "";
        });
      };
      window.addEventListener("scroll", update, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", update));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <RevealObserver />;
}
