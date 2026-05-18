<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: 'Sobre Nosotros | Filosofia Suiza | ' + siteConfig.name,
      description: 'Conozca la historia, mision y valores de PrimeHaus. Lideres en curaduria inmobiliaria de alto standing y asesoria arquitectonica desde 2004.',
      ogTitle: 'Sobre Nosotros | ' + siteConfig.name,
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

<div class="pt-24 md:pt-36">
  <!-- HERO -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">NUESTRO LEGADO</span>
        <h1 class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight">
          El Arte de la Seleccion
        </h1>
      </div>
      <div class="md:col-span-4 pb-4">
        <p class="font-serif text-lg sm:text-xl text-on-surface-variant italic border-l-2 border-primary pl-6 leading-relaxed">
          Una vision definitiva del lujo, curada a traves de veinte anos de excelencia arquitectonica y un patrimonio inquebrantable.
        </p>
      </div>
    </div>
    <div class="mt-16 w-full h-[500px] sm:h-[600px] overflow-hidden border border-outline-variant/30 bg-surface-container">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        alt="PrimeHaus Masterpiece Villa - grayscale to color"
        class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
      />
    </div>
  </section>

  <!-- STORY — Asymmetric layout -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 space-y-6 lg:pr-8">
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-2">ORIGENES Y EVOLUCION</span>
        <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-6">
          Dos Decadas de Maestria
        </h2>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          Fundada en 2004, PrimeHaus nacio de una obsesion singular: la interseccion entre la integridad estructural y la resonancia emocional. Nuestro viaje comenzo como una firma boutique de consultoria para la restauracion arquitectonica, evolucionando hasta convertirse en la casa de bienes raices de lujo mas exclusiva de Europa.
        </p>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          Veinte anos de experiencia han refinado nuestro paladar para lo excepcional. No nos limitamos a listar propiedades; curamos entornos habitables que se erigen como monumentos a los logros de sus propietarios. Nuestro portafolio representa una seleccion rigurosa de las fincas costeras y santuarios urbanos mas singulares del planeta.
        </p>
        <p class="text-base sm:text-lg text-on-surface leading-relaxed font-light">
          Hoy en dia, nuestra vision permanece inalterada. Proporcionamos una lente arquitectonica a traves de la cual la elite global puede descubrir y gestionar sus activos mas significativos. Cada transaccion es tratada como una obra maestra, manejada con la discrecion y precision que se ha convertido en nuestra firma de marca.
        </p>
      </div>
      <div class="lg:col-span-6 relative h-[500px] sm:h-[650px] border border-outline-variant/30 bg-surface-container">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80"
          alt="PrimeHaus Architecture Detail"
          class="w-full h-full object-cover"
        />
        <div class="absolute -bottom-8 -left-8 bg-primary p-10 hidden sm:block border border-white/10">
          <h3 class="font-serif text-6xl text-white font-bold mb-2">20</h3>
          <p class="text-xs font-bold text-primary-fixed-dim tracking-[0.2em] uppercase">
            Anos de Excelencia
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- MISSION / VISION / VALUES -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
      <div class="pt-8 md:pt-0 md:pr-12">
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">architecture</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">La Mision</h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          Servir como el puente arquitectonico definitivo entre propiedades visionarias y aquellos individuos que aprecian los matices del diseno de alto nivel y el arte estructural.
        </p>
      </div>
      <div class="pt-8 md:pt-0 md:px-12">
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">visibility</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">La Vision</h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          Definir el estandar global para el sector inmobiliario de lujo a traves de un compromiso implacable con la integridad arquitectonica y la filosofia suiza de excelencia objetiva.
        </p>
      </div>
      <div class="pt-8 md:pt-0 md:pl-12">
        <span class="material-symbols-outlined text-primary text-4xl mb-6 block">diamond</span>
        <h3 class="font-serif text-2xl font-semibold text-on-surface mb-4">Los Valores</h3>
        <p class="text-on-surface-variant leading-relaxed font-light">
          Precision matematica, discrecion absoluta y una dedicacion inquebrantable a la estetica de la permanencia en un mundo en constante cambio.
        </p>
      </div>
    </div>
  </section>

  <!-- TEAM — Leadership section -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-outline-variant/30 pb-6 gap-4">
      <div>
        <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-4">LIDERAZGO EJECUTIVO</span>
        <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface">
          Los Custodios
        </h2>
      </div>
      <span class="text-xs font-bold tracking-[0.2em] text-on-surface-variant uppercase">JUNTA DIRECTIVA PRIMEHAUS</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="border border-outline-variant/30 bg-surface-container-lowest overflow-hidden group">
        <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
            alt="Julian Vance - Founder & CEO"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div class="p-6">
          <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase block mb-2">FOUNDER & CEO</span>
          <h3 class="font-serif text-xl font-semibold text-on-surface">Julian Vance</h3>
          <div class="h-0.5 w-12 bg-primary mt-4"></div>
        </div>
      </div>
      <div class="border border-outline-variant/30 bg-surface-container-lowest overflow-hidden group">
        <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
            alt="Elena Rossetti - Principal Architect"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div class="p-6">
          <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase block mb-2">PRINCIPAL ARCHITECT</span>
          <h3 class="font-serif text-xl font-semibold text-on-surface">Elena Rossetti</h3>
          <div class="h-0.5 w-12 bg-primary mt-4"></div>
        </div>
      </div>
      <div class="border border-outline-variant/30 bg-surface-container-lowest overflow-hidden group">
        <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
            alt="Marcus Thorne - Head of Estates"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div class="p-6">
          <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase block mb-2">HEAD OF ESTATES</span>
          <h3 class="font-serif text-xl font-semibold text-on-surface">Marcus Thorne</h3>
          <div class="h-0.5 w-12 bg-primary mt-4"></div>
        </div>
      </div>
      <div class="border border-outline-variant/30 bg-surface-container-lowest overflow-hidden group">
        <div class="aspect-[3/4] overflow-hidden bg-surface-container relative">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"
            alt="Sophia Chen - Client Director"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div class="p-6">
          <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase block mb-2">CLIENT DIRECTOR</span>
          <h3 class="font-serif text-xl font-semibold text-on-surface">Sophia Chen</h3>
          <div class="h-0.5 w-12 bg-primary mt-4"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="py-28 md:py-32 px-6 bg-surface border-t border-outline-variant/30 text-center">
    <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">INICIE SU VIAJE</span>
    <h2 class="font-serif text-4xl sm:text-5xl font-semibold text-on-surface mb-12 max-w-3xl mx-auto leading-tight">
      Desea formar parte de nuestro exclusivo portafolio?
    </h2>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <Button
        variant="default"
        size="lg"
        href={'/' + $locale + '/proyectos'}
        class="bg-primary hover:brightness-110 text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs shadow-lg"
      >
        Explorar Portafolio
      </Button>
      <Button
        variant="outline"
        size="lg"
        href={'/' + $locale + '/contacto'}
        class="border-primary text-primary hover:bg-primary hover:text-white font-bold tracking-[0.2em] uppercase px-12 py-6 text-xs bg-transparent"
      >
        Programar Consulta
      </Button>
    </div>
  </section>
</div>
