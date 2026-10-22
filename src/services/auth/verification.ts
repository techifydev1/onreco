import { api } from "@/services/api/client";

// Email verification lives in the shared auth service because both the
// verification screens and the settings page need it.

/** Asks the backend to send another verification email. */
export function sendVerificationEmail(): Promise<{ message: string }> {
  return api.post<{ message: string }>("/api/auth/verify-email/send");
}

/** Confirms a verification link. Throws when the token is invalid or expired. */
export function verifyEmailToken(token: string): Promise<{ message: string }> {
  return api.get<{ message: string }>(
    `/api/auth/verify-email/verify?token=${encodeURIComponent(token)}`,
  );
}

/**
 * Trades the refresh token for a new access token. The email-verified claim is
 * baked into the token, so this has to run after a successful verification.
 */
export function renewSessionTokens(): Promise<void> {
  return api.post<void>("/api/auth/refresh");
}
