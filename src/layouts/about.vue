<template layout="base">
  <div class="m-4 standard-card 2xl:px-30 3xl:px-36 xl:px-24">
    <article
      itemprop="mainEntity"
      itemscope
      itemtype="https://schema.org/Article"
    >
      <post-microdata :post="page" />
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
    </article>
    <giscus-comments />
  </div>
</template>

<script setup lang="ts">
import site from '~/site';

const page = usePage();

useHead({
  meta: [
    { property: 'og:type', content: 'profile' },
    { property: 'profile:first_name', content: site.firstName },
    { property: 'profile:last_name', content: site.lastName },
    { property: 'profile:username', content: site.author },
    { property: 'profile:gender', content: site.gender },
    { property: 'article:modified_time', content: page.frontmatter.lastUpdated.toISOString() },
  ],
});
</script>
