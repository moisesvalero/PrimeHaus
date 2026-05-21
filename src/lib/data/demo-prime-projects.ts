import type { SiteLocale } from '$lib/i18n/site-locale';
import { portfolioImages } from '$lib/data/portfolio-images';
import type { MappedPrimeProject } from '$lib/server/sanity/types';

type ProjectCopy = {
  tag: string;
  title: string;
  location: string;
  description: string;
};

type LocaleCopy = {
  built: string;
  bedrooms: string;
  baths: string;
  plot: string;
  terrace: string;
  projects: ProjectCopy[];
};

const copy = {
  es: {
    built: 'Construidos',
    bedrooms: 'Dormitorios',
    baths: 'Baños',
    plot: 'Parcela',
    terrace: 'Terrazas',
    projects: [
      {
        tag: 'Villa contemporánea',
        title: 'Villa Aurora del Mar',
        location: 'Sierra Blanca, Marbella',
        description:
          'Villa de líneas limpias con vistas abiertas al Mediterráneo, jardín consolidado, zona de bienestar y espacios pensados para vivir todo el año.'
      },
      {
        tag: 'Ático con vistas',
        title: 'Ático Castellana',
        location: 'Paseo de la Castellana, Madrid',
        description:
          'Ático dúplex con terrazas envolventes, interiorismo sereno y una posición privilegiada sobre el eje financiero de Madrid.'
      },
      {
        tag: 'Finca mediterránea',
        title: 'Finca Son Brisa',
        location: 'Son Vida, Palma',
        description:
          'Finca rehabilitada con materiales nobles, mucha privacidad y jardines maduros orientados al atardecer.'
      },
      {
        tag: 'Residencia urbana',
        title: 'Casa Almagro',
        location: 'Almagro, Madrid',
        description:
          'Vivienda representativa en una de las zonas más elegantes de Madrid, con techos altos, luz natural y distribución flexible.'
      },
      {
        tag: 'Villa junto al golf',
        title: 'Villa Los Naranjos',
        location: 'Nueva Andalucía, Marbella',
        description:
          'Villa familiar junto al golf con piscina, porches amplios y una planta cómoda para combinar privacidad y vida social.'
      },
      {
        tag: 'Casa histórica',
        title: 'Palacete Santa Catalina',
        location: 'Santa Catalina, Palma',
        description:
          'Casa mallorquina restaurada con patio interior, piezas originales y una ubicación perfecta para disfrutar la ciudad a pie.'
      }
    ]
  },
  en: {
    built: 'Built',
    bedrooms: 'Bedrooms',
    baths: 'Baths',
    plot: 'Plot',
    terrace: 'Terraces',
    projects: [
      {
        tag: 'Contemporary villa',
        title: 'Villa Aurora del Mar',
        location: 'Sierra Blanca, Marbella',
        description:
          'Clean-lined villa with open Mediterranean views, mature landscaping, wellness area and spaces designed for year-round living.'
      },
      {
        tag: 'Penthouse with views',
        title: 'Castellana Penthouse',
        location: 'Paseo de la Castellana, Madrid',
        description:
          'Duplex penthouse with wraparound terraces, calm interiors and a privileged position over Madrid financial district.'
      },
      {
        tag: 'Mediterranean estate',
        title: 'Finca Son Brisa',
        location: 'Son Vida, Palma',
        description:
          'Restored estate with noble materials, strong privacy and mature gardens facing the evening light.'
      },
      {
        tag: 'Urban residence',
        title: 'Casa Almagro',
        location: 'Almagro, Madrid',
        description:
          'Representative home in one of Madrid most elegant districts, with high ceilings, natural light and flexible layout.'
      },
      {
        tag: 'Golf villa',
        title: 'Villa Los Naranjos',
        location: 'Nueva Andalucía, Marbella',
        description:
          'Family villa by the golf course with pool, wide porches and an easy layout for both privacy and entertaining.'
      },
      {
        tag: 'Historic townhouse',
        title: 'Palacete Santa Catalina',
        location: 'Santa Catalina, Palma',
        description:
          'Restored Mallorcan townhouse with inner patio, original details and a location made for enjoying the city on foot.'
      }
    ]
  },
  fr: {
    built: 'Surface',
    bedrooms: 'Chambres',
    baths: 'Bains',
    plot: 'Terrain',
    terrace: 'Terrasses',
    projects: [
      {
        tag: 'Villa contemporaine',
        title: 'Villa Aurora del Mar',
        location: 'Sierra Blanca, Marbella',
        description:
          'Villa contemporaine avec vues ouvertes sur la Méditerranée, jardin mature, espace bien-être et pièces conçues pour vivre toute l’année.'
      },
      {
        tag: 'Penthouse avec vues',
        title: 'Penthouse Castellana',
        location: 'Paseo de la Castellana, Madrid',
        description:
          'Penthouse duplex avec terrasses panoramiques, intérieur calme et position privilégiée sur le quartier financier de Madrid.'
      },
      {
        tag: 'Finca méditerranéenne',
        title: 'Finca Son Brisa',
        location: 'Son Vida, Palma',
        description:
          'Finca restaurée avec matériaux nobles, forte intimité et jardins matures orientés vers la lumière du soir.'
      },
      {
        tag: 'Résidence urbaine',
        title: 'Casa Almagro',
        location: 'Almagro, Madrid',
        description:
          'Appartement de caractère dans l’un des quartiers les plus élégants de Madrid, avec hauts plafonds et lumière naturelle.'
      },
      {
        tag: 'Villa de golf',
        title: 'Villa Los Naranjos',
        location: 'Nueva Andalucía, Marbella',
        description:
          'Villa familiale près du golf avec piscine, grands porches et distribution confortable pour recevoir.'
      },
      {
        tag: 'Maison historique',
        title: 'Palacete Santa Catalina',
        location: 'Santa Catalina, Palma',
        description:
          'Maison majorquine restaurée avec patio intérieur, éléments d’origine et emplacement idéal pour vivre Palma à pied.'
      }
    ]
  },
  de: {
    built: 'Wohnfläche',
    bedrooms: 'Schlafzimmer',
    baths: 'Bäder',
    plot: 'Grundstück',
    terrace: 'Terrassen',
    projects: [
      {
        tag: 'Zeitgenössische Villa',
        title: 'Villa Aurora del Mar',
        location: 'Sierra Blanca, Marbella',
        description:
          'Klare Architektur mit offenem Mittelmeerblick, eingewachsenem Garten, Wellnessbereich und Räumen für ganzjähriges Wohnen.'
      },
      {
        tag: 'Penthouse mit Ausblick',
        title: 'Penthouse Castellana',
        location: 'Paseo de la Castellana, Madrid',
        description:
          'Duplex-Penthouse mit umlaufenden Terrassen, ruhigem Interieur und privilegierter Lage über Madrids Finanzachse.'
      },
      {
        tag: 'Mediterrane Finca',
        title: 'Finca Son Brisa',
        location: 'Son Vida, Palma',
        description:
          'Restaurierte Finca mit edlen Materialien, hoher Privatsphäre und gewachsenen Gärten in Abendsonne.'
      },
      {
        tag: 'Stadtresidenz',
        title: 'Casa Almagro',
        location: 'Almagro, Madrid',
        description:
          'Repräsentative Wohnung in einem der elegantesten Viertel Madrids, mit hohen Decken, Licht und flexiblem Grundriss.'
      },
      {
        tag: 'Golfvilla',
        title: 'Villa Los Naranjos',
        location: 'Nueva Andalucía, Marbella',
        description:
          'Familienvilla am Golfplatz mit Pool, großzügigen Veranden und komfortabler Aufteilung für private und soziale Nutzung.'
      },
      {
        tag: 'Historisches Stadthaus',
        title: 'Palacete Santa Catalina',
        location: 'Santa Catalina, Palma',
        description:
          'Restauriertes mallorquinisches Stadthaus mit Patio, Originaldetails und idealer Lage für Palma zu Fuß.'
      }
    ]
  }
} satisfies Record<SiteLocale, LocaleCopy>;

