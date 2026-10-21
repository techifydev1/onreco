"use client";

// Client-side auth calls. The proxy forwards /api/auth/* to the backend; sending
// `X-Client-Type: web` makes the backend issue httpOnly cookies the proxy reads.

export type AuthResult =
  | { ok: true; redirect?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

type BackendError = {
  message?: string;
  fieldErrors?: Record<string, string> | null;
};

async function postAuth(path: string, body: Record<string, string>): Promise<AuthResult> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Client-Type": "web" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  if (response.ok) return { ok: true };

  let payload: BackendError = {};
  try {
    payload = (await response.json()) as BackendError;
  } catch {
    /* non-JSON error body */
  }

  const fieldErrors = payload.fieldErrors ?? undefined;
  const firstFieldError = fieldErrors ? Object.values(fieldErrors)[0] : undefined;
  return {
    ok: false,
    message: firstFieldError ?? payload.message ?? "Unable to complete the request.",
    fieldErrors,
  };
}

export const login = (email: string, password: string) =>
  postAuth("/api/auth/login", { email, password });

export const register = (fields: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => postAuth("/api/auth/register", fields);
