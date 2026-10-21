// Auth cookie names and lifetimes. Shared by middleware and auth services so
// the contract with the backend stays consistent.

export const authCookies = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

export const cookieMaxAge = {
  accessToken: 15 * 60,
  refreshToken: 60 * 60 * 24 * 7,
} as const;
