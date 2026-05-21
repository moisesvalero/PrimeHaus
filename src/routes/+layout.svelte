<script lang="ts">
  import '../app.css';
  import { resolve } from '$app/paths';
  import { t, setLocale } from '$lib/i18n';
  import { siteConfig } from '$lib/site-config';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { clickOutside } from '$lib/actions/clickOutside';
  import { hasMarkdownTwin, markdownTwinPath } from '$lib/aeo';
  import { defaultSeo, seo, PUBLIC_BASE_URL, type SeoState } from '$lib/seo';
  import { onMount } from 'svelte';
  import type { Component, Snippet } from 'svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { mode, toggleMode } from 'mode-watcher';

  let { children }: { children: Snippet } = $props();
  let languageOpen = $state(false);
  let mobileOpen = $state(false);
  let Toaster = $state<Component | null>(null);
  let ToastContainer = $state<Component | null>(null);
  let CookieConsent = $state<Component | null>(null);
  let WhatsAppFloating = $state<Component | null>(null);

  const languageOptions = [
    { code: 'es', short: 'ES', label: 'Español' },
    { code: 'en', short: 'EN', label: 'English' },
    { code: 'fr', short: 'FR', label: 'Français' },
    { code: 'de', short: 'DE', label: 'Deutsch' }
  ] as const;

  /** Solo en cliente: en SSR `mode.current` es undefined → icono distinto = fallo de hidratación y botones muertos. */
  let isDark = $derived(browser && mode.current === 'dark');

  /**
   * URL canónica derivada de la ruta actual. Si una página no llama a `setSeo({ canonical })`
   * explícitamente, se usa esta. Evita que todo el sitio comparta el canonical de la home.
   */
  const cleanPath = $derived(page.url.pathname.replace(/^\/(es|en|fr|de)(\/|$)/, '/'));
  const canonicalUrl = $derived(`${PUBLIC_BASE_URL}${page.url.pathname}`);

  const markdownAlternateHref = $derived(
    hasMarkdownTwin(page.url.pathname) ? markdownTwinPath(page.url.pathname) : null
  );

  function switchLocale(nextLang: (typeof languageOptions)[number]['code']) {
    setLocale(nextLang);
    languageOpen = false;
    mobileOpen = false;
    if (browser) {
      const clean = page.url.pathname.replace(/^\/(es|en|fr|de)(\/|$)/, '/');
      window.location.href = '/' + nextLang + (clean === '/' ? '' : clean);
    }
  }

  function handleToggleTheme() {
    toggleMode();
  }

  onMount(() => {
    const pathLang = page.url.pathname.match(/^\/(es|en|fr|de)/)?.[1];
    if (!pathLang) {
      const saved = localStorage.getItem('lang');
      const hasManual = localStorage.getItem('lang_manual') === '1';
      if (hasManual && saved) {
        setLocale(saved as 'en' | 'es' | 'fr' | 'de');
      }
    }

    const defer =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1);

    defer(async () => {
      const [sonner, toast, cookie, whatsapp] = await Promise.all([
        import('$lib/components/ui/sonner'),
        import('$lib/components/ToastContainer.svelte'),
        import('$lib/components/CookieConsent.svelte'),
        import('$lib/components/WhatsAppFloating.svelte')
      ]);
      Toaster = sonner.Toaster;
      ToastContainer = toast.default;
      CookieConsent = cookie.default;
      WhatsAppFloating = whatsapp.default;
    });
  });

  const currentLang = $derived(page.url.pathname.match(/^\/(es|en|fr|de)/)?.[1] || 'es');
  const currentLanguage = $derived(
    languageOptions.find((option) => option.code === currentLang) ?? languageOptions[0]
  );

  function routeSeoFor(path: string): Partial<SeoState> {
    const data = page.data as Record<string, unknown>;
    const project = data.project as
      | { title?: string; seoTitle?: string; seoDescription?: string; heroDescription?: string }
      | undefined;

    if (path === '/') {
      return {
        title: $t('home.seo.title'),
        description: $t('home.seo.description'),
        ogTitle: siteConfig.name,
        ogDescription: $t('home.seo.description'),
        schemaType: 'WebPage',
        headline: $t('home.hero.title'),
        keywords: ['inmobiliaria lujo', 'primehaus', 'marbella', 'madrid', 'villas exclusivas']
      };
    }

    if (path === '/proyectos') {
      return {
        title: $t('projects.seo.title'),
        description: $t('projects.seo.description'),
        ogTitle: $t('projects.seo.title'),
        ogDescription: $t('projects.seo.description'),
        schemaType: 'CollectionPage',
        headline: $t('projects.hero.title'),
        keywords: [
          'villas lujo',
          'aticos exclusivos',
          'primehaus portafolio',
          'inmobiliaria marbella',
          'propiedades madrid'
        ]
      };
    }

    if (path.startsWith('/proyectos/')) {
      const title = project?.seoTitle || project?.title || $t('projects.detail.seo.title');
      const description =
        project?.seoDescription || project?.heroDescription || $t('projects.seo.description');
      return {
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        schemaType: 'WebPage',
        headline: project?.title || $t('projects.detail.hero.fallbackTitle'),
        keywords: ['propiedad lujo', 'primehaus', 'dossier privado', 'residencia exclusiva']
      };
    }

    if (path === '/sobre-nosotros') {
      return {
        title: $t('about.seo.title'),
        description: $t('about.seo.description'),
        ogTitle: $t('about.seo.title'),
        ogDescription: $t('about.seo.description'),
        schemaType: 'AboutPage',
        headline: $t('about.hero.title'),
        keywords: [
          'sobre nosotros primehaus',
          'inmobiliaria lujo',
          'historia primehaus',
          'filosofia suiza',
          'asesores inmobiliarios'
        ]
      };
    }

    if (path === '/contacto') {
      return {
        title: $t('contact.seo.title'),
        description: $t('contact.seo.description'),
        ogTitle: $t('contact.seo.title'),
        ogDescription: $t('contact.seo.description'),
        schemaType: 'ContactPage',
        headline: $t('contact.hero.title'),
        keywords: [
          'contacto primehaus',
          'inmobiliaria madrid',
          'inmobiliaria marbella',
          'asesoramiento inmobiliario',
          'cita previa lujo'
        ]
      };
    }

    if (path === '/blog') {
      return {
        title: $t('blog.seo.title'),
        description: $t('blog.seo.description'),
        ogTitle: $t('blog.seo.title'),
        ogDescription: $t('blog.seo.description'),
        schemaType: 'CollectionPage',
        headline: $t('blog.hero.title'),
        keywords: [
          'primehaus blog',
          'real estate intelligence',
          'mercado inmobiliario lujo',
          'arquitectura residencial',
          'investment advisory'
        ],
        faq: [
          { question: $t('blog.faq.q1'), answer: $t('blog.faq.a1') },
          { question: $t('blog.faq.q2'), answer: $t('blog.faq.a2') }
        ]
      };
    }

    if (path.startsWith('/blog/')) {
      return {
        title: $t('blog.post.seo.title'),
        description: $t('blog.post.seo.description'),
        ogTitle: $t('blog.post.seo.title'),
        ogDescription: $t('blog.post.seo.description'),
        schemaType: 'WebPage',
        headline: $t('blog.post.hero.title'),
        keywords: ['primehaus editorial', 'luxury real estate']
      };
    }

    return {};
  }

  const routeSeo = $derived(routeSeoFor(cleanPath));
  const effectiveSeo = $derived(
    $seo.title === defaultSeo.title ? { ...$seo, ...routeSeo, locale: currentLang } : $seo
  );
  const ogLocale = $derived(
    currentLang === 'en'
      ? 'en_US'
      : currentLang === 'fr'
        ? 'fr_FR'
        : currentLang === 'de'
          ? 'de_DE'
          : 'es_ES'
  );

  function navClass(href: string): string {
    const path = page.url.pathname;
    const cleanPath = path.replace(/^\/(es|en|fr|de)(\/|$)/, '/');
    const active =
      href === '/'
        ? cleanPath === '/'
        : cleanPath === href || (href !== '/' && cleanPath.startsWith(href + '/'));
    if (active) {
      return 'text-xs font-semibold tracking-[0.15em] uppercase border-b border-primary pb-0.5 text-primary transition-colors duration-200 hover:text-primary';
    }
    return 'text-xs font-medium tracking-[0.15em] uppercase text-on-surface-variant transition-colors duration-200 hover:text-primary';
  }
