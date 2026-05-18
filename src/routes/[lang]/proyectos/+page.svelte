<script lang="ts">
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

    setSeo({
      title: $t('projects.seo.title'),
      description: $t('projects.seo.description'),
      ogTitle: $t('projects.seo.title'),
      ogDescription: $t('projects.seo.description'),
      twitterCard: 'summary_large_image',
      schemaType: 'CollectionPage',
      headline: $t('projects.hero.title'),
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: [
        'villas lujo',
        'áticos exclusivos',
        'primehaus portafolio',
        'inmobiliaria marbella',
        'propiedades madrid'
      ]
    });
  });
</script>

<div class="pt-24 md:pt-36">
  <!-- HERO -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4"
          >{$t('projects.hero.eyebrow')}</span
        >
        <h1
          class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight"
        >
          {$t('projects.hero.title')}
        </h1>
        <p class="text-lg sm:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
          {$t('projects.hero.subtitle')}
        </p>
      </div>
      <div class="md:col-span-4 flex md:justify-end">
        <div class="flex gap-4 border-b border-primary pb-3 w-full md:w-auto">
          <span class="font-bold text-xs tracking-[0.2em] text-primary uppercase"
            >{$t('projects.hero.catalog')}</span
          >
          <span class="text-xs tracking-[0.2em] text-on-surface-variant uppercase"
            >/ {projects.length} {$t('projects.hero.available')}</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- PROJECTS GRID -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    {#if projects.length === 0}
      <div class="text-center py-24 border border-outline-variant/30 bg-surface-container-low p-12">
        <span class="material-symbols-outlined text-primary text-5xl mb-4 block"
          >real_estate_agent</span
        >
        <h2 class="font-serif text-2xl text-on-surface mb-4">{$t('projects.empty.title')}</h2>
        <p class="text-on-surface-variant max-w-md mx-auto">
          {$t('projects.empty.desc')}
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {#each projects as project, i (project.slug)}
          <div class={`group ${i % 2 !== 0 ? 'md:mt-28' : ''}`}>
            <a
              href={`/${$locale}/proyectos/${project.slug}`}
              class="block overflow-hidden mb-6 bg-surface-container border border-outline-variant/30 relative"
            >
              <img
                src={project.images.principal}
                alt={project.title}
                class="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {#if project.heroTag}
                <span
                  class="absolute top-6 left-6 bg-surface/90 backdrop-blur-sm text-primary font-bold px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-outline-variant/30"
                >
                  {project.heroTag}
                </span>
              {/if}
              <div
                class="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[1px]"
              >
                <span
                  class="bg-primary text-white font-bold tracking-[0.2em] uppercase px-8 py-4 text-xs"
                >
                  {$t('projects.card.discover')}
                </span>
              </div>
            </a>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 border-t border-outline-variant/30 pt-6 gap-4"
            >
              <div>
                <span
                  class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-2"
                  >{project.location}</span
                >
                <h2
                  class="font-serif text-2xl sm:text-3xl font-semibold text-on-surface group-hover:text-primary transition-colors"
                >
                  {project.title}
                </h2>
              </div>
              <div class="flex flex-col sm:items-end justify-center">
                <span
                  class="text-[9px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-1"
                  >{$t('projects.card.value')}</span
                >
                <span class="font-serif text-xl sm:text-2xl text-primary font-bold"
                  >{project.price}</span
                >
              </div>
            </div>
            <p class="mt-6 text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
              {project.heroDescription ||
                project.seoDescription ||
                'Residencia de máximo lujo con diseño arquitectónico de vanguardia y vistas espectaculares.'}
            </p>
            <div
              class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-outline-variant/15"
            >
              {#each project.specs.slice(0, 4) as spec (spec.label)}
                <div>
                  <span
                    class="text-[8px] uppercase tracking-[0.15em] text-on-surface-variant block font-bold"
                    >{spec.label}</span
                  >
                  <span class="text-xs font-semibold text-on-surface">{spec.value}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- CTA BANNER -->
  <section class="py-28 md:py-32 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <Container>
      <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
        >{$t('projects.cta.eyebrow')}</span
      >
      <h2
        class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-12 max-w-3xl mx-auto leading-tight"
      >
        {$t('projects.cta.title')}
      </h2>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <Button
          variant="default"
          size="lg"
          href={`/${$locale}/contacto`}
          class="bg-primary hover:brightness-110 text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-lg"
        >
          {$t('projects.cta.primary')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          href={`tel:${siteConfig.contact.phone}`}
          class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs bg-transparent"
        >
          {$t('projects.cta.secondary')}
        </Button>
      </div>
    </Container>
  </section>
</div>
