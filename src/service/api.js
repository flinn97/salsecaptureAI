// src/api.js
export const FUNCTIONS_BASE_URL = (import.meta.env.VITE_FUNCTIONS_BASE_URL || "").trim();

/**
 * Build URL to a cloud function by name.
 * If VITE_FUNCTIONS_BASE_URL is set, calls `${BASE}/${fnName}`
 * else calls `/${fnName}` (works with Firebase Hosting rewrites).
 */
function fnUrl(fnName, query) {
  const qs = query
    ? "?" + new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)]))
    : "";
  return (FUNCTIONS_BASE_URL ? `${FUNCTIONS_BASE_URL}/${fnName}` : `/${fnName}`) + qs;
}

/** Convenience: fetch + JSON; throws on non-2xx with message */
export async function apiFetch(fnName, init) {
  const url = fnUrl(fnName, init?.query);
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }
  return data;
}

/** Raw request variant: returns { ok, status, json } (for 409/SCA flows). */
export async function apiRequest(fnName, init) {
  const url = fnUrl(fnName, init?.query);
  const res = await fetch(url, init);
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}