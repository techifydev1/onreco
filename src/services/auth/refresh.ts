import { authCookies } from "@/config/cookies";
import { readTokensFromSetCookie, type AuthTokens } from "./cookies";

// Mutex: collapse concurrent refresh calls into one in-flight request to avoid
// racing the backend's refresh-token rotation.
let refreshPromise: Promise<AuthTokens | null> | null = null;

// The backend rotates the refresh token on every refresh, so the token that
// arrives in a cookie can already be dead. Remember what each token became so
// a second request carrying the same (now stale) token reuses the fresh pair
// instead of trying to refresh a token the backend has already retired.
//
// Keyed by the consumed token: a caller can only look up a successor for a
// token it already holds, so this grants no access beyond what the caller
// could get by refreshing that token themselves.
const rotated = new Map<string, { tokens: AuthTokens; at: number }>();

const ROTATED_TTL_MS = 5 * 60 * 1000;

function rememberRotation(consumed: string, tokens: AuthTokens) {
  rotated.set(consumed, { tokens, at: Date.now() });

  if (rotated.size > 50) {
    const oldest = [...rotated.entries()].sort((a, b) => a[1].at - b[1].at);
    for (const [key] of oldest.slice(0, rotated.size - 50)) rotated.delete(key);
  }
}

function recallRotation(consumed: string): AuthTokens | null {
  const entry = rotated.get(consumed);
  if (!entry) return null;
  if (Date.now() - entry.at > ROTATED_TTL_MS) {
    rotated.delete(consumed);
    return null;
  }
  return entry.tokens;
}

async function requestRefresh(
  backendUrl: string,
  refreshToken: string,
): Promise<AuthTokens | null> {
  try {
    const res = await fetch(`${backendUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${authCookies.refreshToken}=${refreshToken}`,
        "X-Client-Type": "web",
      },
    });

    if (!res.ok) return null;

    const setCookies = res.headers.getSetCookie();
    if (!setCookies?.length) return null;

    const tokens = readTokensFromSetCookie(setCookies);
    if (!tokens.accessToken && !tokens.refreshToken) return null;

    rememberRotation(refreshToken, tokens);
    return tokens;
  } catch {
    return null;
  }
}

/**
 * Refresh the session, coalescing parallel callers. Returns null on failure.
 * The mutex releases after a short debounce so rapid bursts share one call.
 */
export function refreshSession(
  backendUrl: string,
  refreshToken: string,
): Promise<AuthTokens | null> {
  const recalled = recallRotation(refreshToken);
  if (recalled) return Promise.resolve(recalled);

  if (!refreshPromise) {
    refreshPromise = requestRefresh(backendUrl, refreshToken).finally(() => {
      setTimeout(() => {
        refreshPromise = null;
      }, 500);
    });
  }
  return refreshPromise;
}
