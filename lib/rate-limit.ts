// Minimal in-memory rate limiter for form submissions. Good enough to blunt
// naive bots/scripts on a single server instance; it resets on redeploy and
// does not coordinate across multiple instances. If traffic or abuse grows,
// swap this for an upstash/redis-backed limiter without changing the callers.

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string, maxRequests = MAX_REQUESTS): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= maxRequests) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
