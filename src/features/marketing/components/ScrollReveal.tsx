"use client";

import { useEffect } from "react";

/**
 * Ports onreco-redesign/script.js interactions:
 *  - scroll reveal (`.reveal` → `.in-view` via IntersectionObserver)
 *  - active nav link highlight on scroll
 * The hero entrance is pure CSS and needs no JavaScript.
 * Rendered once per marketing page.
 */
export function ScrollReveal() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* ── Scroll reveal ─────────────────────────────────── */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (revealEls.length) {
      if (!("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("in-view"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
        );
        revealEls.forEach((el) => io.observe(el));
        cleanups.push(() => io.disconnect());
      }
    }

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

  return null;
}
