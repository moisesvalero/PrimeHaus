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
    width?: number;
    height?: number;
    sizes?: string;
    preset?: ImagePreset;
    priority?: boolean;
    quality?: number;
    srcWidth?: number;
    class?: string;
  } = $props();

  const isLocal = $derived(src.startsWith('/imagenes/'));
  const resolved = $derived(resolveImageOptions(preset, { srcWidth, quality, sizes }));
  const optimizedSrc = $derived(
    isLocal ? src : buildImageSrc(src, resolved.defaultWidth, resolved.quality)
  );
  const srcset = $derived(
    isLocal ? undefined : buildImageSrcset(src, resolved.widths, resolved.quality) || undefined
  );
  const resolvedSizes = $derived(isLocal ? undefined : resolved.sizes);
</script>

<img
  src={optimizedSrc}
  srcset={srcset}
  sizes={resolvedSizes}
  {alt}
  {width}
  {height}
  loading={priority ? 'eager' : 'lazy'}
  fetchpriority={priority ? 'high' : 'auto'}
  decoding="async"
  class={cn(className)}
/>
