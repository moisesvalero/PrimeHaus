# PrimeHaus

Web inmobiliaria premium para propiedades exclusivas en Madrid, Marbella y Palma.

PrimeHaus presenta un catálogo de viviendas de alto nivel, páginas editoriales, contacto privado, integración SEO/AEO y una experiencia visual cuidada con diseño responsive, modo oscuro, animaciones reveal y microinteracciones.

## Proyecto

- SvelteKit 2 + Svelte 5
- TypeScript
- Tailwind CSS v4
- shadcn-svelte / bits-ui
- i18n ES, EN, FR y DE
- SEO, Open Graph, JSON-LD, sitemap, robots y twins Markdown AEO
- Formulario de contacto, teléfono y WhatsApp
- Blog con artículos editoriales de ejemplo
- Catálogo de propiedades con datos demo y soporte opcional para Sanity

## Secciones

- Inicio
- Proyectos
- Detalle de propiedad
- Sobre nosotros
- Contacto
- Blog
- Artículo de blog

## Desarrollo

Requisitos: Node.js 22 o superior.

```bash
npm install
npm run dev
```

Comandos útiles:

```bash
npm run check
npm run lint
npm run build
npm run preview
```

## Estructura principal

```txt
src/
  routes/                 Paginas y endpoints de SvelteKit
  lib/
    components/           Componentes de interfaz y componentes del proyecto
    data/                 Datos demo de propiedades y blog
    i18n/                 Traducciones
    aeo/                  Builders y registro de twins Markdown
    server/               Integraciones server-side
    seo.ts                Store y helpers SEO
    site-config.ts        Configuracion general del sitio
    site-pages.ts         Registro de paginas indexables
    reveal.ts             Animaciones de entrada
  app.css                 Estilos globales, tokens y Tailwind
  hooks.server.ts         Headers, seguridad y negociacion AEO
static/                   Assets publicos
```

## Deploy

El proyecto esta preparado para desplegarse en Vercel.
