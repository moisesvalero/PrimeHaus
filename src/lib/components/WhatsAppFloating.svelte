<script lang="ts">
  import { page } from '$app/state';
  import { MessageCircle, Send, X } from 'lucide-svelte';
  import { siteConfig } from '$lib/site-config';
  import { t } from '$lib/i18n';
  import Button from '$lib/components/ui/button/button.svelte';

  let isOpen = $state(false);

  function toggleChat() {
    isOpen = !isOpen;
  }

  const waNumber = $derived(siteConfig.contact.whatsapp?.replace(/^\+/, '') || '');
  const defaultMessage = $derived(
    `${$t('layout.whatsapp.message') || 'Hola PrimeHaus, me gustaria recibir informacion.'} ${siteConfig.url}${page.url.pathname}`
  );
  const waUrl = $derived(`https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMessage)}`);
</script>

{#if waNumber}
  <div class="fixed right-4 bottom-4 z-[9998] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
    {#if isOpen}
      <div
        class="w-[min(20rem,calc(100vw-2rem))] border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-xl"
      >
        <div class="mb-4 flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div class="flex items-center gap-2">
            <MessageCircle class="text-primary" data-icon="inline-start" />
            <span class="text-xs font-bold uppercase tracking-[0.15em] text-on-surface"
              >WhatsApp</span
            >
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onclick={toggleChat}
            aria-label={$t('layout.whatsapp.close')}
          >
            <X />
          </Button>
        </div>
        <p class="mb-4 text-sm leading-relaxed font-light text-on-surface-variant">
          {$t('layout.whatsapp.lead') ||
            'Prefiere comunicarse por WhatsApp? Escribanos directamente.'}
        </p>
        <Button
          variant="default"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-5 text-xs font-bold uppercase tracking-[0.15em]"
        >
          <Send data-icon="inline-start" />
          {$t('layout.whatsapp.button') || 'Iniciar Chat'}
        </Button>
      </div>
    {/if}

    <Button
      variant="default"
      size="icon-lg"
      type="button"
      onclick={toggleChat}
      class="size-14 rounded-full bg-[#25d366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105"
      aria-label={$t('layout.whatsapp.open')}
    >
      <MessageCircle />
    </Button>
  </div>
{/if}
