import { siteConfig } from '$lib/site-config';
import type { SupportedLocale } from '$lib/site-pages';
import { createTranslator } from '../shared';

export function buildHomeMarkdown(locale: SupportedLocale, baseUrl: string): string {
  const t = createTranslator(locale);
  const url = `${baseUrl}/${locale}`;

  const services = [
    ['home.services.brokerageTitle', 'home.services.brokerageDesc'],
    ['home.services.investmentTitle', 'home.services.investmentDesc'],
    ['home.services.advisoryTitle', 'home.services.advisoryDesc']
  ].map(([titleKey, descKey]) => ({ title: t(titleKey), desc: t(descKey) }));

  const process = [
    { title: t('home.about.step1Title'), desc: t('home.about.step1Desc') },
    { title: t('home.about.step2Title'), desc: t('home.about.step2Desc') }
  ];

  return `# ${t('home.seo.title', siteConfig.name)}

> ${t('home.seo.description', siteConfig.tagline)}

URL: ${url}
Idioma: ${locale.toUpperCase()}

---

## ${t('home.hero.title')}

${t('home.hero.subtitle')}

### ${t('home.services.title')}

${services.map((item) => `- **${item.title}** - ${item.desc}`).join('\n')}

### ${t('home.featured.title')}

${t('home.featured.empty')}

### ${t('home.about.title')}

${t('home.about.desc')}

${process.map((step, index) => `${index + 1}. **${step.title}** - ${step.desc}`).join('\n')}

---

## ${t('home.cta.title')}

${t('home.cta.subtitle')}

Contacto directo: ${siteConfig.contact.email} | ${siteConfig.contact.phone}
`;
}
