import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authCookies } from "@/config/cookies";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { refreshSession, setTokenCookies, readTokensFromSetCookie } from "@/services/auth";

const getForwardedHeaders = (headers: Headers) => {
  const forwarded = new Headers(headers);
  forwarded.delete("content-encoding");
  forwarded.delete("content-length");
  return forwarded;
};

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const { backendUrl, isProd } = env;

  // 1. Public auth pipeline: forward straight to the backend.
  if (
    path.includes("/auth/login") ||
    path.includes("/auth/register") ||
    path.includes("/auth/logout") ||
    path.includes("/api/subscription")
  ) {
    const body = request.method === "GET" || request.method === "HEAD"
      ? null
      : await request.text();

    const backendResponse = await fetch(`${backendUrl}${path}${url.search}`, {
      method: request.method,
      headers: new Headers(request.headers),
      body,
    });

    const responseText = await backendResponse.text();
    const response = new NextResponse(responseText, {
      status: backendResponse.status,
      headers: getForwardedHeaders(backendResponse.headers),
    });

    if (path.includes("/auth/logout")) {
      response.cookies.delete(authCookies.accessToken);
      response.cookies.delete(authCookies.refreshToken);
    }

    return response;
  }

  // 2. Auth pages render locally; redirect away if already signed in.
  if (path === routes.login || path === routes.signup) {
    if (request.cookies.get(authCookies.refreshToken)?.value) {
      return NextResponse.redirect(new URL(routes.app, request.url));
    }
    return NextResponse.next();
  }

  if (path.startsWith(routes.verifyEmail)) {
    return NextResponse.next();
  }

  // 3. Guard the product area without hitting the backend.
  if (path.startsWith(routes.app) || path.startsWith(routes.admin)) {
    const refreshToken = request.cookies.get(authCookies.refreshToken)?.value;
    const accessToken = request.cookies.get(authCookies.accessToken)?.value;

    if (!refreshToken) {
      const response = NextResponse.redirect(new URL(routes.login, request.url));
      response.cookies.delete(authCookies.accessToken);
      response.cookies.delete(authCookies.refreshToken);
      return response;
    }

    if (!accessToken) {
      const tokens = await refreshSession(backendUrl, refreshToken);
      if (!tokens) {
        const response = NextResponse.redirect(new URL(routes.login, request.url));
        response.cookies.delete(authCookies.accessToken);
        response.cookies.delete(authCookies.refreshToken);
        return response;
      }

      const requestHeaders = new Headers(request.headers);
      const cookieStrings: string[] = [];
      if (tokens.accessToken) cookieStrings.push(`${authCookies.accessToken}=${tokens.accessToken}`);
      if (tokens.refreshToken) cookieStrings.push(`${authCookies.refreshToken}=${tokens.refreshToken}`);
      if (cookieStrings.length) requestHeaders.set("Cookie", cookieStrings.join("; "));

      const response = NextResponse.next({ request: { headers: requestHeaders } });
      setTokenCookies(response, tokens, isProd);
      return response;
    }

    return NextResponse.next();
  }

  // 4. API passthrough: inject bearer token, retry once on 401 after refresh.
  if (path.startsWith("/api")) {
    const accessToken = request.cookies.get(authCookies.accessToken)?.value;
    const refreshToken = request.cookies.get(authCookies.refreshToken)?.value;

    const requestHeaders = new Headers(request.headers);
    if (accessToken) requestHeaders.set("Authorization", `Bearer ${accessToken}`);

    const body = request.method === "GET" || request.method === "HEAD"
      ? null
      : await request.text();

    const targetUrl = `${backendUrl}${path}${url.search}`;
    let backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      body,
    });

    if (backendResponse.status === 401 && refreshToken && !path.includes("/auth/refresh")) {
      const tokens = await refreshSession(backendUrl, refreshToken);

      if (tokens?.accessToken) {
        const retryHeaders = new Headers(request.headers);
        retryHeaders.set("Authorization", `Bearer ${tokens.accessToken}`);
        const retryCookies = [`${authCookies.accessToken}=${tokens.accessToken}`];
        if (tokens.refreshToken) retryCookies.push(`${authCookies.refreshToken}=${tokens.refreshToken}`);
        retryHeaders.set("Cookie", retryCookies.join("; "));

        backendResponse = await fetch(targetUrl, {
          method: request.method,
          headers: retryHeaders,
          body,
        });

        const response = new NextResponse(backendResponse.body, {
          status: backendResponse.status,
          headers: getForwardedHeaders(backendResponse.headers),
        });
        setTokenCookies(response, tokens, isProd);
        return response;
      }
    }

    const response = new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: getForwardedHeaders(backendResponse.headers),
    });

    // Persist rotated tokens from a successful response.
    if (backendResponse.status === 200 && backendResponse.headers.getSetCookie) {
      const setCookies = backendResponse.headers.getSetCookie();
      if (setCookies?.length) {
        const tokens = readTokensFromSetCookie(setCookies);
        if (tokens.accessToken || tokens.refreshToken) {
          setTokenCookies(response, tokens, isProd);
        }
      }
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
