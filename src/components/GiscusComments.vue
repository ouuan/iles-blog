<template>
  <div
    class="print:hidden"
    itemprop="comment"
    itemscope
    itemtype="http://schema.org/Comment"
  >
    <giscus-comments-inner
      client:only
      :term="page.frontmatter.title"
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
      href: 'https://github.githubassets.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://avatars.githubusercontent.com',
    },
  ],
});
</script>
