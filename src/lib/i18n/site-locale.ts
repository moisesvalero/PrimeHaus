export type SiteLocale = 'es' | 'en' | 'fr' | 'de';

export const SITE_LOCALES: SiteLocale[] = ['es', 'en', 'fr', 'de'];
export const LOCALE_LOAD_DEPENDENCY = 'app:locale' as const;
export const PORTFOLIO_LOCALE_COOKIE = 'portfolio_locale';

export function parseSiteLocaleCookie(value: string | null | undefined): SiteLocale | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (v === 'es') return 'es';
  if (v === 'en') return 'en';
  if (v === 'fr') return 'fr';
  if (v === 'de') return 'de';
  return null;
}

export function resolveSiteLocale(cookieValue: string | null | undefined): SiteLocale {
  return parseSiteLocaleCookie(cookieValue) ?? 'es';
}

/** Locale para SSR/AEO: path → cookie manual → Accept-Language → `es`. */
export function resolveRequestLocale(event: {
  url?: URL;
  cookies: { get: (name: string) => string | undefined };
  request: Request;
}): SiteLocale {
  if (event.url) {
    const path = event.url.pathname;
    if (path.startsWith('/es/') || path === '/es') return 'es';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    if (path.startsWith('/fr/') || path === '/fr') return 'fr';
    if (path.startsWith('/de/') || path === '/de') return 'de';
  }
  const cookieLang = parseSiteLocaleCookie(event.cookies.get(PORTFOLIO_LOCALE_COOKIE));
  if (cookieLang) return cookieLang;
  const accept = event.request.headers.get('accept-language') || '';
  if (accept.toLowerCase().startsWith('es')) return 'es';
  if (accept.toLowerCase().startsWith('fr')) return 'fr';
  if (accept.toLowerCase().startsWith('de')) return 'de';
  if (accept.toLowerCase().startsWith('en')) return 'en';
  return 'es';
}
