<script lang="ts">
  import { resolve } from '$app/paths';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import type { SiteLocale } from '$lib/i18n/site-locale';
  import { reveal } from '$lib/reveal';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';
  import { Input } from '$lib/components/ui/input';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

  let { data } = $props();
  const projects = $derived(data.projects || []);

  const buildDate = new Date().toISOString();

  // Filter and Search States
  let searchQuery = $state('');
  let selectedLocation = $state('all');
  let selectedType = $state('all');
  let sortBy = $state('default');

  const typeLabels: Record<SiteLocale, Record<string, string>> = {
    es: {
      villa: 'Villas',
      penthouse: 'Áticos',
      finca: 'Fincas',
      residence: 'Residencias',
      house: 'Casas',
      other: 'Otros'
    },
    en: {
      villa: 'Villas',
      penthouse: 'Penthouses',
      finca: 'Estates',
      residence: 'Residences',
      house: 'Houses',
      other: 'Others'
    },
    fr: {
      villa: 'Villas',
      penthouse: 'Penthouses',
      finca: 'Fincas',
      residence: 'Résidences',
      house: 'Maisons',
      other: 'Autres'
    },
    de: {
      villa: 'Villas',
      penthouse: 'Penthouses',
      finca: 'Fincas',
      residence: 'Residenzen',
      house: 'Häuser',
      other: 'Andere'
    }
  };

  function getCity(location: string): string {
    if (!location) return '';
    const parts = location.split(',');
    return parts[parts.length - 1].trim();
  }

  function getPropertyTypeKey(heroTag: string): string {
    if (!heroTag) return 'other';
    const tag = heroTag.toLowerCase();
    if (tag.includes('villa')) return 'villa';
    if (tag.includes('atico') || tag.includes('ático') || tag.includes('penthouse')) return 'penthouse';
    if (tag.includes('finca') || tag.includes('estate') || tag.includes('anwesen') || tag.includes('campagne')) return 'finca';
    if (tag.includes('residencia') || tag.includes('residence') || tag.includes('résidence') || tag.includes('residenz')) return 'residence';
    if (tag.includes('casa') || tag.includes('house') || tag.includes('haus') || tag.includes('maison') || tag.includes('palacete')) return 'house';
    return 'other';
  }

  function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    const cleaned = priceStr.replace(/[^\d]/g, '');
    return cleaned ? parseInt(cleaned, 10) : 0;
  }

  const uniqueLocations = $derived.by(() => {
    const locations = projects.map(p => getCity(p.location));
    return ['all', ...new Set(locations.filter(Boolean))];
  });

  const uniqueTypes = $derived.by(() => {
    const types = projects.map(p => getPropertyTypeKey(p.heroTag));
    return ['all', ...new Set(types.filter(t => t !== 'other'))];
  });

  const filteredProjects = $derived.by(() => {
    let list = [...projects];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          (p.heroDescription && p.heroDescription.toLowerCase().includes(q)) ||
          (p.heroTag && p.heroTag.toLowerCase().includes(q))
        );
      });
    }

    if (selectedLocation !== 'all') {
      list = list.filter(p => getCity(p.location) === selectedLocation);
    }

    if (selectedType !== 'all') {
      list = list.filter(p => getPropertyTypeKey(p.heroTag) === selectedType);
    }

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return list;
  });

  function resetFilters() {
    searchQuery = '';
    selectedLocation = 'all';
    selectedType = 'all';
    sortBy = 'default';
  }

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

