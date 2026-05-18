<script lang="ts">
  import { get } from 'svelte/store';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';

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

<div>
  <!-- HERO — Full-bleed image, overlay gradient, Swiss editorial typography -->
  <section class="relative min-h-[750px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
        alt="PrimeHaus Luxury Villa"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60"></div>
    </div>
    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-8 flex flex-col items-start">
          <span class="text-primary-fixed-dim font-bold tracking-[0.3em] uppercase text-xs mb-6">
            {$t('home.hero.eyebrow')}
          </span>
          <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8">
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
              class="bg-primary-container hover:brightness-110 text-white font-bold tracking-[0.2em] uppercase px-10 py-5 text-xs"
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

  <!-- SERVICES — 3-column cards with Material Symbols -->
  <section class="py-28 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-12 gap-6 mb-16">
      <div class="col-span-12 md:col-span-6">
        <h2 class="font-serif text-4xl md:text-5xl font-semibold text-on-surface mb-4">
          {$t('home.features.title')}
        </h2>
        <div class="w-20 h-0.5 bg-primary"></div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300">
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block">account_balance</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">Brokerage Exclusivo</h3>
        <p class="text-on-surface-variant leading-relaxed">
          Adquisicion y gestion discreta de los activos residenciales mas significativos y codiciados del mercado internacional.
        </p>
      </div>
      <div class="p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300">
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block">query_stats</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">Inversion Estrategica</h3>
        <p class="text-on-surface-variant leading-relaxed">
          Analisis de datos e inteligencia de mercado para maximizar el rendimiento y la expansion de portafolios de alto valor.
        </p>
      </div>
      <div class="p-8 border border-outline-variant/50 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-300">
        <span class="material-symbols-outlined text-primary text-5xl mb-8 block">architecture</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">Asesoria Arquitectonica</h3>
        <p class="text-on-surface-variant leading-relaxed">
          Consultoria integral que abarca desde la viabilidad estructural hasta el diseno de interiores y paisajismo de elite.
        </p>
      </div>
    </div>
  </section>

  <!-- FEATURED PROJECTS — Curated collection from Sanity -->
  <section class="py-28 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
      <div>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4">COLECCION CURADA</span>
        <h2 class="font-serif text-4xl md:text-5xl font-semibold text-on-surface">
          Propiedades Destacadas
        </h2>
        <div class="w-20 h-0.5 bg-primary mt-6"></div>
      </div>
      <Button
        variant="outline"
        href={`/${$locale}/proyectos`}
        class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-[0.2em] uppercase px-6 py-4 text-xs bg-transparent"
      >
        Ver Todas las Propiedades
      </Button>
    </div>

    {#if projects.length === 0}
      <div class="text-center py-16 border border-outline-variant/30 bg-surface-container-low p-8">
        <p class="text-on-surface-variant">No hay propiedades destacadas disponibles en este momento.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each projects as project}
          <a
            href={`/${$locale}/proyectos/${project.slug}`}
            class="group border border-outline-variant/30 bg-surface-container-lowest hover:shadow-soft-md transition-all duration-500 flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-surface-container">
              <img
                src={project.images.principal}
                alt={project.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {#if project.heroTag}
                <span class="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-primary font-bold px-3 py-1 text-[10px] tracking-[0.2em] uppercase border border-outline-variant/30">
                  {project.heroTag}
                </span>
              {/if}
              <span class="absolute bottom-4 right-4 bg-primary text-white font-bold px-4 py-2 text-xs tracking-wider">
                {project.price}
              </span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <span class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-2">{project.location}</span>
              <h3 class="font-serif text-2xl font-semibold text-on-surface group-hover:text-primary transition-colors mb-3">
                {project.title}
              </h3>
              <p class="text-sm text-on-surface-variant leading-relaxed line-clamp-2 mb-6">
                {project.heroDescription || project.seoDescription || 'Propiedad exclusiva con acabados de maximo lujo.'}
              </p>
              <div class="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
                {#each project.specs.slice(0, 4) as spec}
                  <div>
                    <span class="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant block font-bold">{spec.label}</span>
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

  <!-- ABOUT TEASER — Asymmetric Swiss editorial layout -->
  <section class="py-28 md:py-32 bg-surface-container-low border-y border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-5 relative z-10">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-6">FILOSOFIA SUIZA</span>
          <h2 class="font-serif text-4xl md:text-5xl font-semibold text-on-surface leading-tight mb-8">
            {$t('home.steps.title')}
          </h2>
          <p class="text-lg text-on-surface-variant mb-10 leading-relaxed font-light">
            La integridad arquitectonica no es una simple norma; es nuestro codigo. Concebimos cada propiedad como una obra de arte habitable, garantizando que el legado de la estructura resuene con la sofisticacion de su propietario.
          </p>
          <div class="space-y-6 mb-10">
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">verified_user</span>
              <div>
                <h4 class="font-semibold text-on-surface">{$t('home.steps.step1.title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.steps.step1.desc')}</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">handshake</span>
              <div>
                <h4 class="font-semibold text-on-surface">{$t('home.steps.step2.title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.steps.step2.desc')}</p>
              </div>
            </div>
          </div>
          <a
            href={`/${$locale}/sobre-nosotros`}
            class="inline-flex items-center gap-3 font-bold tracking-[0.2em] uppercase text-xs text-primary hover:gap-5 transition-all group"
          >
            Conocer Nuestra Historia
            <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
        <div class="md:col-start-7 md:col-span-6">
          <div class="aspect-[4/5] overflow-hidden border border-outline-variant/30">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
              alt="PrimeHaus Architecture"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>

  <!-- CTA BANNER — Gold section -->
  <section class="relative py-28 md:py-32 overflow-hidden bg-primary text-white text-center px-6">
    <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-on-primary-container/40 opacity-80 z-0"></div>
    <div class="relative z-10 max-w-4xl mx-auto">
      <span class="text-primary-fixed-dim font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
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
