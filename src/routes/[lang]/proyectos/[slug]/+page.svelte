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
  const project = $derived(data.project);

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: `${project.title} | ${project.location} | ${siteConfig.name}`,
      description: project.seoDescription || project.heroDescription || `Descubra ${project.title}, una exclusiva propiedad en ${project.location} con acabados de maximo lujo.`,
      ogTitle: `${project.title} - Propiedad Exclusiva | ${siteConfig.name}`,
      ogDescription: project.seoDescription || project.heroDescription || `Espectacular residencia en ${project.location}. Precio: ${project.price}.`,
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

<div class="pt-24 md:pt-36 bg-background">
  <!-- Header / Intro -->
  <Section variant="default" className="pb-16 px-6 border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div class="md:col-span-8">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">
            {project.heroTag || 'RESIDENCIA EXCLUSIVA'}
          </span>
          <Heading level={1} align="left" className="font-serif text-4xl sm:text-6xl text-on-surface mb-6 leading-tight">
            {project.title}
          </Heading>
          <Text variant="body" className="text-on-surface-variant max-w-2xl text-lg sm:text-xl font-light leading-relaxed">
            {project.heroDescription || 'Una obra maestra arquitectonica concebida para los gustos mas exigentes, combinando privacidad absoluta con un diseno de vanguardia.'}
          </Text>
        </div>
        <div class="md:col-span-4 flex md:justify-end">
          <div class="flex flex-col items-start md:items-end border-b border-primary pb-3 w-full md:w-auto">
            <span class="font-bold text-xs tracking-widest text-on-surface-variant uppercase mb-1">VALOR DE ADQUISICION</span>
            <span class="font-serif text-2xl sm:text-3xl text-primary font-bold">{project.price}</span>
          </div>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Main Image Showcase -->
  <Section variant="surface" className="py-12 px-6 bg-surface-container-lowest">
    <Container>
      <div class="relative aspect-[16/9] overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
        <img
          src={project.images.principal}
          alt={project.title}
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-6 left-6 bg-surface/90 backdrop-blur-md px-6 py-3 border border-outline-variant/30 shadow-lg">
          <span class="text-xs font-bold tracking-widest text-primary uppercase block mb-1">UBICACION PRIVILEGIADA</span>
          <span class="font-serif text-lg text-on-surface">{project.location}</span>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Specs & Detailed Body (Asymmetric Layout) -->
  <Section variant="default" className="py-20 px-6 bg-background border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Left: Specs & Actions -->
        <div class="lg:col-span-4 space-y-8 p-8 bg-surface-container-lowest border border-outline-variant/40 shadow-xl">
          <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block">ESPECIFICACIONES TECNICAS</span>
          <h3 class="font-serif text-2xl text-on-surface border-b border-outline-variant/30 pb-4">
            Resumen del Inmueble
          </h3>

          <div class="space-y-6 divide-y divide-outline-variant/20 pt-2">
            <div class="flex justify-between items-center pt-4">
              <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">LOCALIZACION</span>
              <span class="text-xs font-semibold text-on-surface">{project.location}</span>
            </div>
            <div class="flex justify-between items-center pt-4">
              <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">PRECIO</span>
              <span class="text-xs font-semibold text-primary font-bold">{project.price}</span>
            </div>
            {#each project.specs as spec}
              <div class="flex justify-between items-center pt-4">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">{spec.label}</span>
                <span class="text-xs font-semibold text-on-surface">{spec.value}</span>
              </div>
            {/each}
          </div>

          <div class="pt-8 space-y-4 border-t border-outline-variant/30">
            <Button variant="default" href={`/${$locale}/contacto?propiedad=${project.slug}`} class="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase py-6 text-xs rounded-none shadow-lg">
              Solicitar Dossier Privado
            </Button>
            <Button variant="outline" href={`tel:${siteConfig.contact.phone}`} class="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-widest uppercase py-6 text-xs rounded-none bg-transparent">
              Llamar a un Asesor Privado
            </Button>
          </div>
        </div>

        <!-- Right: Detailed Description & Video Iframe -->
        <div class="lg:col-span-8 space-y-16">
          <div>
            <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-4">MEMORIA DESCRIPTIVA</span>
            <Heading level={2} align="left" className="font-serif text-3xl sm:text-4xl text-on-surface mb-8 leading-tight">
              Arquitectura y Estilo de Vida
            </Heading>
            <div class="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-light leading-relaxed space-y-6">
              {#if project.body}
                <p>{project.body}</p>
              {:else}
                <p>
                  Esta majestuosa residencia redefine los estandares del lujo contemporaneo. Concebida por reconocidos arquitectos internacionales, la propiedad se integra armoniosamente en su entorno natural, ofreciendo vistas panoramicas ininterrumpidas y una privacidad absoluta.
                </p>
                <p>
                  Los espacios interiores han sido meticulosamente disenados utilizando materiales nobles de la mas alta calidad, incluyendo marmoles importados, maderas exoticas tratadas a mano y sistemas domoticos de ultima generacion. Las amplias zonas de estar fluyen de manera natural hacia las extensas terrazas exteriores y la piscina infinita, creando el ambiente perfecto tanto para la relajacion privada como para la celebracion de eventos exclusivos.
                </p>
              {/if}
            </div>
          </div>

          <!-- Video / Cinematic Tour Iframe -->
          {#if project.videoUrl}
            <div class="space-y-4">
              <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block">RECORRIDO CINEMATOGRAFICO</span>
              <h3 class="font-serif text-2xl text-on-surface mb-6">Tour Virtual Privado</h3>
              <div class="relative aspect-video overflow-hidden shadow-2xl border border-outline-variant/30 bg-black">
                <iframe
                  src={project.videoUrl.replace('watch?v=', 'embed/').replace('vimeo.com/', 'player.vimeo.com/video/')}
                  title="Recorrido Virtual de la Propiedad"
                  class="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </Container>
  </Section>

  <!-- Gallery Showcase -->
  <Section variant="surface" className="py-24 px-6 bg-surface-container-lowest">
    <Container>
      <div class="mb-16 text-center">
        <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">GALERIA DE IMAGENES</span>
        <Heading level={2} className="font-serif text-3xl sm:text-5xl text-on-surface">
          Detalles Arquitectonicos
        </Heading>
        <div class="w-20 h-1 bg-primary mx-auto mt-6"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="aspect-[4/5] overflow-hidden shadow-xl border border-outline-variant/30 bg-surface-container group">
          <img
            src={project.images.principal}
            alt={`${project.title} - Vista 1`}
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        {#if project.images.secondary1}
          <div class="aspect-[4/5] overflow-hidden shadow-xl border border-outline-variant/30 bg-surface-container group">
            <img
              src={project.images.secondary1}
              alt={`${project.title} - Vista 2`}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        {/if}
        {#if project.images.secondary2}
          <div class="aspect-[4/5] overflow-hidden shadow-xl border border-outline-variant/30 bg-surface-container group">
            <img
              src={project.images.secondary2}
              alt={`${project.title} - Vista 3`}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        {/if}
      </div>
    </Container>
  </Section>

  <!-- CTA Banner -->
  <Section variant="soft" className="py-28 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <Container>
      <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
      <Heading level={2} className="font-serif text-3xl sm:text-5xl text-on-surface mb-12 max-w-3xl mx-auto leading-tight">
        ¿Desea organizar una visita privada a {project.title}?
      </Heading>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <Button variant="default" size="lg" href={`/${$locale}/contacto?propiedad=${project.slug}`} class="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none shadow-2xl">
          Concertar Cita Privada
        </Button>
        <Button variant="outline" size="lg" href={`tel:${siteConfig.contact.phone}`} class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none bg-transparent">
          Llamar a un Asesor
        </Button>
      </div>
    </Container>
  </Section>
</div>
