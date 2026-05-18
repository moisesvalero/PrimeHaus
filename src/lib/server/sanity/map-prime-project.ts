import type { SiteLocale } from '$lib/i18n/site-locale';
import type { SanityPrimeProject, MappedPrimeProject } from './types';

function getLocalized(
  obj: { es?: string; en?: string; fr?: string; de?: string } | null | undefined,
  locale: SiteLocale,
  fallback = ''
): string {
  if (!obj) return fallback;
  return obj[locale as keyof typeof obj] || obj.es || obj.en || fallback;
}

export function mapSanityPrimeProject(
  raw: SanityPrimeProject | null | undefined,
  locale: SiteLocale
): MappedPrimeProject | null {
  if (!raw) return null;

  return {
    id: raw._id || '',
    title: getLocalized(raw.title, locale, 'Propiedad sin titulo'),
    slug: raw.slug?.current || '',
    price: raw.price || 'Consultar precio',
    location: getLocalized(raw.location, locale, 'Ubicacion no disponible'),
    heroTag: getLocalized(raw.heroTag, locale, ''),
    heroDescription: getLocalized(raw.heroDescription, locale, ''),
    specs: (raw.specs || []).map((s) => ({
      label: getLocalized(s.label, locale, ''),
      value: s.value || ''
    })),
    images: {
      principal:
        raw.images?.principal ||
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      secondary1: raw.images?.secondary1 || '',
      secondary2: raw.images?.secondary2 || ''
    },
    videoUrl: raw.videoUrl || '',
    body: getLocalized(raw.body, locale, ''),
    seoDescription: getLocalized(raw.seoDescription, locale, '')
  };
}

export function mapSanityPrimeProjectsList(
  rawList: SanityPrimeProject[] | null | undefined,
  locale: SiteLocale
): MappedPrimeProject[] {
  if (!rawList || !Array.isArray(rawList)) return [];
  return rawList
    .map((p) => mapSanityPrimeProject(p, locale))
    .filter((p): p is MappedPrimeProject => p !== null);
}
