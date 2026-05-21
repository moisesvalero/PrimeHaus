const UNSPLASH_HOST = 'images.unsplash.com';

export type ImagePreset = 'hero' | 'card' | 'gallery' | 'banner' | 'proyectos';

export const IMAGE_PRESETS = {
  hero: {
    widths: [640, 750, 1080, 1280, 1600, 1920] as const,
    defaultWidth: 1600,
    quality: 90,
    sizes: '100vw'
  },
  /** Tarjetas pequeñas (home/blog) — Vercel con srcset */
  card: {
    widths: [640, 828, 1000, 1200, 1600, 1920] as const,
    defaultWidth: 1200,
    quality: 90,
    sizes: '(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 92vw'
  },
  /** Grid /proyectos: sin 640w — el navegador no puede pedir miniaturas */
  proyectos: {
    widths: [1200, 1400, 1600, 1920, 2560] as const,
    defaultWidth: 1920,
    quality: 92,
    sizes: '(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 96vw'
  },
  gallery: {
    widths: [640, 828, 1000, 1200, 1600, 1920] as const,
    defaultWidth: 1200,
    quality: 88,
    sizes: '(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 90vw'
  },
  banner: {
    widths: [640, 1080, 1280, 1600, 1920] as const,
    defaultWidth: 1600,
    quality: 88,
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
  overrides: { srcWidth?: number; quality?: number; sizes?: string } = {}
) {
  const base = preset ? IMAGE_PRESETS[preset] : null;
  return {
    widths: base?.widths ?? ([640, 800, 1080, 1280, 1600] as const),
    defaultWidth: overrides.srcWidth ?? base?.defaultWidth ?? 1200,
    quality: overrides.quality ?? base?.quality ?? 80,
    sizes: overrides.sizes ?? base?.sizes ?? '100vw'
  };
}
