// Centralized environment access. Import from here instead of reading
// process.env directly so defaults and names live in one place.

export const env = {
  backendUrl: process.env.BACKEND_URL ?? "http://localhost:8080",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.onreco.xyz",
  isProd: process.env.NODE_ENV === "production",
} as const;
