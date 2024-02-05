<template>
  <div
    class="my-6 print:hidden"
    itemprop="comment"
    itemscope
    itemtype="https://schema.org/Comment"
  >
    <giscus-comments-inner
      client:only
      :term="page.frontmatter.title"
      :lang="page.frontmatter.lang"
    />
  </div>
</template>

<script setup lang="ts">
const page = usePage();

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://giscus.app',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://avatars.githubusercontent.com',
    },
  ],
});
</script>