const specs = [
  ['1.240 m²', '7', '9', '3.900 m²'],
  ['610 m²', '5', '6', '210 m²'],
  ['980 m²', '8', '10', '12 ha'],
  ['420 m²', '4', '5', '80 m²'],
  ['760 m²', '6', '7', '2.100 m²'],
  ['540 m²', '5', '5', '320 m²']
] as const;

const prices = [
  '12.800.000 €',
  '8.450.000 €',
  '15.200.000 €',
  '6.900.000 €',
  '9.750.000 €',
  '7.300.000 €'
];

const slugs = [
  'villa-aurora-del-mar',
  'atico-castellana',
  'finca-son-brisa',
  'casa-almagro',
  'villa-los-naranjos',
  'palacete-santa-catalina'
];

const images = [
  [portfolioImages.villaContemporary, portfolioImages.villaExterior, portfolioImages.livingRoom],
  [portfolioImages.poolVilla, portfolioImages.modernKitchen, portfolioImages.bedroomSuite],
  [portfolioImages.fincaGarden, portfolioImages.terraceView, portfolioImages.sunsetPatio],
  [portfolioImages.urbanPenthouse, portfolioImages.marbleBath, portfolioImages.wineCellar],
  [portfolioImages.coastalDeck, portfolioImages.bedroomSuite, portfolioImages.livingRoom],
  [portfolioImages.hillsideEstate, portfolioImages.terraceView, portfolioImages.villaExterior]
];

export function getDemoPrimeProjects(locale: SiteLocale): MappedPrimeProject[] {
  const t = copy[locale] ?? copy.es;

  return t.projects.map((project, index) => ({
    id: `demo-${slugs[index]}`,
    title: project.title,
    slug: slugs[index],
    price: prices[index],
    location: project.location,
    heroTag: project.tag,
    heroDescription: project.description,
    specs: [
      { label: t.built, value: specs[index][0] },
      { label: t.bedrooms, value: specs[index][1] },
      { label: t.baths, value: specs[index][2] },
      { label: index === 1 || index === 3 ? t.terrace : t.plot, value: specs[index][3] }
    ],
    images: {
      principal: images[index][0],
      secondary1: images[index][1],
      secondary2: images[index][2]
    },
    videoUrl: '',
    body: project.description,
    seoDescription: project.description
  }));
}
