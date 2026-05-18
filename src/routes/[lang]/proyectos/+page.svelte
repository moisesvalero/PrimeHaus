<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';
  import Section from '$lib/components/ui/Section.svelte';
  import Heading from '$lib/components/ui/Heading.svelte';
  import Text from '$lib/components/ui/Text.svelte';

  let { data } = $props();
  const projects = $derived(data.projects || []);

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: `Portafolio de Propiedades Exclusivas | ${siteConfig.name}`,
      description: 'Explore nuestra coleccion curada de villas de maximo lujo, aticos exclusivos y residencias arquitectonicas en las ubicaciones mas prestigiosas.',
      ogTitle: `Propiedades Exclusivas | ${siteConfig.name}`,
      ogDescription: 'Coleccion curada de residencias de alto standing en Marbella, Madrid y destinos internacionales.',
      twitterCard: 'summary_large_image',
      schemaType: 'CollectionPage',
      headline: 'Portafolio de Propiedades Exclusivas',
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: ['villas lujo', 'aticos exclusivos', 'primehaus portafolio', 'inmobiliaria marbella', 'propiedades madrid']
    });
  });
</script>

<div class="pt-24 md:pt-36 bg-background">
  <!-- Hero Section -->
  <Section variant="default" className="pb-16 px-6 border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div class="md:col-span-8">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">COLECCION PRIMEHAUS</span>
          <Heading level={1} align="left" className="font-serif text-4xl sm:text-6xl text-on-surface mb-6 leading-tight">
            Portafolio de Residencias
          </Heading>
          <Text variant="body" className="text-on-surface-variant max-w-2xl text-lg sm:text-xl font-light leading-relaxed">
            Curando las residencias mas significativas del mundo. Explore nuestras ultimas adquisiciones y obras maestras arquitectonicas en los destinos mas exclusivos del planeta.
          </Text>
        </div>
        <div class="md:col-span-4 flex md:justify-end">
          <div class="flex gap-4 border-b border-primary pb-3 w-full md:w-auto">
            <span class="font-bold text-xs tracking-widest text-primary uppercase">Catalogo Selecto</span>
            <span class="text-xs tracking-widest text-on-surface-variant uppercase">/ {projects.length} Propiedades Disponibles</span>
          </div>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Projects Grid (Asymmetric) -->
  <Section variant="surface" className="py-24 px-6 bg-surface-container-lowest">
    <Container>
      {#if projects.length === 0}
        <div class="text-center py-24 border border-outline-variant/30 bg-surface-container-low p-12 shadow-xl">
          <span class="material-symbols-outlined text-primary text-5xl mb-4 block">real_estate_agent</span>
          <Heading level={3} className="font-serif text-2xl text-on-surface mb-4">Catalogo en Actualizacion</Heading>
          <Text variant="muted" className="max-w-md mx-auto">
            Nuestro equipo de curadores esta preparando una nueva seleccion de propiedades exclusivas para este catalogo.
          </Text>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-28">
          {#each projects as project, i}
            <div class={`flex flex-col group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
              <a href={`/${$locale}/proyectos/${project.slug}`} class="block overflow-hidden mb-8 bg-surface-container relative shadow-2xl border border-outline-variant/30">
                <img
                  src={project.images.principal}
                  alt={project.title}
                  class="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {#if project.heroTag}
                  <span class="absolute top-6 left-6 bg-surface/95 backdrop-blur-md text-primary font-bold px-4 py-2 text-xs tracking-[0.2em] uppercase border border-outline-variant/30 shadow-lg">
                    {project.heroTag}
                  </span>
                {/if}
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <span class="bg-primary text-white font-bold tracking-widest uppercase px-8 py-4 text-xs shadow-2xl border border-white/20">
                    Descubrir Residencia
                  </span>
                </div>
              </a>

              <div class="grid grid-cols-1 sm:grid-cols-2 border-t border-outline-variant/40 pt-6 gap-4">
                <div>
                  <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase block mb-2">{project.location}</span>
                  <h2 class="font-serif text-2xl sm:text-3xl text-on-surface group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                </div>
                <div class="flex flex-col sm:items-end justify-center">
                  <span class="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-1">VALOR ESTIMADO</span>
                  <span class="font-serif text-xl sm:text-2xl text-primary font-bold">{project.price}</span>
                </div>
              </div>

              <Text variant="muted" className="mt-6 text-sm line-clamp-3 leading-relaxed">
                {project.heroDescription || project.seoDescription || 'Residencia de maximo lujo con diseno arquitectonico de vanguardia y vistas espectaculares.'}
              </Text>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-outline-variant/20">
                {#each project.specs.slice(0, 4) as spec}
                  <div>
                    <span class="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">{spec.label}</span>
                    <span class="text-xs font-semibold text-on-surface">{spec.value}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </Container>
  </Section>

  <!-- CTA Banner -->
  <Section variant="soft" className="py-28 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <Container>
      <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
      <Heading level={2} className="font-serif text-3xl sm:text-5xl text-on-surface mb-12 max-w-3xl mx-auto leading-tight">
        ¿Listo para encontrar su obra maestra arquitectonica?
      </Heading>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <Button variant="default" size="lg" href={`/${$locale}/contacto`} class="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none shadow-2xl">
          Programar Consulta Privada
        </Button>
        <Button variant="outline" size="lg" href={`tel:${siteConfig.contact.phone}`} class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none bg-transparent">
          Llamar a un Asesor
        </Button>
      </div>
    </Container>
  </Section>
</div>
