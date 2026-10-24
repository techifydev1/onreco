"use client";

import { useEffect } from "react";

/**
 * Captures UTM parameters from the URL and posts them to /api/track.
 * Only fires when utm_source is present, so plain navigations are ignored.
 */
export function VisitTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");

    if (!utmSource) return;

    const body = {
      utm_source: utmSource,
      utm_medium: params.get("utm_medium") ?? null,
      utm_campaign: params.get("utm_campaign") ?? null,
      utm_content: params.get("utm_content") ?? null,
      utm_term: params.get("utm_term") ?? null,
      referral_page: window.location.pathname,
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }).catch(() => {
      // Silent failure: tracking should never break the page.
    });
  }, []);

  return null;
}