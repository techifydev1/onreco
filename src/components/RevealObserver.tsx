"use client";

import { useEffect } from "react";

/**
 * Adds `.in-view` to every `.reveal` element once it scrolls into view.
 * The hidden state lives behind a `.js` class (set pre-paint by the root
 * layout), so content stays readable when JavaScript is unavailable.
 *
 * A MutationObserver picks up elements that arrive later (streamed Suspense
 * content), which a one-shot query on mount would miss.
 */
export function RevealObserver() {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }

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

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    scan();

    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
