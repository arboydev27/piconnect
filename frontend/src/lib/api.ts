export async function api<T = unknown>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return (res.status === 204 ? undefined : await res.json()) as T;
}