import { siteConfig } from '$lib/site-config';
import type { SupportedLocale } from '$lib/site-pages';
import { createTranslator } from '../shared';

export function buildProjectsMarkdown(locale: SupportedLocale, baseUrl: string): string {
  const t = createTranslator(locale);

  return `# ${t('projects.seo.title')}

> ${t('projects.seo.description')}

URL: ${baseUrl}/${locale}/proyectos
Idioma: ${locale.toUpperCase()}

---

## ${t('projects.hero.title')}

${t('projects.hero.subtitle')}

### ${t('projects.empty.title')}

${t('projects.empty.desc')}

Contacto para dossiers privados: ${siteConfig.contact.email} | ${siteConfig.contact.phone}
`;
}

export function buildAboutMarkdown(locale: SupportedLocale, baseUrl: string): string {
  const t = createTranslator(locale);

  return `# ${t('about.seo.title')}

> ${t('about.seo.description')}

URL: ${baseUrl}/${locale}/sobre-nosotros
Idioma: ${locale.toUpperCase()}

---

## ${t('about.hero.title')}

${t('about.hero.quote')}

### ${t('about.story.title')}

${t('about.story.p1')}

${t('about.story.p2')}

${t('about.story.p3')}

### ${t('about.mission.title')}

${t('about.mission.desc')}

### ${t('about.vision.title')}

${t('about.vision.desc')}
`;
}

export function buildContactMarkdown(locale: SupportedLocale, baseUrl: string): string {
  const t = createTranslator(locale);

  return `# ${t('contact.seo.title')}

> ${t('contact.seo.description')}

URL: ${baseUrl}/${locale}/contacto
Idioma: ${locale.toUpperCase()}

---

## ${t('contact.hero.title')}

${t('contact.hero.subtitle')}

### ${t('contact.sidebar.channels')}

- ${t('contact.sidebar.phone')}: ${siteConfig.contact.phone}
- ${t('contact.sidebar.email')}: ${siteConfig.contact.email}
- ${t('contact.sidebar.address')}: ${siteConfig.contact.address}

### ${t('contact.sidebar.hours')}

- ${t('contact.sidebar.monFri')}: ${t('contact.sidebar.monFriVal')}
- ${t('contact.sidebar.sat')}: ${t('contact.sidebar.satVal')}
- ${t('contact.sidebar.sun')}: ${t('contact.sidebar.sunVal')}
`;
}
