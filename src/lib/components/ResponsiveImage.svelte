<script lang="ts">
  import { cn } from '$lib/utils';
  import {
    buildImageSrc,
    buildImageSrcset,
    resolveImageOptions,
    type ImagePreset
  } from '$lib/utils/responsive-image';

  let {
    src,
    alt,
    width,
    height,
    sizes,
    preset,
    priority = false,
    quality,
    srcWidth,
    class: className = ''
  }: {
    src: string;
    alt: string;
    /** Solo reserva espacio (CLS); no limita la resolución descargada */
    width?: number;
    height?: number;
    sizes?: string;
    preset?: ImagePreset;
    priority?: boolean;
    quality?: number;
    /** Ancho de descarga explícito (opcional) */
    srcWidth?: number;
    class?: string;
  } = $props();

  const resolved = $derived(resolveImageOptions(preset, { srcWidth, quality, sizes }));
  const optimizedSrc = $derived(buildImageSrc(src, resolved.defaultWidth, resolved.quality));
  const srcset = $derived(buildImageSrcset(src, resolved.widths, resolved.quality));
  const resolvedSizes = $derived(resolved.sizes);
</script>

<img
  src={optimizedSrc}
  srcset={srcset || undefined}
  sizes={resolvedSizes}
  {alt}
  {width}
  {height}
  loading={priority ? 'eager' : 'lazy'}
  fetchpriority={priority ? 'high' : 'auto'}
  decoding="async"
  class={cn(className)}
/>
