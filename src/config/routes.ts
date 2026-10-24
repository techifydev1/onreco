// Canonical route paths. Use these instead of string literals to keep
// redirects, links, and middleware in sync.

export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  contact: "/contact",
  app: "/app",
  admin: "/admin",
} as const;

export type RouteKey = keyof typeof routes;
