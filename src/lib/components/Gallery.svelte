<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { cn } from '$lib/utils';

  type GalleryImage = {
    src: string;
    alt: string;
  };

  let {
    images,
    className = ''
  }: {
    images: GalleryImage[];
    className?: string;
  } = $props();
</script>

{#if images.length > 0}
  <ul
    class={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6', className)}
    role="list"
    aria-label="Galería de imágenes"
  >
    {#each images as image, i (i)}
      <li class="overflow-hidden border border-outline-variant/30 bg-surface-container group">
        <figure class="relative m-0 aspect-[4/5]">
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            width={640}
            height={800}
            sizes="(min-width: 768px) 33vw, 100vw"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <figcaption class="sr-only">{image.alt}</figcaption>
        </figure>
      </li>
    {/each}
  </ul>
{/if}
