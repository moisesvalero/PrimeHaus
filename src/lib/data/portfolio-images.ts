/**
 * Imágenes de stock del portfolio — archivos locales en /imagenes/portfolio/
 * (2560px WebP q92). Sustituyen Unsplash para máxima nitidez en hover y retina.
 */
const BASE = '/imagenes/portfolio';

function p(id: string): string {
  return `${BASE}/${id}.webp`;
}

export const portfolioImages = {
  heroVilla: p('1600596542815-ffad4c1539a9'),
  architectureInterior: p('1600607687939-ce8a6c25118c'),
  madridSkyline: p('1539650116574-8efeb43e2750'),
  villaContemporary: p('1613977257363-707ba9348227'),
  villaExterior: p('1600585154340-be6161a56a0c'),
  livingRoom: p('1600607687920-4e2a09cf159d'),
  poolVilla: p('1600566753190-17f0baa2a6c3'),
  /** Unsplash retiró este ID; misma escena alternativa en alta resolución */
  modernKitchen: p('1600607687920-4e2a09cf159d'),
  bedroomSuite: p('1600566752355-35792bedcfea'),
  fincaGarden: p('1600047509807-ba8f99d2cdde'),
  terraceView: p('1600607687939-ce8a6c25118c'),
  sunsetPatio: p('1600573472550-8090b5e0745e'),
  urbanPenthouse: p('1600607688969-a5bfcd646154'),
  marbleBath: p('1600566753086-00f18fb6b3ea'),
  wineCellar: p('1600210492486-724fe5c67fb0'),
  coastalDeck: p('1600607688960-e095ff83135c'),
  hillsideEstate: p('1600047509358-9dc75507daeb'),
  teamJulian: p('1507003211169-0a1dd7228f2d'),
  teamElena: p('1573496359142-b8d87734a5a2'),
  teamMarcus: p('1500648767791-00dcc994a43e'),
  teamSophia: p('1580489944761-15a19d654956')
} as const;

/** Por ID Unsplash (por si Sanity devuelve URL antigua) → ruta local */
export function localImageFromUnsplashUrl(url: string): string | undefined {
  const match = url.match(/photo-([\d]+-[a-f0-9]+)/i);
  if (!match) return undefined;
  return p(match[1]);
}

export function resolvePortfolioImage(urlOrPath: string): string {
  if (urlOrPath.startsWith('/imagenes/')) return urlOrPath;
  return localImageFromUnsplashUrl(urlOrPath) ?? urlOrPath;
}
