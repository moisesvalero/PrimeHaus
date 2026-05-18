<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardHeader, CardTitle } from '$lib/components/ui/card';
  import Container from '$lib/components/ui/Container.svelte';
  import Section from '$lib/components/ui/Section.svelte';
  import Heading from '$lib/components/ui/Heading.svelte';
  import Text from '$lib/components/ui/Text.svelte';

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: `Sobre Nosotros | Filosofia Suiza | ${siteConfig.name}`,
      description: 'Conozca la historia, mision y valores de PrimeHaus. Lideres en curaduria inmobiliaria de alto standing y asesoria arquitectonica desde 2004.',
      ogTitle: `Sobre Nosotros | ${siteConfig.name}`,
      ogDescription: 'Curando las residencias mas significativas del mundo a traves de la precision suiza y un servicio inigualable.',
      twitterCard: 'summary_large_image',
      schemaType: 'AboutPage',
      headline: 'El Arte de la Seleccion Inmobiliaria',
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: ['sobre nosotros primehaus', 'inmobiliaria lujo', 'historia primehaus', 'filosofia suiza', 'curadores inmobiliarios']
    });
  });
</script>

<div class="pt-24 md:pt-36 bg-background">
  <!-- Hero Section -->
  <Section variant="default" className="pb-16 px-6 border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div class="md:col-span-8">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">NUESTRO LEGADO</span>
          <Heading level={1} align="left" className="font-serif text-4xl sm:text-6xl text-on-surface mb-6 leading-tight">
            El Arte de la Seleccion
          </Heading>
        </div>
        <div class="md:col-span-4 pb-4">
          <p class="font-serif text-lg sm:text-xl text-on-surface-variant italic border-l-2 border-primary pl-6 leading-relaxed">
            Una vision definitiva del lujo, curada a traves de veinte anos de excelencia arquitectonica y un patrimonio inquebrantable.
          </p>
        </div>
      </div>
      <div class="mt-16 w-full h-[500px] sm:h-[600px] overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="PrimeHaus Masterpiece Villa"
          class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </Container>
  </Section>

  <!-- Story Section -->
  <Section variant="surface" className="py-24 px-6 bg-surface-container-lowest border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div class="lg:col-span-6 space-y-6 pr-0 lg:pr-8">
          <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">ORIGENES Y EVOLUCION</span>
          <Heading level={2} align="left" className="font-serif text-3xl sm:text-4xl text-on-surface mb-6">
            Dos Decadas de Maestria
          </Heading>
          <Text variant="body" className="text-on-surface text-base sm:text-lg leading-relaxed font-light">
            Fundada en 2004, PrimeHaus nacio de una obsesion singular: la interseccion entre la integridad estructural y la resonancia emocional. Nuestro viaje comenzo como una firma boutique de consultoria para la restauracion arquitectonica, evolucionando hasta convertirse en la casa de bienes raices de lujo mas exclusiva de Europa.
          </Text>
          <Text variant="body" className="text-on-surface text-base sm:text-lg leading-relaxed font-light">
            Veinte anos de experiencia han refinado nuestro paladar para lo excepcional. No nos limitamos a listar propiedades; curamos entornos habitables que se erigen como monumentos a los logros de sus propietarios. Nuestro portafolio representa una seleccion rigurosa de las fincas costeras y santuarios urbanos mas singulares del planeta.
          </Text>
          <Text variant="body" className="text-on-surface text-base sm:text-lg leading-relaxed font-light">
            Hoy en dia, nuestra vision permanece inalterada. Proporcionamos una lente arquitectonica a traves de la cual la elite global puede descubrir y gestionar sus activos mas significativos. Cada transaccion es tratada como una obra maestra, manejada con la discrecion y precision que se ha convertido en nuestra firma de marca.
          </Text>
        </div>
        <div class="lg:col-span-6 relative h-[500px] sm:h-[650px] shadow-2xl border border-outline-variant/30 bg-surface-container">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80"
            alt="PrimeHaus Architecture Detail"
            class="w-full h-full object-cover"
          />
          <div class="absolute -bottom-8 -left-8 bg-primary p-10 shadow-2xl hidden sm:block border border-white/20">
            <h3 class="font-serif text-6xl text-white font-bold mb-2">20</h3>
            <p class="text-xs font-bold text-primary-fixed tracking-[0.2em] uppercase">
              Anos de Excelencia
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Mission/Vision/Values Section -->
  <Section variant="soft" className="py-24 px-6 bg-surface-container-low border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
        <div class="pt-8 md:pt-0 md:pr-12">
          <span class="material-symbols-outlined text-primary text-4xl mb-6 block">architecture</span>
          <Heading level={3} className="font-serif text-2xl text-on-surface mb-4">La Mision</Heading>
          <Text variant="muted" className="leading-relaxed font-light">
            Servir como el puente arquitectonico definitivo entre propiedades visionarias y aquellos individuos que aprecian los matices del diseno de alto nivel y el arte estructural.
          </Text>
        </div>
        <div class="pt-8 md:pt-0 md:px-12">
          <span class="material-symbols-outlined text-primary text-4xl mb-6 block">visibility</span>
          <Heading level={3} className="font-serif text-2xl text-on-surface mb-4">La Vision</Heading>
          <Text variant="muted" className="leading-relaxed font-light">
            Definir el estandar global para el sector inmobiliario de lujo a traves de un compromiso implacable con la integridad arquitectonica y la filosofia suiza de excelencia objetiva.
          </Text>
        </div>
        <div class="pt-8 md:pt-0 md:pl-12">
          <span class="material-symbols-outlined text-primary text-4xl mb-6 block">diamond</span>
          <Heading level={3} className="font-serif text-2xl text-on-surface mb-4">Los Valores</Heading>
          <Text variant="muted" className="leading-relaxed font-light">
            Precision matematica, discrecion absoluta y una dedicacion inquebrantable a la estetica de la permanencia en un mundo en constante cambio.
          </Text>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Team Section -->
  <Section variant="default" className="py-24 px-6 bg-background">
    <Container>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-outline-variant/30 pb-6 gap-4">
        <div>
          <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">LIDERAZGO EJECUTIVO</span>
          <Heading level={2} align="left" className="font-serif text-3xl sm:text-5xl text-on-surface">
            Los Custodios
          </Heading>
        </div>
        <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">JUNTA DIRECTIVA PRIMEHAUS</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Member 1 -->
        <Card class="bg-surface border border-outline-variant/40 rounded-none shadow-lg overflow-hidden group">
          <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Julian Vance"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <CardHeader class="p-6">
            <span class="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">FOUNDER & CEO</span>
            <CardTitle class="font-serif text-xl text-on-surface">Julian Vance</CardTitle>
            <div class="h-0.5 w-12 bg-primary mt-4"></div>
          </CardHeader>
        </Card>

        <!-- Member 2 -->
        <Card class="bg-surface border border-outline-variant/40 rounded-none shadow-lg overflow-hidden group">
          <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
              alt="Elena Rossetti"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <CardHeader class="p-6">
            <span class="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">PRINCIPAL ARCHITECT</span>
            <CardTitle class="font-serif text-xl text-on-surface">Elena Rossetti</CardTitle>
            <div class="h-0.5 w-12 bg-primary mt-4"></div>
          </CardHeader>
        </Card>

        <!-- Member 3 -->
        <Card class="bg-surface border border-outline-variant/40 rounded-none shadow-lg overflow-hidden group">
          <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
              alt="Marcus Thorne"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <CardHeader class="p-6">
            <span class="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">HEAD OF ESTATES</span>
            <CardTitle class="font-serif text-xl text-on-surface">Marcus Thorne</CardTitle>
            <div class="h-0.5 w-12 bg-primary mt-4"></div>
          </CardHeader>
        </Card>

        <!-- Member 4 -->
        <Card class="bg-surface border border-outline-variant/40 rounded-none shadow-lg overflow-hidden group">
          <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"
              alt="Sophia Chen"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <CardHeader class="p-6">
            <span class="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">CLIENT DIRECTOR</span>
            <CardTitle class="font-serif text-xl text-on-surface">Sophia Chen</CardTitle>
            <div class="h-0.5 w-12 bg-primary mt-4"></div>
          </CardHeader>
        </Card>
      </div>
    </Container>
  </Section>

  <!-- CTA Banner -->
  <Section variant="soft" className="py-28 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <Container>
      <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
      <Heading level={2} className="font-serif text-3xl sm:text-5xl text-on-surface mb-12 max-w-3xl mx-auto leading-tight">
        ¿Desea formar parte de nuestro exclusivo portafolio?
      </Heading>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <Button variant="default" size="lg" href={`/${$locale}/proyectos`} class="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none shadow-2xl">
          Explorar Portafolio
        </Button>
        <Button variant="outline" size="lg" href={`/${$locale}/contacto`} class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-widest uppercase px-12 py-7 text-xs rounded-none bg-transparent">
          Programar Consulta
        </Button>
      </div>
    </Container>
  </Section>
</div>
