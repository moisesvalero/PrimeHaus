<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    src,
    title,
    className = '',
    allowFullscreen = true,
    aspectRatio = '16/9',
    loading = 'lazy'
  }: {
    src: string;
    title: string;
    className?: string;
    allowFullscreen?: boolean;
    aspectRatio?: string;
    loading?: 'lazy' | 'eager';
  } = $props();
</script>

{#if src}
  <div
    class={cn('relative overflow-hidden border border-outline-variant/30 bg-black', className)}
    style={`aspect-ratio: ${aspectRatio}`}
  >
    <iframe
      {src}
      {title}
      class="absolute inset-0 w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen={allowFullscreen ? true : undefined}
      {loading}
    ></iframe>
  </div>
{/if}
