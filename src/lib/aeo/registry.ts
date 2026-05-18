import { pagesWithTwins, type SupportedLocale } from '$lib/site-pages';
import { getPublicBaseUrl } from './builders/full-site';
import { buildBlogMarkdown } from './builders/blog';
import { buildComponentsMarkdown } from './builders/components';
import { buildHomeMarkdown } from './builders/home';
import { buildAboutMarkdown, buildContactMarkdown, buildProjectsMarkdown } from './builders/page';
import { normalizePathname } from './paths';

type MarkdownBuilder = (locale: SupportedLocale, baseUrl: string) => string;

const builders: Record<string, MarkdownBuilder> = {
  '/': buildHomeMarkdown,
  '/proyectos': buildProjectsMarkdown,
  '/sobre-nosotros': buildAboutMarkdown,
  '/contacto': buildContactMarkdown,
  '/blog': buildBlogMarkdown,
  '/components': buildComponentsMarkdown
};

const twinPaths = new Set(pagesWithTwins().map((p) => normalizePathname(p.path)));

function withoutLocale(pathname: string): string {
  return normalizePathname(pathname).replace(/^\/(es|en|fr|de)(\/|$)/, '/');
}

export function hasMarkdownTwin(pathname: string): boolean {
  return twinPaths.has(withoutLocale(pathname));
}

export function getPageMarkdown(pathname: string, locale: SupportedLocale): string | null {
  const path = withoutLocale(pathname);
  const builder = builders[path];
  if (!builder || !hasMarkdownTwin(path)) return null;
  return builder(locale, getPublicBaseUrl());
}
