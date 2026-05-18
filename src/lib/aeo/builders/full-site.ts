import { env } from '$env/dynamic/public';
import { siteConfig } from '$lib/site-config';
import { publicPages, type SupportedLocale } from '$lib/site-pages';
import { createTranslator } from '../shared';

const DEFAULT_SITE_URL = 'http://localhost:5173';

const labels = {
  es: {
    canonical: 'URL canonica',
    languages: 'Idiomas',
    summary: 'Resumen',
    services: 'Servicios',
    portfolio: 'Portafolio',
    about: 'Filosofia',
    contact: 'Contacto',
    blog: 'Observatorio',
    faq: 'Preguntas operativas',
    pages: 'Paginas indexables',
    resources: 'Recursos para IAs'
  },
  en: {
    canonical: 'Canonical URL',
    languages: 'Languages',
    summary: 'Summary',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'Philosophy',
    contact: 'Contact',
    blog: 'Observatory',
    faq: 'Operational questions',
    pages: 'Indexable pages',
    resources: 'AI resources'
  },
  fr: {
    canonical: 'URL canonique',
    languages: 'Langues',
    summary: 'Resume',
    services: 'Services',
    portfolio: 'Portefeuille',
    about: 'Philosophie',
    contact: 'Contact',
    blog: 'Observatoire',
    faq: 'Questions operationnelles',
    pages: 'Pages indexables',
    resources: 'Ressources IA'
  },
  de: {
    canonical: 'Kanonische URL',
    languages: 'Sprachen',
    summary: 'Zusammenfassung',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'Philosophie',
    contact: 'Kontakt',
    blog: 'Observatorium',
    faq: 'Operative Fragen',
    pages: 'Indexierbare Seiten',
    resources: 'KI-Ressourcen'
  }
} satisfies Record<SupportedLocale, Record<string, string>>;

export function getPublicBaseUrl(): string {
  return (env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

/** Full-site Markdown for `/llms-full.txt`. */
export function buildFullSiteMarkdown(locale: SupportedLocale): string {
  const baseUrl = getPublicBaseUrl();
  const t = createTranslator(locale);
  const l = labels[locale];
  const pages = publicPages();

  const services = [
    ['home.services.brokerageTitle', 'home.services.brokerageDesc'],
    ['home.services.investmentTitle', 'home.services.investmentDesc'],
    ['home.services.advisoryTitle', 'home.services.advisoryDesc']
  ].map(([titleKey, descKey]) => ({ title: t(titleKey), desc: t(descKey) }));

  const faq = [
    [t('blog.faq.q1'), t('blog.faq.a1')],
    [t('blog.faq.q2'), t('blog.faq.a2')],
    [
      'How can a client request a private dossier?',
      `${t('contact.hero.subtitle')} ${siteConfig.contact.email} | ${siteConfig.contact.phone}`
    ]
  ];

  return `# ${siteConfig.name}

> ${siteConfig.tagline}

${l.canonical}: ${baseUrl}
${l.languages}: ES, EN, FR, DE

---

## ${l.summary}

${t('home.seo.description', siteConfig.tagline)}

## ${l.services}

${services.map((item) => `- **${item.title}** - ${item.desc}`).join('\n')}

## ${l.portfolio}

${t('projects.hero.subtitle')}

${t('projects.empty.desc')}

## ${l.about}

${t('about.story.p1')}

${t('about.story.p2')}

## ${l.contact}

${t('contact.hero.subtitle')}

- ${t('contact.sidebar.address') || siteConfig.contact.address}
- ${siteConfig.contact.phone}
- ${siteConfig.contact.email}

## ${l.blog}

${t('blog.hero.subtitle')}

${t('blog.hero.statusText')}

---

## ${l.faq}

${faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join('\n\n')}

---

## ${l.pages}

${pages
  .map(
    (p) =>
      `- [${t(p.titleKey, p.path)}](${baseUrl}/${locale}${p.path === '/' ? '' : p.path}) - ${t(p.descKey, '')} - [Markdown](${baseUrl}/${locale}${p.path === '/' ? '/index.md' : `${p.path}.md`})`
  )
  .join('\n')}

---

## ${l.resources}

- llms.txt: ${baseUrl}/llms.txt
- Sitemap XML: ${baseUrl}/sitemap.xml
- Robots: ${baseUrl}/robots.txt
- Open Graph: ${baseUrl}/api/og?title=PrimeHaus
`;
}
