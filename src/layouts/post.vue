<template layout="base">
  <div class="flex">
    <div class="grow m-4 standard-card">
      <article
        itemprop="mainEntity"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <post-microdata :post="page" />
        <post-head
          client:load
          class="my-12"
          :href="page.meta.href"
          :filename="page.meta.filename"
          :frontmatter="page.frontmatter"
        />
        <section
          class="article-style"
          itemprop="articleBody"
        >
          <slot />
        </section>
        <div class="article-style my-9">
          <hr>
        </div>
        <footer>
          <copyright-notice />
        </footer>
      </article>
      <giscus-comments />
      <prev-next-post
        :meta="page.meta"
        :frontmatter="page.frontmatter"
      />
    </div>
    <table-of-contents
      client:load
      :headings="page.meta.headings"
    />
  </div>
</template>

<script setup lang="ts">
const page = usePage();
page.frontmatter.description ||= page.meta.excerpt;

useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `${page.meta.href}/commits.xml`,
      title: `RSS Feed - 本文的 commits - ${page.site.title}`,
    }, {
      rel: 'alternate',
      type: 'application/atom+xml',
      href: `${page.meta.href}/commits.atom`,
      title: `Atom Feed - 本文的 commits - ${page.site.title}`,
    }, {
      rel: 'alternate',
      type: 'application/json',
      href: `${page.meta.href}/commits.json`,
      title: `JSON Feed - 本文的 commits - ${page.site.title}`,
    },
  ],
  meta: [
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: page.frontmatter.date.toISOString() },
    { property: 'article:modified_time', content: page.frontmatter.lastUpdated.toISOString() },
    { property: 'article:author', content: page.site.author },
  ],
});

if (Array.isArray(page.frontmatter.tags)) {
  useHead({
    meta: page.frontmatter.tags.map((tag) => ({
      property: 'article:tag',
      content: tag,
    })),
  });
}
</script>
