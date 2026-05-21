<script lang="ts">
  import { cn } from '$lib/utils';
  import { buildImageSrc, buildImageSrcset } from '$lib/utils/responsive-image';

  let {
    src,
    alt,
    width,
    height,
    sizes = '100vw',
    priority = false,
    quality = 75,
    class: className = ''
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: string;
    /** LCP / above-the-fold: eager + fetchpriority high */
    priority?: boolean;
    quality?: number;
    class?: string;
  } = $props();

  const optimizedSrc = $derived(buildImageSrc(src, width ?? (priority ? 1080 : 800), quality));
  const srcset = $derived(buildImageSrcset(src, undefined, quality));
</script>

<img
  src={optimizedSrc}
  srcset={srcset || undefined}
  {sizes}
  {alt}
  {width}
  {height}
  loading={priority ? 'eager' : 'lazy'}
  fetchpriority={priority ? 'high' : 'auto'}
  decoding="async"
  class={cn(className)}
/>
