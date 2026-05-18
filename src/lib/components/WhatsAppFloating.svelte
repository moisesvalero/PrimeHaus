<script lang="ts">
  import { siteConfig } from '$lib/site-config';
  import { t } from '$lib/i18n';
  import { browser } from '$app/environment';

  let isOpen = $state(false);

  function toggleChat() {
    isOpen = !isOpen;
  }

  const waNumber = $derived(siteConfig.contact.whatsapp?.replace(/^\+/, '') || '');
  const waUrl = $derived('https://wa.me/' + waNumber);
  const defaultMessage = $derived('');
</script>

{#if browser && waNumber}
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    {#if isOpen}
      <div class="bg-surface-container-lowest border border-outline-variant/40 shadow-lg w-72 p-5">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/30">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-xl">chat</span>
            <span class="text-xs font-bold tracking-[0.15em] uppercase text-on-surface">WhatsApp</span>
          </div>
          <button
            type="button"
            onclick={toggleChat}
            class="text-on-surface-variant hover:text-primary p-1"
            aria-label="Cerrar chat"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
        <p class="text-sm text-on-surface-variant leading-relaxed mb-4 font-light">
          {$t('layout.whatsapp.lead') || 'Prefiere comunicarse por WhatsApp? Escribanos directamente.'}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-primary hover:brightness-110 text-white font-bold tracking-[0.15em] uppercase text-xs px-6 py-3 flex items-center justify-center gap-2 w-full transition-all"
        >
          <span class="material-symbols-outlined text-base">send</span>
          {$t('layout.whatsapp.button') || 'Iniciar Chat'}
        </a>
      </div>
    {/if}

    <button
      type="button"
      onclick={toggleChat}
      class="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      style="width: 56px; height: 56px;"
      aria-label="Abrir chat de WhatsApp"
    >
      <span class="material-symbols-outlined text-3xl">chat</span>
    </button>
  </div>
{/if}
