import { getServerSanityClient } from '$lib/server/sanity/get-server-client';
import { primeProjectsListQuery } from '$lib/server/sanity/groq-prime-project';
import { mapSanityPrimeProjectsList } from '$lib/server/sanity/map-prime-project';
import type { PageServerLoad } from './$types';
import type { SanityPrimeProject } from '$lib/server/sanity/types';

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang as any;
  const client = getServerSanityClient();

  let rawProjects: SanityPrimeProject[] = [];

  try {
    rawProjects = await client.fetch(primeProjectsListQuery);
  } catch (err) {
    console.error('Error fetching Sanity projects list:', err);
  }

  const projects = mapSanityPrimeProjectsList(rawProjects, lang);

  return {
    projects
  };
};
