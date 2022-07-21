<template>
  <div
    class="hidden"
    itemprop="author"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <meta
      itemprop="name"
      :content="site.author"
    >
    <meta
      itemprop="url"
      :content="site.authorLink"
    >
    <meta
      itemprop="image"
      content="/android-chrome-512x512.png"
    >
  </div>
</template>

<script setup lang="ts">
const { site } = usePage();
</script>
