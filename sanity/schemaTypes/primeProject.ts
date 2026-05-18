import { defineField, defineType } from 'sanity';

export const primeProject = defineType({
  name: 'primeProject',
  title: 'Proyecto Inmobiliario (PrimeHaus)',
  type: 'document',
  initialValue: {
    showOnHome: true,
    homeSortOrder: 50
  },
  groups: [
    { name: 'panel', title: 'Guia rapida', default: true },
    { name: 'general', title: 'General & Ubicacion' },
    { name: 'contenido', title: 'Contenido & Especificaciones' },
    { name: 'imagenes', title: 'Multimedia' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'showOnHome',
      type: 'boolean',
      title: 'Mostrar en portada',
      initialValue: true,
      group: 'panel'
    }),
    defineField({
      name: 'homeSortOrder',
      type: 'number',
      title: 'Orden en portada (menor = primero)',
      initialValue: 50,
      group: 'panel'
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Nombre de la propiedad / proyecto',
      group: 'general',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL interna (slug)',
      group: 'general',
      options: { source: 'title.es', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'price',
      type: 'string',
      title: 'Precio (ej. 3.500.000 € o Consultar)',
      group: 'general'
    }),
    defineField({
      name: 'location',
      type: 'localeString',
      title: 'Zona / Ubicacion (ej. Milla de Oro, Marbella)',
      group: 'general'
    }),
    defineField({
      name: 'heroTag',
      type: 'localeString',
      title: 'Etiqueta superior (ej. Nueva Construccion)',
      group: 'contenido'
    }),
    defineField({
      name: 'heroDescription',
      type: 'localeText',
      title: 'Descripcion corta principal (tarjetas)',
      group: 'contenido'
    }),
    defineField({
      name: 'specs',
      type: 'array',
      title: 'Especificaciones (Habitaciones, m2, Baños...)',
      group: 'contenido',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'localeString', title: 'Etiqueta (ej. Habitaciones)' },
            { name: 'value', type: 'string', title: 'Valor (ej. 5)' }
          ],
          preview: {
            select: { label: 'label.es', value: 'value' },
            prepare({ label, value }) {
              return { title: `${label || 'Sin etiqueta'}: ${value || '-'}` };
            }
          }
        }
      ]
    }),
    defineField({
      name: 'images',
      type: 'object',
      title: 'Imagenes del proyecto (URLs)',
      group: 'imagenes',
      fields: [
        { name: 'principal', type: 'url', title: 'Imagen principal (URL)' },
        { name: 'secondary1', type: 'url', title: 'Imagen secundaria 1 (URL)' },
        { name: 'secondary2', type: 'url', title: 'Imagen secundaria 2 (URL)' }
      ]
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'URL de Video (YouTube / Vimeo / MP4 para iframe)',
      group: 'imagenes'
    }),
    defineField({
      name: 'body',
      type: 'localeText',
      title: 'Descripcion detallada (cuerpo de la ficha)',
      group: 'contenido'
    }),
    defineField({
      name: 'seoDescription',
      type: 'localeText',
      title: 'Meta description (SEO)',
      group: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'location.es',
      media: 'images.principal'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin titulo',
        subtitle: subtitle || 'Sin ubicacion',
        imageUrl: media
      };
    }
  }
});
