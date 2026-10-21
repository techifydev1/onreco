import { authCookies } from "@/config/cookies";
import { readTokensFromSetCookie, type AuthTokens } from "./cookies";

// Mutex: collapse concurrent refresh calls into one in-flight request to avoid
// racing the backend's refresh-token rotation.
let refreshPromise: Promise<AuthTokens | null> | null = null;

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
  if (!refreshPromise) {
    refreshPromise = requestRefresh(backendUrl, refreshToken).finally(() => {
      setTimeout(() => {
        refreshPromise = null;
      }, 500);
    });
  }
  return refreshPromise;
}
