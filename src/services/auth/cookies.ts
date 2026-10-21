import { authCookies, cookieMaxAge } from "@/config/cookies";
import type { NextResponse } from "next/server";

export type AuthTokens = {
  accessToken?: string;
  refreshToken?: string;
};

/**
 * Parse a single Set-Cookie header into `<name>=<value>`, tolerating `=` inside
 * the value (base64/JWT padding).
 */
export function extractCookieValue(setCookieHeader: string, name: string): string {
  const prefix = `${name}=`;
  const match = setCookieHeader
    .split(/;\s*/)
    .find((part) => part.startsWith(prefix));
  return match ? match.slice(prefix.length) : "";
}

/** Read access/refresh tokens out of a Response's Set-Cookie headers. */
export function readTokensFromSetCookie(setCookieHeaders: string[]): AuthTokens {
  const tokens: AuthTokens = {};
  for (const raw of setCookieHeaders) {
    const trimmed = raw.trim();
    if (trimmed.startsWith(`${authCookies.accessToken}=`)) {
      tokens.accessToken = extractCookieValue(trimmed, authCookies.accessToken);
    } else if (trimmed.startsWith(`${authCookies.refreshToken}=`)) {
      tokens.refreshToken = extractCookieValue(trimmed, authCookies.refreshToken);
    }
  }
  return tokens;
}

/** Persist rotated tokens onto a response as httpOnly cookies. */
export function setTokenCookies(
  response: NextResponse,
  tokens: AuthTokens,
  isProd: boolean,
): void {
  if (tokens.refreshToken) {
    response.cookies.set(authCookies.refreshToken, tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: cookieMaxAge.refreshToken,
    });
  }
  if (tokens.accessToken) {
    response.cookies.set(authCookies.accessToken, tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: cookieMaxAge.accessToken,
    });
  }
}

export function clearTokenCookies(response: NextResponse): void {
  response.cookies.delete(authCookies.accessToken);
  response.cookies.delete(authCookies.refreshToken);
}
