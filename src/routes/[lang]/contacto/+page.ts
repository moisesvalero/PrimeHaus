import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
  return {
    lang: params.lang,
    propiedad: url.searchParams.get('propiedad') || ''
  };
};
