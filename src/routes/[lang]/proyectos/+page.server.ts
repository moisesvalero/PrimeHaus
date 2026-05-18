import { getSanityServerClient } from '$lib/server/sanity/get-server-client';
import { primeProjectsListQuery } from '$lib/server/sanity/groq-prime-project';
import { mapSanityPrimeProjectsList } from '$lib/server/sanity/map-prime-project';
import { getDemoPrimeProjects } from '$lib/data/demo-prime-projects';
import type { PageServerLoad } from './$types';
import type { SiteLocale } from '$lib/i18n/site-locale';
import type { SanityPrimeProject } from '$lib/server/sanity/types';

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang as SiteLocale;
  const client = getSanityServerClient();

  let rawProjects: SanityPrimeProject[] = [];

  if (client) {
    try {
      rawProjects = await client.fetch(primeProjectsListQuery);
    } catch (err) {
      console.error('Error fetching Sanity projects list:', err);
    }
  }

  const projects = mapSanityPrimeProjectsList(rawProjects, lang);

  return {
    projects: projects.length > 0 ? projects : getDemoPrimeProjects(lang)
  };
};
