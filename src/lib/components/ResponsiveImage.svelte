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
    class?: string;
  } = $props();

  const resolved = $derived(resolveImageOptions(preset, { width, quality, sizes }));
  const optimizedSrc = $derived(
    buildImageSrc(src, priority && preset === 'hero' ? 750 : resolved.defaultWidth, resolved.quality)
  );
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
