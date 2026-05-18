<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
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
      formValues = { ...formValues, subject: 'Interés en propiedad: ' + propiedad };
    }
  });

  function handleEnhance() {
    submitting = true;
    formErrors = {};
    return async ({ result }: { result: any }) => {
      submitting = false;
      if (result.type === 'success') {
        if (result.data?.success) {
          submitted = true;
          toast(result.data.message || $t('contact.form.submit') + ' — Enviado', 'success');
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
      title: $t('contact.seo.title'),
      description: $t('contact.seo.description'),
      ogTitle: $t('contact.seo.title'),
      ogDescription: $t('contact.seo.description'),
      twitterCard: 'summary_large_image',
      schemaType: 'ContactPage',
      headline: $t('contact.hero.title'),
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: [
        'contacto primehaus',
        'inmobiliaria madrid',
        'inmobiliaria marbella',
        'atelier inmobiliario',
        'cita previa lujo'
      ]
    });
  });
</script>

<div class="pt-24 md:pt-36">
  <!-- HERO -->
  <section class="pb-16 px-6 md:px-20 max-w-[1440px] mx-auto border-b border-outline-variant/30">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <span class="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4"
          >{$t('contact.hero.eyebrow')}</span
        >
        <h1
          class="font-serif text-4xl sm:text-6xl font-semibold text-on-surface mb-6 leading-tight"
        >
          {$t('contact.hero.title')}
        </h1>
        <p class="text-lg sm:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
          {$t('contact.hero.subtitle')}
        </p>
      </div>
    </div>
  </section>

  <!-- FORM + SIDEBAR -->
  <section class="py-24 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- LEFT: Contact Form -->
      <div class="lg:col-span-7 lg:pr-8">
        {#if submitted}
          <div class="bg-primary/5 border border-primary p-12 text-center">
            <span class="material-symbols-outlined text-primary text-5xl mb-4 block"
              >check_circle</span
            >
            <h2 class="font-serif text-2xl font-semibold text-on-surface mb-4">
              {$t('contact.success.title')}
            </h2>
            <p class="text-on-surface-variant max-w-md mx-auto">
              {$t('contact.success.message')}
            </p>
          </div>
        {:else}
          <form
            method="POST"
            use:enhance={handleEnhance}
            class="space-y-12 bg-surface-container-lowest p-8 sm:p-12 border border-outline-variant/30"
          >
            <span
              class="text-primary font-bold tracking-[0.25em] uppercase text-xs block mb-6 border-b border-outline-variant/30 pb-4"
            >
              {$t('contact.form.title')}
            </span>

            <!-- Honeypot -->
            <div class="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <label for="website">Website</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label
                  for="name"
                  class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block"
                  >{$t('contact.form.name')}</label
                >
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formValues.name}
                  placeholder={$t('contact.form.namePh')}
                  class="w-full bg-transparent border-b {formErrors.name
                    ? 'border-destructive'
                    : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.name}
                  <p class="text-destructive text-[10px]">{formErrors.name}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label
                  for="email"
                  class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block"
                  >{$t('contact.form.email')}</label
                >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formValues.email}
                  placeholder={$t('contact.form.emailPh')}
                  class="w-full bg-transparent border-b {formErrors.email
                    ? 'border-destructive'
                    : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.email}
                  <p class="text-destructive text-[10px]">{formErrors.email}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label
                  for="phone"
                  class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block"
                  >{$t('contact.form.phone')}</label
                >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  placeholder={$t('contact.form.phonePh')}
                  class="w-full bg-transparent border-b {formErrors.phone
                    ? 'border-destructive'
                    : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
                {#if formErrors.phone}
                  <p class="text-destructive text-[10px]">{formErrors.phone}</p>
                {/if}
              </div>
              <div class="space-y-2">
                <label
                  for="subject"
                  class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block"
                  >{$t('contact.form.subject')}</label
                >
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  placeholder={$t('contact.form.subjectPh')}
                  class="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label
                for="message"
                class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block"
                >{$t('contact.form.message')}</label
              >
              <textarea
                id="message"
                name="message"
                required
                value={formValues.message}
                rows="5"
                placeholder={$t('contact.form.messagePh')}
                class="w-full bg-transparent border-b {formErrors.message
                  ? 'border-destructive'
                  : 'border-outline-variant'} py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline text-sm font-light resize-none"
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
                {submitting ? $t('contact.form.submitting') : $t('contact.form.submit')}
              </Button>
            </div>
          </form>
        {/if}
      </div>

      <!-- RIGHT: Info Sidebar -->
      <div
        class="lg:col-span-5 space-y-12 bg-surface-container-low p-8 sm:p-12 border border-outline-variant/30"
      >
        <div class="border-l-2 border-primary pl-6 py-1 space-y-3">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            {$t('contact.sidebar.atelier')}
          </h3>
          <p class="text-base text-on-surface font-light leading-relaxed">
            {$t('contact.sidebar.address')}<br />
            España
          </p>
        </div>
        <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            {$t('contact.sidebar.channels')}
          </h3>
          <dl class="space-y-3 divide-y divide-outline-variant/10 pt-1">
            <div class="flex justify-between items-center pt-2">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {$t('contact.sidebar.phone')}
              </dt>
              <dd class="text-sm font-semibold text-on-surface">{siteConfig.contact.phone}</dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {$t('contact.sidebar.email')}
              </dt>
              <dd class="text-sm font-semibold text-primary">{siteConfig.contact.email}</dd>
            </div>
          </dl>
        </div>
        <div class="border-l-2 border-primary pl-6 py-1 space-y-4">
          <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            {$t('contact.sidebar.hours')}
          </h3>
          <dl class="space-y-3 divide-y divide-outline-variant/10 pt-1">
            <div class="flex justify-between items-center pt-2">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {$t('contact.sidebar.monFri')}
              </dt>
              <dd class="text-sm font-light text-on-surface">{$t('contact.sidebar.monFriVal')}</dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {$t('contact.sidebar.sat')}
              </dt>
              <dd class="text-sm font-light text-primary font-semibold">
                {$t('contact.sidebar.satVal')}
              </dd>
            </div>
            <div class="flex justify-between items-center pt-3">
              <dt class="text-[10px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
                {$t('contact.sidebar.sun')}
              </dt>
              <dd class="text-sm font-light text-on-surface-variant">
                {$t('contact.sidebar.sunVal')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <!-- MAP SECTION -->
  <section
    class="w-full h-[500px] bg-surface-container overflow-hidden grayscale relative border-t border-b border-outline-variant/30"
  >
    <img
      src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1600&q=80"
      alt="Madrid Atelier Location"
      class="w-full h-full object-cover opacity-80"
    />
    <div class="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10"
    >
      <span class="material-symbols-outlined text-primary text-6xl mb-4 drop-shadow-lg block"
        >location_on</span
      >
      <div class="bg-surface/95 backdrop-blur-sm px-8 py-4 border border-outline-variant/30">
        <span class="font-bold text-xs tracking-[0.3em] uppercase text-primary block mb-1"
          >{$t('contact.map.title')}</span
        >
        <span class="font-serif text-lg text-on-surface">{$t('contact.sidebar.address')}</span>
      </div>
    </div>
  </section>
</div>
