import { error } from '@sveltejs/kit';
import { bootstrapI18n, type AppLocale } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
  const lang = params.lang;
  if (!['es', 'en', 'fr', 'de'].includes(lang)) {
    error(404, 'Idioma no soportado');
  }

  const locale = lang as AppLocale;
  const messages = (await import(`../../lib/i18n/${locale}.json`)).default as Record<
    string,
    unknown
  >;
  bootstrapI18n(locale, messages);

  return { lang: locale };
};
