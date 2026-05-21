import type { SiteLocale } from '$lib/i18n/site-locale';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

const spanishPosts: BlogPost[] = [
  {
    slug: 'comprar-vivienda-lujo-madrid',
    title: 'Qué mirar antes de comprar una vivienda de lujo en Madrid',
    excerpt:
      'Ubicación, edificio, luz, privacidad y recorrido de valor: cinco puntos que conviene revisar antes de enamorarse de una propiedad.',
    category: 'Guía de compra',
    date: '18 mayo 2026',
    readTime: '6 min',
    image: '/imagenes/portfolio/1539650116574-8efeb43e2750.webp',
    body: [
      {
        heading: 'La ubicación no es solo el barrio',
        paragraphs: [
          'En el mercado prime de Madrid, dos calles dentro del mismo barrio pueden comportarse de forma muy distinta. La orientación, el ruido, la altura, el edificio y la privacidad pesan tanto como el código postal.',
          'Antes de valorar una propiedad conviene estudiar qué tipo de demanda tiene esa microzona, qué producto escasea y qué operaciones comparables se han cerrado realmente.'
        ]
      },
      {
        heading: 'El edificio importa tanto como la vivienda',
        paragraphs: [
          'Una vivienda excelente dentro de un edificio débil puede limitar la revalorización futura. Portal, zonas comunes, garaje, estructura, comunidad y mantenimiento son parte de la compra.',
          'En propiedades de alto nivel también revisamos si la finca permite obras, si existen derramas previstas y si la distribución tiene margen para adaptarse al uso del comprador.'
        ]
      },
      {
        heading: 'Comprar con calma suele comprar mejor',
        paragraphs: [
          'Las buenas oportunidades no siempre son las más visibles. Un proceso privado, con criterios claros y filtros bien definidos, reduce visitas inútiles y evita decisiones emocionales mal calibradas.',
          'La clave está en combinar deseo y análisis: que la vivienda encaje hoy, pero que también conserve sentido dentro de cinco o diez años.'
        ]
      }
    ]
  },
  {
    slug: 'marbella-valor-privacidad',
    title: 'Por qué la privacidad marca el valor en Marbella',
    excerpt:
      'En las villas más buscadas, las vistas importan, pero la privacidad real y la facilidad de uso diario son las que sostienen el precio.',
    category: 'Mercado prime',
    date: '12 mayo 2026',
    readTime: '5 min',
    image: '/imagenes/portfolio/1613977257363-707ba9348227.webp',
    body: [
      {
        heading: 'La privacidad se diseña',
        paragraphs: [
          'No basta con tener una parcela grande. La privacidad depende de la posición de la vivienda, los accesos, la vegetación, la relación con vecinos y la exposición visual desde calles o cotas superiores.',
          'En Marbella, las propiedades que mejor envejecen suelen combinar vistas, orientación, seguridad y una distribución exterior muy pensada.'
        ]
      },
      {
        heading: 'La comodidad diaria también cuenta',
        paragraphs: [
          'Una villa puede ser espectacular y, al mismo tiempo, incómoda. Recorridos largos, poca sombra, accesos complejos o espacios exteriores difíciles de mantener reducen el atractivo real.',
          'El comprador internacional valora cada vez más viviendas listas para entrar, eficientes y fáciles de disfrutar durante estancias cortas o largas.'
        ]
      },
      {
        heading: 'El valor está en lo que no se puede copiar',
        paragraphs: [
          'Materiales y reformas pueden mejorarse. Lo que no se puede fabricar fácilmente es una parcela bien situada, con buena orientación, privacidad y una relación equilibrada con el paisaje.',
          'Por eso la due diligence debe mirar más allá de la foto: hay que entender lo que la propiedad puede ser hoy y lo que seguirá siendo mañana.'
        ]
      }
    ]
  },
  {
    slug: 'preparar-propiedad-venta',
    title: 'Cómo preparar una propiedad de alto nivel para vender mejor',
    excerpt:
      'La primera impresión cuenta, pero el precio final depende de una preparación precisa: documentación, relato, imagen y estrategia comercial.',
    category: 'Venta privada',
    date: '6 mayo 2026',
    readTime: '7 min',
    image: '/imagenes/portfolio/1600607687920-4e2a09cf159d.webp',
    body: [
      {
        heading: 'Ordenar antes de enseñar',
        paragraphs: [
          'Antes de publicar o presentar una propiedad conviene revisar documentación, superficies, planos, cargas, comunidad, licencias y cualquier punto que pueda frenar una oferta seria.',
          'Una operación premium necesita seguridad. Cuanto más claro está el expediente, más fácil resulta defender precio y reducir incertidumbre.'
        ]
      },
      {
        heading: 'La imagen debe contar la verdad, pero mejor',
        paragraphs: [
          'Las fotografías no deberían prometer una vivienda distinta, sino explicar con precisión sus fortalezas: luz, escala, materiales, vistas, circulación y atmósfera.',
          'Un buen reportaje evita exageraciones y ayuda al comprador adecuado a entender por qué esa propiedad merece una visita.'
        ]
      },
      {
        heading: 'La discreción puede ser una ventaja',
        paragraphs: [
          'No todas las propiedades deben salir al mercado abierto desde el primer día. En algunos casos, una fase privada permite medir interés, ajustar discurso y proteger la posición del vendedor.',
          'La estrategia correcta depende del inmueble, del plazo, del precio objetivo y del perfil de comprador más probable.'
        ]
      }
    ]
  }
];

export function getBlogPosts(locale: SiteLocale): BlogPost[] {
  void locale;
  return spanishPosts;
}

export function getBlogPost(locale: SiteLocale, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}
