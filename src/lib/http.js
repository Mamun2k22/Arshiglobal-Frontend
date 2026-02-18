const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

export async function apiJSON(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}
