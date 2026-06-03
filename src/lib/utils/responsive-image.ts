const UNSPLASH_HOST = 'images.unsplash.com';

export type ImagePreset = 'hero' | 'card' | 'featured' | 'gallery' | 'banner' | 'proyectos';

export const IMAGE_PRESETS = {
  hero: {
    widths: [640, 828, 1080, 1280, 1600, 1920] as const,
    defaultWidth: 1080,
    quality: 85,
    sizes: '(max-width: 768px) 100vw, 1600px'
  },
  /** Tarjetas pequeñas (blog) */
  card: {
    widths: [640, 828, 1000, 1200] as const,
    defaultWidth: 1000,
    quality: 88,
    sizes: '(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 90vw'
  },
  /** Home destacados 3 col: sin 640w, ~1200w retina + AVIF q88 */
  featured: {
    widths: [960, 1080, 1200, 1400, 1600] as const,
    defaultWidth: 1200,
    quality: 88,
    sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw'
  },
  /** Grid /proyectos: sin 640w — el navegador no puede pedir miniaturas */
  proyectos: {
    widths: [960, 1080, 1200, 1400, 1600, 1920] as const,
    defaultWidth: 1400,
    quality: 90,
    sizes: '(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 96vw'
  },
  /** Bloques grandes (about home, story sobre-nosotros): sin 640w */
  gallery: {
    widths: [1080, 1200, 1400, 1600, 1920] as const,
    defaultWidth: 1400,
    quality: 88,
    sizes: '(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 92vw'
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

export function buildImageSrcset(src: string, widths: readonly number[], quality = 75): string {
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
