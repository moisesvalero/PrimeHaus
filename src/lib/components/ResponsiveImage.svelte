<script lang="ts">
  import { cn } from '$lib/utils';
  import {
    buildImageSrc,
    buildImageSrcset,
    isOptimizableImageUrl,
    resolveImageOptions,
    type ImagePreset
  } from '$lib/utils/responsive-image';
  import {
    useVercelImageOptimizer,
    vercelImageSrcset,
    vercelImageUrl
  } from '$lib/utils/vercel-image';

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
    /** Solo listado /proyectos: master 2560px directo, sin srcset 640w de Vercel */
    fullResolution = false,
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
    fullResolution?: boolean;
    class?: string;
  } = $props();

  const isLocal = $derived(src.startsWith('/imagenes/'));
  const useVercel = $derived(
    !fullResolution && useVercelImageOptimizer() && (isLocal || isOptimizableImageUrl(src))
  );
  const resolved = $derived(resolveImageOptions(preset, { srcWidth, quality, sizes }));

  const optimizedSrc = $derived(
    fullResolution && isLocal
      ? src
      : useVercel
        ? vercelImageUrl(src, { width: resolved.defaultWidth, quality: resolved.quality })
        : isLocal
          ? src
          : buildImageSrc(src, resolved.defaultWidth, resolved.quality)
  );

  const srcset = $derived(
    fullResolution && isLocal
      ? undefined
      : useVercel
        ? vercelImageSrcset(src, resolved.widths, resolved.quality)
        : isLocal
          ? undefined
          : buildImageSrcset(src, resolved.widths, resolved.quality) || undefined
  );

  const resolvedSizes = $derived(fullResolution && isLocal ? undefined : resolved.sizes);
</script>

<img
  src={optimizedSrc}
  {srcset}
  sizes={resolvedSizes}
  {alt}
  {width}
  {height}
  loading={priority ? 'eager' : 'lazy'}
  fetchpriority={priority ? 'high' : 'auto'}
  decoding="async"
  class={cn(className)}
/>
