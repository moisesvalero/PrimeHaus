import { error } from '@sveltejs/kit';
import { setLocale } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
  const lang = params.lang;
  if (!['es', 'en', 'fr', 'de'].includes(lang)) {
    error(404, 'Idioma no soportado');
  }
  setLocale(lang);
  return { lang };
};
