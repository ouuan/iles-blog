<template>
  <giscus-comments-inner
    client:only
    :term="page.frontmatter.title"
  />
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
