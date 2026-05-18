import { getServerSanityClient } from '$lib/server/sanity/get-server-client';
import { primeProjectsHomeQuery } from '$lib/server/sanity/groq-prime-project';
import { sitePortfolioQuery } from '$lib/server/sanity/groq-site-portfolio';
import { mapSanityPrimeProjectsList } from '$lib/server/sanity/map-prime-project';
import { mapSanitySitePortfolio } from '$lib/server/sanity/map-site-portfolio';
import { sitePortfolioDefaults } from '$lib/data/site-portfolio-defaults';
import type { PageServerLoad } from './$types';
import type { SanityPrimeProject, SanitySitePortfolio } from '$lib/server/sanity/types';

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang as any;
  const client = getServerSanityClient();

  let rawProjects: SanityPrimeProject[] = [];
  let rawSite: SanitySitePortfolio | null = null;

  try {
    rawProjects = await client.fetch(primeProjectsHomeQuery);
    rawSite = await client.fetch(sitePortfolioQuery);
  } catch (err) {
    console.error('Error fetching Sanity data for home:', err);
  }

  const projects = mapSanityPrimeProjectsList(rawProjects, lang);
  const siteData = mapSanitySitePortfolio(rawSite, sitePortfolioDefaults);

  return {
    projects,
    siteData
  };
};
