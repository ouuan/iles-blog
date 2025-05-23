<template layout="base">
  <div class="flex justify-center">
    <div :class="['grow m-4 standard-card', { 'max-w-200': needToc }]">
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
          :lang="page.frontmatter.lang"
        >
          <slot />
          <Card
            v-if="page.frontmatter.tags.includes('WIP')"
            type="wip"
            :heading-level="2"
          >
            <p>未完待续…… 🕊️</p>
          </Card>
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
      v-if="needToc"
      client:load
      :headings="page.meta.headings"
    />
  </div>
</template>

<script setup lang="ts">
import { isString } from '@sniptt/guards';
import { computed } from 'vue';

const page = usePage();
page.frontmatter.description ||= page.meta.excerpt?.trim();

if (page.frontmatter.description.length < 32) {
  throw new Error(`${page.meta.href}: Description too short.`);
} else if (page.frontmatter.description.length > 150) {
  throw new Error(`${page.meta.href}: Description too long.`);
}

const needToc = computed(() => Array.isArray(page.meta.headings) && page.meta.headings.length > 1);

useHead({
  meta: [
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: page.frontmatter.published.toISOString() },
    { property: 'article:modified_time', content: page.frontmatter.lastUpdated.toISOString() },
    { property: 'article:author', content: page.site.author },
  ],
});

if (Array.isArray(page.frontmatter.tags)) {
  useHead({
    meta: page.frontmatter.tags
      .filter(isString)
      .map((tag) => ({
        property: 'article:tag',
        content: tag,
      })),
  });
}
</script>
