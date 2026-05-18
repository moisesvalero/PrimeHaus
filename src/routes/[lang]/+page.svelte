<script lang="ts">
  import { get } from 'svelte/store';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
  import Container from '$lib/components/ui/Container.svelte';
  import Section from '$lib/components/ui/Section.svelte';
  import Heading from '$lib/components/ui/Heading.svelte';
  import Text from '$lib/components/ui/Text.svelte';
  import Grid from '$lib/components/ui/Grid.svelte';

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
  <!-- Hero Section -->
  <section class="relative min-h-[750px] flex items-center overflow-hidden bg-inverse-surface">
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
        alt="PrimeHaus Luxury Villa"
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
    </div>
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 text-left">
      <span class="text-primary-fixed font-bold tracking-[0.3em] uppercase text-xs sm:text-sm mb-6 block">
        {$t('home.hero.eyebrow')}
      </span>
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-8 leading-tight font-serif">
        {$t('home.hero.title')}
      </h1>
      <p class="text-lg sm:text-xl text-white/90 max-w-2xl mb-12 font-light leading-relaxed">
        {$t('home.hero.subtitle')}
      </p>
      <div class="flex flex-wrap gap-4">
        <Button variant="default" size="lg" href={`/${$locale}/proyectos`} class="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase px-8 py-6 text-sm rounded-none">
          {$t('home.hero.ctaPrimary')}
        </Button>
        <Button variant="outline" size="lg" href={`/${$locale}/contacto`} class="border-white text-white hover:bg-white hover:text-primary font-bold tracking-widest uppercase px-8 py-6 text-sm rounded-none bg-transparent">
          {$t('home.hero.ctaSecondary')}
        </Button>
      </div>
    </div>
  </section>

  <!-- Our Expertise / Services -->
  <Section variant="surface" className="py-24 px-6 border-b border-outline-variant/30">
    <Container>
      <div class="mb-16">
        <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">PRIMEHAUS EXPERTISE</span>
        <Heading level={2} align="left" className="font-serif text-3xl sm:text-4xl text-on-surface">
          {$t('home.features.title')}
        </Heading>
        <div class="w-20 h-1 bg-primary mt-6"></div>
      </div>

      <Grid columns={3} gap="2rem">
        <Card class="p-8 border border-outline-variant/50 bg-surface hover:shadow-lg transition-all duration-300 rounded-none">
          <CardHeader class="p-0 mb-6">
            <span class="material-symbols-outlined text-primary text-4xl mb-4 block">real_estate_agent</span>
            <CardTitle class="font-serif text-2xl text-on-surface">Brokerage Exclusivo</CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <Text variant="muted" className="leading-relaxed">
              Adquisicion y gestion discreta de los activos residenciales mas significativos y codiciados del mercado internacional.
            </Text>
          </CardContent>
        </Card>

        <Card class="p-8 border border-outline-variant/50 bg-surface hover:shadow-lg transition-all duration-300 rounded-none">
          <CardHeader class="p-0 mb-6">
            <span class="material-symbols-outlined text-primary text-4xl mb-4 block">trending_up</span>
            <CardTitle class="font-serif text-2xl text-on-surface">Inversion Estrategica</CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <Text variant="muted" className="leading-relaxed">
              Analisis de datos e inteligencia de mercado para maximizar el rendimiento y la expansion de portafolios de alto valor.
            </Text>
          </CardContent>
        </Card>

        <Card class="p-8 border border-outline-variant/50 bg-surface hover:shadow-lg transition-all duration-300 rounded-none">
          <CardHeader class="p-0 mb-6">
            <span class="material-symbols-outlined text-primary text-4xl mb-4 block">architecture</span>
            <CardTitle class="font-serif text-2xl text-on-surface">Asesoria Arquitectonica</CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <Text variant="muted" className="leading-relaxed">
              Consultoria integral que abarca desde la viabilidad estructural hasta el diseno de interiores y paisajismo de elite.
            </Text>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  </Section>

  <!-- Proyectos Destacados (GROQ) -->
  <Section variant="default" className="py-28 px-6 bg-surface-container-lowest">
    <Container>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">COLECCION CURADA</span>
          <Heading level={2} align="left" className="font-serif text-3xl sm:text-5xl text-on-surface">
            Propiedades Destacadas
          </Heading>
          <div class="w-20 h-1 bg-primary mt-6"></div>
        </div>
        <Button variant="outline" href={`/${$locale}/proyectos`} class="border-primary text-primary hover:bg-primary hover:text-white rounded-none tracking-widest uppercase font-bold px-6 py-5 text-xs">
          Ver Todas las Propiedades
        </Button>
      </div>

      {#if projects.length === 0}
        <div class="text-center py-16 border border-outline-variant/30 bg-surface-container-low p-8">
          <Text variant="muted">No hay propiedades destacadas disponibles en este momento.</Text>
        </div>
      {:else}
        <Grid columns={3} gap="2rem">
          {#each projects as project}
            <Card class="group overflow-hidden border border-outline-variant/40 bg-surface hover:shadow-xl transition-all duration-500 rounded-none flex flex-col justify-between">
              <div>
                <div class="relative aspect-[4/3] overflow-hidden bg-surface-container">
                  <img
                    src={project.images.principal}
                    alt={project.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {#if project.heroTag}
                    <span class="absolute top-4 left-4 bg-surface/90 backdrop-blur-md text-primary font-bold px-3 py-1 text-xs tracking-widest uppercase border border-outline-variant/30">
                      {project.heroTag}
                    </span>
                  {/if}
                  <span class="absolute bottom-4 right-4 bg-primary text-white font-bold px-4 py-2 text-sm tracking-wider shadow-lg">
                    {project.price}
                  </span>
                </div>
                <CardHeader class="p-6 pb-4">
                  <span class="text-xs font-bold tracking-widest text-primary uppercase block mb-1">{project.location}</span>
                  <CardTitle class="font-serif text-2xl text-on-surface group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent class="px-6 py-0 mb-6">
                  <Text variant="muted" className="text-sm line-clamp-2 mb-6">
                    {project.heroDescription || project.seoDescription || 'Propiedad exclusiva con acabados de maximo lujo y vistas panoramicas espectaculares.'}
                  </Text>
                  <div class="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                    {#each project.specs.slice(0, 4) as spec}
                      <div class="text-left">
                        <span class="text-[10px] uppercase tracking-wider text-on-surface-variant block font-bold">{spec.label}</span>
                        <span class="text-xs font-semibold text-on-surface">{spec.value}</span>
                      </div>
                    {/each}
                  </div>
                </CardContent>
              </div>
              <CardFooter class="p-6 pt-0">
                <Button variant="default" href={`/${$locale}/proyectos/${project.slug}`} class="w-full bg-surface-container-high hover:bg-primary hover:text-white text-on-surface rounded-none tracking-widest uppercase font-bold text-xs py-5 transition-all">
                  Explorar Propiedad
                </Button>
              </CardFooter>
            </Card>
          {/each}
        </Grid>
      {/if}
    </Container>
  </Section>

  <!-- About Teaser (Asymmetric Layout) -->
  <Section variant="soft" className="py-28 px-6 bg-surface-container-low border-t border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-6 relative z-10">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">FILOSOFIA SUIZA</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-on-surface mb-8 leading-tight">
            {$t('home.steps.title')}
          </h2>
          <p class="text-lg text-on-surface-variant mb-10 leading-relaxed font-light">
            La integridad arquitectonica no es una simple norma; es nuestro codigo. Concebimos cada propiedad como una obra de arte habitable, garantizando que el legado de la estructura resuene con la sofisticacion de su propietario.
          </p>
          <div class="space-y-6 mb-10">
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">verified_user</span>
              <div>
                <h4 class="font-bold text-on-surface text-base">{$t('home.steps.step1.title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.steps.step1.desc')}</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-2xl mt-1">handshake</span>
              <div>
                <h4 class="font-bold text-on-surface text-base">{$t('home.steps.step2.title')}</h4>
                <p class="text-sm text-on-surface-variant">{$t('home.steps.step2.desc')}</p>
              </div>
            </div>
          </div>
          <Button variant="link" href={`/${$locale}/sobre-nosotros`} class="text-primary font-bold tracking-widest uppercase p-0 hover:text-primary/80 flex items-center gap-2 text-sm">
            Conocer Nuestra Historia <span class="material-symbols-outlined text-lg">arrow_forward</span>
          </Button>
        </div>
        <div class="md:col-span-6">
          <div class="aspect-[4/5] overflow-hidden shadow-2xl relative border border-outline-variant/30">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
              alt="PrimeHaus Architecture"
              class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </Container>
  </Section>

  <!-- CTA Banner -->
  <section class="relative py-28 overflow-hidden bg-primary text-white text-center px-6">
    <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-on-primary-container opacity-90 z-0"></div>
    <div class="relative z-10 max-w-4xl mx-auto">
      <span class="text-primary-fixed font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
      <h2 class="text-4xl sm:text-6xl font-serif mb-8 leading-tight">
        {$t('home.cta.title')}
      </h2>
      <p class="text-lg sm:text-xl text-primary-fixed/90 max-w-2xl mx-auto mb-12 font-light">
        {$t('home.cta.subtitle')}
      </p>
      <Button variant="default" size="lg" href={`/${$locale}/contacto`} class="bg-white text-primary hover:bg-surface-container-lowest font-bold tracking-widest uppercase px-12 py-7 text-sm rounded-none shadow-2xl transition-all hover:scale-105">
        {$t('home.cta.button')}
      </Button>
    </div>
  </section>
</div>
