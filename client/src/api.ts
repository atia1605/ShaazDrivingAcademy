const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

export async function postJson<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
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
