import { siteConfig } from '$lib/site-config';
import type { SupportedLocale } from '$lib/site-pages';
import { createTranslator } from '../shared';

export function buildBlogMarkdown(locale: SupportedLocale, baseUrl: string): string {
  const t = createTranslator(locale);

  return `# ${t('blog.seo.title')}

> ${t('blog.seo.description')}

URL: ${baseUrl}/${locale}/blog
Idioma: ${locale.toUpperCase()}

---

## ${t('blog.hero.title')}

${t('blog.hero.subtitle')}

### ${t('blog.hero.statusLabel')}

${t('blog.hero.statusText')}

### ${t('blog.empty.card1Title')}

${t('blog.empty.card1Text')}

### ${t('blog.empty.card2Title')}

${t('blog.empty.card2Text')}

### ${t('blog.empty.card3Title')}

${t('blog.empty.card3Text')}

---

## ${t('blog.cta.title')}

${t('blog.cta.subtitle')}

Contacto: ${siteConfig.contact.email} · ${siteConfig.contact.phone}
`;
}