<div class="pt-16 md:pt-28 lg:pt-36">
  <!-- HERO -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end" use:reveal={{ stage: 'title' }}>
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
            >/ {filteredProjects.length} {$t('projects.hero.available')}</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- PROJECTS GRID -->
  <section class="py-16 md:py-24 px-6 md:px-20 max-w-[1440px] mx-auto">
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
      <!-- FILTERS PANEL -->
      <div class="flex flex-col gap-6 mb-16 pb-12 border-b border-outline-variant/30" use:reveal={{ stage: 'content', delay: 100 }}>
        <!-- TOP ROW: Search, Sort & Reset -->
        <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div class="flex-1 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <!-- Search Input -->
            <div class="relative w-full md:max-w-md">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant/50">
                <span class="material-symbols-outlined text-lg">search</span>
              </span>
              <Input
                type="text"
                bind:value={searchQuery}
                placeholder={$t('projects.filter.searchPlaceholder')}
                class="pl-10 h-11 bg-surface-container-low border-outline-variant/30 rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-light text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300"
              />
              {#if searchQuery}
                <button
                  onclick={() => searchQuery = ''}
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-sm">close</span>
                </button>
              {/if}
            </div>

            <!-- Sorting Select -->
            <div class="relative w-full md:w-64">
              <select
                bind:value={sortBy}
                class="w-full h-11 pl-4 pr-10 bg-surface-container-low border border-outline-variant/30 rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm font-light text-on-surface transition-all duration-300 cursor-pointer"
              >
                <option value="default">{$t('projects.filter.sortBy')}: {$t('projects.filter.default')}</option>
                <option value="priceAsc">{$t('projects.filter.sortBy')}: {$t('projects.filter.priceAsc')}</option>
                <option value="priceDesc">{$t('projects.filter.sortBy')}: {$t('projects.filter.priceDesc')}</option>
              </select>
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-on-surface-variant/50">
                <span class="material-symbols-outlined text-lg">expand_more</span>
              </span>
            </div>
          </div>

          <!-- Reset Button -->
          {#if searchQuery || selectedLocation !== 'all' || selectedType !== 'all' || sortBy !== 'default'}
            <button
              onclick={resetFilters}
              class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase flex items-center justify-center gap-1 hover:text-[var(--accent-hover)] transition-colors py-2.5 px-6 border border-primary/20 hover:border-primary/50 bg-surface-container-low/30 duration-300"
            >
              <span class="material-symbols-outlined text-sm">restart_alt</span>
              {$t('projects.filter.reset')}
            </button>
          {/if}
        </div>

        <!-- BOTTOM ROW: Chip Groups -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <!-- Location Chips -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              {$t('projects.filter.location')}
            </span>
            <div class="flex flex-wrap gap-2">
              {#each uniqueLocations as loc}
                <Button
                  variant={selectedLocation === loc ? 'default' : 'outline'}
                  size="sm"
                  onclick={() => selectedLocation = loc}
                  class="rounded-none font-bold tracking-[0.15em] uppercase text-[10px] py-1.5 px-4 transition-all duration-300 hover:scale-[1.02]"
                >
                  {loc === 'all' ? $t('projects.filter.all') : loc}
                </Button>
              {/each}
            </div>
          </div>

          <!-- Type Chips -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              {$t('projects.filter.type')}
            </span>
            <div class="flex flex-wrap gap-2">
              {#each uniqueTypes as typeKey}
                <Button
                  variant={selectedType === typeKey ? 'default' : 'outline'}
                  size="sm"
                  onclick={() => selectedType = typeKey}
                  class="rounded-none font-bold tracking-[0.15em] uppercase text-[10px] py-1.5 px-4 transition-all duration-300 hover:scale-[1.02]"
                >
                  {typeKey === 'all' ? $t('projects.filter.allTypes') : (typeLabels[$locale as SiteLocale]?.[typeKey] || typeKey)}
                </Button>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- PROJECTS DISPLAY -->
      {#if filteredProjects.length === 0}
        <div class="text-center py-24 border border-outline-variant/30 bg-surface-container-low p-12" use:reveal={{ stage: 'content' }}>
          <span class="material-symbols-outlined text-primary text-5xl mb-4 block"
            >search_off</span
          >
          <h2 class="font-serif text-2xl text-on-surface mb-4">{$t('projects.filter.noResults')}</h2>
          <p class="text-on-surface-variant max-w-md mx-auto mb-8">
            {$t('projects.filter.noResultsDesc') || 'Intente ajustar sus criterios de búsqueda o restablezca los filtros.'}
          </p>
          <Button
            variant="outline"
            onclick={resetFilters}
            class="border-primary text-primary hover:bg-primary hover:text-on-primary font-bold tracking-[0.2em] uppercase px-8 py-4 text-xs bg-transparent rounded-none"
          >
            {$t('projects.filter.reset')}
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {#each filteredProjects as project, i (project.slug)}
            <div
              class={`premium-card group ${i % 2 !== 0 ? 'md:mt-28' : ''}`}
              use:reveal={{ stage: 'content', delay: 90 + (i % 2) * 120, distance: 56 }}
            >
              <a
                href={resolve('/[lang]/proyectos/[slug]', { lang: $locale, slug: project.slug })}
                class="block overflow-hidden mb-6 bg-surface-container border border-outline-variant/30 relative"
              >
                <ResponsiveImage
                  src={project.images.principal}
                  alt={project.title}
                  width={800}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  class="premium-image aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                    class="bg-[var(--accent-hover)] text-white font-bold tracking-[0.2em] uppercase px-8 py-4 text-xs"
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
                  'Propiedad de alto nivel con buena arquitectura, privacidad y una ubicación especialmente demandada.'}
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
          class="bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] hover:text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-lg"
        >
          {$t('projects.cta.primary')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          href={`tel:${siteConfig.contact.phone}`}
          class="border-primary text-primary hover:bg-primary hover:text-on-primary-fixed font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs bg-transparent"
        >
          {$t('projects.cta.secondary')}
        </Button>
      </div>
    </Container>
  </section>
</div>
