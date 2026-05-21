<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';

  let { data } = $props();
  const project = $derived(data.project);

  const galleryImages = $derived([
    { src: project.images.principal, alt: project.title + ' - Vista principal' },
    ...(project.images.secondary1
      ? [{ src: project.images.secondary1, alt: project.title + ' - Vista 2' }]
      : []),
    ...(project.images.secondary2
      ? [{ src: project.images.secondary2, alt: project.title + ' - Vista 3' }]
      : [])
  ]);

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: project.title + ' | ' + project.location + ' | ' + siteConfig.name,
      description:
        project.seoDescription ||
        project.heroDescription ||
        'Descubra ' + project.title + ', una exclusiva propiedad en ' + project.location + '.',
      ogTitle: project.title + ' - ' + $t('project.hero.defaultTag') + ' | ' + siteConfig.name,
      ogDescription:
        project.seoDescription ||
        project.heroDescription ||
        'Propiedad destacada en ' + project.location + '. Precio: ' + project.price + '.',
      ogImage: project.images.principal,
      twitterCard: 'summary_large_image',
      schemaType: 'WebPage',
      headline: project.title,
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: [project.title, project.location, 'villa lujo', 'primehaus', 'propiedad exclusiva']
    });
  });
</script>

<div class="pt-16 md:pt-28 lg:pt-36">
  <!-- HEADER -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">
          {project.heroTag || $t('project.hero.defaultTag')}
        </span>
        <h1
          class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight"
        >
          {project.title}
        </h1>
        <p class="text-lg sm:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
          {project.heroDescription ||
            'Una propiedad cuidadosamente seleccionada por su ubicación, arquitectura y calidad de vida.'}
        </p>
      </div>
      <div class="md:col-span-4 flex md:justify-end">
        <div
          class="flex flex-col items-start md:items-end border-b border-primary pb-3 w-full md:w-auto"
        >
          <span class="font-bold text-xs tracking-[0.2em] text-on-surface-variant uppercase mb-1"
            >{$t('project.hero.valueLabel')}</span
          >
          <span class="font-serif text-2xl sm:text-3xl text-primary font-bold">{project.price}</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN IMAGE -->
  <section class="py-12 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div
      class="relative aspect-[16/9] overflow-hidden border border-outline-variant/30 bg-surface-container"
    >
      <ResponsiveImage
        src={project.images.principal}
        alt={'Vista principal de ' + project.title}
        width={1280}
        height={720}
        sizes="(min-width: 1024px) 90vw, 100vw"
        priority
        class="h-full w-full object-cover"
      />
      <div
        class="absolute bottom-6 left-6 bg-surface/90 backdrop-blur-sm px-6 py-3 border border-outline-variant/30"
      >
        <span class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-1"
          >{$t('project.image.locationLabel')}</span
        >
        <span class="font-serif text-lg text-on-surface">{project.location}</span>
      </div>
    </div>
  </section>

  <!-- SPECS + BODY -->
  <section
    class="py-20 md:py-28 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div
        class="lg:col-span-4 space-y-8 p-8 bg-surface-container-low border border-outline-variant/30"
      >
        <span class="text-primary font-bold tracking-[0.2em] uppercase text-[10px] block"
          >{$t('project.specs.eyebrow')}</span
        >
        <h3
          class="font-serif text-2xl font-semibold text-on-surface border-b border-outline-variant/30 pb-4"
        >
          {$t('project.specs.heading')}
        </h3>
        <dl class="space-y-4 divide-y divide-outline-variant/10">
          <div class="flex justify-between items-center pt-3">
            <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
              {$t('project.specs.location')}
            </dt>
            <dd class="text-xs font-semibold text-on-surface">{project.location}</dd>
          </div>
          <div class="flex justify-between items-center pt-3">
            <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
              {$t('project.specs.price')}
            </dt>
            <dd class="text-xs font-bold text-primary">{project.price}</dd>
          </div>
          {#each project.specs as spec (spec.label)}
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {spec.label}
              </dt>
              <dd class="text-xs font-semibold text-on-surface">{spec.value}</dd>
            </div>
          {/each}
        </dl>
        <div class="pt-8 space-y-4 border-t border-outline-variant/20">
          <Button
            variant="default"
            href={'/' + $locale + '/contacto?propiedad=' + project.slug}
            class="w-full bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] hover:text-white font-bold tracking-[0.2em] uppercase py-6 text-xs"
          >
            {$t('project.specs.ctaPrimary')}
          </Button>
          <Button
            variant="outline"
            href={'tel:' + siteConfig.contact.phone}
            class="w-full border-primary text-primary hover:bg-primary hover:text-on-primary-fixed font-bold tracking-[0.2em] uppercase py-6 text-xs bg-transparent"
          >
            {$t('project.specs.ctaSecondary')}
          </Button>
        </div>
      </div>

      <!-- RIGHT: Description + Video -->
      <div class="lg:col-span-8 space-y-16">
        <div>
          <span class="text-primary font-bold tracking-[0.2em] uppercase text-[10px] block mb-4"
            >{$t('project.description.eyebrow')}</span
          >
          <h2
            class="font-serif text-3xl sm:text-4xl font-semibold text-on-surface mb-8 leading-tight"
          >
            {$t('project.description.heading')}
          </h2>
          <div
            class="text-on-surface-variant font-light leading-relaxed space-y-6 text-base sm:text-lg"
          >
            {#if project.body}
              <p>{project.body}</p>
            {:else}
              <p>{$t('project.description.fallback1')}</p>
              <p>{$t('project.description.fallback2')}</p>
            {/if}
          </div>
        </div>

        {#if project.videoUrl}
          <div class="space-y-4">
            <span class="text-primary font-bold tracking-[0.2em] uppercase text-[10px] block"
              >{$t('project.video.eyebrow')}</span
            >
            <h3 class="font-serif text-2xl font-semibold text-on-surface mb-6">
              {$t('project.video.heading')}
            </h3>
            <VideoEmbed
              src={project.videoUrl
                .replace('watch?v=', 'embed/')
                .replace('vimeo.com/', 'player.vimeo.com/video/')}
              title={$t('project.video.heading')}
            />
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- GALLERY -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div class="mb-16 text-center">
      <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4"
        >{$t('project.gallery.eyebrow')}</span
      >
      <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface">
        {$t('project.gallery.title')}
      </h2>
      <div class="w-20 h-0.5 bg-primary mx-auto mt-6"></div>
    </div>
    <Gallery images={galleryImages} />
  </section>

  <!-- CTA BANNER -->
  <section class="py-28 md:py-32 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
      >{$t('project.cta.eyebrow')}</span
    >
    <h2
      class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-12 max-w-3xl mx-auto leading-tight"
    >
      {$t('project.cta.title')}
      {project.title}?
    </h2>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <Button
        variant="default"
        size="lg"
        href={'/' + $locale + '/contacto?propiedad=' + project.slug}
        class="bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] hover:text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-lg"
      >
        {$t('project.cta.primary')}
      </Button>
      <Button
        variant="outline"
        size="lg"
        href={'tel:' + siteConfig.contact.phone}
        class="border-primary text-primary hover:bg-primary hover:text-on-primary-fixed font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs bg-transparent"
      >
        {$t('project.cta.secondary')}
      </Button>
    </div>
  </section>
</div>
