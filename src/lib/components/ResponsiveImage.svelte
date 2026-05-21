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

  /** Portfolio local: archivo WebP 2560px tal cual — sin /_vercel/image ni srcset 640w */
  const isPortfolioMaster = $derived(src.startsWith('/imagenes/'));
  const useVercel = $derived(
    useVercelImageOptimizer() && !isPortfolioMaster && isOptimizableImageUrl(src)
  );
  const resolved = $derived(resolveImageOptions(preset, { srcWidth, quality, sizes }));

  const optimizedSrc = $derived(
    isPortfolioMaster
      ? src
      : useVercel
        ? vercelImageUrl(src, { width: resolved.defaultWidth, quality: resolved.quality })
        : buildImageSrc(src, resolved.defaultWidth, resolved.quality)
  );

  const srcset = $derived(
    isPortfolioMaster
      ? undefined
      : useVercel
        ? vercelImageSrcset(src, resolved.widths, resolved.quality)
        : buildImageSrcset(src, resolved.widths, resolved.quality) || undefined
  );

  const resolvedSizes = $derived(isPortfolioMaster ? undefined : resolved.sizes);
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
