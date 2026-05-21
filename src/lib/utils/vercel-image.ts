import { building, dev } from '$app/environment';

/**
 * /_vercel/image solo para URLs remotas (Sanity/Unsplash).
 * /imagenes/portfolio/* NUNCA pasa por aquí — se sirve el master 2560px directo.
 */
export function useVercelImageOptimizer(): boolean {
  return !dev && !building;
}

export function vercelImageUrl(
  src: string,
  options: { width: number; quality: number }
): string {
  const params = new URLSearchParams({
    url: src,
    w: String(options.width),
    q: String(options.quality)
  });
  return `/_vercel/image?${params.toString()}`;
}

export function vercelImageSrcset(
  src: string,
  widths: readonly number[],
  quality: number
): string {
  return widths
    .map((w) => `${vercelImageUrl(src, { width: w, quality })} ${w}w`)
    .join(', ');
}
