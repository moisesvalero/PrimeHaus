const UNSPLASH_HOST = 'images.unsplash.com';

export const IMAGE_WIDTHS = [400, 640, 800, 1080, 1280, 1600] as const;

export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

function parseUrl(src: string): URL | null {
  try {
    return new URL(src);
  } catch {
    return null;
  }
}

export function isOptimizableImageUrl(src: string): boolean {
  const url = parseUrl(src);
  if (!url) return false;
  return url.hostname === UNSPLASH_HOST || url.hostname.endsWith('cdn.sanity.io');
}

function applyUnsplashParams(url: URL, width: number, quality: number): string {
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality));
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  return url.toString();
}

function applySanityParams(url: URL, width: number, quality: number): string {
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality));
  url.searchParams.set('auto', 'format');
  return url.toString();
}

/** URL principal optimizada (WebP/AVIF vía auto=format en Unsplash/Sanity). */
export function buildImageSrc(src: string, width = 800, quality = 75): string {
  if (!src?.trim()) return src;

  const url = parseUrl(src);
  if (!url) return src;

  if (url.hostname === UNSPLASH_HOST) {
    return applyUnsplashParams(url, width, quality);
  }
  if (url.hostname.endsWith('cdn.sanity.io')) {
    return applySanityParams(url, width, quality);
  }

  return src;
}

export function buildImageSrcset(
  src: string,
  widths: readonly number[] = IMAGE_WIDTHS,
  quality = 75
): string {
  if (!isOptimizableImageUrl(src)) return '';

  return widths.map((w) => `${buildImageSrc(src, w, quality)} ${w}w`).join(', ');
}
