<template layout="base">
  <div class="flex">
    <div class="grow m-3 standard-card">
      <article
        itemprop="mainEntity"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <microdata-author />
        <post-head
          client:load
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
        <div class="article-style">
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
  meta: [
    { name: 'og:type', content: 'article' },
    { name: 'article:published_time', content: page.frontmatter.date.toISOString() },
    { name: 'article:modified_time', content: page.frontmatter.lastUpdated.toISOString() },
    { name: 'article:author', content: page.site.author },
  ],
});

if (Array.isArray(page.frontmatter.tags)) {
  useHead({
    meta: page.frontmatter.tags.map((tag) => ({
      name: 'article:tag',
      content: tag,
    })),
  });
}
</script>
