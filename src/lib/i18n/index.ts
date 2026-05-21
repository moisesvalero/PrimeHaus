/**
 * i18n: estado en `app-i18n.svelte.ts` (runes) + stores derivados para que
 * `$t` y `$locale` sigan funcionando en toda la plantilla (Svelte 5).
 */
import { derived, writable } from 'svelte/store';
import {
  applyLocale,
  getLocale,
  initI18n,
  t as translate,
  type AppLocale
} from './app-i18n.svelte.ts';

const tick = writable(0);

export function setLocale(lang: string): void {
  applyLocale(lang);
  tick.update((n) => n + 1);
}

/** Carga un solo JSON de idioma (chunk separado) y actualiza el store. */
export function bootstrapI18n(lang: AppLocale, messages: Record<string, unknown>): void {
  initI18n(lang, messages);
  tick.update((n) => n + 1);
}

export type { AppLocale };

/** Compatible con `$locale` en plantillas. */
export const locale = derived(tick, () => getLocale());

/** Compatible con `$t('clave')` — al cambiar `tick` se emite un traductor nuevo y el UI se actualiza. */
export const t = derived(tick, () => (key: string) => translate(key));
