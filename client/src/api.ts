/**
 * API base URL. Dev: empty → Vite proxies /api to localhost:4000.
 * Production: VITE_API_URL from .env.production, or fallback below if unset.
 */
const PROD_FALLBACK_API = "https://shaazdrivingacademy.onrender.com";

function getApiBase(): string {
  const raw = import.meta.env.VITE_API_URL;
  const trimmed = typeof raw === "string" ? raw.trim().replace(/\/$/, "") : "";
  if (trimmed) return trimmed;
  if (import.meta.env.PROD) return PROD_FALLBACK_API;
  return "";
}

const base = getApiBase();

export async function getJson<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${base}${path}`);
  } catch {
    throw new Error(
      "Cannot reach the server. Check your connection. If this is the live site, the API URL may be misconfigured."
    );
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "error" in data
        ? String((data as { error?: string }).error)
        : res.statusText;
    throw new Error(msg || "Request failed");
  }
  return data as T;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Check your connection. If this is the live site, the API URL may be misconfigured."
    );
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "error" in data
        ? String((data as { error?: string }).error)
        : res.statusText;
    throw new Error(msg || "Request failed");
  }
  return data as T;
}
