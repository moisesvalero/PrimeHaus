<script lang="ts">
  import { resolve } from '$app/paths';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale, t } from '$lib/i18n';
  import { reveal } from '$lib/reveal';
  import { getBlogPosts } from '$lib/data/blog-posts';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';
  import Heading from '$lib/components/ui/Heading.svelte';
  import Section from '$lib/components/ui/Section.svelte';
  import Text from '$lib/components/ui/Text.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

  const buildDate = new Date().toISOString();
  const posts = $derived(getBlogPosts($locale));

  $effect(() => {
    void $locale;

    setSeo({
      title: $t('blog.seo.title'),
      description: $t('blog.seo.description'),
      ogTitle: $t('blog.seo.title'),
      ogDescription: $t('blog.seo.description'),
      twitterCard: 'summary_large_image',
      schemaType: 'CollectionPage',
      headline: $t('blog.hero.title'),
      author: siteConfig.author.name,
      locale: $locale,
      dateModified: buildDate,
      keywords: [
        'primehaus blog',
        'real estate intelligence',
        'mercado inmobiliario lujo',
        'arquitectura residencial',
        'investment advisory'
      ],
      faq: [
        {
          question: $t('blog.faq.q1'),
          answer: $t('blog.faq.a1')
        },
        {
          question: $t('blog.faq.q2'),
          answer: $t('blog.faq.a2')
        }
      ]
    });
  });
</script>

<div class="pt-16 md:pt-28 lg:pt-36">
  <Section className="border-b border-outline-variant/30">
    <Container className="max-w-[1440px]">
      <div
        class="grid grid-cols-1 items-end gap-10 md:grid-cols-12"
        use:reveal={{ stage: 'title' }}
      >
        <div class="md:col-span-8">
          <Heading
            level={1}
            eyebrow={$t('blog.hero.eyebrow')}
            title={$t('blog.hero.title')}
            kicker={$t('blog.hero.subtitle')}
            className="[&_h1]:font-serif [&_h1]:font-semibold"
          />
        </div>
        <div class="md:col-span-4 md:text-right">
          <Text variant="label" className="mb-3 text-primary">{$t('blog.hero.statusLabel')}</Text>
          <Text variant="muted" className="text-sm leading-relaxed">
            {$t('blog.hero.statusText')}
          </Text>
        </div>
      </div>
    </Container>
  </Section>

  <Section variant="surface">
    <Container className="max-w-[1440px]">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {#each posts as post, index (post.slug)}
          <a
            href={resolve('/[lang]/blog/[slug]', { lang: $locale, slug: post.slug })}
            class="group block"
            use:reveal={{ stage: 'content', delay: 120 + index * 110, distance: 54 }}
          >
            <Card
              class="premium-card h-full border-outline-variant/40 bg-surface-container-lowest p-0"
            >
              <div
                class="aspect-[4/3] overflow-hidden border-b border-outline-variant/30 bg-surface-container"
              >
                <ResponsiveImage
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  class="premium-image h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div class="mb-3 flex items-center justify-between gap-4">
                  <Text variant="label" className="text-primary">{post.category}</Text>
                  <Text variant="small" className="text-on-surface-variant">{post.readTime}</Text>
                </div>
                <CardTitle
                  class="font-serif text-2xl leading-tight transition-colors group-hover:text-primary"
                >
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent class="flex flex-1 flex-col gap-6">
                <Text variant="muted" className="leading-relaxed">
                  {post.excerpt}
                </Text>
                <div
                  class="mt-auto flex items-center justify-between border-t border-outline-variant/20 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                >
                  <span>{post.date}</span>
                  <span class="transition-transform group-hover:translate-x-1">Leer artículo →</span
                  >
                </div>
              </CardContent>
            </Card>
          </a>
        {/each}
      </div>

      <div
        class="mt-16 flex flex-col items-start gap-6 border-t border-outline-variant/30 pt-10 md:flex-row md:items-center md:justify-between"
        use:reveal={{ stage: 'content', delay: 180 }}
      >
        <div>
          <Heading
            level={2}
            title={$t('blog.cta.title')}
            kicker={$t('blog.cta.subtitle')}
            className="[&_h2]:font-serif"
          />
        </div>
        <Button
          variant="default"
          size="lg"
          href={resolve('/[lang]/contacto', { lang: $locale })}
          class="px-10 py-6 text-xs font-bold uppercase tracking-[0.2em]"
        >
          {$t('blog.cta.button')}
        </Button>
      </div>
    </Container>
  </Section>
</div>
