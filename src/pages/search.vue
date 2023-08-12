<page>
title: 搜索
</page>

<template layout="base">
  <Head>
    <meta
      name="robots"
      content="noindex"
    >
  </Head>

  <meili-search client:load />
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: import.meta.env.MEILI_URL,
    },
  ],
});
</script>
