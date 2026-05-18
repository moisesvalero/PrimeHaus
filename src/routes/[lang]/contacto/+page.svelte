<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale } from '$lib/i18n';
  import { toast } from '$lib/stores/toast';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data } = $props();
  const propiedad = $derived(data.propiedad);

  let formErrors = $state<Record<string, string>>({});
  let formValues = $state({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  let submitted = $state(false);
  let submitting = $state(false);

  $effect(() => {
    if (propiedad) {
      formValues = { ...formValues, subject: 'Interes en propiedad: ' + propiedad };
    }
  });

  function handleEnhance() {
    submitting = true;
    formErrors = {};
    return async ({ result }) => {
      submitting = false;
      if (result.type === 'success') {
        if (result.data?.success) {
          submitted = true;
          toast(result.data.message || 'Mensaje enviado correctamente.', 'success');
        }
      }
      if (result.type === 'failure') {
        if (result.data?.errors) {
          formErrors = result.data.errors as Record<string, string>;
        }
        if (result.data?.error) {
          toast(result.data.error as string, 'error');
        }
        if (result.status === 429) {
          toast('Demasiadas solicitudes. Intente de nuevo en unos minutos.', 'warning');
        }
      }
    };
  }

  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: 'Contacto & Atelier Privado | ' + siteConfig.name,
      description: 'Pongase en contacto con PrimeHaus para organizar una consulta privada o solicitar informacion sobre nuestro portafolio de propiedades exclusivas.',
      ogTitle: 'Contacto | ' + siteConfig.name,
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

<div class="pt-24 md:pt-36">
  <!-- HERO -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">ATELIER PRIVADO</span>
        <h1 class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight">
          Inicie la Conversacion
        </h1>
        <p class="text-lg sm:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
          Tanto si busca adquirir una residencia de legado como si requiere asesoria arquitectonica de alto nivel, nuestras puertas estan abiertas para una consulta privada.
        </p>
      </div>
    </div>
  </section>

  <!-- FORM + SIDEBAR — Asymmetric Swiss layout -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- LEFT: Contact Form (cols 1-7) -->
      <div class="lg:col-span-7 lg:pr-8">
        {#if submitted}
          <div class="bg-primary/5 border border-primary p-12 text-center">
            <span class="material-symbols-outlined text-primary text-5xl mb-4 block">check_circle</span>
            <h2 class="font-serif text-2xl font-semibold text-on-surface mb-4">Inscripcion Recibida</h2>
            <p class="text-on-surface-variant max-w-md mx-auto">
              Gracias por ponerse en contacto con PrimeHaus. Un curador senior revisara su solicitud y se pondra en contacto con usted en un plazo maximo de 4 horas habiles.
            </p>
          </div>
        {:else}
          <form
            method="POST"
            use:enhance={handleEnhance}
            class="space-y-12 bg-surface-container-lowest p-8 sm:p-12 border border-outline-variant/30"
          >
            <span class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-6 border-b border-outline-variant/30 pb-4">
              FORMULARIO DE CONTACTO PRIVADO
            </span>

            <!-- Honeypot -->
            <div class="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <label for="website">Website</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label for="name" class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block">Nombre Completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formValues.name}
                  placeholder="Su nombre y apellidos"
                  class="w-full bg-transparent border-b {formErrors.name ? 'border-destructive' : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.name}
                  <p class="text-destructive text-[10px]">{formErrors.name}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label for="email" class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block">Correo Electronico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formValues.email}
                  placeholder="ejemplo@dominio.com"
                  class="w-full bg-transparent border-b {formErrors.email ? 'border-destructive' : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.email}
                  <p class="text-destructive text-[10px]">{formErrors.email}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label for="phone" class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block">Telefono de Contacto</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  placeholder="+34 600 000 000"
                  class="w-full bg-transparent border-b {formErrors.phone ? 'border-destructive' : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.phone}
                  <p class="text-destructive text-[10px]">{formErrors.phone}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block">Asunto / Propiedad</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  placeholder="Naturaleza de su consulta"
                  class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label for="message" class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block">Mensaje / Requerimientos</label>
              <textarea
                id="message"
                name="message"
                required
                value={formValues.message}
                rows="5"
                placeholder="Como podemos asistirle en su busqueda o gestion inmobiliaria?"
                class="w-full bg-transparent border-b {formErrors.message ? 'border-destructive' : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light resize-none"
              ></textarea>
              {#if formErrors.message}
                <p class="text-destructive text-[10px]">{formErrors.message}</p>
              {/if}
            </div>
            <div class="pt-4">
              <Button
                variant="default"
                type="submit"
                disabled={submitting}
                class="w-full bg-primary hover:brightness-110 text-white font-bold tracking-[0.2em] uppercase py-6 text-xs shadow-lg transition-all disabled:opacity-50"
              >
                {submitting ? 'Enviando...' : 'Enviar Solicitud Privada'}
              </Button>
            </div>
          </form>
        {/if}
      </div>

      <!-- RIGHT: Info Sidebar (cols 9-12) -->
      <div class="lg:col-span-5 space-y-12 bg-surface-container-low p-8 sm:p-12 border border-outline-variant/30">
        <div class="border-l-2 border-primary pl-6 py-1 space-y-3">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Nuestro Atelier</h3>
          <p class="text-base text-on-surface font-light leading-relaxed">
            {siteConfig.contact.address}<br />
            Espana
          </p>
        </div>
        <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Canales Directos</h3>
          <dl class="space-y-3 divide-y divide-outline-variant/10 pt-1">
            <div class="flex justify-between items-center pt-2">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">TELEFONO</dt>
              <dd class="text-sm font-semibold text-on-surface">{siteConfig.contact.phone}</dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">EMAIL</dt>
              <dd class="text-sm font-semibold text-primary">{siteConfig.contact.email}</dd>
            </div>
          </dl>
        </div>
        <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Horario de Atencion</h3>
          <dl class="space-y-3 divide-y divide-outline-variant/10 pt-1">
            <div class="flex justify-between items-center pt-2">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">LUNES — VIERNES</dt>
              <dd class="text-sm font-light text-on-surface">09:00 — 19:00</dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">SABADOS</dt>
              <dd class="text-sm font-light text-primary font-semibold">Cita Previa Exclusiva</dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">DOMINGOS</dt>
              <dd class="text-sm font-light text-on-surface-variant">Cerrado</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <!-- MAP SECTION -->
  <section class="w-full h-[500px] bg-surface-container overflow-hidden grayscale relative border-t border-b border-outline-variant/30">
    <img
      src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1600&q=80"
      alt="Madrid Atelier Location"
      class="w-full h-full object-cover opacity-80"
    />
    <div class="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10">
      <span class="material-symbols-outlined text-primary text-6xl mb-4 drop-shadow-lg block">location_on</span>
      <div class="bg-surface/95 backdrop-blur-sm px-8 py-4 border border-outline-variant/30">
        <span class="font-bold text-xs tracking-[0.3em] uppercase text-primary block mb-1">VISITE NUESTRO ATELIER</span>
        <span class="font-serif text-lg text-on-surface">{siteConfig.contact.address}</span>
      </div>
    </div>
  </section>
</div>