</script>

<svelte:head>
  <title>{effectiveSeo.title}</title>
  <meta name="description" content={effectiveSeo.description} />
  {#if effectiveSeo.keywords.length > 0}
    <meta name="keywords" content={effectiveSeo.keywords.join(', ')} />
  {/if}
  {#if effectiveSeo.author}
    <meta name="author" content={effectiveSeo.author} />
  {/if}
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:type" content={effectiveSeo.ogType} />
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:title" content={effectiveSeo.ogTitle} />
  <meta property="og:description" content={effectiveSeo.ogDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={effectiveSeo.ogImage} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:locale:alternate" content="es_ES" />
  <meta property="og:locale:alternate" content="en_US" />
  <meta property="og:locale:alternate" content="fr_FR" />
  <meta property="og:locale:alternate" content="de_DE" />

  <!-- Twitter -->
  <meta name="twitter:card" content={effectiveSeo.twitterCard} />
  <meta name="twitter:title" content={effectiveSeo.ogTitle} />
  <meta name="twitter:description" content={effectiveSeo.ogDescription} />
  <meta name="twitter:image" content={effectiveSeo.ogImage} />
  {#if effectiveSeo.twitterCreator}
    <meta name="twitter:creator" content={effectiveSeo.twitterCreator} />
  {/if}

  <!-- hreflang por URL localizada -->
  <link
    rel="alternate"
    hreflang="es"
    href={`${PUBLIC_BASE_URL}/es${cleanPath === '/' ? '' : cleanPath}`}
  />
  <link
    rel="alternate"
    hreflang="en"
    href={`${PUBLIC_BASE_URL}/en${cleanPath === '/' ? '' : cleanPath}`}
  />
  <link
    rel="alternate"
    hreflang="fr"
    href={`${PUBLIC_BASE_URL}/fr${cleanPath === '/' ? '' : cleanPath}`}
  />
  <link
    rel="alternate"
    hreflang="de"
    href={`${PUBLIC_BASE_URL}/de${cleanPath === '/' ? '' : cleanPath}`}
  />
  <link
    rel="alternate"
    hreflang="x-default"
    href={`${PUBLIC_BASE_URL}/es${cleanPath === '/' ? '' : cleanPath}`}
  />

  <!-- GEO: índice para LLMs -->
  <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
  {#if markdownAlternateHref}
    <link rel="alternate" type="text/markdown" href={markdownAlternateHref} />
  {/if}
</svelte:head>

<!-- Primero: aplica clase .dark / color-scheme en <html> antes del resto (mode-watcher) -->
<ModeWatcher defaultMode="system" disableHeadScriptInjection />

<div class="flex min-h-0 w-full flex-1 flex-col">
  <!-- Nav — Swiss editorial: compact, precise, responsive -->
  <nav
    class="fixed left-3 right-3 top-3 z-50 mx-auto max-w-7xl border border-outline-variant/40 bg-surface/95 shadow-sm backdrop-blur-md md:left-6 md:right-6 md:top-4"
  >
    <div class="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
      <a
        href={resolve('/[lang]', { lang: currentLang })}
        class="group flex min-w-0 items-center gap-3 pr-4"
        onclick={() => (mobileOpen = false)}
      >
        <span
          class="grid size-10 shrink-0 place-items-center border border-primary/35 bg-primary text-[11px] font-bold tracking-[0.16em] text-primary-foreground uppercase"
        >
          PH
        </span>
        <span class="flex min-w-0 flex-col leading-none">
          <span class="font-serif text-xl font-semibold tracking-tight text-on-surface">
            {siteConfig.name}
          </span>
          <span
            class="mt-1 hidden text-[9px] font-bold tracking-[0.28em] text-primary uppercase sm:block"
          >
            Private Estates
          </span>
        </span>
      </a>

      <div class="hidden items-center gap-7 lg:flex">
        <a class={navClass('/')} href={resolve('/[lang]', { lang: currentLang })}
          >{$t('layout.nav.home')}</a
        >
        <a class={navClass('/proyectos')} href={resolve('/[lang]/proyectos', { lang: currentLang })}
          >{$t('layout.nav.projects')}</a
        >
        <a
          class={navClass('/sobre-nosotros')}
          href={resolve('/[lang]/sobre-nosotros', { lang: currentLang })}
          >{$t('layout.nav.about')}</a
        >
        <a class={navClass('/blog')} href={resolve('/[lang]/blog', { lang: currentLang })}
          >{$t('layout.nav.blog')}</a
        >
        <a class={navClass('/contacto')} href={resolve('/[lang]/contacto', { lang: currentLang })}
          >{$t('layout.nav.contact')}</a
        >
      </div>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="text-on-surface-variant hover:text-primary"
          onclick={handleToggleTheme}
          aria-label={$t('layout.aria.theme')}
        >
          <span class="material-symbols-outlined text-[22px]"
            >{isDark ? 'light_mode' : 'dark_mode'}</span
          >
        </Button>

        <div class="relative hidden sm:block" use:clickOutside={() => (languageOpen = false)}>
          <Button
            variant="outline"
            size="sm"
            class="gap-2 border-outline-variant/60 bg-surface/80 px-3 text-[11px] font-bold tracking-[0.14em] text-on-surface uppercase hover:text-primary"
            onclick={() => (languageOpen = !languageOpen)}
            aria-label={$t('layout.aria.language')}
            aria-expanded={languageOpen}
          >
            <span class="material-symbols-outlined text-[18px]">language</span>
            {currentLanguage.short}
            <span
              class="material-symbols-outlined text-[18px] transition-transform {languageOpen
                ? 'rotate-180'
                : ''}">expand_more</span
            >
          </Button>
          {#if languageOpen}
            <div
              class="absolute right-0 mt-3 w-44 border border-outline-variant/40 bg-surface p-1 shadow-xl"
            >
              {#each languageOptions as option (option.code)}
                <button
                  type="button"
                  class="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-semibold tracking-[0.08em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container-low hover:text-primary"
                  onclick={() => switchLocale(option.code)}
                >
                  <span>{option.label}</span>
                  <span class="flex items-center gap-2 text-[10px] text-primary">
                    {option.short}
                    {#if option.code === currentLang}
                      <span class="material-symbols-outlined text-[16px]">check</span>
                    {/if}
                  </span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <Button
          variant="ghost"
          size="icon"
          href={`tel:${siteConfig.contact.phone}`}
          class="hidden text-on-surface-variant hover:text-primary md:inline-flex"
          aria-label={$t('layout.aria.call')}
        >
          <span class="material-symbols-outlined text-[22px]">call</span>
        </Button>
        <Button
          href={resolve('/[lang]/proyectos', { lang: currentLang })}
          class="hidden bg-primary px-5 text-[10px] font-bold tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--accent-hover)] hover:text-white xl:inline-flex"
        >
          {$t('layout.nav.getStarted')}
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="border-outline-variant/60 lg:hidden"
          onclick={() => (mobileOpen = !mobileOpen)}
          aria-label={$t('layout.aria.toggleMenu')}
          aria-expanded={mobileOpen}
        >
          {#if mobileOpen}
            <span class="material-symbols-outlined text-[22px]">close</span>
          {:else}
            <span class="material-symbols-outlined text-[22px]">menu</span>
          {/if}
        </Button>
      </div>
    </div>

    {#if mobileOpen}
      <div class="border-t border-outline-variant/30 bg-surface px-4 py-5 lg:hidden">
        <div class="flex flex-col gap-1">
          <a
            class="flex items-center justify-between border-b border-outline-variant/15 px-1 py-3 text-sm font-semibold tracking-[0.13em] text-on-surface uppercase transition-colors hover:text-primary"
            href={resolve('/[lang]', { lang: currentLang })}
            onclick={() => (mobileOpen = false)}
          >
            {$t('layout.nav.home')}
            <span class="text-primary">→</span>
          </a>
          <a
            class="flex items-center justify-between border-b border-outline-variant/15 px-1 py-3 text-sm font-semibold tracking-[0.13em] text-on-surface uppercase transition-colors hover:text-primary"
            href={resolve('/[lang]/proyectos', { lang: currentLang })}
            onclick={() => (mobileOpen = false)}
          >
            {$t('layout.nav.projects')}
            <span class="text-primary">→</span>
          </a>
          <a
            class="flex items-center justify-between border-b border-outline-variant/15 px-1 py-3 text-sm font-semibold tracking-[0.13em] text-on-surface uppercase transition-colors hover:text-primary"
            href={resolve('/[lang]/sobre-nosotros', { lang: currentLang })}
            onclick={() => (mobileOpen = false)}
          >
            {$t('layout.nav.about')}
            <span class="text-primary">→</span>
          </a>
          <a
            class="flex items-center justify-between border-b border-outline-variant/15 px-1 py-3 text-sm font-semibold tracking-[0.13em] text-on-surface uppercase transition-colors hover:text-primary"
            href={resolve('/[lang]/blog', { lang: currentLang })}
            onclick={() => (mobileOpen = false)}
          >
            {$t('layout.nav.blog')}
            <span class="text-primary">→</span>
          </a>
          <a
            class="flex items-center justify-between border-b border-outline-variant/15 px-1 py-3 text-sm font-semibold tracking-[0.13em] text-on-surface uppercase transition-colors hover:text-primary"
            href={resolve('/[lang]/contacto', { lang: currentLang })}
            onclick={() => (mobileOpen = false)}
          >
            {$t('layout.nav.contact')}
            <span class="text-primary">→</span>
          </a>
        </div>
        <div class="mt-5 grid grid-cols-4 gap-2">
          {#each languageOptions as option (option.code)}
            <Button
              variant={option.code === currentLang ? 'default' : 'outline'}
              size="sm"
              class="text-[11px] font-bold tracking-[0.16em] uppercase"
              onclick={() => switchLocale(option.code)}
              aria-label={`${$t('layout.aria.language')} ${option.label}`}
            >
              {option.short}
            </Button>
          {/each}
        </div>
        <Button
          href={resolve('/[lang]/proyectos', { lang: currentLang })}
          class="mt-5 w-full bg-primary py-5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--accent-hover)] hover:text-white"
          onclick={() => (mobileOpen = false)}
        >
          {$t('layout.nav.getStarted')}
        </Button>
      </div>
    {/if}
  </nav>

  <main id="main-content" class="w-full flex-1 pt-24 md:pt-32">
    {#key page.url.pathname}
      <div class="block w-full min-h-0">
        {@render children()}
      </div>
    {/key}
  </main>

  <Footer />
</div>

{#if Toaster}
  <Toaster />
{/if}
{#if ToastContainer}
  <ToastContainer />
{/if}
{#if CookieConsent}
  <CookieConsent />
{/if}
{#if WhatsAppFloating}
  <WhatsAppFloating />
{/if}
<JsonLd
  type={effectiveSeo.schemaType}
  headline={effectiveSeo.headline}
  datePublished={effectiveSeo.datePublished}
  dateModified={effectiveSeo.dateModified}
  description={effectiveSeo.description}
  author={effectiveSeo.author}
  locale={effectiveSeo.locale}
  image={effectiveSeo.ogImage}
  faq={effectiveSeo.faq}
  howto={effectiveSeo.howto}
  softwareName={effectiveSeo.softwareName}
  softwareCategory={effectiveSeo.softwareCategory}
/>
