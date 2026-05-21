<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { siteConfig } from '$lib/site-config';
  import { t } from '$lib/i18n';

  const currentLang = $derived(page.url.pathname.match(/^\/(es|en|fr|de)/)?.[1] || 'es');
</script>

<!-- stitch_svelte_5_indigo_starter/sveltekit_starter_landing_page/code.html footer -->
<footer
  class="relative z-10 mt-auto flex w-full shrink-0 flex-col items-center justify-between gap-8 border-t border-outline-variant bg-inverse-surface px-8 py-12 md:flex-row dark:bg-surface-container-lowest"
>
  <div class="flex flex-col gap-2">
    <div class="font-h3 text-h3 font-bold text-surface dark:text-on-surface">{siteConfig.name}</div>
    <p class="font-body-sm text-body-sm text-outline-variant dark:text-on-surface-variant">
      © {new Date().getFullYear()}
      {siteConfig.name}. {$t('layout.footer.builtWith')}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
      <p class="text-[11px] tracking-wide text-outline-variant/75 dark:text-on-surface-variant/80">
        {$t('layout.footer.designedBy')}
        <a
          href={siteConfig.credits.designer.url}
          class="text-outline-variant/90 underline-offset-2 transition-colors hover:text-surface hover:underline dark:text-on-surface-variant dark:hover:text-primary"
          target="_blank"
          rel="noopener noreferrer">{siteConfig.credits.designer.name}</a
        >
      </p>
      <span class="flex items-center gap-2.5" aria-label="Enlaces del diseñador">
        <a
          href={siteConfig.credits.github}
          class="text-outline-variant/70 transition-colors hover:text-surface dark:text-on-surface-variant/80 dark:hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={$t('layout.footer.aria.github')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
            aria-hidden="true"
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
        </a>
        <a
          href={siteConfig.credits.linkedin}
          class="text-outline-variant/70 transition-colors hover:text-surface dark:text-on-surface-variant/80 dark:hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={$t('layout.footer.aria.linkedinDesigner')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
            aria-hidden="true"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
      </span>
    </div>
  </div>
  <div class="flex flex-wrap gap-6">
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={resolve('/[lang]/proyectos', { lang: currentLang })}>{$t('layout.footer.projects')}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={resolve('/[lang]/sobre-nosotros', { lang: currentLang })}>{$t('layout.footer.about')}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={resolve('/[lang]/blog', { lang: currentLang })}>{$t('layout.footer.blog')}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={resolve('/[lang]/contacto', { lang: currentLang })}>{$t('layout.footer.contact')}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={siteConfig.social.instagram}
      target="_blank"
      rel="noopener noreferrer">Instagram</a
    >
    <a
      class="font-body-sm text-body-sm text-outline-variant opacity-80 transition-colors hover:text-surface hover:opacity-100 dark:text-on-surface-variant dark:hover:text-primary"
      href={siteConfig.social.linkedin}
      target="_blank"
      rel="noopener noreferrer">LinkedIn</a
    >
  </div>
</footer>
