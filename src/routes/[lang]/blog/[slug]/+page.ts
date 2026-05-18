import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getBlogPost } from '$lib/data/blog-posts';
import type { SiteLocale } from '$lib/i18n/site-locale';

export const load: PageLoad = ({ params }) => {
  const locale = params.lang as SiteLocale;
  if (params.slug === 'primer-post') {
    redirect(307, `/${locale}/blog/comprar-vivienda-lujo-madrid`);
  }

  const post = getBlogPost(locale, params.slug);
  if (!post) {
    error(404, 'Artículo no encontrado');
  }

  return {
    post,
    slug: params.slug
  };
};
