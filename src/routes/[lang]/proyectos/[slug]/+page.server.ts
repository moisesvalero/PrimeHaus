import { error } from '@sveltejs/kit';
import { getSanityServerClient } from '$lib/server/sanity/get-server-client';
import { primeProjectBySlugQuery } from '$lib/server/sanity/groq-prime-project';
import { mapSanityPrimeProject } from '$lib/server/sanity/map-prime-project';
import type { PageServerLoad } from './$types';
import type { SanityPrimeProject } from '$lib/server/sanity/types';

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang as any;
  const slug = params.slug;
  const client = getSanityServerClient();

  let rawProject: SanityPrimeProject | null = null;

  if (client) {
    try {
      rawProject = await client.fetch(primeProjectBySlugQuery, { slug });
    } catch (err) {
      console.error('Error fetching Sanity project by slug:', err);
    }
  }

  const project = mapSanityPrimeProject(rawProject, lang);

  if (!project) {
    error(404, 'Propiedad no encontrada');
  }

  return {
    project
  };
};
