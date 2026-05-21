<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import { reveal } from '$lib/reveal';
  import Button from '$lib/components/ui/button/button.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { portfolioImages } from '$lib/data/portfolio-images';

  const teamMembers = [
    { name: 'Julián Vance', role: 'Founder & CEO', img: portfolioImages.teamJulian },
    { name: 'Elena Rossetti', role: 'Principal Architect', img: portfolioImages.teamElena },
    { name: 'Marcus Thorne', role: 'Head of Estates', img: portfolioImages.teamMarcus },
    { name: 'Sophia Chen', role: 'Client Director', img: portfolioImages.teamSophia }
  ];

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: $t('about.seo.title'),
      description: $t('about.seo.description'),
      ogTitle: $t('about.seo.title'),
      ogDescription: $t('about.seo.description'),
      twitterCard: 'summary_large_image',
      schemaType: 'AboutPage',
      headline: $t('about.hero.title'),
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: [
        'sobre nosotros primehaus',
        'inmobiliaria lujo',
        'historia primehaus',
        'filosofía suiza',
        'asesores inmobiliarios'
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
          >{$t('about.hero.eyebrow')}</span
        >
        <h1
          class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight"
        >
          {$t('about.hero.title')}
        </h1>
      </div>
      <div class="md:col-span-4 pb-4">
        <p
          class="font-serif text-lg sm:text-xl text-on-surface-variant italic border-l-2 border-primary pl-6 leading-relaxed"
        >
          {$t('about.hero.quote')}
        </p>
      </div>
    </div>
    <div
      class="mt-16 w-full h-[500px] sm:h-[600px] overflow-hidden border border-outline-variant/30 bg-surface-container"
      use:reveal={{ stage: 'content', delay: 120 }}
    >
      <ResponsiveImage
        src={portfolioImages.villaExterior}
        alt="PrimeHaus Masterpiece Villa"
        preset="hero"
        width={1600}
        height={900}
        priority
        class="premium-image h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
      />
    </div>
  </section>

  <!-- STORY -->
  <section
    class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 space-y-6 lg:pr-8" use:reveal={{ stage: 'title' }}>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-2"
          >{$t('about.story.eyebrow')}</span
        >
        <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-6">
          {$t('about.story.title')}
        </h2>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          {$t('about.story.p1')}
        </p>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          {$t('about.story.p2')}
        </p>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          {$t('about.story.p3')}
        </p>
      </div>
      <div
        class="premium-card lg:col-span-6 relative h-[500px] sm:h-[650px] border border-outline-variant/30 bg-surface-container"
        use:reveal={{ stage: 'content', delay: 150 }}
      >
        <ResponsiveImage
          src={portfolioImages.livingRoom}
          alt="PrimeHaus Architecture Detail"
          fullResolution
          width={800}
          height={1000}
          class="premium-image h-full w-full object-cover"
        />
        <div
          class="absolute -bottom-8 -left-8 bg-primary p-10 hidden sm:block border border-white/10"
        >
          <h3 class="font-serif text-6xl text-white font-bold mb-2">20</h3>
          <p class="text-xs font-bold text-primary-fixed-dim tracking-[0.2em] uppercase">
            {$t('about.story.years')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- MISSION / VISION / VALUES -->
  <section
    class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30"
  >
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20"
    >
      <div class="premium-card pt-8 md:pt-0 md:pr-12" use:reveal={{ stage: 'content', delay: 90 }}>
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">architecture</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('about.mission.title')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          {$t('about.mission.desc')}
        </p>
      </div>
      <div class="premium-card pt-8 md:pt-0 md:px-12" use:reveal={{ stage: 'content', delay: 180 }}>
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">visibility</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('about.vision.title')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          {$t('about.vision.desc')}
        </p>
      </div>
      <div class="premium-card pt-8 md:pt-0 md:pl-12" use:reveal={{ stage: 'content', delay: 270 }}>
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">diamond</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">
          {$t('about.values.title')}
        </h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          {$t('about.values.desc')}
        </p>
      </div>
    </div>
  </section>

  <!-- TEAM -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-outline-variant/30 pb-6 gap-4"
    >
      <div>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4"
          >{$t('about.team.eyebrow')}</span
        >
        <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface">
          {$t('about.team.title')}
        </h2>
      </div>
      <span class="text-xs font-bold tracking-[0.2em] text-on-surface-variant uppercase"
        >{$t('about.team.subtitle')}</span
      >
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each teamMembers as member (member.name)}
        <div
          class="border border-outline-variant/30 bg-surface-container-lowest overflow-hidden group"
        >
          <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
            <ResponsiveImage
              src={member.img}
              alt={member.name + ' - ' + member.role}
              preset="card"
              width={400}
              height={533}
              class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div class="p-6">
            <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase block mb-2"
              >{member.role}</span
            >
            <h3 class="font-serif text-xl font-semibold text-on-surface">{member.name}</h3>
            <div class="h-0.5 w-12 bg-primary mt-4"></div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="py-28 md:py-32 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
      >{$t('about.cta.eyebrow')}</span
    >
    <h2
      class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-12 max-w-3xl mx-auto leading-tight"
    >
      {$t('about.cta.title')}
    </h2>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <Button
        variant="default"
        size="lg"
        href={'/' + $locale + '/proyectos'}
        class="bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] hover:text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-lg"
      >
        {$t('about.cta.primary')}
      </Button>
      <Button
        variant="outline"
        size="lg"
        href={'/' + $locale + '/contacto'}
        class="border-primary text-primary hover:bg-primary hover:text-on-primary-fixed font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs bg-transparent"
      >
        {$t('about.cta.secondary')}
      </Button>
    </div>
  </section>
</div>
