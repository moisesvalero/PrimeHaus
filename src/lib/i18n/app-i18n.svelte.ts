export type AppLocale = 'en' | 'es' | 'fr' | 'de';

type Messages = Record<string, unknown>;

const translations: Partial<Record<AppLocale, Messages>> = {};

let currentLocale = $state<AppLocale>('es');

function normalizeLocale(lang: string | null | undefined): AppLocale {
  if (!lang) return 'es';
  const lower = lang.toLowerCase();
  if (lower.startsWith('es')) return 'es';
  if (lower.startsWith('fr')) return 'fr';
  if (lower.startsWith('de')) return 'de';
  if (lower.startsWith('en')) return 'en';
  return 'es';
}

/** Inyecta solo el idioma activo (evita cargar 4 JSON en el bundle inicial). */
export function initI18n(locale: AppLocale, messages: Messages): void {
  translations[locale] = messages;
  currentLocale = locale;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
}

/** Lectura reactiva del locale (Svelte 5 / runes). */
export function getLocale(): AppLocale {
  return currentLocale;
}

export function applyLocale(lang: string): void {
  const normalized = normalizeLocale(lang);
  currentLocale = normalized;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', normalized);
    localStorage.setItem('lang_manual', '1');
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalized;
  }
  if (typeof fetch !== 'undefined' && typeof window !== 'undefined') {
    void fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: normalized })
    }).catch(() => {});
  }
}

/** Traducción; al leer `currentLocale` reacciona el UI que llame a `t(...)`. */
export function t(key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[currentLocale];
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  return typeof value === 'string' ? value : key;
}
