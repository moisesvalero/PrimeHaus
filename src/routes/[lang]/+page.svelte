<script lang="ts">
  import { resolve } from '$app/paths';
  import { get } from 'svelte/store';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import { reveal } from '$lib/reveal';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { portfolioImages } from '$lib/data/portfolio-images';

  const HERO_IMAGE = portfolioImages.heroVilla;
  const ABOUT_IMAGE = portfolioImages.architectureInterior;
  const heroPreloadSrc = HERO_IMAGE;

  let { data } = $props();
  const projects = $derived(data.projects || []);

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;
    const tr = get(t);

    setSeo({
      title: tr('home.seo.title'),
      description: tr('home.seo.description'),
      ogTitle: siteConfig.name,
      ogDescription: tr('home.seo.description'),
      twitterCard: 'summary_large_image',
      schemaType: 'WebPage',
      headline: tr('home.hero.title'),
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: ['inmobiliaria lujo', 'primehaus', 'marbella', 'madrid', 'villas exclusivas']
    });
  });
</script>

<svelte:head>
  <link rel="preload" as="image" href={heroPreloadSrc} fetchpriority="high" />
</svelte:head>

<div>
  <!-- HERO -->
  <section class="relative min-h-[750px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <ResponsiveImage
        src={HERO_IMAGE}
        alt="PrimeHaus Luxury Villa"
        preset="hero"
        width={1600}
        height={900}
        priority
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60"></div>
    </div>
    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24">
      <div class="grid grid-cols-12 gap-6">
        <div
          class="col-span-12 md:col-span-8 flex flex-col items-start"
          use:reveal={{ stage: 'title', immediate: true }}
        >
          <span class="text-primary-fixed-dim font-bold tracking-[0.3em] uppercase text-xs mb-6">
            {$t('home.hero.eyebrow')}
          </span>
          <h1
            class="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8"
          >
            {$t('home.hero.title')}
          </h1>
          <p class="text-lg sm:text-xl text-white/85 max-w-xl mb-12 font-light leading-relaxed">
            {$t('home.hero.subtitle')}
          </p>
          <div class="flex flex-wrap gap-4">
            <Button
              variant="default"
              size="lg"
              href={`/${$locale}/proyectos`}
              class="bg-primary-container text-on-primary-fixed hover:bg-[var(--accent-hover)] hover:text-white font-bold tracking-[0.2em] uppercase px-10 py-5 text-xs"
            >
              {$t('home.hero.ctaPrimary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`/${$locale}/contacto`}
              class="border-white/60 text-white hover:bg-white hover:text-on-surface font-bold tracking-[0.2em] uppercase px-10 py-5 text-xs bg-transparent"
            >
              {$t('home.hero.ctaSecondary')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section
    class="py-28 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30"
  >
    <div class="grid grid-cols-12 gap-6 mb-16">
      <div class="col-span-12 md:col-span-6" use:reveal={{ stage: 'title' }}>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4">
          {$t('home.services.eyebrow')}
        </span>
        <h2 class="font-serif text-4xl md:text-5xl font-semibold text-on-surface mb-4">
          {$t('home.services.title')}
        </h2>
        <div class="w-20 h-0.5 bg-primary"></div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="premium-card p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300"
        use:reveal={{ stage: 'content', delay: 110 }}
      >
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block"
          >account_balance</span
        >
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('home.services.brokerageTitle')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed">
          {$t('home.services.brokerageDesc')}
        </p>
      </div>
      <div
        class="premium-card p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300"
        use:reveal={{ stage: 'content', delay: 210 }}
      >
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block">query_stats</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('home.services.investmentTitle')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed">
          {$t('home.services.investmentDesc')}
        </p>
      </div>
      <div
        class="premium-card p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300"
        use:reveal={{ stage: 'content', delay: 310 }}
      >
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block">architecture</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('home.services.advisoryTitle')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed">
          {$t('home.services.advisoryDesc')}
        </p>
      </div>
    </div>
  </section>

  <!-- FEATURED PROJECTS -->
  <section class="py-28 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
      use:reveal={{ stage: 'title' }}
    >
      <div>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4"
          >{$t('home.featured.eyebrow')}</span
        >
        <h2 class="font-serif text-4xl md:text-5xl font-semibold text-on-surface">
          {$t('home.featured.title')}
        </h2>
        <div class="w-20 h-0.5 bg-primary mt-6"></div>
      </div>
      <Button
        variant="outline"
        href={`/${$locale}/proyectos`}
        class="border-primary text-primary hover:bg-primary hover:text-on-primary-fixed font-bold tracking-[0.2em] uppercase px-6 py-4 text-xs bg-transparent"
      >
        {$t('home.featured.cta')}
      </Button>
    </div>

    {#if projects.length === 0}
      <div class="text-center py-16 border border-outline-variant/30 bg-surface-container-low p-8">
        <p class="text-on-surface-variant">{$t('home.featured.empty')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each projects as project (project.slug)}
          <a
            href={resolve('/[lang]/proyectos/[slug]', { lang: $locale, slug: project.slug })}
            class="premium-card group border border-outline-variant/30 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-500 flex flex-col"
            use:reveal={{ stage: 'content', delay: 110 }}
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-surface-container">
              <ResponsiveImage
                src={project.images.principal}
                alt={project.title}
                preset="card"
                width={640}
                height={480}
                class="premium-image h-full w-full object-cover"
              />
              {#if project.heroTag}
                <span
                  class="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-primary font-bold px-3 py-1 text-[10px] tracking-[0.2em] uppercase border border-outline-variant/30"
                >
                  {project.heroTag}
                </span>
              {/if}
              <span
                class="absolute bottom-4 right-4 bg-[var(--accent-hover)] text-white font-bold px-4 py-2 text-xs tracking-wider"
              >
                {project.price}
              </span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <span class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-2"
                >{project.location}</span
              >
              <h3
                class="font-serif text-2xl font-semibold text-on-surface group-hover:text-primary transition-colors mb-3"
              >
                {project.title}
              </h3>
              <p class="text-sm text-on-surface-variant leading-relaxed line-clamp-2 mb-6">
                {project.heroDescription ||
                  project.seoDescription ||
                  'Propiedad exclusiva con acabados de alta calidad y una ubicación cuidadosamente seleccionada.'}
              </p>
              <div class="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
                {#each project.specs.slice(0, 4) as spec (spec.label)}
                  <div>
                    <span
                      class="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant block font-bold"
                      >{spec.label}</span
                    >
                    <span class="text-xs font-semibold text-on-surface">{spec.value}</span>
                  </div>
                {/each}
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <!-- ABOUT TEASER -->
  <section class="py-28 md:py-32 bg-surface-container-low border-y border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-5 relative z-10" use:reveal={{ stage: 'title' }}>
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-6"
            >{$t('home.about.eyebrow')}</span
          >
          <h2
            class="font-serif text-4xl md:text-5xl font-semibold text-on-surface leading-tight mb-8"
          >
            {$t('home.about.title')}
          </h2>
          <p class="text-lg text-on-surface-variant mb-10 leading-relaxed font-light">
            {$t('home.about.desc')}
          </p>
          <div class="space-y-6 mb-10">
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">verified_user</span
              >
              <div>
                <h4 class="font-semibold text-on-surface">{$t('home.about.step1Title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.about.step1Desc')}</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">handshake</span>
              <div>
                <h4 class="font-semibold text-on-surface">{$t('home.about.step2Title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.about.step2Desc')}</p>
              </div>
            </div>
          </div>
          <a
            href={resolve('/[lang]/sobre-nosotros', { lang: $locale })}
            class="inline-flex items-center gap-3 font-bold tracking-[0.2em] uppercase text-xs text-primary hover:gap-5 transition-all group"
          >
            {$t('home.about.cta')}
            <span
              class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform"
              >arrow_forward</span
            >
          </a>
        </div>
        <div class="md:col-start-7 md:col-span-6">
          <div
            class="premium-card aspect-[4/5] overflow-hidden border border-outline-variant/30"
            use:reveal={{ stage: 'content', delay: 140 }}
          >
            <ResponsiveImage
              src={ABOUT_IMAGE}
              alt="PrimeHaus Architecture"
              preset="gallery"
              width={640}
              height={800}
              class="premium-image h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>

  <!-- CTA BANNER -->
  <section
    class="relative py-28 md:py-32 overflow-hidden bg-[var(--accent-hover)] text-white text-center px-6"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-on-primary-container/40 opacity-80 z-0"
    ></div>
    <div class="relative z-10 max-w-4xl mx-auto" use:reveal={{ stage: 'title' }}>
      <span class="text-primary-fixed-dim font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
        >{$t('home.cta.eyebrow')}</span
      >
      <h2 class="font-serif text-4xl sm:text-6xl font-bold text-white mb-8 leading-tight">
        {$t('home.cta.title')}
      </h2>
      <p class="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light">
        {$t('home.cta.subtitle')}
      </p>
      <Button
        variant="default"
        size="lg"
        href={`/${$locale}/contacto`}
        class="bg-white text-primary hover:bg-surface-container-lowest font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-xl transition-all hover:scale-[1.02]"
      >
        {$t('home.cta.button')}
      </Button>
    </div>
  </section>
</div>
