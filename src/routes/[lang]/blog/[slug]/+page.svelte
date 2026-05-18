<script lang="ts">
  import { resolve } from '$app/paths';
  import { siteConfig } from '$lib/site-config';
  import { setSeo } from '$lib/seo';
  import { locale } from '$lib/i18n';
  import { reveal } from '$lib/reveal';
  import Button from '$lib/components/ui/button/button.svelte';
  import Container from '$lib/components/ui/Container.svelte';
  import Section from '$lib/components/ui/Section.svelte';
  import Text from '$lib/components/ui/Text.svelte';

  let { data } = $props();
  const post = $derived(data.post);
  const buildDate = new Date().toISOString();

  $effect(() => {
    void $locale;

    setSeo({
      title: post.title + ' | ' + siteConfig.name,
      description: post.excerpt,
      ogTitle: post.title,
      ogDescription: post.excerpt,
      ogImage: post.image,
      twitterCard: 'summary_large_image',
      schemaType: 'Article',
      headline: post.title,
      author: siteConfig.author.name,
      locale: $locale,
      datePublished: buildDate,
      dateModified: buildDate,
      keywords: ['primehaus', post.category, 'vivienda de lujo', 'mercado inmobiliario']
    });
  });
</script>

<article class="pt-16 md:pt-28 lg:pt-36">
  <Section className="border-b border-outline-variant/30">
    <Container className="max-w-[1120px]">
      <div
        class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end"
        use:reveal={{ stage: 'title' }}
      >
        <div class="lg:col-span-8">
          <Text variant="label" className="mb-5 text-primary">{post.category}</Text>
          <h1 class="font-serif text-4xl font-semibold leading-tight text-on-surface sm:text-6xl">
            {post.title}
          </h1>
          <p class="mt-8 max-w-2xl text-lg font-light leading-relaxed text-on-surface-variant">
            {post.excerpt}
          </p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
          <Text variant="label" className="text-on-surface">{post.date}</Text>
          <Text variant="small" className="mt-2 text-on-surface-variant"
            >{post.readTime} de lectura</Text
          >
        </div>
      </div>
    </Container>
  </Section>

  <Section variant="surface" className="pt-10">
    <Container className="max-w-[1120px]">
      <div
        class="premium-card aspect-[16/9] overflow-hidden border border-outline-variant/30 bg-surface-container"
        use:reveal={{ stage: 'content', delay: 120, distance: 44 }}
      >
        <img src={post.image} alt={post.title} class="premium-image h-full w-full object-cover" />
      </div>

      <div class="mx-auto mt-16 max-w-[760px] space-y-14">
        {#each post.body as section, index (section.heading)}
          <section use:reveal={{ stage: 'content', delay: 120 + index * 90, distance: 36 }}>
            <h2 class="font-serif text-3xl font-semibold leading-tight text-on-surface">
              {section.heading}
            </h2>
            <div class="mt-6 space-y-5 text-lg font-light leading-relaxed text-on-surface-variant">
              {#each section.paragraphs as paragraph (paragraph)}
                <p>{paragraph}</p>
              {/each}
            </div>
          </section>
        {/each}
      </div>

      <div
        class="mx-auto mt-16 flex max-w-[760px] flex-col gap-4 border-t border-outline-variant/30 pt-10 sm:flex-row"
        use:reveal={{ stage: 'content', delay: 180 }}
      >
        <Button
          variant="default"
          size="lg"
          href={resolve('/[lang]/contacto', { lang: $locale })}
          class="w-full px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] sm:w-auto"
        >
          Solicitar asesoramiento
        </Button>
        <Button
          variant="outline"
          size="lg"
          href={resolve('/[lang]/blog', { lang: $locale })}
          class="w-full px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] sm:w-auto"
        >
          Volver al blog
        </Button>
      </div>
    </Container>
  </Section>
</article>
