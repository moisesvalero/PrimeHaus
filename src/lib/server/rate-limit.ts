const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function getClientIp(ip: string, xForwardedFor: string | null): string {
  const forwarded = xForwardedFor?.split(',')[0]?.trim();
  return forwarded || ip || 'unknown';
}

export function checkRateLimit(request: Request): { allowed: boolean; remaining: number } {
  const ip = getClientIp(
    request.headers.get('cf-connecting-ip') || '',
    request.headers.get('x-forwarded-for')
  );

  const now = Date.now();
  const key = 'contact:' + ip;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
