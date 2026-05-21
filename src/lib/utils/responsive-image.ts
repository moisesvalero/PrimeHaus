const UNSPLASH_HOST = 'images.unsplash.com';

export type ImagePreset = 'hero' | 'card' | 'gallery' | 'banner';

export const IMAGE_PRESETS = {
  hero: {
    widths: [400, 640, 750, 1080, 1280] as const,
    defaultWidth: 750,
    quality: 70,
    sizes: '100vw'
  },
  card: {
    widths: [320, 400, 480, 640] as const,
    defaultWidth: 480,
    quality: 62,
    sizes: '(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 88vw'
  },
  gallery: {
    widths: [320, 400, 480, 640, 800] as const,
    defaultWidth: 480,
    quality: 62,
    sizes: '(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 88vw'
  },
  banner: {
    widths: [400, 640, 800, 1080, 1280] as const,
    defaultWidth: 800,
    quality: 68,
    sizes: '100vw'
  }
} as const;

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
  widths: readonly number[],
  quality = 75
): string {
  if (!isOptimizableImageUrl(src)) return '';

  return widths.map((w) => `${buildImageSrc(src, w, quality)} ${w}w`).join(', ');
}

export function resolveImageOptions(
  preset: ImagePreset | undefined,
  overrides: { width?: number; quality?: number; sizes?: string } = {}
) {
  const base = preset ? IMAGE_PRESETS[preset] : null;
  return {
    widths: base?.widths ?? ([400, 640, 800, 1080, 1280] as const),
    defaultWidth: overrides.width ?? base?.defaultWidth ?? 800,
    quality: overrides.quality ?? base?.quality ?? 75,
    sizes: overrides.sizes ?? base?.sizes ?? '100vw'
  };
}
