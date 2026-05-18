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
  const propiedad = $derived(data.propiedad);

  let formSubmitted = $state(false);
  let formData = $state({
    name: '',
    email: '',
    phone: '',
    subject: propiedad ? `Interes en propiedad: ${propiedad}` : '',
    message: ''
  });

  function handleSubmit(event: Event) {
    event.preventDefault();
    formSubmitted = true;
  }

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: `Contacto & Atelier Privado | ${siteConfig.name}`,
      description: 'Pongase en contacto con PrimeHaus para organizar una consulta privada o solicitar informacion sobre nuestro portafolio de propiedades exclusivas.',
      ogTitle: `Contacto | ${siteConfig.name}`,
      ogDescription: 'Atelier de curaduria inmobiliaria en Madrid y Marbella. Consultas privadas bajo cita previa.',
      twitterCard: 'summary_large_image',
      schemaType: 'ContactPage',
      headline: 'Atelier Inmobiliario Privado',
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: ['contacto primehaus', 'inmobiliaria madrid', 'inmobiliaria marbella', 'atelier inmobiliario', 'cita previa lujo']
    });
  });
</script>

<div class="pt-24 md:pt-36 bg-background">
  <!-- Hero Section -->
  <Section variant="default" className="pb-16 px-6 border-b border-outline-variant/30">
    <Container>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div class="md:col-span-8">
          <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">ATELIER PRIVADO</span>
          <Heading level={1} align="left" className="font-serif text-4xl sm:text-6xl text-on-surface mb-6 leading-tight">
            Inicie la Conversacion
          </Heading>
          <Text variant="body" className="text-on-surface-variant max-w-2xl text-lg sm:text-xl font-light leading-relaxed">
            Tanto si busca adquirir una residencia de legado como si requiere asesoria arquitectonica de alto nivel, nuestras puertas estan abiertas para una consulta privada.
          </Text>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Main Content: Form & Info Sidebar -->
  <Section variant="surface" className="py-24 px-6 bg-surface-container-lowest">
    <Container>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Contact Form (Asymmetric layout: columns 1-7) -->
        <div class="lg:col-span-7 pr-0 lg:pr-8">
          {#if formSubmitted}
            <div class="bg-primary/10 border border-primary p-12 text-center shadow-xl">
              <span class="material-symbols-outlined text-primary text-5xl mb-4 block">check_circle</span>
              <Heading level={3} className="font-serif text-2xl text-on-surface mb-4">Inscripcion Recibida</Heading>
              <Text variant="body" className="text-on-surface-variant max-w-md mx-auto">
                Gracias por ponerse en contacto con PrimeHaus. Un curador senior revisara su solicitud y se pondra en contacto con usted en un plazo maximo de 4 horas habiles.
              </Text>
            </div>
          {:else}
            <form onsubmit={handleSubmit} class="space-y-12 bg-surface p-8 sm:p-12 border border-outline-variant/40 shadow-2xl">
              <span class="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-6 border-b border-outline-variant/30 pb-4">
                FORMULARIO DE CONTACTO PRIVADO
              </span>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label for="name" class="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">Nombre Completo</label>
                  <input
                    id="name"
                    type="text"
                    required
                    bind:value={formData.name}
                    placeholder="Su nombre y apellidos"
                    class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant text-sm font-light rounded-none"
                  />
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">Correo Electronico</label>
                  <input
                    id="email"
                    type="email"
                    required
                    bind:value={formData.email}
                    placeholder="ejemplo@dominio.com"
                    class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant text-sm font-light rounded-none"
                  />
                </div>
                <div class="space-y-2">
                  <label for="phone" class="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">Telefono de Contacto</label>
                  <input
                    id="phone"
                    type="tel"
                    bind:value={formData.phone}
                    placeholder="+34 600 000 000"
                    class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant text-sm font-light rounded-none"
                  />
                </div>
                <div class="space-y-2">
                  <label for="subject" class="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">Asunto / Propiedad</label>
                  <input
                    id="subject"
                    type="text"
                    bind:value={formData.subject}
                    placeholder="Naturaleza de su consulta"
                    class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant text-sm font-light rounded-none"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label for="message" class="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">Mensaje / Requerimientos</label>
                <textarea
                  id="message"
                  required
                  bind:value={formData.message}
                  rows="5"
                  placeholder="¿Como podemos asistirle en su busqueda o gestion inmobiliaria?"
                  class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant text-sm font-light resize-none rounded-none"
                ></textarea>
              </div>

              <div class="pt-4">
                <Button variant="default" type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase py-7 text-xs rounded-none shadow-xl transition-all">
                  Enviar Solicitud Privada
                </Button>
              </div>
            </form>
          {/if}
        </div>

        <!-- Info Sidebar (Asymmetric layout: columns 9-12) -->
        <div class="lg:col-span-5 space-y-12 bg-surface-container-low p-8 sm:p-12 border border-outline-variant/30 shadow-xl">
          <div class="border-l-2 border-primary pl-6 py-1 space-y-3">
            <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Nuestro Atelier</h3>
            <p class="text-base text-on-surface font-light leading-relaxed">
              {siteConfig.contact.address}<br />
              Espana
            </p>
          </div>

          <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
            <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Canales Directos</h3>
            <div class="space-y-3 divide-y divide-outline-variant/20 pt-1">
              <div class="flex justify-between items-center pt-2">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">TELEFONO</span>
                <span class="text-sm font-bold text-on-surface">{siteConfig.contact.phone}</span>
              </div>
              <div class="flex justify-between items-center pt-3">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">EMAIL</span>
                <span class="text-sm font-bold text-primary">{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
            <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Horario de Atencion</h3>
            <div class="space-y-3 divide-y divide-outline-variant/20 pt-1">
              <div class="flex justify-between items-center pt-2">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">LUNES — VIERNES</span>
                <span class="text-sm font-light text-on-surface">09:00 — 19:00</span>
              </div>
              <div class="flex justify-between items-center pt-3">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">SABADOS</span>
                <span class="text-sm font-light text-primary font-semibold">Cita Previa Exclusiva</span>
              </div>
              <div class="flex justify-between items-center pt-3">
                <span class="text-xs font-bold tracking-widest text-on-surface-variant uppercase">DOMINGOS</span>
                <span class="text-sm font-light text-on-surface-variant">Cerrado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>

  <!-- Map Section -->
  <section class="w-full h-[500px] bg-surface-container overflow-hidden grayscale relative border-t border-b border-outline-variant/30 shadow-inner">
    <img
      src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1600&q=80"
      alt="Madrid Atelier Location"
      class="w-full h-full object-cover opacity-80"
    />
    <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10">
      <span class="material-symbols-outlined text-primary text-6xl mb-4 drop-shadow-2xl block">location_on</span>
      <div class="bg-surface/95 backdrop-blur-md px-8 py-4 border border-outline-variant/30 shadow-2xl">
        <span class="font-bold text-xs tracking-[0.3em] uppercase text-primary block mb-1">VISITE NUESTRO ATELIER</span>
        <span class="font-serif text-lg text-on-surface">{siteConfig.contact.address}</span>
      </div>
    </div>
  </section>
</div>
